#!/usr/bin/env python3
"""Audit a campaign folder for delivery-blocking failures."""

from __future__ import annotations

import argparse
import json
import re
import subprocess
from pathlib import Path


BAD_STATUS_TERMS = (
    "silent",
    "still-anchor",
    "still anchors",
    "slideshow",
    "proxy",
    "motion pending",
    "blocked",
    "stopped exposing playable/exportable",
    "not accept",
    "could not export",
)

REQUIRED_CRITIC_ARTIFACTS = (
    "ideation-swarm.md",
    "treatment-critic.md",
    "pre-spend-critic.md",
    "directors-eye-critic.md",
    "motion-launch-critic.md",
    "delivery-critic.md",
)

SUBAGENT_ID_PATTERN = re.compile(
    r"^019[0-9a-f]{5,}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    re.IGNORECASE,
)


def read_text(path: Path) -> str:
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8", errors="replace")


def ffprobe(path: Path) -> dict:
    cmd = [
        "ffprobe",
        "-v",
        "error",
        "-show_entries",
        "format=duration:stream=index,codec_type,codec_name,duration,width,height",
        "-of",
        "json",
        str(path),
    ]
    result = subprocess.run(cmd, check=True, capture_output=True, text=True)
    return json.loads(result.stdout)


def has_audio(data: dict) -> bool:
    return any(stream.get("codec_type") == "audio" for stream in data.get("streams", []))


def parse_duration(data: dict) -> float:
    try:
        return float(data.get("format", {}).get("duration") or 0)
    except (TypeError, ValueError):
        return 0.0


def parse_manifest_durations(manifest: str) -> tuple[float, float]:
    motion = 0.0
    still = 0.0
    for line in manifest.splitlines():
        match = re.search(r"\|\s*([0-9.]+)-([0-9.]+)\s*\|\s*([^|]+)\|", line)
        if not match:
            continue
        duration = max(0.0, float(match.group(2)) - float(match.group(1)))
        source = match.group(3).strip().lower()
        if source.startswith("video") or ".mp4" in source:
            motion += duration
        elif source.startswith("image") or "still" in source or "anchor" in source:
            still += duration
    return motion, still


def find_export(campaign_dir: Path, explicit: str | None) -> Path | None:
    if explicit:
        path = Path(explicit)
        return path if path.is_absolute() else campaign_dir / path
    exports = sorted((campaign_dir / "exports").glob("*.mp4"))
    return exports[0] if exports else None


def parse_critic_status(text: str) -> tuple[str | None, str | None, str | None, str | None]:
    status_match = re.search(r"^\s*status:\s*(pass|revise|block)\s*$", text, re.IGNORECASE | re.MULTILINE)
    mode_match = re.search(r"^\s*critic_mode:\s*(.+)\s*$", text, re.IGNORECASE | re.MULTILINE)
    subagent_match = re.search(r"^\s*subagent_ids?:\s*(.+)\s*$", text, re.IGNORECASE | re.MULTILINE)
    artifact_match = re.search(r"^\s*subagent_artifacts?:\s*(.+)\s*$", text, re.IGNORECASE | re.MULTILINE)
    status = status_match.group(1).lower() if status_match else None
    mode = mode_match.group(1).strip() if mode_match else None
    subagent_ids = subagent_match.group(1).strip() if subagent_match else None
    subagent_artifacts = artifact_match.group(1).strip() if artifact_match else None
    return status, mode, subagent_ids, subagent_artifacts


def has_valid_subagent_ids(value: str | None) -> bool:
    ids = [entry.strip() for entry in re.split(r"[,\s]+", value or "") if entry.strip()]
    return bool(ids) and all(SUBAGENT_ID_PATTERN.fullmatch(entry) for entry in ids)


def parse_subagent_ids(value: str | None) -> list[str]:
    return [entry.strip() for entry in re.split(r"[,\s]+", value or "") if entry.strip()]


def validate_subagent_provenance(campaign_dir: Path, filename: str, subagent_ids: str | None, artifact_list: str | None) -> list[str]:
    failures: list[str] = []
    artifacts = [entry.strip() for entry in re.split(r"[,\s]+", artifact_list or "") if entry.strip()]
    for agent_id in parse_subagent_ids(subagent_ids):
        matching = [entry for entry in artifacts if agent_id in entry]
        if not matching:
            failures.append(f"Critic artifact qa/critics/{filename} must list a subagent_artifacts path for {agent_id}.")
            continue

        for artifact in matching:
            path = (campaign_dir / artifact).resolve()
            try:
                path.relative_to(campaign_dir)
            except ValueError:
                failures.append(f"Subagent artifact path for {agent_id} must stay inside the campaign directory: {artifact}.")
                continue
            if not path.exists():
                failures.append(f"Subagent artifact for {agent_id} does not exist: {artifact}.")
                continue

            text = read_text(path)
            if not re.search(rf"^\s*agent_id:\s*{re.escape(agent_id)}\s*$", text, re.IGNORECASE | re.MULTILINE):
                failures.append(f"Subagent artifact {artifact} must include matching agent_id: {agent_id}.")
            if not re.search(r"^\s*status:\s*completed\s*$", text, re.IGNORECASE | re.MULTILINE):
                failures.append(f"Subagent artifact {artifact} must include status: completed.")
    return failures


def count_generated_video_sources(manifest: str) -> int:
    sources: set[str] = set()
    for line in manifest.splitlines():
        stripped = line.strip()
        if not stripped or re.fullmatch(r"\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?", stripped):
            continue
        lower = stripped.lower()
        if re.search(r"\b(video|seedance|motion|imagineart_motion|generated_motion)\b|/video/|\.(mp4|mov|webm|m4v)\b", lower):
            sources.add(stripped)
    return len(sources)


def validate_critic_artifacts(campaign_dir: Path) -> list[str]:
    failures: list[str] = []
    critics_dir = campaign_dir / "qa" / "critics"
    for filename in REQUIRED_CRITIC_ARTIFACTS:
        path = critics_dir / filename
        if not path.exists():
            failures.append(f"Missing required critic artifact: qa/critics/{filename}.")
            continue

        status, mode, subagent_ids, subagent_artifacts = parse_critic_status(read_text(path))
        if status != "pass":
            failures.append(
                f"Critic artifact qa/critics/{filename} has status {status or 'missing'}; delivery requires status: pass."
            )
        if mode != "subagent":
            failures.append(
                f"Critic artifact qa/critics/{filename} must have critic_mode: subagent; single-agent fallback is not valid for campaign delivery."
            )
        if not has_valid_subagent_ids(subagent_ids):
            failures.append(
                f"Critic artifact qa/critics/{filename} must include subagent_ids with spawned critic agent id(s) matching the Codex subagent id format."
            )
        else:
            failures.extend(validate_subagent_provenance(campaign_dir, filename, subagent_ids, subagent_artifacts))
    return failures


def validate_clip_critic_artifacts(campaign_dir: Path, manifest_text: str) -> list[str]:
    failures: list[str] = []
    expected_clip_critics = count_generated_video_sources(manifest_text)
    critics = sorted((campaign_dir / "qa" / "critics").glob("clip-critic-*.md"))
    if expected_clip_critics and len(critics) < expected_clip_critics:
        failures.append(
            f"Expected at least {expected_clip_critics} clip critic artifact(s), found {len(critics)} under qa/critics/clip-critic-*.md."
        )

    for path in critics:
        status, mode, subagent_ids, subagent_artifacts = parse_critic_status(read_text(path))
        if status != "pass":
            failures.append(
                f"Clip critic artifact qa/critics/{path.name} has status {status or 'missing'}; delivery requires status: pass."
            )
        if mode != "subagent":
            failures.append(
                f"Clip critic artifact qa/critics/{path.name} must have critic_mode: subagent."
            )
        if not has_valid_subagent_ids(subagent_ids):
            failures.append(
                f"Clip critic artifact qa/critics/{path.name} must include subagent_ids with spawned critic agent id(s) matching the Codex subagent id format."
            )
        else:
            failures.extend(validate_subagent_provenance(campaign_dir, path.name, subagent_ids, subagent_artifacts))
    return failures


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("campaign_dir", type=Path)
    parser.add_argument("--export", help="Optional export path relative to campaign dir")
    parser.add_argument("--min-motion-coverage", type=float, default=0.80)
    args = parser.parse_args()

    campaign_dir = args.campaign_dir.resolve()
    failures: list[str] = []
    warnings: list[str] = []

    failures.extend(validate_critic_artifacts(campaign_dir))

    export_path = find_export(campaign_dir, args.export)
    export_duration = 0.0
    if not export_path or not export_path.exists():
        failures.append("No MP4 export found under exports/ or --export.")
    else:
        try:
            probe = ffprobe(export_path)
            export_duration = parse_duration(probe)
            if not has_audio(probe) and (campaign_dir / "music-studio-direction.md").exists():
                failures.append("Export has no audio stream, but music-studio-direction.md exists.")
        except Exception as exc:
            failures.append(f"Could not inspect export with ffprobe: {exc}")

    qc_text = read_text(campaign_dir / "qc-notes.md")
    manifest_text = read_text(campaign_dir / "shot-source-manifest.md")
    failures.extend(validate_clip_critic_artifacts(campaign_dir, manifest_text))
    combined_notes = f"{qc_text}\n{manifest_text}".lower()
    for term in BAD_STATUS_TERMS:
        if term in combined_notes:
            failures.append(f"Campaign notes contain delivery-blocking term: {term!r}.")

    motion_duration, still_duration = parse_manifest_durations(manifest_text)
    denominator = export_duration or (motion_duration + still_duration)
    if denominator > 0:
        motion_coverage = motion_duration / denominator
        still_coverage = still_duration / denominator
        if motion_coverage < args.min_motion_coverage:
            failures.append(
                f"Motion coverage is {motion_coverage:.0%} ({motion_duration:.2f}s of {denominator:.2f}s); "
                f"minimum is {args.min_motion_coverage:.0%}."
            )
        if still_coverage > 0.10:
            failures.append(
                f"Still/proxy coverage is {still_coverage:.0%} ({still_duration:.2f}s of {denominator:.2f}s); "
                "maximum is 10%."
            )
    else:
        warnings.append("Could not compute motion coverage from manifest/export duration.")

    print(f"campaign: {campaign_dir}")
    if export_path:
        print(f"export: {export_path}")
    if export_duration:
        print(f"duration: {export_duration:.2f}s")
    if denominator > 0:
        print(f"motion_duration: {motion_duration:.2f}s")
        print(f"still_proxy_duration: {still_duration:.2f}s")
    for warning in warnings:
        print(f"warning: {warning}")
    for failure in failures:
        print(f"fail: {failure}")

    if failures:
        print("status: blocked")
        return 1
    print("status: delivery gate passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

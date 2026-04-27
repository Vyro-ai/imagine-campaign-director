#!/usr/bin/env python3
"""Audit a CampaignCraft campaign folder for delivery-blocking failures."""

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


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("campaign_dir", type=Path)
    parser.add_argument("--export", help="Optional export path relative to campaign dir")
    parser.add_argument("--min-motion-coverage", type=float, default=0.80)
    args = parser.parse_args()

    campaign_dir = args.campaign_dir.resolve()
    failures: list[str] = []
    warnings: list[str] = []

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

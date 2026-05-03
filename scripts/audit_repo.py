#!/usr/bin/env python3
from collections import Counter
from pathlib import Path
import re


TEXT_EXTENSIONS = {".md", ".py", ".json", ".txt"}
IGNORED_DIRS = {".git", "__pycache__", "node_modules", ".cache"}
CANONICAL_DOCS = [
    "AGENTS.md",
    "README.md",
    "skill.md",
    "docs/PRODUCTION_STANDARD.md",
    "docs/AUTOMATION_CONTRACT.md",
    "docs/WORKFLOW_EXECUTION_GUIDE.md",
    "docs/IMAGINEART_WORKFLOW_BLUEPRINT.md",
    "docs/PRODUCTION_PROFILES.md",
    "docs/QUALITY_CONTROL.md",
    "docs/SEEDANCE_WORKFLOW_GUIDE.md",
    "docs/IMAGINEART_MUSIC_STUDIO.md",
]
REQUIRED_TEXT = {
    "AGENTS.md": ("first action is a Computer Use/browser automation preflight", "finished MP4 ready for user review"),
    "docs/PRODUCTION_STANDARD.md": ("first action after receiving a campaign-video request", "finished MP4 ready for review"),
    "docs/AUTOMATION_CONTRACT.md": ("finished MP4 ready for user review", "Computer Use/browser execution", "Credit safety is operational, not conversational"),
    "docs/PRE_SPEND_CONFIDENCE_GATE.md": ("internal readiness gate, not a user-approval gate",),
    "docs/CREATIVE_DIRECTION_GATE.md": ("forced-collision matrix", "Aesthetic Refusals", "Controlled Flaw"),
    "docs/REFERENCE_ANALYSIS_METHOD.md": ("Direction DNA", "TRANSLATION, NOT COPY"),
    "docs/CINEMATIC_STILL_PROMPTING_PLAYBOOK.md": ("IMPERFECTION:", "AESTHETIC REFUSALS:"),
    "docs/PRODUCTION_PROFILES.md": ("not creative templates", "production_profiles.json"),
    "docs/TROUBLESHOOTING.md": ("Fresh-Install Execution Tests", "do not ask for approval solely because credits will be spent"),
    "config/automation_recovery_rules.json": ("retry the exact same prompt and same references two more times", "All references are AI generated and do not represent real people."),
}
FORBIDDEN_ROUTING_PATTERNS = [
    re.compile(r"\bI['’]?ll\s+(use|build|create|make|start)\b.*\bHyperFrames\b", re.I),
    re.compile(r"\bI['’]?m\s+(using|building|creating|making|starting)\b.*\bHyperFrames\b", re.I),
    re.compile(r"\buse the HyperFrames workflow\b", re.I),
    re.compile(r"\bHTML-based campaign video composition\b", re.I),
    re.compile(r"\bcreate a self-contained HyperFrames project\b", re.I),
    re.compile(r"\bHyperFrames composition:?\s+a short\b", re.I),
    re.compile(r"\bstart by creating a local HyperFrames\b", re.I),
    re.compile(r"\blocal video composition\b", re.I),
    re.compile(r"\bPrepared the Imagine\.Art-first campaign package\b", re.I),
    re.compile(r"\bready for generation\b.*\bmotion remains\b.*\bmotion pending\b", re.I),
    re.compile(r"\bbrowser execution is unavailable here\b", re.I),
    re.compile(r"\bI don['’]?t have an Imagine\.Art browser session\b", re.I),
    re.compile(r"\bcreate a self-contained campaign folder\b", re.I),
    re.compile(r"\bexpected return is a generated video ready for review\b", re.I),
    re.compile(r"\bready for confirmation\b", re.I),
    re.compile(r"\bapprove (the )?(credit )?spend\b", re.I),
    re.compile(r"\bapproval to spend\b", re.I),
    re.compile(r"\bconfirm (the )?(credit )?spend\b", re.I),
    re.compile(r"\bconfirmation before (running|generation|spending)\b", re.I),
    re.compile(r"\bask (the )?user\b.*\b(normal )?(credit|credits|spend|spending)\b", re.I),
    re.compile(r"\bclick (Run Selected|run) again\b.*\b(delayed|register|stale|unchanged|looks enabled|feedback)\b", re.I),
    re.compile(r"\b(run|launch) motion nodes in (small )?batches\b", re.I),
    re.compile(r"\bbatch motion launches\b", re.I),
    re.compile(r"\bprefer one-node launches\b.*\bmotion\b", re.I),
    re.compile(r"\bmoderation placeholder\b.*\bsimplify\b.*\bretry once\b", re.I),
    re.compile(r"\bGeneration failed\b.*\bblocked\b", re.I),
]
ALLOWED_ROUTING_CONTEXT = (
    "wrong first response",
    "also wrong",
    "do not begin",
    "do not claim",
    "do not start",
    "do not substitute",
    "never the first production layer",
    "only for finishing",
    "finishing layer",
    "correct first response pattern",
    "after reviewed/generated motion exists",
    "after imagine.art motion exists",
    "generic language",
    "do not return only",
    "do not ask",
    "do not stop",
    "not a user-approval gate",
    "only be asked",
    "ask only",
    "user explicitly requested",
    "explicit approval requirements",
    "do not retry",
    "do not click again",
    "never click",
    "one-node launches only",
    "launch campaign motion nodes one at a time",
    "safe batch",
    "safe parallel batches",
    "may batch up to two",
    "at most two",
    "independent campaign motion clips may batch",
    "retry the exact same prompt",
    "before simplifying",
)
FORBIDDEN_CREATIVE_DEFAULTS = [
    re.compile(r"\bElegant Control\b"),
    re.compile(r"\bDisruptive Spark\b"),
    re.compile(r"\bSensory Proof\b"),
    re.compile(r"\binvent three premises\b", re.I),
    re.compile(r"\bthree premises\b", re.I),
    re.compile(r"\bcampaign archetype(s)?\b", re.I),
    re.compile(r"\bselected archetype\b", re.I),
    re.compile(r"\bclosest archetype\b", re.I),
    re.compile(r"\bknown archetype\b", re.I),
    re.compile(r"\bconfig/campaign_archetypes\.json\b", re.I),
    re.compile(r"\bCAMPAIGN_ARCHETYPES\.md\b"),
]
ALLOWED_CREATIVE_CONTEXT = (
    "old premise",
    "rejected",
    "not enough",
    "audit",
)


def iter_files(root: Path):
    for path in root.rglob("*"):
        if not path.is_file():
            continue
        if any(part in IGNORED_DIRS for part in path.parts):
            continue
        yield path


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    failed = False

    for relative in CANONICAL_DOCS:
        if not (root / relative).exists():
            failed = True
            print(f"missing canonical doc: {relative}")

    for relative, snippets in REQUIRED_TEXT.items():
        path = root / relative
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8")
        for snippet in snippets:
            if snippet not in text:
                failed = True
                print(f"missing required routing text in {relative}: {snippet}")

    junk = [path.relative_to(root) for path in iter_files(root) if path.name in {".DS_Store"}]
    for path in junk:
        failed = True
        print(f"junk file: {path}")

    for path in iter_files(root):
        if path.suffix not in TEXT_EXTENSIONS:
            continue
        lines = path.read_text(encoding="utf-8").splitlines()
        for index, line in enumerate(lines, start=1):
            if not any(pattern.search(line) for pattern in FORBIDDEN_ROUTING_PATTERNS):
                continue
            context = " ".join(lines[max(0, index - 4):index + 3]).lower()
            if any(allowed in context for allowed in ALLOWED_ROUTING_CONTEXT):
                continue
            failed = True
            print(f"forbidden HyperFrames-first routing: {path.relative_to(root)}:{index}")
        if path.relative_to(root).as_posix() != "scripts/audit_repo.py":
            for index, line in enumerate(lines, start=1):
                if not any(pattern.search(line) for pattern in FORBIDDEN_CREATIVE_DEFAULTS):
                    continue
                context = " ".join(lines[max(0, index - 3):index + 2]).lower()
                if any(allowed in context for allowed in ALLOWED_CREATIVE_CONTEXT):
                    continue
                failed = True
                print(f"forbidden old creative default: {path.relative_to(root)}:{index}")

    for example_dir in sorted((root / "examples").glob("*")):
        if not example_dir.is_dir():
            continue
        treatment = example_dir / "treatment.md"
        prompts = example_dir / "prompts.md"
        if not treatment.exists():
            failed = True
            print(f"missing example treatment: {treatment.relative_to(root)}")
        if prompts.exists():
            text = prompts.read_text(encoding="utf-8")
            for snippet in ("Direction DNA:", "Controlled flaw:", "Aesthetic refusals:", "IMPERFECTION:", "AESTHETIC REFUSALS:"):
                if snippet not in text:
                    failed = True
                    print(f"missing creative prompt marker in {prompts.relative_to(root)}: {snippet}")

    headings = Counter()
    phrase_counts = Counter()
    phrase_pattern = re.compile(r"\b(prompt pack|still-only|shot-source manifest|text-only video|Music Studio|Seedance 2|partial/proxy)\b", re.I)

    for path in iter_files(root):
        if path.suffix not in TEXT_EXTENSIONS:
            continue
        text = path.read_text(encoding="utf-8")
        for line in text.splitlines():
            if line.startswith("#"):
                headings[line.strip()] += 1
        for match in phrase_pattern.findall(text):
            phrase_counts[match.lower()] += 1

    repeated_headings = [(heading, count) for heading, count in headings.items() if count > 3]
    for heading, count in repeated_headings:
        print(f"repeated heading x{count}: {heading}")

    if phrase_counts:
        print("tracked repeated phrases:")
        for phrase, count in sorted(phrase_counts.items()):
            print(f"  {phrase}: {count}")

    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())

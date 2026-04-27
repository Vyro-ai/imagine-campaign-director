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
    "docs/QUALITY_CONTROL.md",
    "docs/SEEDANCE_WORKFLOW_GUIDE.md",
    "docs/IMAGINEART_MUSIC_STUDIO.md",
]
FORBIDDEN_ROUTING_PATTERNS = [
    re.compile(r"\bI['’]?ll\s+(use|build|create|make|start)\b.*\bHyperFrames\b", re.I),
    re.compile(r"\bI['’]?m\s+(using|building|creating|making|starting)\b.*\bHyperFrames\b", re.I),
    re.compile(r"\buse the HyperFrames workflow\b", re.I),
    re.compile(r"\bHTML-based campaign video composition\b", re.I),
    re.compile(r"\bcreate a self-contained HyperFrames project\b", re.I),
    re.compile(r"\bHyperFrames composition:?\s+a short\b", re.I),
    re.compile(r"\bstart by creating a local HyperFrames\b", re.I),
    re.compile(r"\blocal video composition\b", re.I),
]
ALLOWED_ROUTING_CONTEXT = (
    "wrong first response",
    "also wrong",
    "do not begin",
    "do not start",
    "do not substitute",
    "never the first production layer",
    "only for finishing",
    "finishing layer",
    "correct first response pattern",
    "after reviewed/generated motion exists",
    "after imagine.art motion exists",
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

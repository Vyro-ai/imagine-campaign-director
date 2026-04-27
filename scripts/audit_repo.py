#!/usr/bin/env python3
from collections import Counter
from pathlib import Path
import re


TEXT_EXTENSIONS = {".md", ".py", ".json", ".txt"}
IGNORED_DIRS = {".git", "__pycache__", "node_modules", ".cache"}
CANONICAL_DOCS = [
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

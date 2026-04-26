#!/usr/bin/env python3
from pathlib import Path


TEMPLATE = """# Imagine.Art Campaign Prompt Pack

## Campaign

{title}

## Brief

Fill in the campaign goal, audience, platform, duration, aspect ratio, and CTA.

## Imagine.Art Workflow Sections

1. SOURCE / Inputs
2. ANALYSIS / Brief + Asset Roles
3. STRATEGY / Campaign Grammar
4. STILLS / Look Development
5. STILLS / Approved Anchors
6. MOTION / Shot Ladder
7. MUSIC / Music Studio Direction
8. EDIT / Assembly + Timing
9. TYPE / Captions + End Card
10. QC / Review + Rejects
11. EXPORT / Finals

## Shot Ladder

1. Hook
2. Product/world reveal
3. Detail or action accent
4. Final hero hold

## Stillframe Prompts

### sf_001_hook

Purpose:

Prompt:

Negative prompt:

## Motion Prompts

### mv_001_hook

Source still:

Duration:

Prompt:

Negative prompt:

QC watchouts:

## Music Studio Prompt

Use:

Genre:

Mood:

Tempo:

Instruments:

Prompt:
"""


def main() -> int:
    root = Path.cwd()
    title = " ".join(__import__("sys").argv[1:]) or "Untitled Campaign"
    out = root / "prompt_pack.md"
    out.write_text(TEMPLATE.format(title=title), encoding="utf-8")
    print(out)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

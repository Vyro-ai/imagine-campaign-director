#!/usr/bin/env python3
"""Extract review frames from a rendered campaign video.

This is intentionally small: it creates a frame sheet and timestamped frames so
an agent cannot call an export finished without inspecting the actual artifact.
"""

import argparse
import shutil
import subprocess
from pathlib import Path


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def main() -> int:
    parser = argparse.ArgumentParser(description="Extract campaign QC frames.")
    parser.add_argument("video", help="Rendered video file to review")
    parser.add_argument("--out", default="review_frames", help="Output directory")
    parser.add_argument("--fps", default="2", help="Sampling FPS for individual frames")
    parser.add_argument("--sheet-width", default="320", help="Thumbnail width for contact sheet")
    args = parser.parse_args()

    if shutil.which("ffmpeg") is None:
        raise SystemExit("ffmpeg is required")

    video = Path(args.video).expanduser().resolve()
    if not video.exists():
        raise SystemExit(f"video not found: {video}")

    out = Path(args.out).expanduser().resolve()
    frames = out / "frames"
    frames.mkdir(parents=True, exist_ok=True)

    run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(video),
            "-vf",
            f"fps={args.fps},scale={args.sheet_width}:-1",
            str(frames / "frame-%03d.png"),
        ]
    )

    run(
        [
            "ffmpeg",
            "-y",
            "-pattern_type",
            "glob",
            "-i",
            str(frames / "*.png"),
            "-vf",
            "tile=5x4:padding=12:margin=12:color=black",
            str(out / "contact-sheet.png"),
        ]
    )

    print(f"frames: {frames}")
    print(f"contact_sheet: {out / 'contact-sheet.png'}")
    print("Review the first second, shot variety, product reveal order, source-board residue, and final memory image before pass.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

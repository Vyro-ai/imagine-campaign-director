#!/usr/bin/env python3
from pathlib import Path


def main() -> int:
    repo_root = Path(__file__).resolve().parents[1]
    root = Path.cwd()
    title = " ".join(__import__("sys").argv[1:]) or "Untitled Campaign"
    template = (repo_root / "templates" / "prompt_pack_template.md").read_text(encoding="utf-8")
    out = root / "prompt_pack.md"
    content = template.replace("## Workflow Name", f"## Workflow Name\n\n{title}", 1)
    out.write_text(content, encoding="utf-8")
    print(out)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

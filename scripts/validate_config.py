#!/usr/bin/env python3
import json
from pathlib import Path


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    config_dir = root / "config"
    failed = False
    for path in sorted(config_dir.glob("*.json")):
        try:
            json.loads(path.read_text(encoding="utf-8"))
            print(f"ok {path.relative_to(root)}")
        except Exception as exc:
            failed = True
            print(f"fail {path.relative_to(root)}: {exc}")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())

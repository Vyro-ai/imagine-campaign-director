#!/usr/bin/env python3
import json
from pathlib import Path


REQUIRED_TOP_LEVEL_KEYS = {
    "aesthetic_rubric.json": {"version", "criteria"},
    "automation_recovery_rules.json": {"name", "retry_limits", "failure_rules", "completion_statuses"},
    "campaign_archetypes.json": {"version", "archetypes"},
    "editing_structures.json": {"version", "structures"},
    "imagineart_model_matrix.json": {"name", "description", "global_rules", "models"},
    "imagineart_workflow_sections.json": {"version", "sections"},
    "input_adapters.json": {"version", "inputs"},
    "music_directions.json": {"version", "directions"},
    "negative_prompt_patterns.json": {"version", "patterns"},
    "production_gates.json": {"version", "gates"},
    "sample_public_palette.json": {"name", "description", "usage", "colors"},
    "seedance_constraints.json": {"version", "ten_second_clip", "reference_roles", "risk_simplifications"},
    "shot_types.json": {"version", "shot_types"},
}


def duplicate_values(items: list[object], keys: tuple[str, ...]) -> list[str]:
    seen = set()
    duplicates = []
    for item in items:
        if not isinstance(item, dict):
            continue
        for key in keys:
            value = item.get(key)
            if not isinstance(value, str):
                continue
            marker = f"{key}:{value}"
            if marker in seen:
                duplicates.append(marker)
            seen.add(marker)
    return duplicates


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    config_dir = root / "config"
    failed = False
    for path in sorted(config_dir.glob("*.json")):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
            required = REQUIRED_TOP_LEVEL_KEYS.get(path.name)
            if required:
                missing = sorted(required - set(data))
                if missing:
                    raise ValueError(f"missing top-level keys: {', '.join(missing)}")
            if isinstance(data, dict):
                for value in data.values():
                    if isinstance(value, list):
                        duplicates = duplicate_values(value, ("id", "name", "key", "label", "type"))
                        if duplicates:
                            raise ValueError(f"duplicate item identifiers: {', '.join(duplicates)}")
            print(f"ok {path.relative_to(root)}")
        except Exception as exc:
            failed = True
            print(f"fail {path.relative_to(root)}: {exc}")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())

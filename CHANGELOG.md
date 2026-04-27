# Changelog

## Unreleased

- Added `docs/PRODUCTION_STANDARD.md` as the canonical campaign delivery standard.
- Slimmed repeated agent and workflow docs into pointers to canonical docs.
- Removed redundant public usage and manual review docs after folding their content into README and release audit.
- Updated prompt-pack generation to use `templates/prompt_pack_template.md`.
- Strengthened config validation and added a repo audit script for cruft and repetition checks.
- Added a tool-routing guard so campaign-video requests default to Imagine.Art first and reserve HyperFrames/editor work for finishing.

## 0.1.0

- Initial public release structure.
- Added agent instructions.
- Added portable skill file.
- Added aesthetic system documentation.
- Added campaign archetypes.
- Added shot grammar.
- Added QC rubric.
- Added fictional example campaign prompt packs.
- Added public-safe brand system placeholder.
- Reoriented the system around Imagine.Art Workflows and Imagine.Art Music Studio.
- Added input adapters for briefs, prompts, product photos, style images, mood boards, existing video, and mixed assets.
- Added comprehensive workflow blueprints, music prompts, and workflow completeness scoring.
- Added automation contract, browser-operator prompt, model matrix, and recovery rules for real Imagine.Art execution.
- Added final workflow cleanup rule: only used nodes should remain in the live production workflow.

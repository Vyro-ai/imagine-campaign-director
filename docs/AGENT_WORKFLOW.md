# Agent Workflow

This file is a routing guide. The delivery standard is `docs/PRODUCTION_STANDARD.md`; execution rules live in `docs/AUTOMATION_CONTRACT.md`.

## Run Order

1. Normalize input with `docs/INPUT_ADAPTERS.md`.
2. Choose one campaign grammar from `docs/AESTHETIC_SYSTEM.md`.
3. Build the workflow from `docs/IMAGINEART_WORKFLOW_BLUEPRINT.md`.
4. Apply the production standard from `docs/PRODUCTION_STANDARD.md`.
5. Execute with `docs/WORKFLOW_EXECUTION_GUIDE.md` and `prompts/imagineart_browser_operator.md` when browser access exists.
6. Use `docs/SEEDANCE_WORKFLOW_GUIDE.md` for image-grounded motion.
7. Use `docs/IMAGINEART_MUSIC_STUDIO.md` and `prompts/music_studio_prompt_builder.md` for music.
8. Plan b-roll and product closeout with `docs/BROLL_AND_PRODUCT_CLOSEOUT.md`.
9. Score with `docs/QUALITY_CONTROL.md`.
10. Diagnose revisions with `prompts/revision_diagnoser.md`.
11. Package delivery with `prompts/final_delivery_packager.md`.

## Prompt Builders

- `prompts/campaign_brief_intake.md`: intake and clarification
- `prompts/imagineart_workflow_builder.md`: section map and node plan
- `prompts/shotlist_generator.md`: shot ladder
- `prompts/ai_video_prompt_builder.md`: motion prompts
- `prompts/music_studio_prompt_builder.md`: Music Studio prompt
- `prompts/video_qc_reviewer.md`: artifact and reference-parity review
- `prompts/revision_diagnoser.md`: revision plan
- `prompts/final_delivery_packager.md`: final package

## Config References

- `config/imagineart_model_matrix.json`: model defaults and launch checks
- `config/automation_recovery_rules.json`: retries and failure handling
- `config/production_gates.json`: stage gates
- `config/seedance_constraints.json`: motion constraints
- `config/imagineart_workflow_sections.json`: section taxonomy

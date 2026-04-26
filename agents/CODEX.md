# CampaignCraft for Imagine.Art: Codex Instructions

You are helping a user create polished campaign videos through Imagine.Art Workflows.

## Default Behavior

- Treat Imagine.Art as the production platform.
- Accept many input types: brief, prompt, style image, product photo, mood board, video clip, brand notes, or mixed assets.
- Normalize inputs using `docs/INPUT_ADAPTERS.md`.
- Build a comprehensive Imagine.Art Workflow plan using `docs/IMAGINEART_WORKFLOW_BLUEPRINT.md`.
- Always create an Imagine.Art Music Studio prompt.
- Always include QC and revision gates.

## Expected Output

For a campaign request, produce:

1. input analysis
2. assumptions
3. campaign grammar
4. Imagine.Art workflow section map
5. node-by-node plan
6. stillframe prompts
7. motion prompts
8. Music Studio prompt
9. rough beat map
10. b-roll plan
11. product closeout plan
12. edit assembly plan
13. QC checklist
14. revision plan
15. final delivery package

## Imagine.Art Workflow Rules

- Use workflows, not isolated one-off prompts.
- Use source/input nodes for product photos, style images, mood boards, and clips.
- Use analysis/prompt nodes to assign asset roles.
- Generate stillframe anchors before motion when consistency matters.
- Generate motion clips from approved anchors.
- Keep rejects separated and named by failure reason.
- Use deterministic typography and end-card layout whenever text/logo accuracy matters.
- Apply `docs/PRODUCTION_LEARNINGS.md`, `docs/WORKFLOW_EXECUTION_GUIDE.md`, `docs/SEEDANCE_WORKFLOW_GUIDE.md`, `docs/MUSIC_LED_EDITING.md`, and `docs/BROLL_AND_PRODUCT_CLOSEOUT.md`.
- Do not present a still-only proxy or unreviewed generation batch as finished.

## Public Safety

Do not include private brand systems, internal paths, client examples, copyrighted frames, API keys, or non-public workflow details. Use user-supplied assets only when the user has rights to use them.

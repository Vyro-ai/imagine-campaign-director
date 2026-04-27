# CampaignCraft for Imagine.Art: Codex Instructions

You are helping a user create polished campaign videos through Imagine.Art Workflows.

## Default Behavior

- Treat Imagine.Art as the production platform.
- Accept many input types: brief, prompt, style image, product photo, mood board, video clip, brand notes, or mixed assets.
- Normalize inputs using `docs/INPUT_ADAPTERS.md`.
- Build a comprehensive Imagine.Art Workflow plan using `docs/IMAGINEART_WORKFLOW_BLUEPRINT.md`.
- If browser access is available, execute the workflow using `docs/AUTOMATION_CONTRACT.md` and `prompts/imagineart_browser_operator.md`. This is the default product behavior, not an optional enhancement.
- If browser access is unavailable or Imagine.Art execution is blocked, return `blocked`, `ready for generation`, or `motion pending`. Do not substitute a slideshow, prompt pack, or local animatic as a finished video.
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

If you operate Imagine.Art, also produce:

- generated still/storyboard output inventory
- selected motion clip inventory
- Music Studio output note
- shot-source manifest proving every final visual shot is reviewed motion footage or deterministic type/layout
- cleanup note confirming unused nodes were deleted
- exact completion status: `finished`, `ready for generation`, `motion pending`, `partial/proxy`, or `blocked`

## Imagine.Art Workflow Rules

- Use workflows, not isolated one-off prompts.
- Use source/input nodes for product photos, style images, mood boards, and clips.
- Use analysis/prompt nodes to assign asset roles.
- Generate stillframe anchors before motion when consistency matters.
- Generate motion clips from approved anchors.
- Keep rejects separated and named by failure reason.
- Use deterministic typography and end-card layout whenever text/logo accuracy matters.
- Apply `docs/PRODUCTION_LEARNINGS.md`, `docs/WORKFLOW_EXECUTION_GUIDE.md`, `docs/SEEDANCE_WORKFLOW_GUIDE.md`, `docs/MUSIC_LED_EDITING.md`, and `docs/BROLL_AND_PRODUCT_CLOSEOUT.md`.
- Apply `docs/AUTOMATION_CONTRACT.md`, `config/imagineart_model_matrix.json`, and `config/automation_recovery_rules.json`.
- Verify visible UI model labels and ratios before every generation launch.
- If a pasted workflow node resolves to the wrong model, correct it before launch or delete/recreate it.
- If an output is a moderation placeholder, treat it as failed and do not connect it downstream.
- Delete failed, rejected, abandoned, duplicate, and unused nodes from the final live workflow after recording failures locally.
- Do not present a still-only proxy, slideshow, HyperFrames pan/zoom edit, or unreviewed generation batch as finished.

## Public Safety

Do not include private brand systems, internal paths, client examples, copyrighted frames, API keys, or non-public workflow details. Use user-supplied assets only when the user has rights to use them.

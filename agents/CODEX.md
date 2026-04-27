# CampaignCraft for Imagine.Art: Codex Instructions

You are helping a user create polished campaign videos through Imagine.Art Workflows. Start from `agents/GENERAL_AGENT.md` and apply the Codex-specific notes below.

## Default Behavior

- Follow `docs/PRODUCTION_STANDARD.md`.
- Normalize inputs using `docs/INPUT_ADAPTERS.md`.
- Ask short production questions when missing answers materially change the deliverable. If the user wants speed or does not answer, document conservative assumptions and proceed.
- Apply `docs/VAGUE_PROMPT_RESCUE.md` for broad taste prompts.
- Write the director's treatment from `docs/DIRECTORS_TREATMENT_GATE.md` before workflow canvas work.
- Build a comprehensive Imagine.Art Workflow plan using `docs/IMAGINEART_WORKFLOW_BLUEPRINT.md`.
- If Computer Use, browser automation, or desktop control is available, execute the workflow using `docs/AUTOMATION_CONTRACT.md` and `prompts/imagineart_browser_operator.md` before returning a static package.

## Expected Output

For a campaign request, produce:

1. input analysis
2. assumptions
3. campaign grammar
4. director's treatment with every shot justified
5. near-deterministic edit plan
6. Imagine.Art workflow section map
7. node-by-node plan
8. stillframe prompts
9. Seedance 2 multi-shot motion prompts
10. Music Studio prompt
11. rough beat map
12. b-roll plan
13. product closeout plan
14. edit assembly plan
15. QC checklist
16. revision plan
17. final delivery package

If you operate Imagine.Art, also produce:

- generated still/storyboard output inventory
- selected motion clip inventory
- Music Studio output note
- shot-source manifest proving every final visual shot is reviewed motion footage or deterministic type/layout
- cleanup note confirming unused nodes were deleted
- exact completion status from `docs/PRODUCTION_STANDARD.md`

## Imagine.Art Workflow Rules

- Use workflows, not isolated one-off prompts.
- Use source/input nodes for product photos, style images, mood boards, and clips.
- Use analysis/prompt nodes to assign asset roles.
- Generate all necessary reference images before motion. Default priority: NB2/NBP stillframe anchors; GPT Image 2 or another Imagine.Art image model only when refs, storyboard panels, director's-notes boards, continuity control, model availability, or artifact risk require it.
- Use `docs/DIRECTORS_NOTES_STORYBOARDS.md` for complex Seedance 2 camera choreography; generate, review, and connect the GPT Image 2 board before launching motion.
- Generate motion clips from approved anchors, start frames, end frames, product-truth images, or storyboard/reference panels. The live workflow must show the connection before launch.
- If a believable actress/model is requested, create a continuity strategy covering identity, wardrobe, hair, makeup, performance style, camera distance, and repeatable reference frames.
- Keep rejects separated and named by failure reason.
- Use deterministic typography and end-card layout whenever text/logo accuracy matters.
- Apply `docs/PRODUCTION_LEARNINGS.md`, `docs/WORKFLOW_EXECUTION_GUIDE.md`, `docs/SEEDANCE_WORKFLOW_GUIDE.md`, `docs/MUSIC_LED_EDITING.md`, and `docs/BROLL_AND_PRODUCT_CLOSEOUT.md`.
- Apply `docs/AUTOMATION_CONTRACT.md`, `config/imagineart_model_matrix.json`, and `config/automation_recovery_rules.json`.
- Verify visible UI model labels and ratios before every generation launch.
- Verify every final motion node visibly consumes an approved image/start-frame/reference input before launch.
- If a pasted workflow node resolves to the wrong model, correct it before launch or delete/recreate it.
- If a video node defaults to Kling 3.0, correct it to Seedance 2 / Seedance 2.0 or delete/recreate it before launch unless the user explicitly requested Kling.
- If an output is a moderation placeholder, treat it as failed and do not connect it downstream.
- Delete failed, rejected, abandoned, duplicate, and unused nodes from the final live workflow after recording failures locally.

## Public Safety

Follow the public-safety rule in `docs/PRODUCTION_STANDARD.md`.

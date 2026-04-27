# CampaignCraft for Imagine.Art

Use this skill when an agent needs to create a polished campaign video through Imagine.Art Workflows.

## Primary Job

Turn any reasonable campaign input into a complete Imagine.Art production plan:

- brief
- raw prompt
- style image
- product photo
- mood board
- reference images
- existing footage
- brand notes
- mixed assets

The output should be an Imagine.Art-first workflow package: input interpretation, creative strategy, workflow node map, stillframe prompts, motion prompts, Music Studio prompt, edit structure, QC gates, and final delivery checklist.

## Required Default

Always plan generation through Imagine.Art Workflows unless the user explicitly asks for a different platform.

Use platform-neutral language only as secondary portability notes. The main path is Imagine.Art.

Important: a node map is not a finished workflow. Do not treat a pasted graph, prompt pack, canvas sketch, still montage, slideshow, or HyperFrames pan/zoom edit as production-ready until it has source assets, staged run order, approved still anchors, generated music, reviewed motion outputs, a shot-source manifest, and a final edit/export plan.

If the agent has browser access, it should execute the workflow in Imagine.Art, not merely describe it. Follow `docs/AUTOMATION_CONTRACT.md` and `prompts/imagineart_browser_operator.md`. If execution is blocked by login, UI, model, moderation, generation, or export failures, report the exact blocker and status instead of presenting a proxy as final.

## Workflow

1. Read `docs/INPUT_ADAPTERS.md`.
2. Normalize the user's input into a campaign brief.
3. Choose a campaign grammar from `docs/AESTHETIC_SYSTEM.md`.
4. Build a comprehensive workflow from `docs/IMAGINEART_WORKFLOW_BLUEPRINT.md`.
5. Apply `docs/AUTOMATION_CONTRACT.md`, `docs/PRODUCTION_LEARNINGS.md`, and `docs/WORKFLOW_EXECUTION_GUIDE.md`.
6. Import or explicitly account for every source asset before stillframe generation.
7. Create stillframe prompts with `prompts/imagineart_workflow_builder.md`.
8. Generate stillframe variants before motion and select approved anchors.
9. Build storyboard/reference panels for motion, especially when using Seedance.
10. Create music direction with `prompts/music_studio_prompt_builder.md` and generate the track in Imagine.Art Music Studio.
11. Create motion prompts with `prompts/ai_video_prompt_builder.md`.
12. If using Seedance, follow `docs/SEEDANCE_WORKFLOW_GUIDE.md`.
13. Plan b-roll and product closeout with `docs/BROLL_AND_PRODUCT_CLOSEOUT.md`.
14. Define sections, node names, variants, approval gates, and failure notes.
15. Score outputs with `docs/QUALITY_CONTROL.md`.
16. Diagnose revisions with `prompts/revision_diagnoser.md`.
17. Package final delivery with `prompts/final_delivery_packager.md`.

When operating the browser, use `config/imagineart_model_matrix.json` and `config/automation_recovery_rules.json` for model defaults, preflight checks, retry limits, and cleanup rules.

## Imagine.Art Workflow Standard

Every production plan should include:

- source input section
- input analysis / AI Copilot brief section
- campaign strategy section
- stillframe look-development section
- approved stillframes section
- storyboard/reference panel section
- motion generation section
- music section
- edit assembly section
- typography/caption/end-card section
- QC/rejects section
- final export section

Do not present a workflow as ready until launch-critical connections are visible, approved stills are separated, motion outputs have been reviewed, rejected outputs are isolated, music is planned, and final product closeout is defined.

Do not present a campaign as finished until the selected Imagine.Art motion clips and music have been generated or supplied, reviewed, and assembled. A local still-based animatic can test pacing, but it must be labeled `partial/proxy` and cannot be renamed or delivered as final.

Every final campaign must include a shot-source manifest proving each visual timeline segment is reviewed motion footage or deterministic type/layout. If any visual shot is a still crop, mood-board panel, product-board crop, workflow screenshot, or Ken Burns move, the campaign is not finished.

Do not launch motion nodes directly from first-pass stillframe nodes. Motion should use selected/approved still anchors. If the UI does not support an approved-anchor node pattern, document the selected asset and manually connect/upload that selected output into the motion node.

Do not use a visual placeholder for music. Music must be generated in Imagine.Art Music Studio or clearly marked as pending.

## Music Requirement

Always create an Imagine.Art Music Studio prompt. If the user supplies a style image, mood board, or product photo, translate the visual direction into a text-based music brief because Music Studio does not currently generate directly from image input.

Include:

- instrumental or vocal choice
- genre
- mood
- tempo/rhythm
- instruments
- duration target
- edit beat notes
- avoid list

## Taste Rules

- Use one dominant campaign grammar.
- Make product, wardrobe, material, surface, light, and camera choices concrete.
- Prefer stillframes/keyframes before motion when consistency matters.
- Prefer GPT Image 2 inside Imagine.Art Workflows for fast storyboard/reference-frame ladders when available. Feed approved panels into Seedance as start frames, end frames, or reference images with one clear job each.
- Before launching GPT Image 2 storyboard/reference nodes, confirm the visible UI model and use a validated ratio. Start with `1:1` for storyboard panels unless the live workflow has already proven another ratio works.
- Keep 10-second generated clips realistic: about four major motion phases.
- Add important typography, logos, captions, and CTAs in deterministic edit layers.
- Cut generic filler. Every frame needs a job.

## Status Labels

Use exact delivery status:

- `finished`: final video assembled from reviewed Imagine.Art motion or supplied motion, generated/supplied audio, deterministic type/layout, and a shot-source manifest
- `ready for generation`: workflow and prompts are ready, but generation has not run
- `motion pending`: stills/references are ready, motion has not completed
- `partial/proxy`: deterministic edit or still animatic exists, but required Imagine.Art motion is missing
- `blocked`: login, UI, model, moderation, generation, or export failure prevents completion

## Public-Safe Rules

Do not publish private brand guidelines, internal workflow language, local paths, client examples, downloaded references, copyrighted frames, source videos, API keys, or generated private assets. Use user-supplied brand assets only when the user has the right to use them.

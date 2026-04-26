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

## Workflow

1. Read `docs/INPUT_ADAPTERS.md`.
2. Normalize the user's input into a campaign brief.
3. Choose a campaign grammar from `docs/AESTHETIC_SYSTEM.md`.
4. Build a comprehensive workflow from `docs/IMAGINEART_WORKFLOW_BLUEPRINT.md`.
5. Apply `docs/PRODUCTION_LEARNINGS.md` and `docs/WORKFLOW_EXECUTION_GUIDE.md`.
6. Create stillframe prompts with `prompts/imagineart_workflow_builder.md`.
7. Create music direction with `prompts/music_studio_prompt_builder.md`.
8. Create motion prompts with `prompts/ai_video_prompt_builder.md`.
9. If using Seedance, follow `docs/SEEDANCE_WORKFLOW_GUIDE.md`.
10. Plan b-roll and product closeout with `docs/BROLL_AND_PRODUCT_CLOSEOUT.md`.
11. Define sections, node names, variants, approval gates, and rejects.
12. Score outputs with `docs/QUALITY_CONTROL.md`.
13. Diagnose revisions with `prompts/revision_diagnoser.md`.
14. Package final delivery with `prompts/final_delivery_packager.md`.

## Imagine.Art Workflow Standard

Every production plan should include:

- source input section
- input analysis / AI Copilot brief section
- campaign strategy section
- stillframe look-development section
- approved stillframes section
- motion generation section
- music section
- edit assembly section
- typography/caption/end-card section
- QC/rejects section
- final export section

Do not present a workflow as ready until launch-critical connections are visible, approved stills are separated, motion outputs have been reviewed, rejected outputs are isolated, music is planned, and final product closeout is defined.

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
- Keep 10-second generated clips realistic: about four major motion phases.
- Add important typography, logos, captions, and CTAs in deterministic edit layers.
- Cut generic filler. Every frame needs a job.

## Public-Safe Rules

Do not publish private brand guidelines, internal workflow language, local paths, client examples, downloaded references, copyrighted frames, source videos, API keys, or generated private assets. Use user-supplied brand assets only when the user has the right to use them.

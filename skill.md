# CampaignCraft for Imagine.Art

Use this skill when an agent needs to create a polished campaign video through Imagine.Art Workflows.

## Primary Job

Turn any reasonable campaign input into a complete Imagine.Art production workflow package:

- brief
- raw prompt
- style image
- product photo
- mood board
- reference images
- existing footage
- brand notes
- mixed assets

The output should follow `docs/PRODUCTION_STANDARD.md`.

## Required Default

Always plan generation through Imagine.Art Workflows unless the user explicitly asks for a different platform.

Use platform-neutral language only as secondary portability notes. Brand assets, product photos, mood boards, and style images are creative direction and continuity references; they should guide production choices and final lockup.

If Computer Use, browser automation, or desktop control is available, the agent should execute the workflow in Imagine.Art by default. Follow `docs/AUTOMATION_CONTRACT.md` and `prompts/imagineart_browser_operator.md`.

## Computer Use Execution Rule

For campaign-video requests, the first action is a Computer Use/browser automation preflight. Before creating markdown files, prompt packs, workflow maps, or local folders, check whether Computer Use/browser automation can operate Imagine.Art.

If Computer Use/browser automation is unavailable, immediately tell the user the request cannot be completed in this environment because CampaignCraft requires Computer Use/browser automation to generate the video in Imagine.Art. Return `blocked` and stop.

If Computer Use/browser automation is available, use it to operate Imagine.Art directly:

1. Open or operate Imagine.Art.
2. Create or open the workflow.
3. Build sections and source/input nodes.
4. Generate still anchors and storyboard/reference panels.
5. Run Seedance or the selected Imagine.Art video model.
6. Generate Music Studio audio.
7. Review/download outputs.
8. Export or assemble a finished MP4 ready for review.
9. Clean the final workflow and create a shot-source manifest.

For campaign-video requests, do not return only markdown files, prompt packs, workflow maps, or `ready for generation` status. The expected return is a finished MP4 ready for review, plus supporting notes.

Do not mark a campaign `ready for generation` or `motion pending` until attempting or explicitly preflighting Computer Use/browser automation for Imagine.Art. Only return `blocked` when a specific blocker prevents execution. Do not use generic "browser execution is unavailable here" language without checking Computer Use/browser automation first.

## Tool Routing Guard

For campaign-video requests, do not start by creating a local HyperFrames, HTML, canvas, slideshow, or motion-graphics composition.

Default path:

1. Imagine.Art workflow planning or execution
2. Image-grounded still/reference generation
3. Imagine.Art video generation such as Seedance
4. Imagine.Art Music Studio or supplied music
5. HyperFrames/editor only for assembly, timing, typography, captions, effects, and final render after reviewed motion exists

If Computer Use/browser execution is unavailable after an explicit check, return `blocked` or the narrow blocker status that applies; do not substitute a local video composition as final.

## Workflow

1. Read `docs/INPUT_ADAPTERS.md`.
2. Normalize the user's input into a campaign brief.
3. If the input is vague or mostly taste language, apply `docs/VAGUE_PROMPT_RESCUE.md`.
4. Choose a campaign grammar from `docs/AESTHETIC_SYSTEM.md`.
5. Write a director's treatment using `docs/DIRECTORS_TREATMENT_GATE.md`; do not touch the workflow canvas until the film, edit, shots, music spine, and Seedance 2 node plan are justified.
6. Define reference parity: closest references/archetype, hook behavior, subject/world behavior, camera behavior, editorial progression, product reveal, and final memory image.
7. Build a comprehensive workflow from `docs/IMAGINEART_WORKFLOW_BLUEPRINT.md`.
8. Apply `docs/AUTOMATION_CONTRACT.md`, `docs/PRODUCTION_LEARNINGS.md`, and `docs/WORKFLOW_EXECUTION_GUIDE.md`.
9. Import or explicitly account for every source asset before stillframe generation.
10. Create NB2/NBP stillframe prompts with `prompts/imagineart_workflow_builder.md`.
11. Generate stillframe variants before motion and select approved anchors.
12. Build storyboard/reference panels for motion, especially when using Seedance.
13. Create music direction with `prompts/music_studio_prompt_builder.md` and generate the track in Imagine.Art Music Studio.
14. Create motion prompts with `prompts/ai_video_prompt_builder.md`.
15. If using Seedance, follow `docs/SEEDANCE_WORKFLOW_GUIDE.md`.
16. Plan b-roll and product closeout with `docs/BROLL_AND_PRODUCT_CLOSEOUT.md`.
17. Define sections, node names, variants, approval gates, and failure notes.
18. Score outputs with `docs/QUALITY_CONTROL.md`, including the reference-parity table.
19. Diagnose revisions with `prompts/revision_diagnoser.md`.
20. Package final delivery with `prompts/final_delivery_packager.md`.

## Commercial Workflow

Use this sequence for commercials, social campaigns, TikTok/Reels ads, 30s spots, and professionally shot/produced video:

1. Analyze brand assets and extract visual rules.
2. Define target platform, runtime, pacing, audience, CTA, and aspect ratio.
3. Create a hero concept and an 8-12 shot structure for a 30s vertical ad.
4. Generate or select consistent actress/model reference frames when a believable human lead is requested.
5. Generate Seedance-ready prompts per shot, including shared continuity and negative prompts.
6. Generate or specify an original Imagine.Art Music Studio bed with edit hit points.
7. After generated or supplied motion clips exist, assemble them in an editor or HyperFrames with beat-synced cuts, type, logo, product lockup, captions, and CTA.
8. QC for realism, product continuity, actress/model consistency, hand/contact issues, fake text, social-platform framing, and reference parity.
9. Deliver the final render plus source prompts, shot-source manifest, edit notes, and revision notes.

When operating the browser, use `config/imagineart_model_matrix.json` and `config/automation_recovery_rules.json` for model defaults, preflight checks, retry limits, and cleanup rules.

## Imagine.Art Workflow Standard

Every production plan should include:

- active context workspace and local deliverables
- director's treatment with every shot justified
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

Follow `docs/PRODUCTION_STANDARD.md` for readiness, final status labels, shot-source manifests, motion grounding, music requirements, and proxy handling.

Do not launch motion nodes directly from first-pass stillframe nodes. Motion should use selected/approved still anchors. If the UI does not support an approved-anchor node pattern, document the selected asset and manually connect/upload that selected output into the motion node.

## Music Requirement

Follow the music standard in `docs/PRODUCTION_STANDARD.md` and the details in `docs/IMAGINEART_MUSIC_STUDIO.md`.

## Taste Rules

- Use one dominant campaign grammar.
- Match the ambition level of the user's references in original form; do not merely satisfy the prompt.
- For fashion, beauty, fragrance, luxury, lifestyle, and cinematic brand work, include campaign behavior: world, styling, subject or ritual, camera discovery, editorial progression, and an earned product closeout unless the user explicitly requests a pure product loop.
- For professionally shot/produced ads, prompts should use production language: lens, camera movement, lighting setup, blocking, environment, practical reflections, restrained performance, and physical product interaction.
- If the user asks for a believable main actress/model, prioritize consistency across Seedance clips: identity description, wardrobe, hair, makeup, performance style, camera distance, and repeatable reference-frame strategy.
- Make product, wardrobe, material, surface, light, and camera choices concrete.
- Prefer stillframes/keyframes before motion when consistency matters.
- Use `Nano Banana 2` or `Nano Banana Pro` inside Imagine.Art for stillframes, styleframes, first/last frames, background plates, graphic inserts, title cards, product hero frames, product closeout plates, and key art. Use NB2 for fast iteration and NBP for premium final anchors. Use GPT Image 2 or another Imagine.Art image model only when the asset role requires it, and document the exception.
- Feed approved panels into Seedance as start frames, end frames, or reference images with one clear job each.
- Do not launch final campaign motion from prompt text alone. Generate or upload the needed image reference first, then connect it visibly to the motion node.
- Before launching GPT Image 2 storyboard/reference nodes, confirm the visible UI model and use a validated ratio. Start with `1:1` for storyboard panels unless the live workflow has already proven another ratio works.
- Keep 10-second generated clips realistic: about four major motion phases.
- Add important typography, logos, captions, and CTAs in deterministic edit layers.
- If live footage is needed, create `human-shoot.md` with exact lines, pickups, framing, camera angle, lens feel, performance, environment, wardrobe, and b-roll/overlay notes.
- When using HyperFrames, use it for deterministic finishing only after reviewed motion exists; specify duration, ratio, mood, key elements, beat timing, type, captions, and export, and avoid unnecessary React-component or 4K/60fps requests.
- Cut generic filler. Every frame needs a job.

## Status Labels

Use the exact delivery statuses in `docs/PRODUCTION_STANDARD.md`.

## Public-Safe Rules

Follow the public-safety rule in `docs/PRODUCTION_STANDARD.md`.

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

When the user asks for a `social media campaign`, `30s spot`, `TikTok ad`, `Reels ad`, `commercial`, `professionally shot video`, or `professionally produced video`, interpret the request as a finished real-world video ad workflow by default. The expected deliverable is not just a written concept, static storyboard, prompt pack, or animated HTML/motion-graphics edit.

Brand assets, product photos, mood boards, and style images are creative direction and continuity references. They should guide casting, wardrobe, product truth, environment, lighting, camera grammar, and final lockup, but they do not replace generated motion.

For high-realism ads, Seedance or another Imagine.Art video-generation model is the core production layer. HyperFrames or another editor is the finishing layer for pacing, typography, transitions, music sync, logo lockup, CTA, captions, and final assembly.

Important: a node map is not a finished workflow. Do not treat a pasted graph, prompt pack, canvas sketch, still montage, slideshow, or HyperFrames pan/zoom edit as production-ready until it has source assets, staged run order, approved still anchors, generated music, reviewed motion outputs, a shot-source manifest, and a final edit/export plan.

If the agent has browser access, it should execute the workflow in Imagine.Art, not merely describe it. Follow `docs/AUTOMATION_CONTRACT.md` and `prompts/imagineart_browser_operator.md`. If execution is blocked by login, UI, model, moderation, generation, or export failures, report the exact blocker and status instead of presenting a proxy as final.

Hard motion rule: campaign motion must be image-grounded. Every Seedance or video node must have a visible approved start frame, end frame, reference image, product-truth image, or storyboard panel connection in the Imagine.Art workflow. Text-only video is never allowed for campaign motion.

Hard taste rule: a technically valid Imagine.Art export is not automatically finished. For campaign work, the output must clear reference parity: it needs comparable campaign behavior to the user's references or chosen archetype. Product-only loops, interchangeable macro shots, static pretty motion, and generic luxury surfaces are not finished fashion/beauty/fragrance/luxury campaign films.

## Workflow

1. Read `docs/INPUT_ADAPTERS.md`.
2. Normalize the user's input into a campaign brief.
3. Choose a campaign grammar from `docs/AESTHETIC_SYSTEM.md`.
4. Define reference parity: closest references/archetype, hook behavior, subject/world behavior, camera behavior, editorial progression, product reveal, and final memory image.
5. Build a comprehensive workflow from `docs/IMAGINEART_WORKFLOW_BLUEPRINT.md`.
6. Apply `docs/AUTOMATION_CONTRACT.md`, `docs/PRODUCTION_LEARNINGS.md`, and `docs/WORKFLOW_EXECUTION_GUIDE.md`.
7. Import or explicitly account for every source asset before stillframe generation.
8. Create stillframe prompts with `prompts/imagineart_workflow_builder.md`.
9. Generate stillframe variants before motion and select approved anchors.
10. Build storyboard/reference panels for motion, especially when using Seedance.
11. Create music direction with `prompts/music_studio_prompt_builder.md` and generate the track in Imagine.Art Music Studio.
12. Create motion prompts with `prompts/ai_video_prompt_builder.md`.
13. If using Seedance, follow `docs/SEEDANCE_WORKFLOW_GUIDE.md`.
14. Plan b-roll and product closeout with `docs/BROLL_AND_PRODUCT_CLOSEOUT.md`.
15. Define sections, node names, variants, approval gates, and failure notes.
16. Score outputs with `docs/QUALITY_CONTROL.md`, including the reference-parity table.
17. Diagnose revisions with `prompts/revision_diagnoser.md`.
18. Package final delivery with `prompts/final_delivery_packager.md`.

## Seedance-First Commercial Workflow

Use this sequence when the user asks for a commercial, social media campaign, TikTok/Reels ad, 30s spot, or professionally shot/produced video:

1. Analyze brand assets and extract visual rules.
2. Define target platform, runtime, pacing, audience, CTA, and aspect ratio.
3. Create a hero concept and an 8-12 shot structure for a 30s vertical ad.
4. Generate or select consistent actress/model reference frames when a believable human lead is requested.
5. Generate Seedance-ready prompts per shot, including shared continuity and negative prompts.
6. Generate or specify an original Imagine.Art Music Studio bed with edit hit points.
7. Assemble generated clips in an editor or HyperFrames with beat-synced cuts, type, logo, product lockup, captions, and CTA.
8. QC for realism, product continuity, actress/model consistency, hand/contact issues, fake text, social-platform framing, and reference parity.
9. Deliver the final render plus source prompts, shot-source manifest, edit notes, and revision notes.

If the agent cannot operate Seedance directly, it must explicitly say whether it is preparing prompts for the user to run in Seedance or assembling already-generated Seedance outputs. Do not silently substitute HTML animation, still-image slideshows, or generic prompt packs for a requested finished video ad.

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
- Match the ambition level of the user's references in original form; do not merely satisfy the prompt.
- For fashion, beauty, fragrance, luxury, lifestyle, and cinematic brand work, include campaign behavior: world, styling, subject or ritual, camera discovery, editorial progression, and an earned product closeout unless the user explicitly requests a pure product loop.
- For professionally shot/produced ads, prompts should use production language: lens, camera movement, lighting setup, blocking, environment, practical reflections, restrained performance, and physical product interaction.
- If the user asks for a believable main actress/model, prioritize consistency across Seedance clips: identity description, wardrobe, hair, makeup, performance style, camera distance, and repeatable reference-frame strategy.
- Make product, wardrobe, material, surface, light, and camera choices concrete.
- Prefer stillframes/keyframes before motion when consistency matters.
- Use ImagineArt 2.0 first for original stillframes, product/environment plates, hero/style frames, and visual systems when it can satisfy the role. Use GPT Image 2 when references, storyboard panels, or continuity control are necessary and ImagineArt 2.0 cannot satisfy that role.
- Feed approved panels into Seedance as start frames, end frames, or reference images with one clear job each.
- Do not launch final campaign motion from prompt text alone. Generate or upload the needed image reference first, then connect it visibly to the motion node.
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

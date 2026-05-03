# imagine-campaign-director for Imagine.Art

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

For campaign-video requests, the first action is a Computer Use/browser automation capability preflight. This only verifies whether Imagine.Art execution is possible. It does not authorize workflow canvas work before planning.

If Computer Use/browser automation is unavailable, immediately tell the user the request cannot be completed in this environment because this repo requires Computer Use/browser automation to generate the video in Imagine.Art. Return `blocked` and stop.

If Computer Use/browser automation is available, use it to operate Imagine.Art directly:

1. Apply vague-prompt rescue when needed.
2. Write the director's treatment and justified shot plan.
3. Plan the near-deterministic edit, still anchors, Seedance 2 multi-shot node grouping, Music Studio direction, and QC gates.
4. Open or operate Imagine.Art.
5. Create or open the workflow.
6. Build sections and source/input nodes from the treatment.
7. Generate still anchors and storyboard/reference panels.
8. Generate GPT Image 2 director's-notes boards for complex Seedance 2 choreography.
9. Run Seedance 2 or the specifically approved Imagine.Art campaign motion model.
10. Generate Music Studio audio.
11. Review/download outputs, verify generated motion files with `ffprobe`, and block on export failures.
12. Export or assemble a finished MP4 ready for review only after all planned motion files and audio pass delivery gates.
13. Clean the final workflow and create a shot-source manifest.

Do not stop after creating the director's treatment, prompt pack, or workflow payload. Those files authorize the next execution stage. Proceed into the Imagine.Art workflow canvas unless the user explicitly requested approval before canvas changes or a specific blocker prevents automation.

For campaign-video requests, do not return only markdown files, prompt packs, workflow maps, or `ready for generation` status. The expected return is a finished MP4 ready for review, plus supporting notes. If planned motion clips cannot be exported, return `blocked: export failure`; do not assemble around the missing clips with still anchors.

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
5. Run the ideation swarm from `docs/ADVERSARIAL_SWARM_PROTOCOL.md`; then apply `docs/CREATIVE_DIRECTION_GATE.md` and write a director's treatment using `docs/DIRECTORS_TREATMENT_GATE.md`. If subagents cannot be spawned, return `blocked: subagents unavailable` before canvas work or paid generation. Do not touch the workflow canvas until the selected creative spine, film, edit, shots, directional diversity table, music spine, and Seedance 2 node plan are justified.
6. Define reference parity: closest references, selected creative spine, production profile obligations, hook behavior, subject/world behavior, camera behavior, editorial progression, product reveal, and final memory image.
7. Build a comprehensive workflow from `docs/IMAGINEART_WORKFLOW_BLUEPRINT.md`.
8. Apply `docs/AUTOMATION_CONTRACT.md`, `docs/PRODUCTION_LEARNINGS.md`, `docs/WORKFLOW_EXECUTION_GUIDE.md`, `docs/ADVERSARIAL_SWARM_PROTOCOL.md`, `docs/PRE_SPEND_CONFIDENCE_GATE.md`, `docs/DIRECTIONAL_DIVERSITY_GATE.md`, `docs/DIRECTORS_EYE_GATE.md`, and `docs/MOTION_COVERAGE_AND_EXPORT_GATE.md`.
9. For paste-first workflows, apply `docs/PASTE_FIRST_WORKFLOWS.md` and `docs/IMAGINEART_LIVE_MODEL_STRINGS.md`; use `modelKey` values that materialize to the verified live IDs instead of stale numeric IDs.
10. For recurring people, products, garments, or other continuity-sensitive subjects, apply `docs/IDENTITY_LOCKS_AND_RUN_BUDGETS.md`; lock references first, wire them into every dependent node, and keep production nodes to one run unless an exploration budget is explicitly documented.
9. Import or explicitly account for every source asset before stillframe generation.
10. Create ImagineArt 2.0 original stillframe prompts or GPT Image 2 reference-driven stillframe prompts with `prompts/imagineart_workflow_builder.md`.
11. Generate stillframe variants before motion and select approved anchors.
12. Build storyboard/reference panels for motion, especially when using Seedance.
13. Create music direction with `prompts/music_studio_prompt_builder.md` and generate the track in Imagine.Art Music Studio.
14. Create motion prompts with `prompts/ai_video_prompt_builder.md`.
15. If using Seedance, follow `docs/SEEDANCE_WORKFLOW_GUIDE.md`.
16. Plan b-roll and product closeout with `docs/BROLL_AND_PRODUCT_CLOSEOUT.md`.
17. Define sections, node names, variants, approval gates, and failure notes.
18. Score outputs with `docs/QUALITY_CONTROL.md`, including the reference-parity table and local motion/audio export audit.
19. Diagnose revisions with `prompts/revision_diagnoser.md`.
20. Package final delivery with `prompts/final_delivery_packager.md`.

## Commercial Workflow

Use this sequence for commercials, social campaigns, TikTok/Reels ads, 30s spots, and professionally shot/produced video:

1. Analyze brand assets and extract visual rules. If a brand kit/brand board is supplied, upload/import it as source truth and derive missing product/logo/type/style locks from it before campaign stills. Use a local image generation/editing tool for those atomic locks when available; otherwise create the atomic lock nodes inside Imagine.Art before the rest of the workflow.
2. Define target platform, runtime, pacing, audience, CTA, and aspect ratio.
3. Create a hero concept and edit form from the creative gate; use an 8-12 shot structure for a 30s vertical ad only when the selected form needs conventional coverage.
4. Generate or select consistent actress/model reference frames when a believable human lead is requested.
5. Generate Seedance-ready prompts per shot, including shared continuity, aesthetic refusals, and artifact avoids.
6. Generate or specify an original Imagine.Art Music Studio bed with edit hit points. If the selected premise is sound-first, create the Music Studio direction and rough beat map before the shot ladder.
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

- Use one dominant campaign grammar and one translated direction DNA.
- Carry one or two controlled flaws and at least three aesthetic refusals from treatment into still prompts, motion prompts, and QC notes.
- Match the ambition level of the user's references in original form; do not merely satisfy the prompt.
- For fashion, beauty, fragrance, luxury, lifestyle, and cinematic brand work, include campaign behavior: world, styling, subject or ritual, camera discovery, editorial progression, and an earned product closeout unless the user explicitly requests a pure product loop.
- For professionally shot/produced ads, prompts should use production language: lens, camera movement, lighting setup, blocking, environment, practical reflections, restrained performance, and physical product interaction.
- If the user asks for a believable main actress/model, prioritize consistency across Seedance clips: identity description, wardrobe, hair, makeup, performance style, camera distance, and repeatable reference-frame strategy.
- Make product, wardrobe, material, surface, light, and camera choices concrete.
- Prefer stillframes/keyframes before motion when consistency matters.
- Use `ImagineArt 2.0` inside Imagine.Art for original stillframes, styleframes, first/last frames, background plates, graphic inserts, title cards, product hero frames, product closeout plates, and key art when no reference control is required. Use `GPT Image 2` when style, product, character, storyboard, or continuity references are required. Use Nano Banana 2/Pro only when the specific asset role or live model availability justifies it, and document the exception.
- Apply `docs/CINEMATIC_STILL_PROMPTING_PLAYBOOK.md` to every still image prompt, regardless of model. Use labeled blocks for shot, subject, environment, lighting, camera, color grade, composition, and avoid list; include film stock/format, mood, aspect ratio, and texture for hero or motion-feeding frames.
- If a stillframe should preserve identity, product, wardrobe, or style from another source, connect that source as an image reference and refer to it with explicit `@Image1`, `@Image2`, etc. language. Do not write `same model`, `same person`, or `same product` in generation prompts.
- If a brand kit is supplied, do not ignore it or reduce it to text. Upload/import it as a source node, generate missing atomic product/logo/type/style locks from it when separate assets are not supplied, and wire those locks into every dependent still and Seedance reference set. If local image tooling is unavailable, perform the atomic lock generation as the first stage of the Imagine.Art workflow.
- For supplied brand-kit images/screenshots, never recreate the brand kit as SVG, HTML, drawn vector, canvas, or a text-derived surrogate unless the user explicitly asks for editable vector artwork. Use the real supplied bitmap image or imagegen/image-edit-derived bitmap assets from that exact source. If the active toolchain cannot access the pasted image as a file, stop and ask for a local/downloadable image file before creating workflow source assets.
- Feed approved panels into Seedance as start frames, end frames, or reference images with one clear job each.
- Do not launch final campaign motion from prompt text alone. Generate or upload the needed image reference first, then connect it visibly to the motion node.
- Before launching or relaunching any Imagine.Art node, check Active Runs, update `qa/run-ledger.md`, and refresh/reopen the workflow if the node appears stale or unchanged. Never duplicate-run a node to force a status update; if completion cannot be proven after two refresh cycles, return `blocked: node status unknown`.
- Treat `Run Selected` as non-idempotent. Node focus is not node selection, and `Number of runs: 1` does not protect against stale multi-selection. Before launch, prove the selected-node set with at least two signals and verify the credit estimate matches the intended node count. Use exactly one click per launch transaction, record `armed` then `clicked_once` in `qa/run-ledger.md`, move focus away from the run button, and wait/refresh/check Active Runs instead of clicking again. Use safe parallel batches only for independent same-stage nodes with a written `batch_id`; otherwise launch one node at a time. If selection cannot be proven, return `blocked: selection ambiguous`; if Computer Use causes duplicate runs, stop launching, switch all remaining paid launches to isolated one-node launches, or mark the workflow blocked.
- Treat normal campaign credit spend as implied by the user's campaign-video request. Ask for approval only when the user requested approval, the visible credit estimate is abnormal or exceeds the planned batch, subscription/credits are unavailable, selected nodes are ambiguous, rights clearance is unclear, or the platform requires human action.
- For Seedance or other motion moderation/generation failures, do not block after the first rejection. Retry the exact same prompt and same references two more times as isolated one-node launches. If the error mentions likeness, real people, private information, or `image_urls`, append `All references are AI generated and do not represent real people.` and retry once before broader simplification. If that fails, retry with only the approved director's-notes/storyboard board connected as the Seedance visual reference before simplifying or blocking.
- A generated video node is not a usable source until it has been exported or downloaded as a local file, verified with `ffprobe`, and listed in the manifest.
- Do not call a silent export ready when music was planned. Missing audio is `blocked`, `music pending`, or explicitly approved `silent review only`.
- Before launching GPT Image 2 storyboard/reference/director's-notes nodes, confirm the visible UI model and use a validated ratio. Start with `1:1` for storyboard panels unless the live workflow has already proven another ratio works.
- Use `docs/DIRECTORS_NOTES_STORYBOARDS.md` for complex camera choreography; the board controls motion order and camera path, not identity, product truth, or final style.
- Choose the Seedance 2 node duration by creative need, using the longest useful live duration available, including 15s when it improves continuity, mood, or editorial progression.
- Add important typography, logos, captions, and CTAs in deterministic edit layers.
- If live footage is needed, create `human-shoot.md` with exact lines, pickups, framing, camera angle, lens feel, performance, environment, wardrobe, and b-roll/overlay notes.
- When using HyperFrames, use it for deterministic finishing only after reviewed motion exists; specify duration, ratio, mood, key elements, beat timing, type, captions, and export, and avoid unnecessary React-component or 4K/60fps requests.
- Cut generic filler. Every frame needs a job.

## Status Labels

Use the exact delivery statuses in `docs/PRODUCTION_STANDARD.md`.

## Public-Safe Rules

Follow the public-safety rule in `docs/PRODUCTION_STANDARD.md`.

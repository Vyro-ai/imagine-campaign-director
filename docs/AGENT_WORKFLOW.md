# Agent Workflow

CampaignCraft agents should drive Imagine.Art Workflows from intake through final delivery.

## 1. Intake

Accept briefs, prompts, style images, product photos, mood boards, existing clips, brand notes, or mixed assets. Use `docs/INPUT_ADAPTERS.md` to normalize the input.

The user may hand over incomplete material. The agent's job is to synthesize the missing production inputs needed to make a strong finished video: brief, audience, platform, shot structure, reference frames, model continuity, music direction, Seedance prompts, edit plan, and QC rubric.

Ask targeted questions when the missing answer changes the deliverable. Keep the questions short and production-relevant:

- platform and aspect ratio
- runtime
- audience
- CTA or end-card action
- product/service priority
- required brand assets
- human/model presence and casting direction
- realism level
- music/vocal preference
- legal or rights constraints

If the user wants speed or does not answer, make conservative assumptions and document them before execution.

Requests for a `social media campaign`, `30s spot`, `TikTok/Reels ad`, `commercial`, or `professionally shot/produced video` mean the expected output is a believable real-world video ad. Do not satisfy those requests with a written campaign concept, static storyboard, motion-graphics-only HTML edit, generic prompt pack, or still-image slideshow.

## 2. Campaign Grammar

Choose one dominant grammar from `docs/AESTHETIC_SYSTEM.md`. The grammar controls shot design, music direction, workflow sections, and QC.

Read `docs/PRODUCTION_LEARNINGS.md` before finalizing the workflow plan.

Before motion planning, define the reference-parity target:

- If the user supplied references, choose the closest 2-4 and summarize their structural behavior.
- If the user supplied no references, choose the closest campaign archetype and state the expected behavior.
- Translate the references into original shot grammar: hook behavior, subject/world behavior, camera behavior, edit progression, product reveal, and final memory image.

Do not reduce a fashion, beauty, fragrance, luxury, lifestyle, or cinematic brand brief into a product-only loop unless the user explicitly asks for that.

## 2A. Seedance-First Commercial Workflow

Use this workflow when the deliverable is a real commercial/social spot:

1. Analyze brand assets and extract visual rules.
2. Define target platform, runtime, pacing, audience, CTA, and aspect ratio.
3. Create a hero concept and 8-12 shot structure for a 30s vertical ad.
4. Generate or select consistent actress/model reference frames when a believable human lead is requested.
5. Generate reference images for every shot that needs visual continuity.
6. Generate Seedance-ready prompts per shot with shared continuity and negative prompts.
7. Generate or specify an original Music Studio bed with edit hit points.
8. Run Seedance 2 or the available Imagine.Art video model from start frames, end frames, or image references.
9. Assemble generated clips in HyperFrames or another editor with beat-synced cuts, type, logo/product lockup, graphics, captions, and CTA.
10. QC for realism, product continuity, actress/model consistency, hand/contact issues, fake text, social-platform framing, and reference parity.
11. Deliver final render plus source prompts, shot-source manifest, edit notes, and revision notes.

Model priority for reference images:

1. ImagineArt 2.0 for original stillframes, product/environment plates, and styleframe generation when it can satisfy the role directly.
2. GPT Image 2 when image references, storyboard/reference panels, or stronger continuity control are needed and ImagineArt 2.0 does not support the needed reference behavior.
3. Other Imagine.Art image models only when the live UI or project constraints make them the better fit.

Static image generation is support work. It creates reference frames, hero/model plates, product truth frames, and storyboard panels. It does not replace generated motion when the user asks for a real commercial.

## 3. Imagine.Art Workflow Blueprint

Build a comprehensive node/section plan using `docs/IMAGINEART_WORKFLOW_BLUEPRINT.md`.

Use `docs/WORKFLOW_EXECUTION_GUIDE.md` for section names, node naming, connection checks, launch discipline, and reject handling.

The plan is not enough. The agent must distinguish:

- `workflow map`: a proposed graph/section structure
- `operational workflow`: a live Imagine.Art setup with source assets imported and launch order defined
- `animatic/proxy`: stills, crops, prompt cards, workflow screenshots, or pan/zoom timing edits used only to test structure
- `finished campaign`: reviewed Imagine.Art motion or supplied motion, generated/supplied music, deterministic type, QC, shot-source manifest, and final export

Never call a workflow operational just because nodes were pasted onto a canvas.

The output must specify:

- workflow sections
- input nodes
- analysis nodes
- stillframe nodes
- motion nodes
- music direction node
- edit assembly notes
- typography/end-card notes
- QC/reject handling
- export notes

## 4. Stillframes

Create stillframe prompts for the visual anchors before motion:

- hook frame
- product hero
- environment plate
- material macro
- human/casting frame if needed
- final end-card plate

Stillframe operation must be staged:

1. import/upload source assets
2. generate variants
3. reject weak/artifacted outputs
4. choose approved anchors
5. only then wire or upload anchors into motion nodes

## 4A. Motion Storyboard

For Seedance or any reference-driven motion, create a motion storyboard before launching video.

The storyboard should include:

- one panel per major phase
- shot size and camera position
- camera movement direction
- subject/product movement direction
- stable identity/product details
- transition intent into the next panel
- which reference input each panel should become

Use this board to constrain the model. A beautiful still is not enough if the camera path is vague.

## 5. Music

Create and execute an Imagine.Art Music Studio prompt for every campaign. If the input is visual, translate it into text music direction.

Use `docs/MUSIC_LED_EDITING.md` to define the edit spine before motion prompts.

Do not represent music as an image card or static note when the deliverable needs a finished video. A note can document direction, but the campaign still needs a generated or supplied audio track before final assembly.

If the user does not provide music, generate or specify an original music bed before final edit assembly. The music bed should include edit hit points so Seedance clip selection and HyperFrames timing can land on real beats or phrase changes.

## 6. Motion

Create one motion prompt per shot or coherent motion block. Keep generated motion realistic. A 10-second clip should usually have about four major phases.

If using Seedance or time-segmented motion, follow `docs/SEEDANCE_WORKFLOW_GUIDE.md`.

Do not replace this step with a HyperFrames slideshow, crop montage, or Ken Burns edit. Those are allowed only as `animatic/proxy` outputs while motion is pending.

For high-realism ads, Seedance/video-generation clips are the core production layer. HyperFrames is the finishing and assembly layer, not the substitute for production footage.

## 7. Workflow Execution Plan

Tell the user how to build or duplicate the Imagine.Art Workflow:

- start from a relevant preset/featured workflow when available
- otherwise build from blank canvas
- upload source assets
- connect prompt/image/video/music nodes
- generate variants
- move approved outputs into approved sections
- isolate rejects

If operating the UI directly, run in this order:

1. source imports/uploads
2. stillframe variants
3. stillframe review/approval
4. motion from approved anchors
5. b-roll/inserts
6. Music Studio track
7. deterministic edit/export

Do not run a whole graph at once when downstream motion depends on unreviewed still outputs.

## 8. QC

Score stillframes, motion clips, music fit, typography, and final edit using `docs/QUALITY_CONTROL.md`.

Use `docs/BROLL_AND_PRODUCT_CLOSEOUT.md` before final assembly so the spot has breath and a product-first ending.

Render QC is mandatory. After exporting, extract a frame sheet with `scripts/extract_review_frames.py` and inspect the first frame, first second, first product reveal, any hand/face/product contact, and final memory image. A technically successful export is not finished if the artifact review fails.

Also create a final shot-source manifest. If any visual timeline segment is sourced from `still_pan_zoom`, `slideshow`, `mood_board_crop`, `brand_board_crop`, `palette_board`, `prompt_card`, `workflow_screenshot`, or `unreviewed_motion`, the status must be `partial/proxy`, not `finished`.

Also create a reference-parity table. If the output lacks the reference pack's category-level behavior, such as subject/world presence, styling intent, location specificity, camera behavior, editorial progression, production design density, or earned product reveal, the status must be `needs revision` or `reject`, even when every shot is valid Imagine.Art motion.

## 9. Revision

Use `prompts/revision_diagnoser.md`. Do not regenerate blindly. Diagnose whether the problem is input analysis, prompt, model choice, motion complexity, music mismatch, edit rhythm, typography, or artifact failure.

## 10. Delivery

Package final prompts, workflow map, selected assets, music direction, QC notes, export specs, and known risks.

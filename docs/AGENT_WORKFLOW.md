# Agent Workflow

CampaignCraft agents should drive Imagine.Art Workflows from intake through final delivery.

## 1. Intake

Accept briefs, prompts, style images, product photos, mood boards, existing clips, brand notes, or mixed assets. Use `docs/INPUT_ADAPTERS.md` to normalize the input.

## 2. Campaign Grammar

Choose one dominant grammar from `docs/AESTHETIC_SYSTEM.md`. The grammar controls shot design, music direction, workflow sections, and QC.

Read `docs/PRODUCTION_LEARNINGS.md` before finalizing the workflow plan.

## 3. Imagine.Art Workflow Blueprint

Build a comprehensive node/section plan using `docs/IMAGINEART_WORKFLOW_BLUEPRINT.md`.

Use `docs/WORKFLOW_EXECUTION_GUIDE.md` for section names, node naming, connection checks, launch discipline, and reject handling.

The plan is not enough. The agent must distinguish:

- `workflow map`: a proposed graph/section structure
- `operational workflow`: a live Imagine.Art setup with source assets imported and launch order defined
- `finished campaign`: generated stills, reviewed motion, generated music, deterministic type, QC, and final export

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

## 6. Motion

Create one motion prompt per shot or coherent motion block. Keep generated motion realistic. A 10-second clip should usually have about four major phases.

If using Seedance or time-segmented motion, follow `docs/SEEDANCE_WORKFLOW_GUIDE.md`.

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

## 9. Revision

Use `prompts/revision_diagnoser.md`. Do not regenerate blindly. Diagnose whether the problem is input analysis, prompt, model choice, motion complexity, music mismatch, edit rhythm, typography, or artifact failure.

## 10. Delivery

Package final prompts, workflow map, selected assets, music direction, QC notes, export specs, and known risks.

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

## 5. Music

Create an Imagine.Art Music Studio prompt for every campaign. If the input is visual, translate it into text music direction.

Use `docs/MUSIC_LED_EDITING.md` to define the edit spine before motion prompts.

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

## 8. QC

Score stillframes, motion clips, music fit, typography, and final edit using `docs/QUALITY_CONTROL.md`.

Use `docs/BROLL_AND_PRODUCT_CLOSEOUT.md` before final assembly so the spot has breath and a product-first ending.

## 9. Revision

Use `prompts/revision_diagnoser.md`. Do not regenerate blindly. Diagnose whether the problem is input analysis, prompt, model choice, motion complexity, music mismatch, edit rhythm, typography, or artifact failure.

## 10. Delivery

Package final prompts, workflow map, selected assets, music direction, QC notes, export specs, and known risks.

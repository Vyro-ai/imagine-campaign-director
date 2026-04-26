# Workflow Execution Guide

Use this when turning a CampaignCraft plan into an Imagine.Art Workflow.

## Build Strategy

Start from a relevant preset or featured workflow when it matches the job. Use a blank canvas for custom campaign systems. For complex repeatable graphs, create a structured workflow plan before opening the canvas.

Avoid the paste-first trap: a large pasted graph can look complete while being unusable. A production workflow is only valid when the source assets are present, the run order is staged, and the outputs that feed motion have been selected intentionally.

## Canvas Sections

Use sections by role, not vague version numbers:

- `SOURCE / Inputs`
- `ANALYSIS / Asset Roles`
- `STRATEGY / Campaign Grammar`
- `STILLS / Look Development`
- `STILLS / Approved Anchors`
- `MOTION / Hero Shots`
- `BROLL / Inserts`
- `MUSIC / Music Studio Direction`
- `EDIT / Timing + Assembly`
- `TYPE / End Card`
- `QC / Rejects`
- `EXPORT / Finals`

## Node Naming

Name nodes by decision and role:

- `APPROVED / Bottle Hero`
- `BROLL / Wet Stone Detail`
- `REJECT / Hand Artifact`
- `REJECT / Product Drift`
- `TYPE / Final Product Card`
- `MUSIC / 15s Nocturne Bed`

## Connection Verification

Do not trust the prompt text to carry continuity. If a prompt relies on a product photo, style image, start frame, mood board, reference video, or music guide, the canvas must show the relevant connection or imported asset.

Before launch:

- verify source node exists
- verify source asset is actually uploaded/imported, not just described in text
- verify downstream node is connected
- verify the model/input mode matches the intended reference role
- verify the rendered canvas shows the connection
- verify downstream motion is connected to an approved/selected still, not a first-pass unreviewed branch

## Stage Gates

Run campaigns in stages:

1. `SOURCE`: upload/import product photos, style images, mood boards, references, footage, and brand notes.
2. `ANALYSIS`: assign asset roles and identify continuity/artifact risks.
3. `STILLS`: generate look-development variants only.
4. `APPROVED`: select still anchors and document why they passed.
5. `MOTION`: animate from approved anchors.
6. `BROLL`: generate inserts only after the main visual world is stable.
7. `MUSIC`: generate the Music Studio track.
8. `EDIT`: assemble with deterministic type, captions, crop, timing, and final card.
9. `QC`: reject, revise, or export.

Do not run stages 3-6 as one bulk launch. The stillframe approval gate is the taste-transfer step.

## Launch Discipline

- Run selected nodes once per intended batch.
- Check Active Runs after launch.
- Do not click again because the UI is slow.
- If duplicate runs appear, treat it as operator error and stop scaling until the workflow is controlled.
- If a node fails, document the failure and continue with other branches.
- Do not leave all pasted nodes selected before launch.
- If multiple nodes are selected accidentally, deselect and select only the intended stage.
- Never launch motion nodes before their start frames or references are approved.
- Never launch a generated text/logo/label requirement inside video when it belongs in deterministic post-production.

## Reject Handling

Do not delete all failures. Keep rejected material isolated so the team does not accidentally reuse it and so future agents understand what failed.

## Completion Standard

Do not report a workflow as ready until:

- sections are readable
- source assets are imported/uploaded
- launch-critical connections are visible
- approved stills are separated
- motion outputs are reviewed
- Music Studio prompt/track is generated or explicitly pending
- final assembly plan exists
- QC notes exist

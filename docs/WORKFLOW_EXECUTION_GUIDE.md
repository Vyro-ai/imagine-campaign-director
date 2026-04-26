# Workflow Execution Guide

Use this when turning a CampaignCraft plan into an Imagine.Art Workflow.

## Build Strategy

Start from a relevant preset or featured workflow when it matches the job. Use a blank canvas for custom campaign systems. For complex repeatable graphs, create a structured workflow plan before opening the canvas.

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
- verify downstream node is connected
- verify the model/input mode matches the intended reference role
- verify the rendered canvas shows the connection

## Launch Discipline

- Run selected nodes once per intended batch.
- Check Active Runs after launch.
- Do not click again because the UI is slow.
- If duplicate runs appear, treat it as operator error and stop scaling until the workflow is controlled.
- If a node fails, document the failure and continue with other branches.

## Reject Handling

Do not delete all failures. Keep rejected material isolated so the team does not accidentally reuse it and so future agents understand what failed.

## Completion Standard

Do not report a workflow as ready until:

- sections are readable
- launch-critical connections are visible
- approved stills are separated
- motion outputs are reviewed
- Music Studio prompt/track is documented
- final assembly plan exists
- QC notes exist

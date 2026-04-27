# Imagine.Art Automation Contract

CampaignCraft is not finished when it writes prompts. A successful run must move from user input to an executable Imagine.Art workflow, generated assets, reviewed motion, music, final assembly, and QA notes.

## Required Automation Outcome

From a brief, prompt, style image, product photo, mood board, reference clip, or mixed input, the agent must produce:

1. normalized campaign brief
2. source asset role map
3. Imagine.Art workflow section plan
4. generated still anchors inside Imagine.Art
5. approved storyboard/reference panels for motion
6. Seedance or other Imagine.Art motion clips from approved references
7. Imagine.Art Music Studio prompt and generated audio
8. final edit assembled from reviewed motion outputs
9. QC report and revision diagnosis
10. clean final workflow containing only used nodes

If browser execution, login state, model availability, or the Imagine.Art UI blocks any required step, the agent must say so directly and mark the campaign as blocked or partial. It must not call a prompt pack, canvas sketch, still-only proxy, slideshow, local still pan/zoom edit, or failed workflow a finished campaign video.

## Final-Shot Source Manifest

Before a campaign can be `finished`, create a shot-source manifest in the QC report. Every shot in the final timeline must list:

- time range
- visual job
- source file
- source type
- Imagine.Art workflow node or Music Studio item
- review status

Allowed `source_type` values for finished campaign footage:

- `imagineart_motion`: reviewed video generated in Imagine.Art Workflows
- `supplied_motion`: user-supplied real video or licensed/generated motion
- `deterministic_type`: typography, captions, end cards, masks, grades, and layout generated in the edit
- `music_studio_audio`: generated Imagine.Art Music Studio audio
- `supplied_audio`: user-supplied audio

Disallowed `source_type` values for final campaign footage unless explicitly labeled `partial/proxy`:

- `still_pan_zoom`
- `slideshow`
- `mood_board_crop`
- `brand_board_crop`
- `palette_board`
- `prompt_card`
- `workflow_screenshot`
- `unreviewed_motion`

If any visual shot uses a disallowed source type, the deliverable is not finished. It is an animatic or proxy, even if it has music, transitions, and a clean render.

## Seamless User Standard

The user should not need to understand workflow plumbing. The agent owns:

- creating or opening the workflow
- uploading/importing source inputs
- assigning asset roles
- choosing models
- selecting valid aspect ratios
- staging node execution
- monitoring Active Runs
- downloading or recording selected outputs
- deleting failed, rejected, abandoned, and unused nodes
- documenting every failure locally
- preparing final edit and delivery assets

The user should only be asked for approval when a creative decision materially changes the campaign, rights clearance is unclear, or the platform requires a human action that cannot be automated.

## Execution Preflight

Before launching any generation node, verify:

- the browser is logged in to Imagine.Art
- the correct workflow is open
- source assets are visible on the canvas or imported into the intended node
- selected nodes are only the intended batch
- each node displays the intended model name in the UI
- each node uses a validated aspect ratio for that model
- image nodes are separated from motion nodes
- motion nodes consume approved anchors, not first-pass branches
- music direction exists before final edit planning
- no stale failed nodes are being treated as usable material

Do not rely on pasted JSON alone. If a pasted node resolves to a different model in the UI, the UI value wins and the node must be corrected before launch.

Known example: pasted Seedance 2.0 workflow nodes may resolve visually to `1:1` even when the payload requests `9:16`. The agent must inspect the node panel, correct the visible ratio to the delivery ratio, and only then launch.

## Staged Run Order

Run stages in this order:

1. `SOURCE`: upload/import and verify all user inputs.
2. `ANALYSIS`: create asset-role and campaign-direction notes.
3. `STILLS`: generate stillframe/look variants.
4. `APPROVED`: isolate chosen anchors.
5. `STORYBOARD`: create motion reference panels or camera-movement boards.
6. `MOTION`: generate Seedance or other motion clips from approved references.
7. `MUSIC`: generate the track in Imagine.Art Music Studio.
8. `EDIT`: assemble selected clips, music, captions, crop, and product closeout.
9. `QC`: review artifacts and revise.
10. `CLEAN`: delete all nodes that are not part of the final used workflow.

Do not bulk-run stills, storyboard references, and motion together. The taste transfer happens at the approval boundaries.

## Known UI Failure Classes

### Wrong Model After Paste

If an imported or pasted node displays the wrong model:

- stop before launch
- correct the model through the UI, or recreate the node manually
- document the schema mismatch in QA
- do not trust the underlying payload until the visible UI confirms the model

### Aspect Ratio Rejected

If a backend rejects an aspect ratio that the UI appeared to offer:

- document the exact rejected value
- delete or reset the failed node
- retry with a known safe ratio from `config/imagineart_model_matrix.json`
- keep the same creative job, but simplify the frame if needed

### Aspect Ratio Reset After Paste

If a pasted or imported video node displays the wrong aspect ratio:

- stop before launch
- correct the visible UI ratio manually, or delete and recreate the node
- record the mismatch in QA
- do not assume the clipboard payload or config file won
- launch only after the node panel visibly shows the intended ratio

For vertical campaign deliverables, this is a hard gate. A `9:16` brief with a `1:1` live node is not ready.

### Music Studio Handoff Drift

If the public Music Studio page hands a prompt into the app:

- verify the in-app prompt before generation
- remove appended default phrases that change the brief
- verify instrumental/vocal state
- verify duration, genre, and mood fields where available
- download the generated audio and copy it into the local workspace

Music Studio may generate a longer track than the edit target. That is acceptable if the final assembly trims the generated audio intentionally and documents the source duration.

### Moderation Placeholder

If an output is a moderation placeholder or generic failure image:

- treat it as failed even if the node technically completed
- do not use it as a reference image
- save the failure note locally
- simplify risky wording, remove brand-name shorthand, reduce bodily/action ambiguity, and retry once
- if it fails again, switch model or redesign the shot

### Motion Drift

If motion changes the product, face, wardrobe, or core composition:

- reduce the action
- use fewer references with clearer roles
- animate from stronger start/end frames
- move text/logo/product claims into deterministic edit layers

## Final Workflow Cleanliness

The final live workflow must contain only nodes actually used in the finished campaign:

- source/input nodes used by the final output
- analysis/direction notes needed to understand the final build
- approved still anchors
- approved storyboard/reference panels
- selected motion clips
- selected Music Studio output
- edit/export/QC notes

Delete failed, rejected, abandoned, experimental, duplicate, and unused nodes from the final production workflow after documenting them in the local QA report. A future agent should be able to open the workflow and understand the final production path without guessing which branches are real.

If a run changes direction, old nodes must be removed from the live final workflow, not merely ignored. Keep the forensic record in local QA, not as clutter in the production graph.

## Completion Language

Use precise status labels:

- `finished`: final video assembled from reviewed Imagine.Art motion or supplied motion, with generated/supplied audio and a shot-source manifest proving every visual shot is valid final footage
- `ready for generation`: workflow and prompts are ready, but generation has not run
- `motion pending`: stills/references are ready, motion has not completed
- `partial/proxy`: deterministic edit or still animatic exists, but required Imagine.Art motion is missing
- `blocked`: login, UI, model, moderation, generation, or export failure prevents completion

Never use `finished` for a proxy, slideshow, or still pan/zoom edit.

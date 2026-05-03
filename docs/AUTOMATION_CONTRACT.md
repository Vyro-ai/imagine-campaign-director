# Imagine.Art Automation Contract

This repo is not finished when it writes prompts. A successful run must move from user input to an executable Imagine.Art workflow, generated assets, reviewed motion, music, final assembly, and QA notes.

## Default Interpretation

When the user asks for a `social media campaign`, `30s spot`, `TikTok/Reels ad`, `commercial`, or `professionally shot/produced video`, the default deliverable is a finished MP4 ready for user review. Computer Use, browser automation, or desktop control should be used to operate Imagine.Art whenever available.

The primary creative output should be a believable real-world video commercial. Do not silently substitute:

- written campaign concepts
- static storyboards
- still-image slideshows
- animated HTML-only edits
- generic prompt packs
- mood-board videos
- motion-graphics-only pieces

Brand assets, product photos, mood boards, style images, and reference clips are continuity and creative-direction inputs. They should guide the generated commercial, not become the commercial.

For high-realism ads, Seedance 2 or the available Imagine.Art video-generation model is the core production layer. HyperFrames or another editor is the finishing layer for pacing, typography, transitions, music sync, logo lockup, CTA, captions, and final assembly.

HyperFrames is recommended for final assembly after reviewed Imagine.Art motion exists. If HyperFrames is unavailable and the runtime can install or enable it, get any required user approval for installation and set it up before final assembly. If it cannot be installed or enabled, use another available editor only for finishing reviewed motion, or report the final-assembly blocker. Do not use HyperFrames, HTML, canvas, slideshow, or local rendering to replace missing Imagine.Art motion.

## Required Automation Outcome

From a brief, prompt, style image, product photo, mood board, reference clip, or mixed input, the agent must produce:

1. normalized campaign brief
2. source asset role map
3. Imagine.Art workflow section plan
4. clarified plan from targeted user questions or documented assumptions
5. generated still anchors/reference frames inside Imagine.Art
6. approved storyboard/reference panels for motion
7. Seedance 2 or other Imagine.Art motion clips from visible approved image/start-frame/reference connections
8. Imagine.Art Music Studio prompt and generated or supplied audio
9. final edit assembled from reviewed motion outputs
10. QC report and revision diagnosis
11. clean final workflow containing only used nodes

Do not return only markdown files, prompt packs, workflow maps, or `ready for generation` status for a campaign-video request. Those are supporting artifacts, not the deliverable.

If Computer Use/browser execution, login state, model availability, or the Imagine.Art UI blocks any required step, the agent must say so directly and mark the campaign as blocked or partial. It must not call a prompt pack, canvas sketch, still-only proxy, slideshow, local still pan/zoom edit, or failed workflow a finished campaign video.

Do not claim "browser execution is unavailable here" without first checking whether Computer Use, browser automation, desktop control, or the in-app browser can operate Imagine.Art. If no execution tool is available, status is `blocked`, not `ready for generation`.

## Finished Means Campaign-Grade, Not Merely Executed

A campaign is not `finished` just because the workflow ran, the shots are image-grounded, and the export exists. Those are lineage requirements. The creative requirement is reference parity.

Before using `finished`, the agent must prove the output belongs in the same category as the intended reference set:

- If the user supplied reference videos, compare against the closest 2-4 references.
- If the user supplied only a brief, compare against the selected creative spine, treatment, and production profile obligations.
- If the campaign is fashion, beauty, fragrance, luxury, lifestyle, or cinematic brand work, do not accept a product-only loop unless the user explicitly asked for one.

Reference parity does not mean copying. It means the output has comparable campaign grammar: subject/world presence, styling intent, location specificity, camera behavior, edit progression, production design density, and an earned final product memory image.

If the result is technically valid but visually small, static, repetitive, packshot-heavy, or far below the reference ambition, status is `needs revision`, `motion pending`, or `blocked`, not `finished`.

## Non-Negotiable Motion Grounding

Every AI-generated motion shot in a finished campaign must be grounded by a visible source visual in the Imagine.Art workflow:

- approved start frame
- approved end frame
- reference image
- product-truth image
- storyboard/camera-movement panel
- uploaded style, mood, or subject reference assigned to one clear role

Text-only video generation is forbidden for campaign motion. Each motion node must visibly consume the relevant reference. A longer prompt is not a substitute for the connection.

If reference upload, source import, start-frame wiring, end-frame wiring, or reference-image wiring is blocked, the campaign is `blocked` or `motion pending` until the reference problem is fixed. Do not create a text-only video workaround.

## User Query Requirement

Before execution, query the user when missing information materially changes the final deliverable:

- target platform and aspect ratio
- runtime
- primary audience
- CTA
- product/service priority
- realism level
- main actress/model requirements
- voiceover, vocals, or instrumental music preference
- mandatory brand assets
- rights, likeness, or usage constraints

If the user does not answer and the task can proceed safely, make conservative assumptions and document them in the brief and QC report. Do not use lack of detail as a reason to downgrade a video ad into a concept package.

## Reference Image Model Priority

Generate all reference frames necessary for Seedance before motion.

Default priority:

1. `ImagineArt 2.0` for original stillframes, product/environment plates, hero/style frames, and visual systems when it can satisfy the role directly.
2. `GPT Image 2` when reference-driven generation, storyboard/reference panels, or continuity control is necessary and ImagineArt 2.0 does not support the needed reference behavior.
3. `Nano Banana 2` only when ImagineArt 2.0/GPT Image 2 are not the right fit for the specific asset role or live workflow availability.
4. `Nano Banana Pro` only when premium final still fidelity, product-truth precision, or another NBP-specific advantage is required.
5. Other Imagine.Art image models only when the live UI, model availability, or artifact risk makes them a better fit.

If a stillframe is meant to preserve a specific character, model, product, garment, style frame, or supplied reference, it is reference-driven generation. Connect the relevant style/identity/product reference to the image node and use explicit `@Image1`, `@Image2`, etc. language. Do not use ambiguous text such as `same model`, `same person`, `same character`, or `same product`.

Static image generation is a production support layer: reference frames, hero/model plates, product truth frames, and storyboard panels. It is not the final commercial when the user asked for generated motion.

## Final-Shot Source Manifest

Before a campaign can be `finished`, create a shot-source manifest in the QC report. Every shot in the final timeline must list:

- time range
- visual job
- source file
- source type
- Imagine.Art workflow node or Music Studio item
- review status
- reference-parity role: hook, world, subject, movement, ritual/detail, reveal, product closeout, or deterministic type

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

For campaign-video requests, the user's request implies permission to spend the normal Imagine.Art credits needed to execute the planned workflow. Do not ask for user approval solely because still, storyboard, motion, or Music Studio nodes will spend credits.

Credit safety is operational, not conversational. The agent must prove the selected-node set, check the visible credit estimate against the intended batch, use `Number of runs: 1` unless the treatment explicitly budgets exploration, record the launch in `qa/run-ledger.md`, and click `Run Selected` exactly once.

The user should only be asked for approval when a creative decision materially changes the campaign, rights clearance is unclear, the user explicitly requested approval before canvas changes or before spending credits, the visible credit estimate is abnormal or higher than the planned batch, the account lacks subscription/credits, or the platform requires a human action that cannot be automated.

A completed director's treatment, prompt pack, or workflow payload is not a reason to pause for confirmation. If access is available and no blocker exists, continue into the workflow canvas and execute the staged production plan.

## Execution Preflight

Before launching any generation node, verify:

- the browser controlled by Computer Use/browser automation is already logged in to Imagine.Art; if it is not, return `blocked: Imagine.Art login required`, instruct the user to log in in that same browser/session, and stop before canvas work or generation
- if Chrome asks whether `www.imagine.art` can see text and images copied to the clipboard, tell the user this is expected and needed for pasting structured workflow data into Imagine.Art, then ask them to click Allow
- the correct workflow is open
- the canvas state is fresh: if the page has been open through a long run, after any network stall, or whenever a node appears unchanged after a launch, refresh/reopen the workflow before deciding the node is idle, failed, or incomplete
- source assets are visible on the canvas or imported into the intended node
- selected nodes are only the intended batch
- each node displays the intended model name in the UI
- each node uses a validated aspect ratio for that model
- image nodes are separated from motion nodes
- motion nodes consume approved anchors, not first-pass branches
- motion nodes have visible image/start-frame/reference connections; text-only motion nodes are invalid for campaign motion
- music direction exists before final edit planning
- no stale failed nodes are being treated as usable material
- no selected node already has an in-flight run visible in Active Runs, a spinner/progress state, a queued/running badge, or a recent launch with no refreshed status check

Do not rely on pasted JSON alone. If a pasted node resolves to a different model in the UI, the UI value wins and the node must be corrected before launch.

Known example: pasted Seedance 2.0 workflow nodes may resolve visually to `1:1` even when the payload requests `9:16`. The agent must inspect the node panel, correct the visible ratio to the delivery ratio, and only then launch.

For campaign motion, a video node that defaults to `Kling 3.0` is a wrong-model failure unless the user explicitly requested Kling. Do not launch it. Correct the visible model to Seedance 2 / Seedance 2.0 or delete/recreate the node from the approved Seedance workflow template.

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

Do not bulk-run stills, storyboard references, and motion together. The taste transfer happens at internal review boundaries: the agent inspects, rejects, selects, and documents outputs unless the user explicitly asked to approve each stage.

## Node Completion And Duplicate-Run Guard

Imagine.Art workflow canvases can show stale node states. A node that looks unchanged may still be running, queued, or complete but not yet reflected on the canvas. Treat the live canvas as eventually consistent.

### Single-Click Launch Protocol

`Run Selected` is not idempotent. Delayed feedback can accept multiple presses and create duplicate paid runs. Treat every launch as a one-shot transaction:

1. Write a launch record to `qa/run-ledger.md` before clicking: `launch_id`, node ids/names, selected count, model, run count, prompt hash/snippet, timestamp, and status `armed`.
2. Check Active Runs and the node cards. If any matching node is queued/running/in-progress, do not click.
3. Verify the selected-node count matches the intended batch. Node focus is not node selection: a clicked node card, focused accessibility element, or expanded properties row does not prove only that node will run. Browser refresh/reopen can preserve stale multi-selection.
4. Prove the selected node set with at least two signals before launch: visual selected-node outline/count, properties selected-node list, copied workflow JSON `selected: true` flags, or visible credit estimate. The visible credit estimate must match the intended selected-node count. If it is higher than expected, stop immediately and deselect/reselect; do not launch to test.
5. Remember that `Number of runs: 1` only limits variants per selected node. It does not prevent spending across multiple selected nodes.
6. For lock nodes, product locks, expensive motion nodes, and single-node retries, launch one node at a time unless there is a written batch reason. Do not use `Run Selected` for a single-node retry unless exactly one selected node is proven. If the canvas retains stale selection, create/paste an isolated retry node.
7. If selection cannot be proven, return `blocked: selection ambiguous` instead of spending credits.
8. Perform exactly one physical click or DOM click on `Run Selected`. Do not double-click, do not press Enter/Space as a fallback, and do not click again because the button still looks enabled.
9. Immediately mark the ledger status `clicked_once` and stop sending input to the Run button. Move focus/cursor away from the button if using Computer Use.
10. Wait for UI/Active Runs acknowledgement. The minimum cooldown before any same-node relaunch is the expected run window plus two refresh/reopen checks.
11. If acknowledgement is delayed, refresh/reopen and inspect Active Runs. Never use a second Run Selected click as a status probe.
12. If Active Runs shows more jobs than the intended selected count, stop launches, mark `duplicate_run_operator_error`, and continue only after selecting one approved output per role.

When Computer Use is the control path, prefer a single explicit click action over repeated key presses or repeated "press Run Selected" attempts. If the tool accidentally sends multiple clicks/presses, stop using that interaction pattern for launches and switch to single-node launches with a stricter ledger/Active Runs check, or mark the workflow blocked if the UI cannot be operated without duplicate spending.

Before launching or relaunching any node:

- check Active Runs for the node name, node id, prompt snippet, model, or recent timestamp
- inspect the node card for spinner/progress/queued/running states and existing results
- if the node was launched in the current session, record the launch in `qa/run-ledger.md` before leaving it
- if there is any ambiguity, refresh/reopen the workflow and re-check the node and Active Runs before clicking run

A node is complete only when all of these are true:

- Active Runs has no queued/running/in-progress entry for the node
- the canvas has been refreshed or reopened after the expected run window
- the node card shows a finished result, not just an old thumbnail or stale status
- the result opens in preview or exposes a downloadable/generated asset URL
- the local run ledger records the node id/name, model, launch time, observed finish time, selected output, and asset id or URL

Do not launch a duplicate run to "wake up" a stale node. Refresh/reopen first. If the refreshed page still cannot prove completion and Active Runs is unclear, wait and re-check. If it remains ambiguous after two refresh cycles, return `blocked: node status unknown` with the node name and last observed UI state rather than spending another run.

## Known UI Failure Classes

### Stale Canvas Status

If a node appears idle, unchanged, or empty after launch but Active Runs or the run ledger suggests it may still be processing:

- do not run it again
- refresh/reopen the workflow
- check Active Runs and the node card again
- wait through one more polling interval if the status is still ambiguous
- record the ambiguity in `qa/run-ledger.md`
- only relaunch if the refreshed UI clearly shows a failed/error state and Active Runs has no matching in-flight job

### Wrong Model After Paste

If an imported or pasted node displays the wrong model:

- stop before launch
- correct the model through the UI, or recreate the node manually
- document the schema mismatch in QA
- do not trust the underlying payload until the visible UI confirms the model

If the wrong model is `Kling 3.0` on a campaign motion node, treat it as a hard stop. The default campaign motion model is Seedance 2 / Seedance 2.0, not Kling.

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

For campaign-video requests, `ready for generation` and `motion pending` are blocker statuses, not acceptable completion states. Use them only after Computer Use/browser execution has been attempted or explicitly preflighted and cannot complete generation.

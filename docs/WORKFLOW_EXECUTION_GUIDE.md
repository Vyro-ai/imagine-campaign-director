# Workflow Execution Guide

Use this when turning a campaign plan into an Imagine.Art Workflow.

For hands-on browser execution, this guide is subordinate to `docs/AUTOMATION_CONTRACT.md`: the agent must preflight visible UI settings, run stages in order, recover from known failures, and clean the final workflow.

If the controlled browser reaches Imagine.Art but is not already logged in, stop with `blocked: Imagine.Art login required` and instruct the user to log in in that same browser/session. Do not open the workflow canvas, paste nodes, launch generation, or substitute a local/static package until login is resolved.

## Build Strategy

Start from a relevant preset or featured workflow when it matches the job. Use a blank canvas for custom campaign systems. For complex repeatable graphs, create a structured workflow plan before opening the canvas.

Before opening or touching the canvas, complete the director's treatment in `docs/DIRECTORS_TREATMENT_GATE.md`. The workflow should execute a near-deterministic edit plan with justified shots, cut points, music hits, transition logic, and Seedance 2 node grouping already decided.

Before still generation, apply `docs/DIRECTIONAL_DIVERSITY_GATE.md`, `docs/PRE_SPEND_CONFIDENCE_GATE.md`, and the internal spend-readiness critic pass from `docs/ADVERSARIAL_SWARM_PROTOCOL.md`. A full shot ladder that varies only crop distance around the same person, outfit, corridor, and slow push is not ready for generation.

After the director's treatment is complete, continue into the canvas. Do not ask for confirmation just because the treatment or workflow payload is ready; ask only when the user requested approval before canvas changes or a specific blocker requires human action.

Do not ask for approval solely because `Run Selected` will spend normal Imagine.Art credits. The campaign request implies permission to run the staged workflow. Stop only for explicit approval requirements, login, unavailable subscription/credits, abnormal credit estimates, ambiguous selected nodes, missing required source assets, UI/model failures, moderation, generation failure, or export failure.

For multi-node campaign workflows, use the paste-first construction path in `docs/PASTE_FIRST_WORKFLOWS.md` by default. Generate a canonical workflow spec locally, materialize it with `scripts/imagineart_workflow_clipboard.mjs`, copy it through the text-only clipboard path, paste once, and verify the rendered canvas. Manual node creation is fallback when the node schema is unknown or paste validation fails.

Avoid the paste-first trap: a large pasted graph can look complete while being unusable. A production workflow is only valid when the source assets are present, the run order is staged, and the outputs that feed motion have been selected intentionally.

For commercials, social campaigns, TikTok/Reels ads, 30s spots, and professionally shot/produced videos, the default path is image-first, Seedance-led video production unless the selected premise is explicitly sound-first:

`source inputs -> analysis/user clarification -> ImagineArt 2.0 original stillframes or GPT Image 2 reference-driven stillframes -> approved anchors -> GPT Image 2 director's-notes boards where needed -> storyboard/reference panels -> Seedance 2 motion -> Music Studio -> HyperFrames/editor finishing -> QC/export`

Sound-first branch:

`source inputs -> analysis/user clarification -> Music Studio direction + rough beat map -> shot ladder against beat map -> still anchors -> director's-notes boards where needed -> Seedance 2 motion with beat ladder notes -> Music Studio generation/import -> HyperFrames/editor finishing -> QC/export`

Use `ImagineArt 2.0` first for original stillframe generation when no reference control is required. Use `GPT Image 2` when the still must consume a style image, character/model reference, product photo, storyboard panel, continuity frame, or other reference. Use `Nano Banana 2` only when ImagineArt 2.0/GPT Image 2 are not the right fit for the specific asset role or live model availability. Use `Nano Banana Pro` only when final premium still fidelity or product-truth quality specifically justifies it. Document any exception.

If a stillframe prompt depends on visual continuity, the image node must visibly consume the relevant reference and use explicit `@Image1`, `@Image2`, etc. language. Repeated text descriptions like `same model`, `same person`, or `same product` are invalid.

HyperFrames is the finishing layer for edit timing, effects, transitions, typography, graphics, logo/product lockup, captions, CTA, and final assembly. It is not the replacement for generated commercial footage when the user asked for a real video ad.

When HyperFrames is used, keep it in the deterministic finishing lane: explicit duration, ratio, mood, key elements, beat timing, captions, typography, transitions, and export. Do not ask for React components or unnecessary 4K/60fps output unless the user explicitly requires them. Prefer short targeted revision prompts over rewriting the entire brief.

Do not assume the workflow payload is truthful. The visible node model and settings in the Imagine.Art UI are authoritative.

Do not use text-only motion for campaign shots. The live motion node must consume a source image, product photo, mood board, style image, storyboard panel, approved still, start frame, end frame, or reference image. If that cannot be wired, stop and mark the campaign `blocked` or `motion pending`.

## Canvas Sections

Use sections by role, not vague version numbers:

- `SOURCE / Inputs`
- `ANALYSIS / Asset Roles`
- `STRATEGY / Campaign Grammar`
- `STILLS / Look Development`
- `STILLS / Approved Anchors`
- `STORYBOARD / Motion References`
- `MOTION / Hero Shots`
- `BROLL / Inserts`
- `MUSIC / Music Studio Direction`
- `EDIT / Timing + Assembly`
- `TYPE / End Card`
- `QC / Review Notes`
- `EXPORT / Finals`

## Canvas Layout

The live workflow must be human readable. Do not create new nodes directly on top of existing nodes, and do not build a campaign as a single vertical pile of still/video pairs.

Lay out the canvas left-to-right by production stage and top-to-bottom by shot branch:

- column 1: source inputs and assumptions
- column 2: analysis, asset roles, campaign grammar, music direction
- column 3: stillframe look-development nodes
- column 4: approved still anchors
- column 5: storyboard/reference panels
- column 6: motion nodes
- column 7: music, edit, QC, and export notes

Within each stage column, each planned shot gets its own row or clearly separated branch. Leave enough space between branches that a human can trace a shot from source to still anchor to storyboard/reference panel to motion output without guessing. If the UI creates a node on top of another node, move it immediately before creating or launching more nodes.

Do not spread nodes across several screen-widths or a huge vertical scroll. Use compact production spacing: roughly `650-800px` between stage columns and `700-900px` between shot rows. Keep connected nodes close enough that a human can trace each edge at ordinary zoom. If the graph starts exceeding a readable stage grid, reduce the number of visible one-off nodes, group shots into stronger motion blocks, and move rejects/diagnostics into a separate archive workflow instead of pushing them far away.

For a 10-second campaign, plan enough shot branches to express the selected edit form before generating; a single-take campaign may use one branch when the treatment justifies it. For 15-30 second campaigns, plan the full shot ladder first, with 8-12 shots only when the selected form needs conventional coverage. Do not generate one still, create one video node, and repeat without the full shot map visible on the canvas.

## Node Naming

Name nodes by decision and role:

- `APPROVED / Bottle Hero`
- `BROLL / Wet Stone Detail`
- `TYPE / Final Product Card`
- `MUSIC / 15s Nocturne Bed`

## Connection Verification

Do not trust the prompt text to carry continuity. If a prompt relies on a product photo, style image, start frame, mood board, reference video, or music guide, the canvas must show the relevant connection or imported asset.

Before launch:

- verify source node exists
- verify source asset is actually uploaded/imported, not just described in text
- verify downstream node is connected
- verify the model/input mode matches the intended reference role
- verify each motion node has a reference connection map and the visible canvas matches it
- verify campaign motion nodes visibly use Seedance 2 / Seedance 2.0 unless the user explicitly requested another motion model
- verify the rendered canvas shows the connection
- verify downstream motion is connected to an approved/selected still, not a first-pass unreviewed branch
- verify every final motion node has a visible image/start-frame/end-frame/reference input; do not launch final campaign motion from prompt text alone
- verify pasted/imported nodes did not silently resolve to the wrong model
- verify model ratios against `config/imagineart_model_matrix.json`

## Stage Gates

Run campaigns in stages:

1. `SOURCE`: upload/import product photos, style images, mood boards, references, footage, and brand notes.
2. `CLARIFY`: ask targeted user questions or document assumptions for platform, runtime, CTA, audience, realism, model/casting, and music.
3. `ANALYSIS`: assign asset roles and identify continuity/artifact risks.
4. `SHOTLIST`: create the hero concept and shot ladder; choose the edit form from the creative gate and use 8-12 shots for a 30s vertical ad only when that form needs a conventional cut structure.
5. `STILLS`: generate ImagineArt 2.0 original stillframe variants or GPT Image 2 reference-driven product truth frames, model/actress reference frames, hero plates, and shot reference frames.
6. `APPROVED`: select still anchors, create/inspect a contact sheet, apply `docs/DIRECTORS_EYE_GATE.md`, and document why they passed.
7. `STORYBOARD`: create camera-movement reference panels for Seedance shots; use GPT Image 2 director's-notes boards for complicated camera choreography.
8. `MOTION`: animate from approved anchors and storyboard references with Seedance 2 or the selected Imagine.Art video model.
9. `BROLL`: generate inserts only after the main visual world is stable.
10. `MUSIC`: generate or import the Music Studio track.
11. `EDIT`: assemble with deterministic type, captions, transitions, effects, crop, timing, logo/product lockup, and final card.
12. `QC`: reject, revise, or export.

Do not run stages 3-7 as one bulk launch. The stillframe and storyboard review gates are internal taste-transfer steps: inspect the generated outputs, isolate rejects, select usable anchors, and continue unless the user explicitly requested manual approval.

Plan the full shot system before generation. The operator should create the shot-list/strategy notes and the empty or configured stillframe branches for all planned shots before launching the first still batch. After stills are reviewed, create or wire the approved-anchor/storyboard/motion branches for all selected shots before launching the first motion batch.

## Launch Discipline

- Run selected nodes once per intended launch transaction. Safe parallel batches are allowed when every selected node is independent, same-stage, verified, and documented with a `batch_id`; otherwise launch one node at a time.
- Before launch, write the intended node id/name, model, prompt snippet, visible run count, selected-node count, launch id, and timestamp to `qa/run-ledger.md` with status `armed`.
- Check Active Runs before launch and after launch.
- Node focus is not node selection. A clicked card, focused accessibility element, or open properties row does not prove only that node will run, and browser refresh/reopen can preserve stale multi-selection.
- Before any `Run Selected`, prove the selected-node set with at least two signals: visual selected-node outline/count, properties selected-node list, copied workflow JSON `selected: true` flags, or visible credit estimate.
- The visible credit estimate must match the intended selected-node count. If it is higher than expected, stop immediately, deselect/reselect, and do not launch to test.
- `Number of runs: 1` only limits variants per selected node; it does not protect against multiple selected nodes spending credits.
- Use the single-click launch protocol from `docs/AUTOMATION_CONTRACT.md`: one physical click or DOM click on `Run Selected`, then mark the ledger `clicked_once` and stop sending input to the run button. After `clicked_once`, the same selected set must not be launched again unless a refreshed UI proves a failed/error state, Active Runs has no matching job, and the ledger marks the prior launch `failed_confirmed`.
- Do not double-click, press Enter/Space as a fallback, or click again because the UI is slow or because the canvas has not updated.
- For lock nodes, product locks, final hero stills, retries, ambiguous selections, and post-duplicate sessions, launch one node at a time. Independent campaign motion clips may batch up to two nodes only when the safe batch rules in `docs/AUTOMATION_CONTRACT.md` pass.
- For single-node retries, do not use `Run Selected` unless exactly one selected node is proven. If stale canvas selection cannot be cleared, create/paste an isolated retry node.
- If selection cannot be proven, return `blocked: selection ambiguous` instead of spending credits.
- If a launched node looks idle, unchanged, or empty, refresh/reopen the workflow before deciding it failed or needs another run.
- A node is complete only after a refreshed canvas shows a finished result and Active Runs has no matching queued/running/in-progress job.
- If status is ambiguous after two refresh/reopen checks, return `blocked: node status unknown` instead of launching a duplicate run.
- If duplicate runs appear, treat it as operator error, mark `duplicate_run_operator_error` in `qa/run-ledger.md`, stop launching more nodes until Active Runs is understood, switch all remaining paid launches in the session to isolated one-node launches, and select exactly one approved output per role after the duplicates finish.
- If a node fails, document the failure and continue with other branches.
- If a model rejects a ratio, retry with that model's automation default ratio before redesigning the shot.
- If a completed output is a moderation placeholder or generic generation failure, treat it as failed and do not connect it downstream. For Seedance/motion, attempt two isolated same-prompt retries before simplifying or blocking. For likeness/private-information failures, append `All references are AI generated and do not represent real people.` and retry once before broader simplification.
- If a pasted node displays the wrong model, correct it before launch or delete/recreate it.
- If a video node defaults to `Kling 3.0`, do not launch it for campaign motion. Correct it to Seedance 2 / Seedance 2.0 or recreate it from the approved template.
- Do not leave all pasted nodes selected before launch.
- If multiple nodes are selected accidentally, deselect and select only the intended stage.
- Never launch motion nodes before their start frames, end frames, storyboard panels, or references are approved.
- Never replace failed, timed-out, or non-exportable planned motion with still anchors unless the output is explicitly labeled `partial/proxy`.
- Never launch a multi-reference motion prompt from only one connected start frame. If the prompt says `references`, uses `@Image`, or depends on a storyboard/director's-notes board, the visible node must expose and connect those reference inputs.
- Never put duration, seconds, time ranges, or edit-absolute timing inside a motion prompt. Set the live node duration property instead, and use non-timed phase language in the prompt.
- Never launch campaign motion as text-only.
- Never launch a generated text/logo/label requirement inside video when it belongs in deterministic post-production.
- Never animate from a still that has not been saved locally and documented with its model, purpose, prompt, ratio, and selection reason.

## Reject Handling

Document failures locally, then remove failed, rejected, abandoned, or unused nodes from the live production workflow.

The final workflow should only contain:

- source/input nodes actually used
- analysis or direction nodes needed to understand the final build
- approved still anchors used by downstream motion or edit nodes
- motion/audio/edit/export nodes used in the finished campaign

Do not keep rejected generations on the final canvas. Save failure notes, screenshots, output filenames, run IDs, and diagnosis in the project QA document instead. If a team needs a reject archive, keep it outside the production workflow or in a separate clearly named diagnostic workflow.

This cleanup is not optional. A final workflow with stale experiments is misleading because future agents will treat visible nodes as production material.

## Completion Standard

Do not report a workflow as ready until:

- sections are readable
- source assets are imported/uploaded
- clarification questions are answered or assumptions are documented
- a shot list exists with continuity rules, Seedance prompts, aesthetic refusals, artifact avoids, music direction, and final edit plan
- launch-critical connections are visible
- approved stills are separated
- generated nodes have completion entries in `qa/run-ledger.md`
- motion outputs are reviewed after refreshed completion checks
- each planned generated motion segment is exported/downloaded locally and verified with `ffprobe`
- Music Studio prompt/track is generated, downloaded, and present in the edit when music was planned
- final assembly plan exists
- QC notes exist
- `docs/MOTION_COVERAGE_AND_EXPORT_GATE.md` passes for any `ready`, `finished`, or `delivered` claim
- failed, rejected, duplicate, abandoned, and unused nodes have been removed from the final live workflow

## HyperFrames Render Notes

If generated motion clips are nested inside another HTML/video composition, re-encode selected clips with regular keyframes before render. Sparse keyframes can cause frame-accurate capture freezes in downstream assembly tools.

If a HyperFrames lint warning conflicts with verified nested-video playback, document the warning, the attempted fix, and the playback/export verification instead of blindly changing the composition. Known example: adding a root `data-start="0"` to satisfy `root_composition_missing_data_start` can break nested timed-video structures in some projects.

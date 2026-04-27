# Workflow Execution Guide

Use this when turning a CampaignCraft plan into an Imagine.Art Workflow.

For hands-on browser execution, this guide is subordinate to `docs/AUTOMATION_CONTRACT.md`: the agent must preflight visible UI settings, run stages in order, recover from known failures, and clean the final workflow.

## Build Strategy

Start from a relevant preset or featured workflow when it matches the job. Use a blank canvas for custom campaign systems. For complex repeatable graphs, create a structured workflow plan before opening the canvas.

Avoid the paste-first trap: a large pasted graph can look complete while being unusable. A production workflow is only valid when the source assets are present, the run order is staged, and the outputs that feed motion have been selected intentionally.

For commercials, social campaigns, TikTok/Reels ads, 30s spots, and professionally shot/produced videos, the default path is image-first, Seedance-led video production:

`source inputs -> analysis/user clarification -> NB2/NBP stillframes and reference frames -> approved anchors -> storyboard/reference panels -> Seedance 2 motion -> Music Studio -> HyperFrames/editor finishing -> QC/export`

Use `Nano Banana 2` first for fast original stillframe iteration, look development, graphic inserts, and plates. Use `Nano Banana Pro` for final hero stills, product-truth plates, premium fidelity, and stills that will feed motion. Use GPT Image 2 or another Imagine.Art image model only when references, storyboard panels, continuity control, model availability, or artifact risk make it better for the specific asset role. Document any exception.

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
4. `SHOTLIST`: create the hero concept and shot ladder; use 8-12 shots for a 30s vertical ad unless the brief requires a different structure.
5. `STILLS`: generate NB2/NBP look-development variants, product truth frames, model/actress reference frames, hero plates, and shot reference frames.
6. `APPROVED`: select still anchors and document why they passed.
7. `STORYBOARD`: create camera-movement reference panels for Seedance shots.
8. `MOTION`: animate from approved anchors and storyboard references with Seedance 2 or the selected Imagine.Art video model.
9. `BROLL`: generate inserts only after the main visual world is stable.
10. `MUSIC`: generate or import the Music Studio track.
11. `EDIT`: assemble with deterministic type, captions, transitions, effects, crop, timing, logo/product lockup, and final card.
12. `QC`: reject, revise, or export.

Do not run stages 3-7 as one bulk launch. The stillframe and storyboard approval gates are the taste-transfer steps.

## Launch Discipline

- Run selected nodes once per intended batch.
- Check Active Runs after launch.
- Do not click again because the UI is slow.
- If duplicate runs appear, treat it as operator error and stop scaling until the workflow is controlled.
- If a node fails, document the failure and continue with other branches.
- If a model rejects a ratio, retry with that model's automation default ratio before redesigning the shot.
- If a completed output is a moderation placeholder, treat it as failed and do not connect it downstream.
- If a pasted node displays the wrong model, correct it before launch or delete/recreate it.
- Do not leave all pasted nodes selected before launch.
- If multiple nodes are selected accidentally, deselect and select only the intended stage.
- Never launch motion nodes before their start frames, end frames, storyboard panels, or references are approved.
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
- a shot list exists with continuity rules, Seedance prompts, negative prompts, music direction, and final edit plan
- launch-critical connections are visible
- approved stills are separated
- motion outputs are reviewed
- Music Studio prompt/track is generated or explicitly pending
- final assembly plan exists
- QC notes exist
- failed, rejected, duplicate, abandoned, and unused nodes have been removed from the final live workflow

## HyperFrames Render Notes

If generated motion clips are nested inside another HTML/video composition, re-encode selected clips with regular keyframes before render. Sparse keyframes can cause frame-accurate capture freezes in downstream assembly tools.

If a HyperFrames lint warning conflicts with verified nested-video playback, document the warning, the attempted fix, and the playback/export verification instead of blindly changing the composition. Known example: adding a root `data-start="0"` to satisfy `root_composition_missing_data_start` can break nested timed-video structures in some projects.

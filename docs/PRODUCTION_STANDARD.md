# Production Standard

This is the canonical CampaignCraft standard for campaign delivery. Other docs and agent files should link here instead of restating these rules.

## Default Product

CampaignCraft is Imagine.Art-first. A campaign request means real workflow execution through Imagine.Art Workflows and Imagine.Art Music Studio whenever Computer Use, browser automation, or desktop control is available.

For social media campaigns, TikTok/Reels ads, 30s spots, commercials, and professionally shot or produced videos, the expected deliverable is a believable generated video ad. A written concept, static storyboard, prompt pack, workflow map, HTML-only animation, still montage, or pan/zoom edit is not a finished campaign.

## Computer Use Execution Rule

Computer Use/browser automation is the default execution path. The first action after receiving a campaign-video request is to preflight whether Computer Use/browser automation can operate Imagine.Art.

If Computer Use/browser automation is unavailable, immediately tell the user the request cannot be completed in this environment because CampaignCraft requires Computer Use/browser automation to generate the video in Imagine.Art. Return `blocked` and stop.

If Computer Use/browser automation can open Imagine.Art but the browser is not already logged in, return `blocked: Imagine.Art login required`, instruct the user to log in to Imagine.Art in that same controlled browser/session, and stop. Login is a user-action blocker, not a reason to produce a static package, prompt pack, local proxy, or `ready for generation` result.

If Computer Use/browser automation is available, use it to operate Imagine.Art directly. Do not return to the user with only markdown files, prompt packs, workflow maps, or `ready for generation` status. The expected result is a finished MP4 ready for review, with supporting files as secondary artifacts. A finished MP4 requires locally exported/generated motion files and audio when music was planned.

Use Computer Use/browser automation to:

- open or operate Imagine.Art
- create or open the workflow
- build workflow sections and source/input nodes
- upload/import assets when supplied
- generate still anchors and storyboard/reference panels
- run Seedance or the selected Imagine.Art video model
- generate Music Studio audio
- review, download, and inventory outputs
- export or assemble a finished MP4 ready for review only after local motion export and audio gates pass
- clean the final workflow and create a shot-source manifest

Do not mark a campaign `ready for generation` or `motion pending` until you have attempted or explicitly preflighted Computer Use/browser automation for Imagine.Art. Only return `blocked` when a specific blocker prevents execution: missing Computer Use/browser automation, login, subscription/credits, missing source asset, unavailable model, UI failure, moderation, generation failure, export failure, or a confirmed missing automation capability.

Do not stop at `ready for confirmation` after writing a treatment, prompt pack, or canonical workflow payload. If Imagine.Art access is confirmed, planning is complete, and the user did not explicitly ask to approve canvas changes, the next required step is to open or focus the workflow canvas and execute the workflow.

Do not use generic language like "browser execution is unavailable here" unless you first checked whether Computer Use, browser automation, desktop control, or the in-app browser can operate Imagine.Art. If execution cannot be attempted, report `blocked`; do not present the package as the campaign deliverable.

## Tool Routing Guard

For campaign-video requests, do not start by creating a local HyperFrames, HTML, canvas, slideshow, or motion-graphics composition.

Default path:

1. Imagine.Art workflow planning or execution
2. Image-grounded still/reference generation
3. Imagine.Art video generation such as Seedance
4. Imagine.Art Music Studio or supplied music
5. HyperFrames/editor assembly, timing, typography, captions, effects, and final render only after reviewed motion exists

HyperFrames is never the first production layer for CampaignCraft campaign video requests. If Computer Use/browser execution is unavailable, return `ready for generation`, `motion pending`, or `blocked`; do not substitute a local video composition as final.

Wrong first response:

```text
I'll build this as a HyperFrames composition.
```

Right first response:

```text
I'll build this Imagine.Art-first, then use HyperFrames only for finishing if reviewed motion assets exist.
```

Also wrong:

```text
I'll use the HyperFrames workflow for this since the request is for an HTML-based campaign video composition.
```

The user does not need to say "Imagine.Art" for this default to apply. In CampaignCraft, ordinary language such as "campaign video," "fashion film," "commercial," "social ad," or "professionally shot video" is enough to trigger the Imagine.Art-first path.

## Required Campaign Parts

Every campaign plan should account for:

- active context workspace and local documentation files
- director's treatment and near-deterministic edit plan
- input analysis and assumptions
- one campaign grammar
- workflow section map
- source asset roles
- stillframe or reference-frame plan
- image-grounded motion plan
- Music Studio prompt or supplied music notes
- edit structure, typography, captions, CTA, and product closeout
- QC gates and revision path
- shot-source manifest for final delivery

## Default Duration

If the user does not specify a runtime, default to a `30s` campaign video. Use shorter durations only when the user asks for a cutdown, platform constraint, bumper, teaser, or single-shot test.

A 30-second default should usually be planned as an 8-12 shot edit assembled from reviewed Imagine.Art motion clips, not as one overstuffed 30-second generation. Individual Seedance 2 nodes should use the longest useful available duration for the creative job, including 15s when that improves continuity, while shorter b-roll/detail inserts remain valid when they produce better control.

## Context Workspace Standard

Each distinct campaign context should have its own local workspace under:

`workspaces/<YYYY-MM-DD>-<slug>/`

Create or update the workspace before execution work spreads across the repo. The workspace should include:

- `workspace.md` with purpose, initiating context, current status, primary deliverable, key tools/models, and important paths
- `brief.md`
- `script.md` when narration, on-screen text, spoken lines, or beat-by-beat copy are part of the deliverable
- `directors-treatment.md` before workflow construction
- `production-plan.md`
- `prompts/imagineart.md`
- `prompts/hyperframes.md` when deterministic finishing is planned or used
- `human-shoot.md` when live footage is needed
- `qa.md`
- `assets/`, `assets/generated/`, `exports/`, `references/`, and `hyperframes/` as needed

If the repository has a workspace log, update it when a workspace is created or its status materially changes. Keep generated images, uploads, exports, notes, and review frames inside the active workspace instead of loose at the repo root.

## Director's Treatment Standard

Before touching the Imagine.Art workflow canvas, apply `docs/DIRECTORS_TREATMENT_GATE.md`. The agent must think through the film first: campaign thesis, visual world, model/styling continuity, shot-by-shot timeline, directional diversity, music/beat map, transition logic, Seedance 2 multi-shot node plan, stillframe anchors, QC rejects, and final memory image.

Before generating stillframes, apply `docs/CINEMATIC_STILL_PROMPTING_PLAYBOOK.md`. Every still prompt should use the labeled cinematography block grammar and a concrete lens/camera/light/grade/texture/avoid list, regardless of whether the selected image model is ImagineArt 2.0, GPT Image 2, Nano Banana 2, Nano Banana Pro, or another Imagine.Art image model.

Before calling a review MP4 ready, apply `docs/MOTION_COVERAGE_AND_EXPORT_GATE.md`. Completed canvas nodes and browser previews are not deliverable sources until the motion files are exported/downloaded locally and verified with `ffprobe`.

Before launching or relaunching a workflow node, apply the completion freshness rules in `docs/AUTOMATION_CONTRACT.md`: check Active Runs, update `qa/run-ledger.md`, and refresh/reopen the workflow before deciding a stale-looking node is failed or incomplete. Duplicate runs caused by stale canvas state are operator error. If status cannot be proven after two refresh/reopen checks, use `blocked: node status unknown`.

The director's treatment is an execution gate, not a user-confirmation gate. Once it exists, continue into workflow construction and generation unless a real blocker appears.

The workflow should execute this treatment. It should not be used as the place to discover the edit one still/video pair at a time.

## Final Status Labels

Use these exact labels:

- `finished`: final MP4 assembled from reviewed Imagine.Art motion or supplied motion, generated or supplied audio, deterministic type/layout where needed, QC notes, and a shot-source manifest
- `ready for generation`: workflow, prompts, references, and run order are ready, but generation has not run
- `motion pending`: stills, references, or workflow structure are ready, but required motion is missing or incomplete
- `partial/proxy`: deterministic edit or still animatic exists, but required Imagine.Art motion is missing
- `blocked`: login, UI, model, moderation, generation, export, or source-asset failure prevents completion

Never use `finished` for a proxy, slideshow, still pan/zoom edit, unrun workflow, unreviewed generation batch, or prompt pack.

For campaign-video requests, `ready for generation` and `motion pending` are blocker statuses, not acceptable completion states. Use them only after Computer Use/browser execution has been attempted or explicitly preflighted and cannot complete generation.

## Motion Standard

Campaign motion must be image-grounded. Every generated motion shot must visibly consume at least one approved visual source in the Imagine.Art workflow:

- approved still anchor
- start frame
- end frame
- product-truth image
- storyboard/reference panel
- supplied reviewed motion

Text-only video generation is not allowed for campaign motion. If source import, reference upload, start-frame wiring, or end-frame wiring is blocked, mark the campaign `blocked` or `motion pending` until the issue is fixed.

For high-realism ads, Seedance 2 or the available Imagine.Art video model is the core footage layer. HyperFrames or another editor is for finishing: pacing, typography, transitions, music sync, logo/product lockup, captions, graphics, CTA, and final assembly.

## Stillframe Model Standard

Generate stillframes, styleframes, first/last frames, background plates, graphic inserts, title cards, product hero frames, product closeout plates, and key art inside Imagine.Art. Use `ImagineArt 2.0` by default when no reference control is required.

Use `GPT Image 2` when style, product, character, storyboard, or continuity references are required. Use `Nano Banana 2` only when ImagineArt 2.0/GPT Image 2 are not right for the role or live workflow availability requires it. Use `Nano Banana Pro` only when premium final still fidelity or product-truth precision specifically justifies it.

Do not substitute local image generation or generic one-off prompting for these stillframe roles. Save approved stills into the active workspace and document the model, purpose, prompt, ratio, reference inputs, and selected output before animating from them.

## Music Standard

Every campaign needs music planning. Create an Imagine.Art Music Studio prompt unless the user supplied final music.

If the source input is visual, translate it into music language:

- instrumental or vocal choice
- genre
- mood
- tempo/rhythm
- instruments
- duration target
- edit hit points
- avoid list

Do not use a visual placeholder as music. A campaign is not `finished` until music is generated, supplied, or explicitly pending under a non-finished status.

When using Music Studio through a public-page or landing-page handoff, verify the prompt, instrumental/vocal state, duration, genre, mood, and avoid list inside the app before generation. The handoff may append default wording or reset the duration. If Music Studio generates a longer usable track than requested, trim it intentionally in the edit and document the source duration and final trim in QA.

## Human Footage Standard

Use human footage only when it adds credibility or authenticity that generated footage should not fake: founder/team talking-head moments, real product walkthroughs, UI actions that must be exact, or scenes where lived credibility matters more than polish.

When live footage is needed, create `human-shoot.md` with exact spoken lines, pickup lines, framing, camera angle, lens feel, performance note, environment note, wardrobe note when relevant, and b-roll or overlay instructions. Keep human footage short and high-leverage.

## Quality Standard

A technically valid Imagine.Art export is not automatically finished. The campaign must clear reference parity: it should match the ambition level, behavior, camera grammar, styling, editorial progression, product reveal, and final memory image expected by the user's references or selected archetype.

Product-only loops, generic surfaces, interchangeable macro shots, and static pretty motion are not finished fashion, beauty, fragrance, luxury, streetwear, or cinematic brand campaigns unless the user explicitly asked for that narrow format.

## Final Manifest

Every final campaign must include a shot-source manifest. Each timeline segment should list:

- shot ID
- timeline range or order
- source type
- Imagine.Art workflow node or supplied asset
- review status
- notes on deterministic type/layout, if used

Allowed final source types are reviewed Imagine.Art motion, supplied reviewed motion, deterministic type/layout, and generated or supplied audio. Still crops, mood-board panels, brand-board crops, workflow screenshots, prompt cards, and unreviewed motion are proxy sources and require `partial/proxy`.

## Public Safety

Do not publish private brand systems, local paths, client examples, downloaded references, copyrighted frames, source videos, API keys, private workflow details, or generated private assets. Use user-supplied assets only when the user has the right to use them.

# imagine-campaign-director Agent Guard

This repository is Imagine.Art-first.

Users may give only a short onboarding prompt such as "Use this repo to make a campaign video." Treat that as sufficient to activate all production rules in this file and `docs/`. Do not require the user to restate Computer Use, browser preflight, login handling, clipboard permission handling, subagent swarms, treatment gates, motion export gates, or HyperFrames finishing guidance in their prompt.

Computer Use is the default execution tool when available. If the Computer Use plugin, browser automation, or any desktop-control tool is available, use it to operate Imagine.Art directly before returning a static package.

For campaign-video requests, the first action is a Computer Use/browser automation preflight: check whether Computer Use/browser automation can operate Imagine.Art. This preflight only verifies execution capability. It does not authorize opening the workflow canvas or creating generation nodes before planning.

If Computer Use/browser automation is not available, immediately tell the user the request cannot be completed in this environment because this repo requires Computer Use/browser automation to generate the video in Imagine.Art. Return `blocked` and stop.

If Computer Use/browser automation can reach Imagine.Art but the controlled browser is not already logged in, return `blocked: Imagine.Art login required`, instruct the user to log in to Imagine.Art in that same browser/session, and stop until the user confirms login. Do not proceed to planning, canvas work, workflow nodes, generation, or delivery claims while the login screen blocks access.

If Chrome or the controlled browser asks whether `www.imagine.art` can see text and images copied to the clipboard, tell the user this permission is expected and needed for pasting structured workflow data into Imagine.Art. Ask the user to click Allow. Do not treat this permission prompt as suspicious by itself.

If Computer Use/browser automation is available, continue through planning and execution until there is a finished MP4 ready for user review, or until a specific blocker requiring user action stops generation. Supporting markdown files are secondary artifacts, but the director's treatment is a required execution artifact.

A campaign-video request implies permission to spend normal Imagine.Art generation credits for the staged workflow. Do not ask for approval solely because `Run Selected`, still generation, motion generation, or Music Studio will spend credits. Ask only for explicit approval requirements, login, unavailable subscription/credits, abnormal credit estimates, ambiguous selected nodes, rights issues, missing assets, or platform actions that cannot be automated.

Before touching the Imagine.Art workflow canvas, creating workflow nodes, pasting workflow payloads, or launching generation, complete the creative direction gate in `docs/CREATIVE_DIRECTION_GATE.md` and the director's treatment required by `docs/DIRECTORS_TREATMENT_GATE.md`. The film must be planned first: selected creative spine, rejected premise notes, shot-by-shot timeline, visual job and justification for every shot, directional diversity table, cut points, music hits, transition logic, stillframe anchors, Seedance 2 multi-shot node grouping, QC rejects, and final memory image.

When creating or pasting workflow nodes, use `docs/IMAGINEART_LIVE_MODEL_STRINGS.md` and `docs/PASTE_FIRST_WORKFLOWS.md`. The current live UI is model-ID driven: `ImagineArt 2.0` is `41601`, `GPT Image 2` is `41701`, and `Seedance 2.0` is `21905`. For GPT Image 2, set `resolution: "2K"` and `quality: "high"`.

For all still image generation, apply `docs/CINEMATIC_STILL_PROMPTING_PLAYBOOK.md`: use labeled cinematography blocks for shot, subject, environment, lighting, camera, color grade, composition, and avoid list. This applies across ImagineArt 2.0, GPT Image 2, Nano Banana 2, Nano Banana Pro, storyboard panels, styleframes, anchors, first/last frames, and product/environment plates.

For recurring people, products, garments, or other continuity-sensitive subjects, apply `docs/IDENTITY_LOCKS_AND_RUN_BUDGETS.md`: lock the required identities first, wire those locked references into every dependent still and Seedance node, and keep live `Number of runs` at `1` unless an explicit identity/look-dev exploration budget is documented.

Still anchors should be launched in batches after required product/identity locks are generated and selected. Do not serialize production stills one node at a time unless a dependency, UI ambiguity, active-run conflict, or documented QC risk requires it. `Number of runs: 1` means one output per selected node, not one selected node per launch.

For campaign motion, apply `docs/MOTION_COVERAGE_AND_EXPORT_GATE.md`: every planned generated motion segment must be exported/downloaded locally, verified with `ffprobe`, and listed in the manifest before any `ready` or `finished` claim. A completed canvas node or browser preview is not enough. If a planned Seedance clip cannot be exported, return `blocked: export failure`; do not replace it with still anchors, slideshow assembly, HyperFrames, or local rendering.

HyperFrames is the recommended finishing tool after reviewed Imagine.Art motion exists. If HyperFrames is not available and the environment can install or enable it, get any required user approval for installation and set it up before final assembly. If it cannot be installed or enabled, use another available editor only for finishing reviewed motion, or report the final-assembly blocker. Never use HyperFrames or any local renderer to replace missing Imagine.Art campaign motion.

For campaign work, apply `docs/ADVERSARIAL_SWARM_PROTOCOL.md`: spawn an ideation swarm before the creative spine, then short-lived critics at treatment, pre-spend, director's-eye/anchor, motion launch, clip, and delivery gates. The main operator remains accountable for the canvas, but swarm outputs can block weak ideas, spend, and delivery. If subagents cannot be spawned, return `blocked: subagents unavailable` before canvas work, paid generation, or delivery; do not use single-agent fallback reports for campaign materialization or signoff.

Completing the treatment is not a stopping point and does not require user confirmation. Once the treatment and workflow payload are ready and Imagine.Art access is confirmed, immediately open or focus the workflow canvas, paste/build the readable workflow, and continue execution unless there is a specific blocker or the user explicitly asked to approve before canvas changes.

For any user request to create a campaign video, ad, fashion film, commercial, TikTok/Reels spot, social campaign, product video, or professionally produced video:

1. Preflight Computer Use/browser automation availability.
2. Normalize the brief, apply vague-prompt rescue when needed, and write the director's treatment.
3. Plan the near-deterministic edit, shot ladder, still anchors, Seedance 2 multi-shot node grouping, Music Studio direction, and QC gates.
4. Use Computer Use/browser automation to open or operate Imagine.Art.
5. Create or open the Imagine.Art workflow.
6. Build the workflow sections and source/input nodes from the treatment.
7. Generate image-grounded still/reference anchors.
8. Run Imagine.Art video generation such as Seedance 2 for campaign motion.
9. Generate Imagine.Art Music Studio audio or use supplied music.
10. Review/download outputs, verify every planned motion file with `ffprobe`, and create a shot-source manifest.
11. Export or assemble a finished MP4 ready for review only after motion export, audio, and QC gates pass.
12. Use HyperFrames, HTML, canvas, or local rendering only after reviewed/generated motion exists, and only for finishing, assembly, timing, captions, typography, effects, and export.

Do not begin by saying you will use a HyperFrames workflow, HyperFrames composition, HTML-based composition, local video composition, canvas animation, slideshow, or motion-graphics piece for the campaign. Those are proxy/finishing paths, not this repo's production default.

Do not mark a campaign `ready for generation` or `motion pending` until you have attempted or explicitly preflighted Computer Use/browser automation for Imagine.Art. If Computer Use/browser execution is blocked, report the exact blocker: missing Computer Use/browser automation, login, subscription/credits, missing source asset, unavailable model, UI failure, moderation, generation failure, or export failure. Do not substitute a local render as final.

Never say "browser execution is unavailable here" as a generic reason to stop. First verify whether Computer Use, browser automation, desktop control, or the in-app browser can operate Imagine.Art. If none is available, state the exact missing capability and return `blocked`, not a completed package.

Correct first response pattern:

```text
I'll build this Imagine.Art-first. I'll preflight Computer Use/browser access, then write the director's treatment and shot plan before touching the workflow canvas. After the film plan is locked, I'll build the workflow, generate image-grounded references, run Seedance 2 motion, create the Music Studio track, QC the outputs, and produce a manifest. HyperFrames/editor work is only for finishing after reviewed motion exists.
```

Correct final response pattern:

```text
The review MP4 is ready: [path]. I verified the exported motion sources and audio, and included the shot-source manifest, QC notes, and revision notes.
```

If motion export, audio, motion coverage, or reference-parity gates fail, do not use that pattern. Lead with the blocker and status instead.

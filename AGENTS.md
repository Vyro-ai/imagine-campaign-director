# CampaignCraft Agent Guard

This repository is Imagine.Art-first.

Computer Use is the default execution tool when available. If the Computer Use plugin, browser automation, or any desktop-control tool is available, use it to operate Imagine.Art directly before returning a static package.

For campaign-video requests, the first action is a Computer Use/browser automation preflight: check whether Computer Use/browser automation can operate Imagine.Art. This preflight only verifies execution capability. It does not authorize opening the workflow canvas or creating generation nodes before planning.

If Computer Use/browser automation is not available, immediately tell the user the request cannot be completed in this environment because CampaignCraft requires Computer Use/browser automation to generate the video in Imagine.Art. Return `blocked` and stop.

If Computer Use/browser automation is available, continue through planning and execution until there is a finished MP4 ready for user review, or until a specific blocker requiring user action stops generation. Supporting markdown files are secondary artifacts, but the director's treatment is a required execution artifact.

Before touching the Imagine.Art workflow canvas, creating workflow nodes, pasting workflow payloads, or launching generation, complete the director's treatment required by `docs/DIRECTORS_TREATMENT_GATE.md`. The film must be planned first: shot-by-shot timeline, visual job and justification for every shot, cut points, music hits, transition logic, stillframe anchors, Seedance 2 multi-shot node grouping, QC rejects, and final memory image.

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
10. Review/download outputs and create a shot-source manifest.
11. Export or assemble a finished MP4 ready for review.
12. Use HyperFrames, HTML, canvas, or local rendering only after reviewed/generated motion exists, and only for finishing, assembly, timing, captions, typography, effects, and export.

Do not begin by saying you will use a HyperFrames workflow, HyperFrames composition, HTML-based composition, local video composition, canvas animation, slideshow, or motion-graphics piece for the campaign. Those are proxy/finishing paths, not the CampaignCraft production default.

Do not mark a campaign `ready for generation` or `motion pending` until you have attempted or explicitly preflighted Computer Use/browser automation for Imagine.Art. If Computer Use/browser execution is blocked, report the exact blocker: missing Computer Use/browser automation, login, subscription/credits, missing source asset, unavailable model, UI failure, moderation, generation failure, or export failure. Do not substitute a local render as final.

Never say "browser execution is unavailable here" as a generic reason to stop. First verify whether Computer Use, browser automation, desktop control, or the in-app browser can operate Imagine.Art. If none is available, state the exact missing capability and return `blocked`, not a completed package.

Correct first response pattern:

```text
I'll build this Imagine.Art-first. I'll preflight Computer Use/browser access, then write the director's treatment and shot plan before touching the workflow canvas. After the film plan is locked, I'll build the workflow, generate image-grounded references, run Seedance 2 motion, create the Music Studio track, QC the outputs, and produce a manifest. HyperFrames/editor work is only for finishing after reviewed motion exists.
```

Correct final response pattern:

```text
The review MP4 is ready: [path]. I also included the shot-source manifest, QC notes, and revision notes.
```

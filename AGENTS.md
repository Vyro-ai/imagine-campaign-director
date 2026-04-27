# CampaignCraft Agent Guard

This repository is Imagine.Art-first.

Computer Use is the default execution tool when available. If the Computer Use plugin, browser automation, or any desktop-control tool is available, use it to operate Imagine.Art directly before returning a static package.

For campaign-video requests, the first action is a Computer Use/browser automation preflight. Before creating markdown files, prompt packs, workflow maps, or local folders, check whether Computer Use/browser automation can operate Imagine.Art.

If Computer Use/browser automation is not available, immediately tell the user the request cannot be completed in this environment because CampaignCraft requires Computer Use/browser automation to generate the video in Imagine.Art. Return `blocked` and stop.

If Computer Use/browser automation is available, do not come back until there is a finished MP4 ready for user review, or until a specific blocker requiring user action stops generation. Supporting markdown files are secondary artifacts.

For any user request to create a campaign video, ad, fashion film, commercial, TikTok/Reels spot, social campaign, product video, or professionally produced video:

1. Preflight Computer Use/browser automation availability.
2. Use Computer Use/browser automation to open or operate Imagine.Art.
3. Create or open the Imagine.Art workflow.
4. Build the workflow sections and source/input nodes.
5. Generate image-grounded still/reference anchors.
6. Run Imagine.Art video generation such as Seedance for campaign motion.
7. Generate Imagine.Art Music Studio audio or use supplied music.
8. Review/download outputs and create a shot-source manifest.
9. Export or assemble a finished MP4 ready for review.
10. Use HyperFrames, HTML, canvas, or local rendering only after reviewed/generated motion exists, and only for finishing, assembly, timing, captions, typography, effects, and export.

Do not begin by saying you will use a HyperFrames workflow, HyperFrames composition, HTML-based composition, local video composition, canvas animation, slideshow, or motion-graphics piece for the campaign. Those are proxy/finishing paths, not the CampaignCraft production default.

Do not mark a campaign `ready for generation` or `motion pending` until you have attempted or explicitly preflighted Computer Use/browser automation for Imagine.Art. If Computer Use/browser execution is blocked, report the exact blocker: missing Computer Use/browser automation, login, subscription/credits, missing source asset, unavailable model, UI failure, moderation, generation failure, or export failure. Do not substitute a local render as final.

Never say "browser execution is unavailable here" as a generic reason to stop. First verify whether Computer Use, browser automation, desktop control, or the in-app browser can operate Imagine.Art. If none is available, state the exact missing capability and return `blocked`, not a completed package.

Correct first response pattern:

```text
I'll build this in Imagine.Art using Computer Use/browser automation: create the workflow, generate image-grounded references, run Seedance/video nodes, create the Music Studio track, QC the outputs, and produce a manifest. HyperFrames/editor work is only for finishing after reviewed motion exists.
```

Correct final response pattern:

```text
The review MP4 is ready: [path]. I also included the shot-source manifest, QC notes, and revision notes.
```

# CampaignCraft Agent Guard

This repository is Imagine.Art-first.

Computer Use is the default execution tool when available. If the Computer Use plugin, browser automation, or any desktop-control tool is available, use it to operate Imagine.Art directly before returning a static package.

For campaign-video requests, do not come back with only markdown files, a prompt pack, a workflow map, or `ready for generation` unless a real Computer Use/browser execution attempt hit a specific blocker requiring user action. The expected return is a generated video ready for user review, plus supporting notes.

For any user request to create a campaign video, ad, fashion film, commercial, TikTok/Reels spot, social campaign, product video, or professionally produced video:

1. Use Computer Use/browser automation to open or operate Imagine.Art.
2. Create or open the Imagine.Art workflow.
3. Build the workflow sections and source/input nodes.
4. Generate or plan image-grounded still/reference anchors.
5. Run Imagine.Art video generation such as Seedance for campaign motion.
6. Generate Imagine.Art Music Studio audio or use supplied music.
7. Review/download outputs and create a shot-source manifest.
8. Use HyperFrames, HTML, canvas, or local rendering only after reviewed/generated motion exists, and only for finishing, assembly, timing, captions, typography, effects, and export.

Do not begin by saying you will use a HyperFrames workflow, HyperFrames composition, HTML-based composition, local video composition, canvas animation, slideshow, or motion-graphics piece for the campaign. Those are proxy/finishing paths, not the CampaignCraft production default.

Do not mark a campaign `ready for generation` or `motion pending` until you have attempted or explicitly preflighted Computer Use/browser automation for Imagine.Art. If Computer Use/browser execution is blocked, report the exact blocker: login, subscription/credits, missing source asset, unavailable model, UI failure, moderation, generation failure, or export failure. Do not substitute a local render as final.

Never say "browser execution is unavailable here" as a generic reason to stop. First verify whether Computer Use, browser automation, desktop control, or the in-app browser can operate Imagine.Art. If none is available, state the exact missing capability and return `blocked`, not a completed package.

Correct first response pattern:

```text
I'll build this in Imagine.Art using Computer Use/browser automation: create the workflow, generate image-grounded references, run Seedance/video nodes, create the Music Studio track, QC the outputs, and produce a manifest. HyperFrames/editor work is only for finishing after reviewed motion exists.
```

Correct final response pattern:

```text
The review video is ready: [path or Imagine.Art export]. I also included the shot-source manifest, QC notes, and revision notes.
```

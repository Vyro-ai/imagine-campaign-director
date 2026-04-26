# Seedance Workflow Guide

Use this when the Imagine.Art motion model is Seedance or when a campaign clip needs time-segmented motion.

## Start-Frame Mode

When using a stillframe as the first frame:

- let the connection carry identity and composition
- write the prompt as direct shot language
- do not waste prompt budget saying “use the connected image”
- do not use reference tags unless the current UI visibly exposes them

Prompt should describe what happens after frame 1.

## Reference Mode

When using multiple references:

- assign each reference one dominant job
- product truth
- character identity
- material texture
- environment
- lighting
- motion rhythm

Do not ask one reference to control everything.

## Beat Guide Mode

If using a music or beat-guide video:

- state if the video is audio pacing only
- do not let the model inherit unwanted black-screen or placeholder visuals
- use actual beat timestamps for major cuts, reveals, flashes, and holds
- do not demand frame-accurate decimal editing unless the model has proven it in the current workflow

## 10-Second Campaign Limit

A 10-second Seedance campaign clip should usually contain about four major phases:

1. hook
2. first impact or reveal
3. detail/action accent
4. final hero hold

More phases usually create chaos.

## Simplify Risk

- hands: hide, silhouette, fingers together, one simple motion
- glass: use condensation, reflection, droplets, light, or silhouette instead of finger contact
- walking: prefer one lead step, cropped legs, or hidden feet
- mirrors/chrome: slow light movement beats complex reflection choreography
- product labels: use clean product plates and deterministic text later

## Bad Prompt Pattern

`Use the connected hero still and keep the same person and same product while doing a cinematic luxury transition on the beat.`

## Better Prompt Pattern

`Subject: full-body editorial portrait of a model in a black technical coat on a wet rooftop. 0-2s hard flash reveal. 2-5s slow push as wind lifts the coat hem. 5-8s macro cut to reflective piping catching light. 8-10s locked back-view silhouette with clean sky for end-card typography.`

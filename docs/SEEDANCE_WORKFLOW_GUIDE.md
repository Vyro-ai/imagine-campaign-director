# Seedance Workflow Guide

Use this when the Imagine.Art motion model is Seedance or when a campaign clip needs time-segmented motion. This guide is the advanced Seedance 2 prompting standard for CampaignCraft.

## Hard Rule

Seedance campaign motion is image-first. Every final Seedance shot must use a visible connected start frame, end frame, reference image, product-truth image, or storyboard panel in the Imagine.Art workflow.

Text-only Seedance is not allowed for campaign motion. If no visual source exists, create one first in Imagine.Art, approve it, then connect it to Seedance.

For commercial, social media campaign, TikTok/Reels ad, 30s spot, or professionally produced video requests, Seedance 2 or the available Imagine.Art video-generation model is the core production footage layer. HyperFrames/editor work is for finishing, not for replacing generated footage.

Seedance 2 should be used as a multi-shot campaign generator when the brief calls for a campaign film. Do not reduce it to a repetitive pattern of one stillframe plus one tiny video node unless the shot is a dedicated insert, b-roll moment, or preflight test. Use the longest useful available duration for the creative job, including 15s when the live UI supports it and a longer multi-shot phrase improves continuity, mood, or editorial progression.

The agent must explicitly state one of these execution modes:

- operating Seedance directly in Imagine.Art
- preparing Seedance prompts and references for the user to run
- assembling already-generated Seedance outputs

Do not silently substitute HTML animation, prompt packs, static storyboards, or slideshows when the user asks for a finished video ad.

## Model / Actress Consistency

If the user asks for a believable main actress/model, create a continuity strategy before motion:

- identity description
- wardrobe
- hair
- makeup
- performance style
- camera distance and shot-size limits
- approved reference frames/start frames
- per-shot continuity risks

Use repeatable reference frames for the same character. Prefer medium/wide shots for action and closeups only when the reference frame is strong enough. Do not rely on text alone to preserve identity.

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

For multi-shot Seedance 2 campaign prompts, assign each connected reference one dominant job:

- start frame or opening composition
- character identity or wardrobe continuity
- environment and architecture
- material texture or product truth
- lighting and grade
- final hero hold or end-frame logic

State those roles in the local workflow notes and only use literal reference tags in the prompt when the live UI exposes those tags.

## Storyboard References

Seedance works better when the agent provides motion evidence, not just visual aspiration.

Before launch, create a camera-movement storyboard for the clip or shot:

- panel 1: opening composition and camera position
- panel 2: approach or drift direction
- panel 3: reveal, tilt, orbit, or transition moment
- panel 4: detail/action accent
- panel 5: final hero hold or pullback

For each panel, describe camera path separately from subject/product path. Use arrows, notes, or filenames if the UI supports image references. Assign every connected image one job: start frame, end frame, product truth, style/lighting, or motion board.

For complex shots, use GPT Image 2 to generate a director's-notes storyboard following `docs/DIRECTORS_NOTES_STORYBOARDS.md`. This should look like a production board: numbered horizontal panels, camera icons or labels, colored arrows for camera/subject/environment movement, timing blocks, shot-size labels, right-side camera notes, and a bottom sequence strip.

Use director's-notes boards when the Seedance 2 node needs to understand a long take, approach, tilt, orbit, follow, pullback, rise/fall, beat-synced reveal, or simultaneous subject/camera movement. The board's job is camera choreography and phase order. It does not replace identity anchors, product-truth images, or final hero stills.

If the storyboard shows a complex long take, simplify it into broad blocks. Do not ask Seedance for seven exact moves in one 10-second node unless a previous run in the same workflow has proven it can follow that complexity.

## Beat Guide Mode

If using a music or beat-guide video:

- state if the video is audio pacing only
- do not let the model inherit unwanted black-screen or placeholder visuals
- use actual beat timestamps for major cuts, reveals, flashes, and holds
- do not demand frame-accurate decimal editing unless the model has proven it in the current workflow

## Multi-Shot Campaign Prompting

A Seedance 2 campaign clip should contain only as many major shots or phases as the chosen duration can support clearly. As a rule of thumb:

- 5s: 2-3 phases
- 10s: about 4 phases
- 15s: about 5-6 phases

More phases usually create chaos. Use the live model maximum when it helps, but do not fill time with redundant shot shapes.

Use broad blocks such as `0-3s`, `3-6s`, `6-10s`, `10-13s`, and `13-15s`. Do not demand frame-accurate decimal choreography unless a previous run in the same workflow proves Seedance can follow it.

Each block should have:

- one dominant visual job
- one hero event
- one camera idea
- clear subject/product/environment hierarchy
- continuity constraints that are visual and concrete

For a 30-second fashion/luxury campaign, prefer 2-4 strong Seedance 2 multi-shot nodes, using 15s nodes where they improve continuity or editorial flow, plus a small number of dedicated b-roll/detail nodes where justified. This gives Seedance room to create editorial progression while keeping the workflow readable.

## Prompt Structure

Use this structure for advanced Seedance 2 campaign prompts:

1. `Subject`: precise subject, wardrobe/product, environment, and campaign grammar.
2. `Reference roles`: what each connected source controls, only if the UI exposes references or the workflow notes need it.
3. `Timing ladder`: broad time blocks with concrete shot behavior.
4. `Camera`: shot size, lens feel, movement, angle, and transition logic.
5. `Continuity`: what must stay stable across shots.
6. `Constraints`: visual positive constraints and a short avoid list.

Do not waste prompt budget on workflow mechanics such as `use the connected image` when the image is structurally connected. Write what happens after frame 1 in direct shot language.

When a GPT Image 2 director's-notes board is connected, translate its panels into the timing ladder. Do not ask Seedance 2 to copy labels or read the board as final visual style; use it to control motion sequence, camera path, and phase order.

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

## Better Multi-Shot Campaign Pattern

```text
Subject: modern luxury fashion campaign, one adult model in a sharply tailored black coat, rain-wet concrete and glass walkway at night, cool shadows with warm practical light, restrained modern night fashion film.

0-3s: low-angle silhouette hook. The model crosses a narrow strip of warm light, coat hem moving in light wind, wet concrete reflecting the figure.
3-5s: cut to lateral tracking world reveal through glass and chrome architecture, reflections sliding across the frame, model seen three-quarter from behind.
5-8s: close material accent on black wool sleeve, collar, rain beads, and chrome reflection; the model turns one shoulder, no hand gesture.
8-10s: locked final three-quarter hero hold with clean negative space, composed posture, warm rim light on cheek and coat edge.

Camera: controlled low-angle opening, smooth lateral track, brief macro insert, locked final hold. No fast orbit, no runway montage.
Continuity: same black coat silhouette, same adult model, same wet city night world, no visible logos or text.
Constraints: elegant modern fashion film, natural walk with hidden feet, clean face and hands, no fake signage, no generated typography, no crowd, no chaotic fabric.
```

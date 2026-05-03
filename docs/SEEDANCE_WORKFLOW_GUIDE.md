# Seedance Workflow Guide

Use this when the Imagine.Art motion model is Seedance or when a campaign clip needs time-segmented motion. This guide is the advanced Seedance 2 prompting standard for this repo.

## Hard Rule

Seedance campaign motion is image-first. Every final Seedance shot must use visible connected references in the Imagine.Art workflow.

For campaign films, default to reference-image set mode rather than Start Frame mode. Seedance 2 is strongest when the node can see separate references for actor/model identity, scene/environment, product or garment truth, material/texture, final hero hold, and director's-notes camera choreography. Start Frame mode is the fallback for simple one-anchor clips only.

Text-only Seedance is not allowed for campaign motion. If no visual source exists, create one first in Imagine.Art, approve it, then connect it to Seedance.

For commercial, social media campaign, TikTok/Reels ad, 30s spot, or professionally produced video requests, Seedance 2 or the available Imagine.Art video-generation model is the core production footage layer. HyperFrames/editor work is for finishing, not for replacing generated footage.

Seedance 2 should be used as a multi-shot campaign generator when the brief calls for a campaign film. Do not reduce it to a repetitive pattern of one stillframe plus one tiny video node unless the shot is a dedicated insert, b-roll moment, or preflight test. Use the longest useful available duration for the creative job, including 15s when the live UI supports it and a longer multi-shot phrase improves continuity, mood, or editorial progression.

The agent must explicitly state one of these execution modes:

- operating Seedance directly in Imagine.Art
- preparing Seedance prompts and references for the user to run
- assembling already-generated Seedance outputs

Do not silently substitute HTML animation, prompt packs, static storyboards, or slideshows when the user asks for a finished video ad.

## Single-Take Mode

For 10-15s campaigns, the creative gate may select a single-take oner. This is not a fallback or a slideshow substitute; it is a deliberate Seedance 2 motion plan.

Use one Seedance 2 node when the treatment can express the film as a continuous camera path:

- one approved start/reference set
- one continuous environment
- one subject/product choreography
- one controlled flaw
- no internal cuts
- no b-roll inserts
- final hold that is part of the choreography

The prompt should describe phases as a continuous move, not as a montage. Good single-take jobs include subject entering/leaving frame, product revealed through blocking, a locked tableau that changes once, a procedural demonstration, or an empty-frame final hold. If the idea needs many inserts, it is not single-take mode.

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

Use repeatable reference frames for character continuity. Prefer medium/wide shots for action and closeups only when the reference frame is strong enough. Do not rely on text alone to preserve identity. When the UI exposes reference tags, write explicit roles such as `@Image1 controls identity and wardrobe`; do not write `same model`, `same person`, or `same character`.

## Start-Frame Mode

When using a stillframe as the first frame:

- use this only for a simple clip whose creative control can come from one approved start image and optional end image
- let the connection carry identity and composition
- write the prompt as direct shot language
- do not waste prompt budget saying “use the connected image”
- do not use reference tags unless the current UI visibly exposes them

Prompt should describe what happens after frame 1.

## Reference Mode

When using multiple references:

- assign each reference one dominant job
- use this as the default Seedance 2 campaign-motion contract
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

For complex shots, use GPT Image 2 to generate a director's-notes storyboard following `docs/DIRECTORS_NOTES_STORYBOARDS.md`. This should look like a production board: numbered horizontal panels, camera icons or labels, colored arrows for camera/subject/environment movement, phase blocks, shot-size labels, right-side camera notes, and a bottom sequence strip.

Use director's-notes boards when the Seedance 2 node needs to understand a long take, approach, tilt, orbit, follow, pullback, rise/fall, beat-synced reveal, or simultaneous subject/camera movement. The board's job is camera choreography and phase order. It does not replace identity anchors, product-truth images, or final hero stills.

If the storyboard shows a complex long take, simplify it into broad blocks. Do not ask Seedance for seven exact moves in one 10-second node unless a previous run in the same workflow has proven it can follow that complexity.

## Beat Guide Mode

If using a music or beat-guide video:

- state if the video is audio pacing only
- do not let the model inherit unwanted black-screen or placeholder visuals
- use actual beat timestamps for major cuts, reveals, flashes, and holds
- do not demand frame-accurate decimal editing unless the model has proven it in the current workflow

## Multi-Shot Campaign Prompting

A Seedance 2 campaign clip should contain only as many major shots or phases as the chosen node duration can support clearly. As a rule of thumb:

- 5s: 2-3 phases
- 10s: about 4 phases
- 15s: about 5-6 phases

More phases usually create chaos. Use the live model maximum when it helps, but do not fill time with redundant shot shapes.

Set the selected clip length only as the Seedance/video node duration property, normally `settings.duration` in the canonical spec. Do not mention duration, seconds, or time ranges inside the Seedance prompt. Use ordered phase labels such as `Opening phase`, `Phase 2`, `Phase 3`, and `Final hold`; do not demand frame-accurate choreography unless a previous run in the same workflow proves Seedance can follow it.

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
3. `Phase ladder`: broad ordered phases with concrete shot behavior, without seconds or duration wording.
4. `Camera`: shot size, lens feel, movement, angle, and transition logic.
5. `Continuity`: what must stay stable across shots.
6. `Aesthetic refusals`: three campaign-specific taste refusals.
7. `Constraints`: visual positive constraints and a short artifact avoid list.

Do not waste prompt budget on workflow mechanics such as `use the connected image` when the image is structurally connected. Write what happens after frame 1 in direct shot language.

When a GPT Image 2 director's-notes board is connected, translate its panels into the timing ladder. Do not ask Seedance 2 to copy labels or read the board as final visual style; use it to control motion sequence, camera path, and phase order.

## Director's-Notes-Only Moderation Fallback

If Seedance rejects photoreal/person/product references with a likeness, real-people, private-information, `image_urls`, moderation, or generic generation failure, and the same-prompt retry policy in `docs/AUTOMATION_CONTRACT.md` has already been attempted, use a director's-notes-only fallback before giving up.

Create or reuse an approved director's-notes/storyboard board that shows camera choreography, blocking, phase order, and final hold. Then create an isolated Seedance retry with only that board connected as the visual reference. Remove photoreal model, face, people, product-photo, and environment-photo reference inputs that may be triggering moderation. The prompt should preserve the same motion job and state that the board controls choreography and phase order, not identity or final visual style.

This fallback is a recovery path, not the default. If product truth or identity is essential, use the resulting clip only if QC confirms enough parity, or regenerate safer non-person/product references before final delivery.

## Simplify Risk

- hands: hide, silhouette, fingers together, one simple motion
- glass: use condensation, reflection, droplets, light, or silhouette instead of finger contact
- walking: prefer one lead step, cropped legs, or hidden feet
- mirrors/chrome: slow light movement beats complex reflection choreography
- product labels: use clean product plates and deterministic text later

## Bad Prompt Pattern

`Use the connected hero still and preserve continuity while doing a cinematic luxury transition on the beat.`

This is bad because it uses vague continuity language instead of explicit reference roles.

## Better Prompt Pattern

`Subject: editorial campaign built from the selected creative spine. Opening phase: concrete hook event from the director's treatment. Phase 2: camera discovers the campaign world through the approved environment reference. Phase 3: tactile proof or performance beat from the approved material/product/wardrobe reference. Final hold: final memory image with the planned status change visible.`

## Better Multi-Shot Campaign Pattern

```text
Subject: campaign film from the selected creative spine. @Image1 controls identity/product/wardrobe truth. @Image2 controls the chosen campaign world and production design. @Image3 controls camera choreography from the director's-notes board.

Opening phase: concrete hook event from the treatment; the subject/product crosses a threshold, reveals a status change, or triggers the campaign's signature physical event.
Phase 2: camera discovers the specific world; use foreground, architecture, surface, weather, or set movement from @Image2 to motivate the cut.
Phase 3: tactile proof or performance beat; show material, product truth, gesture, posture shift, or environmental interaction without risky hand complexity.
Final hold: locked final memory hold; preserve the final composition and visible status change planned in the treatment.

Camera: use the camera phase order from @Image3. No generic slow push, fast orbit, or montage unless the treatment specifically justifies it.
Continuity: preserve the identity/wardrobe from @Image1, the environment and lighting from @Image2, and the camera phase order from @Image3. No visible logos or text.
Constraints: preserve the selected creative spine, clean face/product geometry, no fake signage, no generated typography, no unplanned crowd, no chaotic fabric or reflections.
```

# Director's Notes Storyboards

Use this when a shot or Seedance 2 clip has complicated camera choreography, subject movement, staging, continuity, or transition logic. GPT Image 2 can generate annotated director's-notes boards that Seedance 2 can use as visual motion references.

These boards are not final footage. They are production guidance assets.

## When Required

Create a GPT Image 2 director's-notes storyboard before Seedance 2 when a shot includes any of these:

- long take
- multi-shot Seedance 2 node
- camera move with multiple stages
- subject and camera moving at the same time
- approach, orbit, tilt, reveal, pullback, or follow choreography
- underwater, glass, mirror, chrome, crowd, stairs, vehicle, dance, falling, rising, fabric, or complex environmental motion
- beat-synced cuts, impacts, or reveals
- any action where text-only prompt specificity is likely to be weaker than a visual board

For simple inserts, macro texture, locked product holds, or one-motion b-roll, a full director's-notes board is optional.

## Board Content

Generate the board as a clean annotated production image, similar to a director's camera-movement storyboard:

- title and shot/clip ID
- theme or action summary
- 4-7 horizontal panels for the motion phases
- numbered phases
- shot size per phase
- camera position icon or label
- camera movement arrows
- subject/product movement arrows
- environment/material motion arrows when relevant
- timing block per phase
- transition or cut notes
- right-side notes explaining camera intent
- bottom sequence strip summarizing the movement order
- small legend for arrow meanings when helpful

Keep typography clear and utilitarian. Do not include brand logos, final ad copy, fake UI, or decorative layout that could confuse Seedance 2.

## GPT Image 2 Prompt Pattern

Use GPT Image 2 for these boards when ordinary stillframes are not enough to communicate camera choreography.

Prompt structure:

```text
Create a clean director's-notes camera movement storyboard image for [shot/clip ID].
Format: [aspect ratio], white or light neutral production-board background, clear black labels, thin panel borders.
Campaign: [campaign grammar and visual world].
Action: [one sentence summary].
Panels: [4-7 numbered phases with timing, shot size, camera position, camera movement, subject movement, environment movement].
Use colored arrows: blue for camera travel, red for subject/product direction, green for orbit/circle, purple for rise/fall/tilt, orange for distance/pullback.
Include right-side notes for each phase and a bottom sequence strip.
No final ad typography, no logo, no fake brand text, no decorative poster design.
```

## Seedance 2 Use

Use the board as a motion-reference asset with one clear job: camera choreography and phase order. It should not replace product-truth images, character identity anchors, or final hero stills.

When wiring references:

- approved still/start frame controls identity and opening composition
- director's-notes board controls camera path and action sequence
- product-truth or wardrobe reference controls product/costume details when needed
- beat guide controls timing only when explicitly connected and validated

In the Seedance 2 prompt, translate the board into direct shot language. Do not write `copy the storyboard exactly`. Instead, use the board to define broad timing blocks, camera behavior, and the final hold.

## QC

Reject or regenerate the board if:

- arrows are ambiguous
- labels are unreadable
- panel order is unclear
- it includes fake brand text or final ad copy
- it asks for too many phases for the selected Seedance 2 duration
- it conflicts with the director's treatment or edit plan

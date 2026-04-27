# Quality Control

Use this before calling any generated campaign finished.

## Status

- `pass`: ready for delivery
- `pass with minor fixes`: edit-only changes remain
- `needs revision`: regenerate or restructure at least one shot
- `reject`: concept, prompts, or source assets are not usable

## Score Each Area 1-5

- hook strength
- reference parity
- campaign ambition
- product clarity
- Imagine.Art workflow completeness
- Music Studio fit
- visual specificity
- shot variety
- motion design
- edit rhythm
- typography safety
- artifact control
- continuity
- final memory image
- b-roll purpose
- product closeout strength

## Reference-Parity Review

Before a final pass, compare the render against the user's reference pack or the closest relevant examples in the project. This is not a copyright imitation exercise. It is a taste and direction check.

Create a short parity table:

| Dimension | Reference behavior | Output behavior | Pass/Revise |
| --- | --- | --- | --- |
| opening behavior |  |  |  |
| subject/world presence |  |  |  |
| camera grammar |  |  |  |
| editorial progression |  |  |  |
| production design density |  |  |  |
| product/brand reveal logic |  |  |  |
| final memory image |  |  |  |

The output fails reference parity when it only satisfies workflow mechanics. A valid Imagine.Art graph, visible image references, successful Seedance runs, and clean export specs do not make a campaign good.

For fashion, beauty, fragrance, luxury, and cinematic brand campaigns, the render must show campaign behavior:

- a world before the product fully explains itself
- subject, wardrobe, posture, location, weather, architecture, material, or ritual when the brief implies lifestyle/editorial language
- camera movement with a reason: approach, reveal, follow, orbit, retreat, tilt, drift, snap, or hold
- editorial escalation instead of a sequence of interchangeable beautiful clips
- a product closeout that feels earned by the preceding world

If the best honest comparison is "this is a product loop, but the references are campaign films," mark the status `needs revision` or `reject`.

## Hard Fails

- no Imagine.Art workflow plan
- source assets are described but not imported/uploaded before generation
- source boards, brand boards, palettes, typography specimens, prompt screenshots, or contact sheets appear as final footage
- the opening frame exposes test-case residue, crop borders, UI, palette chips, or reference-board text
- the edit is mostly repeated product packshots when the brief asks for a campaign world, subject, or story
- the edit is mostly valid product or texture motion while the brief/reference set calls for fashion, beauty, lifestyle, cinematic brand, or luxury campaign behavior
- the final output would not sit in the same category as the reference pack because it lacks casting, styling, location, movement, reveal logic, or editorial progression
- generated label text is duplicated by deterministic overlay text in the same frame
- motion nodes connected directly to unreviewed first-pass stills
- Seedance motion launched without approved storyboard/reference panels when the move depends on camera choreography
- no music plan
- music exists only as a visual note when final video needs audio
- unreadable or fake critical text
- accidental logos or watermarks
- distorted hands, faces, eyes, teeth, or limbs in hero frames
- product shape, color, label, or material drift
- broken reflections or impossible physical contact
- final frame does not communicate product, brand, or CTA purpose
- final edit built from unreviewed motion outputs
- claiming a pasted node graph is a finished workflow

## Revision Rule

Diagnose before regenerating. If the issue is timing, typography, crop, or CTA, fix it in the edit. If the issue is anatomy, product geometry, identity drift, or broken physical action, regenerate or simplify.

## Render Review Gate

Before final status can be `pass`, render the video and inspect extracted frames.

Use:

```bash
python3 scripts/extract_review_frames.py path/to/render.mp4 --out review/render-name
```

The agent must review the contact sheet and at least these moments:

- first frame
- first second
- first product reveal
- any hand/face/product contact frame
- final hero frame

If any frame shows source-board residue, palette strips, UI, reference text, duplicated product typography, broken hands/faces, product drift, or repeated packshots with no campaign progression, the status is `needs revision` or `reject`. Technical render success is not QC pass.

## First-Frame Gate

Watch or inspect the first second before approving a render. A campaign fails immediately if the first frame looks like a source board, test asset, product mockup, or reference sheet instead of an intentional hook.

For product campaigns, the first second should usually be one of:

- macro material or surface
- world/atmosphere
- subject posture
- product mystery detail
- movement that motivates the reveal

It should not be a full product board, palette card, generic packshot, or final hero frame.

## Packshot Trap

A product ad still needs campaign grammar. Do not build a 10-second spot by crossfading between nearly identical bottle shots unless the brief explicitly asks for a pure product loop.

Before export, confirm the edit has:

- at least one non-product world/atmosphere shot
- at least one texture, subject, or use-context shot when the brief asks for lifestyle/fashion/editorial language
- a real reveal order instead of product shown fully at second zero
- a final product memory image that feels earned
- no redundant title overlays repeating readable product-label text

## Workflow Completeness Check

A polished Imagine.Art campaign package should include:

- source inputs
- explicit asset-role assignments
- asset-role analysis
- campaign grammar
- stillframe branches
- approved still anchors
- motion branches
- Music Studio prompt
- edit assembly timing
- typography/end-card plan
- QC/reject section
- final export notes

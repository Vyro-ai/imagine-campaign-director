# Production Standard

This is the canonical CampaignCraft standard for campaign delivery. Other docs and agent files should link here instead of restating these rules.

## Default Product

CampaignCraft is Imagine.Art-first. A campaign request means an Imagine.Art workflow plan and, when browser access exists, real workflow execution through Imagine.Art Workflows and Imagine.Art Music Studio.

For social media campaigns, TikTok/Reels ads, 30s spots, commercials, and professionally shot or produced videos, the expected deliverable is a believable generated video ad. A written concept, static storyboard, prompt pack, workflow map, HTML-only animation, still montage, or pan/zoom edit is not a finished campaign.

## Tool Routing Guard

For campaign-video requests, do not start by creating a local HyperFrames, HTML, canvas, slideshow, or motion-graphics composition.

Default path:

1. Imagine.Art workflow planning or execution
2. Image-grounded still/reference generation
3. Imagine.Art video generation such as Seedance
4. Imagine.Art Music Studio or supplied music
5. HyperFrames/editor assembly, timing, typography, captions, effects, and final render only after reviewed motion exists

HyperFrames is never the first production layer for CampaignCraft campaign video requests. If Imagine.Art execution is unavailable, return `ready for generation`, `motion pending`, or `blocked`; do not substitute a local video composition as final.

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

## Final Status Labels

Use these exact labels:

- `finished`: final video assembled from reviewed Imagine.Art motion or supplied motion, generated or supplied audio, deterministic type/layout where needed, QC notes, and a shot-source manifest
- `ready for generation`: workflow, prompts, references, and run order are ready, but generation has not run
- `motion pending`: stills, references, or workflow structure are ready, but required motion is missing or incomplete
- `partial/proxy`: deterministic edit or still animatic exists, but required Imagine.Art motion is missing
- `blocked`: login, UI, model, moderation, generation, export, or source-asset failure prevents completion

Never use `finished` for a proxy, slideshow, still pan/zoom edit, unrun workflow, unreviewed generation batch, or prompt pack.

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

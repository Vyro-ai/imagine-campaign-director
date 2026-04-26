# Imagine.Art Workflow Blueprint

CampaignCraft assumes the final production process happens through Imagine.Art Workflows.

## Workflow Sections

Build comprehensive workflows with these sections:

1. `SOURCE / Inputs`
2. `ANALYSIS / Brief + Asset Roles`
3. `STRATEGY / Campaign Grammar`
4. `STILLS / Look Development`
5. `STILLS / Approved Anchors`
6. `MOTION / Shot Ladder`
7. `MUSIC / Music Studio Direction`
8. `EDIT / Assembly + Timing`
9. `TYPE / Captions + End Card`
10. `QC / Review + Rejects`
11. `EXPORT / Finals`

## Source Inputs

Use import/input nodes for:

- product photos
- style images
- mood board frames
- existing clips
- logo files supplied by the user
- brand guide excerpts supplied by the user

Every source asset needs a declared role:

- product truth
- style reference
- mood/lighting reference
- environment reference
- casting/wardrobe reference
- logo/type reference for deterministic post
- motion reference
- audio pacing reference

Do not ask one source image to do every job. Do not proceed if the product truth asset is only described but not available.

## Analysis Nodes

Use text, prompt, or AI Copilot-style analysis nodes to summarize:

- asset roles
- campaign grammar
- product constraints
- style constraints
- artifact risks
- music direction

For workflows that analyze image/video inputs, choose an available multimodal text model in the workflow environment.

## Stillframe Nodes

Create stillframe branches for:

- iconic opener
- product hero
- environment plate
- material macro
- human/casting frame
- final end-card plate

Generate multiple variants, then isolate approved anchors.

Stillframe nodes are not automatically motion sources. First-pass still outputs must be reviewed. Approved anchors should be copied, imported, or clearly selected into an `APPROVED` section before motion.

## Motion Nodes

Create one motion node per shot or per coherent motion block. For 10-second clips, keep to about four major phases:

1. hook
2. reveal
3. detail/action accent
4. final hero hold

Motion nodes should consume approved still anchors or explicit references. If a motion node is connected directly to an unreviewed look-development node, mark the workflow incomplete.

## Music Section

Create a Music Studio task for:

- song/instrumental goal
- genre
- mood
- tempo
- instruments
- duration target
- edit beat map
- avoid list

If vocals are useful, create a separate lyrics or vocal-direction node.

A text note is acceptable as direction, but it is not the audio deliverable. Final campaign assembly needs a generated or supplied music file.

## Edit Assembly

Plan:

- shot order
- approximate timing
- cut points
- transitions
- caption positions
- final product card
- music hits

Use deterministic typography and end-card layout where possible.

## QC / Rejects

Keep rejected outputs visible but separated. Name rejects by reason:

- `REJECT / Hand artifact`
- `REJECT / Product drift`
- `REJECT / Weak hook`
- `REJECT / Fake text`

## Final Exports

Document:

- selected clips
- selected music
- final duration
- aspect ratio
- resolution
- captions
- known risks

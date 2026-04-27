# Imagine.Art Workflow Blueprint

CampaignCraft assumes the final production process happens through Imagine.Art Workflows.

If browser access is available, the agent should execute the workflow, not stop at a plan. See `docs/AUTOMATION_CONTRACT.md` for the required execution, recovery, and cleanup standard.

## Workflow Sections

Build comprehensive workflows with these sections:

1. `SOURCE / Inputs`
2. `ANALYSIS / Brief + Asset Roles`
3. `STRATEGY / Campaign Grammar`
4. `STILLS / Look Development`
5. `STILLS / Approved Anchors`
6. `STORYBOARD / Motion References`
7. `MOTION / Shot Ladder`
8. `MUSIC / Music Studio Direction`
9. `EDIT / Assembly + Timing`
10. `TYPE / Captions + End Card`
11. `QC / Review Notes`
12. `EXPORT / Finals`

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

## Clarification / Assumption Nodes

If the user supplies only partial direction, add a clarification or assumption node before production. Capture:

- platform and aspect ratio
- runtime
- audience
- CTA
- realism level
- main actress/model requirements
- music preference
- required brand assets
- rights/likeness constraints

The agent should query the user for missing decisions that materially change the output. If speed matters or the user does not answer, document conservative assumptions and continue without downgrading the requested video ad into a concept-only package.

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
- main actress/model continuity frame
- wardrobe/hair/makeup reference frame
- product interaction frame
- final end-card plate

Generate multiple variants, then isolate approved anchors.

Use ImagineArt 2.0 first for original stillframes, product/environment plates, hero/style frames, and visual systems when it can satisfy the role. Use GPT Image 2 when image references are necessary because ImagineArt 2.0 does not support the required reference behavior, continuity control, or storyboard/reference panel need. The visible UI model and ratio must be checked before launch.

For product campaigns, keep generated stillframes free of final ad typography whenever possible. If the supplied product photo already contains label text, treat it as product truth, but do not ask image or video models to recreate final campaign copy. Add brand name, product name, captions, and CTA in deterministic edit/type layers.

Stillframe nodes are not automatically motion sources. First-pass still outputs must be reviewed. Approved anchors should be copied, imported, or clearly selected into an `APPROVED` section before motion.

## Storyboard / Motion Reference Nodes

Before Seedance, create a motion-reference board for any shot that depends on a real camera move.

Each board should specify:

- opening frame
- approach or camera travel
- reveal, tilt, orbit, pullback, or hero hold
- subject/product movement path
- shot size changes
- what must stay consistent
- which panels become start frames, end frames, or reference images

This is the bridge between visual taste and usable motion. Do not rely on adjectives like `cinematic` or `premium` to define the move.

## Motion Nodes

Create one motion node per shot or per coherent motion block. For 10-second clips, keep to about four major phases:

1. hook
2. reveal
3. detail/action accent
4. final hero hold

Motion nodes should consume approved still anchors or explicit references. If a motion node is connected directly to an unreviewed look-development node, mark the workflow incomplete.

For high-realism commercials, Seedance 2 or the available Imagine.Art video-generation model is the core footage layer. Each shot should have:

- approved start frame or image reference
- shared continuity rules
- shot-specific action
- real production language: lens, camera movement, lighting setup, blocking, environment, practical reflections, restrained performance, and physical product interaction
- negative prompt and QC watchouts

When the user asks for a believable actress/model, prioritize consistency across clips: identity description, wardrobe, hair, makeup, performance style, camera distance, and repeatable reference-frame strategy.

Before launch, expand or inspect every motion node and verify the visible model, duration, quality, ratio, audio toggle, and source-frame/reference connections. Clipboard/import payloads are not enough. In testing, Seedance nodes pasted with a vertical payload still opened as `1:1` until corrected in the UI.

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

If the campaign is meant to be turnkey, generate the track in Imagine.Art Music Studio before calling the package finished.

Music Studio currently works from text/lyrics/genre direction rather than direct image-to-music. Agents should translate visual inputs into music language: tempo, instrumentation, mood, structure, vocal/no vocal, duration, and avoid list. After generation, download the track and trim it in the edit if Music Studio produces a longer usable bed than the campaign duration.

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

If the final edit embeds generated motion clips inside another HTML/video composition, re-encode selected clips with regular keyframes before render. Sparse keyframes can cause frame-accurate capture freezes in downstream assembly tools.

## QC / Review

Keep the live production workflow clean. Failed or rejected outputs should be documented in QA notes, then deleted from the final workflow graph.

The final workflow should contain only source assets, approved anchors, motion/audio/edit nodes, and notes that directly support the finished output. This matters because future agents will treat visible nodes as available production material.

Known execution failures such as wrong pasted model, rejected ratio, moderation placeholder, and motion drift should be handled with `config/automation_recovery_rules.json`.

## Final Exports

Document:

- selected clips
- selected music
- final duration
- aspect ratio
- resolution
- captions
- known risks

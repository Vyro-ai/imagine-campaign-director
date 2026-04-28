# Imagine.Art Workflow Blueprint

CampaignCraft assumes the final production process happens through Imagine.Art Workflows.

If browser access is available, the agent should execute the workflow, not stop at a plan. See `docs/AUTOMATION_CONTRACT.md` for the required execution, recovery, and cleanup standard.

Before building the workflow, complete `docs/DIRECTORS_TREATMENT_GATE.md`. The workflow graph should be a translation of a justified edit plan, not a place to improvise the film.

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

For multi-node builds, generate the workflow locally first and paste it into the canvas using `docs/PASTE_FIRST_WORKFLOWS.md` and `scripts/imagineart_workflow_clipboard.mjs`. Hand-building every node in the browser is fallback, not the default, when the graph can be specified structurally.

## Readable Canvas Layout

Workflow readability is part of the deliverable. A future human or agent should be able to open the workflow and understand the production plan visually.

Use a stage-column layout:

| Column | Section | Contents |
| --- | --- | --- |
| 1 | `SOURCE / Inputs` | uploaded assets, assumptions |
| 2 | `ANALYSIS / STRATEGY` | brief, asset roles, campaign grammar, risk, music direction |
| 3 | `STILLS / Look Development` | ImagineArt 2.0 originals or GPT Image 2 reference-driven variants for each planned shot |
| 4 | `STILLS / Approved Anchors` | selected stills only |
| 5 | `STORYBOARD / Motion References` | camera/movement panels and reference boards |
| 6 | `MOTION / Shot Ladder` | Seedance/video nodes and selected outputs |
| 7 | `MUSIC / EDIT / QC / EXPORT` | music, edit notes, manifests, final status |

Use shot rows inside those columns. For example, row 01 is the hook, row 02 is the world reveal, row 03 is the detail accent, and so on. Keep nodes spaced so edges are legible. If the UI creates a node over another node, reposition it immediately. Do not leave overlapped nodes in a production workflow.

For campaign-video requests, the workflow should show multiple planned shot branches before generation starts. A single still node connected to a single video node is only acceptable for an explicitly single-shot brief or a narrow preflight test, and it must be labeled as preflight rather than the campaign plan.

## Source Inputs

Use import/input nodes for:

- product photos
- style images
- mood board frames
- existing clips
- logo files supplied by the user
- brand guide excerpts supplied by the user
- brand-kit boards or screenshots supplied by the user

Every source asset needs a declared role:

- product truth
- brand kit / brand system
- logo or wordmark truth
- palette / typography truth
- style reference
- mood/lighting reference
- environment reference
- casting/wardrobe reference
- logo/type reference for deterministic post
- motion reference
- audio pacing reference

Do not ask one source image to do every job. Do not proceed if the product truth asset is only described but not available.

If the user supplies a brand kit, brand board, or style guide, it is a production source, not just prompt inspiration. Add it as an uploaded/imported node in `SOURCE / Inputs`, mark it with `metadata.assetRole: "brand-kit"`, and wire it into the derived lock nodes that need it.

When the brand kit contains the product, logo, palette, typography, or material system but separate atomic assets are missing, create those atomic locks before stillframe production:

- `LOCK / Brand Kit Source`: uploaded/imported brand kit image or PDF-derived image page
- `LOCK / Product Truth`: reference-driven still using the brand kit to isolate the real product/package geometry, label hierarchy, material, and hero angle
- `LOCK / Logo + Type`: reference-driven still or source node that preserves the logo/wordmark/type system for deterministic edit layers
- `LOCK / Palette + Materials`: analysis or visual reference node for colors, surfaces, condensation, packaging finish, and graphic motifs

Every derived lock prompt must name the brand kit with an explicit `@Image` role, for example: `@Image1 controls NOCTRA logo, palette, typography, can geometry, label hierarchy, and material finish.` The lock outputs then become the references for dependent stills and Seedance nodes. Do not ask downstream prompts to recreate the brand from text alone.

Atomic lock creation can happen before the workflow if the runtime has a suitable local image generation/editing tool. In that case, generate the clean product/logo/style lock files locally, save them into the active campaign workspace, then upload/import them as source nodes. If no local image tool is available, build the atomic lock generation nodes inside Imagine.Art first and do not proceed to campaign stills or motion until those lock outputs are approved.

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

Create the full stillframe batch for the shot ladder before launching the first still run. For a 10-second campaign, this usually means 4-5 still anchor roles. For 15-30 seconds, plan the full 8-12 shot ladder. Each still branch should name its shot number and visual job, not just the model name.

Use `ImagineArt 2.0` first for original stillframes, look development, graphic inserts, environment plates, and visual systems that do not need reference control. Use `GPT Image 2` when the still needs a connected style image, character/model reference, product photo, storyboard panel, continuity frame, or other reference. Use `Nano Banana 2` only when ImagineArt 2.0/GPT Image 2 are not the right fit for the specific asset role or live workflow availability. Use `Nano Banana Pro` only when premium final still fidelity, product truth, or another specific role justifies it. Document any exception. The visible UI model and ratio must be checked before launch.

Every generated still prompt must follow `docs/CINEMATIC_STILL_PROMPTING_PLAYBOOK.md`, regardless of model. Use labeled cinematography blocks rather than a paragraph: `SHOT`, `SUBJECT`, `ENVIRONMENT`, `LIGHTING`, `CAMERA`, `FILM STOCK / FORMAT`, `COLOR GRADE`, `MOOD`, `COMPOSITION`, `ASPECT RATIO`, `TEXTURE`, and `AVOID`. Minimum enforced blocks are `SHOT`, `SUBJECT`, `ENVIRONMENT`, `LIGHTING`, `CAMERA`, `COLOR GRADE`, `COMPOSITION`, and `AVOID`. The prompt should name a lens or focal length, camera body/look, lighting source and direction, grade, composition rule, texture, and the universal AI-look avoid list.

For character-led campaigns, generate or upload one approved identity/style reference before producing shot stills that should show that person. Every dependent stillframe node must connect that identity/style reference through its reference-image input and refer to it as `@Image1`, `@Image2`, etc. Text like `same adult model` is invalid.

For product campaigns, keep generated stillframes free of final ad typography whenever possible. If the supplied product photo already contains label text, treat it as product truth, but do not ask image or video models to recreate final campaign copy. Add brand name, product name, captions, and CTA in deterministic edit/type layers.

For product campaigns with a supplied brand kit, product-lock stills must consume the brand kit or a separate product/logo source. If no separate product shot or logo file exists, first generate the missing clean product/logo lock assets from the brand kit, then use those generated locks as references. Do not create disconnected product hero stills from descriptive prompts while ignoring the source kit.

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

For complex motion, create GPT Image 2 director's-notes boards using `docs/DIRECTORS_NOTES_STORYBOARDS.md`. These boards should be annotated production images with numbered phases, shot sizes, camera arrows, subject/product arrows, timing blocks, and camera-intent notes. Use them as motion choreography references for Seedance 2.

Create these boards before motion nodes, review them for readability, and connect or import approved boards into the relevant Seedance 2 branch. Treat unreadable boards, ambiguous arrows, or boards with fake ad text as rejects.

## Motion Nodes

Create one motion node per coherent Seedance 2 motion block, not necessarily one per final edit shot. Choose the longest useful available live duration for the creative job, including 15s when that improves continuity or editorial flow. Keep phase count realistic for the selected duration:

- 5s: 2-3 phases
- 10s: about 4 phases
- 15s: about 5-6 phases

Motion nodes should consume approved still anchors or explicit references. If a motion node is connected directly to an unreviewed look-development node, mark the workflow incomplete.

Create motion nodes as a shot system, not as an isolated still/video pair. Once approved anchors exist, wire all intended motion branches for the selected shot ladder, verify their inputs, then launch in controlled batches. This makes the edit plan visible and prevents the workflow from collapsing into one-off experiments.

For high-realism commercials, Seedance 2 or the available Imagine.Art video-generation model is the core footage layer. Each shot should have:

- approved start frame or image reference
- GPT Image 2 director's-notes board when camera choreography is complex
- explicit video input contract: start/end frame or reference-image set
- reference connection map listing every source node, target input key, slot, prompt token, and role
- shared continuity rules
- shot-specific action
- real production language: lens, camera movement, lighting setup, blocking, environment, practical reflections, restrained performance, and physical product interaction
- negative prompt and QC watchouts

When the user asks for a believable actress/model, prioritize consistency across clips: identity description, wardrobe, hair, makeup, performance style, camera distance, and repeatable reference-frame strategy.

Before launch, expand or inspect every motion node and verify the visible model, duration, quality, ratio, audio toggle, and source-frame/reference connections. Clipboard/import payloads are not enough. In testing, Seedance nodes pasted with a vertical payload still opened as `1:1` until corrected in the UI.

If a video node visibly defaults to `Kling 3.0`, it is not a valid CampaignCraft campaign motion node unless the user explicitly requested Kling. Correct it to Seedance 2 / Seedance 2.0 or delete/recreate it before launch.

Do not create a multi-shot Seedance node that references several still anchors or director's-notes boards while only wiring one `Start Frame`. If a node needs multiple visual references, use the reference-image set contract from `docs/PASTE_FIRST_WORKFLOWS.md`: `referenceUrl` slots, explicit target slots, and matching `@Image` references in the prompt. If the live UI cannot show those inputs, split the motion into simpler start/end-frame nodes.

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

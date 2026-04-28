# Imagine.Art Workflow Builder

Create a node-by-node workflow plan.

## Output Format

### Workflow Name

### Workflow Sections

List sections in order.

Must include source inputs, analysis, strategy, still look-dev, approved stills, storyboard/motion references, motion, b-roll, music, edit assembly, type/end card, QC notes, and export.

### Paste-First Canonical Spec

For multi-node campaign workflows, output or save a canonical workflow spec suitable for `scripts/imagineart_workflow_clipboard.mjs`. Follow `docs/PASTE_FIRST_WORKFLOWS.md`.

The spec must:

- use readable stage-column positions
- use shot rows or clearly separated branches
- apply `docs/IDENTITY_LOCKS_AND_RUN_BUDGETS.md` for every recurring model/person/product/garment before generating dependent shots
- declare supplied brand kits/brand boards as source assets and include uploaded/imported brand-kit nodes before any derived product/logo/style locks
- if a brand kit contains the only product shot, logo, palette, typography, or material truth, generate the missing atomic lock assets from that kit before campaign shot stills
- include top-level `identityLocks` and lock-source metadata when recurring identities exist
- include all planned shot branches before generation
- avoid overlapping node positions
- use the reference-image set contract as the default for Seedance campaign motion, with separate scene/actor/product-or-garment/director-note references when those roles exist
- use the validated start-frame contract with `inputMode: "start-frame"` only for simple one-anchor clips where no actor/product/scene/director-note reference set is needed
- include `slotCounts.referenceUrl` and explicit `targetSlot` values whenever a video prompt uses `@Image` references
- use `Seedance 2` / `Seedance 2.0` as the intended campaign motion model, not Kling, unless the user explicitly requested Kling

### Input Nodes

For each user asset:

- node name
- asset role
- connected analysis node
- downstream use

For supplied brand kits or brand boards:

- create an uploaded/imported source node, not a generated replacement
- mark it with `metadata.assetRole: "brand-kit"` or declare it in top-level `brandKit.source`
- the source node must point to the real supplied bitmap image/screenshot or an explicitly imagegen/image-edit-derived bitmap from that exact source
- never create an SVG, HTML, drawn vector, canvas, or text-derived brand-board surrogate for campaign production unless the user explicitly asks for editable vector artwork
- if the pasted image is not accessible as a local/downloadable image file to the active toolchain, stop and ask the user to provide the brand kit as a local/downloadable image before creating workflow source assets
- use `metadata.sourceProvenance: "supplied-image"` or `metadata.suppliedAsset: true` for real supplied images; use `metadata.imagegenDerivedFromBrandKit: true` or `metadata.imageEditDerivedFromBrandKit: true` for bitmap assets derived from that source
- list the atomic assets it contains: product, logo/wordmark, palette, typography, graphic elements, material/texture, photography style
- if separate product/logo/style assets are missing, plan derived lock nodes that consume the brand kit through `imageUrl`
- if a local image-generation/editing tool is available, use it to create the missing atomic lock files before workflow paste, then upload/import those files into the workflow
- if no local image tool is available, create the missing atomic lock assets as the first Imagine.Art workflow generation stage before any campaign shot stills or motion nodes

### Analysis / Strategy Nodes

Include:

- campaign brief node
- asset role node
- campaign grammar node
- risk analysis node
- music direction node

### Stillframe Nodes

For each still:

- node name
- model suggestion
- prompt
- variants needed
- approval gate
- identity/reference lock sources it consumes
- run budget, defaulting to one run after locks are selected

Model priority:

1. ImagineArt 2.0 for original stillframe generation, look development, graphic inserts, product/environment plates, and exploratory visual systems when no reference control is required.
2. GPT Image 2 when references are necessary: style image, product photo, character/model identity, wardrobe, continuity frame, storyboard/reference panel, or any still that needs visual control from another source.
3. Nano Banana 2 only when ImagineArt 2.0/GPT Image 2 are not the right fit for the specific asset role or live workflow availability.
4. Nano Banana Pro only when premium final still fidelity, product-truth precision, or another NBP-specific advantage is required.
5. Other Imagine.Art image models only when the live UI, model availability, or artifact risk makes them better. Document the exception.

For every image node, include a reference contract:

- `original`: no visual source required; use ImagineArt 2.0 by default
- `reference-driven`: list each source node, target input, slot, `@Image` token, and role; use GPT Image 2 by default

For every image node prompt, apply `docs/CINEMATIC_STILL_PROMPTING_PLAYBOOK.md`. Use labeled lines in this order where possible:

```text
SHOT:
SUBJECT:
ENVIRONMENT:
LIGHTING:
CAMERA:
FILM STOCK / FORMAT:
COLOR GRADE:
MOOD:
COMPOSITION:
ASPECT RATIO:
TEXTURE:
AVOID:
```

Minimum required blocks are `SHOT`, `SUBJECT`, `ENVIRONMENT`, `LIGHTING`, `CAMERA`, `COLOR GRADE`, `COMPOSITION`, and `AVOID`. Include a concrete camera body/look, lens or focal length, lighting direction, color grade, composition rule, and the universal avoid list. If an image node is a non-visual utility note and cannot use the still grammar, mark it with `metadata.stillPromptExempt: true` and a concrete `metadata.stillPromptExemptReason`.

Recurring people/products/garments are never allowed to be a set of disconnected original stills. First create or import the lock reference(s). Then every dependent still must be reference-driven from those lock nodes. If there is one lead model, every shot anchor containing that model must wire the lead lock to `imageUrl` and say `@Image1 controls identity, face, hair, wardrobe, and posture`.

For supplied brand kits, the product/brand lock must be reference-driven from the brand kit or from separate uploaded product/logo assets. If the user did not supply separate product or logo files, create clean derived locks first:

- product/package truth lock
- logo/wordmark/type lock
- palette/material/style lock or analysis node

Every dependent product still must wire one of those locks to `imageUrl` and use explicit `@Image` role language such as `@Image1 controls NOCTRA can geometry, logo placement, matte-black material, condensation behavior, palette, and label hierarchy.`

Any prompt that would otherwise say `same model`, `same person`, `same character`, `same garment`, `matching style`, or `same product` must instead use explicit `@Image1`, `@Image2`, etc. language and matching visible image-reference edges in the canonical spec.

### Storyboard / Motion Reference Nodes

For each Seedance or reference-driven motion shot:

- storyboard panel purpose
- director's-notes board required: yes/no
- GPT Image 2 director's-notes prompt when required
- camera position
- camera movement arrow/direction
- subject/product movement arrow/direction
- start/end frame relationship
- stable details that must not drift
- reference input role
- approval criteria before video launch

Use `docs/DIRECTORS_NOTES_STORYBOARDS.md` for complex camera choreography. A required board should be an annotated production image with numbered phases, timing blocks, shot-size labels, camera movement arrows, subject/product movement arrows, and sequence notes.

### Motion Nodes

For each motion clip:

- node name
- source stillframe
- model suggestion, defaulting to Seedance 2 for high-realism commercial footage when available
- duration
- prompt
- variants needed
- QC gate

For Seedance 2 multi-shot campaign nodes, include:

- broad timing ladder
- one hero event per block
- reference role map
- director's-notes board role if connected
- explicit input contract: `start/end frame` or `reference-image set`
- default input contract: `reference-image set` for campaign motion
- reference connection map with source node, target input key, slot, prompt token, and role
- node-local timing that does not exceed the selected duration
- visible model guard: reject if pasted/UI node resolves to Kling 3.0
- live run guard: set `Number of runs` to `1` before launch unless the treatment has an explicit run-budget reason

For commercial/social/professionally produced video requests, each Seedance shot needs:

- approved start frame or image reference
- shared continuity block
- shot-specific action
- real production language: lens, camera movement, lighting setup, blocking, environment, practical reflections, restrained performance, and physical product interaction
- negative prompt
- actress/model consistency rules when a human lead is requested

### B-Roll Nodes

For each b-roll insert:

- node name
- visual job
- duration
- source reference
- prompt
- where it breathes in the edit

### Music Node

Reference the Music Studio prompt from `prompts/music_studio_prompt_builder.md`.

### Edit / Export Nodes

Plan assembly, captions, transitions, end card, final export, and QC notes.

### Launch Checklist

Include:

- visible source connections to reference-dependent nodes
- approved still anchors
- music prompt/beat map
- motion complexity approval
- `qa/run-ledger.md` path and per-node launch ledger fields
- Active Runs check before launch and after launch
- refresh/reopen check before declaring a node complete, failed, or safe to relaunch
- QA note path for failures/rejections

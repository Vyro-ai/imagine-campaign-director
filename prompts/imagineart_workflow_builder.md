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
- include all planned shot branches before generation
- avoid overlapping node positions
- set Seedance video nodes to the validated start-frame contract with `inputMode: "start-frame"` when wiring approved stills to motion
- use `Seedance 2` / `Seedance 2.0` as the intended campaign motion model, not Kling, unless the user explicitly requested Kling

### Input Nodes

For each user asset:

- node name
- asset role
- connected analysis node
- downstream use

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

Model priority:

1. Nano Banana 2 for fast stillframe iteration, look development, graphic inserts, product/environment plates, and exploratory visual systems.
2. Nano Banana Pro for final hero stills, product-truth plates, premium fidelity, and any still that will anchor final motion.
3. GPT Image 2 when references are necessary because NB2/NBP cannot satisfy the needed reference behavior, continuity control, or storyboard/reference panel role.
4. Other Imagine.Art image models only when the live UI, model availability, or artifact risk makes them better. Document the exception.

### Storyboard / Motion Reference Nodes

For each Seedance or reference-driven motion shot:

- storyboard panel purpose
- camera position
- camera movement arrow/direction
- subject/product movement arrow/direction
- start/end frame relationship
- stable details that must not drift
- reference input role
- approval criteria before video launch

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
- start-frame or reference wiring requirement
- visible model guard: reject if pasted/UI node resolves to Kling 3.0

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
- Active Runs check after launch
- QA note path for failures/rejections

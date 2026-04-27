# Imagine.Art Workflow Builder

Create a node-by-node workflow plan.

## Output Format

### Workflow Name

### Workflow Sections

List sections in order.

Must include source inputs, analysis, strategy, still look-dev, approved stills, storyboard/motion references, motion, b-roll, music, edit assembly, type/end card, QC notes, and export.

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

1. ImagineArt 2.0 for original stillframes, product/environment plates, hero/style frames, and visual systems when it can satisfy the role.
2. GPT Image 2 when references are necessary because ImagineArt 2.0 does not support the needed reference behavior, continuity control, or storyboard/reference panel role.
3. Other Imagine.Art image models only when the live UI or artifact risk makes them better.

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

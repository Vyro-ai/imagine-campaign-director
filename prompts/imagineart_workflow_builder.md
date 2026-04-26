# Imagine.Art Workflow Builder

Create a node-by-node workflow plan.

## Output Format

### Workflow Name

### Workflow Sections

List sections in order.

Must include source inputs, analysis, strategy, still look-dev, approved stills, motion, b-roll, music, edit assembly, type/end card, QC/rejects, and export.

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

### Motion Nodes

For each motion clip:

- node name
- source stillframe
- model suggestion
- duration
- prompt
- variants needed
- QC gate

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
- reject section ready

# Paste-First Workflows

Use this when building multi-node Imagine.Art campaign workflows. Manual node creation is fallback, not the default, when the graph structure is already known.

## Helper

CampaignCraft includes a local clipboard helper:

```bash
node scripts/imagineart_workflow_clipboard.mjs \
  --input path/to/workflow.canonical.json \
  --out path/to/workflow.live-clipboard.json
```

To copy a materialized payload through the known-good text-only clipboard path:

```bash
osascript -e 'set the clipboard to ""'
cat /absolute/path/to/workflow.live-clipboard.json | pbcopy
```

Then paste once into the focused Imagine.Art workflow canvas and verify the rendered canvas before launching any run.

## Default Operator Flow

1. Write a canonical workflow spec in the active workspace.
2. Lay out nodes in readable stage columns and shot rows in the spec.
3. Materialize the spec with `scripts/imagineart_workflow_clipboard.mjs`.
4. Clear the clipboard, copy the materialized JSON as plain text, and paste once.
5. Recenter/zoom until the pasted block is readable.
6. Verify visible sections, node labels, model labels, ratios, and structural wires.
7. Deselect the pasted block and select only the intended batch before running.

Do not hand-create a large campaign workflow node by node when a paste-first graph can be generated locally.

## Human-Readable Layout

Use stage columns:

- `SOURCE / Inputs`
- `ANALYSIS / Strategy`
- `STILLS / Look Development`
- `STILLS / Approved Anchors`
- `STORYBOARD / Motion References`
- `MOTION / Seedance 2`
- `MUSIC / EDIT / QC / EXPORT`

Use shot rows inside those columns. Leave generous horizontal and vertical gaps. If a pasted block or newly created node lands on top of another node, move it immediately.

## Start-Frame Contract

For Seedance image-to-video nodes, use the validated start-frame contract:

- set `inputMode: "start-frame"` in canonical video node specs
- wire the approved still/import output to `imageUrl`
- verify the live node shows `Start Frame` / `End Frame` behavior
- do not assume generic mixed-reference handles are valid for start-frame motion

If the prompt uses `@Image`, `@Video`, or `@Audio` tags, the live canvas must expose and visibly connect the matching reference handles. Otherwise, write direct shot language and let the structural start-frame connection carry the image.

## Model Guard

Campaign motion nodes must use Seedance 2 or the specifically approved Imagine.Art campaign motion model. If a pasted or UI-created video node defaults to `Kling 3.0`, it is invalid for CampaignCraft campaign motion unless the user explicitly requested Kling.

Before launch:

- open or inspect each motion node
- confirm the visible model label is Seedance 2 / Seedance 2.0 or the intended approved model
- confirm `9:16` or the requested ratio
- confirm image/start-frame/reference wiring is visible

If the model is wrong, correct it in the UI or delete/recreate the node. Do not launch Kling-defaulted nodes for campaign motion.

## Acceptance Test

A pasted workflow is not accepted until a human-readable canvas view shows:

- sections are readable
- planned shot branches are visible before generation
- edges are visible where continuity depends on them
- motion nodes are not connected to unreviewed first-pass stills
- model labels and ratios match the plan

Clipboard JSON, copied-selection diagnostics, and accessibility trees are secondary. The rendered canvas is the authority.

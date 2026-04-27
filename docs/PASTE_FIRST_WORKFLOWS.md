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

## Seedance Reference Contracts

Choose one video input contract per Seedance node before writing the canonical spec.

### Start / End Frame Contract

Use this only when the clip can be controlled by one approved opening image and, optionally, one approved ending image:

- set `inputMode: "start-frame"` in canonical video node specs
- wire the approved still/import output to `imageUrl`
- optionally wire the approved ending image to `lastFrame`
- verify the live node shows `Start Frame` / `End Frame` behavior
- do not mention plural `references`, `reference set`, storyboard boards, or `@Image` tokens in the prompt
- keep the prompt timing local to the node duration, such as `0-2s`, `2-5s` for a 5-second node

### Reference-Image Set Contract

Use this as the default for Seedance campaign motion. It is required for multi-shot Seedance nodes that need several still anchors, actor/model identity locks, scene/environment plates, product-truth images, garment/material references, style references, director's-notes boards, or storyboard panels:

- do not set `inputMode: "start-frame"`
- set `slotCounts.referenceUrl` to the exact number of reference-image inputs needed
- wire every required anchor/board/product-truth source to `referenceUrl` with explicit `targetSlot` values
- use `@Image1`, `@Image2`, and so on only when the matching visible reference input exists
- assign one dominant job to each reference: opening composition, identity/wardrobe, product truth, style/lighting, camera choreography, or final hold
- keep broad prompt timing local to the selected node duration

Do not mix the contracts. In the current live schema, Start Frame / End Frame mode hides `Reference Images`, so a node cannot reliably consume both `imageUrl` and director-board `referenceUrl` inputs. If both are essential, use reference-image set mode or split the idea into separate Seedance nodes.

## Reference Connection Map

Every canonical motion node must have a written connection map before paste:

| Prompt token | Source node | Target input | Slot | Role |
| --- | --- | --- | ---: | --- |
| `Start Frame` or `@Image1` | approved still/panel | `imageUrl` or `referenceUrl` | 0 | opening composition |
| `@Image2` | approved director's-notes board | `referenceUrl` | 1 | camera choreography |
| `@Image3` | product/style/identity reference | `referenceUrl` | 2 | continuity guard |

If the prompt relies on a source but the map has no edge for it, the workflow is not ready to paste.

## Identity Locks And Run Budgets

Apply `docs/IDENTITY_LOCKS_AND_RUN_BUDGETS.md` before generating recurring people, products, garments, or other continuity-sensitive subjects.

For recurring human subjects:

- create/select a locked identity node first
- mark it with `metadata.identityRole: "identity-lock"`
- wire that lock into every dependent still through `imageUrl`
- wire that lock into every dependent Seedance reference-set node through `referenceUrl`
- use `GPT Image 2` for dependent reference-driven stills
- write prompts with explicit `@Image1`, `@Image2`, etc. roles

Default run budget is one run per node. Multi-run exploration is allowed only for explicitly marked identity-candidate or look-dev nodes with a written `runBudgetReason`. Before any launch, confirm the live UI `Number of runs` is `1` unless the treatment explicitly authorizes a higher number.

The helper rejects canonical specs when:

- a generation prompt uses ambiguous continuity shorthand such as `same model`, `same person`, `same character`, or `same product`
- a multi-node human/model workflow has no locked identity source
- a dependent human/model still or video is not wired to the locked identity source
- a node requests multiple runs without an exploration role and `runBudgetReason`
- an image prompt uses `@ImageN` without at least N connected image-reference inputs
- a reference-driven image node appears to use ImagineArt 2.0 or Nano Banana without a documented exception; use GPT Image 2 for reference-driven style/product/character continuity images
- a video prompt contains timing beyond the node duration
- a prompt says it uses multiple approved references but no `referenceUrl` edges exist
- a prompt uses `@ImageN` without at least N `referenceUrl` inputs
- a storyboard or director's-notes board is mentioned without a connected reference image
- `inputMode: "start-frame"` is mixed with `referenceUrl` edges

## Model Guard

Use the live labels and copied JSON IDs in `docs/IMAGINEART_LIVE_MODEL_STRINGS.md`. Do not rely on older numeric IDs. As verified on 2026-04-27:

- `ImagineArt 2.0` copies as `settings.modelId: 41601`
- `GPT Image 2` copies as `settings.modelId: 41701`
- `Seedance 2.0` copies as `settings.modelId: 21905`
- `Nano Banana 2` copies as `settings.modelId: 40603`
- `Kling 3.0` copies as `settings.modelId: 11020`

For GPT Image 2, set `resolution: "2K"` and `quality: "high"`.

Campaign motion nodes must use Seedance 2 or the specifically approved Imagine.Art campaign motion model. If a pasted or UI-created video node defaults to `Kling 3.0`, it is invalid for CampaignCraft campaign motion unless the user explicitly requested Kling.

Before launch:

- open or inspect each motion node
- confirm the visible model label is `Seedance 2.0` or the intended approved model
- copy the selected node/graph and confirm the JSON model ID matches the intended label
- confirm `9:16` or the requested ratio
- confirm image/start-frame/reference wiring is visible

If the model is wrong, correct it in the UI or delete/recreate the node. Do not launch Kling-defaulted nodes for campaign motion.

## Acceptance Test

A pasted workflow is not accepted until a human-readable canvas view shows:

- sections are readable
- planned shot branches are visible before generation
- edges are visible where continuity depends on them
- each motion node's visible references match its connection map
- motion nodes are not connected to unreviewed first-pass stills
- model labels and ratios match the plan

Clipboard JSON, copied-selection diagnostics, and accessibility trees are secondary. The rendered canvas is the authority.

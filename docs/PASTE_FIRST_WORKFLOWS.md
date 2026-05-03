# Paste-First Workflows

Use this when building multi-node Imagine.Art campaign workflows. Manual node creation is fallback, not the default, when the graph structure is already known.

## Helper

This repo includes a local clipboard helper:

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

1. Run the required swarm gates from `docs/ADVERSARIAL_SWARM_PROTOCOL.md`.
2. Confirm the active workspace contains `qa/critics/ideation-swarm.md`, `qa/critics/treatment-critic.md`, and `qa/critics/pre-spend-critic.md` with `status: pass`, `critic_mode: subagent`, Codex-shaped `subagent_ids`, and matching `subagent_artifacts` provenance files.
3. Write a canonical workflow spec in the active workspace.
4. Lay out nodes in readable stage columns and shot rows in the spec.
5. Materialize the spec with `scripts/imagineart_workflow_clipboard.mjs`.
6. Clear the clipboard, copy the materialized JSON as plain text, and paste once.
7. Recenter/zoom until the pasted block is readable.
8. Verify visible sections, node labels, model labels, ratios, and structural wires.
9. Deselect the pasted block and select only the intended batch before running.

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

Use compact numeric spacing in canonical specs:

- stage columns: about `650-800px` apart
- shot rows: about `700-900px` apart
- connected nodes should usually be in adjacent columns, not several screens away
- keep the normal campaign graph within a readable bounding box instead of using the infinite canvas as storage
- move rejects, diagnostics, and unused explorations out of the final production graph

The materializer rejects canonical specs with extreme coordinates, oversized bounding boxes, or connected nodes placed too far apart unless `layoutPolicy.required: false` includes a concrete reason.

## Seedance Reference Contracts

Choose one video input contract per Seedance node before writing the canonical spec.

### Start / End Frame Contract

Use this only when the clip can be controlled by one approved opening image and, optionally, one approved ending image:

- set `inputMode: "start-frame"` in canonical video node specs
- set the clip length as `settings.duration` in the canonical video node spec
- wire the approved still/import output to `imageUrl`
- optionally wire the approved ending image to `lastFrame`
- verify the live node shows `Start Frame` / `End Frame` behavior
- do not mention plural `references`, `reference set`, storyboard boards, or `@Image` tokens in the prompt
- do not mention duration or seconds in the prompt; use ordered phase language such as `Opening phase`, `Middle phase`, and `Final hold`

### Reference-Image Set Contract

Use this as the default for Seedance campaign motion. It is required for multi-shot Seedance nodes that need several still anchors, actor/model identity locks, scene/environment plates, product-truth images, garment/material references, style references, director's-notes boards, or storyboard panels:

- do not set `inputMode: "start-frame"`
- set `slotCounts.referenceUrl` to the exact number of reference-image inputs needed
- set the clip length as `settings.duration` in the canonical video node spec
- wire every required anchor/board/product-truth source to `referenceUrl` with explicit `targetSlot` values
- use `@Image1`, `@Image2`, and so on only when the matching visible reference input exists
- assign one dominant job to each reference: opening composition, identity/wardrobe, product truth, style/lighting, camera choreography, or final hold
- do not mention duration or seconds in the prompt; use non-timed phase order and keep the phase count realistic for `settings.duration`

Do not mix the contracts. In the current live schema, Start Frame / End Frame mode hides `Reference Images`, so a node cannot reliably consume both `imageUrl` and director-board `referenceUrl` inputs. If both are essential, use reference-image set mode or split the idea into separate Seedance nodes.

## Reference Connection Map

Every canonical motion node must have a written connection map before paste:

| Prompt token | Source node | Target input | Slot | Role |
| --- | --- | --- | ---: | --- |
| `Start Frame` or `@Image1` | approved still/panel | `imageUrl` or `referenceUrl` | 0 | opening composition |
| `@Image2` | approved director's-notes board | `referenceUrl` | 1 | camera choreography |
| `@Image3` | product/style/identity reference | `referenceUrl` | 2 | continuity guard |

If the prompt relies on a source but the map has no edge for it, the workflow is not ready to paste.

## Seedance Duration Contract

Duration is a node property, not prompt text. Every canonical video node must set `settings.duration` before materialization. Do not write `10-second clip`, `5s shot`, `0-3s`, or similar duration/timeline language inside `settings.prompt`.

The live Imagine.Art workflow JSON stores video duration as a string value and aspect ratio as `settings.aspectRatio`. The materializer accepts numeric canonical durations and `ratio`, but outputs the live keys before paste.

```json
{
  "id": "mv-hero",
  "type": "video",
  "name": "MOTION / Hero Seedance",
  "settings": {
    "modelKey": "seedance_2",
    "duration": "15",
    "aspectRatio": "9:16",
    "prompt": "Subject: product-first launch film with restrained commercial camera language. Phase 1: the camera discovers the approved opening composition. Phase 2: the hero action reveals the product truth without changing shape. Phase 3: tactile detail and light movement build the campaign world. Final hold: settle on the planned memory image with clean negative space."
  },
  "slotCounts": {
    "referenceUrl": 3
  }
}
```

## Brand-Kit And Product-Lock Contracts

When the user supplies a brand kit, brand board, style guide, or brand-system screenshot, the canonical spec must declare that source and wire it visibly. A text-only product prompt is not enough.

Required canonical pattern:

- add a source/import node for the supplied brand kit, marked `metadata.assetRole: "brand-kit"` or top-level `brandKit.source`
- the brand-kit source must be the real supplied image/screenshot or an explicitly imagegen/image-edit-derived bitmap from it
- mark real sources with `metadata.sourceProvenance: "supplied-image"` or `metadata.suppliedAsset: true`
- mark derived bitmap sources with `metadata.imagegenDerivedFromBrandKit: true` or `metadata.imageEditDerivedFromBrandKit: true`
- never use SVG, HTML, canvas, drawn vector, or text-derived surrogate sources for a supplied brand kit unless the user explicitly requested editable vector artwork
- if separate product shot/logo files are missing, generate derived lock nodes from the brand kit before campaign stills:
  - product truth lock
  - logo/wordmark/type lock when deterministic type or end card needs it
  - palette/material analysis or visual reference
- mark the product lock with `metadata.identityRole: "product-lock"` or `metadata.productionRole: "product-lock"`
- connect the brand kit to the product/logo lock through `imageUrl`
- every product/brand-dependent still connects the product lock or brand kit through `imageUrl`
- every Seedance product/brand-dependent motion node connects the product lock or brand kit through `referenceUrl`
- prompts use explicit `@Image1`, `@Image2`, etc. role language for brand kit, product truth, logo/type, and palette/material control

The helper rejects canonical specs that declare a brand kit but do not include a visible uploaded/imported brand-kit source, valid source provenance, a product/brand lock, or downstream product/brand references. It also rejects SVG/vector/HTML surrogate brand-kit source nodes.

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

`Number of runs: 1` only limits variants per selected node; it does not prevent spending across multiple selected nodes. Node focus is not node selection, and browser refresh/reopen can preserve stale multi-selection. Before any `Run Selected`, prove the selected-node set with at least two signals: visual selected-node outline/count, properties selected-node list, copied workflow JSON `selected: true` flags, or visible credit estimate. The visible credit estimate must match the intended node count. If it is higher than expected, stop immediately and deselect/reselect. Safe batches are allowed only for independent same-stage nodes with a written `batch_id`; default maximums are four still/storyboard nodes or two independent motion nodes. For retries, use `Run Selected` only when exactly one selected node is proven, the prior launch is marked `failed_confirmed`, and Active Runs has no matching job; otherwise create/paste an isolated retry node or return `blocked: selection ambiguous`.

The helper rejects canonical specs when:

- campaign-video workflows are missing passing subagent swarm artifacts under `qa/critics/`
- a generation prompt uses ambiguous continuity shorthand such as `same model`, `same person`, `same character`, or `same product`
- a multi-node human/model workflow has no locked identity source
- a dependent human/model still or video is not wired to the locked identity source
- a node requests multiple runs without an exploration role and `runBudgetReason`
- an image prompt uses `@ImageN` without at least N connected image-reference inputs
- a reference-driven image node appears to use ImagineArt 2.0 or Nano Banana without a documented exception; use GPT Image 2 for reference-driven style/product/character continuity images
- a video node is missing `settings.duration`
- a video prompt contains duration or seconds language instead of using the node duration property
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

Campaign motion nodes must use Seedance 2 or the specifically approved Imagine.Art campaign motion model. If a pasted or UI-created video node defaults to `Kling 3.0`, it is invalid for campaign motion unless the user explicitly requested Kling.

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

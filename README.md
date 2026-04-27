# CampaignCraft for Imagine.Art

An agent-ready Imagine.Art operator system for generating polished campaign videos in Imagine.Art Workflows.

CampaignCraft helps Codex, Claude Code, Cursor, and other agents turn loose creative inputs into real Imagine.Art production runs: input analysis, workflow creation, stillframe generation, motion generation, Music Studio audio, QC, revision, and final delivery. The canonical delivery rules live in `docs/PRODUCTION_STANDARD.md`.

For agents: read `AGENTS.md` first. Campaign-video requests must start with a Computer Use/browser automation preflight. If unavailable, say the request cannot be completed in this environment. If available, route to Imagine.Art and return a finished MP4 ready for review unless a specific blocker prevents generation.

## What This Is

CampaignCraft is a public-safe agent skill/workspace for premium fashion, editorial, luxury, beauty, fragrance, streetwear, product, and cinematic brand videos made through Imagine.Art.

It is designed to work from many input types:

- a brief
- a raw prompt
- a style image
- a product photo
- a mood board
- reference images
- existing video clips
- brand guidelines supplied by the user
- mixed assets plus notes

The agent should normalize those inputs into an executable Imagine.Art workflow, operate the workflow with Computer Use/browser automation when available, generate the motion and music assets, inspect the outputs, revise failures, and assemble a finished campaign.

## Who It Is For

- Imagine.Art users
- AI filmmakers
- prompt engineers
- creative directors
- fashion and beauty creators
- brand-content creators
- Codex / Claude Code / Cursor users
- people who want agents to drive better AI video workflows

## What It Helps Create

- fashion films
- luxury fragrance campaigns
- streetwear drops
- beauty editorials
- cinematic brand ads
- product mood films
- music-led campaign spots
- polished ad concepts built from product photos or mood boards

## How It Works

```text
Input -> Intake Adapter -> Campaign Grammar -> Imagine.Art Workflow Execution -> Music Studio Generation -> Motion Generation -> QC Review -> Revision -> Final Delivery
```

See `docs/PRODUCTION_STANDARD.md` for completion labels and the campaign-grade standard. See `docs/AUTOMATION_CONTRACT.md` for browser execution, failure recovery, and final workflow cleanup.

## Imagine.Art-First Defaults

- Use Imagine.Art Workflows for generation and assembly planning.
- Use stillframes/keyframes before motion when consistency matters.
- Use Nano Banana 2 for fast stillframe iteration and Nano Banana Pro for final hero/product-truth anchors by default.
- Use Seedance or other Imagine.Art video models for controlled motion when appropriate.
- Use Imagine.Art Music Studio for original campaign music prompts.
- Use workflow sections for source inputs, look development, approved stills, motion, music, edit assembly, QC, rejects, and final exports.
- Add important typography, logos, captions, legal lines, and product names deterministically where possible.
- Keep the final live workflow clean: only used source, approved stills, storyboard references, selected motion, selected music, edit, QC, and export nodes remain.

## Quick Start

```text
1. Clone or copy this repo into your campaign project.
2. Open it with Codex / Claude Code / Cursor.
3. Give your agent agents/CODEX.md or agents/GENERAL_AGENT.md.
4. Provide any input: brief, prompt, style image, product photo, mood board, or mixed assets.
5. Ask the agent to operate Imagine.Art and generate the campaign.
6. The agent creates or opens the workflow, uploads/imports source assets, and runs staged generation.
7. The agent generates stillframes, motion clips, and Music Studio audio inside Imagine.Art.
8. The agent downloads/reviews outputs, assembles the final edit, and creates a shot-source manifest.
9. The agent scores the result with docs/QUALITY_CONTROL.md and revises failures.
10. The agent packages final delivery only after the motion/audio requirements are satisfied.
```

## Canonical Docs

- `docs/PRODUCTION_STANDARD.md`: required campaign parts, final status labels, motion/music/QC standards, public safety
- `docs/AUTOMATION_CONTRACT.md`: browser execution contract, failure handling, cleanup, completion language
- `docs/WORKFLOW_EXECUTION_GUIDE.md`: staged Imagine.Art run order
- `docs/IMAGINEART_WORKFLOW_BLUEPRINT.md`: workflow section and node plan
- `docs/QUALITY_CONTROL.md`: QC scoring and reference-parity checks
- `docs/SEEDANCE_WORKFLOW_GUIDE.md`: image-grounded Seedance workflow
- `docs/IMAGINEART_MUSIC_STUDIO.md`: text-based music prompt workflow
- `docs/INPUT_ADAPTERS.md`: converting briefs, prompts, images, video, and mixed assets into campaign inputs

## Example Agent Command

```text
Using this CampaignCraft skill, operate Imagine.Art to create a 15-second campaign for this product photo and mood board. Create/open the workflow, import the source assets, generate approved still anchors, generate motion clips in Imagine.Art, generate Music Studio audio, assemble the final edit, run QC, and return the finished video plus a shot-source manifest. If you cannot operate Imagine.Art, mark the job blocked instead of returning a proxy.
```

## Philosophy

- Imagine.Art Workflows are the production spine.
- Music is planned at the start.
- Input assets need interpretation before prompting.
- Generated candidates are selected like footage, not accepted by default.
- One dominant visual idea beats prompt clutter.
- Stillframes anchor taste and continuity.
- Every generated clip must pass artifact review.

## Limitations

- Outputs still depend on model capability and available Imagine.Art features.
- Generated video usually needs iteration.
- The skill requires browser/tool access for fully automated generation.
- Text/logos can fail in generated media.
- Identity and product consistency can fail.
- Users must respect copyright, trademark, publicity, and likeness rights.
- Users must plug in their own brand guidelines.
- This is a creative direction and workflow system, not legal advice or a one-click guarantee.

## Public Sources Checked

This repo references public Imagine.Art product behavior documented on:

- [Imagine.Art Workflows](https://www.imagine.art/workflow)
- [Run Your First Workflow](https://help.imagine.art/workflows/run-your-first-workflow)
- [ImagineArt Music Studio](https://www.imagine.art/music-studio)
- [AI Models in Workflows](https://docs.imagine.art/workflows/ai-models)

# CampaignCraft for Imagine.Art

An agent-ready creative direction system for building polished campaign videos in Imagine.Art Workflows.

CampaignCraft helps Codex, Claude Code, Cursor, and other agents turn loose creative inputs into comprehensive Imagine.Art workflow plans: input analysis, concept, shot ladder, stillframes, motion clips, music, edit structure, QC, revision, and final delivery.

The system is Imagine.Art-first. Other platforms can adapt the method, but the default execution target is Imagine.Art Workflows plus Imagine.Art Music Studio.

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

The agent should normalize those inputs into an Imagine.Art workflow plan, then produce the prompts, node map, model choices, music prompt, edit notes, QC checklist, and revision plan needed to finish a high-polish campaign.

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
Input -> Intake Adapter -> Campaign Grammar -> Imagine.Art Workflow Blueprint -> Music Studio Prompt -> Generation -> QC Review -> Revision -> Final Delivery
```

## Imagine.Art-First Defaults

- Use Imagine.Art Workflows for generation and assembly planning.
- Use stillframes/keyframes before motion when consistency matters.
- Use Nano Banana Pro or other available high-fidelity image models for hero stillframes when appropriate.
- Use Seedance or other Imagine.Art video models for controlled motion when appropriate.
- Use Imagine.Art Music Studio for original campaign music prompts.
- Use workflow sections for source inputs, look development, approved stills, motion, music, edit assembly, QC, rejects, and final exports.
- Add important typography, logos, captions, legal lines, and product names deterministically where possible.

## Quick Start

```text
1. Clone or copy this repo into your campaign project.
2. Open it with Codex / Claude Code / Cursor.
3. Give your agent agents/CODEX.md or agents/GENERAL_AGENT.md.
4. Provide any input: brief, prompt, style image, product photo, mood board, or mixed assets.
5. Ask the agent to create a comprehensive Imagine.Art workflow plan.
6. Build or duplicate the matching Imagine.Art Workflow.
7. Generate stillframes, motion, and music inside Imagine.Art.
8. Score the result with docs/QUALITY_CONTROL.md.
9. Revise using prompts/revision_diagnoser.md.
10. Package final delivery.
```

## Example Agent Command

```text
Using this CampaignCraft skill, create a 15-second Imagine.Art campaign for this product photo and mood board. Analyze the inputs, choose the campaign grammar, create a comprehensive Imagine.Art Workflow node plan, generate stillframe prompts, video prompts, an Imagine.Art Music Studio prompt, edit notes, QC gates, and a final delivery checklist.
```

## Philosophy

- Imagine.Art Workflows are the production spine.
- Music is planned at the start, not pasted on at the end.
- Input assets need interpretation before prompting.
- Generated candidates are selected like footage, not accepted by default.
- B-roll needs an editorial job.
- Product closeouts are designed, not improvised.
- One dominant visual idea beats prompt clutter.
- Stillframes anchor taste and continuity.
- Motion should have a physical event.
- Product closeouts need deterministic control.
- Every generated clip must pass artifact review.

## Limitations

- Outputs still depend on model capability and available Imagine.Art features.
- Generated video usually needs iteration.
- Text/logos can fail in generated media.
- Identity and product consistency can fail.
- Imagine.Art Music Studio currently works from text/lyrics/genre-style direction, not direct image-to-music generation, so agents should translate visual inputs into a music brief.
- Users must respect copyright, trademark, publicity, and likeness rights.
- Users must plug in their own brand guidelines.
- This is a creative direction and workflow system, not legal advice or a one-click guarantee.

## Public Sources Checked

This repo references public Imagine.Art product behavior documented on:

- [Imagine.Art Workflows](https://www.imagine.art/workflow)
- [Run Your First Workflow](https://help.imagine.art/workflows/run-your-first-workflow)
- [ImagineArt Music Studio](https://www.imagine.art/music-studio)
- [AI Models in Workflows](https://docs.imagine.art/workflows/ai-models)

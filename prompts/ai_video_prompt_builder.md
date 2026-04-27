# Imagine.Art Video Prompt Builder

Convert approved stillframes and shot ladder decisions into Imagine.Art video prompts.

## Motion Prompt Fields

- clip ID
- source stillframe or input asset role
- reference mode: text-to-video, start-frame, end-frame, reference video, beat guide
- storyboard/reference panels available
- director's-notes board available
- duration
- aspect ratio
- campaign grammar
- subject/product hierarchy
- camera movement
- subject movement
- environment/material movement
- timing blocks
- transition logic
- final hold
- continuity constraints
- negative prompt
- QC watchouts

For commercial, social media campaign, TikTok/Reels ad, 30s spot, or professionally produced video requests, default to Seedance 2 or the available Imagine.Art video-generation model as the core production layer. Do not replace generated footage with HTML animation, a prompt pack, a storyboard, or a still-image slideshow.

Use the advanced Seedance 2 prompting standard from `docs/SEEDANCE_WORKFLOW_GUIDE.md`. For campaign films, prefer disciplined multi-shot Seedance 2 prompts over a repetitive one-still/one-video-node pattern.

Every commercial shot prompt should include real production language:

- lens or lens feel
- camera movement
- lighting setup
- blocking
- environment
- practical reflections or physical texture
- restrained performance
- physical product interaction when relevant

If the user requested a believable main actress/model, include a shared continuity block before the per-shot prompts:

- identity description
- wardrobe
- hair
- makeup
- performance style
- camera distance limits
- approved reference frame/start frame strategy

## Seedance 2 Duration Rule

Choose the Seedance 2 node duration by creative need, using the longest useful available duration in the live UI, including 15s when a longer phrase improves continuity, mood, or editorial progression.

Phase guidance:

- 5s: 2-3 phases
- 10s: about 4 phases
- 15s: about 5-6 phases

Prefer broad blocks such as `0-3s`, `3-6s`, `6-10s`, `10-13s`, and `13-15s`. Each block should have one dominant visual job, one hero event, and one camera idea.

For a 30-second fashion/luxury campaign, generate 2-4 multi-shot Seedance 2 campaign prompts plus any necessary dedicated b-roll/detail prompts. Do not create many independent tiny video prompts unless the edit strategy specifically needs separate inserts.

## Avoid

- too many cuts inside one generation
- exact logos/text in generated video
- complex hands/glass/mirrors unless isolated
- ensemble motion without continuity strategy
- product rotation that breaks geometry

## Seedance / Time-Segmented Rule

If using Seedance or another time-aware model, include broad time blocks and one hero event per block. If a reference or beat guide is used, state its role. Do not use `same as reference` language unless the workflow plan includes the actual connected input.

Prompt structure:

1. `Subject`: subject, wardrobe/product, environment, campaign grammar.
2. `Reference roles`: one dominant role per connected source when visible in the UI or documented in workflow notes.
3. `Timing ladder`: broad time blocks with concrete action and camera behavior.
4. `Camera`: shot size, lens feel, movement, angle, and transition logic.
5. `Continuity`: stable identity, wardrobe, product, environment, and grade.
6. `Constraints`: positive visual constraints plus a short avoid list.

If storyboard panels exist, translate them into the prompt as camera grammar:

- camera starts at [panel/shot size]
- camera moves [direction/speed]
- subject/product moves [direction/action]
- hold stable [identity/product details]
- end on [approved panel/final hero]

Do not ask for a vague premium camera move when the storyboard already defines the move.

If a GPT Image 2 director's-notes board exists, use it as the motion-choreography reference:

- map each board panel to a broad timing block
- carry over camera movement, subject/product movement, and final hold
- keep identity/product continuity anchored by the approved still or product-truth reference
- do not ask Seedance 2 to reproduce labels, arrows, or typography from the board

## Connection Discipline

Before finalizing a motion prompt, write the connection contract:

- `start/end frame`: one approved start frame wired to `imageUrl`, optional end frame wired to `lastFrame`, no `@Image` tokens
- `reference-image set`: every required still, product-truth image, storyboard panel, and director's-notes board wired to `referenceUrl` slots, with matching `@Image1`, `@Image2`, etc. in the prompt

Prompt timing must be local to the node. If the final edit uses `22-30s` but the node duration is `5s`, write the prompt as `0-5s` for that node and document the edit placement separately.

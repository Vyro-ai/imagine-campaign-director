# Imagine.Art Video Prompt Builder

Convert approved stillframes and shot ladder decisions into Imagine.Art video prompts.

## Motion Prompt Fields

- clip ID
- source stillframe or input asset role
- reference mode: text-to-video, start-frame, end-frame, reference video, beat guide
- storyboard/reference panels available
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

## 10-Second Rule

Use about four major phases:

1. hook
2. reveal
3. detail/action accent
4. final hero hold

## Avoid

- too many cuts inside one generation
- exact logos/text in generated video
- complex hands/glass/mirrors unless isolated
- ensemble motion without continuity strategy
- product rotation that breaks geometry

## Seedance / Time-Segmented Rule

If using Seedance or another time-aware model, include broad time blocks and one hero event per block. If a reference or beat guide is used, state its role. Do not use `same as reference` language unless the workflow plan includes the actual connected input.

If storyboard panels exist, translate them into the prompt as camera grammar:

- camera starts at [panel/shot size]
- camera moves [direction/speed]
- subject/product moves [direction/action]
- hold stable [identity/product details]
- end on [approved panel/final hero]

Do not ask for a vague premium camera move when the storyboard already defines the move.

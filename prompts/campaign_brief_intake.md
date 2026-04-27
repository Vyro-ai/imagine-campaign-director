# Imagine.Art Campaign Intake

Convert any user input into a campaign brief and workflow-ready asset map.

## Supported Inputs

- written brief
- raw prompt
- product photo
- style image
- mood board
- existing video
- brand notes
- mixed assets

## Extract

- product/subject
- audience
- goal
- platform
- aspect ratio
- target duration
- CTA
- campaign tone
- asset roles
- brand constraints
- rights/likeness risks
- required internal review gates

## Required Clarification Questions

If the user asks for a commercial, TikTok/Reels ad, social media campaign, 30s spot, or professionally produced video, ask targeted questions before execution only when missing answers materially change the output and cannot be handled with a conservative assumption:

- What platform/aspect ratio should this target?
- What runtime?
- Who is the audience?
- What CTA or end-card action?
- Should there be a main actress/model? If yes, what casting, age range, wardrobe, hair, makeup, and performance style?
- Should the music be instrumental, vocal, or voiceover-driven?
- What brand assets must appear exactly?
- Are there rights, likeness, or legal constraints?

If the user wants speed or does not answer, make conservative assumptions and label them clearly.

If runtime is missing, default to a `30s` campaign video.

Before shot-listing a vague campaign, run the ideation swarm in `docs/ADVERSARIAL_SWARM_PROTOCOL.md` when subagents are available, then apply `docs/CREATIVE_DIRECTION_GATE.md`: create distinct premises, choose one creative spine, and document why it is stronger than the rejected options.

## Vague Prompt Rescue

If the user input is mostly broad taste language, such as `generic luxury fashion campaign`, `modern brand`, `mystique`, `elegance`, `Gen Z`, `premium`, or `cinematic`, apply `docs/VAGUE_PROMPT_RESCUE.md` before workflow planning.

For a generic luxury/fashion request with no assets, default only the production frame:

- `9:16`, `30s`, no text unless requested
- original instrumental music unless the user requests silence, vocals, or voiceover
- ImagineArt 2.0 original still anchors, or GPT Image 2 reference-driven still anchors when character/style/product continuity is required
- image-grounded Seedance/video only
- QC rejects for fake text/logos, static portrait loops, repeated slow push-ins, broken walking/hands/faces, and generic AI luxury

Do not default the creative world, wardrobe, location, time of day, pose language, or shot ladder. Use `docs/CREATIVE_DIRECTION_GATE.md` to invent three premises and choose one.

Document these as assumptions, then continue into Imagine.Art execution when automation is available.

## Output

Return:

- concise campaign brief
- assumptions
- open questions or answered clarifications
- input asset role table
- recommended campaign grammar
- selected creative spine and rejected premise notes
- shot-list requirements
- model/actress continuity requirements
- required Imagine.Art workflow sections
- music direction starter

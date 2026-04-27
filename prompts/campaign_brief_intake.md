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

## Vague Prompt Rescue

If the user input is mostly broad taste language, such as `generic luxury fashion campaign`, `modern brand`, `mystique`, `elegance`, `Gen Z`, `premium`, or `cinematic`, apply `docs/VAGUE_PROMPT_RESCUE.md` before workflow planning.

For a generic luxury fashion request with no assets, default to:

- `9:16`, `30s`, no text unless requested
- campaign grammar: `modern night fashion film`
- one adult model in sharply tailored black outerwear
- rain-wet concrete/glass/chrome night environment
- cool shadows, warm practical light, restrained contrast
- 8-12 shot ladder with silhouette hook, world reveal, styling portrait, material detail, controlled movement, environmental breath, attitude close/medium, final approach, and final hero hold
- NB2/NBP still anchors before motion
- image-grounded Seedance/video only
- sparse instrumental modern electronic music
- QC rejects for fake text/logos, static portrait loops, repeated slow push-ins, broken walking/hands/faces, and generic AI luxury

Document these as assumptions, then continue into Imagine.Art execution when automation is available.

## Output

Return:

- concise campaign brief
- assumptions
- open questions or answered clarifications
- input asset role table
- recommended campaign grammar
- shot-list requirements
- model/actress continuity requirements
- required Imagine.Art workflow sections
- music direction starter

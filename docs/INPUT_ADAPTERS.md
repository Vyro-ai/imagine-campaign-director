# Input Adapters

Agents should accept many starting points and convert them into a usable Imagine.Art campaign workflow.

## Universal Intake

For every input, infer or ask for:

- product or subject
- audience
- platform
- duration
- aspect ratio
- CTA
- brand constraints
- assets available
- approval needs
- rights/likeness concerns

If details are missing, make conservative assumptions and label them.

If runtime is missing, default to a `30s` campaign video.

If the input is mostly broad taste language, apply `docs/VAGUE_PROMPT_RESCUE.md` before generation. The agent should expand vague terms into a concrete platform, runtime, campaign grammar, visual world, model/styling continuity, shot ladder, stillframe anchor list, motion constraints, music direction, and QC rejects.

For commercial/social/video-ad requests, query the user for missing production decisions before execution when they matter:

- platform and aspect ratio
- runtime
- audience
- CTA
- realism level
- main actress/model requirements
- music/vocal preference
- required brand assets
- rights or likeness constraints

If the user hands over incomplete assets, synthesize the missing production inputs rather than stopping at a concept: shot list, reference-frame plan, model continuity plan, Seedance prompts, music bed, edit plan, and QC gates.

## Brief Input

Convert a written brief into:

- campaign goal
- audience insight
- campaign grammar
- shot ladder
- workflow node plan
- music brief
- QC gates

## Raw Prompt Input

Extract:

- core product/category
- visual tone
- subject/action
- environment
- implied camera
- missing constraints

Then rewrite it into a full Imagine.Art workflow package. Do not simply expand the prompt with adjectives.

For vague luxury/fashion prompts with no assets, default to the `editorial nocturne` rescue pattern: 30-second 9:16 vertical, no text unless requested, one adult model in sharply tailored black outerwear, rain-wet concrete/glass/chrome night environment, cool shadows with warm practical light, NB2/NBP still anchors, image-grounded Seedance 2 motion, sparse instrumental music, and QC against generic AI luxury.

## Style Image Input

Analyze:

- color mood
- lighting direction
- camera angle
- surface/material language
- composition
- subject hierarchy
- motion implied by the image

Use the style image as visual direction, not as something to copy one-to-one. Create stillframe and motion prompts that preserve the taste logic while producing original campaign assets.

If the style image implies a camera move, convert it into a storyboard/reference ladder before Seedance. Do not assume the video model will infer motion grammar from a single image.

## Product Photo Input

Analyze:

- product shape
- material
- color
- label/text risk
- hero angles
- usable negative space
- closeout needs

Default to an image-first workflow: product clean-up or isolation, product hero stills, environment plates, motion, product-first end card.

For product campaigns, create separate references for product truth and motion. Product photos should stabilize shape, label, material, and proportions. Storyboard panels should describe camera path and scene evolution. Do not make one product image carry both jobs.

For a commercial/social spot, the product photo is not the final ad. It is product truth and continuity input for generated commercial footage, product interactions, closeups, and final lockup.

## Mood Board Input

Distill:

- dominant palette
- repeated materials
- environments
- wardrobe/styling
- camera grammar
- emotional tone
- what to avoid

Do not average the board into blandness. Pick one dominant campaign grammar and demote the rest to supporting details.

## Existing Video Input

Analyze:

- usable shots
- pacing
- camera movement
- artifact or quality issues
- shots to recreate
- shots to extend
- audio/music clues

Plan whether Imagine.Art should extend, reframe, restyle, or generate new companion clips.

## Mixed Assets

Assign each asset a role:

- product truth
- style reference
- environment reference
- character/casting reference
- motion reference
- color/lighting reference
- audio pacing reference

One asset should not be asked to do every job.

## Commercial / Social Spot Input

When the user's wording implies a produced ad, default to a real-world video-generation plan:

- brand assets become creative direction and continuity references
- Seedance 2 or another Imagine.Art video model becomes the core footage generator
- NB2/NBP generates original still/reference anchors by default
- GPT Image 2 or another Imagine.Art image model generates reference-driven panels when refs, continuity control, model availability, or artifact risk require it
- HyperFrames/editor handles finishing: pacing, transitions, text, logo lockup, CTA, captions, effects, and final assembly

Do not silently substitute a storyboard, prompt pack, static image sequence, or HTML-only animation for the requested commercial.

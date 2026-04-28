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

If the input is mostly broad taste language, apply `docs/VAGUE_PROMPT_RESCUE.md` before generation. The agent should default only production constraints, then invent multiple creative premises and select a concrete creative spine before choosing visual world, model/styling continuity, shot ladder, stillframe anchor list, motion constraints, music direction, and QC rejects.

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

For vague luxury/fashion prompts with no assets, do not default to a specific look such as a black-coat night-glass film. Default to a 30-second 9:16 campaign with no text unless requested, image-grounded Imagine.Art stills and Seedance 2 motion, original music, and QC against generic AI luxury. Invent the creative world through `docs/CREATIVE_DIRECTION_GATE.md`.

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
- brand kit / brand system
- logo / wordmark truth
- typography / palette truth
- style reference
- environment reference
- character/casting reference
- motion reference
- color/lighting reference
- audio pacing reference

One asset should not be asked to do every job.

If a supplied brand kit, brand board, deck screenshot, or style guide contains the only product/logo/type/palette information, treat that board as source truth and derive missing atomic assets before campaign stills or motion:

- upload/import the brand kit as a visible source node
- generate or isolate a clean product-lock still from it
- generate or isolate a logo/wordmark/type reference when deterministic end-card or product lockup will need it
- extract palette/type/material rules into analysis notes
- wire the brand kit into those derived lock nodes with explicit `@Image` role language
- wire the derived product/logo/style locks into every dependent still and Seedance reference set

Do not replace a supplied brand kit with a text description. Do not build a product-lock prompt from memory when the kit already shows packaging, logo, colors, typography, or material language.

Use the fastest available controlled asset-prep path for these atomic locks. If a local image-generation or image-editing tool is available and appropriate for source atomization, use it to create the clean product/logo/style lock files first, save them in the campaign workspace, then upload/import those files into the Imagine.Art workflow. If no local image tool is available, create the atomic product/logo/style lock nodes inside the Imagine.Art workflow before the rest of the campaign workflow. In both cases, the downstream campaign stills and motion must reference the atomic locks, not the text description alone.

## Commercial / Social Spot Input

When the user's wording implies a produced ad, default to a real-world video-generation plan:

- brand assets become uploaded/imported source nodes, creative direction, and continuity references
- if specific required assets are missing but inferable from a brand kit, generate the missing product/logo/style lock assets first, then reference those generated locks downstream
- Seedance 2 or another Imagine.Art video model becomes the core footage generator
- ImagineArt 2.0 generates original still/reference anchors by default when no reference control is required
- GPT Image 2 generates reference-driven panels when refs, style/product/character continuity, storyboard control, or artifact risk require it
- HyperFrames/editor handles finishing: pacing, transitions, text, logo lockup, CTA, captions, effects, and final assembly

Do not silently substitute a storyboard, prompt pack, static image sequence, or HTML-only animation for the requested commercial.

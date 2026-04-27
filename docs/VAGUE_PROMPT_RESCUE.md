# Vague Prompt Rescue

Use this when the user gives broad taste language without enough production direction, especially phrases like `luxury fashion campaign`, `modern brand`, `mystique`, `elegance`, `Gen Z`, `cinematic`, `premium`, or `no text`.

The goal is not to default into a canned film. The goal is to invent a specific campaign from sparse direction while keeping the practical production constraints clear.

## What Can Default

When the user gives a sparse campaign brief and supplies no assets, default only the production frame:

- runtime: `30s` unless the user asks for a cutdown
- format: social-first vertical `9:16` unless another platform is specified
- text: none when the user says no text/logos/captions
- audio: original instrumental music unless the user requests silence, voiceover, or vocals
- workflow: Imagine.Art workflow, image-grounded stills/references, Seedance 2 motion, Music Studio audio
- safety: adult subjects only, no fake logos/signage/watermarks
- continuity: lock any recurring person, product, garment, or setting before dependent shots

Everything else is a creative decision, not a default.

## What Must Be Invented

Do not automatically choose:

- black tailored outerwear
- rain-wet concrete
- glass/chrome architecture
- night setting
- one model
- slow push-ins
- generic silhouette/portrait/macro/final-hold coverage

Those can be selected only if the creative-direction pass chooses them for a reason.

Before generation, run the ideation swarm in `docs/ADVERSARIAL_SWARM_PROTOCOL.md`, then apply `docs/CREATIVE_DIRECTION_GATE.md` and produce distinct campaign premises. If subagents cannot be spawned, return `blocked: subagents unavailable` before canvas work or paid generation. Each premise should make different choices for:

- subject or product role
- world/location
- status change
- physical event
- camera grammar
- styling/product authority
- final memory image

Then apply `docs/PRE_SPEND_CONFIDENCE_GATE.md`. Do not spend credits until the selected idea clears the scorecard.

## Required Expansion Output

Before generating, write the expanded brief into the active workspace:

- production assumptions
- three creative premises
- selected creative spine and rejected-premise notes
- campaign grammar chosen from the idea, not from a canned default
- visual world
- model/product/styling continuity
- shot ladder
- stillframe anchor list
- motion prompt intent
- music direction
- pre-spend confidence score
- run budget
- QC rejects

If Computer Use/browser automation is available, continue into Imagine.Art execution after writing the expansion and critic reports. Do not stop at the expansion unless execution is blocked.

## Example Premise Families

For a sparse luxury fashion request, possible directions include:

- a model moving through a sealed private building that gradually opens around them
- a garment revealed through wind, fabric, and streetlight rather than face-forward posing
- an underground transit, hotel, gallery, rooftop, atelier, or backstage world
- a daytime hard-sun architectural campaign instead of another night-glass film
- a tactile material ritual built around gloves, coat closure, collar, bag, shoe, or jewelry
- a social-status shift: ignored figure becomes the center of gravity, door opens, room turns, light finds them

These are examples, not defaults.

## QC Gate

The result is not finished if:

- it feels like the agent defaulted to a known archetype instead of inventing a campaign
- it looks like generic AI luxury rather than a directed film
- shots repeat the same pose, crop, background, or slow push-in shape
- the first second is a static portrait with no hook event
- the contact sheet fails `docs/DIRECTORS_EYE_GATE.md`
- accidental text, logos, signage, or watermarks appear
- the final hold is not memorable

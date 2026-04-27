# Vague Prompt Rescue

Use this when the user gives broad taste language without enough production direction, especially phrases like `generic luxury fashion campaign`, `modern brand`, `mystique`, `elegance`, `Gen Z`, `cinematic`, `premium`, or `no text`.

The goal is to convert vague taste words into specific campaign decisions before generating. Do not merely add more adjectives.

## Default Luxury Fashion Expansion

When the user asks for a generic luxury or modern fashion campaign and supplies no assets, use this default unless the prompt contradicts it:

- platform: vertical social, `9:16`
- runtime: `10s`
- text: none unless the user asks for brand/product/CTA
- audio: no vocals, sparse modern electronic pulse
- campaign grammar: `editorial nocturne`
- audience: Gen Z fashion/lifestyle viewer
- visual world: rain-wet concrete, glass, chrome, and warm practical light at night
- subject: one adult model in sharply tailored black outerwear
- styling: clean silhouette, minimal accessories, controlled hair and makeup, no visible logos
- camera: low-angle silhouette, slow lateral track, restrained push, detail insert, locked final hold
- motion: one simple walk, turn, fabric movement, reflection sweep, or light pass per shot
- color: cool shadows, warm highlights, restrained contrast, no neon overload
- final memory image: model held in silhouette or three-quarter portrait with negative space, fabric and city reflections carrying the frame

Avoid:

- fake brand logos or generated text
- runway montage energy unless requested
- static portrait loops
- repeated centered slow push-ins
- overstuffed luxury props
- complex hand gestures
- two-foot walking closeups
- crowds unless supplied as a deliberate reference

## Required Expansion Output

Before generating, write the expanded brief into the active workspace:

- assumptions
- chosen campaign grammar
- visual world
- model/styling continuity
- shot ladder
- stillframe anchor list
- motion prompt intent
- music direction
- QC rejects

If Computer Use/browser automation is available, continue into Imagine.Art execution after writing the expansion. Do not stop at the expansion unless execution is blocked.

## Default Shot Ladder

For a 10-second generic luxury fashion prompt:

1. `0.0-1.5s` silhouette hook: low-angle model crossing wet concrete, warm light edge on coat
2. `1.5-3.5s` world reveal: lateral track through glass/chrome walkway, reflections moving
3. `3.5-5.5s` detail accent: black fabric, sleeve, collar, rain bead, or chrome reflection
4. `5.5-8.0s` movement beat: model turns once or takes one controlled step as fabric moves
5. `8.0-10.0s` final hold: composed three-quarter portrait or back-view silhouette with clean negative space

Each motion shot needs an approved NB2/NBP still anchor or storyboard/reference panel before Seedance/video generation.

## Default Still Anchors

Generate 2-4 variants for:

- silhouette opener
- glass/chrome city walkway
- fabric/material detail
- model turn or posture frame
- final hero hold

Use `Nano Banana 2` for fast exploration and `Nano Banana Pro` for final anchors headed into motion.

## Default Music

Use an instrumental 10-second bed:

- sparse modern electronic pulse
- 82-96 BPM
- low sub bass
- soft metallic percussion
- airy pad or glass tone
- one subtle impact around `8.0s` for the final hold
- no vocals, no lyrics, no EDM drop, no runway-house cliche

## QC Gate

The result is not finished if:

- it looks like generic AI luxury rather than a directed fashion film
- the model identity, wardrobe, or silhouette drifts between shots
- walking, hands, face, or fabric breaks in hero frames
- shots repeat the same slow push-in shape
- first second is a static portrait with no hook
- accidental text, logos, signage, or watermarks appear
- the final hold is not memorable

# Prompting Guide

## Still Image Prompting

All generated still images must follow `docs/CINEMATIC_STILL_PROMPTING_PLAYBOOK.md`. This applies to ImagineArt 2.0, GPT Image 2, Nano Banana 2, Nano Banana Pro, product plates, styleframes, first/last frames, environment plates, storyboard boards, director's-notes images, and any still that will feed motion.

Use labeled lines:

```text
SHOT:
SUBJECT:
ENVIRONMENT:
LIGHTING:
CAMERA:
FILM STOCK / FORMAT:
COLOR GRADE:
MOOD:
COMPOSITION:
ASPECT RATIO:
TEXTURE:
IMPERFECTION:
AESTHETIC REFUSALS:
AVOID:
```

Minimum required blocks for image-generation nodes are `SHOT`, `SUBJECT`, `ENVIRONMENT`, `LIGHTING`, `CAMERA`, `COLOR GRADE`, `COMPOSITION`, and `AVOID`. The workflow materializer enforces these blocks unless a node has a documented `stillPromptExemptReason`. Campaign stills, hero frames, reference anchors, and images that feed motion should also include `IMPERFECTION` and `AESTHETIC REFUSALS`.

The `AVOID` block must include the universal AI-look constraints:

`plastic skin, smoothed faces, oversharpening, HDR look, extra fingers, distorted hands, garbled text, cartoon style, illustration`

Do not write `please`, `create an image of`, `make an image of`, or `generate an image of`. Describe the still directly as a film frame.

Model priority for reference frames:

1. Use ImagineArt 2.0 for original stillframes, look development, graphic inserts, product/environment plates, and exploratory visual systems when no reference control is required.
2. Use GPT Image 2 when references, storyboard panels, style images, product photos, character/model continuity, or other visual control are necessary.
3. Use Nano Banana 2 only when ImagineArt 2.0/GPT Image 2 are not the right fit for the asset role or live workflow availability.
4. Use Nano Banana Pro only when premium final still fidelity, product-truth precision, or another NBP-specific advantage is required.
5. Use another Imagine.Art image model only when the live UI, model availability, or artifact risk makes it the better fit. Document the exception.

If a prompt depends on continuity, use explicit reference language: `@Image1 controls identity and wardrobe`, `@Image2 controls product truth`, `@Image3 controls style/lighting`. Do not write `same model`, `same person`, `same character`, or `same product`.

The goal is not final poster art; the goal is a set of clean, coherent panels that Seedance can understand as camera and subject motion references.

Each panel prompt should lock:

- shot size
- camera position
- product/subject position
- lighting direction
- stable identity/product details
- what changes from the previous panel
- the shared aesthetic block: camera family, lens family, film stock/sensor look, grade, texture, and aspect ratio

## Video Prompt

Include:

- duration as a video node setting outside the prompt
- aspect ratio
- source still or reference role
- camera movement
- subject movement
- environmental movement
- ordered phase blocks without seconds or duration language
- transition logic
- continuity constraints
- final hold

Do not mention clip duration, seconds, or time ranges in Seedance/video prompt text. Set duration in the node property and use phase labels inside the prompt.

## Better Than Vague

Weak: `luxury cinematic fashion video`

Stronger still prompt:

```text
SHOT: Low-angle medium-wide fashion film still, model crossing wet stone steps.
SUBJECT: Adult model in a structured black wool coat, one restrained turn, coat edge catching light.
ENVIRONMENT: After-hours museum entry, rain-wet stone, black glass doors, sparse chrome rail, faint haze.
LIGHTING: Narrow warm practical strip from camera-right, cool blue ambient fill, hard rim along coat edge.
CAMERA: ARRI Alexa 35 look, 35mm anamorphic lens, f/2.8, low camera height.
COLOR GRADE: Cool cyan shadows, warm amber highlights, low saturation, realistic highlight roll-off.
COMPOSITION: Leading stair lines, subject lower third, negative space above for final memory hold.
IMPERFECTION: Crop cuts the upper edge of the coat by design; the model is half a beat before the clean pose.
AESTHETIC REFUSALS: no slow push, no centered hero, no generic black-gloss luxury.
AVOID: plastic skin, smoothed faces, oversharpening, HDR look, extra fingers, distorted hands, garbled text, cartoon style, illustration, logos, readable signage.
```

## Simplify Risk

Hands, glass, mirrors, crowds, complex walking, readable labels, and exact logos are high-risk. Hide, simplify, or move them to deterministic post-production when possible.

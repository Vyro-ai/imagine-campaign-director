# Prompting Guide

## Stillframe Prompt

Include:

- subject
- product
- wardrobe or styling
- environment
- materials
- lighting
- composition
- lens feel
- color mood
- implied motion
- intended use
- negative constraints

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

## Video Prompt

Include:

- duration
- aspect ratio
- source still or reference role
- camera movement
- subject movement
- environmental movement
- timing blocks
- transition logic
- continuity constraints
- final hold

## Better Than Vague

Weak: `luxury cinematic fashion video`

Stronger: `Low-angle 35mm tracking shot across wet stone steps. A model in a structured black wool coat turns once as a narrow strip of warm light catches the coat edge. The camera stops on a clean silhouette with negative space for end-card typography.`

## Simplify Risk

Hands, glass, mirrors, crowds, complex walking, readable labels, and exact logos are high-risk. Hide, simplify, or move them to deterministic post-production when possible.

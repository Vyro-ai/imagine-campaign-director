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

For storyboard/reference-frame ladders, prefer GPT Image 2 inside Imagine.Art Workflows when available. The goal is not final poster art; the goal is a set of clean, coherent panels that Seedance can understand as camera and subject motion references.

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

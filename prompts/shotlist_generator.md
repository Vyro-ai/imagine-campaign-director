# Shotlist Generator

Turn the brief into a production-ready shot list.

For commercial, social media campaign, TikTok/Reels ad, 30s spot, or professionally produced video requests, the shot list is the production spine for generated footage. It must be suitable for Seedance 2 or the selected Imagine.Art video model, not just a static storyboard.

For each shot, include:

- shot number
- duration
- automation type
- purpose
- justification: why this shot belongs in the film
- visual direction
- shot size and lens feel
- camera
- action
- reference image/start frame needed
- Seedance prompt intent
- continuity rules
- negative prompt notes
- text overlay
- audio/narration
- transition
- music or beat relationship
- risk notes

For a 30-second vertical ad, default to 8-12 shots unless the brief requires a different structure. Balance:

- hook
- product/service context
- main actress/model or user moment if requested
- problem/desire/benefit beat
- product interaction
- detail/proof
- emotional or social proof beat
- product/brand lockup
- CTA

If runtime is missing, default to a 30-second campaign and use the 8-12 shot structure.

For a vague generic luxury fashion prompt with no assets, use the `modern_night_fashion_film` 30-second ladder unless the user contradicts it:

1. 0.0-2.0s silhouette hook
2. 2.0-5.0s nighttime world reveal
3. 5.0-8.0s styling portrait
4. 8.0-11.0s material/detail accent
5. 11.0-15.0s controlled model turn or single step
6. 15.0-18.5s environmental breath
7. 18.5-22.0s attitude close/medium
8. 22.0-26.0s final approach or reveal
9. 26.0-30.0s final elegant hero hold

Keep it text-free when requested. Require ImagineArt 2.0 original still anchors or GPT Image 2 reference-driven anchors for each motion source, and reject repeated slow push-ins, static portraits, fake text/logos, broken walking, and generic AI luxury.

Before the workflow canvas is touched, the shot list must read like a near-deterministic edit: ordered timeline, cut points, transitions, final hold, music hits, and which shots are combined into each Seedance 2 multi-shot node. If a shot cannot be justified, remove it before generation.

If the user requests a believable main actress/model, every relevant shot must repeat the continuity strategy: identity description, wardrobe, hair, makeup, performance style, camera distance, and which connected reference frame/start frame controls the shot. Image prompts must use explicit `@Image1`, `@Image2`, etc. references instead of phrases like `same model` or `same person`.

Default 20-second structure:

1. Hook
2. Product/world reveal
3. Use-case or transformation
4. Detail/macro proof
5. Human/emotional moment
6. Offer/benefit
7. Product-first CTA

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

For a vague generic luxury fashion prompt with no assets, use the `editorial_nocturne` 10-second ladder unless the user contradicts it:

1. 0.0-1.5s silhouette hook
2. 1.5-3.5s nocturnal world reveal
3. 3.5-5.5s material/detail accent
4. 5.5-8.0s controlled model turn or single step
5. 8.0-10.0s final elegant hero hold

Keep it text-free when requested. Require NB2/NBP still anchors for each motion source and reject repeated slow push-ins, static portraits, fake text/logos, broken walking, and generic AI luxury.

Before the workflow canvas is touched, the shot list must read like a near-deterministic edit: ordered timeline, cut points, transitions, final hold, music hits, and which shots are combined into each Seedance 2 multi-shot node. If a shot cannot be justified, remove it before generation.

If the user requests a believable main actress/model, every relevant shot must repeat the continuity strategy: identity description, wardrobe, hair, makeup, performance style, camera distance, and which reference frame/start frame controls the shot.

Default 20-second structure:

1. Hook
2. Product/world reveal
3. Use-case or transformation
4. Detail/macro proof
5. Human/emotional moment
6. Offer/benefit
7. Product-first CTA

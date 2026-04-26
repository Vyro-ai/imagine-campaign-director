# Revision Plan

Diagnose the failure type before regenerating. Do not blindly rerun the full workflow.

## If The Campaign Feels Generic

Likely cause: prompts are relying on broad luxury language instead of Noctivelle-specific blocking and materials.

Fix: add rain-wet black stone, black orchid, warm gold reflection, black silk, low city lamps, and restrained posture. Remove extra smoke, neon, flowers, runway movement, and dramatic camera language. Regenerate the affected GPT Image 2 panel first, then regenerate only its linked Seedance shot.

## If Product Continuity Fails

Likely cause: product hero asset is not weighted as product truth or the motion prompt asks for too much handling.

Fix: use the product hero asset as product truth for Shots 03, 05, and 06. Reduce hand action to one small lift or locked hold. Avoid label-facing motion except on final still/product plate.

## If Hands Break

Likely cause: close-up hand/bottle interaction is too complex.

Fix: keep fingers together, hide part of the hand in shadow or crop, move contact out of frame, or replace hand action with bottle placed on wet stone.

## If The Label Or Logo Looks Wrong

Likely cause: generated media is being asked to produce final typography.

Fix: treat generated label as blank or atmospheric, use deterministic end-card type in HyperFrames/editing, and use `logo-mark-generated.png` only as a reference for placement and gold-on-black behavior.

## If Motion Is Chaotic

Likely cause: one Seedance prompt contains too many events.

Fix: split complex motion into a shorter node, or reduce it to one event. Prefer slow push, tiny rack focus, one step, or locked product hold.

## If Music Feels Wrong

Likely cause: Music Studio output is too upbeat, too horror-coded, or too busy.

Fix: regenerate with stronger constraints: no vocals, 68-74 BPM, minimal fashion-film pulse, soft sub bass, distant strings, glassy shimmer.

## If Final Frame Is Weak

Likely cause: final plate lacks product hierarchy or enough negative space.

Fix: regenerate Panel 06 as a clean product-first plate, keep product centered or slightly low, add deterministic brand/product/CTA typography after generation, and remove extra flowers or props competing with the bottle.

## Versioning Recommendation

Use revision labels by failure type:

- `R1-panel-product-continuity`
- `R1-motion-hand-simplify`
- `R1-music-restraint`
- `R1-endcard-type-safe`

Only replace the nodes affected by the diagnosed failure. Keep approved source, strategy, and unrelated clips unchanged.

# Production Learnings

This file keeps the short lessons that should influence campaign judgment. The canonical rules are in `docs/PRODUCTION_STANDARD.md`.

## Lessons

- A workflow graph is not the product; reviewed motion, music, edit assembly, QC, and manifest are the product.
- Source images are production inputs, not substitutes for motion.
- Stills and storyboard panels are strongest when they each have one clear job for the motion model.
- Motion should contain a physical event, camera discovery, or editorial escalation.
- Music should be planned before final timing, not pasted on after the edit.
- B-roll needs an editorial job.
- Product closeouts should be designed intentionally and handled with deterministic type/layout when accuracy matters.
- Reference parity is a creative requirement, not a polish pass.
- NB2/NBP stillframes are the default taste-transfer layer before motion; save and document the approved still before animating from it.
- A text-only motion clip invalidates a final campaign source even if the clip looks useful. If only product/orchid/source-grounded clips survive QC, either label the result as limited or revise; do not smuggle ungrounded subject or gesture clips into the final.
- Music Studio handoffs can append default wording or reset duration. Verify the in-app prompt and trim longer usable tracks intentionally in the edit.
- HyperFrames nested-video renders may need regular-keyframe re-encodes. If a lint fix breaks nested timing, document the warning and rely on verified playback/export rather than forcing the lint workaround.
- Live footage needs a written pickup plan with exact lines, framing, lens feel, performance, environment, wardrobe, and overlay/b-roll notes.

## Gates

Use these gates from `docs/PRODUCTION_STANDARD.md`, `docs/AUTOMATION_CONTRACT.md`, and `docs/QUALITY_CONTROL.md`:

- aesthetic gate
- workflow gate
- selects gate
- delivery gate

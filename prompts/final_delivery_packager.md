# Final Delivery Packager

Prepare the campaign for handoff.

Include:

- campaign brief summary
- Imagine.Art workflow map
- final script
- final shot list
- final prompt set
- negative prompts
- Music Studio prompt and selected track notes
- asset manifest
- shot-source manifest proving each visual shot is reviewed motion footage or deterministic type/layout
- motion/audio coverage audit result
- edit notes
- caption notes
- QC report
- reference-parity table
- export specs
- revision history
- reuse notes

Default export: 16:9, 1920x1080, MP4 H.264, AAC audio.

## Imagine.Art Workflow Handoff

Include:

- workflow name
- section list
- source inputs
- approved stills
- approved motion clips
- music prompt/track
- rejected outputs and reasons
- final export notes

## Non-Negotiable

Do not package a campaign as final if the visual timeline is made from still crops, mood-board panels, brand-board crops, workflow screenshots, slideshows, or local pan/zoom animation. Label that output `partial/proxy` and state that Imagine.Art motion generation is still required.

Do not package a campaign as final if it is merely workflow-valid but fails the reference-parity table. A clean export made from reviewed Imagine.Art clips can still be `needs revision` when it lacks the campaign behavior implied by the brief or references.

Run this before using `ready`, `finished`, `final`, or `delivered` language:

```bash
python3 scripts/audit_campaign_delivery.py path/to/campaign
```

If the audit fails, lead the handoff with the blocker. Do not bury notes like `silent`, `still anchors`, `non-exportable clips`, or `proxy` underneath a ready/finished claim.

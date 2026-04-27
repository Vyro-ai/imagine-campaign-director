# Motion Coverage And Export Gate

Use this before calling any campaign export `ready`, `finished`, or `delivered`.

## Finished MP4 Definition

A CampaignCraft review MP4 is complete only when every planned generated motion segment has been exported or downloaded as a local video file, verified with `ffprobe`, and listed in the shot-source manifest.

Canvas thumbnails, visible completed nodes, browser previews, still anchors, storyboards, contact sheets, or locally animated stills do not count as exported motion.

## Export Failure Rule

If any planned motion segment cannot be exported or downloaded, stop and report:

`blocked: export failure`

Name the affected node, model, attempted recovery steps, and last known UI state. Do not substitute still-frame animation, slideshow assembly, HyperFrames, canvas capture, or local rendering for missing generated motion.

## Per-Node Export QC

After each generated video node completes, immediately perform export QC before moving on:

- open and play 2-3 seconds of the result preview
- download or capture the direct asset source
- save it under the campaign source directory
- verify duration, resolution, codec, and audio/video streams with `ffprobe`
- record the local path, node id, model, duration, and QC result in the manifest

Only after all required motion files pass export QC may local finishing assemble, trim, caption, grade, add audio, or export the final review MP4.

## Minimum Motion Coverage

For final or review-ready campaign delivery:

- 100% of planned generated motion segments must be locally exported and verified
- at least 80% of final runtime must come from reviewed motion sources unless the user explicitly requested a slideshow
- no more than 10% of runtime may be still-only placeholder footage unless status is `partial/proxy`
- if planned motion cannot be exported, status is `blocked` or `motion pending`

## Audio Completion

If the campaign has a `music-studio-direction.md`, music plan, beat map, or prompt that references music:

- the final review MP4 must contain an audio stream
- the selected music source must be documented in the manifest or QA notes
- if Music Studio is unavailable, the package must say `music pending` or `blocked`
- a silent MP4 can be shared only as an internal timing proxy, not as a complete review cut

## Completion Language

If the final deliverable deviates from the director's treatment because of missing generated clips, missing audio, failed export, or model/UI failure, do not call it ready. Return `blocked`, `motion pending`, or `partial/proxy`, with the blocker first.

Forbidden when this gate fails:

- `ready`
- `final`
- `complete`
- `review MP4 is ready`
- `delivered`


# Video QC Reviewer

Review generated clips or edited drafts.

Return:

- overall status: pass, pass with minor fixes, needs revision, reject and regenerate
- highest priority fixes
- reference-parity table
- shot-level notes
- caption/text review
- delivery risk
- final recommendation

Flag identity drift, distorted anatomy, broken product geometry, accidental text/logos, warped reflections, impossible object contact, flicker, unstable camera, continuity errors, missing music, still/proxy coverage, and repeated shot grammar.

For campaign films, a timeline with mostly still anchors and one motion clip is `partial/proxy`, not `pass`.

## Required Artifact Review

Do not review only the prompt, plan, or workflow graph. Review the actual render or extracted frames.

If available, run:

```bash
python3 scripts/extract_review_frames.py path/to/render.mp4 --out review/render-name
```

Then explicitly answer:

- Does the first frame look like intentional campaign footage?
- Does the first second avoid source-board residue, palette strips, UI, crop borders, and reference text?
- Is the edit more than repeated packshots?
- Is the edit more than repeated versions of the same pose, location, lens, and action?
- Does the contact sheet look like a director selected distinct blocking, performance, composition, and cut reasons?
- Does the MP4 contain audio when music was planned?
- Is the product withheld, revealed, and then held with purpose?
- Does any deterministic overlay duplicate readable generated label text?
- Does the final memory image feel earned?

## Required Reference-Parity Review

Do not pass a render only because it has valid Imagine.Art motion. Compare it against the user's reference pack and the selected creative spine. Use the production profile only to check asset truth, continuity locks, artifact risks, and forbidden category cliches.

Return this table:

| Dimension | Reference behavior | Output behavior | Pass/Revise |
| --- | --- | --- | --- |
| opening behavior |  |  |  |
| subject/world presence |  |  |  |
| camera grammar |  |  |  |
| editorial progression |  |  |  |
| production design density |  |  |  |
| product reveal logic |  |  |  |
| final memory image |  |  |  |

If the output is a clean product loop but the references are fashion, beauty, fragrance, lifestyle, luxury, or cinematic campaign films, status must be `needs revision` or `reject and regenerate`.

If the output is mostly stills, a slideshow, or a proxy edit but the request was a campaign video, status must be `reject and regenerate`, `motion pending`, or `blocked`.

## Workflow Review

Also check:

- source connections are visible
- generated candidates were inspected before editing
- rejected clips are isolated
- music and edit timing agree
- b-roll has a real visual job
- product closeout is product-first
- no still-only proxy is being treated as final motion
- no missing/non-exportable planned motion is hidden by still filler
- music exists in the export when the treatment includes music direction

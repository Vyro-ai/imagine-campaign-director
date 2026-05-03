# Troubleshooting

## Fresh-Install Execution Tests

Use these scenarios when testing whether agents stop at markdown files instead of operating Imagine.Art:

| Scenario | Expected behavior |
| --- | --- |
| Fresh Codex install, no Computer Use/browser automation/desktop control available | Immediately return `blocked: missing Computer Use/browser automation`; do not create a static package as the deliverable. |
| Computer Use/browser automation reaches Imagine.Art but the browser is logged out | Return `blocked: Imagine.Art login required`; instruct the user to log in in that same browser/session; do not plan canvas work or spend credits. |
| Computer Use/browser automation reaches Imagine.Art and is logged in | Write the treatment, build/paste the workflow, generate Music Studio/stills/motion as planned, QC/export, and do not ask for approval solely because credits will be spent. |
| Pasted workflow is verified but selected nodes are ambiguous | Return `blocked: selection ambiguous`; do not ask for generic user approval to spend. |
| Visible credit estimate is higher than the planned batch | Stop, deselect/reselect or isolate the node. Ask the user only if the abnormal estimate cannot be resolved or exceeds the treatment budget. |
| Agent returns only markdown, prompt packs, or `ready for generation` while automation is available | Fail the test. Those are supporting artifacts, not the campaign deliverable. |

## The Output Feels Generic

Pick one stronger visual idea. Add specific location, material, posture, lens, and motion. Remove filler shots.

## The Agent Gives Me Only Prompts

Ask it to use `docs/IMAGINEART_WORKFLOW_BLUEPRINT.md` and return a node-by-node Imagine.Art Workflow plan with sections, variants, music, QC, and export notes.

If the agent has browser access, ask it to use `docs/AUTOMATION_CONTRACT.md` and `prompts/imagineart_browser_operator.md` to execute the workflow inside Imagine.Art. A prompt pack is not the product.

## The Workflow Looks Complete But Nothing Was Generated

This is a planning failure. Require the agent to report one of the exact statuses from `docs/AUTOMATION_CONTRACT.md`: `finished`, `ready for generation`, `motion pending`, `partial/proxy`, or `blocked`.

`finished` is only valid when reviewed Imagine.Art motion and generated/supplied audio have been assembled or packaged for final assembly.

## The Pasted Node Uses The Wrong Model

Trust the visible UI, not the pasted payload. Correct the model manually or recreate the node before launch. If the node cannot be corrected cleanly, delete it and document the mismatch in QA.

## The Aspect Ratio Fails

Use `config/imagineart_model_matrix.json`. Retry with the model's automation default ratio. For GPT Image 2 storyboard/reference panels, start with `1:1` unless another ratio has already been proven in the live workflow.

## The Output Is A Moderation Placeholder

Treat it as a failed output. Do not use it as a reference frame. Simplify the prompt, remove risky ambiguity, avoid brand-name shorthand, and retry once. If it fails again, switch model or redesign the shot.

## The Final Workflow Has Old Nodes

Delete failed, rejected, duplicate, abandoned, and unused nodes from the final live workflow after documenting them locally. The final canvas should show the actual production path only.

## The Product Changes

Use stillframe anchors, simplify motion, isolate product hero shots, and avoid rotating complex packaging unless the model can preserve it.

## Hands Look Bad

Hide hands, reduce finger visibility, use hands as silhouette, or redesign the shot around product, fabric, light, or surface detail.

## Text Looks Fake

Do not generate critical text. Add typography in the edit.

## Motion Is Chaotic

Use fewer actions. A 10-second clip should usually have about four major phases, not ten.

## The Music Does Not Fit

Regenerate the Music Studio prompt from the campaign grammar. Define genre, mood, tempo, instruments, vocal/no vocal, duration, and edit hit points. If the input is visual, translate the image mood into text direction first.

## The Edit Feels Expensive But Unclear

Add product hierarchy, stronger final hold, and a readable CTA.

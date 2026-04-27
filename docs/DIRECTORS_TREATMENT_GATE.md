# Director's Treatment Gate

Use this before touching the Imagine.Art workflow canvas. The campaign should be designed as a film first, then executed as a workflow.

The canvas is not the place to discover the concept. It is the place to execute a nearly deterministic edit plan.

## Hard Gate

Do not create, paste, or launch workflow nodes until the active workspace contains a director's treatment with:

- campaign thesis
- audience and platform
- dominant campaign grammar
- visual world
- casting/model/styling continuity
- material and production design system
- color and lighting system
- music direction and rough beat map
- shot-by-shot timeline
- stillframe anchor plan
- Seedance 2 multi-shot node plan
- edit assembly plan
- QC rejection criteria
- final memory image

If the user gives a vague prompt, apply `docs/VAGUE_PROMPT_RESCUE.md` first, then write the treatment from that expanded direction.

## Shot Justification

Every planned shot must justify its place in the edit. For each shot, document:

- timeline range
- visual job
- why it belongs in the film
- shot size and lens feel
- camera movement
- subject/product/environment action
- source still or reference role
- Seedance 2 prompt role
- transition in and transition out
- music or beat relationship
- artifact risks and simplifications

Delete or merge any shot that has the same job, same shot size, same movement, and same subject behavior as another shot.

## Near-Deterministic Edit Plan

Before generation, define the edit enough that the final assembly is mostly mechanical:

- exact target duration
- ordered shot list
- intended cut points
- major music hits
- transition logic
- crop and framing rules
- caption/type policy, including `no text` when requested
- b-roll/detail insert locations
- final hold duration

If the user did not specify duration, set the target duration to `30s` and plan an 8-12 shot edit.

Generation can change selects, but it should not change the whole edit shape unless QC proves the treatment failed.

## Seedance Planning

Plan Seedance 2 at the clip level before building nodes.

For a 30-second fashion/luxury campaign, prefer:

- 2-4 Seedance 2 multi-shot campaign nodes covering the full edit in planned blocks, plus short dedicated b-roll/detail nodes only when editorially justified
- each Seedance 2 node should use the longest useful available duration for the creative job, up to the live model maximum; 15s nodes are appropriate when one continuous multi-shot phrase improves continuity, mood, or editorial progression
- each Seedance 2 node needs broad internal phases, one hero event per phase, and clear reference roles

For an explicitly 10-second fashion/luxury cutdown, prefer:

- one primary 10-second multi-shot Seedance 2 campaign node with about four broad phases, or
- two 5-second multi-shot Seedance 2 nodes when continuity or risk control needs separation, plus short dedicated b-roll/detail nodes only when editorially justified

Do not plan five isolated one-shot video nodes by default. Use separate motion nodes only when the edit, risk profile, or reference roles require separation.

## Workflow Translation

After the treatment passes, translate it into the workflow:

- one row per shot or Seedance clip plan
- one column per production stage
- stillframe anchors generated in batches
- approved anchors selected before motion
- Seedance 2 nodes created from the approved multi-shot plan
- edit/QC/export notes matching the treatment

The pasted workflow should visually match the treatment. If a human cannot map the canvas back to the shot plan, the workflow is not ready.

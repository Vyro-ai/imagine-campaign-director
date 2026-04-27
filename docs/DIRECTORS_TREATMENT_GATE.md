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
- identity lock plan from `docs/IDENTITY_LOCKS_AND_RUN_BUDGETS.md`
- material and production design system
- color and lighting system
- music direction and rough beat map
- shot-by-shot timeline
- stillframe anchor plan
- director's-notes storyboard plan for complex shots
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
- director's-notes board role when camera choreography is complex
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

## Director's Notes Boards

For complicated motion, apply `docs/DIRECTORS_NOTES_STORYBOARDS.md` before Seedance 2 prompting. Use GPT Image 2 to create annotated camera-movement boards with numbered phases, camera arrows, subject/product arrows, timing blocks, shot-size notes, and sequence notes.

The treatment must identify which shots or Seedance 2 nodes need these boards and what each board controls. A director's-notes board should guide motion choreography and phase order; it should not replace identity, product-truth, or final hero still anchors.

## Workflow Translation

After the treatment passes, translate it into the workflow:

- locked identity/product/garment references are created or imported before dependent shot anchors
- every dependent still or motion node that contains the recurring subject has visible edges from the lock reference
- one row per shot or Seedance clip plan
- one column per production stage
- stillframe anchors generated in batches
- approved anchors selected before motion
- GPT Image 2 director's-notes boards created for complex motion before Seedance 2
- Seedance 2 nodes created from the approved multi-shot plan
- edit/QC/export notes matching the treatment

The pasted workflow should visually match the treatment. If a human cannot map the canvas back to the shot plan, the workflow is not ready.

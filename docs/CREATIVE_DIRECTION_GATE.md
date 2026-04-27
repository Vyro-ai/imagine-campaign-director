# Creative Direction Gate

Use this before the director's treatment. This gate exists because a workflow can be technically correct, diverse, and still boring.

Run the ideation swarm from `docs/ADVERSARIAL_SWARM_PROTOCOL.md` before this gate. Use the swarm to produce divergent ideas, not to validate a default. If subagents cannot be spawned, return `blocked: subagents unavailable` before canvas work or paid generation.

## Core Rule

Do not start the shot list from generic taste words like `luxury`, `cinematic`, `modern`, `mystique`, `Gen Z`, `premium`, or `editorial`. Translate them into a specific campaign idea with tension, behavior, and a visual reason to keep watching.

## Required Creative Pass

Before choosing the treatment, generate at least three distinct campaign premises. If an ideation swarm ran, synthesize from its premise set instead of inventing alone:

1. `Elegant Control`: restrained, architectural, precise, quiet power.
2. `Disruptive Spark`: a specific visual interruption, reveal, or status-shift that creates energy.
3. `Sensory Proof`: material, weather, texture, product, or body-language evidence that makes the world tactile.

For each premise, write:

- one-sentence creative spine
- hook image
- main event
- visual contradiction or tension
- production design signature
- camera grammar
- final memory image
- why Gen Z would stop rather than scroll
- biggest AI risk and simplification

Select one premise or intentionally hybridize two. Document why the rejected premises are weaker for the brief.

## Creative Spine

The selected campaign must be describable as:

`A [specific subject/product] does [specific behavior] inside [specific world] until [specific reveal/status change], leaving [specific final memory].`

Bad:

`A luxury fashion campaign with mystique and elegance.`

Good:

`A controlled model moves through a locked glass tower as light turns the black coat from silhouette into armor, ending on a still portrait after the building seems to open for her.`

## Spark Test

Before still generation, answer:

- What happens in the first two seconds that is not just a pretty pose?
- What changes between the beginning and the final hold?
- What is the most memorable physical event?
- What image would a viewer remember with the sound off?
- What would be lost if we removed three middle shots?
- Which shot would be embarrassing if it looked like generic AI luxury?

If the answers are vague, rewrite the premise.

Then apply `docs/PRE_SPEND_CONFIDENCE_GATE.md`. Do not spend credits just because a premise sounds plausible.

## Risk Budget

Every campaign needs at least one creative risk, but not ten. Choose one or two controlled risks:

- bold blocking or silhouette
- striking location event
- unusual camera reveal
- material/weather event
- unexpected gesture or ritual
- editorial contrast cut
- final hold with real posture/lighting change

Simplify everything else around those risks so the model can execute.

## Anti-Generic Prompt Rule

Prompts must contain concrete directorial nouns and verbs:

- `elevator doors part`, `coat cuts across amber light`, `camera tracks behind wet glass`, `rain bead crawls along collar seam`, `chrome reflection wipes frame`

Avoid prompt padding:

- `luxury`, `elegant`, `cinematic`, `premium`, `Gen Z`, `mystique`, `modern brand`

Those words may appear as mood support, but they cannot be the operative direction.

## Treatment Handoff

The director's treatment must begin with the selected creative spine and rejected-premise notes. If the treatment jumps straight to a generic shot ladder, it fails this gate.

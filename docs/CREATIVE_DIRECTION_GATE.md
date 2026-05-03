# Creative Direction Gate

Use this before the director's treatment. This gate exists because a workflow can be technically correct, diverse, and still boring.

Run the ideation swarm from `docs/ADVERSARIAL_SWARM_PROTOCOL.md` before this gate. Use the swarm to produce divergent ideas, not to validate a default. If subagents cannot be spawned, return `blocked: subagents unavailable` before canvas work or paid generation.

## Core Rule

Do not start the shot list from generic taste words like `luxury`, `cinematic`, `modern`, `mystique`, `Gen Z`, `premium`, or `editorial`. Translate them into a specific campaign idea with tension, behavior, and a visual reason to keep watching.

## Required Creative Pass

Before choosing the treatment, generate at least six distinct campaign premises from this forced-collision matrix. If an ideation swarm ran, synthesize from its premise set instead of inventing alone. Do not fill the matrix with six versions of the same moody product film.

1. `Default Restraint`: the most controlled, product-legible version of the brief.
2. `Wrong Genre`: solve the brief in a genre it did not ask for, such as documentary, procedural, cooking show, horror grammar, workplace training film, local news, nature film, or deadpan comedy.
3. `Sound First`: start with a rhythm, instrumentation idea, voice, silence pattern, or percussion object; the shot ladder follows the beat map.
4. `Boring On Purpose`: hold a locked frame, deadpan tableau, ordinary location, repeated task, or anti-spectacle long enough that the refusal becomes the idea.
5. `Ugly Beautiful`: include one awkward, cheap, harsh, overlit, green-shifted, cropped, or unfashionable choice and make it intentional.
6. `Audience Ritual`: build from a real behavior, fear, habit, status signal, or use moment specific to the target audience, not from a generic demographic label.

If the brief strongly implies another productive collision, add it as a seventh premise, such as `Single Take`, `Procedural Proof`, `Comic Misread`, `Public Interruption`, or `Withheld Product`.

The critic must veto the premise set if four or more premises share the same world category, lighting logic, camera motion, or final-memory shape.

For each premise, write:

- one-sentence creative spine
- hook image
- main event
- visual contradiction or tension
- production design signature
- camera grammar
- direction DNA from `docs/REFERENCE_ANALYSIS_METHOD.md`
- controlled flaw
- three aesthetic refusals
- final memory image
- why the target audience would stop rather than scroll
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
- Which three familiar moves does this campaign refuse?
- Is the selected flaw visible as direction, not as model failure?
- If this is sound-first, which cuts, holds, or reveals are dictated by the beat map?

If the answers are vague, rewrite the premise.

Then apply `docs/PRE_SPEND_CONFIDENCE_GATE.md`. Do not launch paid generation just because a premise sounds plausible; pass the internal spend-readiness scorecard, then continue execution without a user approval pause unless a real blocker applies.

## Risk Budget

Every campaign needs at least one creative risk, but not ten. Choose one or two controlled risks:

- bold blocking or silhouette
- striking location event
- unusual camera reveal
- material/weather event
- unexpected gesture or ritual
- editorial contrast cut
- final hold with real posture/lighting change
- deliberate stillness or withheld payoff
- harsh or unfashionable light
- single-take choreography
- sound-led edit structure
- wrong-genre world logic

Simplify everything else around those risks so the model can execute.

## Controlled Flaw

Each selected treatment must choose one or two deliberate imperfections and propagate them into still prompts, motion prompts, and QC notes:

- crop violation
- subject not ready
- off-beat gesture
- harsh practical light
- cheap-looking location detail
- foreground obstruction
- partial product reveal
- held frame that lasts too long
- model unaware of camera
- wrong moment by half a beat

Do not confuse a controlled flaw with an artifact. A cut-off eye can be direction. Distorted anatomy, broken hands, unreadable product truth, or fake text are failures.

## Aesthetic Refusals

Every treatment must name at least three things it will not do. These are taste constraints, separate from technical avoid lists:

- no centered hero product
- no slow push
- no skyline
- no smiling at camera
- no night rooftop
- no perfect symmetry
- no establishing shot
- no glossy black surface
- no model under 35
- no shot longer than 2.5s
- no packshot until the final beat

Use refusals to create a point of view. Do not write refusals that merely repeat artifact controls like `no extra fingers`.

## Anti-Generic Prompt Rule

Prompts must contain concrete directorial nouns and verbs:

- `elevator doors part`, `coat cuts across amber light`, `camera tracks behind wet glass`, `rain bead crawls along collar seam`, `chrome reflection wipes frame`

Avoid prompt padding:

- `luxury`, `elegant`, `cinematic`, `premium`, `Gen Z`, `mystique`, `modern brand`

Those words may appear as mood support, but they cannot be the operative direction.

Also avoid inherited campaign cliches unless the selected premise explicitly earns them: chrome wipe, night rooftop, wind on fabric, perfume on wet stone, model turns in silhouette, centered packshot slow push, fake rebellion pose, hand trailing across glass.

## Treatment Handoff

The director's treatment must begin with the selected creative spine, rejected-premise notes, direction DNA, controlled flaw, and aesthetic refusals. If the treatment jumps straight to a generic shot ladder, it fails this gate.

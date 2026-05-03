# Internal Spend Readiness Gate

Use this before paid still generation and before paid motion generation. It keeps agents from discovering the campaign by spending credits.

This is an internal readiness gate, not a user-approval gate. A campaign-video request implies permission to spend the normal credits required by the staged workflow. Do not stop to ask the user to approve credit spend unless the user explicitly requested that, the visible credit estimate is abnormal or higher than the planned batch, subscription/credits are unavailable, selected nodes are ambiguous, or another blocker in `docs/AUTOMATION_CONTRACT.md` applies.

## Required Scorecard

Score each item 1-5 before launching paid generation:

| Criterion | Question |
| --- | --- |
| hook | Is the first 1-2 seconds a concrete visual event? |
| specificity | Are nouns, verbs, materials, locations, and camera moves concrete? |
| visual event | Does something memorable physically happen? |
| reference parity | Would this plan plausibly sit near the reference ambition and selected creative spine? |
| final memory | Is the final image specific and earned? |
| AI executability | Are high-risk actions simplified enough to generate? |
| non-repetition | Are adjacent shots meaningfully different in blocking, pose, camera, and job? |
| fashion/product authority | Does styling/product truth lead the frame instead of generic mood? |

Do not launch if any score is below `4` or if the average is below `4.2`. Revise the plan internally, then continue execution when it passes.

## Run Budget

Before launching nodes, write a run budget:

| Category | Planned Runs | Reason |
| --- | ---: | --- |
| identity/product locks |  |  |
| lookdev stills |  |  |
| production stills |  |  |
| director boards |  |  |
| motion nodes |  |  |
| expected retries |  |  |
| music |  |  |

No node launch is allowed unless it maps to the budget. If the operator wants to exceed the normal planned budget, document why before launching. Ask the user only when the overage is material, abnormal, or outside the treatment's documented exploration budget.

## First-Dollar Hook

The first paid generation must support the first 1-2 second hook or the locked identity/product needed for that hook. Do not begin with generic mood plates when the hook is unresolved.

## Reference-Parity Prediction

Before generation, compare the plan to 2-4 references or the selected creative spine and production profile obligations:

- opening behavior
- blocking/performance
- camera grammar
- production design density
- reveal or status-change logic
- final memory image

If the plan cannot name comparable behaviors, revise before spending.

## Low-Confidence Escalation

If any key shot is high-risk for anatomy, product geometry, hands, glass/reflections, gait, or text, simplify it before generation or mark the spend as an explicit risk.

# Revision Diagnoser

Separate problems into:

- strategy issue
- reference-parity failure
- workflow connection issue
- music spine issue
- script issue
- shot design issue
- prompt issue
- generation artifact
- editing issue
- caption/layout issue
- delivery/export issue

Return feedback summary, root cause, revision type, specific changes, updated prompt snippets, risks, and acceptance criteria.

If the failure is reference parity, do not suggest polish-only fixes. Rewrite the shot ladder and generation plan so the next pass adds missing campaign behavior: world, subject/casting, wardrobe/posture, location specificity, physical action, camera discovery, editorial escalation, or earned product reveal.

If the failure is creative blandness, apply `docs/CREATIVE_DIRECTION_GATE.md` again instead of only tweaking prompts. Return three new premises, choose one stronger creative spine, name the controlled risk, and rewrite the first 10 seconds and final memory image before touching workflow nodes.

If the failure is same-shot/same-pose repetition, apply `docs/DIRECTORS_EYE_GATE.md`. Do not only add more shot types. Rewrite the anchor plan with new blocking, subject height, shoulder angle, performance beat, foreground layer, camera angle, and cut reason for each adjacent shot.

## Regeneration Discipline

Do not regenerate everything by default. Decide whether to:

- reassign input asset roles
- reconnect workflow nodes
- revise stillframe prompt
- simplify Seedance motion
- regenerate b-roll only
- replace music prompt
- fix edit timing
- rebuild product closeout
- reject a clip and preserve stronger older footage

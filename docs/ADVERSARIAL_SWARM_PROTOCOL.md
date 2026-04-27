# Adversarial Swarm Protocol

Use this for campaign work when subagents or parallel critics are available. CampaignCraft should not rely on the same agent that wrote the plan to be the only judge of whether the plan is worth spending credits on.

## Operating Model

One main operator owns the workflow canvas, local files, manifests, and final status. Critics are short-lived adversarial reviewers. They do not mutate the canvas unless explicitly assigned a worker role.

Critics return blocking reports. The main operator must apply or resolve those reports before moving to the next spend or delivery stage.

If subagents are not available, run the same critic checklists locally and write the same reports with `critic_mode: single-agent fallback`.

## Required Critic Passes

### 1. Treatment Critic

Runs after `docs/CREATIVE_DIRECTION_GATE.md` and `docs/DIRECTORS_TREATMENT_GATE.md`, before canvas work.

Checks:

- selected creative spine is specific, not mood language
- rejected premises are documented
- first 1-2 second hook is a concrete event
- directional diversity and director's-eye requirements are represented
- fashion/product authority is present where relevant
- final memory image is not just another pretty frame
- music spine and Seedance grouping are coherent

Blocks generic treatment, no visible status change, no controlled creative risk, and no plausible campaign behavior.

### 2. Pre-Spend Critic

Runs before paid still generation and again before paid motion generation.

Checks `docs/PRE_SPEND_CONFIDENCE_GATE.md`, run budget, reference-parity prediction, no-generic-language rule, interchangeable shot answers, and risk simplifications.

Blocks any low confidence score, missing run budget, or exploratory fishing with paid generations.

### 3. Director's-Eye / Anchor Critic

Runs after still anchors are generated and before motion launch.

Checks `docs/DIRECTORS_EYE_GATE.md`, blocking matrix, six-up squint test, anchor support for the creative spine, and final memory image.

Blocks same-pose/same-shot lookbook coverage and any attempt to ask Seedance to invent the directing missing from anchors.

### 4. Motion Launch Critic

Runs after anchors, storyboard/reference panels, and director boards exist.

Checks visible source/reference map, approved references, local prompt timing, Seedance realism, risk simplification, and music direction.

Blocks text-only motion, disconnected references, unapproved anchors, and complex motion without a director's-notes board.

### 5. Clip Critic

Runs after each generated video node is exported/downloaded and verified with `ffprobe`.

Checks local file existence, duration, ratio, codec, editorial job, continuity, and artifacts.

Blocks unexported clips, wrong model/ratio/duration, and unusable motion.

### 6. Delivery Critic

Runs before final handoff.

Checks `scripts/audit_campaign_delivery.py`, planned audio, motion coverage, shot-source manifest, reference parity, and final status language.

Blocks silent output when music was planned, hidden still/proxy coverage, missing generated clips, and reference-parity failure.

## Report Format

Each critic report must use this header:

```md
status: pass | revise | block
gate: treatment | pre_spend | directors_eye | motion_launch | clip | delivery
critic_role:
critic_mode: subagent | single-agent fallback
blocking_items:
required_operator_actions:
shot_or_node_notes:
status_label_allowed:
```

Reports should be short, concrete, and actionable. A critic that writes only taste prose has failed its job.

## Storage

Save critic reports under `qa/critics/`.

Suggested filenames:

- `treatment-critic.md`
- `pre-spend-critic.md`
- `directors-eye-critic.md`
- `motion-launch-critic.md`
- `clip-critic-<node>.md`
- `delivery-critic.md`

The final delivery package must mention the critic reports and whether any blockers were resolved.


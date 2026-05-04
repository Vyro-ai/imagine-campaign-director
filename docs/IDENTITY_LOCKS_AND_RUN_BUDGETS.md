# Identity Locks And Run Budgets

Use this for any campaign with a recurring person, product, garment, vehicle, location, mascot, or other continuity-sensitive subject.

## Identity Lock Rule

Do not generate every shot as an independent original still. That creates drift and wastes credits.

Required sequence:

1. Determine how many recurring identities are needed.
2. Generate or import one approved lock reference for each identity.
3. Mark each lock source in the canonical spec with `metadata.identityRole: "identity-lock"`.
4. Every dependent still uses `GPT Image 2`, connects the lock source to `imageUrl`, names the role with `@Image1`, and follows `docs/CINEMATIC_STILL_PROMPTING_PLAYBOOK.md`.
5. Every Seedance reference-set node connects the lock source to `referenceUrl` and names the role with `@Image1`.
6. Environment, garment, product-truth, and director's-notes boards get their own reference roles. Do not ask one image to control everything.

For one recurring model, use this pattern:

```json
{
  "identityLocks": [{ "id": "lead_model_lock", "source": "lead_model_lock" }],
  "nodes": [
    {
      "id": "lead_model_lock",
      "type": "image",
      "name": "LOCK / Lead Model Identity",
      "modelKey": "imagineart_2",
      "metadata": {
        "identityRole": "identity-lock",
        "productionRole": "identity-candidate",
        "runBudgetReason": "Generate only the approved lead-model lock before dependent shots."
      },
      "settings": {
        "aspectRatio": "9:16",
        "prompt": "Approved lead model identity reference..."
      }
    },
    {
      "id": "shot_02_anchor",
      "type": "image",
      "name": "SHOT 02 / Walkway Anchor",
      "modelKey": "gpt_image_2",
      "settings": {
        "aspectRatio": "9:16",
        "resolution": "2K",
        "quality": "high",
        "prompt": "SHOT: Medium-wide fashion film still, lateral walkway reveal.\\nSUBJECT: @Image1 controls identity, face, hair, wardrobe, and posture. The lead model takes one controlled step in the locked garment.\\nENVIRONMENT: Rain-wet glass and chrome walkway at night, practical lights reflected on concrete.\\nLIGHTING: Warm rim from camera-right practicals, cool ambient fill, motivated reflections on wet floor.\\nCAMERA: ARRI Alexa 35 look, 35mm anamorphic lens, f/2.8, camera at waist height.\\nCOLOR GRADE: Cool cyan shadows, warm amber highlights, low saturation, realistic highlight roll-off.\\nCOMPOSITION: Leading lines down the corridor, subject on left third, negative space ahead.\\nAVOID: plastic skin, smoothed faces, oversharpening, HDR look, extra fingers, distorted hands, garbled text, cartoon style, illustration, logos, readable signage."
      }
    }
  ],
  "edges": [
    {
      "source": "lead_model_lock",
      "sourceKey": "image",
      "target": "shot_02_anchor",
      "targetKey": "imageUrl",
      "targetSlot": 0
    }
  ]
}
```

If there are two recurring people, create two lock nodes and wire both to every dependent node that contains both people. The prompt must assign each role explicitly, such as `@Image1 controls the lead model` and `@Image2 controls the supporting model`.

## Exploration vs Production

Only lock-selection nodes should explore variants. Once a lock is selected, dependent shot anchors should run once.

Allowed multi-run cases:

- identity candidate selection
- look-development exploration before anything is locked
- explicit user-approved variation pass

Production stills, director's-notes boards, and Seedance nodes default to one run. If the UI's `Number of runs` is greater than `1`, set it back to `1` before launching unless the treatment has a written run-budget reason.

Default execution pattern:

- Generate/import required locks first.
- Then batch-launch dependent production still anchors and director boards where their references are already available.
- Keep `Number of runs` at `1` per node.
- Do not interpret the one-run rule as requiring single-node execution.

`Number of runs: 1` means one output per selected node, not one selected node per launch.

## Reject Conditions

Reject or rebuild the workflow when:

- multiple model/character stills are disconnected from the identity lock
- dependent stills use `ImagineArt 2.0` instead of `GPT Image 2` with a connected lock reference
- prompts say `same model`, `same person`, or `consistent model` instead of explicit `@Image` roles
- a production node has multiple generated results without being marked as an exploration node
- the canvas shows independent shot anchors before a lock source has been generated and selected

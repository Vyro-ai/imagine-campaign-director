# Imagine.Art Live Model Strings

Verified with Computer Use in the live Imagine.Art workflow UI on 2026-04-27. The visible picker label is useful for human inspection, but copied node JSON currently stores `settings.modelId`; paste payloads should use the verified IDs or a CampaignCraft `modelKey` that materializes to those IDs.

## Required Campaign Defaults

| Role | Exact visible picker label | Copied JSON value | Required defaults |
| --- | --- | --- | --- |
| Original stills without references | `ImagineArt 2.0` | `settings.modelId: 41601` | Use requested aspect ratio. |
| Reference-driven stills, continuity stills, director's-notes boards | `GPT Image 2` | `settings.modelId: 41701` | `resolution: "2K"`, `quality: "high"`. |
| Campaign motion | `Seedance 2.0` | `settings.modelId: 21905` | Use requested aspect ratio and the longest useful duration available for the shot plan. |

Use these canonical keys in CampaignCraft workflow specs:

```json
{ "modelKey": "imagineart_2" }
{ "modelKey": "gpt_image_2" }
{ "modelKey": "seedance_2" }
```

## Observed Wrong Defaults

These are valid Imagine.Art models, but they are not CampaignCraft defaults for the roles above:

| Exact visible picker label | Copied JSON value | Why it matters |
| --- | --- | --- |
| `Nano Banana 2` | `settings.modelId: 40603` | This was incorrectly assumed to mean ImagineArt 2.0 in older payloads. It is not the default for reference-driven continuity work. |
| `Kling 3.0` | `settings.modelId: 11020` | Older video payloads pasted as Kling 3.0. Campaign motion must not launch as Kling unless explicitly requested. |

## Additional Picker Labels Seen

Image model labels visible in the live picker included:

- `GPT Image 2`
- `Nano Banana 2`
- `ImagineArt 2.0`
- `Nano Banana Pro`
- `Seedream v5 lite`
- `Midjourney`
- `GPT Image 1.5`
- `Seedream v4.5`
- `Nano Banana`
- `ChatGPT Image`

Video model labels visible in the live picker included:

- `Seedance 2.0`
- `Seedance 2.0 Fast`
- `Kling O3`
- `Kling 3.0`
- `Kling O3 Edit V2V`
- `Kling O3 Reference V2V`
- `Pixverse v6`
- `Veo 3.1 Lite`
- `Runway 4.5 Gen`
- `Google Veo 3.1`
- `Seedance 1.5 Pro`

## Verification Rule

After selecting a model in the picker, copy the node or selected graph and inspect the JSON before launch. The visible label and copied `settings.modelId` must both match the intended role. If they disagree, the live UI is the authority and the workflow is blocked until corrected.

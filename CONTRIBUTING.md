# Contributing

CampaignCraft is opinionated. Contributions should help agents make better aesthetic decisions, not just produce longer prompts.

## Add Campaign Archetypes

Add archetypes when they describe a repeatable campaign structure with a clear purpose, shot logic, and failure modes. Update both `docs/CAMPAIGN_ARCHETYPES.md` and `config/campaign_archetypes.json`.

## Add Shot Types

Shot types should describe purpose, camera grammar, motion, best uses, and AI failure risks. Update `docs/SHOT_GRAMMAR.md` and `config/shot_types.json`.

## Add Examples

Examples must use fictional brands/products only. Include brief, shot list, prompt pack, negative prompts, editing notes, QC score, and revision notes.

## Update Rubrics

Rubrics should be observable. Avoid vague criteria like “looks premium” unless the scoring explains what makes it premium: hierarchy, restraint, material detail, lighting, blocking, continuity, and final memory image.

## Brand Systems

Do not commit private or client brand guidelines without permission. Use `docs/BRAND_SYSTEM_PLACEHOLDER.md` to create a public-safe placeholder or a user-owned brand system.

## JSON Validation

All files in `config/` must be valid JSON. Run:

```bash
python3 scripts/validate_config.py
```

## Tone

Be direct, practical, and specific. Avoid hype, fake marketing language, and overclaims.

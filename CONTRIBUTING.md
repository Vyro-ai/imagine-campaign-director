# Contributing

imagine-campaign-director is opinionated. Contributions should help agents make better aesthetic decisions, not just produce longer prompts.

## Add Production Profiles

Add production profiles only when they describe production obligations: protected asset truth, continuity locks, artifact risks, forbidden category cliches, and compatible edit forms. Do not add repeatable campaign structures here. Update both `docs/PRODUCTION_PROFILES.md` and `config/production_profiles.json`.

## Add Shot Types

Shot types should describe purpose, camera grammar, motion, best uses, and AI failure risks. Update `docs/SHOT_GRAMMAR.md` and `config/shot_types.json`.

## Add Examples

Examples must use fictional brands/products only. Include brief, production profile, treatment, shot list, prompt pack, aesthetic refusals, artifact avoids, editing notes, QC score, and revision notes.

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

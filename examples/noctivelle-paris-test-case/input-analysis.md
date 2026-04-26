# Input Analysis

## Asset Roles

| Source Asset | Role | Use In Workflow | Do Not Use For |
|---|---|---|---|
| `noctivelle-brand-board-generated.png` | Brand world overview | Palette, typography taste, product atmosphere, campaign restraint | Literal final layout or generated text |
| `logo-mark-generated.png` | Logo/type reference | Deterministic end-card type placement and gold-on-black behavior | Seedance-generated logo animation |
| `product-hero-generated.png` | Product truth plus closeout mood | Bottle silhouette, black glass, faceted cap, gold label frame, orchid/stone environment | Exact generated label replication in video |
| `campaign-brief-generated.png` | Brief visual support | Public-safe campaign intent reference | Production source of truth over markdown brief |
| `mood-stills-generated.png` | Mood/casting/environment reference | Balcony, wet city, skin highlight, orchid macro, bottle near skin | Product continuity reference by itself |
| `brand-guide.md` | Brand constraints | Voice, palette, motion identity, avoid list | None |
| `noir-orchid-product-sheet.md` | Product constraints | Continuity, risk notes, product ritual blocking | None |
| `campaign-brief.md` | Campaign structure | 10-second pacing, required visual elements | None |

## Observations From Visual Assets

- The product world is black glass, rain droplets, dark orchids, cool stone, and gold label/cap highlights.
- The supplied model/mood frames favor wet hair, black dress, warm skin, city lamps, and reflective pavement.
- The product hero frame includes useful negative space and a strong final memory image, but baked-in text should not be trusted as final production typography.
- The logo crop supports a small, centered, quiet mark. It should not be animated, enlarged, or composited over faces.

## Promptable Taste Rules

- Use one dominant visual event per shot.
- Keep the camera restrained: slow push, locked frame, small lateral drift, subtle rack focus.
- Make practical light behavior concrete: gold reflection, lamp bloom, rim light, wet glass highlight.
- Keep hands simple: fingers together, one grip, no complex spraying or cap manipulation.
- Keep product label readable only in still/product plate moments; rely on deterministic type for final product name and CTA.
- Avoid generic words unless paired with specific surfaces, blocking, and camera grammar.

## Assumptions

- The finished vertical ad has no spoken narration.
- End-card text is deterministic: `NOCTIVELLE PARIS`, `NOIR ORCHID`, `Discover the scent`.
- The final workflow contains only used source, approved panels, selected motion clips, selected music, edit notes, QC notes, and export notes.
- The public package does not copy extracted assets into the repo; agents should upload the user-supplied zip assets into Imagine.Art from the local test bundle when executing.

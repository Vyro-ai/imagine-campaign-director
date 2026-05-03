# Imagine.Art Workflow Node Map

Final workflow rule: the delivered workflow should contain only used nodes. Exploration variants, failed runs, unused panels, and rejected motion should be removed from the final graph or documented outside the graph.

## Section Map

1. `SOURCE / Inputs`
2. `ANALYSIS / Brief + Asset Roles`
3. `STRATEGY / Fragrance Profile + Creative Spine`
4. `STILLS / GPT Image 2 Storyboard Panels`
5. `STORYBOARD / Approved Motion References`
6. `MOTION / Seedance Shot Ladder`
7. `MUSIC / Music Studio Direction`
8. `EDIT / Assembly + Timing`
9. `TYPE / End Card`
10. `QC / Review Notes`
11. `EXPORT / Finals`

## Node Plan

| Node ID | Section | Node | Inputs | Output / Purpose | Keep In Final? |
|---|---|---|---|---|---|
| SRC-01 | SOURCE | Upload brand board | Zip asset | Palette, brand world, typography taste | Yes |
| SRC-02 | SOURCE | Upload logo mark | Zip asset | Deterministic type/logo reference | Yes |
| SRC-03 | SOURCE | Upload product hero | Zip asset | Product truth, bottle geometry, closeout mood | Yes |
| SRC-04 | SOURCE | Upload mood stills | Zip asset | Casting, city, skin, orchid references | Yes |
| TXT-01 | ANALYSIS | Asset role summary | Brand/product/campaign text + assets | Role assignments and risks | Yes |
| TXT-02 | STRATEGY | Production profile + creative spine | TXT-01 | Fragrance profile obligations, selected creative spine, refusals, and artifact avoids | Yes |
| IMG-01 | STILLS | GPT Image 2 Panel 01 | TXT-02 + mood refs | Orchid hook still | Approved only |
| IMG-02 | STILLS | GPT Image 2 Panel 02 | TXT-02 + mood refs | Subject intro still | Approved only |
| IMG-03 | STILLS | GPT Image 2 Panel 03 | TXT-02 + product truth | Skin/silk/bottle edge still | Approved only |
| IMG-04 | STILLS | GPT Image 2 Panel 04 | TXT-02 + mood refs | Rain city passage still | Approved only |
| IMG-05 | STILLS | GPT Image 2 Panel 05 | TXT-02 + product truth | Product ritual still | Approved only |
| IMG-06 | STILLS | GPT Image 2 Panel 06 | TXT-02 + product truth | Final product plate | Approved only |
| SB-01 | STORYBOARD | Approved panel board | IMG-01 through IMG-06 | Six references wired to motion | Yes |
| VID-01 | MOTION | Seedance Shot 01 | IMG-01 | Gold reflection hook | Selected clip only |
| VID-02 | MOTION | Seedance Shot 02 | IMG-02 | Subject intro | Selected clip only |
| VID-03 | MOTION | Seedance Shot 03 | IMG-03 + SRC-03 | Skin/silk/bottle detail | Selected clip only |
| VID-04 | MOTION | Seedance Shot 04 | IMG-04 | Rain city passage | Selected clip only |
| VID-05 | MOTION | Seedance Shot 05 | IMG-05 + SRC-03 | Product ritual reveal | Selected clip only |
| VID-06 | MOTION | Seedance Shot 06 | IMG-06 | Final product hold | Selected clip only |
| MUS-01 | MUSIC | Music Studio prompt | TXT-02 | 10s instrumental bed | Selected track only |
| EDT-01 | EDIT | Assembly timing note | VID-01 through VID-06 + MUS-01 | Cut list and transition plan | Yes |
| TYP-01 | TYPE | Deterministic end card | SRC-02 + IMG-06 | Brand, product, CTA typography | Yes |
| QC-01 | QC | QC checklist and reject log | All selected outputs | Pass/fail review | Yes |
| EXP-01 | EXPORT | Vertical final | EDT-01 + TYP-01 | 9:16, 10s master | Yes |
| EXP-02 | EXPORT | Horizontal cutdown | EDT-01 + TYP-01 | 16:9 adaptation if approved | Yes, if used |

## Launch Order

1. Upload source assets from the zip.
2. Create analysis and strategy text nodes.
3. Generate GPT Image 2 storyboard panel variants.
4. Review stillframes, reject weak variants, keep one approved panel per shot.
5. Wire only approved panels into Seedance nodes.
6. Generate Seedance clips shot by shot.
7. Generate Music Studio track.
8. Assemble selected motion clips and music in the edit.
9. Add deterministic typography and CTA.
10. Run QC.
11. Remove unused nodes from the final workflow graph.
12. Export vertical master and optional 16:9 cutdown.

## Deterministic Type Plan

Final frame type should be added after generation:

- Top or upper-center: `NOCTIVELLE PARIS`
- Main product line: `NOIR ORCHID`
- Supporting line: `Eau de Parfum`
- CTA: `Discover the scent`

Use an elegant serif for the product line and a clean sans-serif for support text. Keep the logo small and quiet. Do not depend on Seedance or GPT Image 2 for final readable text.

# Cinematic Still Prompting Playbook

Use this for every still image generated inside CampaignCraft: ImagineArt 2.0, GPT Image 2, Nano Banana 2, Nano Banana Pro, product plates, storyboard boards, styleframes, first/last frames, environment plates, material macros, and director's-notes images.

The model choice changes by asset role, but the descriptive grammar does not. A still prompt should read like a compact cinematography brief, not a mood paragraph.

## Required Prompt Architecture

Use labeled lines in this order:

```text
SHOT: [shot type + framing]
SUBJECT: [subject/product + action + wardrobe/styling + expression/posture]
ENVIRONMENT: [location + time/weather + set dressing + atmosphere]
LIGHTING: [source + direction + fill/rim/practicals + motivation]
CAMERA: [camera body/look + lens focal length + aperture + height/angle]
FILM STOCK / FORMAT: [stock or sensor look + grain level]
COLOR GRADE: [specific palette + contrast + shadow/highlight tint]
MOOD: [emotional cue + genre/category cue]
COMPOSITION: [rule of thirds / symmetry / leading lines / negative space / foreground-midground-background]
ASPECT RATIO: [delivery ratio or crop intent]
TEXTURE: [grain, halation, lens flare, analog softness, natural pores, realistic specular highlights]
AVOID: [universal avoid list + shot-specific artifact risks]
```

The minimum required blocks are `SHOT`, `SUBJECT`, `ENVIRONMENT`, `LIGHTING`, `CAMERA`, `COLOR GRADE`, `COMPOSITION`, and `AVOID`. Add `FILM STOCK / FORMAT`, `MOOD`, `ASPECT RATIO`, and `TEXTURE` for hero frames, recurring anchors, and anything feeding video.

Do not start prompts with `please`, `create an image of`, or abstract taste language. Describe the still as if it already exists.

## Defaults

Use one concrete choice per category. Do not stack conflicting palettes or camera looks.

- Lens: `35mm` for natural context, `50mm` for neutral perspective, `85mm` for portrait isolation, `24mm` for environmental scale, `anamorphic` for widescreen flares and oval bokeh.
- Camera body: `ARRI Alexa 35`, `ARRI Alexa Mini LF`, `Sony Venice 2`, `RED Raptor V`, `IMAX 65mm`, `ARRIFLEX 16SR`.
- Film stock: `Kodak Portra 400` for warm prestige, `Kodak Portra 800` for low-light fashion, `Kodak Vision3 500T` for Hollywood night, `CineStill 800T` for neon halation, `Ilford HP5` or `Tri-X` for black-and-white grit.
- Lighting: name source and direction, such as `single soft key from camera-left`, `hard rim light from a doorway`, `motivated practical lamp`, `neon magenta key`, `moonlit backlight`, `volumetric haze`.
- Grade: choose one palette, such as `teal and orange`, `desaturated muted with cyan shadows`, `warm golden lifted blacks`, `cyan and magenta neon`, `bleach bypass`, `pastel faded blacks`, `monochrome silver`.
- Texture: `subtle film grain`, `fine 35mm grain`, `halation around highlights`, `analog softness`, `natural skin texture`, `visible pores`, `slight asymmetry`, `realistic specular highlights`.

Universal avoid list:

`Avoid: plastic skin, smoothed faces, oversharpening, HDR look, extra fingers, distorted hands, garbled text, cartoon style, illustration.`

Add shot-specific avoids after that list: logos, readable signage, broken walking, warped reflections, product drift, fake typography, repeated pose, or unsafe hand interaction.

## Consistency Strategy

For recurring characters, products, garments, vehicles, or locations:

1. Write one locked identity/product/location string and reuse it verbatim.
2. Use the connected reference image on every dependent still.
3. Use explicit reference roles: `@Image1 controls identity and wardrobe`, `@Image2 controls product truth`, `@Image3 controls lighting/style`.
4. Keep a locked aesthetic block: camera family, lens family, stock, grade, aspect ratio, texture.
5. Mutate only shot-specific deltas: shot size, action, camera angle, lighting motivation, and composition.

Never switch wording between frames, such as `young woman` in one prompt and `girl` in another. Wording drift causes visual drift.

## JSON Planning Object

When a workflow builder needs to mutate stills programmatically, hold this object first, then flatten it into labeled lines:

```json
{
  "shot": "medium close-up",
  "subject": "[locked subject string] turning to look back over shoulder",
  "environment": "[locked location string], rain on glass, practical lights in depth",
  "lighting": "soft key from camera-left, warm rim from background practical",
  "camera": {
    "body": "ARRI Alexa 35",
    "lens": "50mm anamorphic",
    "aperture": "f/2.0",
    "angle": "slight low angle"
  },
  "film_stock": "Kodak Vision3 500T",
  "color_grade": "cool cyan shadows, warm amber highlights, low saturation",
  "mood": "mysterious, controlled, premium editorial",
  "composition": "subject camera-left, negative space camera-right, foreground-midground-background layering",
  "aspect_ratio": "9:16 delivery, cinematic crop discipline",
  "texture": "fine 35mm grain, halation around highlights, natural skin texture",
  "avoid": ["plastic skin", "oversharpening", "HDR look", "extra fingers", "garbled text"]
}
```

## Quality Rules

- Use visual nouns and production facts, not abstract emotion alone.
- Front-load shot type and subject.
- Prefer 8-12 precise directives over long adjective stacks.
- Use `film still`, `frame grab`, or `stills archive` when the asset should feel cinematic.
- Do not request text in generated stills unless the still is explicitly a storyboard/director's-notes board. For background signage, ask for `illegible glyph signage`.
- For product ads, keep final campaign typography out of generated stills. Add brand/product copy in deterministic edit/type layers.
- For images feeding Seedance, prioritize readable blocking, stable subject/product shape, motivated light, and clean composition over poster-like detail.

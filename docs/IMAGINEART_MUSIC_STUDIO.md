# Imagine.Art Music Studio

CampaignCraft requires a music plan for every campaign.

## Public Product Notes

Imagine.Art Music Studio supports text-to-song/music direction, lyrics, genre/style/instrument/mood customization, generation, and download. Public Imagine.Art materials describe royalty-free creation and list common genres such as jazz, pop, and country. The public page also states that Music Studio currently does not generate music directly from an image, so visual inputs should be translated into a text music brief.

## Agent Rule

Always generate a Music Studio prompt from the campaign direction.

If the user supplies a style image, product photo, or mood board, translate the visual qualities into music language:

- color -> tone
- lighting -> brightness/darkness
- camera movement -> rhythm
- material -> instrumentation
- pacing -> tempo
- campaign grammar -> arrangement style

When using a public-page or landing-page handoff into the app, verify the in-app prompt before generation. Remove any appended default wording that changes the brief, confirm instrumental/vocal state, confirm genre and mood fields where available, and confirm duration. Handoff flows can reset a short campaign request to a longer default duration.

If Music Studio produces a longer usable track than the edit target, keep it only when it can be trimmed intentionally. Copy the downloaded source into the active workspace, trim the final bed in the editor or HyperFrames, and document the source duration, final duration, and trim point in QA.

## Music Prompt Fields

- campaign title
- use: background score, full song, vocal hook, instrumental bed, trailer cue
- genre
- mood
- tempo or pace
- instruments
- vocal/no vocal
- lyrics or lyric direction
- duration target
- edit hit points
- avoid list

## Default For Campaign Ads

Use an instrumental bed unless the brief needs a vocal hook. Vocals can fight captions, product names, and spoken narration.

## Avoid

- famous artist imitation
- copyrighted melody references
- cluttered vocals under captions
- overbusy percussion for luxury work
- mismatched upbeat music for restrained visuals

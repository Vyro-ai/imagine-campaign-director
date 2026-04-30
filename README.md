# imagine-campaign-director

This turns a product photo, brand kit, reference, or rough idea into a campaign video built inside Imagine.Art, with an AI agent doing the planning, workflow setup, generation, review, and packaging.

Use it when you want a real Imagine.Art campaign workflow and review video, not just a pile of prompts.

Codex is the AI coding agent that reads this repo and runs the job. Computer Use is the tool that lets Codex click, type, paste, and download inside Google Chrome. We recommend Codex because Imagine.Art workflow canvases need reliable browser, canvas, clipboard, download, and file-verification control; Claude and other agents' computer-use tools can struggle with those workflow interactions.


![How imagine-campaign-director works](docs/community-how-to/assets/01-simple-flow.png)

## What You Need

Do this before you ask for a campaign video.

1. **Use Codex**
   Codex works best because it can read this repo, follow `AGENTS.md`, use tools, spawn required subagents, and operate a browser when Computer Use is available. Subagents are helper agents Codex uses to brainstorm, critique, and catch weak campaign ideas before credits are spent.

2. **Enable Computer Use or browser control**
   Use a Codex workspace or thread where Computer Use, Browser Use, browser automation, or desktop control is available. Follow OpenAI's Codex app guide to enable: [Enable Computer Use](https://developers.openai.com/codex/app/computer-use).

3. **Use Google Chrome**
   Keep Chrome open. Codex needs to operate the same browser session where Imagine.Art is open.

4. **Log in to Imagine.Art**
   Log in to Imagine.Art in that same Chrome session before starting. If Codex sees a login screen, it must stop and report **`blocked: Imagine.Art login required`**.

5. **Allow the Chrome clipboard prompt**
   Chrome may show a prompt that says `www.imagine.art wants to see text and images copied to the clipboard`. This is normal. Codex needs clipboard access to paste workflow data into Imagine.Art. Click **Allow**.

6. **Have Codex install or enable HyperFrames**
   HyperFrames is recommended for final assembly after Imagine.Art motion exists. It helps Codex do precise timing, captions, typography, transitions, logo lockups, and MP4 export. It should not replace missing Imagine.Art motion.

> Important:
> - If Codex cannot control Chrome, it cannot finish the campaign.
> - If Imagine.Art is not logged in, Codex should stop and tell you to log in.
> - If required subagent swarms are unavailable, Codex should stop instead of pretending the campaign is complete.

## How To Start

Copy this prompt into Codex and replace `<your idea here>` with what you want to make. Attach any product photos, brand kits, mood boards, or references you have. The detailed execution rules are already inside this repo, so the prompt can stay short.

```text
Use @Computer Use / sub-agent swarms and this repo:
https://github.com/Vyro-ai/imagine-campaign-director

to create <your idea here>
```

## Watch The 40-Second Walkthrough

See how to start a new Codex session, use Computer Use and sub-agent swarms, build the Imagine.Art workflow, and receive the finished campaign video.

https://github.com/user-attachments/assets/b2d6d263-9c35-4d58-8635-cf28c37b0f64



## Example Prompts

### Product Launch

```text
Use imagine-campaign-director to create a 15-second vertical launch ad for this canned drink.
Use the product photo and brand kit as the visual source.
The vibe is moody late-night convenience-store cinema for creators and gamers.
Avoid sports drink cliches, smiling-at-camera acting, and fake labels.
```

### Fashion Campaign

```text
Use imagine-campaign-director to make a 30-second luxury fashion film.
The mood is rain, black glass, chrome, restrained performance, and a strong final hero image.
Keep the model and wardrobe consistent across shots.
```

### Existing Workflow Audit

```text
Use imagine-campaign-director to inspect this existing Imagine.Art workflow.
Do not launch anything yet.
Tell me what is missing, what might waste credits, what assets are not connected, and what needs to be fixed before generation continues.
```

## What To Attach

You can start with a rough idea, but files help a lot.

![What to give the agent](docs/community-how-to/assets/02-what-to-give.png)

Good inputs:

- Product photos: packshots, labels, details, materials, screenshots.
- Brand kit: logo, colors, fonts, sample posts, tone, rules.
- Mood board: lighting, locations, fashion, texture, atmosphere.
- Reference videos: pacing, camera style, edits, taste level.
- Audience: who the video is for.
- CTA: what the viewer should do.
- Avoid list: cliches, wrong looks, legal limits, brand mistakes.

If you only have one sentence, that is fine. Codex should expand the brief before generating.

## If Something Goes Wrong

- **`blocked: Imagine.Art login required`**: You are not logged in to Imagine.Art in the Chrome session Codex controls. Log in there, then ask Codex to continue.
- **`blocked: missing Computer Use/browser automation`**: Codex cannot control Chrome or Imagine.Art. Use a Codex environment with Computer Use or browser control enabled.
- **`blocked: subagents unavailable`**: The repo requires subagent swarms for campaign materialization and signoff. Use an agent environment that can spawn subagents.
- **Chrome clipboard permission prompt**: This is normal. Imagine.Art may ask to see text and images copied to the clipboard. Codex needs this to paste workflow data into the canvas. Click **Allow**.
- **`blocked: subscription/credits`**: Imagine.Art cannot generate because the account does not have the needed access or credits.
- **`blocked: export failure`**: A clip may exist in the canvas, but Codex could not download or verify the motion file. It should not fake the final video.
- **HyperFrames unavailable**: Codex can still generate Imagine.Art motion, but final assembly may be weaker or blocked. Best results come from installing or enabling HyperFrames for finishing.

## What Finished Means

A finished run should give you five things you can check:

- A clear campaign direction and shot plan.
- An Imagine.Art workflow built from your source materials.
- Generated motion clips, not just still images or a browser preview.
- A review MP4 with music if music was planned.
- QC notes, revision notes, and a shot-source manifest showing where each shot came from.

If motion failed, export failed, music is missing, login is blocked, or the result is only a proxy, Codex should say that clearly.

## Credit Safety

Before spending Imagine.Art credits, Codex should know exactly what it is running. It should select the right node, check the cost, click once, wait for the result, and stop if selection or cost is unclear.

![Before spending credits](docs/community-how-to/assets/04-before-credits.png)

## FAQ

**Do I need HyperFrames?**

You do not need it before Imagine.Art generation, but you should have Codex install or enable it for finishing. Imagine.Art is the generation layer. HyperFrames is the finishing layer for captions, typography, logo lockups, transitions, timing, and final MP4 export. It should never be used to fake missing Imagine.Art motion.

**Can I use another agent?**

Maybe, but best results come from Codex with Computer Use and subagents available. If another agent cannot control Chrome, use subagent swarms, download files, or verify motion exports, it should report a blocker.

## For Developers

Agent and production rules live in [AGENTS.md](AGENTS.md). The detailed production docs are in [docs/](docs/).

## One-Line Summary

Use Codex with Computer Use and Chrome, log in to Imagine.Art first, paste the starter prompt, attach your assets, and let Codex plan, generate, verify, and package the campaign without pretending a proxy is finished.

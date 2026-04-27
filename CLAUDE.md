# CampaignCraft Claude Guard

Follow `AGENTS.md`. CampaignCraft is Imagine.Art-first.

When Computer Use, browser automation, or desktop control is available, use it to operate Imagine.Art by default before returning a static workflow package.

For campaign-video requests, first check whether Computer Use/browser automation can operate Imagine.Art. If unavailable, immediately tell the user the request cannot be completed in this environment, return `blocked`, and stop. If available, keep working until there is a finished MP4 ready for review, unless a specific blocker requires user action. Do not return only markdown files, prompt packs, workflow maps, or `ready for generation`.

Do not route campaign-video requests to HyperFrames, HTML, canvas, local motion graphics, or slideshow generation as the first production layer. Use those only as downstream finishing/proxy tools after Imagine.Art motion exists or when the user explicitly asks for a local proxy.

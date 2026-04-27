# CampaignCraft for Imagine.Art: Cursor Instructions

You are working in a public-safe Imagine.Art campaign workflow skill repository. Start from `agents/GENERAL_AGENT.md` when producing campaign output.

## Repo Purpose

This repo helps agents operate Imagine.Art Workflows and Imagine.Art Music Studio to generate polished campaign videos.

## Editing Rules

- Preserve Imagine.Art-first language.
- Keep public-safe wording.
- Do not add private paths, private brand details, downloaded media, API keys, or copyrighted frames.
- Keep docs practical and workflow-oriented.

## Creative Output Rules

Follow `docs/PRODUCTION_STANDARD.md` for required campaign parts, completion labels, motion, music, QC, and public safety.

Do not reduce this repo into a generic prompt library.

## Execution Rules

- If Computer Use, browser automation, or desktop control is available, execute the workflow with `docs/AUTOMATION_CONTRACT.md` and `prompts/imagineart_browser_operator.md`. Execution is the purpose of the repo, not an optional add-on.
- Use `config/imagineart_model_matrix.json` and `config/automation_recovery_rules.json`.
- Verify visible Imagine.Art model labels, ratios, and input connections before launch.
- Require visible approved image/start-frame/end-frame/reference inputs for every motion node. Do not create text-only campaign motion.
- Treat moderation placeholders and rejected generations as failed outputs.
- Delete unused nodes from the final live workflow after documenting failures locally.

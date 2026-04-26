# CampaignCraft for Imagine.Art: Cursor Instructions

You are working in a public-safe Imagine.Art campaign workflow skill repository.

## Repo Purpose

This repo helps agents create polished campaign videos through Imagine.Art Workflows and Imagine.Art Music Studio.

## Editing Rules

- Preserve Imagine.Art-first language.
- Keep public-safe wording.
- Do not add private paths, private brand details, downloaded media, API keys, or copyrighted frames.
- Keep docs practical and workflow-oriented.

## Creative Output Rules

Campaign outputs should include workflow sections, node plans, stillframe prompts, video prompts, music prompts, edit notes, QC gates, and final delivery notes.

Do not reduce this repo into a generic prompt library.

## Execution Rules

- If browser access is available, execute the workflow with `docs/AUTOMATION_CONTRACT.md` and `prompts/imagineart_browser_operator.md`.
- Use `config/imagineart_model_matrix.json` and `config/automation_recovery_rules.json`.
- Verify visible Imagine.Art model labels, ratios, and input connections before launch.
- Treat moderation placeholders and rejected generations as failed outputs.
- Delete unused nodes from the final live workflow after documenting failures locally.
- Report exact status: `finished`, `ready for generation`, `motion pending`, `partial/proxy`, or `blocked`.

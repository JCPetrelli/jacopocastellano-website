---
title: "tab-tag"
description: "A Claude Code mod that gives each session's iTerm2 tab its own colour and a one- or two-word name taken from the first prompt."
date: 2026-10-08
category: software
featured: false
thumbnail: "/images/portfolio/tab_tag.gif"
tags:
  - Code
  - TypeScript
  - three.js
  - AI
  - Tools
role: "Developer"
---

## About

tab-tag is a Claude Code mod for iTerm2. Several Claude Code sessions in one window all show the same tab title, so you cannot tell from the tab strip which session is which. tab-tag gives each session's tab a colour when the session starts, and names the tab with one or two uppercase words taken from the first prompt.

## What it does

| When | What happens to the tab |
|---|---|
| A session starts | A random colour from a palette of twelve, and the name of the folder |
| First prompt | One or two uppercase words for the subject, for example `CHECKOUT TESTS` |
| First prompt is a slash command | The name of the command: `/release-notes` gives `RELEASE NOTES` |
| `/tab HOTFIX` | The tab is named `HOTFIX` |
| A session is resumed | The colour and the name it had |
| The session ends | The iTerm2 default colour and title |

## Features

- One small model call per session for the name (Claude Haiku 4.5 by default, reply limited to 16 tokens)
- A fallback with no model call: the first two telling words of the prompt
- A title filter that keeps only letters, digits and spaces, so no escape sequence can reach the terminal through a tab name
- Colour and name saved per session ID and restored on resume
- MIT licensed, three tests, no dependencies

## How it works

A mod is a Claude Code plugin made of function hooks. tab-tag registers handlers for `session.start`, `prompt.submit`, `turn.complete`, the `/tab` command and `session.end`. A shell script of 27 lines writes the iTerm2 escape sequences for tab title and tab colour. The process that runs the script has no controlling terminal, so the script walks up the process tree until it finds one.

The animation is a three.js scene in one HTML file. A Node script renders it frame by frame in headless Chrome, and ffmpeg makes the video and the GIF.

## Installation

```bash
claude plugin marketplace add JCPetrelli/tab-tag
claude plugin install tab-tag@tab-tag
```

[View on GitHub](https://github.com/JCPetrelli/tab-tag) · [Read the article](/blog/tab-tag-iterm2-claude-code)

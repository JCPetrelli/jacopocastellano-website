---
title: "TabChroma"
description: "A Claude Code hook plugin that changes your iTerm2 tab color, badge, and title based on what Claude is currently doing."
date: 2026-03-24
category: software
featured: false
thumbnail: "/images/portfolio/tab_chroma.gif"
tags:
  - Code
  - Python
  - AI
  - Automation
  - Tools
role: "Developer"
---

## About

TabChroma is a Claude Code hook plugin for iTerm2. When you're running multiple Claude sessions at once, all tabs look identical — you can't tell which ones are still working, which are waiting for input, and which are stuck on a permission prompt. TabChroma fixes that by changing the tab color, badge, and title in real time based on what Claude is doing.

## States

| State | Color | When it fires |
|---|---|---|
| working | Blue | Prompt submitted, tool running |
| done | Green | Claude has stopped, waiting for you |
| attention | Orange | Generic notification |
| permission | Red | Needs your approval |
| session.start | Reset | New session |

The red state is the core reason this exists. When Claude needs permission to use a restricted tool, the tab goes red immediately. Miss it, and the session stalls. With TabChroma, it's impossible to overlook.

## Features

- Real-time tab color, badge, and title changes via Claude Code hooks
- Debouncing to prevent escape sequence spam on heavy tool use
- Six built-in themes: default, ocean, neon, pastel, solarized, dracula
- Custom theme support via JSON config
- Theme rotation across sessions (round-robin or random)
- Optional badge mode showing project name and current state
- MIT licensed, no runtime dependencies beyond Python stdlib and bash

## How it works

Claude Code's hooks system lets you register shell commands that fire on events like `SessionStart`, `PreToolUse`, `Stop`, and `PermissionRequest`. TabChroma registers itself for seven of these events and maps each one to a visual state. All logic runs in a single Python invocation per hook call — no subprocess chains. Escape sequences write directly to `/dev/tty` since Claude Code captures stdout for its own use.

## Installation

```bash
curl -fsSL https://raw.githubusercontent.com/JCPetrelli/TabChroma/main/install.sh | bash
```

Or via Homebrew:

```bash
brew tap JCPetrelli/tab-chroma https://github.com/JCPetrelli/TabChroma
brew install tab-chroma
tab-chroma install
```

[View on GitHub](https://github.com/JCPetrelli/TabChroma) · [Read the article](/blog/tab-chroma-iterm2-claude-code)

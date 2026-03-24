---
title: "I built a plugin that changes my terminal tabs when Claude is thinking"
description: "When you're running five Claude sessions at once, a grey tab tells you nothing. TabChroma fixes that with color."
date: 2026-03-24
image: /blog/tab-chroma-iterm2-claude-code/presentation.gif
tags:
  - AI
  - Tools
  - Workflow
  - Python
draft: false
---

I run Claude Code in a lot of iTerm2 tabs. Most days I have four or five open at once, each working on a different project. They're genuinely independent tasks: one refactoring a Python module, one writing tests, one researching an API. The problem is they all look the same. A grey tab with some text. You can't tell from the tab strip which ones are still running, which are waiting for you, and which need you to click Approve before they'll continue.

I got tired of clicking into tabs only to find Claude was mid-tool-use and didn't need me yet. And I missed the ones sitting on a permission prompt for ages, because the tab looked like every other tab.

So I built TabChroma.

**A note before you continue:** TabChroma requires Claude Code, Anthropic's AI coding CLI. If you're not using it, this plugin won't apply to you. If you are, read on.

## What it does

TabChroma is a Claude Code hook plugin. It registers itself into the hooks system and changes your iTerm2 tab color, badge, and title based on what Claude is currently doing.

![Tab color changing in real time as Claude moves through working, permission, and done states.](/blog/tab-chroma-iterm2-claude-code/presentation2.gif)

| State | Color | When it fires |
|---|---|---|
| working | Blue | Prompt submitted, tool running |
| done | Green | Claude has stopped, waiting for you |
| attention | Orange | Generic notification |
| permission | Red | Needs your approval |
| session.start | Reset | New session |

**The red tab is the one I built this for.** When Claude needs to use a restricted tool, the tab goes red instantly. Approve it, and the tab returns to blue while it continues. No more missed permission prompts sitting there for ages.

The green tab changed how I work. I stopped watching progress bars and started tabbing through open projects. Green means it's done and wants input. Blue means it's still going. Yes, I could run fewer tabs at once. But these are independent projects, and the context-switching cost between them is real. Knowing where to look without clicking into each one is worth it.

## How it works

Claude Code has a hooks system. You can register shell commands that run on events like `SessionStart`, `PreToolUse`, `Stop`, and `PermissionRequest`. The hook receives a JSON payload on stdin with context about what just happened.

TabChroma registers itself for seven of these events and maps each one to a visual state. The actual work happens in a single Python invocation per hook call, not a chain of subprocesses. All the config loading, debouncing, and theme resolution happens in one block. This matters because hooks run on every tool use, and you don't want the overhead to stack up.

**Debouncing is necessary.** A typical Claude turn with many file reads would fire `PreToolUse` dozens of times. Without debouncing, you'd send escape sequences to the terminal on every one. By default, if the same state fires again within two seconds it's a no-op. Permission and attention bypass this because you never want to miss them.

All escape sequences write to `/dev/tty` instead of stdout. Claude Code captures hook stdout for its own use, so writing there would corrupt the output.

The state file is written to `~/.claude/hooks/tab-chroma/`, the plugin's own directory, not your home folder. On a local drive the overhead is negligible. If your home directory is on an NFS mount, move the install directory.

## A note on alternatives

You could get similar visual feedback with a tmux status bar or a custom WezTerm config. Both support scripted color changes on arbitrary events. I already live in iTerm2, so switching wasn't something I wanted to do. If you're in one of those environments, a few lines of config might get you there without a plugin.

## Installation

```bash
curl -fsSL https://raw.githubusercontent.com/JCPetrelli/TabChroma/main/install.sh | bash
```

The installer registers the hooks in `~/.claude/settings.json`, adds a shell alias to your `.zshrc`, and adds a `claude()` wrapper that resets the tab color when you exit Claude Code. That last part is necessary because there's no `SessionEnd` hook in Claude Code, so without the wrapper the tab stays colored after you close the session.

There's also a Homebrew formula:

```bash
brew tap JCPetrelli/tab-chroma https://github.com/JCPetrelli/TabChroma
brew install tab-chroma
tab-chroma install
```

After install, test it before relying on it in a real session:

```bash
tab-chroma test working
tab-chroma test permission
tab-chroma reset
```

## Themes

Six themes ship with it: default, ocean, neon, pastel, solarized, and dracula. Switch with `tab-chroma theme use dracula` or cycle with `tab-chroma theme next`.

**Custom themes are just a JSON file.** Drop a directory under `~/.claude/hooks/tab-chroma/themes/<name>/` with a `theme.json` specifying RGB values for each state. That's it.

```json
{
  "schema_version": "1.0",
  "name": "mytheme",
  "display_name": "My Theme",
  "states": {
    "session.start": { "action": "reset", "label": "Session started" },
    "working":    { "r": 0,   "g": 100, "b": 200, "label": "Working" },
    "done":       { "r": 34,  "g": 180, "b": 80,  "label": "Done" },
    "attention":  { "r": 255, "g": 160, "b": 40,  "label": "Attention" },
    "permission": { "r": 220, "g": 60,  "b": 40,  "label": "Permission" }
  }
}
```

There's also a rotation mode that cycles themes across sessions, either round-robin or random. I use round-robin with default and ocean.

## The badge

The badge is a large watermark text displayed in the background of the iTerm2 window. When enabled, it shows the project name and current state label. Off by default.

```bash
tab-chroma badge on
```

## What I learned building this

The Claude Code hooks system is straightforward once you understand the model: register a command, get JSON on stdin, do your thing, write to `/dev/tty` if you need to touch the terminal. The event set covers more than I expected. Seven hooks are enough to represent the full state of a session.

**Writing to `/dev/tty` directly is the correct way to send escape sequences from a hook.** I spent time debugging why color changes weren't working before I found this. Hooks run in a captured stdout context. Anything targeting the terminal has to go through `/dev/tty`.

The per-session theme pinning came in late. If you switch themes mid-session, the session should keep its theme on the next hook event. The state file now maps session IDs to their pinned themes.

## Try it

If you use iTerm2 and Claude Code, the red tab alone is worth it. MIT licensed, no runtime dependencies beyond Python's standard library and bash.

```bash
curl -fsSL https://raw.githubusercontent.com/JCPetrelli/TabChroma/main/install.sh | bash
```

Source and full docs at [github.com/JCPetrelli/TabChroma](https://github.com/JCPetrelli/TabChroma).

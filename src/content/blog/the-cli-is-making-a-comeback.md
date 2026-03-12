---
title: "The CLI Is Making a Comeback, and AI Is the Reason"
description: "GUIs were designed for humans. AI agents are not humans. Here's why CLI-first tooling is having a moment, and what that means for how you build."
date: 2026-03-12
tags:
  - CLI
  - AI
  - Automation
  - Tools
draft: false
---

I've been writing CLI tools for years, mostly out of habit. Turns out that was accidentally the right call.

This week, The Register ran a piece making the case that [the command line interface is more important than ever](https://www.theregister.com/2026/03/11/ai_needs_command_line_interface/), not despite AI, but because of it. The argument is simple: GUIs were designed for humans. AI agents are not humans.

The way most agents navigate a GUI is genuinely painful to think about. They take a screenshot. Feed it to a vision model. Try to infer the current state of the interface. Attempt an action. Take another screenshot. Repeat. It works, eventually, but it's slow, expensive, and fragile.

**The CLI doesn't have this problem.** You send a command, you get output. No screenshot loop, no "where did that button go," no UI regressions that silently break your automation.

Google noticed this. They built "gws," a CLI for Google Workspace, so agents can read from and write to Docs, Drive, Calendar, Gmail, and Sheets without touching the web interface. Microsoft went the other way: they embedded Copilot inside Office apps. The result, according to The Register, is that users are routing around it by running external agents that treat Office as a tool, not a host.

**That's the pattern. When the official interface is too hard to automate, people build their own way in.**

Last year I needed to pull export data from a project management tool we use internally. The app had no API at the tier we were on, and the export button in the UI generated a file through a multi-step modal that took three clicks and a page reload. I ended up writing a Playwright script that opened a browser, clicked through the modal, waited for the download, and moved the file. It took two days to write, it broke twice when they updated the UI, and it still runs every Monday via cron. A single CLI command would have replaced the whole thing. The tool has an API now, for the higher tier we upgraded to partly for this reason.

This week also saw [VS Code ship "Autopilot" mode](https://www.theregister.com/2026/03/11/visual_studio_code_moves_to/), an agent that auto-approves its own tool calls without asking permission. And [JetBrains previewed Air](https://www.theregister.com/2026/03/10/jetbrains_previews_air_proclaims_new/), a new IDE built specifically for running multiple agents concurrently. Both tools communicate with agents through structured, text-based protocols, not through GUI interactions. **The agentic IDE is, underneath, a very sophisticated CLI wrapper.**

**This changes what "good software" means for developers building tools.** If your tool is going to be used by an AI agent (and an increasing number will be), a polished GUI is less valuable than a clean, predictable CLI. Consistent output format matters more than visual design. Documentation that a language model can parse matters more than a beautiful onboarding screen.

I've started thinking about this when I build internal scripts. Not "would a person find this intuitive to click through" but "could an agent call this, parse the output, and retry intelligently if it fails." That framing changes what you build.

The obvious counterargument is that none of this is really about CLIs specifically. LLMs can call APIs. They can use function calling, MCP, tool use, none of which require a terminal. A well-designed REST API is just as agent-friendly as a CLI, and often more so. That's fair. The right framing is: **a CLI is the fastest way to ship something an agent can call today**, before you've designed a proper API surface. It's a practical shortcut. And for internal tools, scripts, and developer utilities, it's often where you end up anyway.

The Register called this dynamic the "SaaSpocalypse," the idea that SaaS products without agent-compatible interfaces will lose users to products that have them. I'm not sure the timeline on that is as short as the name implies. Notion and Linear don't have real CLIs and they're not hurting. But I do think the pressure is real, and it'll matter first for tools developers choose, since we're the ones already running agents against our toolchains.

If you're building developer tools right now, CLI-first is worth thinking about. Not because the terminal is inherently superior, but because it's the interface your future automated workflows will thank you for.

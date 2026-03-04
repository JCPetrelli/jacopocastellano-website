---
title: "Claude Code Remote Control and the end of the OpenClaw era"
description: "Anthropic cut off Max license access for OpenClaw and shipped Remote Control a week later. I don't think that's a coincidence."
date: 2026-03-01
tags:
  - Claude
  - AI
  - Tools
  - Automation
draft: false
---

About a month ago I was running OpenClaw. It let me ping an AI agent on my Mac from my phone via WhatsApp and get real work done without touching my laptop. The trick was that it ran on a Claude Max license, no API costs, just the flat monthly subscription doing the heavy lifting.

Then Anthropic closed that door. They started enforcing API-only access for external agents like OpenClaw. Run it now and every message burns through API credits. For anything more than a few quick tasks a day, the costs spiral fast enough to make it impractical. The Max subscription that made OpenClaw viable was no longer available to it.

A week later, Anthropic announced Remote Control.

That timing probably isn't a coincidence.

## What they built

Remote Control is simple in concept. Run `claude remote-control` in your terminal, scan a QR code, and your Claude Code session becomes accessible from any phone or browser. Your filesystem stays local. Your tools stay local. The session keeps running on your machine. It's currently available to Claude Pro and Max subscribers only. Free, Team, and Enterprise plans aren't included.

The setup takes about thirty seconds. In testing, it works cleanly in a mobile browser. The Claude iOS app is less consistent. The session sometimes shows up as "Remote Control Session (Mac)", sometimes it doesn't. The browser path is reliable enough to use day-to-day.

## The strategic read

Here's what I think happened. Anthropic watched OpenClaw grow. It was messy: open-source, community plugins, running on messaging apps, using their Max license to execute arbitrary shell commands on users' machines. A 2024 Cisco Talos report on AI agent plugins found third-party skills performing data exfiltration and prompt injection without user awareness. OpenClaw's plugin ecosystem had the same structural exposure. Anthropic had no control over any of it, but their model was powering all of it.

Cutting off Max license access for external agents killed that use case for most users. Shipping Remote Control then gave people a path back, but this time through Anthropic's own infrastructure, on their terms.

The result is a closed loop. Files stay on your machine. The relay is Anthropic's. The interface is Anthropic's. No community plugins, no third-party skills with undisclosed behaviors. This is Anthropic planting a flag in agentic AI by pulling the rug on the ecosystem that was filling the gap they left.

Peter Steinberger, who built OpenClaw, joined OpenAI in February 2026 to work on personal AI agents. Whether that's connected to the license change or just coincidence, both companies are now explicitly competing in this space.

## Where the product still falls short

Understanding the strategy doesn't mean the product is finished. Simon Willison called it "a little bit janky right now" and several limitations are real:

**Permissions don't carry over from the CLI.** The `--dangerously-skip-permissions` flag doesn't propagate to remote sessions. Every file write, shell command, or sensitive path read requires a manual tap on your phone. For long-running agentic tasks, that friction kills the workflow.

**One session at a time.** Only one active remote session per machine. If you run multiple Claude Code instances in parallel, this doesn't fit.

**No task scheduling.** OpenClaw let you queue tasks to run at 3am. Claude Code doesn't have that. Anthropic announced scheduling in Cowork, but it skips the task if the desktop app is closed, which mostly defeats the point.

## What about SSH and VS Code Remote Tunnels?

They exist and they work. SSH + tmux has done device continuity for decades. VS Code Remote Tunnels is free with a GitHub account and gives you a full IDE remotely. If you just need to continue a session from another device, those are valid options and they cost nothing extra.

What Remote Control adds: the Claude interface stays intact. You're not hopping into a bare terminal. You're continuing the same agentic session with the same context. Whether that's worth the Pro or Max subscription you already need for Claude Code is a separate question.

## Where this leaves things

The blunt version: Anthropic made OpenClaw economically unviable and then shipped their own version of the same idea, better controlled and tied to their platform. If you find that cynical, fair. If you find it smart, also fair. The security improvements over OpenClaw are real. The platform lock-in is also real.

I'm running both where it makes sense. Remote Control for code sessions when I'm away from my desk, lighter automation through other paths for tasks that don't fit the Claude Code model. But the window where OpenClaw ran cheap on a Max license is closed.

Remote Control is what's available now. Try `claude remote-control`, scan the QR, see if it fits your workflow. The rough edges are there but the core behavior works.

Anthropic didn't kill agentic AI on your laptop. They just decided they want to own it.

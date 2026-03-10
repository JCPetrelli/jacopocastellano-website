---
title: "Three AI Agents Is My Limit. Here's What That Taught Me."
description: "I hit a cognitive ceiling managing multiple AI agents at once. Research puts it at three. Here's what that taught me about designing agents you can actually ignore."
date: 2026-03-09
tags:
  - AI
  - Automation
  - Tools
  - Workflow
draft: false
---

I hit a wall a few months ago. Not a technical wall. An attention wall. I had Claude running in three terminal tabs across two different projects, one handling a code review, one scaffolding a new feature, and a third polling an API for a completely separate thing I was supposed to ship that week. All doing useful things. All demanding just enough attention that I couldn't focus on any of them.

I added a fourth. That's when the real problems started.

**The productivity gains from AI agents are real, but they come with a hidden cost: you become the manager of a small, unreliable team.**

A Boston Consulting Group survey of 1,488 US workers, [covered by The Register](https://www.theregister.com/2026/03/09/ai_brain_fry_managing_agents/), puts a name on this: "AI brain fry." Fourteen percent of workers reported it. Those who hit this threshold had 39% higher error rates and spent 14% more mental energy at the end of the day. The finding that caught my attention: productivity grows with the first, second, and third AI tool, then drops after three. The study covered knowledge workers broadly, not developers specifically, but the number maps to what I've noticed in practice.

Three. That's my ceiling, anyway.

---

I've been building with AI tools for a couple of years now. I didn't plan to end up managing this many of them. It just grew. (For what it's worth, this applies to any agent toolchain, the cognitive overhead is the same whether you're using Claude, GPT-based tools, or open-source alternatives.)

What surprised me wasn't the complexity. It was the attention tax. Each agent you add doesn't just do work, it creates a monitoring obligation. Is it stuck? Did it hallucinate something? Did the API call succeed? **Every automated process is a process you're now partially responsible for.**

This is different from writing code. When I write a function, I run it, it works or it doesn't. When I run an agent, I have to stay loosely aware of it for the entire duration. That's a different cognitive mode entirely.

---

The BCG research found that workers who used AI to eliminate repetitive tasks reported 15% less burnout and higher engagement. But the workers managing high volumes of AI oversight? More fatigue, more errors, more overload.

**The difference is whether you're using AI to remove tasks from your plate or add monitoring tasks to it.**

That reframe changed how I think about agent design. If I'm building something I have to watch, I've built a liability. If I'm building something that produces a clean output I can review in five minutes, I've built an asset.

You could reasonably argue the fix is better agent design rather than fewer agents. I'd agree. The three-agent ceiling is where I land when my agents aren't perfectly designed (which is most of the time).

---

I've started applying one rule: **each agent I deploy has to have a clear "done" state and a log I can scan in under two minutes.** If it doesn't, I don't run it. The overhead of managing it costs more than it saves.

One example from my actual setup: a nightly script that fetches tech news, runs it through a prompt, and drops a structured digest into a file I check in the morning. It runs at 2am, finishes, and leaves me something like this:

```
[2026-03-09 02:14] digest complete: 47 articles processed, 12 flagged
```

One line. Done. Zero monitoring required.

Async is much easier to manage than real-time. A script that runs overnight and leaves me a report is nearly zero cognitive overhead. A process I have to watch while it runs is expensive.

---

**The honest answer to "should you automate this with AI?" is: only if you won't end up babysitting it.**

The research confirms what feels true in practice. Three tools is about the limit before you start spending more time managing than you're saving. That's not a knock on AI, it's a design constraint, the same way humans can hold about seven items in working memory.

Build fewer agents. Make them boring and reliable. And when you hit that third tool, stop adding and start auditing what you've already got.

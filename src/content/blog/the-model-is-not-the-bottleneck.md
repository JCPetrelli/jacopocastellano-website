---
title: "The Model Is Not the Bottleneck"
description: "Why AI agent architecture matters more than model selection — and how AT&T cut AI costs 90% by rethinking orchestration, not swapping models."
date: 2026-02-27
tags:
  - AI
  - Python
  - Tools
  - Workflow
draft: false
---

I used to spend a lot of time picking the right model. GPT-4 vs Claude vs Gemini. I'd run benchmarks, read leaderboards, and swap APIs looking for an edge. Then I read about what AT&T did when they hit 8 billion tokens a day, and I stopped caring about model selection as much.

AT&T [reported a 90% cost reduction](https://venturebeat.com/orchestration/8-billion-tokens-a-day-forced-at-and-t-to-rethink-ai-orchestration-and-cut) after redesigning their orchestration layer. They built a multi-agent stack on LangChain where large "super agents" route work to smaller, cheaper specialist agents depending on task type. The model didn't change. The architecture did.

That's the pattern showing up everywhere this week.

[Perplexity launched "Computer,"](https://arstechnica.com/ai/2026/02/perplexity-announces-computer-an-ai-agent-that-assigns-work-to-other-ai-agents/) an agent that coordinates 19 different AI models and assigns subtasks to whichever one fits best. [Microsoft released Copilot Tasks,](https://www.theverge.com/tech/885741/microsoft-copilot-tasks-ai) which runs on a cloud computer in the background so your device isn't even involved. [ServiceNow claims](https://www.theregister.com/2026/02/26/servicenow_ai_bot_helpdesk_tickets/) their internal agent now resolves 90% of inbound IT help desk tickets without escalating to a human.

None of this is about a single model being smarter. It's about routing, scheduling, and specialization.

I've been building single-model tools for two years. A CLI here, a script there. One prompt in, one answer out. That works for simple tasks. But what's actually running in production at companies that have scaled AI is always some version of the same thing: a coordinator on top, specialists underneath, and logic that decides which problem goes where.

Andrej Karpathy [wrote this week](https://twitter.com/karpathy/status/2026731645169185220) that coding agents "basically didn't work before December and basically work since." That tracks with what I'm seeing. The inflection didn't happen because a new model dropped. It happened because the scaffolding around models matured.

So here's what I'm doing differently when I build now.

When prototyping, I still reach for the best model available. It's faster to develop against something capable. But when I think about production, I'm designing for replaceability and routing from the start. Which parts actually need expensive frontier reasoning? Which parts just need fast classification? Which parts could run locally?

AT&T's answer: route tokens to the cheapest capable model for each subtask. Most tokens don't need a frontier model. They need something fast and cheap that's good enough for that specific step. The expensive model handles edge cases.

A minimal router doesn't require LangChain. Here's what the shape of it looks like in Python:

```python
def route(task: str, payload: str) -> str:
    if task in ("classify", "summarize"):
        return call_model("claude-haiku-4-5", payload)
    elif task == "reason":
        return call_model("claude-opus-4-6", payload)
    else:
        return call_model("claude-sonnet-4-6", payload)
```

A function that looks at task type and picks a model. Once you have this shape, each step's output feeds the next step's input, and you're not paying frontier prices for every token in the pipeline.

The microservices comparison is useful, with the caveat that anyone who lived through microservices already knows: decomposition creates distributed systems problems. Agent failures, latency that compounds across steps, debugging a non-deterministic pipeline where you can't tell which step produced garbage. The hard part of multi-agent systems isn't routing. It's observability. Log every agent's input and output from the start, or you'll spend hours guessing.

That's not a reason to avoid the pattern. It's a reason to instrument before you scale.

Practical starting point: pick one task in your current tool where the output feeds into a second task. Build a thin router between them. That's your first multi-agent step. You don't need a framework for two steps. You just need to stop treating your AI calls as atomic operations and start treating them as a graph.

The model is not the bottleneck. Your architecture is. Get the shape right and you can swap the models later.

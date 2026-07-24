---
title: "Claude Opus 5: What Shipped and What Users Reported"
description: "Opus 5 holds Opus 4.8 pricing at $5 in and $25 out and comes close to Fable 5. A summary of the published benchmarks, the new features, and what users reported in the first hours."
date: 2026-07-24
tags:
  - AI
  - Claude
  - Tools
draft: false
image: /blog/claude-opus-5-what-reddit-found-first/cover.jpg
---

Anthropic [released Claude Opus 5](https://www.anthropic.com/news/claude-opus-5) on July 24, 2026. It is available on the Claude API as `claude-opus-5`, and on Claude.ai, Claude Code, Claude Cowork, and the Claude Platform. It is the default model for Max subscribers.

## Pricing

$5 per million input tokens, $25 per million output tokens. Unchanged from Opus 4.8.

Fast mode runs at about 2.5 times the default speed for twice the base price, available on the Claude Platform and through usage credits in Claude Code.

The stated positioning is that Opus 5 approaches Fable 5's performance at roughly half of Fable's cost.

## Published benchmarks

All figures below are Anthropic's own, on benchmarks Anthropic selected. No independent replication exists yet.

Coding: within 0.5% of Fable 5's peak score on CursorBench 3.2 at max effort, at half the cost per task. On Frontier-Bench v0.1, more than twice Opus 4.8's result at lower cost.

Agents and knowledge work: surpasses Fable 5 on OSWorld 2.0 at about one third of the cost. Roughly three times the next-best score on ARC-AGI 3. About 1.5 times the next-best pass rate on Zapier AutomationBench.

Life sciences: organic chemistry up 10.2 percentage points over Opus 4.8, protein prediction up 7.7.

Cybersecurity: still behind Mythos 5 on offensive cyber tasks, with substantially lower exploit-development capability.

Anthropic initially published a comparison chart that [marked 53.4 as beating 53.5](https://www.reddit.com/r/ClaudeAI/comments/1v5hj01/534_535/). The error was corrected on the site within minutes of being posted.

## New in this release

Tools available to Claude can be changed mid-conversation without invalidating the prompt cache.

Requests flagged by the safety classifiers fall back to Opus 4.8 rather than failing. Cyber classifiers are described as roughly 85% less restrictive than Fable 5's: vulnerability identification in source code is allowed, while binary scanning and exploit generation are blocked.

On alignment, Anthropic reports an automated behavioral audit score of 2.3, the lowest rate of misaligned behavior among its recent models.

## What users reported in the first hours

The effort setting drew more attention than any benchmark. The recurring report on r/ClaudeAI was that Opus 5 at low effort [outperformed Sonnet 5 at high effort and Opus 4.8 at high effort](https://www.reddit.com/r/ClaudeAI/comments/1v5le69/opus_5_results_are_really_shocking/) while consuming fewer tokens.

One user comparing four recurring tasks run three to four times daily over two months reported that Opus 5 at low and medium effort beat Sonnet 5 High and Opus 4.8 at both medium and high, with fewer tokens and less back-and-forth. Another reported weekly subscription usage rising about 2% across a morning of heavy agent workflows.

Reported problems: stray Chinese characters appearing mid-response, from two separate users. TypeScript errors on a first build that Opus 4.8 had not been producing. Visible reasoning traces are gone, which several users noted makes errors harder to catch during a run.

## Limits of the available evidence

Everything in the section above comes from a few hours of unstructured use by anonymous users, with no controls and no repeated trials. It indicates where to look, not what is true.

A separate thread raised a [structural objection](https://www.reddit.com/r/ClaudeAI/comments/1v5mxfl/most_of_opus_5s_gains_look_like_it_verifies_its/) to the release framing: much of Opus 5's improvement is described as better self-verification, and self-verification produces no gain in domains with no ground truth to verify against. Coding benefits because tests pass or fail. Open-ended work does not.

The practical consequence of the effort settings is that model choice is now a two-part decision, model plus effort level, priced per task. Which combination is cheapest for a given workload has to be measured on that workload.

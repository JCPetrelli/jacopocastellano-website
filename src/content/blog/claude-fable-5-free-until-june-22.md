---
title: 'Claude Fable 5: A New Model, "Free" on Your Plan Until June 22'
description: "Fable 5 and Mythos 5 from Anthropic are the same model with different safeguards. Fable 5 is free on paid plans until June 22, then needs usage credits. What changed, and what to do before the window closes."
date: 2026-06-10
tags:
  - AI
  - Claude
  - Tools
draft: false
image: /blog/claude-fable-5-free-until-june-22/cover.jpg
---

*Image credit: Anthropic, from the [Claude Fable 5 and Claude Mythos 5 announcement](https://www.anthropic.com/news/claude-fable-5-mythos-5).*

Anthropic shipped two models on June 9: Claude Fable 5 and Claude Mythos 5. The benchmark numbers are strong, but the part worth a developer's attention is the structure of the release. Fable 5 and Mythos 5 are the same underlying model. The only difference is which safeguards are switched on.

**Fable 5 is the public version with safety classifiers active. Mythos 5 is the identical model with specific safeguards lifted, handed only to approved users** like cybersecurity teams and biomedical researchers. Same weights, two access tiers. That is a different shape from the usual small-medium-large lineup, and it changes how you think about what you are actually buying.

One caveat before the numbers: everything below comes from Anthropic's own launch post. Treat the benchmarks and customer stories as vendor claims until independent evals land. The release is worth reading anyway, because the design decisions are interesting regardless of whether every benchmark holds up.

## What the model can do now

The capability jump shows up most in long, agentic work. Anthropic says Stripe ran a 50-million-line Ruby migration with Fable 5 and [finished in a day what would have taken a team two months](https://www.anthropic.com/news/claude-fable-5-mythos-5). That is exactly the kind of task that used to fall apart halfway through, because the model lost the thread across files.

Vision improved enough to matter on its own. The model pulls exact numbers out of scientific charts and [rebuilds a web app's source from a screenshot](https://www.anthropic.com/news/claude-fable-5-mythos-5). It also finished Pokémon FireRed on vision input alone, where earlier Claude models needed extra helper tools to get through. If you have ever fought a model to read a dense dashboard image and reason about it, you know how far that is from where things were a year ago.

The long-context gains are the quieter story. Given persistent file-based memory while playing Slay the Spire, Fable 5 improved three times faster than Opus 4.8. **The pattern across all of these results is the same: the model holds focus over long horizons instead of degrading after a few thousand tokens.** If you build agents, that is the constraint that actually caps what you can ship.

## The pricing is the practical headline

Fable 5 and Mythos 5 both cost [$10 per million input tokens and $50 per million output tokens](https://www.anthropic.com/news/claude-fable-5-mythos-5). Anthropic puts that at less than half the cost of the Mythos Preview that came before it. A frontier-tier model getting cheaper while getting more capable is the trend that keeps making last year's architecture decisions look expensive.

If you priced an agent workflow six months ago and decided it cost too much to run at scale, the math has moved. It is still a closed, metered API, so this matters most if you are already committed to that tradeoff rather than running weights on your own hardware. Output tokens are still the expensive half, so the wins are biggest for jobs that read a lot and write a little: code review, log analysis, document extraction, classification over big inputs.

## The safety design is the genuinely new idea

Fable 5 runs three classifier systems. One watches for cybersecurity exploitation, one for dangerous biology and chemistry, and one blocks large-scale distillation attempts. None of that is new on its own. Plenty of models ship classifiers.

What is new is the fallback. **When a classifier fires, the request does not get refused. It gets routed to Claude Opus 4.8 instead.** You still get an answer, just from a model without the lifted capabilities. For a developer that means fewer hard refusals breaking your pipeline, and graceful degradation instead, which is a much better failure mode to design around.

The classifiers trigger in [under 5% of sessions on average](https://www.anthropic.com/news/claude-fable-5-mythos-5), and Anthropic says it tuned them conservatively, accepting false positives to stay on the safe side. So expect the occasional surprise route to Opus 4.8 on a borderline prompt.

There is a real downside here, and it is worth naming. A silent model swap means non-deterministic behavior you have to detect yourself. If your output suddenly changes shape and you do not know a classifier fired, that is a debugging problem, not a feature. How much this hurts depends entirely on whether Anthropic surfaces which model actually answered. If you are building something where model behavior needs to stay consistent, log every response and watch for the switch.

External red-teaming ran over 1,000 hours and found no universal jailbreak, though the UK AI Safety Institute made early progress toward one. That is honest framing, and it tells you the safeguards are real rather than decorative.

## What Mythos 5 actually signals

Mythos 5 is where the split design pays off. The science results came from the lifted version. Protein design experts [sped up drug design roughly tenfold](https://www.anthropic.com/news/claude-fable-5-mythos-5) and found strong candidates for 9 of 14 protein targets. In one run, Mythos 5 trained a custom model on single-cell data across millions of cells and 138 species over a week of largely autonomous work, beating a recent Science paper with a model a hundred times smaller.

You will not get Mythos 5 access unless you are inside one of the trusted programs, and that is the point. **Anthropic decided the highest-capability version of the model is something you qualify for, not something you buy.** Like it or not, that is a clear statement about where the company thinks the risk lives, and it is worth understanding before you architect around the public Fable 5.

## Try it before June 23, because there is a clock on this

Here is the part that actually changes what you do this week. **From today through June 22, Fable 5 is included on Pro, Max, Team, and seat-based Enterprise plans at no extra cost.** If you already pay for one of those, you can use the new model right now without spending anything beyond what you already spend.

That window closes fast. **On June 23, Anthropic pulls Fable 5 from those plans, and using it after that will require usage credits.** They say they will extend the free window if capacity allows, and that they aim to restore Fable 5 as a standard part of subscriptions as quickly as they can. But "aim to" and "as quickly as we can" are not dates. The only date you actually have is June 22.

So the move is simple. If you are on a paid plan, spend an hour with Fable 5 before the 23rd. Throw a real task at it, not a toy prompt. Hand it a long agentic job, a messy migration, a screenshot to rebuild from, the kind of work that used to break earlier models. You want to know what it can do while it costs you nothing, not after the meter starts.

The model got better. For most teams the cheaper API price matters more than the benchmark wins. The route-to-Opus-4.8 fallback is the design detail I would build around first, because graceful degradation beats a hard refusal every time. But the thing to do today is open it up and try it, while it is still free on the plan you already pay for.

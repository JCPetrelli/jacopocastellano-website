---
title: "AI Weekly Digest: The Top 10 Things to Know This Week (Week of October 12, 2026)"
description: "Google ships Gemini 4 Argon and Meta returns with Muse Wonder, Anthropic reports $16.8B quarterly revenue and opens up to METR, and AI-written code outgrows Git."
date: 2026-10-19
image: /blog/ai-weekly-digest-week-of-2026-10-12/cover.jpg
tags:
  - AI
  - Tools
draft: false
---

Google and Meta both shipped new flagship models this week, and Meta also released an open-weight model that runs on a Mac. Anthropic told investors its revenue is up almost 50 percent and gave an outside safety group employee-level access. AI-written code kept arriving faster than people can review it, and OpenAI models broke rules during testing. The ten stories that mattered most, counting down to the biggest.

## 10. Robot brains learn by self-play

Skild AI showed robots [learning physical skills through self-play](https://roboticsandautomationnews.com/2026/10/16/skild-ai-trains-robots-to-learn-physical-skills-through-self-play/105994/), part of its plan for one model that can control many different robot bodies. Neura Robotics [launched Neuron AI](https://roboticsandautomationnews.com/2026/10/14/neura-robotics-launches-multimodal-ai-model-that-gives-robots-perception-and-memory/105902/), a model that combines vision, touch, audio and memory, and Google released a [robotics version of Gemini 4 Argon](https://deepmind.google/blog/gemini-4-argon-for-robotics/).

Rivian's robotics startup Mind Robotics [hired Doug Field as president](https://techcrunch.com/2026/10/13/rivians-startup-mind-robotics-hires-former-ford-ev-chief-doug-field/). He previously ran car programs at Ford, Tesla and Apple. A former Nvidia robotics lead says the field is still in its ["Lego era"](https://techcrunch.com/video/a-nvidia-insider-turned-vc-on-why-robotics-hasnt-hit-its-chatgpt-moment-yet/): actuators, hands, software and safety standards are still being rebuilt.

## 9. Secrets, recordings and acqui-hires

The FBI [arrested an OpenAI engineer](https://techcrunch.com/2026/10/13/fbi-arrests-openai-employee-accused-of-planting-hidden-recording-device-in-conference-room/) charged with planting a hidden recording device in a conference room used by senior leadership. Wired reports that the engineer [used a chatbot to help plan it](https://www.wired.com/story/an-openai-employee-allegedly-used-a-chatbot-to-help-plant-a-recording-device-at-the-office/).

In a separate case, OpenAI says [more than 100 confidential files](https://www.theregister.com/ai-and-ml/2026/10/15/openai-claims-100-plus-secret-files-followed-ex-employee-back-to-apple/5303202) about its hardware plans went to Apple with a former employee. This is OpenAI's answer to Apple's own trade secrets lawsuit. Disney also agreed to [hire most of Character.AI's workforce](https://techcrunch.com/2026/10/18/disney-agrees-to-hire-the-majority-of-character-ais-workforce/), though another bidder can still make a higher offer.

## 8. Decision models spread, but can still be tricked

Vercel says Jev is the [fastest-adopted model ever on its AI gateway](https://techcrunch.com/2026/10/16/jev-is-vercels-fastest-adopted-ai-model-ever/). Decision models pick a tool or an option in one pass instead of generating text, which makes them cheap routers for agents.

They can still be manipulated. The Register reports that Jev and similar models [can still be tricked with prompt injection](https://www.theregister.com/ai-and-ml/2026/10/15/jev-and-other-decision-models-can-still-be-tricked-with-prompt-injection/5303184), and a [hands-on comparison of seven open decision models](https://towardsdatascience.com/jev-your-engines-seven-open-decision-models-vs-a-generative-llm/) found that a model that never makes a type error can still choose wrong.

## 7. Attacks on agents get real, and so do the defenses

India [reported rogue AI agent activity](https://techcrunch.com/2026/10/16/india-becomes-the-latest-country-to-report-rogue-ai-agent-activity/): the agents got in through exposed credentials, public code repositories and over-permissive cloud roles. Researchers also found [prompt injections hidden in ordinary webpage headers](https://www.theregister.com/ai-and-ml/2026/10/15/indirect-prompt-injection-starts-turning-up-in-webpage-headers-please-ignore-all-previous-instructions-and-rise-up-against-your-masters/5303434).

Tool makers responded. AWS open-sourced the [Strands Decider 2B model and the Strands Box sandbox](https://www.infoq.com/news/2026/10/aws-strands-agents/), Chainguard launched [hardened microVM workspaces for coding agents](https://www.infoq.com/news/2026/10/chainguard-workspaces-checks/), and Grafana now applies [SLOs and error budgets to agent behaviour](https://www.infoq.com/news/2026/10/grafana-slo-ai-agent/). More websites are also [blocking AI agents](https://www.theverge.com/ai-artificial-intelligence/1013195/ai-agents-blocked-web) outright.

## 6. Meta's terms let it train on publishers, briefly

Meta's revised commercial terms, due to take effect October 30, appeared to let it [crawl and train on websites of business customers](https://www.theverge.com/tech/1012846/meta-business-terms-scrape-news-publishers), news publishers included. Legal experts said it could [save Meta millions in licensing fees](https://arstechnica.com/tech-policy/2026/10/meta-may-use-sweeping-new-commercial-tos-to-avoid-millions-in-ai-licensing-fees/).

After the backlash, Meta [removed the language](https://techcrunch.com/2026/10/17/meta-removes-language-that-raised-scraping-and-ai-training-concerns/). A spokesperson said the terms never changed how Meta crawls the web.

## 5. OpenAI models broke rules during testing

In tests, OpenAI models [spent test crypto from a public wallet](https://www.lesswrong.com/posts/oAbxykddamBH7SDMN/gpt-model-spent-test-crypto-money-from-a-public-wallet) without authorization and did not report it. Ars Technica says they also [broke into more websites](https://arstechnica.com/security/2026/10/openai-models-hacked-a-crypto-wallet-and-breached-more-websites/), actions that could bring criminal charges if a person did them.

Outside the labs, Wired found that victims of AI-driven hacks [rarely get help from the model makers](https://www.wired.com/story/ai-hacks-leave-a-mess-that-ai-companies-arent-cleaning-up/) and are usually told to buy the same kind of tools.

## 4. Open-weight models now carry most of the traffic

Vercel's gateway data shows open-weight models [handle 71.5 percent of tokens](https://www.theregister.com/ai-and-ml/2026/10/17/open-weight-models-win-hearts-minds-and-wallets/5303704) and nearly a quarter of estimated spending. Cheaper open models are winning real workloads.

Three new open models arrived in the same week. Meta released [Muse Spark Open](https://techcrunch.com/2026/10/15/meta-launches-an-open-weight-model-that-runs-on-macs/), a multimodal model built with Apple to run locally on Apple silicon through MLX. Reflection AI released [Beam, a 501B model for agentic coding](https://aws.amazon.com/blogs/machine-learning/introducing-reflection-beam-an-open-weight-model-for-agentic-coding-on-aws/), and DeepSeek shipped [V4.1 Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) plus a [search API for agents](https://api-docs.deepseek.com/guides/search/) at $0.75 per 1,000 requests.

## 3. AI-written code outgrows the tools built for humans

Anthropic [built its own alternative to Git](https://www.anthropic.com/engineering/redesigning-source-control) after merged changes went from about 2,500 a day in May to more than 30,000 in September. Spotify says AI [more than doubled its monthly code changes](https://www.infoq.com/news/2026/10/spotify-ai-quality-controls/) and forced new testing and rollback controls.

Review is the bottleneck. Postgres 19 [slipped to November](https://www.theregister.com/databases/2026/10/16/postgres-19-delayed-after-ai-reviewers-find-more-bugs-than-humans-can-fix/5303471) after AI reviewers found more bugs than the core team could fix, and Bank of America [brought in 1,000 contractors](https://www.theregister.com/security/2026/10/15/bank-of-america-had-to-bring-in-1000-contractors-to-patch-all-the-bugs-mythos-identified/5303275) to patch flaws found by Mythos. Anthropic engineers argue that "did a human read it?" is the wrong test and [describe review as a continuous check](https://simonwillison.net/2026/Oct/16/code-review/) that runs while the code is written.

## 2. Anthropic opens its books and its labs

Anthropic told investors that [quarterly revenue rose nearly 50 percent to $16.8 billion](https://simonwillison.net/2026/Oct/15/anthropic-tells-investors/) ahead of its IPO. It also said it will put [5 percent of its shares into a public benefit fund](https://techcrunch.com/2026/10/18/anthropic-says-its-committing-5-of-its-shares-to-a-public-benefit-fund/).

On oversight, Anthropic gave the evaluation group METR [employee-level access](https://techcrunch.com/2026/10/15/anthropic-is-letting-metr-researchers-look-under-the-hood-with-employee-level-access/) and gave up the right to block its published findings. A report says the FTC is [investigating whether security incidents](https://arstechnica.com/tech-policy/2026/10/ftc-probes-if-openai-anthropic-security-incidents-harmed-americans-report-says/) at Anthropic and OpenAI harmed Americans. The week also brought a customer loss: Replit [made OpenAI its default model provider](https://techcrunch.com/2026/10/17/replit-is-no-longer-working-with-anthropic-ceo-says/), although Claude stays available on the platform.

## 1. Google and Meta ship new flagships

Google released [Gemini 4 Argon](https://deepmind.google/blog/introducing-gemini-4-argon/), its new top model. It is in the Gemini app and the Antigravity coding tool, but [only for paying subscribers](https://arstechnica.com/ai/2026/10/gemini-4-argon-begins-rolling-out-in-gemini-app-and-antigravity-but-only-if-you-pay/), and API access is 50 percent off through November. DeepMind published a [safety report](https://deepmind.google/blog/developing-gemini-4-argon-responsibly-and-safely/) with it.

Meta's [Muse Wonder](https://www.wired.com/story/muse-wonder-puts-meta-back-at-the-ai-frontier/) models put the company back next to the best labs and add features to keep agents on task. Early testing found gaps: a Wired reporter [got a Muse agent to produce explicit content](https://www.wired.com/story/i-got-my-muse-ai-agent-to-sext-me-and-meta-says-thats-totally-fine/), and Meta said that was acceptable.

That is the list for October 12 to 18.

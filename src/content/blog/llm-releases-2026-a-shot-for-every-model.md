---
title: "If I had a shot for every LLM released this year, I would be an alcoholic"
description: "Every LLM released between January 1 and September 23, 2026: 101 releases from 26 labs, with verified dates, prices, context windows and headline benchmarks."
date: 2026-09-23
tags:
  - AI
  - Tools
draft: false
image: /blog/llm-releases-2026-a-shot-for-every-model/cover.jpg
---


Between January 1 and September 23, 2026, 26 labs shipped 101 language-model releases. That is one every 2.6 days. On September 22 alone, Anthropic released Claude Opus 5.5 and OpenAI released GPT-6 Sol and Luna about an hour later.

This is the full list, in date order. Every date below is confirmed by at least two independent sources, usually the vendor's own post plus press coverage. Items with a single source or conflicting dates are listed separately at the end.

## How to read the list

- The list was built from vendor blogs, API changelogs and press coverage, then checked against a daily news archive. Minor checkpoints and snapshot refreshes are not included.
- One entry per launch. A family released on the same day (GPT-5.6 Sol/Terra/Luna) counts once. A preview and its later general release count once.
- Speech, image, video and robotics models are excluded.
- Benchmark figures are the vendors' own unless marked (AA) for Artificial Analysis. Benchmark versions changed during the year (Terminal-Bench went from 2.0 to 4.0), so numbers from different months are not directly comparable.
- Prices are per million input/output tokens.

## January

- Jan 8: [Jamba2](https://www.ai21.com/blog/introducing-jamba2/) (AI21). Hybrid SSM-Transformer, 256K context, Apache 2.0.
- Jan 20: [LongCat-Flash-Thinking-2601](https://tech.meituan.com/2026/01/20/longcat-flash-thinking-2601.html) (Meituan). 560B MoE reasoning model, MIT licence.
- Jan 22: [ERNIE 5.0](https://www.scmp.com/tech/tech-trends/article/3340866/baidu-launches-ernie-50-firms-ai-assistant-users-reach-200-million-month) (Baidu). 2.4T-parameter omni-modal MoE, generally available after a November 2025 preview.
- Jan 27: [Kimi K2.5](https://github.com/MoonshotAI/Kimi-K2.5) (Moonshot). 1T parameters, 32B active, native vision, up to 100 coordinated sub-agents. SWE-bench Verified 76.8.

## February

- Feb 5: [Claude Opus 4.6](https://platform.claude.com/docs/en/release-notes/api) (Anthropic). $5/$25. Terminal-Bench 2.0 65.4%, ARC-AGI-2 68.8%.
- Feb 5: [GPT-5.3-Codex](https://openai.com/index/introducing-gpt-5-3-codex/) (OpenAI). In Codex Feb 5, API Feb 24. Terminal-Bench 2.0 77.3%, SWE-bench Pro 56.8%.
- Feb 11: [GLM-5](https://huggingface.co/blog/mlabonne/glm-5) (Zhipu). 744B/40B active, 200K context, MIT, $1.00/$3.20.
- Feb 12: [Gemini 3 Deep Think upgrade](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-deep-think/) (Google). ARC-AGI-2 84.6% (verified by ARC Prize), Humanity's Last Exam 48.4%.
- Feb 12: [MiniMax M2.5](https://www.minimax.io/news/minimax-m25) (MiniMax). 230B/10B active, open weights. SWE-bench Verified 80.2%, $0.15/$1.20.
- Feb 12: [GPT-5.3-Codex-Spark](https://www.cerebras.ai/blog/openai-codexspark) (OpenAI). Research preview on Cerebras hardware, over 1,000 tokens per second.
- Feb 14: [Doubao-Seed-2.0](https://technode.com/2026/02/14/bytedance-releases-doubao-seed-2-0-positions-pro-model-against-gpt-5-2-and-gemini-3-pro/) (ByteDance). Pro/Lite/Mini/Code, closed weights. SWE-bench Verified 76.5.
- Feb 16: [Qwen3.5](https://huggingface.co/Qwen/Qwen3.5-397B-A17B) (Alibaba). 397B/17B active, Apache 2.0, 262K native context. SWE-bench Verified 76.4.
- Feb 17: [Claude Sonnet 4.6](https://platform.claude.com/docs/en/release-notes/api) (Anthropic). $3/$15, 1M context in beta. SWE-bench Verified 79.6%.
- Feb 17: [Grok 4.20](https://www.nextbigfuture.com/2026/02/xai-launches-grok-4-20-and-it-has-4-ai-agents-collaborating.html) (xAI). Beta, API on Mar 10. Four-agent system, 2M context.
- Feb 19: [Gemini 3.1 Pro](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/) (Google). Preview. ARC-AGI-2 77.1%, more than double Gemini 3 Pro.

## March

- Mar 3: [GPT-5.3 Instant](https://venturebeat.com/orchestration/gpt-5-3-instant-cuts-hallucinations-by-26-8-as-openai-shifts-focus-from) (OpenAI). 26.8% fewer hallucinations with web search on high-stakes evals.
- Mar 3: [Gemini 3.1 Flash-Lite](https://siliconangle.com/2026/03/03/google-launches-speedy-gemini-3-1-flash-lite-model-preview/) (Google). Preview, GA May 7. $0.25/$1.50, 1M context.
- Mar 4: [Phi-4-reasoning-vision-15B](https://www.microsoft.com/en-us/research/blog/phi-4-reasoning-vision-and-the-lessons-of-training-a-multimodal-reasoning-model/) (Microsoft). 15B open multimodal reasoning model.
- Mar 5: [GPT-5.4 and 5.4 Pro](https://openai.com/index/introducing-gpt-5-4/) (OpenAI). $2.50/$15, about 1M context, native computer use. OSWorld 75% against a 72.4% human baseline.
- Mar 5: [Olmo Hybrid 7B](https://allenai.org/blog/olmohybrid) (Ai2). Fully open. Matches Olmo 3 on MMLU with 49% fewer training tokens.
- Mar 11: [Nemotron 3 Super](https://developer.nvidia.com/blog/introducing-nemotron-3-super-an-open-hybrid-mamba-transformer-moe-for-agentic-reasoning/) (NVIDIA). 120B/12B active hybrid Mamba-Transformer, 1M context, open weights.
- Mar 16: [Mistral Small 4](https://mistral.ai/news/mistral-small-4) (Mistral). 119B/6B active, Apache 2.0, $0.15/$0.60.
- Mar 17: [GPT-5.4 mini and nano](https://openai.com/index/introducing-gpt-5-4-mini-and-nano/) (OpenAI). $0.75/$4.50 and $0.20/$1.25.
- Mar 18: [MiniMax M2.7](https://www.minimax.io/news/minimax-m27-en) (MiniMax). Weights on Apr 12. SWE-Pro 56.2%.
- Mar 18: [MiMo-V2-Pro](https://venturebeat.com/technology/xiaomi-stuns-with-new-mimo-v2-pro-llm-nearing-gpt-5-2-opus-4-6-performance) (Xiaomi). 1T/42B active, 1M context, $1/$3. Previously tested anonymously as "Hunter Alpha".

## April

The busiest month: 16 releases, 13 of them with two-source dates.

- Apr 2: [Gemma 4](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/) (Google). Open weights up to 31B, Apache 2.0, 256K context, 140+ languages.
- Apr 7: [Claude Mythos Preview](https://red.anthropic.com/2026/mythos-preview/) (Anthropic). Restricted to security partners in Project Glasswing.
- Apr 7: [GLM-5.1](https://rits.shanghai.nyu.edu/ai/glm-5-1-z-ais-open-weight-model-takes-1-on-swe-bench-pro/) (Zhipu). Open weights, MIT. SWE-bench Pro 58.4, first place at release.
- Apr 8: [Muse Spark](https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/) (Meta). First model from Meta Superintelligence Labs. Closed weights. Meta shipped no Llama model this year.
- Apr 16: [Claude Opus 4.7](https://www.anthropic.com/news/claude-opus-4-7) (Anthropic). SWE-bench Pro 64.3%, up from 53.4%. New tokenizer.
- Apr 16: [Qwen3.6-35B-A3B](https://qwen.ai/blog?id=qwen3.6-35b-a3b) (Alibaba). 35B/3B active, Apache 2.0. SWE-bench Verified 73.4.
- Apr 17: [Grok 4.3](https://artificialanalysis.ai/articles/xai-launches-grok-4-3-with-improved-agentic-performance-and-lower-pricing) (xAI). API on Apr 30. 1M context, video input, $1.25/$2.50.
- Apr 22: [MiMo-V2.5-Pro](https://venturebeat.com/technology/open-source-xiaomi-mimo-v2-5-and-v2-5-pro-are-among-the-most-efficient-and-affordable-at-agentic-claw-tasks) (Xiaomi). 1.02T/42B active, 1M context, MIT.
- Apr 23: [GPT-5.5 and 5.5 Pro](https://openai.com/index/introducing-gpt-5-5/) (OpenAI). API on Apr 24. $5/$30, twice the price of GPT-5.4. Terminal-Bench 2.0 82.7%.
- Apr 23: [Hy3 preview](https://huggingface.co/tencent/Hy3-preview) (Tencent). 295B/21B active, 256K context. Licence excluded the EU, UK and South Korea.
- Apr 24: [DeepSeek-V4 Preview](https://api-docs.deepseek.com/news/news260424/) (DeepSeek). V4-Pro 1.6T/49B active, V4-Flash 284B/13B active. MIT, 1M context by default. Flash at $0.14/$0.28.
- Apr 28: [Nemotron 3 Nano Omni](https://blogs.nvidia.com/blog/nemotron-3-nano-omni-multimodal-ai-agents/) (NVIDIA). 30B/3B active, text, image, video and audio input.
- Apr 29: [Granite 4.1](https://research.ibm.com/blog/granite-4-1-ai-foundation-models) (IBM). Dense 3B/8B/30B, up to 512K context, Apache 2.0.

## May

- May 19: [Gemini 3.5 Flash](https://techcrunch.com/2026/05/19/with-gemini-3-5-flash-google-bets-its-next-ai-wave-on-agents-not-chatbots/) (Google). GA at I/O. Terminal-Bench 2.1 76.2%, $1.50/$9.
- May 19: [Qwen3.7-Max](https://llm-stats.com/models/qwen3.7-max) (Alibaba). Proprietary. GPQA 92.4.
- May 20: [Command A+](https://cohere.com/blog/command-a-plus) (Cohere). 218B/25B active. First Cohere flagship under Apache 2.0.
- May 28: [Claude Opus 4.8](https://platform.claude.com/docs/en/release-notes/api) (Anthropic). 1M context. SWE-bench Verified 88.6%, GPQA 93.6%. Fast mode 3x cheaper.
- May 29: [Step 3.7 Flash](https://www.marktechpost.com/2026/05/29/stepfun-releases-step-3-7-flash-a-198b-moe-vision-language-model-for-coding-agents-and-search-workflows/) (StepFun). 198B vision-language MoE, Apache 2.0, $0.20/$1.15.

## June

- Jun 1: [MiniMax M3](https://platform.minimax.io/docs/release-notes/models) (MiniMax). 1M context, image and video input. SWE-bench Pro 59.0%, $0.60/$2.40.
- Jun 2: [Seven MAI models](https://microsoft.ai/news/building-a-hillclimbing-machine-launching-seven-new-mai-models/) (Microsoft). Led by MAI-Thinking-1, 35B active, 256K context, trained in-house.
- Jun 4: [Nemotron 3 Ultra](https://research.nvidia.com/labs/nemotron/Nemotron-3-Ultra/) (NVIDIA). 550B/55B active, 1M context, open weights. Index 48 (AA).
- Jun 8: [Apple Foundation Models 3](https://machinelearning.apple.com/research/introducing-third-generation-of-apple-foundation-models) (Apple). Announced at WWDC, ships with OS 27. A 3B on-device model, a 20B sparse on-device model and cloud models.
- Jun 9: [Claude Fable 5 and Mythos 5](https://www.anthropic.com/news/claude-fable-5-mythos-5) (Anthropic). A new tier above Opus, $10/$50, 1M context. Mythos 5 limited to vetted organizations. Both suspended Jun 12, restored Jul 1.
- Jun 13: [GLM-5.2](https://datanorth.ai/news/zhipu-ai-releases-glm-5-2) (Zhipu). 1M context, MIT. SWE-bench Pro 62.1. Top open model at index 51 (AA).
- Jun 24: [Seed 2.1 Pro and Turbo](https://datanorth.ai/news/bytedance-releases-seed-2-1-pro-and-seed-2-1-turbo) (ByteDance). Closed weights.
- Jun 30: [Claude Sonnet 5](https://techcrunch.com/2026/06/30/anthropic-launches-claude-sonnet-5-as-a-cheaper-way-to-run-agents/) (Anthropic). $2/$10, 1M context, 128K output.
- Jun 30: [LongCat-2.0](https://www.marktechpost.com/2026/07/05/meituan-releases-longcat-2-0-a-1-6t-parameter-open-moe-model-with-native-1m-context-and-longcat-sparse-attention/) (Meituan). 1.6T/48B active, 1M context, trained on Chinese chips, MIT.

## July

- Jul 6: [Hy3](https://technode.com/2026/07/07/tencent-launches-hunyuan-hy3-integrates-model-across-multiple-products/) (Tencent). Official release, now Apache 2.0 with no regional exclusions.
- Jul 8: [Grok 4.5](https://www.axios.com/2026/07/08/spacexai-grok-new-model) (xAI). 500K context, $2/$6. SWE-bench Pro 64.7%.
- Jul 9: [GPT-5.6 Sol, Terra and Luna](https://techcrunch.com/2026/07/09/openai-launches-its-new-family-of-models-with-gpt-5-6/) (OpenAI). Partner preview from Jun 26. 1M context. Sol $5/$30, Terra $2.50/$15, Luna $1/$6.
- Jul 9: [Muse Spark 1.1](https://ai.meta.com/blog/introducing-muse-spark-meta-model-api/) (Meta). 1M context, public API preview.
- Jul 15: [Inkling](https://www.wired.com/story/thinking-machines-lab-releases-its-first-model-inkling/) (Thinking Machines). 975B multimodal, Apache 2.0. First model from the lab.
- Jul 16: [Kimi K3](https://thenextweb.com/news/moonshot-kimi-k3-largest-open-model) (Moonshot). 2.8T parameters, about 50B active, the largest open-weight model to date. Weights on Jul 27.
- Jul 19: [Qwen3.8-Max](https://www.alibabacloud.com/en/press-room/alibaba-unveils-qwen3-8-max) (Alibaba). Preview, GA Aug 3. 2.4T/95B active, 1M context, $2/$6.
- Jul 21: [Gemini 3.6 Flash and 3.5 Flash-Lite](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/) (Google). OSWorld-Verified 83.0% for 3.6 Flash.
- Jul 24: [Claude Opus 5](https://techcrunch.com/2026/07/24/anthropic-launches-opus-5/) (Anthropic). $5/$25, half the price of Fable 5.
- Jul 31: [DeepSeek V4-Flash-0731](https://simonwillison.net/2026/Jul/31/deepseek-v4-flash-0731/) (DeepSeek). Final V4-Flash checkpoint after the preview.

## August

- Aug 4: [LFM2.5-2.6B](https://aiweekly.co/alerts/liquid-ai-ships-lfm25-26b-agent-model-that-runs-on-device) (Liquid AI). On-device agent model.
- Aug 5: [Muse Spark 1.2 and Muse Code](https://simonwillison.net/2026/Aug/5/muse-code-and-muse-spark-12/) (Meta). Muse Code is a terminal coding agent.
- Aug 10: [Muse Glimmer](https://www.cnbc.com/2026/08/10/meta-muse-glimmer-open-weight-ai.html) (Meta). 30B, Apache 2.0, runs on one 24 GB GPU.
- Aug 12: [Grok 4.6](https://9to5mac.com/2026/08/12/spacexai-releases-grok-4-6/) (xAI). $2/$6. Index 61, level with GPT-5.6 Sol (AA).
- Aug 12: [Qwen3.8 open weights](https://en.wikipedia.org/wiki/Qwen) (Alibaba). Open version of 3.8-Max. Commercial licence required above $50M revenue.
- Aug 13: [Gemini 3.7 Flash](https://venturebeat.com/technology/googles-gemini-3-7-flash-targets-coding-and-agents-with-a-50-introductory-price-cut) (Google). $0.75/$3.75 introductory price until Dec 31.
- Aug 13: [DeepSeek V4-Pro GA](https://api-docs.deepseek.com/news/news260813/) (DeepSeek). Low/high/max reasoning effort, 50% off-peak discount.
- Aug 14: [GLM-5.3](https://the-decoder.com/zhipu-ai-releases-glm-5-3-claims-its-the-strongest-open-weights-coding-model/) (Zhipu). $1.40/$4.40. Terminal-Bench 3.0 28.3%, up from 4.6%.
- Aug 14: [Qwen3.8-27B](https://simonwillison.net/2026/Aug/17/qwen-38-27b-scores-52/) (Alibaba). Dense 27B, Apache 2.0. Index 52 (AA).
- Aug 26: [Qwen3.8-Flash](https://www.bloomberg.com/news/articles/2026-08-26/alibaba-releases-smaller-cost-effective-qwen-ai-model) (Alibaba). Fast proprietary tier.
- Aug 26: [GLM-5.3-Flash](https://technode.com/2026/08/27/zhipu-identifies-ox-alpha-as-glm-5-3-flash-and-releases-model-weights/) (Zhipu). 320B/18B active, open weights. The stealth model "Ox Alpha".
- Aug 28: [Hy4 preview](https://www.tencent.com/tencent-releases-and-open-sources-tencent-hy4-preview/) (Tencent). 770B/49B active, 1M context, $0.83/$2.50.

## September

- Sep 1: [Claude Fable 5.1 and Mythos 5.1](https://venturebeat.com/technology/anthropics-claude-fable-5-1-and-mythos-5-1-arrive-with-a-75-cost-reduction-for-fable-cache-reads) (Anthropic). List price unchanged at $10/$50, cache reads 75% cheaper.
- Sep 2: [Gemini 3.8 Flash](https://9to5google.com/2026/09/02/gemini-3-8-flash-launch/) (Google). Third Flash in six weeks. Terminal-Bench 2.1 90.8%, $0.75/$3.75.
- Sep 3: [GPT-6 Astra](https://www.cnbc.com/2026/09/03/open-ai-astra-gpt-6-cyber.html) (OpenAI). Vetted users first, GA Sep 4. $10/$50, 1.05M context. First model OpenAI rates "Critical" for cybersecurity.
- Sep 10: [DeepSeek V4.1-Flash](https://api-docs.deepseek.com/news/news260910/) (DeepSeek). 552B MoE, new encoder-decoder design, KV cache at a quarter of the memory.
- Sep 21: [Grok 4.7](https://siliconangle.com/2026/09/21/spacex-launches-grok-4-7-with-long-horizon-processing-safety-upgrades/) (xAI). New base model, 500K context, $2/$6.
- Sep 22: [Claude Opus 5.5](https://www.anthropic.com/news/claude-opus-5-5) (Anthropic). $4/$20, down from $5/$25. Terminal-Bench 4.0 66.4% against 52.3% for Opus 5.
- Sep 22: [GPT-6 Sol and Luna](https://techcrunch.com/2026/09/22/openai-launches-gpt-6-sol-and-luna/) (OpenAI). Cheaper models derived from Astra.
- Sep 22: [MiMo-V2.6](https://siliconangle.com/2026/09/22/xiaomi-introduces-mimo-v2-6-series-open-source-ai-model-family/) (Xiaomi). Omni-modal, 1M context, MIT. Top open model at index 46 (AA).

## One source only, or conflicting dates

These releases happened, but only one source gives the exact date, or the sources disagree:

- Jan 5, LFM2.5-1.2B (Liquid AI). Jan 14, GPT-5.2-Codex in the API (OpenAI). Jan 19, GLM-4.7-Flash (Zhipu).
- Step 3.5 Flash (StepFun): Jan 29, Feb 2 or Feb 12.
- Qwen3.6-Plus (Alibaba): Mar 31 or April.
- Apr 1, GLM-5V-Turbo (Zhipu). Apr 20, Kimi K2.6 (Moonshot).
- Mistral Medium 3.5: Apr 29 or 30. ERNIE 5.1 (Baidu): Apr 29 or May 8.
- May 28, LFM2.5-8B-A1B (Liquid AI). Early June, Gemma 4 12B (Google). Jun 11, DiffusionGemma (Google). Jun 14, Kimi K2.7-Code (Moonshot). June, Qwen3.7-Plus (Alibaba).
- Aug 10, GPT-5.6-Cyber (OpenAI). Aug 21, V4-Flash-Vision-Exp (DeepSeek). Sep 2, Muse Spark 1.3 (Meta). Sep 17, Qwen3.8-Omni-Flash (Alibaba). Sep 18, GLM-5.3-FlashX (Zhipu).

## Counts

All 101 releases, including the single-source ones:

- By vendor: OpenAI 11. Anthropic, Google and Alibaba 10 each. Zhipu 8. xAI, Meta and DeepSeek 5 each.
- By month: Jan 7, Feb 12, Mar 11, Apr 16, May 7, Jun 13, Jul 10, Aug 14, Sep (to the 23rd) 11.
- 57 releases came from US and European labs, 44 from Chinese labs.

## What changed over the year

Flagship prices moved in opposite directions. OpenAI's top model went from $2.50/$15 (GPT-5.4) to $10/$50 (GPT-6 Astra). Anthropic's Opus went from $5/$25 to $4/$20. Google launched Gemini 3.7 and 3.8 Flash at $0.75/$3.75.

1M-token context became standard by mid-year: GPT-5.6 and GPT-6, every Claude model from Opus 4.8 on, Gemini Flash, DeepSeek V4, Kimi K3, GLM-5.2, MiniMax M3 and Qwen3.8-Max.

Chinese open-weight releases converged on one design: sparse MoE with 20 to 50B active parameters, 1M context, SWE-bench Pro between 57 and 62, and prices under $1.50 input.

## Announced but not released by September 23

Gemini 3.5 Pro (announced at I/O in May, still in partner testing), Gemini 4, Grok 5, DeepSeek R2, OpenAI o5, a new gpt-oss, Qwen 4, any new Llama, Mistral Large 4, a new Claude Haiku.

Cover image: Anthropic, [Claude Opus 5.5 announcement page](https://www.anthropic.com/news/claude-opus-5-5), September 22, 2026.

---
title: "AI Weekly Digest: The Top 10 Things to Know This Week (Week of November 9, 2026)"
description: "Jensen Huang resigns at Nvidia, Anthropic ships Fable 5.2 and Mythos 5.2, Google rolls out Gemini 4 Hydrogen, ChatGPT Wallet lets agents pay, and more."
date: 2026-11-16
image: /blog/ai-weekly-digest-week-of-2026-11-09/cover.jpg
tags:
  - AI
  - Tools
draft: false
---

The week began with an investigation at Nvidia and ended with a new CEO there. Around that story, Anthropic and Google shipped new models, agents got the ability to pay for things, and the rules around AI got tighter, both in law and inside large companies. Here are the ten stories that mattered most, counting down to the biggest.

## 10. llama.cpp reaches version 1.0

The project that made it practical to run language models on a laptop is now stable. llama.cpp and its ggml library [both reached 1.0](https://huggingface.co/blog/ggml-org/llama-cpp-v1), with a [tagged ggml release](https://github.com/ggml-org/ggml/releases/tag/v1.0.0) to build on.

Open-weight models kept pace. Unsloth published [new Qwen3.8-27B quantizations](https://unsloth.ai/docs/models/qwen3.8), and a retrained Qwen3.8 [now answers questions](https://www.theregister.com/ai-and-ml/2026/11/13/alibabas-qwen38-re-educated-with-a-more-western-worldview/5309555) the original model was trained to avoid.

## 9. Data centers become an election issue

After the US midterms, analysts said the [outlook for data center expansion](https://techcrunch.com/2026/11/07/after-the-midterms-things-are-looking-rocky-for-elon-musk-and-data-centers/) got harder. In Michigan, a candidate who [ran against data centers](https://www.wired.com/story/he-ran-on-fighting-data-centers-now-hes-going-to-congress/) won a House seat and plans to push for a federal moratorium.

Reporting from Virginia suggests the backlash is [mostly about electricity bills](https://www.technologyreview.com/2026/11/09/1148194/the-backlash-about-data-centers-might-really-just-be-about-electricity/). In the same week Anthropic [bought $3.4 billion of gas turbines](https://techcrunch.com/2026/11/09/anthropic-joins-ais-natural-gas-frenzy-buys-3-4b-worth-of-turbines/).

## 8. DeepMind proves Signal's encryption with AI agents

Google DeepMind introduced [AlphaProof Code](https://deepmind.google/blog/introducing-alphaproof-code/). AI agents and human experts wrote about three million lines of Lean proofs that cover Signal's post-quantum handshake and its Triple Ratchet, [Wired reports](https://www.wired.com/story/a-new-ai-tool-from-google-deepmind-formally-verified-the-signal-protocol/).

A machine checks every proof. DeepMind says the long-term aim is the same kind of guarantee for software in general.

## 7. Robots get their own foundation models

At the CoRL conference, Nvidia launched [GR00T 2 and Isaac Lab 3.0](https://www.therobotreport.com/nvidia-launches-gr00t-2-isaac-lab-3-0-corl/), and Google released [Gemini 4 Argon](https://www.infoq.com/news/2026/11/google-gemini-argon/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=global) for robot control and simulation.

GR00T 2 predicts future video and robot actions together, so a skill learned on one machine can move to another. Runway's world-action model [Praxis-1 is now available](https://www.therobotreport.com/runways-praxis-1-world-action-model-for-robotics-is-now-available/) with open weights.

## 6. AI safety laws start to apply

New York's AI safety law [took effect](https://techcrunch.com/2026/11/10/openai-anthropic-face-new-oversight-as-new-yorks-ai-safety-law-takes-effect/). OpenAI, Anthropic and other large developers must register, disclose their safety practices and report critical incidents.

Australia may make [knowingly selling unsafe AI a crime](https://www.theregister.com/public-sector/2026/11/11/australia-may-make-knowingly-selling-unsafe-ai-a-crime/5308999). OpenAI also described a [kill switch for its research models](https://www.theregister.com/ai-and-ml/2026/11/11/openai-builds-a-kill-switch-for-its-research-models/5309006) that it says can stop one in about 35 seconds.

## 5. AI tools leak secrets and customer data

Claude Code settings files committed to GitHub are [exposing thousands of secrets](https://arstechnica.com/ai/2026/11/claude-code-settings-files-expose-thousands-of-secrets-on-github/). A breach at inference provider Fireworks AI [reached Notion's customers](https://www.notion.com/help/security-incident-involving-a-third-party-ai-vendor).

A researcher found 35,000 apps built with xAI's Grok Build agent [left open](https://arstechnica.com/security/2026/11/grok-build-coding-agent-leaks-oodles-of-confidential-info-some-belonging-to-spacexsi/), some with confidential SpaceX data. Hugging Face warned that rising attacks [could force open AI platforms to lock down](https://techcrunch.com/2026/11/10/cyberattacks-threaten-to-make-open-source-ai-a-little-less-open-hugging-face-exec-warns/).

## 4. Agents get a wallet, and companies set limits

OpenAI launched [ChatGPT Wallet](https://openai.com/index/introducing-chatgpt-wallet), which lets agents in ChatGPT, Codex and Dots complete purchases after the user approves. It starts with US Pro subscribers and major US cards.

Not everyone wants agents as customers. United Airlines said personal AI agents [may not book its flights](https://www.theverge.com/ai-artificial-intelligence/1031623/united-unauthorized-ai-agents). Inside companies, Goldman Sachs is reportedly [pulling Claude Code from bankers and traders](https://www.thestateofai.com/news/goldman-sachs-claude-code-traders-bankers), and Apple is said to [cap engineers at $200 a day](https://www.stork.ai/newsletter/2026-11-08-apple-capped-engineers-at-a-200-daily-ai-budget#story-1) in AI spending.

## 3. Google ships a week of Gemini models

[Gemini 4 Hydrogen](https://deepmind.google/blog/introducing-gemini-4-hydrogen/) replaced 3.8 Flash in a fast, broad rollout and now powers [AI Mode in Search](https://blog.google/products-and-platforms/products/search/gemini-4-hydrogen-search-upgrade/). Gemini 4 Carbon, first limited to cyber defenders, [is open to everyone](https://deepmind.google/blog/gemini-4-carbon-is-now-available/).

Developers also got the [Gemini Decisions API](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/) for fast multimodal decisions. DeepMind released [AlphaGenome 2](https://www.theverge.com/ai-artificial-intelligence/1031524/google-deepmind-alphagenome-2-genetic-ai-model), which predicts how DNA variants affect specific cell types.

## 2. Anthropic ships Fable 5.2 and Mythos 5.2

Anthropic [released two new models](https://techcrunch.com/2026/11/09/anthropic-releases-new-mythos-and-fable-models-amid-rsi-concerns/). Fable 5.2 took first place on Artificial Analysis, and Mythos's bug-finding is [going into Cisco and IBM products](https://www.theregister.com/ai-and-ml/2026/11/10/anthropics-super-bug-finding-mythos-model-is-going-into-cisco-and-ibm-products/5308616). The company is reportedly [seeking a $1.3 trillion valuation](https://www.wsj.com/finance/stocks/anthropic-to-seek-1-3-trillion-valuation-in-ipo-8337b669) in its IPO.

The money around the frontier labs kept growing. OpenAI's quarterly revenue reportedly [passed $10 billion](https://techcrunch.com/2026/11/11/openais-quarterly-revenue-reportedly-crosses-10b-for-the-first-time/) for the first time, and TSMC will [invest $1 billion in Anthropic and OpenAI](https://arstechnica.com/ai/2026/11/taiwans-chipmaking-giant-tsmc-to-invest-1b-in-anthropic-openai/). CoreWeave, meanwhile, is [asking customers to pay up front](https://techcrunch.com/2026/11/11/coreweave-turns-to-customer-prepayments-shorter-contracts-to-fund-ai-growth/) to fund its build-out.

## 1. Jensen Huang resigns as Nvidia CEO

Early in the week, Nvidia's board [opened an investigation](https://www.theverge.com/ai-artificial-intelligence/1029562/nvidia-investigating-jensen-huang-relationship-chinese-spy) into Huang's relationship with a Megaspeed executive whom a US intelligence memo describes as recruited by China's Ministry of State Security. By Wednesday the board was [reportedly preparing to remove him](https://techcrunch.com/2026/11/11/nvidias-stock-drops-as-board-reportedly-preps-to-oust-ceo-jensen-huang/), and on Thursday he [resigned](https://www.theregister.com/systems/2026/11/12/jensen-huang-resigns-as-nvidia-chief-executive/5309411). Colette Kress is the new CEO.

The fallout reached beyond the company, which sells most of the chips the industry trains its models on. A forensic report found that China's top models from DeepSeek, Moonshot AI, MiniMax and Ant Group were [trained on export-banned Blackwell chips](https://www.theregister.com/ai-and-ml/2026/11/13/chinese-ai-labs-are-training-models-on-nvidias-blackwell-despite-export-controls-says-ex-openai-engineer/5309891). Founders and VCs expect [smaller checks for AI startups](https://techcrunch.com/2026/11/13/jensen-huangs-departure-blasts-big-hole-in-ai-startup-funding-vcs-and-founders-say/), and by the weekend Elon Musk and other executives had [signed a petition](https://techcrunch.com/2026/11/14/elon-musk-other-tech-execs-sign-petition-calling-on-nvidia-to-reinstate-jensen-huang/) asking Nvidia to bring him back.

Next week will show whether Nvidia's new leadership changes its course on China and on open-source models. The daily editions are on the [AI Digest page](https://jacopocastellano.com/ai-digest/).

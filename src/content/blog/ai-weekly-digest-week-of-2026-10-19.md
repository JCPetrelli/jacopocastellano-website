---
title: "AI Weekly Digest: The Top 10 Things to Know This Week (Week of October 19, 2026)"
description: "AI-found bugs swamp open source while agents breach 2,250 cloud tenants, OpenAI seeks a $1.25T valuation and seals off its training runs, and LLM prices fall up to 80%."
date: 2026-10-26
image: /blog/ai-weekly-digest-week-of-2026-10-19/cover.jpg
tags:
  - AI
  - Tools
draft: false
---

Security led the week. Models are finding bugs faster than open-source maintainers can fix them, and attackers are using agents to exploit them. OpenAI looked for money at a $1.25 trillion valuation and cut its own training runs off from the internet. API prices kept falling, and the big clouds went after Nvidia's software lock-in. The ten stories that mattered most, counting down to the biggest.

## 10. Decision models become their own product category

OpenAI made its [Decisions API generally available](https://openai.com/index/decisions-api). These small, cheap models return a typed choice instead of free text, and OpenAI aims them [directly at Jev](https://techcrunch.com/2026/10/22/openai-makes-its-jev-competitor-widely-available-as-decision-model-competition-heats-up/). Microsoft has its own entry, [Decision-1](https://shattered.io/microsoft-decision-1-qwen3-5-9b-model-2026/), a 9B model built on Qwen.

UiPath now [connects Jev models to its automation platform](https://www.uipath.com/blog/product-and-updates/typesafe-connector-bring-jev-models-to-uipath), and tutorials show [hybrid workflows](https://towardsdatascience.com/decision-models-in-action-build-a-hybrid-llm-workflow/) where an LLM writes and a decision model routes.

## 9. Meta's Muse is a hit, and a privacy problem

Meta's AI app [reached 10 million US downloads in 40 days](https://techcrunch.com/2026/10/20/metas-muse-hits-10m-u-s-downloads-in-40-days-a-milestone-reached-by-only-11-other-apps/), and it keeps users better than its rivals do. In the same week, shared Muse conversations [exposed personal and business secrets](https://arstechnica.com/security/2026/10/meta-muse-exposes-users-personal-and-business-secrets-when-they-share-conversations/), so Meta paused sharing.

About 80 WhatsApp help pages also [leaked a chatbot's hidden instructions](https://www.wired.com/story/whatsapp-help-pages-leaked-hidden-instructions-for-a-meta-chatbot/). Meta also [removed the word "train"](https://arstechnica.com/tech-policy/2026/10/meta-drops-the-word-train-from-its-commercial-tos-after-ai-backlash/) from its commercial terms after a backlash.

## 8. More doubts about the return on AI spending

An Apollo economist says AI has delivered [zero financial payoff to most companies](https://techcrunch.com/2026/10/25/ai-delivers-zero-financial-payoff-to-most-companies-according-to-apollo-economist/). Forrester expects AI to take [a fifth of tech budgets in 2027](https://www.theregister.com/ai-and-ml/2026/10/21/ai-will-eat-a-fifth-of-tech-budgets-in-2027-but-dont-expect-it-to-pay-for-itself/5304466), but it predicts only isolated wins.

Building the data centers is also getting harder. Local groups in the US are [organizing against new data centers](https://www.wired.com/story/what-the-us-anti-data-center-movement-can-learn-from-everywhere-else/), and UK projects are [stuck in government permitting](https://www.theregister.com/public-sector/2026/10/25/want-to-build-a-uk-datacenter-please-hold-while-whitehall-transfers-you/).

## 7. Anthropic's safety bill draws criticism as compute gets tight

Anthropic's draft AI safety bill would only block a model that [could kill 50 or more people](https://techcrunch.com/2026/10/20/anthropic-pitches-ai-safety-bill-that-may-block-a-model-if-50-people-could-be-killed/). Critics point out that it also stops federal agencies from halting a release without a judge's approval, and safety writers say the company [does not understand why the draft was troubling](https://www.lesswrong.com/posts/qxAroimgs4BvBHz2i/anthropic-does-not-understand-why-its-draft-bill-was).

Separately, Anthropic reportedly [struggles to get enough compute](https://techcrunch.com/2026/10/20/anthropics-cloud-partnerships-are-getting-messy/) from cloud partners that now see it as a competitor. Its IPO is planned for November.

## 6. Robot foundation models keep raising money

Eka Robotics, now [valued at $1.45B](https://techcrunch.com/2026/10/20/eka-is-worth-1-45-billion-thanks-to-a-physical-ai-model-that-has-experts-raving/), [raised $150M](https://www.therobotreport.com/eka-robotics-raises-150m-scale-vision-force-action-model-robots/) for its vision-force-action model. Dream Labs [raised $90M](https://www.therobotreport.com/dream-labs-raises-90m-and-launches-dream-api/) for a model that works across robots from different makers, and Google DeepMind showed Gemini 4 Argon [teaching Apptronik's Apollo humanoid from video](https://roboticsandautomationnews.com/2026/10/22/google-deepmind-uses-gemini-4-argon-to-teach-apptroniks-apollo-humanoid-new-skills-from-video/106227/).

Deployments are getting bigger too. Gecko Robotics won a [$300M US Navy contract](https://www.therobotreport.com/gecko-robotics-earns-300m-contract-with-the-u-s-navy/), AGCO will [pilot Agility's Digit humanoid](https://www.therobotreport.com/agco-to-deploy-agility-digit-humanoid-in-kansas-factory/) in a Kansas factory, and Schaeffler opened a plant where [humanoids will build humanoids](https://roboticsandautomationnews.com/2026/10/26/schaeffler-opens-lighthouse-factory-in-taicang-where-humanoids-will-make-humanoids/106303/).

## 5. The clouds go after Nvidia's software lock-in

Google [open-sourced TorchTPU](https://techcrunch.com/2026/10/20/google-has-joined-amazon-in-attacking-nvidias-stronghold-with-ai-app-developers/), a native PyTorch back end for its TPUs. This follows Amazon's Trainium work, and Hugging Face [added support on launch day](https://huggingface.co/blog/hf-torchtpu).

Nvidia answered at GTC Berlin. Jensen Huang pitched the DSX Pod, a [plug-in data center for Europe](https://www.wired.com/story/jensen-huangs-vision-for-europe-runs-on-plug-in-data-centers/) that Nvidia says can be deployed in two weeks. The company also released [more open-weight models](https://www.theregister.com/ai-and-ml/2026/10/21/nvidia-woos-wary-europeans-with-more-open-weights-models/5304552) and is [funding suppliers like Samsung](https://www.theregister.com/ai-and-ml/2026/10/22/to-help-world-gorge-on-gpus-nvidia-brings-cash-bucket-to-fatten-wafer-thin-supply-chain/5304623) to ease GPU shortages.

## 4. LLM prices fell by up to 80 percent

OpenAI and Anthropic [cut API prices by up to 80 percent](https://minimaxir.com/2026/10/cheap-llms/) within a few months, and one analysis argues the low prices will last. Developers are advised to [review their model routing and caching](https://dev.to/ashraf_chowdury09/llm-prices-fell-up-to-80-in-months-heres-what-to-change-in-your-stack-35mi).

IBM's CEO adds that open-weight models are now [good and cheap enough to run on-prem](https://www.theregister.com/systems/2026/10/22/ibm-ceo-says-open-weight-models-are-now-irresistibly-good-and-cheap-on-prem/5304640).

## 3. OpenAI cuts its training runs off from the internet

OpenAI says it will [no longer train frontier models on the live internet](https://techcrunch.com/2026/10/23/openai-says-it-will-no-longer-train-its-ai-models-on-the-live-internet-citing-significant-risks/), citing significant risks, and it published how it [secured its training environment](https://openai.com/index/securing-our-frontier-model-training-environment). The change came after a red-team report found that OpenAI's monitoring [failed to catch its agents during the Hugging Face attack](https://www.theregister.com/ai-and-ml/2026/10/23/red-team-report-found-openai-utterly-failed-to-monitor-its-agents-during-hugging-face-attack/5305200).

## 2. OpenAI chases a $1.25 trillion valuation

OpenAI is reportedly [raising $30B at a $1.25 trillion valuation](https://techcrunch.com/2026/10/22/openai-working-on-new-30b-raise-at-1-25t-valuation-ahead-of-ipo/) ahead of an IPO. That would make it the most valuable private company ever.

It is also expanding fast. Its models are [now available in Google Cloud](https://openai.com/index/openai-models-google-cloud), ChatGPT Ads [expanded to 26 more countries](https://openai.com/index/chatgpt-ads-expands-26-new-countries), Uber rolled [ChatGPT Work out to all 30,000 employees](https://techcrunch.com/2026/10/22/uber-puts-all-30000-employees-on-chatgpt-work/), and OpenAI is [acquiring Orchestra Bio](https://openai.com/index/openai-to-acquire-orchestra-bio) to move into drug development.

## 1. AI speeds up both bug hunting and hacking

Maintainers can't keep up with AI-found bugs. curl will [publish low and medium severity flaws openly](https://www.theregister.com/security/2026/10/20/swamped-curl-maintainers-take-low-level-flaws-public-to-survive-vulnerability-avalanche/5304198) from October 26, and PHP patched [two critical flaws that attackers were already using](https://www.infoq.com/news/2026/10/php-critical-rce-patches/). Wired says AI made these bugs [faster to exploit at internet scale](https://www.wired.com/story/kernel-panic-the-php-meltdown-shows-how-ai-makes-bugs-more-exploitable/).

Attackers are using agents directly. Microsoft says a China-aligned group used AI agents to [move through 2,250 cloud tenants](https://www.theregister.com/security/2026/10/22/microsoft-says-connectwise-breach-let-chinese-spies-loose-on-2250-cloud-tenants/5304687) after breaching ConnectWise, and a [supply chain attack on LiteLLM](https://www.theregister.com/security/2026/10/21/litellm-supply-chain-attack-hoovers-up-passwords-and-secrets/5304548) stole passwords and API keys.

Labs are offering help on the defense side. Anthropic launched a [free opt-in scanner for open-source projects](https://www.infoq.com/news/2026/10/anthropic-oss-security-scanner/), and OpenAI started [Patch the Planet](https://openai.com/index/coordinated-disclosure-of-critical-vulnerabilities) to coordinate fixes. Linus Torvalds says AI is fine for competent developers, but [not for drive-by patches](https://www.theregister.com/columnists/2026/10/23/torvalds-ai-is-fine-for-competent-devs-but-spare-us-the-drive-by-patches/5304357).

That is the list for October 19 to 25.

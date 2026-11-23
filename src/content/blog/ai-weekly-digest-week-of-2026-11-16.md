---
title: "AI Weekly Digest: The Top 10 Things to Know This Week (Week of November 16, 2026)"
description: "Nvidia's first week without Jensen Huang, Anthropic's record IPO, California suing OpenAI over runaway agents, GPT-6.2 and a Claude-assisted Riemann proof."
date: 2026-11-23
image: /blog/ai-weekly-digest-week-of-2026-11-16/cover.jpg
tags:
  - AI
  - Tools
draft: false
---

Two stories took most of the attention this week: Nvidia without Jensen Huang, and Anthropic's debut on Nasdaq. Around them, AI agents kept getting more capable and more troublesome. A state sued OpenAI over agents it says ran out of control, and attackers used agents to break into systems on their own. The ten stories below are ranked by how many independent outlets covered them and how much they change, counting down to the biggest.

## 10. Robots get better hands, and robotaxis change course

Google DeepMind released [Gemini Robotics 2.5](https://roboticsandautomationnews.com/2026/11/15/google-deepmind-launches-gemini-robotics-2-5-with-improved-dexterity-and-industrial-capabilities/107186/), a vision-language-action model for harder industrial tasks, and Ant Group's Robbyant open-sourced [LingBot-Touch](https://roboticsandautomationnews.com/2026/11/15/robbyant-launches-lingbot-touch-to-give-robots-a-sense-of-touch/107152/), a tactile model trained on nearly 5,000 hours of touch data. Avride [passed one million US robot deliveries](https://roboticsandautomationnews.com/2026/11/15/avride-reaches-one-million-robot-deliveries-as-network-expands-across-us/107179/), 180,000 of them in October.

Robotaxis went in two directions. Waymo suspended driverless rides on high-speed roads nationwide after California [ordered it off freeways](https://www.theregister.com/security/2026/11/18/california-tells-waymo-to-take-the-next-exit-after-freeway-mishaps/5310841) following incidents in construction zones. In Europe, Wayve, Stellantis and Nvidia are [working with the French government](https://roboticsandautomationnews.com/2026/11/19/wayve-and-stellantis-partner-to-advance-autonomous-driving-in-france/107345/) on autonomous driving.

## 9. Data centers now use as much power as whole states

A Harvard study found that just 400 US data centers [use more electricity than Michigan](https://www.wired.com/story/data-centers-use-more-electricity-than-michigan/), and hyperscale sites alone take [about 2% of US power](https://arstechnica.com/science/2026/11/hyperscale-data-centers-use-2-of-us-electricity/). Emissions attributable to data centers are two to three times what they were in 2018.

The costs are showing up elsewhere too. Meta is [re-evaluating its 2030 net-zero goal](https://arstechnica.com/ai/2026/11/meta-reconsiders-2030-net-zero-goal-amid-record-emissions-from-ai-data-centers/) after record emissions from its AI data centers, and a trade body warned of a [circuit board shortage](https://www.theregister.com/systems/2026/11/20/ai-boom-threatens-circuit-board-crunch-to-rival-pandemic-era-chip-shortage/5311335) on the scale of the pandemic chip crunch, with relief unlikely before mid-2028.

## 8. Your AI chats are less private than you think

Google will [keep Gemini chats for two months](https://techcrunch.com/2026/11/17/google-to-keep-gemini-chats-for-two-months-up-from-72-hours-even-with-history-off/) instead of 72 hours, even with history turned off. In exchange, AI training and chat history now have [separate switches](https://arstechnica.com/ai/2026/11/google-will-let-you-opt-out-of-ai-training-in-gemini-without-losing-your-history/).

At Meta, internal chats show staff alarmed that the Muse agent [surfaced requests they never made](https://arstechnica.com/tech-policy/2026/11/muse-privacy-invasions-are-freaking-out-meta-staffers-internal-chats-show/) and showed bank balances, which Meta says were not real data. And a researcher who planted about 2 million canary secrets in prompts found that the data [does not stay private](https://arstechnica.com/security/2026/11/a-leaky-ai-supply-chain-is-exposing-secret-user-data-at-an-alarming-rate/) as it passes between AI services. Together.ai disclosed a [prompt leakage incident](https://www.together.ai/blog/security-event-prompt-leakage-for-requests-in-june-and-july-of-2026) covering requests from June and July.

## 7. AI is now on both sides of security

Amazon's CISO said Chinese attackers used AI agents that [found and exploited a zero-day on their own](https://www.theregister.com/security/2026/11/20/china-attackers-deployed-ai-agents-that-autonomously-found-and-exploited-a-0-day-to-take-over-a-university-server/5311382), adapting for nearly a day. The European Commission took HR and medical systems offline to [contain an AI-assisted cyberattack](https://www.theregister.com/cyber-crime/2026/11/19/european-commission-scrambles-to-contain-ai-assisted-cyberattack/5311103).

Defenders are using the same tools. AI found [more critical bugs in NGINX](https://www.theregister.com/security/2026/11/18/ai-found-more-critical-bugs-in-another-widely-used-technology-running-225m-websites/5310887), and PostgreSQL 19 [shipped two months late](https://simonwillison.net/2026/Nov/19/postgresql-19/) because of the flood of AI-reported vulnerabilities. Google launched [Agent Compute Engine](https://www.infoq.com/news/2026/11/google-agent-compute-engine/), which runs agents in isolated microVMs.

## 6. Agents move onto the desktop

At Ignite, Microsoft called Copilot ["the new OS for work"](https://arstechnica.com/gadgets/2026/11/microsoft-calls-copilot-the-new-os-for-work-at-ignite-keynote/): Word, Excel and PowerPoint now run inside it, and always-on agents are next. Google's Gemini app can now [use a Mac for you](https://techcrunch.com/2026/11/19/google-gives-gemini-the-ability-to-use-your-mac-for-you/), organizing files and filling out forms, and a job listing shows Apple is [building its own agent](https://www.theverge.com/tech/1038227/apple-ai-agent-engineer-job-listing) that browses, works across apps and writes code.

Not everyone wants them. Major US banks are [banning third-party bots](https://www.wired.com/story/banks-are-cracking-down-on-ai-agents/) from logging into customer accounts, and Signal now [blocks prying AI agents](https://www.theregister.com/security/2026/11/20/signal-slams-door-on-prying-ai-agents-to-protect-privacy/5311466).

## 5. Claude helps claim a Riemann Hypothesis proof

Mathematician Levent Alpöge says that, working with Claude, he found a [formalized proof of the Riemann Hypothesis](https://simonwillison.net/2026/Nov/20/levent-alpoge/) that also covers the Generalized version. On the same day, Ravi Vakil announced a [separate, all-human proof](https://simonwillison.net/2026/Nov/20/ravi-vakil/) of the Generalized Riemann Hypothesis by Alessandro Masullo.

Both results are claims that mathematicians are still checking. A [Lean verification write-up](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/) drew one of the biggest Hacker News threads of the week.

## 4. OpenAI and Google ship new frontier models

OpenAI released [GPT-6.2 Astra and Sol](https://openai.com/index/introducing-gpt-6-2-astra-sol): Astra is the frontier model for hard projects, Sol an efficient everyday model, both in ChatGPT Work, Codex and the API. Early benchmark breakdowns [show where Astra leads](https://simonwillison.net/2026/Nov/17/gpt62-astra-and-sol/) Fable 5.2 and where it still trails.

Google DeepMind added [Gemini 4 Neon](https://deepmind.google/blog/introducing-gemini-4-neon/) to its Gemini 4 family and made its [Genie 4 world model available](https://deepmind.google/blog/genie-4-is-now-available/). Developers say the growing lineup makes it [harder to tell which model fits a job](https://www.theregister.com/ai-and-ml/2026/11/19/google-continues-model-chemistry-experiment-with-neon/5310934).

## 3. California sues OpenAI over runaway agents

California's attorney general says OpenAI [tested dangerous AI without proper oversight](https://arstechnica.com/tech-policy/2026/11/california-sues-openai-to-stop-public-nuisance-of-out-of-control-ai-agents/) and misled the public, pointing to 80 loss-of-control incidents the company admitted and to the Hugging Face attack. The suit treats out-of-control agents as a public nuisance.

Other labs had similar reports the same week. A Grok agent [took unapproved actions and ignored orders to stop](https://arstechnica.com/security/2026/11/grok-bot-took-unapproved-actions-ignored-orders-to-stop-and-then-denied-it/), and in a Gemini test an agent told to "never give up" [would do almost anything](https://www.theregister.com/security/2026/11/17/gemini-test-proves-once-again-that-amoral-ai-agents-will-do-almost-anything-if-told-never-give-up/5310574).

## 2. Anthropic goes public near a $2 trillion valuation

Priced at $83 a share, Anthropic [opened on Nasdaq at $111](https://techcrunch.com/2026/11/19/anthropic-hits-nasdaq-exchanges-at-110-27-above-ipo-price/), about a third higher, in the biggest IPO on record. Dario Amodei used the opening bell to recommit to pacing AI development.

Analysts point to the company's [huge compute commitments](https://www.wired.com/story/anthropics-record-breaking-ipo-highlights-the-ai-giants-worst-enemy-itself/) and cheaper open models as the main risks. Reuters called the debut a [Wall Street test of AI's promise and peril](https://www.reuters.com/business/finance/anthropics-historic-debut-put-ais-promise-peril-wall-st-test-2026-11-19/).

## 1. Nvidia faces its first week without Jensen Huang

Huang's exit over his relationship with an executive US officials suspect of spying for China drew a [petition for his return](https://techcrunch.com/2026/11/14/elon-musk-other-tech-execs-sign-petition-calling-on-nvidia-to-reinstate-jensen-huang/) signed by Elon Musk and 115,000 others. On the Q3 earnings call, new board chair Harvey Jones said the board [does not intend to reinstate him](https://www.theverge.com/report/1035465/nvidia-says-it-will-not-reinstate-jensen-huang-as-ceo). Sources told WIRED the board's main concern was his ["lack of candor"](https://www.wired.com/story/jensen-huangs-lying-alarmed-nvidia-board-ahead-of-his-resignation/).

Interim CEO Colette Kress forecast more record revenue and said Nvidia is [done selling chips to China](https://techcrunch.com/2026/11/17/nvidia-is-abandoning-china-after-jensen-huangs-ouster/). In Washington, both parties back bills to [further restrict AI chip exports](https://www.theverge.com/ai-artificial-intelligence/1033984/congress-export-rules-ai-chips-china), and California's attorney general has [subpoenaed Nvidia](https://techcrunch.com/2026/11/20/california-ag-subpoenas-nvidia-over-worries-about-huangs-ties-with-china/) over Huang's ties with China and whether investors were misled.

That is the week. Next Monday brings another ten.

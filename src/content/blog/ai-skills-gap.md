---
title: "The AI Skills Gap Nobody's Talking About"
description: "Every developer uses AI tools daily. The businesses paying our salaries mostly don't. Here's what that gap means for your career."
date: 2026-02-25
tags:
  - AI
  - Career
  - Automation
  - Python
draft: false
---

Every developer I know uses AI tools every day. Copilot, Claude, Cursor — it's baseline now. I use Claude to write first drafts of scripts, debug obscure errors, and knock out boilerplate I'd otherwise spend 20 minutes on.

But the businesses paying developer salaries? Mostly not using AI in their actual operations.

The OpenAI COO said this week that AI has "not yet really penetrated enterprise business processes." McKinsey's 2025 survey put active deployment in core processes at around 22% of companies. VCs poured $1.1B into AI chips on a single Tuesday. The money is flowing into AI infrastructure at a pace that would have looked insane in 2022, and the actual deployment in business operations is basically flat.

I've been sitting with that gap for a while. It's more interesting than it looks.

## The two AI worlds

There are two parallel AI realities right now. In developer-world, we use AI constantly. The tooling is good. The feedback loops are fast. If a model gives garbage output, you iterate. We're genuinely productive.

In business-process-world, the story is almost the opposite. Workday, Salesforce, ServiceNow — they're all shipping AI features that enterprises are largely ignoring. The features exist. The adoption isn't following.

**The gap is an integration and trust problem, not a capability problem.** Enterprise systems are old, messy, and heavily customized. The clean REST API that demos assume doesn't exist. And even when the technical problem is solved, nobody uses a workflow they don't trust.

## What production AI integration actually looks like

I built a document extraction pipeline last year for a client running SAP from 2016. Their finance team was spending three days per month manually extracting data from PDF invoices into a format SAP could import. Classic automation target.

We evaluated AWS Textract and Google Document AI first. The issue was vendor diversity — the client had 40+ suppliers, each with their own invoice layout, and building per-vendor extraction templates in Textract would have taken longer than the LLM approach. The tradeoff was more reliability engineering on the output side.

The naive LLM version worked in an afternoon. Read PDF, extract fields, output JSON. Around 90% of invoices came out correctly.

Getting it to the point where the finance lead would actually trust it took closer to three weeks, mostly because the first two vendors' PDFs were fine and the third was a mess. You need to handle failures gracefully, with a human review queue. The output format has to match SAP's import spec exactly. Finance requires audit logging. The core validation step is less glamorous than it sounds:

```python
def validate_extraction(result: dict, confidence: float) -> str:
    if confidence < 0.85:
        return "flag_for_review"
    required_fields = ["vendor_id", "invoice_number", "amount", "date"]
    if not all(result.get(f) for f in required_fields):
        return "flag_for_review"
    return "auto_import"
```

That logic, plus the audit log and the SAP field mapping, is what the afternoon demo didn't include. **The gap between a working demo and a production system that finance will actually trust is almost always bigger than developers expect.**

Two practical notes if you do something similar. Running invoice data through an external LLM API required a data processing agreement and procurement sign-off — that added three weeks to the timeline we hadn't budgeted for. Start that conversation before you write any code. And: at 300 invoices per month, a 10% flagging rate is 30 manual reviews, which is manageable. At 3,000 it's a different problem. The threshold would need to tighten, or the review queue would need its own automation.

## Why legacy systems are actually a good problem

Most developers treat legacy systems as a burden. I've come around to seeing them differently.

An established business running on a 10-year-old ERP has real workflows. Real workflows have real bottlenecks. Real bottlenecks are things someone will actually pay to fix — not because AI is interesting but because the pain is documented and the cost of the current approach is known.

The typical AI demo problem — "summarize this document" or "answer questions about this PDF" — is hard to sell because the value is vague. "Extract these 12 fields from 300 invoices per month and import them into this 2016 SAP instance without human intervention, 99.5% accuracy threshold" has a number attached. You can price that. You can measure whether it worked.

**Specific, dull, repetitive problems with a clear error cost are the ones that become real products.** I've seen more AI projects die because they solved interesting-but-vague problems than because the model wasn't good enough.

## The career angle

Here's what this means practically for developers who care about where their skills compound.

There are roughly three categories of developers working with AI right now: people using AI tools to write code faster (basically everyone), people building demos and LLM wrappers (a lot of people), and people building reliable AI integrations into real, messy production systems (relatively few). The first is table stakes. The second is crowded at the commodity end — RAG chatbots over company docs, basic document Q&A. The third is where McKinsey's 22% number eventually goes. I'd guess it at least doubles; it usually does once the tooling matures. And the developers who built the first twenty deployments are the ones with the track record.

**The skill that actually differentiates you is systems thinking: how do you build something reliable when one component is probabilistic?** Confidence thresholds, human review queues, output validation before anything touches a real database, audit trails — these are boring engineering problems. That's probably why not many people are working on them seriously.

## What I actually look for in AI projects now

I've gotten more selective about which AI projects I take on. The filter: can I answer "what happens when this is wrong?" before I start building?

If the answer is "nothing, because a human reviews everything" — that's fine, but it limits the value. If the answer is "the client loses money" or "data gets corrupted" — that's the project worth building. You'll have to solve the reliability problem properly, and solving it properly is what separates a £5,000 prototype from a £50,000 integration.

The interesting technical problems are all in the reliability layer. How do you validate LLM output before it hits a database? How do you build a confidence metric that's actually calibrated? How do you handle the cases where the model is confidently wrong? None of this gets solved by picking a better model. It requires thinking about the system, not just the AI component.

I don't know when enterprise AI deployment catches up to the infrastructure investment. But the developers on the right side of that transition are the ones building things that handle failure gracefully — not memorizing the latest model benchmarks.

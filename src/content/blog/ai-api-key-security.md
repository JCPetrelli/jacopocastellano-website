---
title: "The $82,000 mistake: how to secure your AI API keys before it's too late"
description: "A developer's stolen Gemini API key ran up $82,314 in 48 hours. Here's what changed about AI API key security and how to protect yourself."
date: 2026-03-04
tags:
  - Security
  - AI
  - Python
  - Tools
draft: false
---

Last month, a three-person startup in Mexico had a very bad 48 hours.

Someone stole their Google Gemini API key. In two days, the attacker racked up $82,314.44 in charges, mostly on Gemini Pro Image and Text endpoints. The company's usual monthly spend was $180. The developer posted that if Google didn't waive the bill, they were facing bankruptcy.

This wasn't a sophisticated attack. The key leaked somewhere, an automated scanner picked it up, and the damage was done before anyone noticed.

Truffle Security made it worse by publishing their research: **2,863 live Google API keys were openly accessible on the public internet.** A separate Quokka study scanning Android apps found over 35,000 unique keys embedded in app code, using a different methodology but pointing in the same direction. All of them potentially active.

This is the problem with AI API keys in 2026. They used to be low-stakes. Now they're not.

---

## Why AI API keys are different

If you've worked with APIs for a while, you've probably been a bit lax about key hygiene at some point. You checked a `.env` file into a private repo "just for a second." You hardcoded a key in a test script. You copied it into a Slack message.

With most APIs, the worst case was someone making a few calls and running up a small bill. Annoying, not catastrophic.

Gemini and similar AI APIs changed that. **A stolen key can generate thousands of dollars of compute charges in hours.** The usage spikes fast because image generation and large model inference are expensive per call, attackers don't rate-limit themselves, and billing alerts often fire too late, or not at all.

Google made this worse through a specific design flaw. Their API keys have always started with `AIza`, a recognizable prefix. Those keys were originally meant for low-stakes services like Google Maps embeds, where you'd drop the key directly into client-side JavaScript. That was fine when the key only unlocked maps.

When Google added Gemini to the same key system, existing keys (including ones publicly visible in website JS for years) suddenly gained access to expensive AI endpoints. No warning. No re-authentication. Just a silent upgrade in what that key could do.

---

## What can actually happen

With a valid Google API key, an attacker can call the Gemini API and bill compute to your account, access uploaded files via the `/files` and `/cachedContents` endpoints, pull sensitive data you've processed through the API, and run automated tasks indefinitely until the key is revoked or you notice the bill.

The $82K case wasn't unusual in how it happened. It was unusual in how fast it escalated and how publicly the developer shared it. **Plenty of smaller versions of this happen quietly.**

---

## Step zero: scan for what's already exposed

Before doing anything else, check whether a key is already out there. The pre-commit hooks and billing alerts we'll cover later won't fix anything that's already in your git history.

Run TruffleHog against your repos (gitleaks and detect-secrets are solid alternatives with different tradeoffs on speed and CI integration):

```bash
pip install trufflehog
trufflehog git https://github.com/your-org/your-repo --only-verified
```

Or scan locally:

```bash
trufflehog filesystem /path/to/your/project
```

It understands key formats, including the `AIza` prefix. It'll flag live keys, not just pattern matches.

Also check your git history specifically:

```bash
git log --all --full-history --source -- "*.env" "*.json" "*.yaml" "*.yml" "config.*"
```

Look for commits that touched config files and check whether any keys in those commits are still active. If you find one, revoke it before doing anything else.

---

## Where keys actually leak

I've seen (and made) most of these mistakes myself.

Git history is the sneaky one. You add a key to a config file, push it, then delete it and push again. The key is still in git history. If the repo ever becomes public, or if someone clones it before you delete the commit, it's already out there.

`.env` files committed by accident are more common than anyone admits. A `.gitignore` misconfiguration, a new team member who doesn't know the convention, a moment of rushing. It happens.

Client-side code is exactly what caught those keys in Android apps. Anything the browser or app runtime can see, an attacker can extract. This includes JavaScript bundles, decompiled mobile apps, and web pages served over HTTP.

CI/CD logs are an overlooked one. Commands that print environment variables during builds, error messages that echo config, verbose mode left on in a pipeline. Keys end up in log output and sit in your CI system for months.

Slack and Discord messages are probably the most embarrassing source. You paste a key to share it with a colleague "quickly." It sits in message history forever, searchable, exportable, and accessible to anyone who's ever been in that channel.

Plaintext config files on servers are last on the list but not rare. Not version-controlled, not rotated, just sitting in `/etc/app/config.ini` readable by anyone with server access.

---

## Ongoing hygiene

Once you've confirmed nothing is already exposed, here's what to make permanent.

### Step 1: never store keys in code

Use environment variables. Every framework supports them. There's no valid reason a key should be hardcoded in source code.

```bash
# In your shell or CI/CD
export GEMINI_API_KEY="your-key-here"
```

```python
import os
api_key = os.getenv("GEMINI_API_KEY")
```

Use a `.env` file locally with `python-dotenv` or equivalent, and make sure `.env` is in your `.gitignore`:

```
# .gitignore
.env
.env.local
.env.*.local
```

### Step 2: set billing alerts, right now

In Google Cloud Console, go to Billing > Budgets & Alerts. Set a threshold at something like 150% of your typical monthly spend. Set another at 300%.

These won't stop a runaway charge automatically, but they'll wake you up at 2 AM when something goes wrong. That's better than waking up to a bankruptcy notice.

For production keys, also look at Google's quota limits. You can cap daily API usage per key so that even if a key leaks, the attacker can only rack up so much damage before hitting a wall.

### Step 3: restrict your API keys

Google Cloud lets you restrict API keys to specific APIs and specific IP addresses or referrer URLs. A key that only works from your server's IP, only for the Gemini API, does a lot less damage when stolen.

In Cloud Console: APIs & Services > Credentials > Edit your key > API restrictions and Application restrictions.

This alone would have significantly limited the $82K incident.

### Step 4: rotate keys regularly

Treat API keys like passwords. Rotate them every 90 days at minimum. When a team member leaves, rotate immediately.

Most developers never rotate API keys unless something breaks. That means a key compromised years ago, from an old project, a stale clone, a forgotten integration, can still be live and working today. Set a calendar reminder. Automate it if you can.

### Step 5: use secret managers for production

For anything beyond a personal project, use a secret manager. Google Cloud Secret Manager is the native option for GCP. AWS Secrets Manager if you're on AWS. HashiCorp Vault if you want self-hosted and cross-cloud. Doppler if you want something with a nicer UI and less setup (though if you go the SaaS route, weigh the tradeoff of handing your secrets to yet another third party).

These give you centralized storage, audit logs, automatic rotation, and the ability to revoke a secret across all services instantly.

### Step 6: add pre-commit scanning

Stop keys before they enter git. Note that this setup uses `language: system`, which requires TruffleHog to already be installed in your environment. For portable setups that work across new contributor machines without manual setup, switch to `language: python` and pin it as an explicit dependency instead.

```bash
pip install pre-commit
```

Create `.pre-commit-config.yaml`:

```yaml
repos:
  - repo: https://github.com/trufflesecurity/trufflehog
    rev: v3.63.2
    hooks:
      - id: trufflehog
        name: TruffleHog
        entry: trufflehog git file://. --since-commit HEAD --only-verified --fail
        language: system
        stages: [commit]
```

Run `pre-commit install`. Now every commit is scanned before it hits the repo.

Worth noting: `--no-verify` bypasses this entirely. Pre-commit hooks are a useful safety net, but they're not a substitute for a team that actually treats API keys like credentials.

---

## If it happens to you

Revoke the key immediately in Cloud Console. Don't wait to investigate first. Revoking stops the bleeding; investigation can come after.

Then document everything: screenshots of the bill, the timeline, any evidence the charges aren't from your normal usage patterns. Contact Google Cloud Support directly and open a billing dispute, framing it as unauthorized usage.

Google has previously waived large unauthorized charges. A student got a $55K charge forgiven after providing evidence. It's not guaranteed and it's not fast, but pushing back thoroughly is worth it. The Mexico startup's developer did exactly that.

---

## The bigger picture

The $82K story is extreme. The underlying conditions are not.

AI API keys can spend real money at scale, and the providers haven't all caught up on default security posture. Rate limiting, anomaly detection, and hard spending caps aren't standard yet. Until they are, the work falls on us.

The scan takes five minutes. A billing alert takes two. Restricting a key to one API takes maybe ten. None of this is complicated. It's just the kind of thing you skip when you're moving fast and nothing has gone wrong yet.

A three-person startup nearly went bankrupt over a key that was probably sitting somewhere public for months before anyone noticed. That's not bad luck. That's a gap in hygiene that's fixable before it becomes your problem.

---

## Sources

1. [Dev stunned by $82K Gemini bill after unknown API key thief goes to town](https://www.theregister.com/2026/03/03/gemini_api_key_82314_dollar_charge/) — The Register
2. [Thousands of Public Google Cloud API Keys Exposed with Gemini Access After API Enablement](https://thehackernews.com/2026/02/thousands-of-public-google-cloud-api.html) — The Hacker News
3. [A stolen Gemini API key turned a $180 bill into $82,000 in two days](https://www.techspot.com/news/111529-stolen-gemini-api-key-turned-180-bill-82000.html) — TechSpot

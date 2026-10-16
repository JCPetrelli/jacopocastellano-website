---
title: "From 2,037 to 1,440 contacts: cleaning macOS Contacts with Claude Code"
description: "One evening of cleaning my address book with Claude Code, turned into Rubricai, an open-source skill that deduplicates, merges and completes macOS Contacts with reviewed plans."
date: 2026-10-16
image: /images/portfolio/rubricai.png
tags:
  - AI
  - Tools
  - Python
  - Automation
draft: false
---

My macOS address book had 2,037 cards. 552 of them were exact copies of another card, some people were saved twice under different names, and some cards had only an e-mail address as their name. In one session with Claude Code I cleaned it down to 1,440 cards. I also added about 250 people from 20 years of e-mail and WhatsApp.

Then I turned the steps into a skill, so that anyone can repeat them. It is called [Rubricai](https://github.com/JCPetrelli/rubricai): *rubrica* is the Italian word for address book, plus AI.

## What the session did

Claude reached Contacts.app through AppleScript and JavaScript for Automation (JXA). The work went in steps, and each step needed more judgement than the one before.

- 552 cards were identical to another card in every field. They were deleted.
- 110 groups of cards had the same name and different details. Each group was merged into one card.
- 134 groups had different names but shared a phone number or an e-mail address, like "Rob landi" and "Roberto Landi". They were merged.
- 17 more groups shared nothing but the name: a card named after its phone carrier next to a card named after a workplace, or a nickname next to the full first name. I approved each of these by hand.
- 20 values were stored twice inside one card, mostly the same number with and without the country code.
- 136 names were changed to Title Case, with acronyms like (VE) and SMS kept in capitals.

Then the session went the other way: who is missing? Apple Mail keeps an SQLite index of every message at `~/Library/Mail/V*/MailData/Envelope Index`. Senders, To and Cc recipients, and flags for mailing lists and automated mail are enough to rank correspondents, without reading a single message body. About 125,000 messages produced roughly 250 new cards and 90 extra addresses on existing cards. WhatsApp Desktop keeps similar SQLite stores in its group container. The comparison there found three new people and one extra number for an existing card.

## Where the judgement was

The mechanical part was easy. The judgement calls were the interesting part, and they became the rules in the skill.

A shared phone number does not make two cards one person. One landline appeared on two cards with unrelated first names, and two other pairs looked the same. Merging them would have created people who do not exist. Rubricai merges on a shared phone or e-mail only when the names are compatible, and it reports every other pair as a question.

Transitive matching goes too far. One corrupted company card held nine e-mail addresses of unrelated people. Through it, a union-find over shared values joined 59 cards into one group. Rubricai checks every group for names that do not fit together and reports it as a chain instead of merging it.

A one-word name is weak evidence. Two cards called "Nina" with different numbers are more likely two people than one.

The Mail data needed its own care. Old sending addresses from 2012 had to be marked as mine, or they turned up as contacts. Classified-ad sites create a new relay address for every conversation, and there were more than 120 of them. Gmail keeps sent mail in All Mail, not in a Sent folder. The scoring has four tiers: two-way correspondence, written to once, wrote to me at least twice, and often on Cc together.

## How Rubricai works

The skill is a ladder of eight rungs. Each rung writes a JSON plan and changes nothing:

```bash
rb backup                         # rb = PYTHONPATH=rubricai python3 -m rubricai
rb export
rb scan linked --plan p3.json
rb apply p3.json                  # dry run
rb apply p3.json --yes
```

Claude shows the plan and waits for a yes. Without `--yes`, `apply` is a dry run. With it, a JXA script saves each card it is about to change or delete as a vCard in `p3.undo.vcf`, and only then makes the change. A merged card keeps the other names in its note, as `Also saved as: Tom cell`, so search still finds them.

The engine is Python with the standard library only, plus three JXA scripts. Nothing goes over the network. The 57 tests use invented people, and the repository includes a demo address book of 37 invented cards with a walkthrough of all eight rungs that runs without a Mac.

Two JXA details cost time. `make new email at end of emails` fails with error -10002 from JXA, while `person.emails.push(C.Email({...}))` works. Photos cannot be read in bulk (error -1741), so they are read one card at a time.

## Testing the skill

Before writing the skill, I asked a fresh Claude agent without it to plan the same job on paper. The plan was careful about backups. But it would have merged every pair that shared a phone number in one batch, it never considered a card that links strangers, and it would have dropped everyone who only wrote to me. With the skill loaded, a second agent handled those cases correctly. It also listed gaps, and I fixed several of them before publishing.

## Try it

Rubricai needs macOS, Claude Code and Python 3.10 or later. Install it as a plugin:

```
/plugin marketplace add JCPetrelli/rubricai
/plugin install rubricai@rubricai
```

Then ask Claude Code to clean up your contacts. Source, docs and the undo instructions are on [GitHub](https://github.com/JCPetrelli/rubricai), under the MIT licence.

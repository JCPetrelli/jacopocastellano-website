---
title: "Rubricai"
description: "A Claude Code skill that deduplicates, merges and completes the macOS Contacts address book, one reviewed plan at a time."
date: 2026-10-16
category: software
featured: false
thumbnail: "/images/portfolio/rubricai.png"
tags:
  - Code
  - Python
  - AI
  - Automation
  - Tools
role: "Developer"
---

[View on GitHub](https://github.com/JCPetrelli/rubricai) · [Read the article](/blog/rubricai-cleaning-macos-contacts-claude-code/)

## About

Rubricai (*rubrica* is Italian for address book, plus AI) is a Claude Code skill for the macOS Contacts app. It finds duplicate cards and the same person saved under different names, and it adds the people you e-mail or chat with who are missing. Every change is a JSON plan that you approve first, and every applied plan leaves a vCard undo file.

It came out of cleaning a real address book: 2,037 cards went down to 1,440, and about 250 people from 20 years of Apple Mail and WhatsApp were added.

## The ladder

| Rung | Finds | Example |
|---|---|---|
| Exact copies | cards identical in every field | one card imported three times |
| Same name | equal names with different details | two cards for one person, one with the phone, one with the e-mail |
| Linked | different names sharing a phone or e-mail | "Rob landi" and "Roberto Landi" |
| Name only | the same person with nothing else in common | "Dad Tim" and "Dad Dad Work"; "Gabri" and "Gabriella" |
| Inside a card | one value stored twice | a number with and without the country code |
| Apple Mail | correspondents missing from Contacts | ranked: two-way, wrote once, wrote to you, often on Cc |
| WhatsApp Desktop | chat numbers that are not saved | names from the phone's address book |
| Title Case | names in capitals or lower case | abbreviations like (VE) and SMS stay |

## Features

- Shared landlines, chains through a corrupted card and one-word names become questions, never automatic merges
- Merged cards keep every number and e-mail, and the old names in the note
- Apple Mail is read from its SQLite index (senders, recipients, flags), never from message bodies
- WhatsApp Desktop's databases are copied and read offline
- Offline mode applies a plan to an exported file, to preview the result
- Python standard library and JXA only, nothing over the network
- 57 tests and a demo address book of invented people

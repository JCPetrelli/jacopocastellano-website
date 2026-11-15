---
title: "Concert Programs"
description: "Free listening guides for every concert of the Berliner Philharmoniker, Wiener Philharmoniker, Royal Concertgebouw Orchestra and London Symphony Orchestra."
date: 2026-11-15
category: software
featured: false
thumbnail: "/images/portfolio/concert-programs/cover.jpg"
images:
  - "/images/portfolio/concert-programs/guide.jpg"
  - "/images/portfolio/concert-programs/search.jpg"
  - "/images/portfolio/concert-programs/assistant.jpg"
  - "/images/portfolio/concert-programs/reading.jpg"
tags:
  - Code
  - Python
  - Flask
  - AI
  - Classical Music
role: "Developer"
---

[concertprograms.eu](https://concertprograms.eu) has a listening guide for every concert of four orchestras: the Berliner Philharmoniker, the Wiener Philharmoniker, the Royal Concertgebouw Orchestra and the London Symphony Orchestra. About 190 guides at launch, free, open to everyone since 15 November 2026.

Each guide has the programme in running order, notes on each work, the performers, three book recommendations and three PDF editions (Hall Companion, Pocket, Full Guide). A calendar shows the coming months, search covers composers, performers and venues, and a chat assistant running on Claude Haiku answers questions from the guides.

Readers send corrections with an "Email a correction" button on every guide. Each correction becomes a new version, listed in the guide's change log.

Built with Flask and SQLite. Git-versioned JSON files are the source of truth; the database and the PDFs are rebuilt from them and published from a Mac mini.

[Visit concertprograms.eu](https://concertprograms.eu) · [Read the article](/blog/concertprograms-eu/)

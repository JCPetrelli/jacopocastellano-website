---
title: "Brickwise"
description: "A Claude Code skill that explains a codebase or any topic as an interactive 3D brick model. Brick size shows complexity."
date: 2026-09-28
category: software
featured: false
thumbnail: "/images/portfolio/brickwise/social-preview.png"
images:
  - "/images/portfolio/brickwise/popup.jpg"
  - "/images/portfolio/brickwise/exploded.jpg"
  - "/images/portfolio/brickwise/hover.jpg"
  - "/images/portfolio/brickwise/group.jpg"
tags:
  - Code
  - Python
  - JavaScript
  - three.js
  - AI
  - Tools
role: "Developer"
---

Every concept is a brick, related concepts form a sub-assembly, and a brick's size is its complexity. The output is one self-contained HTML page of about 40 KB.

## Live demos

- [Web Request Lifecycle](https://jcpetrelli.github.io/brickwise/examples/web-request.html): themed, a train
- [Theory of Relativity](https://jcpetrelli.github.io/brickwise/examples/relativity.html): stack
- [Brickwise Internals](https://jcpetrelli.github.io/brickwise/examples/brickwise.html): the repo explaining itself

## Controls

| Action | Input |
|---|---|
| Orbit, zoom, pan | drag, scroll, right-drag |
| Pull groups apart | `E` or Explode |
| Take one group apart | click it while exploded |
| Read a brick | hover for the title, click for the explanation |
| Back | `Esc` |

## Pipeline

```
target -> Claude -> JSON spec -> validator -> fixed three.js viewer -> one HTML page
```

- Claude writes only a spec, never 3D code.
- The validator rejects overlaps, floating bricks, sizes that don't match complexity, and unknown fields, and returns every error in one pass.
- Stack: Python 3.10+ standard library, three.js 0.160, pytest, headless-Chrome smoke test, GitHub Actions.

## Install

```
/plugin marketplace add JCPetrelli/brickwise
/plugin install brickwise@brickwise
```

[View on GitHub](https://github.com/JCPetrelli/brickwise) · [Read the article](/blog/brickwise-claude-code-3d-brick-model)

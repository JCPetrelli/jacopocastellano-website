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

Drag to orbit, press `E` to explode, click a brick to read it.

### Theory of Relativity (stack)

<div style="position:relative;aspect-ratio:4/3;border-radius:10px;overflow:hidden;margin:1rem 0 0.5rem"><iframe src="https://jcpetrelli.github.io/brickwise/examples/relativity.html" title="Brickwise: Theory of Relativity" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe></div>

[Open full screen](https://jcpetrelli.github.io/brickwise/examples/relativity.html)

### Web Request Lifecycle (themed: a train)

<div style="position:relative;aspect-ratio:4/3;border-radius:10px;overflow:hidden;margin:1rem 0 0.5rem"><iframe src="https://jcpetrelli.github.io/brickwise/examples/web-request.html" title="Brickwise: Web Request Lifecycle" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe></div>

[Open full screen](https://jcpetrelli.github.io/brickwise/examples/web-request.html)

### Brickwise Internals (the repo explaining itself)

<div style="position:relative;aspect-ratio:4/3;border-radius:10px;overflow:hidden;margin:1rem 0 0.5rem"><iframe src="https://jcpetrelli.github.io/brickwise/examples/brickwise.html" title="Brickwise: Brickwise Internals" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe></div>

[Open full screen](https://jcpetrelli.github.io/brickwise/examples/brickwise.html)

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

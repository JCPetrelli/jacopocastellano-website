---
title: "Loci"
description: "A browser game that teaches the method of loci in two 3D memory palaces built in Blender: leave one image at each place along a walk, then walk it again."
date: 2026-11-15
category: software
featured: false
thumbnail: "/images/portfolio/loci/thumb.jpg"
images:
  - "/images/portfolio/loci/archive-play-explainer-1.jpg"
  - "/images/portfolio/loci/archive-play-encode.jpg"
  - "/images/portfolio/loci/archive-play-results.jpg"
  - "/images/portfolio/loci/garden-menu.jpg"
tags:
  - Code
  - JavaScript
  - three.js
  - Blender
  - Games
role: "Developer, 3D"
---

[Play Loci](/loci/) in the browser. No install, no account.

The method of loci is the memory technique of the ancient orators: you pick a route through a building you know, and you leave one vivid image at each place along it. To recall the list, you walk the route again in your head.

Loci gives you two palaces to practise on. The Archive is an old two-floor archive hall with 15 places, from the entrance door to an arched door on the gallery. That door leads to the Garden, a walled Japanese garden around a koi pond, with its own 15 places.

## How a round works

1. Three short cards explain the method the first time you play.
2. You pick a word list. The camera glides from place to place, and at each one you make your own image of the word. The game gives only the word and a prompt, never the image: making the image is the part that does the work.
3. A short break with a small puzzle clears your head.
4. You bring the list back, in order, backwards or in any order, by choosing or typing each word.

A perfect round of 5 unlocks 10, and a perfect 10 unlocks 15. You can keep a list and the game asks for it again after a day, a week, a month and three months. Progress stays in your own browser.

## Modes

| Mode | What it does |
|---|---|
| Learn | A guided first walk with worked examples (Archive only, needs a keyboard) |
| Play | The memory game, works on phones too |
| Walk | Walk the palace freely with WASD and the mouse (needs a keyboard) |

## How it is built

- Each palace is modelled in Blender with Python scripts. A custom exporter bakes the Cycles lighting into texture atlases and writes a Draco-compressed glTF, 4.5 to 6 MB per palace.
- The player is plain three.js with ES modules and no build step. Collision uses a BVH of the same meshes, and the walking physics are ported one to one from the Blender walker add-on.
- In Play, the camera finds a viewing pose for each place (on a real floor, at eye height, with a clear line of sight) and plans glides that never pass through a wall.
- Sound is generated with the Web Audio API. Post-processing adds a light bloom, vignette and grain, and switches itself off on slow devices.
- Headless Chromium tests with Playwright and axe-core run every mode in both palaces.

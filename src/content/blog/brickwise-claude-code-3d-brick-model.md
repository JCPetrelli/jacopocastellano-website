---
title: "Brickwise: a Claude Code skill that explains a codebase as a 3D brick model"
description: "How Brickwise works: Claude writes a JSON spec, a Python validator enforces the geometry, and a fixed three.js viewer renders one self-contained page."
date: 2026-09-28
image: /images/portfolio/brickwise/social-preview.png
tags:
  - AI
  - Tools
  - JavaScript
  - Python
draft: false
---
Brickwise is an open-source (MIT) [Claude Code](https://claude.com/claude-code) skill. You point it at a repository or a topic, and it produces one HTML page with an interactive 3D model built from toy-style bricks. Each concept is a brick, related concepts form a sub-assembly, and a brick's footprint shows how complex its concept is.

The code is on [GitHub](https://github.com/JCPetrelli/brickwise). Three built examples are live: [Web Request Lifecycle](https://jcpetrelli.github.io/brickwise/examples/web-request.html), [Theory of Relativity](https://jcpetrelli.github.io/brickwise/examples/relativity.html), and [Brickwise Internals](https://jcpetrelli.github.io/brickwise/examples/brickwise.html), which is the repository explaining itself.

This article covers the engine behind the skill.

## What the page does

Each page is a single file of about 40 KB. It loads three.js 0.160 from jsDelivr and needs WebGL.

- Drag to orbit, scroll to zoom, right-drag to pan.
- `E` or the Explode button pulls the sub-assemblies apart.
- Clicking a sub-assembly while exploded takes it apart brick by brick and fades the others.
- Hovering a brick shows its title on a leader line. Clicking it opens a popup with a one-line summary, a longer explanation, and a concrete example.
- `Esc` goes back one step.

There are two layout modes. In `themed` mode the model is a real object whose parts map onto the topic: the web request example is a train, with the browser as the locomotive and the network, server and data as wagons. In `stack` mode, height means dependency: foundations at the bottom, dependents on top. The skill instructions tell Claude to use `themed` only when every group maps to a recognisable part of one object.

## Design decision: Claude writes a spec, not three.js

If Claude wrote the three.js scene itself, every page would have its own rendering code and its own bugs. Brickwise splits the work instead:

```
target -> Claude (SKILL.md) -> JSON build spec -> validate.py -> fixed viewer -> one HTML page
```

Claude reads the target, breaks it into 4 to 8 groups of 2 to 6 concepts, scores each concept's complexity from 1 to 5, places the bricks on a stud grid, and writes the text. Its only output is a JSON spec. A piece looks like this:

```json
{
  "id": "dns", "group": "network", "title": "DNS lookup",
  "description": "Turns the host name into an IP address.",
  "details": "Computers find each other by IP address, not by name...",
  "example": "shop.example.com resolves to 93.184.216.34.",
  "complexity": 2, "shape": "brick",
  "x": 0, "z": 12, "level": 1, "w": 2, "d": 2
}
```

`x` and `z` are the brick's corner in studs, `level` is its height in plates, and `w` and `d` are its footprint. There is no rotation field: to turn a brick, swap `w` and `d`. A brick or slope is 3 plates tall, a plate or tile is 1.

The viewer is a fixed, tested ES module. The builder inlines it together with the spec into an HTML template. Every build runs the same rendering code, so a bug fixed once stays fixed for every page.

## The validator

`brickwise/validate.py` is about 220 lines of standard-library Python. It checks the rules that make the model mean something.

Complexity fixes the footprint area (`w × d`) and the allowed shapes:

| complexity | area | shapes |
|---|---|---|
| 1 | 1–2 | plate, tile |
| 2 | 2–4 | brick, plate, slope |
| 3 | 6–8 | brick, plate, slope |
| 4 | 12–16 | brick, plate, slope |
| 5 | ≥ 24 | brick, plate |

Geometry is checked on a cell map from `(x, z, level)` to the piece occupying it. Two rules apply:

- No overlaps. Each overlapping pair is reported once, with the first clashing cell.
- No floating bricks. A piece above level 0 needs at least one footprint cell directly on top of a cell that has studs. Tiles have no studs, and a slope has studs only on its back row, so nothing can rest on a tile or on a sloped face.

It also rejects unknown fields (a typo like `colour` fails), enforces word limits (40 for a description, 120 for details, 60 for an example), and caps a model at 8 groups and 40 pieces.

The validator returns every error in one pass, as plain strings:

```
piece 'db' overlaps 'cache' at x=0 z=9 level=1
```

This matters because the skill allows Claude three attempts to fix a failing spec before it stops and shows the user the remaining errors. One error per run would waste those attempts.

Two implementation details keep it from crashing on bad input. Validation runs in two phases: field checks first, then geometry only over pieces whose fields passed, so one bad value never causes a traceback or a cascade of follow-on errors. And every membership test goes through a helper that accepts only strings, because JSON can hand you a list or an object where a string was expected, and those are unhashable in Python.

## The builder

`python3 -m brickwise.build spec.json` validates the spec and writes `builds/<date>-<slug>.html` plus a copy of the spec, then regenerates an `index.html` gallery from all the saved specs. `--html PATH` writes one page with no gallery.

Injecting untrusted text into a `<script>` needs care:

- The spec JSON has `<`, `>` and `&` escaped as Unicode escapes, so a description containing `</script>` cannot close the tag.
- NaN is rejected both when the spec is loaded and when it is dumped.
- The viewer is inserted before the spec, one marker occurrence each, so text inside a spec cannot be mistaken for a template marker.
- `viewer.js` itself must never contain `</`, since it is inlined in a `<script>` too.

A test feeds a description of `evil </script><script>alert(1)</script>` through the builder and checks that no `</script>` survives inside the spec block.

Builds go to `$BRICKWISE_BUILDS` if set, to `builds/` inside a git clone, and otherwise to `~/brickwise-builds/`. The last case exists because a Claude Code plugin install lives in a cache that is replaced on every update.

## The viewer

`viewer/viewer.js` is about 590 lines. Units are 1.0 per stud and 0.4 per plate. The baseplate studs are one `InstancedMesh`; slopes are an `ExtrudeGeometry` profile.

The interaction is a three-state machine: assembled, groups apart, one group apart. Every piece tweens an offset from its home position over 600 ms.

The exploded layout is computed once. Each group gets a vertical lift proportional to its height and a horizontal push proportional to its distance from the model centre. A relaxation loop then pushes apart any group bounding boxes that still overlap.

Labels, leader lines and popups are DOM and SVG overlays, re-projected every frame and hidden when their anchor is behind the camera. If three.js fails to load or WebGL is missing, a small non-module script shows an error message after 6 seconds instead of a blank page.

## Testing

- `pytest`: 50 tests on the validator and builder, standard library only. CI runs them on Python 3.10, 3.12 and 3.13.
- CI rebuilds the committed example pages and fails if any of them changes, so the examples always match the current viewer.
- The pytest suite does not execute JavaScript. A separate smoke test drives the local Chrome headless (SwiftShader for WebGL) through puppeteer-core: it hovers a brick, clicks it, explodes the model, takes one group apart, checks that all positions are finite, and saves screenshots. The viewer exposes a small `window.__brickwise` hook for this.

The three example specs are also test fixtures and the layout references the skill tells Claude to read before placing bricks.

## Install

As a plugin:

```
/plugin marketplace add JCPetrelli/brickwise
/plugin install brickwise@brickwise
```

Or clone the repo and symlink `skills/brickwise` into `~/.claude/skills/`. It needs Python 3.10 or later and nothing from pip. Then ask Claude "explain this repo as a brick model" or "build me a brick model of how OAuth works".

The skill needs Claude Code, which requires a paid Claude plan or API usage. The builder does not: `python3 -m brickwise.build my-spec.json --html out.html` turns a hand-written spec into a page with no model involved.

## Limits

- There are no edges between bricks. Dependencies are shown only by position (what sits on what, what touches what), so it does not replace an architecture or call-graph diagram.
- A model holds at most 40 pieces. For a monorepo, the skill builds the top level and offers to rerun on named subsystems.
- Pages need internet access to load three.js from jsDelivr.
- The quality of the decomposition and the complexity scores depends on the model reading the code. The validator checks that the layout is consistent with the scores; it cannot check that the scores are right.

Brickwise is an independent project, not affiliated with the LEGO Group.

---
title: "Orchestra Instruments"
description: "31 instruments of the symphony orchestra as 3D models, built from Python scripts in Blender and sold as a pack."
date: 2026-10-09
category: motion
featured: true
thumbnail: "/images/portfolio/orchestra_instruments/all_instruments.jpg"
images:
  - "/images/portfolio/orchestra_instruments/grand_piano.jpg"
  - "/images/portfolio/orchestra_instruments/grand_piano_views.jpg"
  - "/images/portfolio/orchestra_instruments/french_horn.jpg"
  - "/images/portfolio/orchestra_instruments/trumpet.jpg"
  - "/images/portfolio/orchestra_instruments/harp.jpg"
  - "/images/portfolio/orchestra_instruments/tuba.jpg"
  - "/images/portfolio/orchestra_instruments/catalogue_sheet.jpg"
tags:
  - 3D
  - Blender
  - Python
  - Music
  - Product
role: "Design and development"
---

## About

Orchestra Instruments is a pack of 31 3D models covering the symphony orchestra: strings, woodwind, brass, percussion, a celesta and a concert grand piano. It is for sale as a download.

[Get the pack](/orchestra-instruments/) · [Buy on Gumroad](https://jacopocastellano.gumroad.com/l/orchestra-instruments)

<video controls muted playsinline preload="metadata" poster="/images/portfolio/orchestra_instruments/all_instruments.jpg" style="width:100%">
  <source src="/videos/orchestra-instruments-promo.mp4" type="video/mp4" />
</video>

## How it is made

No model was sculpted by hand. Each instrument is a Python module that builds its mesh in Blender from named measurements: body length, bore, bell diameter, key positions. One command rebuilds all 31, exports them and renders the catalogue.

Shared code handles what instruments have in common. The bowed strings come from one builder with four sets of sizes. The woodwinds share a module for key cups, rods and levers. The brass share bells, braces and mouthpieces.

The wood grain on the strings, the harp and the piano is generated from numbers, not photographs, so the textures carry no licence of their own.

## What is in the pack

| Family | Instruments |
|---|---|
| Strings | violin, viola, cello, double bass, harp |
| Woodwind | piccolo, flute, oboe, cor anglais, clarinet, bass clarinet, bassoon, contrabassoon |
| Brass | french horn, trumpet, trombone, bass trombone, tuba |
| Percussion | timpani, bass drum, snare drum, cymbals, triangle, tambourine, tam-tam, glockenspiel, xylophone, marimba, tubular bells |
| Keyboards | celesta, grand piano |

Every instrument comes as GLB, FBX, OBJ and a Blender file, in three detail levels, at real size in metres. The pack is 271,518 triangles at full detail.

## The grand piano

The piano is the most detailed model, at about 40,000 triangles in 39 parts. It has 88 keys, a veneered inner rim, a soundboard with its bridge, a plate with struts, tuning pins, strings, dampers, a lid on its stick, and a pedal lyre. The lid, fallboard, music desk and pedals are separate parts that can be animated.

## Checks

Every exported file is imported again into a clean Blender and compared with a manifest: size, triangle count, textures. That check found two real faults before release, which were fixed. The files have not been tested in other programs.

## Limits

The models are stylised. Woodwind key mechanisms and brass tubing are simplified, and the lower detail levels are made automatically. Only the woods have image textures; everything else uses plain materials.

[Get the pack](/orchestra-instruments/)

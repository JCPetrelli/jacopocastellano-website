---
title: "Audio Filter"
description: "A real-time voice filter for macOS that pipes any preset (chipmunk, robot, deep villain) into Teams, Zoom, Discord, or any app that picks a microphone."
date: 2026-05-20
category: software
featured: false
thumbnail: "/images/portfolio/audio_filter.jpg"
tags:
  - Code
  - Python
  - DSP
  - Audio
  - macOS
role: "Developer"
---

## About

A tiny real-time voice changer for macOS. The script reads short blocks from your physical microphone, runs each block through an effect chain (pitch shift, ring modulation, echo, band-pass, soft clipping), and writes the result to BlackHole, a virtual audio device. Any call app set to "BlackHole 2ch" then hears the filtered version of your voice.

Around 300 lines of Python total, using NumPy, SciPy, and sounddevice. Each effect is one short file. Switching presets mid-call is a single keypress in the terminal.

## Features

- Seven presets: Clean, Chipmunk, Deep Villain, Robot, Radio, Cave, Alien
- ~5 ms buffer delay at 48 kHz (256-sample blocks)
- Works with Teams, Zoom, Discord, OBS, QuickTime, anything that lets you pick a microphone
- Modular effects (each is a 20-60 line file, easy to add your own)
- One `just` recipe per preset (`just chipmunk`, `just villain`, `just robot`)
- Output clipped to ±1.0 so a misbehaving effect cannot blow your speakers

[View on GitHub](https://github.com/JCPetrelli/audio-filter)

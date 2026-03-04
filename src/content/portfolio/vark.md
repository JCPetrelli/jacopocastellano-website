---
title: "VARK - Video Archiver"
description: "A Flask-based web application for managing, organizing, and analyzing large video collections with AI-powered tagging, face recognition, and audio transcription."
date: 2025-01-01
category: software
featured: true
thumbnail: "/images/portfolio/vark/thumbnail.jpg"
images:
  - "/images/portfolio/vark/1.jpg"
  - "/images/portfolio/vark/2.jpg"
  - "/images/portfolio/vark/3.jpg"
  - "/images/portfolio/vark/4.jpg"
  - "/images/portfolio/vark/5.jpg"
  - "/images/portfolio/vark/6.jpg"
  - "/images/portfolio/vark/7.jpg"
  - "/images/portfolio/vark/8.jpg"
  - "/images/portfolio/vark/9.jpg"
  - "/images/portfolio/vark/10.jpg"
tags:
  - Code
  - Python
  - Flask
  - SQLite
  - AI
  - Machine Learning
  - Computer Vision
  - Tailwind CSS
role: "Developer"
---

## About

VARK is a self-hosted web application designed to bring order to large, sprawling video collections spread across multiple hard drives and remote servers. It crawls directories, extracts metadata and preview frames, and stores everything in a searchable local database. On top of that foundation, it layers AI-powered features: a local vision model generates descriptive tags for every video, InsightFace detects and clusters faces across the entire library, and Faster-Whisper transcribes spoken audio.

The result is a single interface where thousands of videos become browsable, searchable, and organized, without uploading anything to the cloud.

## Features

- **Gallery with live previews** -- Browse videos in a paginated grid. Hovering over a thumbnail swaps the static center frame for an animated GIF preview. Advanced filtering by dimensions, codec, file size, tags, detected faces, and more.
- **Multi-source scanner** -- Recursively scan local directories or remote servers via SSH/SFTP. Background threading with pause, resume, and real-time progress tracking. For each video, the scanner extracts five preview frames and generates an animated GIF.
- **AI tagging** -- Integrates with a local LM Studio instance running a vision-capable model. The model analyzes preview frames and generates descriptive tags, making every video searchable by its visual content.
- **Face recognition** -- InsightFace detects faces in preview frames, generates ArcFace embeddings, and stores them in a FAISS vector index. HDBSCAN clusters faces by identity, allowing searches like "show me every video this person appears in."
- **Audio transcription** -- Faster-Whisper extracts and transcribes spoken audio, with configurable model sizes from tiny to large. Transcripts are saved alongside videos and searchable from the interface.
- **Duplicate detection** -- Identifies duplicates by file path, filename, or content hash (MD5/SHA256), with side-by-side preview comparison and bulk deletion.
- **Backup safety analysis** -- Tracks how many physical drives contain each video. Files on a single drive are flagged as at-risk; files on three or more are marked well backed up.
- **Drive health monitoring** -- Reads S.M.A.R.T. data from connected drives and flags warnings for reallocated sectors, pending sectors, temperature, and power-on hours.
- **Analytics dashboard** -- Overview of the entire collection: total count, duration, file size distribution, codec breakdown, resolution statistics, and AI tag coverage.
- **Download center** -- Mark videos for download from the gallery, then batch-export them as a ZIP. Handles both local and remote (SFTP) files transparently.

## Technical Stack

- **Backend**: Python, Flask, SQLite
- **Video processing**: FFmpeg/FFprobe, Pillow, OpenCV
- **AI/ML**: LM Studio (local LLM), InsightFace, FAISS, HDBSCAN, Faster-Whisper, PyTorch
- **Remote access**: Paramiko (SSH/SFTP)
- **Frontend**: Tailwind CSS, Jinja2 templates, vanilla JavaScript

## Screenshots

1. Advanced search filters: filename, dimensions, codec, file size, AI tags, path tags, drives, and detected persons
2. Video scanner with directory input, available drives, and scan history
3. Download center with selected videos, metadata, and per-file actions
4. Backup safety analysis: files categorized by drive redundancy, with at-risk alerts
5. Drive status overview showing connected and disconnected volumes
6. Drive health monitor with S.M.A.R.T. readings per disk
7. Analytics dashboard: resolution distribution, storage by drive, codecs, and duplicates summary
8. AI processing panel with LM Studio server status and tag coverage
9. Face recognition stats, detection controls, and clustering settings
10. Transcription panel with Whisper model selection and speech detection

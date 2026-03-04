---
title: "DIY Video Conversion: Python Scripts for fast GUI-free Hap conversions"
description: "A simple CLI wrapper for FFmpeg."
date: 2024-10-15
tags:
  - Bash
  - Python
  - Automation
  - AI
  - Video
---

A simple CLI wrapper for FFmpeg.

While working on a new patch in TouchDesigner, I realized I had a collection of interesting videos I wanted to import and reuse. However, they were all compressed in H.264 format, which is fine for online publications and storage but adds extra strain on my GPU during performances and events. The GPU has to decompress each frame before processing the pixel data for playback in my patch. One of the recommended formats for these situations is Hap (see the website: [https://hap.video/](https://hap.video/) for more information).

In the past, I’ve used various software to convert videos (MPEG Streamclip, HandBrake, Adobe Media Encoder, VLC), but I’m currently in a phase where I prefer to avoid graphical interfaces. Since the Hap format makes your performances “hap.py,” I decided to write my own suite of scripts to convert videos to Hap using Python, which can be run directly via the CLI (Command Line Interface, or Terminal for the non-tech-savvy). Naturally, the backbone of the conversion process is FFmpeg.

> You can find the code for free on GitHub: [https://github.com/JCPetrelli/video_converter](https://github.com/JCPetrelli/video_converter).
Feel free to fork and modify it as you see fit, for example, by adding more output formats and codecs. For now, the focus is on Hap conversion.

## How to use it
After installing the script with the instructions written in the link above, here is how to use it:

### Converting a Single Video
Run the script from the command line with the following syntax:

```bash
python convert_video.py
```
Replace `<input_file>` with the path to your input video file and `<output_file>` with the desired path for the output Hap video file.

**Example**Convert a video file named `example.mp4` to Hap codec format and save it as `example.hap`:

```bash
python convert_video.py example.mp4 example.hap
```

### Converting Multiple Videos
To convert multiple videos in a folder, run the following command:

```bash
python process_videos_from_folder.py
```
Replace `<input_folder>` with the path to the folder containing your input video files and `<output_folder>` with the desired path for the output Hap video files.

**Example**Convert all video files in the `input_videos` folder and save them in the `output_videos` folder:

```bash
python process_videos_from_folder.py input_videos output_videos
```
The script relies on the FFmpeg command-line tool to handle the video conversion process. Make sure that the FFmpeg executable is properly installed and available in your system’s PATH. The script assumes the input video is in a format supported by FFmpeg. If it’s not, you may need to install additional codecs or consider using one of the tools mentioned above.

*Enjoy*!
---
title: "3 Steps to an Organized Workspace: Automating File Organization"
description: "The very personal, customizable and automated system that I use to organize all my files"
date: 2024-11-12
tags:
  - Bash
  - Python
  - Automation
  - Backup
  - AI
---

As developer and designer, I often end up with a desktop crowded with all sorts of files — images, scripts, text files, videos … [a never-ending and absurd list of files with different extensions never heard before]. To keep things organized, I’ve created a personal system that involves some minor “architectural” decisions and a free script to automate the organization process. And here we go.

**Step 1**
> If a file is part of a project, it goes inside that project’s folder.
This may seem like a basic step, but it’s the foundation for everything that follows.

Most of times, I don’t even know if I am starting a real project or not. Most of my projects start with experiments, so I usually give a bizarre/random/absurd name to a folder where to put all my materials inside. And that’s OK, I can rename it at the end of the project if it consolidated in something tangible. Otherwise crazy name stays ;)

The important thing to remember is just that everything “related” to that project, goes inside that folder. That’s it.

**Step 2**
> Each project folder goes inside it’s “category” folder
My project folders are divided by type (in my case, video, code, design).

• All projects that involve code go into *~/Documents/Scripts*.

• All projects related to video go into *~/Documents/Videos*.

• All projects related to design (or images) go into *~/Documents/Design*.

If projects mix different elements (images with videos, videos with code, code with images), **I usually select the category that occupied more of my time**. In this way if I have to locate it in the future, I know that for example “I worked more with video in this case” so it’s in my “Videos” folder. Or in another one I wrote way more Python than expected: it’s in my “Scripts” folder. And so on.

I also have bash shortcuts to open these folders from the terminal very quickly. I don’t want to spend time visually searching for folders. Typing *cdscripts* in my terminal is faster for me than locating it manually. The same goes for all the directories that I open every day. For more about this topic, here is an article to explain how to do it:

**Step 3**
> All unsorted files go automatically to the Garderobe
This is the most important and most automated step. All the files that are not sorted in my Desktop or Downloads folder (because I didn’t have the time or simply the inclination) go to the “Garderobe” folder .

“What’s the Garderobe??” you may ask. It’s a simple, special folder located at *~/Documents/Garderobe* where all my lost files **will get sorted by kind**.

They get divided by extension automatically, all done by a script in 0.1 seconds, so I don’t even have to think about sorting them manually.

**Very important to know for your peace of mind!**The script will sort **ONLY** the files that are not inside another folder. Which means that if there are subdirectories in your Desktop or Downloads folders or in the current directory where you run the script (see option 3 below), **they will stay where they are**. Otherwise imagine what a mess would happen if all the subdirectories files moved in the *Garderobe*, splitting and cutting projects serially like in a horror movie.

**Why divide by extension?**
- If all my unsorted files are organized by extension, I know exactly where to go if I’m looking for a Python file, a .tox file, a .dmg file, or a .png/.jpg if I’m looking for images. There’s no need to search and filter by kind with Spotlight or other similar services and scroll through all the types to get to the one I want. Am I looking for a .png? I go to ~/Documents/Garderobe/PNG, and that’s where I search for it.

> Note: If i know the name of the file, which happens in 10% of the cases, then I use a service similar to Spotlight (but better): Raycast.

- Many times I just need some random images or videos to use in a video project as tests (like in a TouchDesigner project or testing scripts that work with media). So I know that in my Garderobe I always have a nice palette of materials under the subdirectories MOV, PNG, JPG, and so on.
- I can clean up my drive by extension. Spring cleaning is much faster: I go through the heaviest extensions, prioritizing the ones occupying more space, and start deleting all the things I do not need. It is much more relaxing than doing it from an overflowing Desktop folder where I have to go through different file types and each time change approach or program to analyze whether I need that file or not.

**Why the automation?**Well, I would not even remotely consider using this system manually; it would simply mean too much effort and time. The whole system works because it’s automated and customized to my needs.

Also, I can chain the Garderobe script to other scripts that I run at the end of each working day (like backup scripts or final logging scripts that I also wrote for myself), so that on the next day I have a fresh start on my sparkling clean and backed-up computer :-)

Here is an additional article that covers the backup scripts:

## The Garderobe Script
Here is my Garderobe script; feel free to use it and customize it as you see fit for your workflow:

> [https://github.com/JCPetrelli/tidy_garderobe](https://github.com/JCPetrelli/tidy_garderobe)

### How to run it
After cloning the repo or downloading the script, simply run it from the command line. You can specify a directory choice as an argument or select it interactively. Use the options:

- 1 for **Desktop**
- 2 for **Downloads**
- 3 for the **current directory** where the script is run.

This third option is excellent for any other folders (besides the Desktop and Downloads) that you want to sort: simply cd into the desired folder and run the script with option 3.

**Example**:

Run with a directory option as an argument:

```bash
python garderobe.py 1  # To tidy the Desktop, or 2 to tidy the Downloads
```
Or just run the script to pick the directory interactively via a menu that will displayed in the console.

```python
python garderobe.py # Pick your choice from the menu
```

### How to customize it
As explained above, the purpose of this script is to sort files in a chosen directory by their extension, moving each file to a folder named after its extension (e.g., .jpg files go to a JPG folder). These folders are created in the *~/Documents/Garderobe* directory. If you need to change this directory, just change this line:

```python
destination_folder = os.path.join(os.path.expanduser('~/Documents/Garderobe'), ext[1:].upper())
```
If your Desktop or Downloads folder are not in the “standard” place, change these lines with your paths:

```python
desktop_folder = os.path.join(os.path.expanduser('~'), 'Desktop')
downloads_folder = os.path.join(os.path.expanduser('~'), 'Downloads')
```
And that’s it! Nothing more is needed to customize this script for your own environment.

## Conclusion
This three-step system has seriously freed me from the chaos of file management. By setting up a clear structure for my project files, sorting them by type, and automating the mess of miscellaneous stuff, I am keeping my workspace neat and clutter-free on a daily basis. It’s saved me loads of time and spared me the mental strain of juggling endless files.

I’m sharing my personal system and script in hopes that you can also simplify your workflow and enjoy the relief of an organized digital life.

> Happy digital spring cleaning!
*Enjoyed this article? Follow me on Medium for more insights on automation and coding :-) *[*https://medium.com/@jacopocastellano*](https://medium.com/@jacopocastellano)
---
title: "How to keep your AI prompts organized with your own Prompt Manager"
description: "In the AI era, managing prompts efficiently is becoming increasingly challenging. Here is a solution that works for me (free download link…"
date: 2024-10-22
tags:
  - Bash
  - Python
  - Automation
  - AI
  - Productivity
---

In the AI era, managing prompts efficiently is becoming increasingly challenging. Here is a solution that works for me (free download link below).

Every day, I come across articles and GitHub resources suggesting new prompts to use with ChatGPT or other LLMs, along with techniques to optimize them. This constant flow of information creates a sense of overload and confusion. Keeping separate notes in programs like Notes, Obsidian, and similar tools ends up making things more complicated rather than simpler.

For this reason, I decided to develop a small command-line tool (CLI) to organize and make all this information easily accessible and usable.

In my personal experience, this solution is faster than navigating through multiple GUI tools whose codebase I do not “own.” For simple uses, I prefer to have a stable environment that will not change until I choose to change it. It remains a constant, adaptable resource on which I can rely 100%.

## How does it work?
After cloning or downloading the script, follow the instructions in the GitHub repository below to install the dependencies.

You will see a file called “**prompts.csv**” where you can add all the prompts you want in a tabular format. If there are parts that need to be customized every time you “compose” your prompt, just put them between curly brackets “{ }”, and they will automatically become **variables**. If a section of the prompt is considered variable, the script will ask you to define its value in the terminal when you run the script. Feel free to use the provided prompts.csv file for testing.

1 — **Run the script** with:

```bash
python start_prompt_manager.py
```
2 — **Select a Prompt**: The script will display a list of available prompts, and you can select one by entering its number.

3 — **Input Variables**: If the selected prompt contains placeholders, the script will ask for input values to replace them. After adding your text, which could also span multiple lines, press Enter and thenControl+C to finish.

4 — **View and Copy the Final Prompt**: The completed prompt will be displayed in the terminal, and a clean version (without terminal color codes) will be copied to your clipboard automatically.

**Here are the key features of the tool**1. **CSV-Based Prompt Loading**Prompts are managed through a simple CSV file, providing a straightforward way to organize and store them.

2. **Interactive Terminal Menu**The tool includes an interactive menu in the terminal, allowing users to easily select prompts.

3. **Variable Substitution**Prompts can include placeholders for variables, enabling dynamic customization. Simply put what needs to be substituted in the prompt between “{ }” and it will become automatically a variable to be filled. 4. **Clipboard Integration**The final prompt is automatically copied to the clipboard for immediate use. 5. **Color-Coded Output**The output is color-coded using the Colorama library, improving readability.

> Here is the GitHub repo: [https://github.com/JCPetrelli/prompt_manager](https://github.com/JCPetrelli/prompt_manager)
**Feel free to use it and contribute!**

## Additional Tip
To work even faster with your custom prompt manager, consider to use a good bash alias (aka terminal shortcut). Here is how:
---
title: "How to Use Bash Aliases to Run Scripts More Efficiently"
description: "To execute commands in the terminal easily and intuitively, without having to remember long, indecipherable strings of words, bash aliases…"
date: 2024-10-29
tags:
  - Bash
  - Python
  - Automation
  - Backup
  - AI
---

To execute commands in the terminal easily and intuitively, without having to remember long, indecipherable strings of words, *bash aliases* are the ideal solution. They allow you to associate a simple, memorable command with complex instructions, making terminal use smoother and more intuitive. Imagine typing just one word like “backup” or “update” and seeing the terminal automatically execute a series of commands you’ve customized, saving time and reducing errors.

Let’s look at an example with the script “tell_me_a_chuck_norris_joke.py.” You will go from this:

To this:

## Let’s start!

### Let’s get started with bash aliases on macOS and Linux
*(For Windows, feel free to check this tutorial: *[*https://www.youtube.com/watch?v=DuV7Erpr6yw*](https://www.youtube.com/watch?v=DuV7Erpr6yw)*)*

The first thing you want to know is which shell you are actually using. If you are using the terminal for the first time you will probably have bash, but here is a guide for checking which shell you have.

### 1. Check Your Current Shell
To see which shell you’re using, open a terminal and type:

```bash
echo $SHELL
```
On macOS, the default shell is usually either bash (especially for older versions of macOS) or zsh (the default for newer versions, starting with macOS Catalina). The output might look like:

• /bin/bash for **bash** • /bin/zsh for **zsh**

### 2. Edit the Right File for Aliases
Each shell reads from different startup files where you can define aliases. Here’s how to identify and use the right file:

• For **bash**: Add aliases to either ~/.bashrc or ~/.bash_profile. • ~/.bashrc is often used for setting environment variables and aliases for interactive shells. • ~/.bash_profile is read at login and often sources ~/.bashrc to keep everything in one place. • For **zsh**: Use ~/.zshrc to define aliases. This file is sourced every time a new zsh session is opened.

Open the appropriate file with a text editor, e.g.:

If you have bash:

```bash
nano ~/.bashrc
```
If you have zsh:

```bash
nano ~/.zshrc # for zsh
```
Note: If you don’t want to use nano, and you want to use your default text editor, simply open the file with:

```bash
open ~/.zshrc # for zsh
```

### 3. Create your Alias(-es)
In your chosen file, you can define an alias with the following format:

```bash
alias shortname="command"
```
In our Chuck Norris example above, that’s what I wrote:

```bash
alias chuck="cd Documents/Scripts/chuck && python3 tell_me_a_chuck_norris_joke.py"
```
Other useful examples could be:

```bash
alias ll="ls -la"
alias gs="git status"
```
After adding your alias(-es), save and close the file.

### 4. Apply Your Changes
Once you’ve edited your shell file, apply the changes by sourcing it:

```bash
source ~/.bashrc # for bash
source ~/.bash_profile # for login shells in bash
source ~/.zshrc # for zsh
```
This reloads the file and makes your aliases immediately available in the current session. You can also simply close the terminal window you are working with and open a new one.

### 5. Test it
Write your alias in the terminal window and see if it works correctly. If not, check the next section for some common problems that could raise.

## Additional Tips

- **Use Personal Initials for Custom Commands**: To avoid conflicts with existing commands, consider prefixing your aliases with your initials or something unique (e.g., if your name is “Robert Green” and you want to run a custom backup script, create an alias like **rg**backup). This helps keep your shortcuts organized and easily recognizable.
- **Mind the Quotation Marks**: One of the most common errors in alias creation is misusing or forgetting quotation marks (“”). Always wrap your command in double quotes, especially if it contains variables or multiple commands. Incorrectly formatted quotes can lead to unexpected results or errors when running the alias.
- **Document Your Aliases**: Over time, it can be easy to forget what each alias does, especially if they are heavily customized. Consider adding comments next to each alias in your configuration file, or maintain a separate README with explanations for your most-used shortcuts.
- **Be a sourcer**: As I wrote above, after editing your alias file, you can quickly reload it without restarting the terminal (by simply running *source ~/.bashrc)*. To make this process even faster, consider adding an alias, like …

```bash
alias sourcer="source ~/.bashrc"
```
… so you can reload with a single command. This ensures your new aliases are instantly usable.

- **Keep a Backup**: Since your alias file can be essential to your workflow, keeping a backup (e.g., on GitHub or as a local copy) can save you time if you ever need to restore it. Don’t know how to do it?

Here is a series of scripts backup your files for free:

In the next article I will talk about how to create even more advanced aliases with variables and functions. Feel free to follow me on Medium for the next updates.

**P.s.**: What about that Chuck Norris script you mentioned above??

Here it is:

Enjoy!
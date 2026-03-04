---
title: "5 Advanced Bash Aliases Ready To Be Used"
description: "Powerful shortcuts for your command line: Advanced techniques using parameters and functions to level up your CLI game"
date: 2024-11-05
tags:
  - Bash
  - Automation
  - Backup
  - AI
---

Previously, we explored bash aliases and how you can use them as powerful shortcuts for your command line. This time, we’ll take it a step further, diving into more advanced techniques using parameters and functions to enhance our CLI skills even further.

Here’s the link to my previous article:

(reading it isn’t mandatory, but it’s definitely recommended if you’d like a solid foundation before diving into these more advanced techniques).

In this article, you will find five powerful bash aliases, each crafted to simplify and enhance your command-line experience. I’ll walk you through how each one works so that you can adapt them to your specific needs, explaining the benefits and giving you ready-to-use code snippets. You can easily copy and paste these aliases directly into your configuration file to get started right away.

> If you don’t know where your configuration file is, please read the article above and in 2 mins everything will be cristal clear!
Let’s go!

1) **Quick Project Navigation with Auto-Complete**With this snippet you will not need to navigate to your projects folder, “-ls” it, check again the name of that old project you don’t remember, “cd” there … Here is one simple command with auto-completion:

```bash
# Define the path to the Projects directory
PROJECTS_DIR="$HOME/Documents/Scripts"

# Define the goto function
goto() {
    cd "$PROJECTS_DIR/$1" || echo "Directory not found: $1"
}

# Define the completion function
_goto_completion() {
    local cur=${COMP_WORDS[COMP_CWORD]}
    COMPREPLY=( $(compgen -W "$(ls -d $PROJECTS_DIR/*/ 2>/dev/null | xargs -n 1 basename)" -- "$cur") )
}

# Enable the completion for goto
complete -F _goto_completion goto
```
**How to use it**1. **Typing the Command:**

• When the “goto” command is typed followed by part of a subdirectory name, pressing Tab will auto-complete based on available projects.

2. **Error Handling:**

• If the subdirectory specified doesn’t exist, it prints a clear message without navigating away from the current directory.

This setup improves workflow by making navigation to different project directories faster and reducing potential typing errors with auto-completion.

### How it works

- **Define the Path to Projects Directory**

```bash
PROJECTS_DIR="$HOME/Documents/Scripts"
```
The PROJECTS_DIR variable is set to point to the specific directory where all project folders are stored. **This is the only place where you would need to change the path to the sacred space where you keep all your projects**. The rest of the snippet can be used as it is. Using $HOME ensures it works for your home directory.

**2. The “goto” Function**

```bash
goto() {
    cd "$PROJECTS_DIR/$1" || echo "Directory not found: $1"
}
```
The goto function takes one argument ($1) representing the name of a subdirectory. It attempts to change the current directory to the specified project within the PROJECTS_DIR. If the directory doesn’t exist, it will output an error message, Directory not found: $1.

3. T**he “_goto_completion” Function**

```bash
_goto_completion() {
 local cur=${COMP_WORDS[COMP_CWORD]}
 COMPREPLY=( $(compgen -W "$(ls -d $PROJECTS_DIR/*/ 2>/dev/null | xargs -n 1 basename)" - "$cur") )
}
```
This function is responsible for auto-completing subdirectory names when using the goto command. COMP_WORDS[COMP_CWORD] captures the current word being typed.

*compgen -W “$(ls -d $PROJECTS_DIR/*/ | xargs -n 1 basename)”* generates a list of subdirectories in PROJECTS_DIR to suggest completions based on user input.

**4. Enable Completion for goto**

complete -F _goto_completion goto

```bash
complete -F _goto_completion goto
```
This line links the _goto_completion function to the goto command, enabling directory name completion when typing.

## 2) Create a directory and navigate into it with a single command
This is one of my favorites. How often do we create a directory with the *mkdir my_long_directory_name command* just to immediately cd into it to do something? Instead of repeatedly typing *mkdir my_long_directory_name* && *cd my_long_directory_name*, you can simply add this one-liner to your bash configuration file:

```bash
mkcd() { mkdir -p "$1"; cd "$1"; }
```
And start using it right away with:

```bash
mkcd my_directory
```

### How it works
1. *mkcd()* defines a new function named mkcd.

2. { mkdir -p “$1”; cd “$1”; } is the body of the function:

• *mkdir -p “$1”* creates a directory with the name provided as the first (and only) argument ($1). The -p flag ensures that the directory is created only if it doesn’t already exist, avoiding errors.

- *cd “$1”* immediately navigates (cds) into that new directory.

**3) Recursive Grep with Enhanced Search Options (search)**This function improves grep for recursively searching directories with colorized output, line numbers, and exclusion of certain directories/files (like .git).

```bash
# Enhanced recursive grep search with options
search() {
    local pattern="$1"
    shift
    grep --color=always -RIn --exclude-dir={.git,node_modules} "$pattern" "$@"  # Customize directories to exclude
}

# Usage: search "pattern" [path]
# Example: search "my_function" ~/Projects
```

### How to use it

```bash
search "pattern" [path]
```
• **pattern**: The term or phrase you’re looking for.

• **path** (optional): The directory or file path where you want to perform the search. If omitted, it defaults to the current directory.

**Example**

To search for the function **my_function** in all files within the **~/Projects** directory:

```bash
search "my_function" ~/Projects
```
or even simpler, you can just cd into Projects and then simply run:

```bash
search my_function
```
And it will work in the same way because in this case you are searching for a single word. For multiple words and sentences, use the “”.

### How it works
The search function is built around the grep command, adding several options to enhance its behavior.

- **Function Declaration and Pattern Handling**:

```bash
search() {
    local pattern="$1"
    shift
```
• *local pattern=”$1"* stores the first argument as pattern, which is the term you want to search for.

- *shift* removes the first argument (pattern) from the positional parameters, so any additional arguments (like path) can be accessed by grep.

2. **Executing **grep** with Enhanced Options**:

```bash
grep --color=always -RIn --exclude-dir={.git,node_modules} "$pattern" "$@"
```
Here’s what each option does:

• — color=always: Highlights matches in color, making it easy to spot results in the output.

• -R: Performs a recursive search, meaning it goes through all subdirectories and files within the specified directory.

• -I: Ignores binary files (non-text files), ensuring the search only processes readable text files.

• -n: Displays the line number of each match, which is helpful when you need to locate where the match appears within the file.

• — exclude-dir={.git,node_modules}: Excludes specific directories from the search, like .git and node_modules. This can save time and prevent unnecessary matches in large or irrelevant directories. You can customize this to exclude other directories if needed.

3. **Additional Arguments (**$@**)**:

• The “$@” at the end allows any additional arguments (like a specific path or further grep options) to be passed through. This makes the function flexible — you can specify a search path or even additional grep options as needed.

## 4) Extract based on file format
This extract function is a versatile tool for extracting various types of compressed files with a single command. It simplifies file extraction by automatically detecting the file type based on its extension and choosing the appropriate extraction command. No need to remember them all anymore.

```bash
#Extract based on file format
extract() {
    if [ -f "$1" ]; then
        case "$1" in
            *.tar.bz2) tar xvjf "$1" ;;
            *.tar.gz) tar xvzf "$1" ;;
            *.bz2) bunzip2 "$1" ;;
            *.rar) unrar x "$1" ;;
            *.gz) gunzip "$1" ;;
            *.tar) tar xvf "$1" ;;
            *.tbz2) tar xvjf "$1" ;;
            *.tgz) tar xvzf "$1" ;;
            *.zip) unzip "$1" ;;
            *.Z) uncompress "$1" ;;
            *) echo "Cannot extract '$1' : unsupported file type" ;;
        esac
    else
        echo "'$1' is not a valid file"
    fi
}
```

### How to use it
Simply call the function with a compressed file (for example a .rar, .zip, .tar and so on) like this:

```bash
extract backup.tar.gz
```

### How does it work

- **[ -f “$1” ]** checks if the first argument (**$1**) is a valid file. If it’s not a file, the function outputs an error message and exits.
- The case statement checks the file extension of **$1** and runs the appropriate extraction command based on the type.

## 5) Quick in-place backup of a file or directory
This backup function is a straightforward tool that creates a simple backup of a specified file or directory. It duplicates the file by appending .bak to the original filename, making it easy to create quick, on-the-fly backups before making changes to a file.

```bash
backup() {
    if [ -f "$1" ]; then
        # Backup for a single file
        cp "$1" "$1.bak"
        echo "Backup of file $1 created as $1.bak"
    elif [ -d "$1" ]; then
        # Backup for a directory
        cp -r "$1" "$1.bak"
        echo "Backup of directory $1 created as $1.bak"
    else
        echo "'$1' is not a valid file or directory"
    fi
}
```

### How to use it
**Example**

To create a backup of a file called notes.txt:

```typescript
backup notes.txt
```
After running this command, a backup copy of notes.txt will be created in the same directory, named **notes.txt.bak**.

> The .bak file extension stands for “backup.” It’s commonly used by software to indicate that the file is a backup of another file, typically containing the same data as the original, but with a .bak suffix added to its filename. To use it just delete .bak from the filename.
**You can also use the command on a directory: in this case it will create a copy of all the files and sub-directories included in the directory and save it again with the .bak extension.**

### How it works

- If the input is a file, it copies it to a new file with .bak appended to the original filename.
- If the input is a directory, it uses cp -r for recursive copying, which duplicates the entire directory structure.
- This backup copy will include all contents of the directory, including nested folders and files.

That’s it for today! I hope you will find these snippets useful and remember that they are very flexible. You can mix, match, and tweak each alias to fit exactly what you need. With the explanations here, you’ve got all the building blocks to personalize your setup and make your workflow smoother and faster.
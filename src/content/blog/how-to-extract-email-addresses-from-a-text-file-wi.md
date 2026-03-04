---
title: "How to Extract Email Addresses from a Text File with Regular Expressions and Bash"
description: "Use regex and `grep` to easily extract email addresses from a text file."
date: 2022-12-17
tags:
  - Bash
  - Automation
  - Regex
  - AI
---

Regular expressions, also known as *regex*, are a powerful tool for matching patterns in text. They can be used in many programming languages and command-line tools to search for and extract specific pieces of information from text files.

In this short article, we will look at how to use regular expressions and the `grep` command in Bash to extract email addresses from a text file. We will define a regular expression that can match email addresses in the standard format `[username@domain.com](mailto:username@domain.com)`, and use the `grep` command to search for and extract all email addresses that match this pattern from the text file.

## Which regex will we use?
We will use the regular expression [a-zA-Z0–9._%+-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,} to match email addresses in the standard format [[username@domain.com](mailto:username@domain.com)]([username@domain.com](mailto:username@domain.com)).

## How to create a new file and make it executable
1. First, make sure that you have a code editor installed on your computer. Some popular code editors include Sublime Text, Atom, and Visual Studio Code. I love Vim, but that’s a whole big topic in itself for another article :-) 2. Open the code editor and create a new file. In most code editors, you can do this by going to the File menu and selecting “New File” or by pressing the keyboard shortcut for creating a new file (e.g. `Ctrl + N` or `Command + N`). 3. Save the file with a `.sh` extension to indicate that it is a Bash script. For example, you could name the file `myscript.sh`.

4. Make it executable: you can use the `chmod` command with the `+x` option to add execute permission to the file. Here is the general syntax for using `chmod` to make a file executable:

```bash
chmod +x filename
```
In our example, you can use the following command to make it executable:

```bash
chmod +x myscript.sh
```

## Let’s write some code
You can now start to add the following code to your Bash script:

```bash
#!/bin/bash

# Define the regular expression for matching email addresses
regex='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'

# Extract email addresses from the text file and print them to the console
grep -Eo "$regex" text_file.txt
```
This script will extract all email addresses from the file `text_file.txt` (which should be on the same directory of our script) that match the regular expression `regex` and print them to the console.

Here is a brief explanation of the regular expression used in this example:

- `[a-zA-Z0–9._%+-]+` matches one or more characters that can be lowercase or uppercase letters, digits, or any of the characters `._%+-`- `@` matches the `@` symbol- `[a-zA-Z0–9.-]+` matches one or more characters that can be lowercase or uppercase letters, digits, or any of the characters `.-`- `\.` matches a literal period (the backslash escapes the period so that it is treated as a literal character, rather than a special character in the regular expression)- `[a-zA-Z]{2,}` matches two or more characters that can be lowercase or uppercase letters.

This regular expression will match email addresses in the standard format `[username@domain.com](mailto:username@domain.com)`, but it will also match other variations such as `[username+tag@domain.com](mailto:username+tag@domain.com)` or `[username.name@subdomain.domain.com](mailto:username.name@subdomain.domain.com)`. You can adjust the regular expression to match a more specific set of email addresses if needed.

For more information on regex and bash, you can check this article I wrote on the topic:

## Conclusion
In this article, we learned how to use regular expressions and the `grep` command in Bash to extract email addresses from a text file. We defined a regular expression that can match email addresses in the standard format `[username@domain.com](mailto:username@domain.com)`, and used the `grep` command to search for and extract all email addresses that match this pattern from the text file.

I hope that this article has helped you understand how to use regular expressions and the `grep` command to extract email addresses from a text file, and that you can use this knowledge to tackle other tasks that require matching and extracting specific patterns of text. Regular expressions and the `grep` command are powerful tools that can save you a lot of time and effort when working with text data.

**If you found this article useful, you may also like …**
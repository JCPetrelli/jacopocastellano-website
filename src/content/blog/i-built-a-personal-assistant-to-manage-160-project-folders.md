---
title: "I Built a Personal Assistant to Manage 160+ Project Folders"
description: "When manual tracking stops working, automate visibility, not organization."
date: 2026-02-17
tags:
  - Python
  - Automation
  - Developer Tools
  - Project Management
---

I have 160+ project folders scattered across my machine. Some are active, some are abandoned, some have git remotes, some don't. I kept losing track of what was where, and every few weeks I'd need answers I couldn't get quickly.

I'd spend hours manually checking folders, running git commands, updating spreadsheets just to figure out which projects were backed up to GitHub or how much disk space my old virtual environments were eating. **Past 20 projects, manual tracking stops working. At 160+, it's chaos.**

## The problem: too many projects, zero visibility

I'm a chronic project starter. Flask apps, TouchDesigner experiments, Python scripts, automation tools. Each one gets its own folder, and each folder accumulates artifacts. After two years, I had no central view of my work.

I didn't know which projects had documentation. I couldn't tell which repos were local-only versus pushed to GitHub. I was duplicating effort because I forgot what I'd already built.

The cognitive load was exhausting. Every time I started a new project, I wondered if I'd already solved this in some forgotten folder.

## The solution: Jsec

I built a central management system I call **Jsec**. Python utilities paired with Claude Code slash commands (custom commands you define in your project's `.claude/commands/` folder) that give me complete visibility into my project chaos. One caveat upfront: the Claude Code interface requires a paid Claude subscription; the Python scripts work standalone without it. **I don't need perfect organization. I need fast answers to specific questions.**

Jsec answers four questions:

- What's the health of my system right now?
- Which projects have git remotes and which are local-only?
- How much disk space can I reclaim?
- Which projects are worth documenting or open sourcing?

## Why not existing tools?

I know what you're thinking: `ncdu` covers disk analysis, `btop` covers system stats, `gh repo list` covers GitHub visibility. Fair. The difference is that Jsec ties them together. `ncdu` doesn't update my `repos.md`. `gh repo list` only shows what's already on GitHub; it won't tell me which local folders have no remote at all. I wasn't replacing those tools; I was building the layer that connects them.

## System status

The first utility I built was `system_status.py`. It shows CPU, RAM, disk usage, and network info with visual progress bars.

```python
def get_disk_usage():
    """Get disk usage statistics."""
    total, used, free = shutil.disk_usage("/")

    return {
        "total_gb": total / (1024**3),
        "used_gb": used / (1024**3),
        "free_gb": free / (1024**3),
        "percent": (used / total) * 100
    }
```

I run this every morning. Takes 2 seconds, tells me if my disk is filling up or a background process is eating CPU. I invoke it with `/system-status` and get an instant snapshot, so no more guessing if I have space for that 2 GB dataset.

## Git scanning

The second utility, `scan_git_accounts.py`, walks through all 160+ folders and checks git status for each one. It checks if a `.git` directory exists, extracts remote URLs, parses GitHub/GitLab usernames, and checks repository visibility via the GitHub API. All this data goes into a central markdown table in `repos.md`.

```python
def get_git_info(project_path: Path) -> dict:
    git_dir = project_path / ".git"

    if not git_dir.exists():
        return {"has_git": False}

    # Check for remote
    result = subprocess.run(
        ["git", "-C", str(project_path), "remote", "-v"],
        capture_output=True,
        text=True
    )

    if not result.stdout.strip():
        return {"has_git": True, "is_local_only": True}
```

**This scan completes in under 3 minutes on my M2 MacBook Pro for 160+ projects.** Doing this manually (checking remote status, documentation presence, and GitHub visibility for each repo individually) took hours, not just the git commands themselves.

Now I know exactly which projects are backed up and which are sitting in local-only repos waiting to be lost in a disk failure.

## Cleanup

The third utility, `cleanup.py`, finds and removes regenerable development artifacts. Virtual environments, `node_modules`, Python cache directories, build folders. These files can always be recreated with `pip install` or `npm install`, but they eat gigabytes of disk space.

```python
CLEANABLE_PATTERNS = {
    "venv": "Python virtual environment",
    "node_modules": "Node.js dependencies",
    "__pycache__": "Python bytecode cache",
    "build": "Build artifacts",
    ".pytest_cache": "Pytest cache"
}
```

I run this when disk space drops below 20 GB free. It shows me exactly what will be deleted and how much space I'll reclaim before doing anything. **Last time I ran it, I freed 18 GB by removing 47 old virtual environments I'd forgotten about**, mostly machine learning and data science projects with full CUDA and scientific computing dependencies. The cleanup took 30 seconds.

## Central tracking

All this data feeds into `repos.md`, a markdown table tracking project metadata. Each row has:

| Field | Description |
|---|---|
| **Project name** | Folder name of the project |
| **Git status** | Whether a `.git` directory exists |
| **Account name** | GitHub/GitLab username parsed from the remote |
| **Remote presence** | Whether a remote origin is configured |
| **Visibility** | Public or private (checked via GitHub API) |
| **Documentation status** | Whether the project has a README or docs |

I can query it however I need: which projects are public, which have no remote, which are missing documentation. It's a plain text file, so I can grep it.

Jsec isn't a published open source project; it's personal tooling built around my specific folder structure. But the four core scripts are a working starting point if you want to build something similar. One honest caveat on the markdown table: it works fine for a solo developer on one machine. If you sync across machines, merge conflicts on the table become a real problem; a SQLite file would be more robust. The git scan is also sequential and hardware-dependent; three minutes is what I see on an M2 MacBook Pro.

> I went from "no idea what's in half these folders" to having a table I can grep in under a second. The psychological relief is real.

## How I use it

Every Monday morning, I run `/scan-git` to update the tracking table. Takes 3 minutes, keeps my project inventory current. When disk space gets low, I run `/cleanup-dev-artifacts` with a dry run first to see what will be deleted, then confirm and reclaim space.

When I need to know system health, I run `/system-status` and get instant feedback. I'm not perfectly organized, but I have fast answers when I need them, and that's the trade I was actually looking for.

| Command                  | Utility                | Frequency              |
| ------------------------ | ---------------------- | ---------------------- |
| `/system-status`         | `system_status.py`     | Daily                  |
| `/scan-git`              | `scan_git_accounts.py` | Weekly (Monday)        |
| `/cleanup-dev-artifacts` | `cleanup.py`           | When disk < 20 GB free |

## What I learned

I initially tried building a complex database system to track projects. Too much overhead. Markdown tables and Python scripts work better. **Simple tools you use beat sophisticated systems you don't.** Jsec is four Python files and some Claude commands. That's it.

I also learned that you don't need to organize everything upfront. You need fast queries into existing chaos. The tracking table doesn't reorganize my folders; it just tells me what's in them. I spent one weekend building this. It's paid itself back many times over.

Yes, I'm aware of the irony: building a new project to manage old ones. And yes, better habits from the start would have prevented the chaos. But I didn't stay disciplined, and most developers I know don't either. The question wasn't "how do I prevent future chaos?" but "what do I do with the chaos that already exists?" Jsec answered that.

## The real value

Jsec isn't about perfect project management. It's about reducing cognitive load. Before, I had to remember details about 160 projects. Now I have one markdown file and three commands.

When I need to know if a project is backed up, I check the table. When I want to free disk space, I run cleanup. When I'm deciding what to document, I filter for undocumented repos. **I built this for myself. It solves my specific chaos.** Your chaos is different, but the principle holds: if you can't query your own work, you're spending energy on remembering instead of building.

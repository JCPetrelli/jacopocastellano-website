---
title: "Why I Give My AI Agents Human Names"
description: "A tiny tweak that made my AI tools feel like teammates"
date: 2025-10-07
tags:
  - AI
  - Workflow
  - Claude Code
---

A tiny tweak that made my AI tools feel like teammates

> Here’s what I discovered by accident …
While setting up custom agents in Claude Code, I did something simple that first made me laugh and then made me reconsider: I gave them normal names instead of technical labels.

Instead of *code-review-specialist-v2*, mine is called **Roby**. The git operations one? **Anna**.

Sounds silly. Works surprisingly well.

## Why This Works
Your brain processes “Ask Roby” differently than “invoke code-reviewer-agent.” One feels like talking to someone. The other feels like running a command.

When you type “ask Roby to review this code,” it just flows. You’re not thinking about system architecture or function calls. You’re having a conversation.

That shift matters more than you’d expect.

## What It Looks Like
Here’s how to set this up in Claude Code:

**Step 1: Check your current agents**

Your custom agents appear alongside the built-in ones.

**Step 2: Create a new agent**

Pick project-specific or personal (global) scope.

**Step 3: Give it a name that sticks**

This is “Roby the Reviewer.” Notice how the name appears in the description and system prompt: “You are Roby The Reviewer, an expert code reviewer…” It gives the agent identity.

**Step 4: Build out your team**

Meet “Anna the git master” — same approach, different specialization.

Her system prompt: “You are Anna, an elite Git master with decades of experience…” You’re creating distinct personalities for different tasks.

**Step 5: You’re ready**

Now you have “roby-the-reviewer” and “anna-git-master” at your disposal.

## How It Actually Feels to Use
This is where the magic happens:

You type: `ask roby to review the present code`

Claude responds naturally: “I’ll use the roby-the-reviever agent to perform a comprehensive code review of …”

Roby handles the task.

“Roby has completed the code review! Here’s a summary of the key findings:”

The difference between this and standard “executing subagent protocol” interactions is simple: one feels mechanical, the other feels collaborative.

## You Can Keep Going
You can add “Chris the Team Manager”, an agent that checks the instructions of all the other agents …

The result: anna-git-master, chris-team-manager, roby-the-reviewer. Whether this is useful or overkill depends on your workflow.

And why not use a mix of people you know, animals, and famous people? Here are some of my best creations at your disposal:

> - Hawk-the-debugger- Beaver-the-builder (Need scaffolding anyone?)- Owl-the-documenter- Bob-the-backuper- Penny-the-penny-pincher (To watch your cloud costs)- Marie-Kondo-the-cleaner- Gordon-Ramsay-the-critic (Brutally honest code reviews)- Hermione-the-researcher (She has read all the docs)- … *I am curious to see your creations in the comments :-)*

## The Simple Takeaway
This won’t revolutionize how you work, but it will make your AI interactions feel less like operating software and more like collaborating with specialized team members.

Our brains remember names better than function descriptors. That’s the whole insight. Next time you create a custom agent, give it a name. See if “asking Roby” feels different than “invoking the code-review subagent.”

It did for me. And now when I need a code review, I don’t even think about which command to run: I just ask Roby.

**Thanks for reading!**

If you found this article helpful or inspiring, you’re welcome to support my work: it means a lot and helps me keep creating new content. You can [**buy me a coffee**](https://buymeacoffee.com/jacopocastellano) if you’d like to show your appreciation :-)

This story is published on [Generative AI](https://generativeai.pub/). Connect with us on [LinkedIn](https://www.linkedin.com/company/generative-ai-publication) and follow [Zeniteq](https://www.zeniteq.com/) to stay in the loop with the latest AI stories.

Subscribe to our [newsletter](https://www.generativeaipub.com/) and [YouTube](https://www.youtube.com/@generativeaipub) channel to stay updated with the latest news and updates on generative AI. Let’s shape the future of AI together!
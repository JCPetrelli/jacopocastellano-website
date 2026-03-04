---
title: "Claude Code 2.0: My First Impressions"
description: "On September 29th, I woke up to find Claude Code 2.0 in my terminal. No fanfare, no countdown, just there, ready to go."
date: 2025-09-30
tags:
  - Bash
  - MySQL
  - AI
  - Video
---

On September 29th, I woke up to find Claude Code 2.0 in my terminal. No fanfare, no countdown, just there, ready to go.

I’ve been using Claude Code for months now, and it’s become part of my daily workflow. So when I saw the changelog, I did what any developer would do: I immediately started testing the new features instead of working on my actual projects.

## What’s New in 2.0
The team at Anthropic didn’t just add a couple of features and call it a day. Version 2.0 is a proper update. There’s a redesigned UI that feels cleaner, a native VS Code extension that I’ll get to in a minute, and several new commands that actually solve real problems I’ve had.

They also renamed the SDK to “Claude Agent SDK” and added dynamic subagents with an ` — agents` flag, but honestly, those are for people building on top of Claude Code. For everyday use, the magic is in the smaller things.

## 4 Features That will For Sure Improve How I Work

### /rewind
This one’s simple but brilliant. You know when Claude makes changes and you immediately think “wait, no, go back”?

Before, I’d use Git before any change, and I still will for major refactors, but now it’s a matter of seconds to undo things. What makes `/rewind` special is its precision: you can jump back to any previous prompt you wrote and choose whether to rewind just the code, just the conversation, or both.

So I just type `/rewind`, pick my point, and I’m back.

### /usage
Now i can admit it: I’m paranoid about hitting plan limits. Before this update, I had no idea how much I was using until I got that dreaded “you’re approaching your limit” notification.

The `/usage` command shows exactly where you stand with your plan. It’s not fancy, but it’s useful. Now I can check before starting a big refactoring session, which gives me peace of mind.

### Tab for Thinking Mode
Press Tab, and Claude enters “thinking mode.” Instead of immediately responding, it thinks through the problem first, showing its reasoning before acting. The mode stays on across your entire session, which means you don’t have to keep toggling it.

I am probably going to use this when I’m working on something complex — database migrations, refactoring core logic, anything where I want Claude to slow down and think before making changes. The quality of responses is noticeably better.

### Ctrl-R for History Search
Here’s a problem I had all the time: I’d have a great conversation with Claude about some specific implementation detail, then two days later I’d want to reference it, and I’d spend five minutes scrolling through chat history trying to find it.

Ctrl-R lets you search your conversation history. Type a keyword, and it pulls up relevant exchanges. It’s borrowed from terminal history search, and it works exactly as you’d hope.

## The VS Code Extension
I saved this for last because it’s probably the biggest update, even though I haven’t fully migrated to it yet.

Claude Code now has a native VS Code extension. Before, you’d use it in your terminal alongside VS Code. Now it can live directly in your editor.

I’ve tested it, and it’s smooth. The integration feels natural: you’re working in your normal environment, and Claude is right there in the sidebar when you need it. No context switching between terminal and editor.

I’m still bouncing between the terminal version and the extension, mostly out of habit. But I can see myself moving to the extension full-time once I get used to the new workflow. If you live in VS Code, this is worth trying immediately.

## My Take After a Day of Testing
Look, version numbers don’t always mean much. Sometimes a “2.0” is just marketing. But this update actually feels like one.

What I appreciate most is that these features solve real problems. `/rewind` addresses the awkwardness of undoing AI changes. `/usage` tackles the anxiety of plan limits. Tab for thinking mode gives you control over response quality. Ctrl-R makes your conversation history actually useful.

These aren’t flashy features that look good in a demo. They’re the kind of things you use ten times a day and forget how you lived without them.

The VS Code extension is the headline feature, but honestly, it’s those small commands that have changed how I work with Claude Code. They feel like features designed by people who actually use their own product.

If you’re already using Claude Code, update and try `/rewind` and Tab. If you’re not using it yet and you code in VS Code, the native extension is your excuse to start.

I’m curious to see what else they build on this foundation. For now, I’ve got some actual work to catch up on — after I play with `/rewind` a few more times.

**Thanks for reading!**

If you found this article helpful or inspiring, you’re welcome to support my work: it means a lot and helps me keep creating new content. You can [**buy me a coffee**](https://buymeacoffee.com/jacopocastellano) if you’d like to show your appreciation :-)

This story is published on [Generative AI](https://generativeai.pub/). Connect with us on [LinkedIn](https://www.linkedin.com/company/generative-ai-publication) and follow [Zeniteq](https://www.zeniteq.com/) to stay in the loop with the latest AI stories.

Subscribe to our [newsletter](https://www.generativeaipub.com/) and [YouTube](https://www.youtube.com/@generativeaipub) channel to stay updated with the latest news and updates on generative AI. Let’s shape the future of AI together!
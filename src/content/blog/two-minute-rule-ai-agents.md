---
title: "The two-minute rule needs an update for AI agents"
description: "GTD says do anything under two minutes now. With agents most tasks start that fast, so the rule needs a review step and a fixed slot for it."
date: 2026-11-25
image: /blog/two-minute-rule-ai-agents/cover.png
tags:
  - Productivity
  - AI
  - Workflow
draft: false
---

David Allen's Getting Things Done (GTD) has a rule that most productivity courses repeat: if an action takes less than two minutes, do it now, while you are processing your inbox. Tracking it would cost more time than doing it. If it takes longer, the next question is whether someone else can do it.

I learned the rule in a Lynda.com course on GTD many years ago. A second course on time management styles gave a looser version: do as many short tasks of 5 minutes or less as you can. Both versions rest on the same assumption. Doing a short task costs about as much as writing it down.

With AI agents that assumption has changed. In my own estimate, about 80% of the tasks that reach me can now be started in under two minutes: a prompt, a command, a request to an agent. Applied as written, the rule now sends almost everything to "do it now".

## What the rule assumed

The rule sits inside Clarify, the second of GTD's [five steps](https://gettingthingsdone.com/fivesteps/). It assumed that a two-minute task finished in two minutes, that few tasks were that short, and that the person who started a task also did the work. With agents, starting is fast but the result still has to be checked, most tasks look short, and the agent works while you switch to something else.

## Starting is not finishing

A request that takes 30 seconds to type can come back as a code change or a draft email. Checking the result often takes longer than writing the request. The two-minute estimate only counts the prompt.

People are also bad at measuring this. In a [METR study from July 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), 16 experienced open-source developers did 246 tasks in their own repositories, with AI tools allowed or not allowed at random. With AI they took 19% longer. Before the study they expected a 24% speed-up, and afterwards they still thought AI had made them 20% faster. The authors point out the small sample and that the results cover early-2025 tools. The tasks were real issues, not two-minute jobs. The relevant part here is the gap between felt speed and measured speed.

## Many short tasks are many interruptions

When every task is under two minutes, doing them immediately means switching context all day. Each agent that finishes is also a new interruption: a result to read, a question to answer.

Gloria Mark, Daniela Gudith and Ulrich Klocke measured this in [The cost of interrupted work: more speed and stress](https://dl.acm.org/doi/10.1145/1357054.1357072) (CHI 2008). Interrupted people finished their tasks faster but reported more stress, frustration and effort. The study looked at interruptions in general, not at AI tools, but a day of finished-agent notifications is a day of interruptions.

The time management course I took had a concept for the opposite case: the Einstein Window, the part of the day when your head works best, which you protect from interruptions. It also suggested 10 minutes of buffer for every hour of work. A rule that says "do it now" to most tasks leaves no room for either.

## Doing the wrong things faster

The same course used the 80/20 rule: about 80% of incoming tasks are not strategically useful. The two-minute rule never asked whether a task should be done at all, because a short task was cheap enough to just do.

With AI, the cost of doing drops but the cost of having done it stays: each finished task can leave an output to check or a reply to answer.

## Not every task needs a review

Some delegated tasks are done when the agent says they are done. Others are not. The difference decides whether a task goes into a review queue at all.

A task can skip review when it is easy to undo, nobody else sees the result, and a mistake would show up through normal use. Renaming files, adding an event to your own calendar, converting a document to PDF or looking up an opening time are examples. If the agent gets one wrong, fixing it later takes a minute.

A task needs a review when the result goes to other people (an email, a post, a reply to a client), when it is hard to undo (deleting files, paying, changing a production system), or when someone will rely on it being correct, such as a figure in a report or code that ships.

The first group can follow the original two-minute rule almost unchanged: hand it off and forget it. The second group is where the time goes, and it needs its own slot.

## A fixed review slot every two hours

The schedule I propose is 15 minutes of batch review every two hours, as a recurring calendar event. In an eight-hour day that is four slots, one hour in total. All results from the second group wait for the next slot instead of interrupting the current work.

This fits inside the buffer from the time management course: 10 minutes per hour is 80 minutes a day, and the review slots take 60.

The agent can take part in this. If it knows when the next review slot is, it can tell you "this will be in the 14:00 review" instead of asking for attention now. With calendar access, it can also add the item to the description of that review event, so the slot opens with a list of what to check. If the list is too long for 15 minutes, that is a signal to add a slot or to move more task types into the no-review group.

## An updated version

GTD already has the missing piece: after "can you do it in two minutes?" comes "can it be delegated?". For most tasks the answer is now yes, to an agent. The questions change order:

1. Should this be done at all? Apply the 80/20 question first, because doing has become cheap.
2. Can it be handed to an agent in under two minutes? Then hand it off now, and do not wait for the result.
3. Does the result need a review? If not, the task is done.
4. If it does, it goes to the next two-hour review slot, and the agent puts it on that slot's list.
5. If you must do it yourself, decide if it is under two minutes of real work, review included. Only then do it now.

In this version the two minutes count the hand-off. None of the parts is new on its own: batching and time-blocking are old techniques, and GTD already has a fixed weekly review. The change is applying them to agent output, with the agent managing the queue.

## What this does not solve

The schedule above is a proposal. I tried it on myself and it increased my productivity. It takes some training, and I do not follow it every day. Results will differ from person to person.

There is no measurement here of whether batched review saves time compared to checking each result as it arrives, and the right interval may be shorter or longer than two hours for different work. The no-review group also depends on trust in the agent: a task type should move there only after its results have been correct for a while.

One check is easy to run: for a week, write down how long each "two-minute" AI task took from prompt to accepted result, review included, and mark which ones did not need a review at all.

---
title: "Introducing ChatGPT Plugins: Empowering AI with Real-time Information and Third-party Services"
description: "OpenAI takes ChatGPT to the next level by integrating plugins, enabling more capabilities, and enhancing user experience"
date: 2023-03-23
tags:
  - Automation
  - AI
  - Plugins
---

Have you ever imagined your AI assistant accessing real-time information, making bookings, or using third-party services? The wait is over! OpenAI has introduced initial support for plugins in ChatGPT, a cutting-edge language model designed with safety as a core principle. These plugins allow ChatGPT to interact with APIs defined by developers, perform a wide range of actions, and access up-to-date information, making it more powerful and versatile.

## What can ChatGPT Plugins do?
With ChatGPT plugins, users can experience a range of new features, such as:

- Retrieving real-time information like sports scores, stock prices, and news updates.
- Accessing knowledge-based information like company documents and personal notes.
- Performing actions on behalf of users, like booking flights or ordering food.

Please note that ChatGPT plugins are currently in limited alpha, which means access might be restricted. However, you can join the [waitlist](https://openai.com/waitlist/plugins) to be among the first to experience this exciting new feature.

## How do ChatGPT Plugins work?
Plugin developers provide one or more API endpoints, a standardized manifest file, and an OpenAPI specification. These components define the plugin’s functionality, enabling ChatGPT to consume the files and make calls to developer-defined APIs. ChatGPT acts as an intelligent API caller, proactively using APIs to perform actions based on natural language descriptions.

For example, if a user asks, “Where should I stay in Paris for a couple of nights?”, ChatGPT may call a hotel reservation plugin API, receive the API response, and generate a user-facing answer by combining the API data and its natural language capabilities. The system is expected to evolve over time, accommodating more advanced use cases.

## Building a ChatGPT Plugin
To build a plugin, developers need to follow these steps:

- Create a manifest file and host it at yourdomain.com/.well-known/ai-plugin.json. The file contains metadata about the plugin, authentication details, and an OpenAPI spec for the endpoints to be exposed.
- Register the plugin in the ChatGPT UI by selecting the plugin model from the top dropdown, then selecting “Plugins,” “Plugin Store,” and finally “Install an unverified plugin” or “Develop your own plugin.”
- Users must activate your plugin in the ChatGPT UI manually. During the alpha phase, plugin developers can share their plugins with 15 additional users (developers only). Over time, a review process will be introduced to expose the plugin to ChatGPT’s entire user base.
- When users begin a conversation, OpenAI will inject a compact description of the plugin in a message to ChatGPT, invisible to end users. The model will incorporate API results into its response to the user, potentially including links returned from API calls as rich previews.

Here is the link for the waitlist: [https://openai.com/waitlist/plugins](https://openai.com/waitlist/plugins) :-)
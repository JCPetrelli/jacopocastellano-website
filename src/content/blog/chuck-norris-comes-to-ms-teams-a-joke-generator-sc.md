---
title: "Chuck Norris Comes to MS Teams: A Joke Generator Script"
description: "Running out of ideas to boost morale and relieve the stress of your team during the long winter months? Look no further! An automated…"
date: 2023-02-08
tags:
  - Bash
  - Python
  - Automation
  - Regex
  - AI
---

Running out of ideas to boost morale and relieve the stress of your team during the long winter months? Look no further! An automated python generator of customized Chuck Norris jokes sent directly to your ms teams channels is precisely what you need. Without further ado, let’s build it together with nothing more than Python, an online Chuck Norris API, and the “pymsteams” module.

*Notice that this article will be full of Chuck Norris quotations with no actual use, except to motivate you to keep going. Here is an example:*

> When Chuck Norris does a pushup, he isn’t lifting himself up, he’s pushing the Earth down.

## Setting up our environment

### How to create an MS Teams webhook
To start our project, we first want to create an “incoming webhook” in MS Teams. To do this we will create a new team just dedicated to Chuck Norris, which we will use a s a test playground. If you already know in which team you would like your Chuck Norris quotes to appear, you can skip this step.

Feel free to add the colleagues that you want to be part of your “Chuck” team:

> Chuck Norris can mix oil with water
Each team in ms teams has a set of “channels.” In our case, we will use the default “General” channel but you can create a new channel if you prefer and use that.

Click on the 3 dots and on “Connectors.” Select “Incoming Webook” by pressing “Add.” This will add the new webhook to your channel.

If ms teams will let you out of the configuration window, you need to click again on “Connectors”, find “Incoming Webhook” and this time click on the “Configure” button.

> There is no theory of evolution. Just a list of creatures Chuck Norris has allowed to live.
Add the name of the connection (in our case “Chuck Norris,” how creative!) and upload a meaningful image, because design is everything.

After you hit “Create,” remember to save the URL provided and have it ready for later.

> Whenever Chuck Norris goes for a swim in the ocean, the sea level drops 11 inches around the world.

### Send a test message to your channel
Now let’s do a test right away to see if our webhook is working properly. Open your favorite shell and enter the following code (remember to replace <YOUR WEBHOOK URL> with the URL you copied previously)

```bash
// on macOS or Linux
url -H 'Content-Type: application/json' -d '{"text": "Hello Chuck!"}'
```
If you are using Windows:

```bash
// on Windows
curl.exe -H "Content-Type:application/json" -d "{'text':'Hello Chuck!'}"
```
Check your channel in ms teams to see if you received the “Hello Chuck!” message.

> When Chuck Norris uses a bow and arrow, the ghost of Robin Hood appears with a notebook

### It’s time to get our hands dirty in Python!
Let’s create our python file (chuck_norris.py), a new virtual environment (I will use venv), and install the modules we need. We will need the requests module and the pymsteams module and we can install both of them with pip:

```bash
pip install requests pymsteams
```

### Import statements
We begin by entering all our “import statements” that we will need in the script:

```python
import json
import requests
import random
import re
import pymsteams
```

> There’s no life on Mars because Chuck Norris has already been there.

### Let’s get some jokes
We will get our chuck norris quotes from a great online API: [https://api.chucknorris.io/](https://api.chucknorris.io/) (Credits to Mathias Schilling!). To do this, we’ll use the requests module to send a request to the API that will return a JSON object. We will access the “value” of this object and save it for later.

```python
# Get joke from API
response = requests.get("https://api.chucknorris.io/jokes/random")
data = json.loads(response.text)
joke = data["value"]
print(joke)
```

### Make it personal
Now we customize our quote with the names of our dear colleagues, who will be ecstatic to see their names “norrized.” To do this, we first create a list with the names of our colleagues. Then we will choose a name at random thanks to the “random” module and add “Norris” between the first and last names. And finally, we will use a simple regex to replace the newly created name in our original citation:

```python
# List of names
list_of_names = ['Joanna Palmer', 'Tara Armstrong', 'Brian Davidson', 'Jay Hamilton', 'Thomas Rice', 'Ricky Morris', 'Gloria Myers', 'James Harrell', 'Natasha Mata', 'Thomas Bailey']

# Let's choose a random name to "Norrize"
chosen_name = random.choice(list_of_names)
splitted_name = chosen_name.split()
norrized_name = splitted_name[0] + " Norris " + splitted_name[1]

# Let's substitute it in our joke
pattern = "Chuck Norris"
customized_joke = re.sub(pattern, norrized_name, joke )
```

> When Tom created Myspace, his first friend was Chuck Norris.

### Time to send our joke
We’re almost at the end because the pymsteams module will handle the whole engine for sending messages in ms teams:

```python
# You must create the connector card object with the Microsoft Webhook URL
myTeamsMessage = pymsteams.connectorcard("Insert_Here_Your_MS_Teams_Webhook_URL")

# Add text to the message.
myTeamsMessage.text(customized_joke)

# Send the message.
myTeamsMessage.send()
```
And there you have it! Our fabulous new personalized Chuck Norris joke has been successfully sent to our MS Teams channel!

## Complete Code
Here is all the code we wrote:

```python
import json
import requests
import random
import re
import pymsteams

# Get joke from API
response = requests.get("https://api.chucknorris.io/jokes/random")
data = json.loads(response.text)
joke = data["value"]
print(joke)

# List of names
list_of_names = ['Joanna Palmer', 'Tara Armstrong', 'Brian Davidson', 'Jay Hamilton', 'Thomas Rice', 'Ricky Morris', 'Gloria Myers', 'James Harrell', 'Natasha Mata', 'Thomas Bailey']

# Let's choose a random name to "Norrize"
chosen_name = random.choice(list_of_names)
splitted_name = chosen_name.split()
norrized_name = splitted_name[0] + " Norris " + splitted_name[1]

# Let's substitute it in our joke
pattern = "Chuck Norris"
customized_joke = re.sub(pattern, norrized_name, joke )

# You must create the connectorcard object with the Microsoft Webhook URL
myTeamsMessage = pymsteams.connectorcard("Insert_Here_Your_MS_Teams_Webhook_URL")

# Add text to the message.
myTeamsMessage.text(customized_joke)

# send the message.
myTeamsMessage.send()
```

### Additional tip: Use cronjobs
If you would like to schedule a joke to be sent, for example, every day at 3 PM, you can use cronjobs on any UNIX-based system. To do this just open crontab via terminal with:

```bash
crontab -e
```
And add the following line to the end of the crontab file:

```bash
0 15 * * * /usr/bin/python /path/to/chuck_norris.py
```

### Conclusion and GitHub Repo
I hope you will have a lot of fun with this script! Here is the GitHub repo for this project: [https://github.com/JCPetrelli/Chuck-Norris-Jokes-for-MS-Teams](https://github.com/JCPetrelli/Chuck-Norris-Jokes-for-MS-Teams). Feel free to clone and fork it as you wish :-)
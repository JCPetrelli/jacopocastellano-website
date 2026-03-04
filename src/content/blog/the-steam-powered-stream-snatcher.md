---
title: "The Steam-Powered Stream Snatcher"
description: "The Ultimate Tool for Harvesting YouTube Videos with Elegance and Efficiency (In Python)"
date: 2022-12-21
tags:
  - Bash
  - Python
  - Automation
  - Regex
  - AI
---

“Steam-Powered Stream Snatcher” is a Python script designed to facilitate the efficient and effective download of YouTube videos for free. At the end of this article, you will find a GitHub repository where I will host all the code written in this article. Feel free to clone it and follow along :-)

Disclaimer: Please note that downloading YouTube videos may violate the terms of service of YouTube. This script is intended for educational purposes only, and the user is responsible for any consequences of using it.

The script is a Command Line Interface (CLI) tool that can be invoked using the following syntax:

```css
python3 yt_download.py URL [DESTINATION]
```
The URL parameter specifies the target video or playlist to download, while the optional DESTINATION parameter specifies the location where the downloaded files should be saved. If DESTINATION is not provided, the files will be saved in the default “downloads” folder, in the same directory where the script resides.

One of the key features of “Steam-Powered Stream Snatcher” is the inclusion of a sleek and sophisticated progress bar, which allows the user to monitor the download progress in real-time. Additionally, the script ensures that the downloaded files have safe and stylish names by removing any spaces or special characters.

To further customize the download process, the script includes a variable called “i_want_the_highest_quality” that allows the user to specify whether they want to prioritize download speed or video quality. Setting this variable to `True` will result in the highest quality video being downloaded, albeit at a slower rate. Conversely, setting the variable to `False` will result in a faster download at the expense of video quality.

Finally, “Steam-Powered Stream Snatcher” is designed to handle non-existent destination folders by automatically creating them as needed, complete with all the brass and clockwork flourishes you’d expect from a top-notch steampunk tool.

Overall, “Steam-Powered Stream Snatcher” is a powerful and reliable tool for downloading YouTube videos, and is particularly useful for users who demand both efficiency and style.

In this article/tutorial we will look at how to write this script from scratch and we will learn some useful things along the way. In particular:- How to use the pytube library- How to write safe filenames- How to use progress bars in pytube- How to create and remove directories safely

## Let’s code
Firstly we need our import statements and in particular, the ‘pytube’ module which is the heart of this script:

1. `os`: This is the Python Standard Library module for interacting with the operating system. It provides functions for interacting with the file system, executing shell commands, and other common tasks. 2. `sys`: This is another Python Standard Library module that provides access to some variables and functions that are used or maintained by the Python interpreter. It can be used to access command line arguments, manipulate the interpreter’s search path, and other system-specific functionality. 3. `pytube`: This is a third-party Python library for downloading YouTube videos. It provides a simple interface for interacting with the YouTube API and downloading videos in a variety of formats. 4. `on_progress`: This is a function from the `pytube.cli` module that is used to monitor the progress of a video download. It takes a `stream` object and a `chunk` of data as arguments and is called every time a chunk of data is downloaded. 5. `tqdm`: This is a third-party Python library for creating progress bars. It can be used to display the progress of a task, such as a video download, to the user. 6. `unidecode`: This is a third-party Python library for transliterating Unicode characters to ASCII characters. It can be used to convert non-ASCII characters in a string to their nearest ASCII equivalent. 7. `re`: This is the Python Standard Library module for working with regular expressions. It provides functions for searching and manipulating strings using pattern matching.

Let’s immediately define the variable that will be used to understand if we want the maximum quality possible from our videos or a “passable” one:

Self-explanatory, isn’t it?Next, we define immediately the function that will let our script know if the URL we will pass is the URL of a single youtube video or that of a playlist.

## Is it a single video or a playlist? No worries, I will tell you
The function checks if the string “list” appears in the `URL` string. If it does, the function returns the string “playlist”. If it does not, the function returns the string “video”.This function can be used to determine whether the given URL is for a playlist or a single video on YouTube. For example, if the URL is [https://www.youtube.com/watch?v=GjNjhdLTqlU&list=PL-IXdkJ4LY4kPl_NVIBzF9golxkF71VBp](https://www.youtube.com/watch?v=GjNjhdLTqlU&list=PL-IXdkJ4LY4kPl_NVIBzF9golxkF71VBp) which is the URL for a playlist, the function would return “playlist”. On the other hand, if the URL is “[https://www.youtube.com/watch?v=CODd7WRi74o](https://www.youtube.com/watch?v=CODd7WRi74o)", which is the URL for a single video, the function would return “video”. This will be super important later, and we give to our script that little “spark” of intelligence that will make things easy for us.

Coming next, is another useful function that will we need to write a safe filename for our downloaded files.

## Writing “Safe” filenames
This function takes a single argument, `filename`, which is a string representing a file name. The function performs the following steps:

1. It uses the `re` module to remove any special characters (i.e., characters that are not letters, digits, or underscores) from the `filename` string using a regular expression. This results in a new string, `safe_filename`, which only contains letters, digits, and underscores. 2. It replaces any remaining spaces in the `safe_filename` string with underscores using the `replace()` method. 3. It uses the `unidecode()` function from the `unidecode` library to convert any non-ASCII characters in the `safe_filename` string to their nearest ASCII equivalents. This results in a new string, `safe_filename`, which only contains ASCII characters. Finally, the function returns the `safe_filename` string.

The purpose of this function is to create a version of the `filename` string that is safe to use as a file name on most operating systems. Some operating systems have strict rules about what characters are allowed in file names, and this function ensures that the `filename` string complies with those rules by removing special characters and converting non-ASCII characters to ASCII equivalents.

Now let’s get to the heart of the script, with the function used to actually download our videos.

First, we create a YouTube object using the URL provided and assign it to the variable `yt`. Then we retrieve the title of the video from the `yt` object and store it in the `video_title` variable. We finally print a message to the console indicating which video we are downloading. This will become handy when we are downloading a full playlist and we want to know which video we are currently downloading.

The function also defines an `on_progress_callback` function that is called during the download process to track the progress of the download. We also prepare the ‘video_title_safe_for_filename’ variable that we will use later to save our video files, thanks to the function `make_safe` we defined earlier).

Let’s keep working on this function:

Firstly we check if the value of the variable `i_want_the_highest_quality` is `True`. If it is, the function does the following:

1. It creates a temporary folder called “temp_folder” if it does not already exist.2. It downloads the highest-quality video from YouTube using `pytube`, and saves it in the “temp_folder” with the file name “video.mp4”.3. It downloads the audio, and saves it also in the “temp_folder” with the file name “audio.mp3”.

**Now … why are downloading audio and video separated? Are we not complicating things?** This has to do with the streaming technique that YouTube adopted called Dynamic Adaptive Streaming over HTTP (DASH). It is very clearly explained in the pytube documentation [at this link](https://pytube.io/en/latest/user/streams.html) if you want to know more. To summarize we need to download video and audio separately to get the highest possible quality and then we need to sync them together again using FFmpeg, which comes next:

In this code, we set the variables `audio_file`, `video_file`, and `output_file` to file paths based on the values of `temp_folder`, `destination`, and `video_title_safe_for_filename`.

Next, we use the `subprocess.run` function to run the command `ffmpeg -i audio_file -i video_file -c copy output_file`. This command uses the `ffmpeg` tool, a popular open-source multimedia framework, to combine the audio and video files located at `audio_file` and `video_file`, respectively, and create a new video file at the `output_file` location. The `-i` flag specifies the input files, the `-c` flag specifies the codec to use for the output file (in this case, “copy” tells `ffmpeg` to copy the codec from the input file), and the `output_file` is the file path where the resulting video will be saved.

Then we make some spring cleaning by removing the ‘temp_folder’ which we do not need anymore and return the function so that the code after this will not be executed:

If instead, we didn’t need the highest quality possible, the rest of the function will be executed:

Here we use the `streams.filter()` method to filter the available streams to those that are progressive (meaning they can be played smoothly, as opposed to being delivered in a series of discrete chunks) and have the file extension “mp4”.

The `order_by()` method is used to sort the streams by resolution in descending order, and the `desc()` method is used to reverse the order so that the streams with the highest resolution are first in the list. The `first()` method is then used to retrieve the first stream in the list, which should be the one with the highest resolution. Finally, we download the file.

Here is the complete “download_video” function:

## Approaching the End …
Now let’s write our main function, in which we will work with the arguments of our CLI script, create a destination folder (if not already existing), and wrap up by calling all the previously defined functions in the right order:

The main() function starts by checking the number of arguments we provided when we ran the script. If two arguments were provided, we use the first argument as the URL of the YouTube video or playlist to be downloaded and the second argument as the destination folder to download the video or playlist to. If only one argument was provided, we use the argument as the URL and set the destination folder to a default folder called “downloads”. If the incorrect number of arguments were provided, we print an error message and exit.

Next, we check if the destination folder specified or set to the default folder exists. If it doesn’t exist, we create the folder.

We then call the function ‘check_if_video_or_playlist()’’ and pass the URL as an argument. This function returns a string indicating whether the URL is a single video or a playlist. If the URL is a single video, we call the download_video() function and pass the URL and destination folder as arguments to download the video. If the URL is a playlist, we use pytube to retrieve the list of URLs for the videos in the playlist. We then ask the user to confirm that they want to download the videos in the playlist. If the user confirms, we iterate through the list of URLs and call the download_video() function for each URL to download all the videos in the playlist. Finally, we print a message indicating the number of videos downloaded and the destination folder they were downloaded to.

## GitHub Repo
And here is the link to my GitHub Repo: feel free to clone it and use it for your projects:

## Wrapping-up
In conclusion, we have learned how to write a Python script to download single videos from YouTube or entire playlists in high quality. We learned how to use the pytube library to retrieve video URLs and download videos, how to write safe filenames to avoid issues with special characters, how to use progress bars in pytube to track the progress of downloads, and how to create and remove directories safely to avoid errors. I hope that this tutorial has been helpful and that you now have the knowledge and skills to create your own scripts to download YouTube videos. Please feel free to let me know if you have suggestions, ideas, questions, or improvements. Have a great one!
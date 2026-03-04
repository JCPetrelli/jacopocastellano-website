---
title: "Automate Your Backups with Bash Scripts"
description: "Say goodbye to manual backups! This collection of scripts makes it easy to automate your backups and protect your valuable data. For free."
date: 2022-12-09
tags:
  - Bash
  - Automation
  - Backup
  - SSH
  - MySQL
---

Backing up your data is an essential part of maintaining the integrity and recoverability of your important information. Whether you are a software developer, a system administrator, or just a regular user, you need to make sure that your data is safe and recoverable in case of any unforeseen events.

One way to automate your backups is to use bash scripts. Bash (Bourne-Again SHell) is a Unix shell and command-line interpreter that is commonly used on Linux and other Unix-like operating systems. With bash, you can write scripts to automate various tasks, including backups.

In this article, we will look at a collection of bash scripts that can be used to perform backups of various types. These scripts are designed to be easy to use and customize, so you can use them as-is or modify them to suit your specific needs.

## Scripts
The following scripts are included in this repository:

- `backup.sh`: This script performs a full backup of the specified source directory to the destination directory using `rsync`.
- `incremental_backup.sh`: This script performs an incremental backup using `rsync`. Only files that have changed since the last backup will be copied.
- `mysql_backup.sh`: This script performs a backup of a MySQL database. It creates a dump file of the database and saves it to the destination directory.
- `mongodb_backup.sh`: This script performs a backup of a MongoDB database. It creates a dump of the database and saves it to the destination directory.
- In the folder “rsync_variations” you will find additional backups scripts that can be adapted to other use cases, for example backups to be done via ssh or excluding certain files.

## Usage
To use these scripts, clone this repository and make the scripts executable:

```bash
git clone https://github.com/JCPetrelli/Backup-Scripts.git
cd Backup-Scripts
chmod +x *.sh
```
You can then run the scripts by specifying the source and destination directories, and any other required arguments. For example:

```bash
./backup.sh /path/to/source /path/to/destination
./incremental_backup.sh /path/to/source /path/to/destination
./mysql_backup.sh username password /path/to/destination
./mongodb_backup.sh /path/to/destination
```

### Additional Tip
To streamline even more your backup strategy, consider to use bash aliases to run different backup scripts with some terminal shortcuts. Here is how to do it:

## Conclusion
In this short article, we have looked at a collection of bash scripts that can be used to automate your backups. These scripts make it easy and convenient to create backups of your files, databases, and other important data. They are flexible and customizable, so you can use them as-is or modify them to suit your specific needs.

If you have any comments or suggestions, or if you need additional use cases, feel free to leave a comment or write to me. I would be happy to hear from you and help you automate your backups with bash scripts.
---
title: "The Ultimate (Easy) Guide to Setting Up SSH Key Pairs"
description: "Eliminate the need for passwords with SSH key pairs! Get started with this handy guide and take your security to the next level."
date: 2022-12-16
tags:
  - Bash
  - Automation
  - SSH
  - AI
  - Password
---

SSH (Secure Shell) is a network protocol used to securely connect to a remote computer. One way to authenticate with the remote server when using SSH is by providing a username and password. However, this can be inconvenient if you need to frequently connect to the same server, as you will need to enter the password each time.

An alternative method of authentication is to use an SSH key pair. An SSH key pair consists of a public key and a private key. The public key is copied to the remote server and is used to verify the authenticity of the private key. The private key is kept on the local machine and is used to authenticate the user when connecting to the remote server.

Using an SSH key pair has several benefits:

- It is more secure than using a password, as the private key is much longer and more difficult to crack.- It is more convenient, as you do not need to enter a password each time you connect to the server.- It allows you to automate tasks, such as setting up a continuous integration or deployment pipeline, as the server can be configured to trust the public key and allow connections without requiring user intervention.

Overall, using an SSH key pair is a good way to secure your connections to remote servers and make it easier to work with those servers.

## Let’s do it!
To create an SSH key pair, you will need to have a program called `ssh-keygen` installed on your local machine. This is typically installed by default on most Unix-based systems, such as Linux and macOS. If you are using a Windows system, you can download and install the OpenSSH client.

To generate an SSH key pair, open a terminal window and enter the following command:

```bash
ssh-keygen -t rsa
```
This will start the key generation process. You will be asked to specify a file to save the key pair in. By default, the key pair is saved in the `~/.ssh` directory with the file name `id_rsa`. You can accept the default location by pressing Enter.

Next, you will be asked to enter a passphrase. A passphrase is an optional security measure that adds an additional layer of protection to your private key. It is essentially a password for your private key. If you do not want to use a passphrase, you can simply press Enter.

After the key pair has been generated, you will see output similar to the following:

```bash
Your public key has been saved in /home/user/.ssh/id_rsa.pub.
Your private key has been saved in /home/user/.ssh/id_rsa.
```
The public key is the key that you will copy and paste onto the remote server. The private key is the key that you will keep on your local machine and use to authenticate yourself when connecting to the remote server.

To use the key pair to authenticate yourself when connecting to a remote server, you will need to copy the public key to the remote server and then add the private key to your ssh-agent.

To copy the public key to the remote server, use the `ssh-copy-id` command followed by the user and hostname of the remote server. For example:

```bash
ssh-copy-id user@remote-server
```
You will be prompted for the password of the user on the remote server. After entering the password, the public key will be added to the `~/.ssh/authorized_keys` file on the remote server.

To add the private key to the ssh-agent, use the `ssh-add` command followed by the path to the private key file. For example:

```bash
ssh-add ~/.ssh/id_rsa
```
You will be prompted for the passphrase, if you specified one when generating the key pair.

Once the private key has been added to the ssh-agent, you should be able to use it to authenticate yourself when connecting to the remote server without being prompted for a password. Just ssh into your remote machine to test it ;)

```bash
ssh user@remote-server
```

## Wrapping up …
In summary, using an SSH key pair is a convenient and secure way to authenticate with a remote server when using SSH. It involves generating a public and private key on your local machine, copying the public key to the remote server, and adding the private key to your ssh-agent. This allows you to connect to the remote server without needing to enter a password each time. Using an SSH key pair has several benefits, including increased security and automation potential, making it a useful tool for anyone working with remote servers.

I hope you will find this small but essential tutorial useful! Let me know in the comments if something didn’t work.
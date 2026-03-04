---
title: "The Case for Paid Password Managers: Lessons from a DIY Approach"
description: "Exploring the pros & cons of building a DIY password manager with Python, and why professional tools like 1Password are worth the investment"
date: 2024-11-19
tags:
  - Bash
  - Python
  - Automation
  - Backup
  - AI
---

A friend of mine asked me the other day if I could recommend a convenient password manager, preferably free, without breaking the bank. I personally love 1Password because of all its cool integrations, top-notch security, and other useful features. But for him, it was a bit too pricey, and he didn’t need all those bells and whistles. He just wanted a tool to keep around twenty passwords for his main accounts and services.

So, I thought, why not try to build a basic version of a password manager using Python and Tkinter? It seemed like a fun project to explore security issues and learn how to prevent different types of attacks. Plus, it could be a way to see if it’s really worth continuing to pay for a service like 1Password (spoiler: it totally is! At least for me).

Here’s the complete code for this little project of mine:

> [https://github.com/JCPetrelli/password_manager](https://github.com/JCPetrelli/password_manager)
I’ll walk you through how to use it and explain how it works. But I’ll also share with you something that might sound completely counterintuitive: why you **shouldn’t** actually use it.

## A short introduction
This **Password Manager** script is a user-friendly tool for managing and encrypting your passwords for free. It provides a graphical interface for storing and retrieving passwords and includes basic hashing and encryption features. It’s certainly better than writing your passwords on a post-it note attached to your computer or saving them in a .txt file on your desktop named “my_secret_passwords.txt.” However, it isn’t much more secure than that, and I’ll explain why in a moment.

Here’s how to get started.

## How to use it
**Initial Setup**On the first run, the script will prompt you to set a master password. This password is *securely* (← ahah!) hashed using *bcrypt* and stored in a .env file, which is automatically created if it doesn’t already exist. This .env file will not be seen by the “normal” everyday computer user, but with a simple `ls -la`command it can be spotted by anybody. Along with the hashed master password, the script also generates and stores an encryption key for the password management part.

**Authentication**Each time you launch the script after the initial setup, you will need to authenticate with the master password. Upon successful authentication, the main interface of the Password Vault will open.

**Adding and Managing Passwords**The main interface allows you to:

• **Add a Password**: Enter the service name and password.

• **Retrieve a Password**: Select a service to view its password.

• **Edit a Password**: Update a certain service name or password.

• **Copy a Password**: Copy a service password to the clipboard for easy use.

**Generating Random Passwords**You can also generate strong, random passwords that meet specific security criteria (e.g., uppercase, special characters, and numbers). These passwords are copied directly to the clipboard for convenience.

**Viewing and Managing Saved Services**

The password list dynamically updates whenever changes are made, displaying all saved services for easy access.

## Any Advantages? Of course!
At first glance, we could appreciate the effort and compile a list of advantages of using such a script. For example:

1. **Local Storage for Security**

• All passwords are stored locally on the device, reducing the risk of them being exposed during transmission or via a breach in cloud-based services.

2. **Encryption for Password Protection**

• The script encrypts stored passwords using the Fernet encryption method, ensuring that even if someone gains access to the storage, the passwords are not readable without the master password.

3. **Master Password Implementation**

• The use of a master password provides a single point of access, making it easy for the user to secure all other passwords.

4. **Customizable and Open Source**

• You can view, audit, and modify the script according to your specific needs.

5. **Random Password Generator**

• The built-in password generator creates secure, complex passwords, ensuring compliance with modern password security standards.

6. **Clipboard Integration**

• Passwords can be copied to the clipboard with a single click, making it convenient for pasting into login fields without manually typing them.

7. **Cross-Platform Potential**

• Being a Python-based application, it can be adapted to run on any operating system with minimal modifications.

8. **Simplicity in Management**

• The GUI design using Tkinter makes it user-friendly for managing stored passwords without the need for command-line interaction.

9. **Cost-Free Solution**

• No subscriptions or payments are required, as it is a personal script that avoids the cost of commercial password managers.

10. **Full Offline Capability**

• Works without an internet connection, allowing for use in any environment, even without connectivity.

11. **Password Update and Edit Capability**

• Users can easily update and edit stored credentials when required, ensuring their information remains up-to-date.

## Now let’s be real: Disadvantages and Security Issues
As promised at the beginning of this article, here are all the reasons why you should **NOT** use this custom script and should instead rely on other services like Apple Passwords (which, with the new Sequoia update, looks really good), 1Password, or similar alternatives:

1. **Lack of Multi-Device Syncing**

• Passwords are stored locally and are not synced between devices, making it inconvenient if you frequently switch between multiple devices (like most of us except my grandpa?)

2. **Single Point of Failure**

• Losing access to the device or the .env file containing the encrypted passwords and salt can result in the **complete loss** of all stored credentials.

3. **Master Password Risks**

• If the master password is weak or forgotten, all stored passwords become inaccessible. The script currently has no recovery mechanism for a lost master password.

4. **No Automatic Backup System**

• The script lacks an automated backup process, increasing the risk of data loss in case of device failure or accidental deletion of files.

5. **Limited Security Measures for Clipboard**

• Passwords copied to the clipboard are temporarily stored there, exposing them to potential interception by clipboard monitoring malware, which can capture clipboard content in real time.

6. **Susceptibility to Device-Level Threats**

• Being fully local, the security of the password manager relies entirely on the safety of the device. Malware, keyloggers, or unauthorized physical access to the device can compromise stored data.

7. **Manual Setup and Maintenance**

• Users must manually manage and maintain the script, including installing dependencies, setting up the .env file, and handling updates or changes.

8. **Basic User Interface**

• While functional, the Tkinter-based interface is minimal and might lack the polish or features of modern password managers, such as tagging or advanced search.

9. **No Two-Factor Authentication (2FA)**

• The script does not support 2FA for an additional layer of security, leaving it solely dependent on the master password.

10. **Limited Scalability**

• The .env file can become unwieldy for users managing a large number of passwords, as it is not optimized for extensive password storage.

11. **Potential Encryption Key Mismanagement**

• If the salt or encryption key setup is incorrect or tampered with, it could render the passwords inaccessible or insecure.

12. **Dependency on External Libraries**

• Reliance on libraries such as cryptography and dotenv introduces a slight dependency risk, as compatibility or vulnerabilities in these libraries could impact the script.

13. **No Integrated Auto-Fill Feature**

• Unlike modern password managers, this script does not automatically fill credentials in browsers or applications, requiring manual copying and pasting.

14. **Limited Password Complexity Enforcement**

• Although it includes a password generator, it does not enforce complexity rules for manually entered passwords, potentially allowing weak passwords to be stored.

15. **Not Tested Against Real-World Threat Models**

• As a personal project, I didn’t test it against real-world attacks, such as brute-force attempts or advanced malware.

16. **Potential for User Mismanagement**

• The script relies heavily on user behavior, such as creating strong master passwords and secure backups. Improper usage can compromise the entire system.

17. **No Logging or Monitoring**

- The script does not track access attempts or provide an audit trail, making it difficult to identify unauthorized access or usage.

## Conclusion
For me, writing this little script has been a way to better understand how a password manager works and to appreciate the effort behind the services we use every day. It’s definitely not something you should rely on for real-world use, as it has several limitations and security risks compared to professional services like Apple’s Passwords app or 1Password. If you’re experimenting or learning, it’s an interesting project (You are welcome to contribute to it on GitHub). However, for managing your passwords securely, stick to tools that are specifically designed and rigorously tested for everyday use.

*Enjoyed this article? Follow me on Medium for more insights on automation and coding :-) *[*https://medium.com/@jacopocastellano*](https://medium.com/@jacopocastellano)
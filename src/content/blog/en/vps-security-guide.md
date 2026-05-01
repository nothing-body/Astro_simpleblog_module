---
title: "VPS Server Basic Security Configuration Guide"
pubDate: 2026-03-11
description: "Build a rock-solid Linux web server from scratch with best practices and protection strategies for Debian systems."
category: "Development"
tags: ["Security", "Linux", "DevOps"]
---

This is a complete tutorial guide for enhancing the security of a brand new VPS. This guide will use the Debian system as a demonstration and focus on blocking automated network scanning and brute-force malicious attacks. By viewing this post, you can see how the "Table of Contents (TOC)" renders perfectly!

## Initial Basic Setup

When you first get your new host, the most important thing is to confirm the current user status and system version.

### 1. Log into the server and create a custom account

We recommend creating a dedicated regular user and giving it the \`sudo\` privilege to maintain host security. Do not rely entirely on the root account.

```bash
useradd -m your_username
usermod -aG sudo your_username
```

### Require sudo password

To prevent unauthorized privilege escalation, you should ensure that the system strictly requires a password when executing \`sudo\`.

### 2. Enable Automatic Security Updates

For individuals who don't have time to inspect the server daily, setting up automatic security patching is vital to stop RCE loopholes in the minimum amount of time.

## NTP Synchronization

Ensuring server time synchronization is very important, especially when you plan to track logs or certificates.

### 3. Change SSH Port

Changing the default Port 22 can significantly reduce the frequency of brute-force crack attempts by brainless scanning scripts.

### 4. Disable root SSH access, allow specific SSH accounts

To protect the server from a login invasion, set \`PermitRootLogin\` to \`no\` in \`/etc/ssh/sshd_config\` immediately.

### 5. Config Passwordless SSH Login (SSH Key)

Using RSA or Ed25519 to create a key pair is a much safer authentication method compared to traditional string passwords.

### 6. Disable SSH Password Login

Once the key connection has been tested locally, disable \`PasswordAuthentication\` immediately. From then on, brute force dictionary attacks will be ineffective against your server.

## Install ssh-audit for SSH Security Inspection

To further strengthen encryption algorithms, use ssh-audit to weed out outdated cryptographic specifications on your system.

### 7. UFW Firewall

UFW is an easy-to-use firewall frontend tool.
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## Enable AppArmor

Executing protection at the local system level is also exceptionally crucial and shouldn't be overlooked.

## Debian Recommended Automatic Kernel Security Updates

Not just standard apt packages, but the kernel itself needs to stay updated via official sources.

## Hardening System Security with sysctl

Modifying network protection at the system core level can effectively prevent light-weight network attacks like SYN floods.

### 8. Intrusion Detection

Build your malicious traffic alert and automatic blocking system (IDS).

### 8-1 Use crowdsec

CrowdSec is the modern Fail2ban, utilizing community intelligence to aggressively block high-risk IPs.

### 9. Set up Cron for Linux Log Analyzer (Logwatch) to push to mail

Let the server report its health and the number of blocks to you daily.

#### Configure msmtp send server

Use third-party modern SMTP functionality for forwarding instead of unreliable native sendmail.

## Modify DNS

Use Cloudflare 1.1.1.1 or Google 8.8.8.8 for faster resolution and to avoid local ISP cache poisoning.

## Change Timezone

Set the appropriate timezone so logs reflect the correct hour markers, we strongly recommend using \`Asia/Taipei\`.

## Change Hostname

Modify your machine's default unreadable name.

### Use hostnamectl to modify hostname

Through this command, you can change it to your current project name, for example, \`astro-prod\`.

## Disable VPS IPv6

Disabling IPv6 reduces the complexity of managing multi-port defenses via your firewall if the service itself does not require it.

## Kernel

Keep it updated via \`apt\` commands.

## Install oh my zsh

Put some colors on your terminal interface.

### Prerequisites

You'll need \`git\` and \`zsh\` installed first.

### Install Fonts

Install Nerd fonts to avoid missing characters or broken icons when typing.

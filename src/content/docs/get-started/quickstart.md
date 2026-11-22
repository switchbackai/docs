---
title: Quickstart
description: Install the client, log in with GitHub, and connect GitHub, for a Receipt on your next push.
agent: |
  Set up Switchbak on this Mac with me. Use the steps below.

  1. Check that this Mac has Apple silicon and Homebrew. If it does not, stop and tell me.
  2. Run the brew install command.
  3. `switchbak login` and `switchbak connect` open my browser and ask me questions. Ask me to run each in my own terminal. Wait until I say that it is done.
  4. Run `switchbak status` and tell me what it prints.
sidebar:
  order: 2
next:
  link: /use-switchbak/the-receipt/
  label: The Receipt on a pull request
---

Install the client, log in with GitHub, and connect the GitHub App. Uploads start when login ends. The Receipt appears on your next push.

You need a Mac with Apple silicon, [Homebrew](https://brew.sh) and a GitHub account.

1. [Install the client](../set-up/install.md) from the Homebrew tap:

   ```bash
   brew install switchbackai/tap/switchbak
   ```

2. [Log in](../set-up/log-in.md) with GitHub. Setup then watches each [installed agent](../set-up/agents-and-roots.md):

   ```bash
   switchbak login
   ```

3. [Connect GitHub](../set-up/connect-github.md): install the App on your account or organization:

   ```bash
   switchbak connect
   ```

The next push to a pull request gets its [Receipt](../use-switchbak/the-receipt.md).

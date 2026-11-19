---
title: Quickstart
description: Install the client, log in with GitHub, and connect GitHub, for a Receipt on your next push.
sidebar:
  order: 2
---

Install the client, log in with GitHub, and connect the GitHub App. Uploads start when login ends. The Receipt appears on your next push.

You need a Mac with Apple silicon, [Homebrew](https://brew.sh) and a GitHub account.

1. [Install the client](../set-up/install.md) from the Homebrew tap:

   ```bash
   brew install switchbackai/tap/switchbak
   ```

2. [Log in](../set-up/log-in.md) with GitHub, then [choose the agents](../set-up/agents-and-roots.md) to watch:

   ```bash
   switchbak login
   ```

3. [Connect GitHub](../set-up/connect-github.md): install the App on your account or organization:

   ```bash
   switchbak connect
   ```

The next push to a pull request gets its [Receipt](../use-switchbak/the-receipt.md).

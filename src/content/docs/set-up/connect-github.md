---
title: Connect GitHub
description: Install the Switchbak App on a GitHub account or organization, so that its pull requests get a Receipt.
agent: |
  Set up Switchbak on this Mac with me. Switchbak keeps a Receipt of each change that a coding agent makes.

  Run each command yourself. No command reads stdin. I approve the sign-in code and the GitHub App myself. Never ask me for a password, a token or an invite link. Skip a step that is already done.

  1. Check that this Mac has Apple silicon and Homebrew. If it does not, stop and tell me.
  2. Install the client: `brew install switchbackai/tap/switchbak`.
  3. Sign in: run `switchbak login --device`. It prints a code and a link. Give both to me, and wait while I approve the code in my browser.
  4. Find the directories on this Mac that hold my git checkouts, for example ~/code or ~/src. Find the coding agents that I use, from these ids: claude_code, codex, cursor, gemini_cli, opencode. Show me the directories. Then run `switchbak setup -agents <ids> -root <dir> -yes`, with the ids comma-separated and one `-root` for each directory.
  5. Connect GitHub. Ask me if I am an admin, a member, or in a personal workspace. Skip this step for a member: an admin connects GitHub. In a personal workspace, ask me first, and skip it if I say no. Run `switchbak connect -print-url`. It prints a page on stdout and waits. Give me the page: I open it and install the Switchbak GitHub App. Wait for the command to finish.
  6. Run `switchbak next -json` and do the step it gives. When `by` is `agent`, run its `command`. When `by` is `person`, give me its `text` and wait until I say it is done. When `by` is `admin`, give me its `text` and stop. Repeat until `step` is `done`, or until the step only waits for a session or a pull request.
  7. Run `switchbak status -json`. Tell me what is ready and what is still to do.
sidebar:
  order: 4
---

```bash
switchbak connect
```

Do this once for each GitHub organization or account whose pull requests get a Receipt. Pull requests get no Receipt until it is done. [Read an Audit](../use-switchbak/read-an-audit.md) does not need it.

1. Connect opens the GitHub page that installs the Switchbak App. GitHub lists your account and your organizations, and marks each one that has the App with Configure
2. Select your account or an organization
3. Select which repositories the GitHub App may read
4. Press Install & Authorize

GitHub sends your browser back to Switchbak, and the page says "Switchbak is connected". Connect then prints `✓ GitHub connected`.

When your organization is already connected, connect prints the connected accounts and opens the same GitHub page, so that you can install on another account.

A member of a GitHub organization who is not an owner sees "Waiting for an owner to approve". GitHub sent the install to an owner. Ask an owner to approve it, and then run `switchbak connect` again.

The Receipt check and the Receipt comment appear on the next push to a pull request in a chosen repository.

When the GitHub account is already connected to the Switchbak organization of your team, connect offers to join that organization.

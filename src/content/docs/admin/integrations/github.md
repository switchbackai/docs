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
  5. Connect GitHub. Ask me if I am an admin, a member, or in a personal workspace. Skip this step for a member: an admin connects GitHub. In a personal workspace, ask me first, and skip it if I say no. A personal workspace connects only my own GitHub account, and a team workspace only GitHub organizations. Run `switchbak connect -print-url`. It prints a page on stdout and waits. Give me the page: I open it and install the Switchbak GitHub App. Wait for the command to finish.
  6. Run `switchbak next -json` and do the step it gives. When `by` is `agent`, run its `command`. When `by` is `person`, give me its `text` and wait until I say it is done. When `by` is `admin`, give me its `text` and stop. Repeat until `step` is `done`, or until the step only waits for a session or a pull request.
  7. Run `switchbak status -json`. Tell me what is ready and what is still to do.
sidebar:
  label: "GitHub"
  order: 1
---

```bash
switchbak connect
```

Do this once for each GitHub organization or account whose pull requests get a Receipt. Pull requests get no Receipt until it is done. [Read an Audit](../../guides/cli/read-an-audit.md) does not need it.

The type of your workspace decides what you can connect:

| Workspace | Connects                     |
| --------- | ---------------------------- |
| Personal  | Your own GitHub account only |
| Team      | GitHub organizations only    |

1. Connect opens the GitHub page that installs the Switchbak App. GitHub lists your account and your organizations, and marks each one that has the App with Configure
2. Select your own account for a Personal workspace, or your organization for a Team workspace
3. Select which repositories the GitHub App may read
4. Press Install & Authorize

GitHub sends your browser back to Switchbak, and the page says "Switchbak is connected". Connect then prints `✓ GitHub connected`.

When your organization is already connected, connect prints the connected accounts and opens the same GitHub page, so that you can install on another account.

The wrong type of account connects nothing:

- A Personal workspace and an organization: the page says "That is a GitHub organization". Make a Team workspace for the organization at [app.switchbak.dev/signup](https://app.switchbak.dev/signup). Run `switchbak login` again, choose the Team workspace, and connect the organization there
- A Team workspace and your own account: the page says "That is a personal GitHub account". Install the App on your organization instead

The install stays on GitHub, and Switchbak offers it again to the workspace that can take it.

A member of a GitHub organization who is not an owner sees "Waiting for an owner to approve". GitHub sent the install to an owner. Ask an owner to approve it, and then run `switchbak connect` again.

## Connect from the web app

An admin can also connect GitHub on [app.switchbak.dev](https://app.switchbak.dev). In a Personal workspace, the list shows only your own account:

1. Open the Overview. In the Get started checklist, press Install GitHub App
2. In Connect GitHub, press Install next to your organization. If the organization is not in the list, type its name in Organization on GitHub
3. On GitHub, select the repositories and press Install & Authorize

![The Connect GitHub step on the Overview: the permissions of the App, the organizations with Install, and the field Organization on GitHub](github/step.png)

Settings, Integrations then shows the GitHub App as installed, with its repositories. Press Manage on GitHub to add a repository.

![The Integrations tab of Settings: the GitHub App is installed on acme with two repositories](github/integrations.png)

The Receipt check and the Receipt comment appear on the next push to a pull request in a chosen repository.

When the GitHub account is already connected to the Switchbak organization of your team, connect offers to join that organization.

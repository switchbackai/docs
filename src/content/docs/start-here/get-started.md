---
title: Get started
description: Install the CLI, log in, connect GitHub, and get a Receipt on your next pull request.
agent: |
  Set up Switchbak on this Mac with me. Switchbak keeps a Receipt of each change that a coding agent makes.

  Run each command yourself. No command reads stdin. I approve the sign-in code and the GitHub App myself. Never ask me for a password, a token or an invite link. Skip a step that is already done.

  1. Check that this Mac has Apple silicon and Homebrew. If it does not, stop and tell me.
  2. Install the client: `brew install switchbackai/tap/switchbak`.
  3. Sign in: run `switchbak login --device`. It prints a code and a link. Give both to me, and wait while I approve the code in my browser. The first time, I create a Personal or a Team workspace there.
  4. Find the directories on this Mac that hold my git checkouts, for example ~/code or ~/src. Find the coding agents that I use, from these ids: claude_code, codex, cursor, gemini_cli, opencode. Show me the directories. Then run `switchbak setup -agents <ids> -root <dir> -yes`, with the ids comma-separated and one `-root` for each directory.
  5. Connect GitHub. Ask me if I am an admin, a member, or in a personal workspace. Skip this step for a member: an admin connects GitHub. In a personal workspace, ask me first, and skip it if I say no. A personal workspace connects only my own GitHub account, and a team workspace only GitHub organizations. Run `switchbak connect -print-url`. It prints a page on stdout and waits. Give me the page: I open it and install the Switchbak GitHub App. Wait for the command to finish.
  6. Run `switchbak next -json` and do the step it gives. When `by` is `agent`, run its `command`. When `by` is `person`, give me its `text` and wait until I say it is done. When `by` is `admin`, give me its `text` and stop. Repeat until `step` is `done`, or until the step only waits for a session or a pull request.
  7. Run `switchbak status -json`. Tell me what is ready and what is still to do.
sidebar:
  label: "Get Started"
  order: 2
next:
  link: /guides/receipts/
  label: Receipts
---

Get up and running in a couple of minutes. You'll need:

- A Mac with Apple silicon
- [Homebrew](https://brew.sh)
- A GitHub or Google account to sign in with
- A [supported agent](../guides/cli/set-up.md#supported-agents), like Claude Code

Rather have your coding agent do it? Press **Copy for your agent** and paste the prompt into your agent. You'll still approve the sign-in and the GitHub App yourself.

## 1. Install the CLI

```bash
brew install switchbackai/tap/switchbak
```

## 2. Log in

```bash
switchbak login
```

Your browser opens. Choose GitHub or Google, and check that the page shows the same code as your terminal.

![The login page of switchbak login, with Continue with Google and Continue with GitHub](get-started/choose.png)

## 3. Create your workspace

The first time you log in, the page says "Create your workspace". Choose:

- **Personal**, if it's just you
- **Team**, to work with others in your GitHub organization

Name the workspace and press **Create workspace**. When you're back in the terminal, setup picks your agents and checkout folders on its own and starts uploading your sessions.

:::note
Picked Team? See [Invite teammates](../admin/invite-teammates.md) to bring the rest of your team in.
:::

To see the account and the workspace that you logged in with, run:

```bash
switchbak whoami
```

It prints, for example:

```text
account   github octo
workspace octo (Personal)
```

## 4. Connect GitHub

Login asks `Connect GitHub now?` at the end. Press Return. You can also connect later from **Settings** > **Integrations** in the [web app](https://app.switchbak.dev), or from the terminal:

```bash
switchbak connect
```

Choose your GitHub organization for a Team workspace, or your own account for a Personal one. The page then says "GitHub is connected". If you're a member of a Team workspace, your admin does this step. See [Connect GitHub](../admin/integrations/github.md).

## 5. Check it's working

```bash
switchbak status
```

Look for `ready` on the first line. Then run your agent as usual and open a pull request. Its Receipt shows up on the pull request.

Want more detail on any step? See [Set up the CLI](../guides/cli/set-up.md).

---
title: Set up the CLI
description: Install the switchbak CLI, log in, pick the agents and folders it watches, connect GitHub, and check that everything's working.
sidebar:
  order: 1
---

This page walks through each setup step in detail. If you just want to get going, [Get started](../../start-here/get-started.md) is the short version. It also has a prompt you can hand to your coding agent so it does the setup for you.

## Before you start

You'll need:

- A Mac with Apple silicon (M1 or later). The CLI doesn't run on Intel Macs, Windows or Linux.
- [Homebrew](https://brew.sh)
- A GitHub or Google account to sign in with
- At least one [supported agent](#supported-agents)

## 1. Install

```bash
brew install switchbackai/tap/switchbak
switchbak version
```

`switchbak version` prints the release you just installed.

## 2. Log in

```bash
switchbak login
```

Your browser opens and the terminal prints a code. Choose **Continue with GitHub** or **Continue with Google**, check that the page shows the same code as your terminal, and press **Approve**. If the browser doesn't open, open the link that login prints.

Working on a Mac without a browser, like over SSH? Use `switchbak login --device` instead. It prints a link and a code. Open the link on any device, enter the code and approve. Only approve a code you entered yourself.

The first time you log in, you'll create a workspace:

- **Personal**: just you. Pull requests in your own GitHub repositories get a Receipt.
- **Team**: you and your teammates. Pull requests in your GitHub organization's repositories get a Receipt. You're the admin, and you [invite your teammates](../../admin/invite-teammates.md).

You can't change a workspace's type later. If your GitHub organization is already on Switchbak, login offers to join that workspace instead. [Accounts and workspaces](../accounts-and-workspaces.md) covers joining a team, linking GitHub and Google, and using more than one workspace.

Login saves your credentials in your macOS login keychain, then runs setup.

## 3. Pick your agents and folders

Setup runs on its own after login and asks you nothing. It picks two lists:

- **Agents**: each [supported agent](#supported-agents) that's installed on your Mac, with all of its projects. Sessions from agents you don't pick never leave your Mac.
- **Roots**: the folders that hold your git checkouts. Setup picks whichever of these exist: `~/src`, `~/code`, `~/work`, `~/Developer`, `~/Documents/GitHub` and `~/projects`. A repository outside these directories is minted only when a session names a clone of it. Otherwise its pull requests get no Receipt.

Setup prints what it picked:

```text
agents    Claude Code, Codex
roots     ~/src, ~/Documents/GitHub
Run `switchbak configure` to change them.
```

If setup can't find any agent or any root, it shows you a checklist so you can pick by hand. It then starts two background services (macOS launch agents): one uploads your sessions, the other keeps track of your checkouts. Your uploads start right away. They don't need GitHub.

Switchbak masks the secrets it finds in your sessions when they reach the server.

### Change your agents and folders

```bash
switchbak configure
```

Configure shows a checklist of agents, then a checklist of folders. Each list starts from your current choices. Rows show how many session files each agent has, and how many checkouts each folder holds.

| Key     | What it does                                    |
| ------- | ----------------------------------------------- |
| ↑ and ↓ | Move between rows.                              |
| Space   | Select or clear a row.                          |
| →       | Show the projects of Claude Code or Cursor.     |
| ←       | Hide the projects.                              |
| a       | Select every row, or clear every row.           |
| Enter   | Confirm. On "add a path", type a folder to add. |
| Ctrl-C  | Quit without changing anything.                 |

Want to keep one project's sessions on your Mac? Select its agent, press →, and clear that project. Codex, Gemini CLI and OpenCode don't group sessions by project, so they don't have project rows.

When you're done, configure restarts the background services. Clearing an agent doesn't remove the sessions it already sent. To remove one, see [Erase a session](manage.md#erase-a-session).

### Set up without questions

A script or a coding agent can pass the lists in directly:

```bash
switchbak setup -agents claude_code,codex -root ~/code -yes
```

`-agents` takes these ids, comma-separated: `claude_code`, `codex`, `cursor`, `gemini_cli` and `opencode`. Repeat `-root` once for each folder. With `-yes`, setup asks nothing, and fails if it finds nothing to watch.

### Supported agents

| Agent       | Where it keeps sessions                 | Id            |
| ----------- | --------------------------------------- | ------------- |
| Claude Code | `~/.claude/projects/`                   | `claude_code` |
| Codex       | `~/.codex/sessions/`                    | `codex`       |
| Cursor      | `~/.cursor/projects/`                   | `cursor`      |
| Gemini CLI  | `~/.gemini/tmp/`, `~/.gemini/sessions/` | `gemini_cli`  |
| OpenCode    | `~/.local/share/opencode/storage/`      | `opencode`    |

Installed a new agent? Run `switchbak configure` to add it.

## 4. Connect GitHub

Uploads and Audits work without GitHub. To get a Receipt on your pull requests, connect GitHub. If your workspace isn't connected yet, login asks at the end:

```text
Connect GitHub now? [Y/n]
```

Press Return, or run `switchbak connect` any time later. A Personal workspace connects your own GitHub account, and a Team workspace connects a GitHub organization. Only an admin connects a Team workspace. If you're a member, ask your admin. [Connect GitHub](../../admin/integrations/github.md) has the full steps.

A coding agent can run `switchbak connect -print-url` instead. It prints the page to open and waits until you've installed the GitHub App there.

## 5. Check that it works

```bash
switchbak status
```

The first line tells you whether this Mac is ready:

```text
ready     installed ✓  authenticated ✓  connected ✓
```

- `installed`: the background services are running.
- `authenticated`: the server accepts the credentials in your keychain.
- `connected`: the server has received a session from this Mac.

Before your first session, the line ends with `connected, waiting for first session — run an agent`. That's expected. Run Claude Code or another supported agent, then run `switchbak status` again. If a step fails, the next line tells you the command that fixes it, like ``run `switchbak login` to sign in``.

Below that, status shows where you're sending sessions, what it watches, how much the server holds, your newest Audit, and which GitHub accounts are connected. If GitHub isn't connected yet, you'll see:

```text
github    Receipts on pull requests are off
```

Not sure what to do next? `switchbak next` prints your next setup step, who does it, and the command to run.

Once your first session arrives, read its Audit. See [Audits in your terminal](audits.md).

## If there's no Receipt

| What you see                                         | What to do                                                                                                                                                                                                                                                 |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No `🧾 Receipt` check on the pull request            | The GitHub App can't read the repository. Run `switchbak connect` and select the repository on GitHub.                                                                                                                                                     |
| "Waiting for an owner to approve"                    | The repository belongs to a GitHub organization, so GitHub sent the install request to an owner. Ask an owner to approve it, then run `switchbak connect` again. Or try a repository on your own account.                                                  |
| The comment says "No session bound for this change." | Switchbak has no session for this change. Run `switchbak status` and check that your agent is selected and the repository is inside one of your roots. Then make the change again with your agent and push. See [step 3](#3-pick-your-agents-and-folders). |
| The Receipt doesn't assess the session               | The Audit failed. `switchbak status` shows the reason under the `audit` line. See [When an Audit fails](audits.md#when-an-audit-fails).                                                                                                                    |

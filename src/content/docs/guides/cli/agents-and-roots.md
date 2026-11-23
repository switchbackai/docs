---
title: Choose agents and roots
description: Choose the agents whose sessions Switchbak sends, and the directories that hold your checkouts, then check the installation.
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
  order: 3
---

Setup asks no questions. It selects two lists and prints them:

- The agents to watch: each [supported agent](supported-agents.md) that is on your Mac, with all its projects. A session of an agent that is not selected never leaves your Mac. The warehouse masks the secrets that it finds on arrival.
- The directories that hold your git checkouts: each of `~/src`, `~/code`, `~/work`, `~/Developer`, `~/Documents/GitHub` and `~/projects` that exists. A repository outside these directories is minted only when a session names a clone of it. Otherwise its pull requests get no Receipt.

```text
agents    Claude Code, Codex
roots     ~/src, ~/Documents/GitHub
Run `switchbak configure` to change them.
```

When setup finds no agent or no directory, it shows the checklist for that list.

## Change the agents and roots

```bash
switchbak configure
```

Configure shows one checklist for the agents, then one for the directories. Each starts from your current choices, with the count and size of the session files of each agent and the count of checkouts below each directory.

| Key     | What it does                                  |
| ------- | --------------------------------------------- |
| ↑ and ↓ | Move.                                         |
| Space   | Select or clear the row.                      |
| →       | Show the projects of Claude Code or Cursor.   |
| ←       | Hide the projects.                            |
| a       | Select each row, or clear each row.           |
| Enter   | Confirm. On "add a path", type a path to add. |
| Ctrl-C  | Stop. Setup changes nothing.                  |

To keep one project on your Mac, select its agent, press →, and clear the project. Configure writes an exclusion for it. Codex, Gemini CLI and OpenCode do not keep their sessions by project, so they have no project rows.

Configure then restarts the two launch agents. When you clear an agent, the sessions that it sent stay in the warehouse. `switchbak erase <path>` erases one.

Setup loads two launch agents and waits for the first upload. A fresh install has no session until an agent runs, so no upload yet is not a failure.

## Check the installation

Check the installation at any time:

```bash
switchbak status
```

The first line says if this Mac is ready:

```text
ready     installed ✓  authenticated ✓  connected ✓
```

- `installed`: launchd holds the two launch agents.
- `authenticated`: the server accepts the credentials in your keychain.
- `connected`: the server holds a session from this Mac.

Before your first session, the line ends with `connected, waiting for first session — run an agent`. That is not a failure. Run Claude Code or another [supported agent](supported-agents.md), then run status again. When a step fails, the next line names the command that fixes it, for example ``run `switchbak login` to sign in``.

Then status prints the endpoint, the installation, the two agents, the watched paths, the bytes the server holds, the `audit` line of your newest session, and the GitHub accounts connected to your organization. Before you [connect GitHub](../../admin/integrations/github.md), status prints:

```text
github    Receipts on pull requests are off
```

Uploads and Audits run without it. The next line names your step. An admin of your organization reads ``run `switchbak connect` to turn them on``. Another member reads the admins to ask.

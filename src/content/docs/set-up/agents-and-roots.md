---
title: Choose agents and roots
description: Choose the agents whose sessions Switchbak sends, and the directories that hold your checkouts, then check the installation.
sidebar:
  order: 3
---

Setup asks no questions. It selects two lists and prints them:

- The agents to watch: each [supported agent](../reference/supported-agents.md) that is on your Mac, with all its projects. A session of an agent that is not selected never leaves your Mac. The warehouse masks the secrets that it finds on arrival.
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

Before your first session, the line ends with `connected, waiting for first session — run an agent`. That is not a failure. Run Claude Code or another [supported agent](../reference/supported-agents.md), then run status again. When a step fails, the next line names the command that fixes it, for example ``run `switchbak login` to sign in``.

Then status prints the endpoint, the installation, the two agents, the watched paths, the bytes the server holds, the `audit` line of your newest session, and the GitHub accounts connected to your organization. Before you [connect GitHub](connect-github.md), status prints:

```text
github    Receipts on pull requests are off
```

Uploads and Audits run without it. The next line names your step. An admin of your organization reads ``run `switchbak connect` to turn them on``. Another member reads the admins to ask.

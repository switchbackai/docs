---
title: Choose agents and roots
description: Choose the agents whose sessions Switchbak sends, and the directories that hold your checkouts, then check the installation.
sidebar:
  order: 3
---

Setup asks two questions.

- Which agents to watch. Setup shows a checklist with one row for each [supported agent](../reference/supported-agents.md), with the count and size of its session files. Nothing is selected until you select it. A session of an agent that you did not select never leaves your Mac. The warehouse masks the secrets that it finds on arrival.
- Which directories hold your git checkouts. Setup shows each candidate with the count of checkouts below it. A repository outside these directories is minted only when a session names a clone of it. Otherwise its pull requests get no Receipt.

| Key     | What it does                                  |
| ------- | --------------------------------------------- |
| ↑ and ↓ | Move.                                         |
| Space   | Select or clear the row.                      |
| →       | Show the projects of Claude Code or Cursor.   |
| ←       | Hide the projects.                            |
| a       | Select each row, or clear each row.           |
| Enter   | Confirm. On "add a path", type a path to add. |
| Ctrl-C  | Stop. Setup changes nothing.                  |

To keep one project on your Mac, select its agent, press →, and clear the project. Setup writes an exclusion for it. Codex, Gemini CLI and OpenCode do not keep their sessions by project, so they have no project rows.

To change your choices later:

```bash
switchbak agents    # the agents and projects, then restart the watcher
switchbak roots     # the directories of your checkouts
```

Each starts from your current choices. When you clear an agent, the sessions that it sent stay in the warehouse. `switchbak erase <path>` erases one.

Setup then loads two launch agents and waits for the first upload. A fresh install has no session until an agent runs, so no upload yet is not a failure.

## Check the installation

Check the installation at any time:

```bash
switchbak status
```

It prints the endpoint, the installation, the two agents, the watched paths, the bytes the server holds, the `audit` line of your newest session, and the GitHub accounts connected to your organization. Before you [connect GitHub](connect-github.md), status prints:

```text
github    Receipts on pull requests are off
```

Uploads and Audits run without it. The next line names your step. An admin of your organization reads ``run `switchbak connect` to turn them on``. Another member reads the admins to ask.

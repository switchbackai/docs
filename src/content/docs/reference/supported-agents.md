---
title: Supported agents
description: The agents whose sessions Switchbak sends, and where each keeps its session files.
sidebar:
  order: 2
---

[Setup](../set-up/agents-and-roots.md) offers the session files of these agents. The warehouse audits the sessions of each, and a Receipt cites them.

| Agent       | Session files                           |
| ----------- | --------------------------------------- |
| Claude Code | `~/.claude/projects/`                   |
| Codex       | `~/.codex/sessions/`                    |
| Cursor      | `~/.cursor/projects/`                   |
| Gemini CLI  | `~/.gemini/tmp/`, `~/.gemini/sessions/` |
| OpenCode    | `~/.local/share/opencode/storage/`      |

Setup selects each agent whose session files are on your Mac. Run `switchbak configure` after you install another agent.

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

Setup marks an agent "not found" when its session files are not on your Mac. Run `switchbak agents` after you install another agent.

---
title: The Receipt on a pull request
description: Read the intent, false claims, blast radius and scope that the Receipt records for a pull request.
sidebar:
  label: "Receipts"
  order: 1
---

On each push to a pull request in a connected repository, the Switchbak App
writes a Receipt in two places: a check run named `🧾 Receipt`, and one comment
that it edits on each push. The comment is short:

> ### 🧾 Receipt
>
>> **🎯 Add a small retry helper for transient payment API failures.** <sub>session</sub>
>
> | False claims | Blast radius                            | Scope                                     |
> | :----------- | :-------------------------------------- | :---------------------------------------- |
> | 🟢 **None**  | 🔴 **High** <sub>billing/payments</sub> | 🟢 **None flagged** <sub>of 3 paths</sub> |
>
> <sub>Head 8ab31c2 · 1 Claude Code session · Open in Switchbak ↗</sub>

The quote is the intent of the change, in the words of the session. The
citation after it says who stated it and in which turn.

## The three columns

The table has three columns:

- False claims: the claims that the session made and that its own tool results
  do not back. The session says that a check passed, and the run failed or
  did not run.
- Blast radius: low, medium or high, from rules on the changed paths, with the
  reason, for example `billing/payments` or `docs only`. The Audit can raise
  the level from what the session says. It does not lower it.
- Scope: the changed paths that the session does not explain.

A red or yellow count links to the check, which lists the detail.

## The check run

The check opens with the same intent and table, then these sections:

- 🔴 False claims: each claim, what the tool results show, and the turn.
- 🔖 Decision record: the decisions, each with the option that the session
  rejected, then the constraints, the human redirects and the open questions.
  Each item cites its turn. An item with no turn is not shown.
- ↔️ Scope diff: each changed path with a mark and the reason from the session.

## Scope marks

| Mark | Meaning                                                                                             |
| ---- | --------------------------------------------------------------------------------------------------- |
| 🟢   | The session asked for the change.                                                                   |
| 🧪   | A test of what the session asked for.                                                               |
| 🟡   | Flagged: the session did not mention it, or the session promised it and the diff does not touch it. |
| ⚪   | Flagged: the diff neither touches nor explains it.                                                  |

The check adds a "Why is this here?" note to each changed file. Its title
names the head commit that the Receipt describes and the sessions. "Open in
Switchbak" and the check's Details open the Receipt on `app.switchbak.dev`.
Only a member of your organization can open it. A person who is not signed in
signs in first and then sees the Receipt. A person who is not a member sees no
Receipt.

![The Receipt page on app.switchbak.dev: the intent, the findings, the checks to settle and the provenance of the session](../start-here/get-started/receipt.png)

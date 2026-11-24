---
title: Glossary
description: Each term that these docs use, and the page that explains it.
sidebar:
  order: 1
---

- **Admin**: the person who made the organization. An admin connects GitHub, makes invite links and removes members. See [Invite Teammates](../admin/invite-teammates.md).
- **Agent**: a coding agent whose sessions Switchbak sends, for example Claude Code or Codex. See [Supported agents](../guides/cli/set-up.md#supported-agents).
- **Audit**: the check of one session by the Audit Service. It gives a Verdict and Findings. See [Audits in your terminal](../guides/cli/audits.md).
- **Audit Service**: the service that reads each uploaded session and answers with a Verdict and Findings. See [The Audit Service](../security/security-and-privacy.md#the-audit-service).
- **Blast radius**: low, medium or high, from rules on the changed paths of a pull request, with the reason. See [Receipt on a GitHub PR](../guides/receipts.md#receipt-on-a-github-pr).
- **Check run**: the `🧾 Receipt` check on a pull request. It holds the full Receipt. See [The check run](../guides/receipts.md#the-check-run).
- **Decision record**: the section of the check run that lists the decisions of the session, each with the option that it rejected, and the turn that states it. See [The check run](../guides/receipts.md#the-check-run).
- **Erase**: `switchbak erase <path>` removes one session and each Receipt that quotes it from the warehouse. See [Erase a session](../guides/cli/manage.md#erase-a-session).
- **False claims**: the claims that a session made and that its own tool results do not back. See [Receipt on a GitHub PR](../guides/receipts.md#receipt-on-a-github-pr).
- **Findings**: what the Audit of a session found, one line for each. See [Audits in your terminal](../guides/cli/audits.md).
- **GitHub App**: the Switchbak App on a GitHub account or organization. It writes the Receipt on each pull request. See [GitHub](../admin/integrations/github.md).
- **Intent**: the purpose of the change, in the words of the session, with the turn that states it. The Receipt opens with it. See [Receipts](../guides/receipts.md).
- **Member**: a person who can read every session and every Receipt of an organization. See [Invite Teammates](../admin/invite-teammates.md).
- **Organization**: the people of a Team workspace and the GitHub organization that it connects. See [Accounts and workspaces](../guides/accounts-and-workspaces.md#your-workspace).
- **Receipt**: the record of the sessions behind a pull request at one head commit: its intent, false claims, blast radius and scope. See [Receipts](../guides/receipts.md).
- **Root**: a directory that holds your git checkouts. Setup selects the roots. See [Set up the CLI](../guides/cli/set-up.md#3-pick-your-agents-and-folders).
- **Scope**: the changed paths of a pull request that the session does not explain. See [Scope marks](../guides/receipts.md#scope-marks).
- **Session**: one continuous run of an agent, and the session file that the agent writes as it works. See [What a session file holds](../security/security-and-privacy.md#what-a-session-file-holds).
- **Verdict**: the result of an Audit. See [Audits in your terminal](../guides/cli/audits.md).
- **Warehouse**: the server that holds the sessions of your organization. See [The warehouse](../security/security-and-privacy.md#the-warehouse).
- **Workspace**: Personal (you alone) or Team (you and your team). You choose the type at your first login and cannot change it. See [Your workspace](../guides/accounts-and-workspaces.md#your-workspace).

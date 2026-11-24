---
title: Audits in your terminal
description: Read the Verdict and Findings of a session, find your newest Audits, and get a notification when an Audit fails.
sidebar:
  order: 2
---

Switchbak audits each session you send. An Audit gives a **Verdict** and a list of **Findings**. You can read them right in your terminal, with or without GitHub.

## Read an Audit

When your first session reaches the server, setup ends with a line like this, and `switchbak status` shows the same line under `uploads`:

```text
Read what the audit of your newest session found:

  switchbak audit <path>
```

Run that command. It prints the Verdict, how many Findings there are, and one line for each Finding. If the Audit isn't finished yet, the command waits for it, for up to 20 minutes. Use `-limit` to change how long it waits, for example `-limit 5m`.

## Find an Audit without the path

You don't need a session's path to read its Audit:

```bash
switchbak audit -latest              # your newest session that has an Audit
switchbak audit -repo ~/src/app      # the newest session in a checkout
switchbak audit -branch main         # the newest session on a branch
```

`switchbak status` also lists the newest Verdict for each checkout under your roots, under `verdicts`.

For scripts and coding agents, `switchbak audit -json <path>` prints the Audit as JSON. It exits non-zero until the Audit is done.

## Which sessions get an Audit

Your first upload sends your past sessions too. Switchbak stores all of them, but it only audits:

- the sessions that were active from one day before your first login onward
- up to five of your newest sessions that ended in the 14 days before your first login

For any other past session, `switchbak status` says it has no Audit yet. Run `switchbak audit <path>` to ask for one. It waits for the result.

## When an Audit fails

If the Audit of your newest session failed, `switchbak status` says so under the `audit` line, with a one-word reason, for example `its Audit failed (credit)`. Run the `switchbak audit` command it shows to read the full message.

## Get notified

The background service can show a macOS notification when an Audit has a `fail` Verdict or a `fix` Finding. Notifications are off until you turn them on:

```bash
switchbak notify on       # turn notifications on
switchbak notify off      # turn them off
switchbak notify          # check whether they're on
```

---
title: Follow your Audits
description: Read the newest Audit of a checkout or a branch, and turn on notifications for failed Audits.
sidebar:
  order: 3
---

You do not need the path to read an Audit:

```text
switchbak audit -latest              # your newest session that has an Audit
switchbak audit -repo ~/src/app      # the newest of a checkout
switchbak audit -branch main         # the newest on a branch
```

`switchbak status` prints the newest Verdict of each checkout under your roots, under `verdicts`.

To have the watcher show a macOS notification for an Audit with a `fail` Verdict or a `fix` Finding, run `switchbak notify on`. Notifications are off until you turn them on. `switchbak notify off` turns them off again.

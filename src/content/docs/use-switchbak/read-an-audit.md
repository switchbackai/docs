---
title: Read an Audit
description: Print the Verdict and the Findings of a session in your terminal.
sidebar:
  order: 2
---

When the first session reaches the server, setup ends with this line, and
`switchbak status` prints the same line under `uploads`:

```text
Read what the audit of your newest session found:

  switchbak audit <path>
```

Run that line. It prints the Verdict, the count of Findings, and one line for each Finding. If the Audit is not finished, it waits for it. You do not need GitHub for this step.

The first upload sends your past sessions too. The warehouse stores them, and audits the sessions active from one day before your first login on, plus up to five of your newest sessions that ended in the 14 days before it. For another past session, `switchbak status` says it has no Audit yet, and `switchbak audit <path>` asks for its Audit and waits for it.

If the Audit of your newest session failed, `switchbak status` says so under the `audit` line, with one word for the reason, for example `its Audit failed (credit)`. Run the line to read the full message.

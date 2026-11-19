---
title: Connect GitHub
description: Install the Switchbak App on a GitHub account or organization, so that its pull requests get a Receipt.
sidebar:
  order: 4
---

```bash
switchbak connect
```

Do this once for each GitHub organization or account whose pull requests get a Receipt. Pull requests get no Receipt until it is done. [Read an Audit](../use-switchbak/read-an-audit.md) does not need it.

1. Connect opens the GitHub page that installs the Switchbak App. GitHub lists your account and your organizations, and marks each one that has the App with Configure
2. Select your account or an organization
3. Select which repositories the GitHub App may read
4. Press Install & Authorize

GitHub sends your browser back to Switchbak, and the page says "Switchbak is connected". Connect then prints `✓ GitHub connected`.

When your organization is already connected, connect prints the connected accounts and opens the same GitHub page, so that you can install on another account.

A member of a GitHub organization who is not an owner sees "Waiting for an owner to approve". GitHub sent the install to an owner. Ask an owner to approve it, and then run `switchbak connect` again.

The Receipt check and the Receipt comment appear on the next push to a pull request in a chosen repository.

When the GitHub account is already connected to the Switchbak organization of your team, connect offers to join that organization.

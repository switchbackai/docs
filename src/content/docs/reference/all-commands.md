---
title: All commands
description: Each command of the Switchbak client, and what it does.
sidebar:
  order: 1
---

| Command                          | What it does                                                          |
| -------------------------------- | --------------------------------------------------------------------- |
| `switchbak login`                | Signs you in with GitHub, stores the credentials, and runs setup.     |
| `switchbak login --device`       | The same, with a code that you approve on another device.             |
| `switchbak logout`               | Logs this Mac out, and removes the keychain items. Keeps the config.  |
| `switchbak version`              | Prints the release you installed.                                     |
| `switchbak connect`              | Connects GitHub, so that pull requests get a Receipt.                 |
| `switchbak setup`                | Writes the watch list and the roots, and loads the launch agents.     |
| `switchbak setup -root <dir>`    | Replaces the roots. Repeat `-root` for each directory.                |
| `switchbak agents`               | Chooses the agents and projects to watch, and restarts the watcher.   |
| `switchbak roots`                | Chooses the directories that hold your checkouts.                     |
| `switchbak status`               | Prints installed, authenticated, connected, then the details.         |
| `switchbak audit <path>`         | Prints the Verdict and the Findings of a session, and waits for them. |
| `switchbak audit -latest`        | The same, for your newest session that has an Audit.                  |
| `switchbak audit -repo <dir>`    | The same, for the newest session of a checkout.                       |
| `switchbak audit -branch <name>` | The same, for the newest session on a branch.                         |
| `switchbak audit -json <path>`   | The Audit as JSON. Exits non-zero for an Audit that is not done.      |
| `switchbak notify on`, `off`     | Turns the Audit notifications of the watcher on or off.               |
| `switchbak pause`, `resume`      | Stops and starts the uploads.                                         |
| `switchbak erase <path>`         | Erases the session of a file from the warehouse.                      |
| `switchbak teardown`             | Boots out the launch agents and removes their files.                  |
| `switchbak uninstall`            | Teardown, then logs out and removes the keychain items, logs, config. |

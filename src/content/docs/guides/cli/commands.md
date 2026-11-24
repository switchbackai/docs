---
title: Command reference
description: Every switchbak command and flag, and what it does.
sidebar:
  order: 4
---

## Account

| Command                            | What it does                                                                                    |
| ---------------------------------- | ----------------------------------------------------------------------------------------------- |
| `switchbak login`                  | Signs you in with GitHub or Google in your browser, saves your credentials, then runs setup.    |
| `switchbak login --device`         | Signs you in with a code you approve on another device. Use it over SSH or from a coding agent. |
| `switchbak login -no-browser`      | Prints the approval page instead of opening it.                                                 |
| `switchbak login -no-setup`        | Saves your credentials and skips setup.                                                         |
| `switchbak login -no-connect`      | Doesn't offer to connect GitHub at the end.                                                     |
| `switchbak logout`                 | Signs this Mac out and removes the keychain items. Keeps your settings.                         |
| `switchbak invite`                 | Prints an invite link to your workspace. Admins only.                                           |
| `switchbak invite -days N -uses N` | The same, with the link expiring after `N` days or `N` uses.                                    |

## Setup

| Command                          | What it does                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------- |
| `switchbak setup`                | Picks each installed agent and common checkout folder, and starts the background services.  |
| `switchbak setup -agents <ids>`  | Watches only the agents you name, comma-separated, for example `-agents claude_code,codex`. |
| `switchbak setup -root <dir>`    | Replaces the checkout folders. Repeat `-root` for each folder.                              |
| `switchbak setup -yes`           | Asks nothing. Fails if it finds nothing to watch.                                           |
| `switchbak configure`            | Opens checklists to change your agents, projects and checkout folders.                      |
| `switchbak connect`              | Opens the page that connects GitHub, and waits until it's connected.                        |
| `switchbak connect -print-url`   | Prints that page instead of opening it, and waits. For coding agents.                       |
| `switchbak connect -timeout 30m` | Changes how long connect waits. The default is 15 minutes.                                  |

Login also accepts `-agents`, `-root` and `-yes`, and passes them to setup.

## Status

| Command                  | What it does                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `switchbak status`       | Shows whether this Mac is installed, authenticated and connected, then the details. |
| `switchbak status -json` | The same as JSON. Exits non-zero unless this Mac is ready.                          |
| `switchbak whoami`       | Prints the accounts that this Mac is logged in as, and the workspace.               |
| `switchbak next`         | Shows your next setup step, who does it, and the command to run.                    |
| `switchbak next -json`   | The same as JSON. `step` is `done` when setup is complete.                          |
| `switchbak version`      | Prints the installed release.                                                       |

## Audits

| Command                          | What it does                                                               |
| -------------------------------- | -------------------------------------------------------------------------- |
| `switchbak audit <path>`         | Shows the Verdict and Findings of a session, and waits for them if needed. |
| `switchbak audit -latest`        | The same, for your newest session that has an Audit.                       |
| `switchbak audit -repo <dir>`    | The same, for the newest session in a checkout.                            |
| `switchbak audit -branch <name>` | The same, for the newest session on a branch.                              |
| `switchbak audit -limit 5m`      | Changes how long audit waits. The default is 20 minutes.                   |
| `switchbak audit -json <path>`   | The Audit as JSON. Exits non-zero until the Audit is done.                 |
| `switchbak notify on`, `off`     | Turns notifications for failed Audits on or off.                           |
| `switchbak notify`               | Shows whether notifications are on.                                        |

## Uploads and removal

| Command                            | What it does                                                                 |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| `switchbak pause`, `resume`        | Stops and restarts uploads.                                                  |
| `switchbak erase <path>`           | Erases the session that a file belongs to from the server.                   |
| `switchbak teardown`               | Stops the background services and removes their files.                       |
| `switchbak uninstall`              | Runs teardown, signs out, and removes the keychain items, logs and settings. |
| `switchbak uninstall -keep-config` | The same, but keeps `~/.config/switchbak`.                                   |
| `switchbak uninstall -yes`         | Skips the confirmation.                                                      |

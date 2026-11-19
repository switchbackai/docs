---
title: Pause, upgrade and remove
description: Pause the uploads, upgrade the client, and remove it from your Mac.
sidebar:
  order: 5
---

```bash
switchbak pause      # the watcher submits nothing until resume
switchbak resume
brew upgrade switchbak
```

The watcher restarts itself on the new binary after an upgrade.

## Remove switchbak

To remove switchbak, uninstall it first, then remove the formula:

```bash
switchbak uninstall
brew uninstall switchbak
```

Uninstall boots out the launch agents, logs this Mac out at the server, and removes the keychain items `switchbak`, the logs in `~/Library/Logs` and `~/.config/switchbak`. Add `-keep-config` to keep `~/.config/switchbak` for a later install. Uninstall erases no session on the server. Use `switchbak erase` for that before you uninstall.

If you ran `brew uninstall switchbak` first, launchd still tries to start the removed binary. Remove the launch agents with these commands, then delete the files above yourself:

```bash
launchctl bootout gui/$(id -u)/dev.switchbak.switchbak
launchctl bootout gui/$(id -u)/dev.switchbak.switchbak.repos
rm ~/Library/LaunchAgents/dev.switchbak.switchbak.plist ~/Library/LaunchAgents/dev.switchbak.switchbak.repos.plist
```

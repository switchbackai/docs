---
title: Manage the CLI
description: Pause uploads, upgrade, erase a session, log out, log back in when your access ends, and remove the CLI from your Mac.
sidebar:
  order: 3
---

## Pause and resume uploads

```bash
switchbak pause      # stop sending sessions
switchbak resume     # start again
```

While uploads are paused, the background service keeps running but sends nothing.

## Upgrade

```bash
brew upgrade switchbak
```

The background service restarts itself on the new version.

## Erase a session

```bash
switchbak erase <path>
```

`<path>` is a session file on your Mac. Switchbak erases the whole session that file belongs to, from every copy your organization's data has on the server. Any later upload of the same file is refused. Running erase again on the same file tells you it's "already erased".

Erase doesn't reach backups until they expire, and it can't change Receipts already posted on GitHub. See [Erase](../../security/security-and-privacy.md#3-erase) for the details.

## Log out

```bash
switchbak logout
```

Logout signs this Mac out on the server and removes the `switchbak` items from your keychain. It keeps your settings in `~/.config/switchbak` and leaves the background services in place, but nothing is uploaded until you run `switchbak login` again.

If the server doesn't answer, logout warns you and removes the keychain items anyway. The server then keeps the login until it expires.

## Log back in when your access ends

If you log in with GitHub, you keep access as long as you're a member of a GitHub organization your workspace connected. For a Personal workspace, you keep access as long as the Switchbak App stays installed on your own GitHub account. When that access ends, uploads stop and the log says:

```text
your access to <organization> ended: GitHub no longer lists one of its installations for your account. Ask an admin of <organization> for access, then run `switchbak login`
```

If notifications are on, you also get one notification: "Your access to <organization> ended".

To fix it:

1. Ask an owner of the GitHub organization to add you back as a member.
2. Run `switchbak login`.

Logging in with Google doesn't depend on GitHub access. If GitHub stops accepting your sign-in, the log tells you to run `switchbak login` again.

## Remove switchbak

Uninstall first, then remove the Homebrew formula:

```bash
switchbak uninstall
brew uninstall switchbak
```

Uninstall asks you to confirm, then stops the background services, signs this Mac out, and removes the keychain items, the logs in `~/Library/Logs`, and `~/.config/switchbak`. Add `-keep-config` to keep your settings for a later install, or `-yes` to skip the question.

Uninstall doesn't erase any sessions from the server. If you want them gone, run `switchbak erase` on each one first.

To stop the background services but keep everything else, run `switchbak teardown`.

### If you ran `brew uninstall` first

macOS keeps trying to start the removed binary. Stop the background services with these commands, then delete the files listed above yourself:

```bash
launchctl bootout gui/$(id -u)/dev.switchbak.switchbak
launchctl bootout gui/$(id -u)/dev.switchbak.switchbak.repos
rm ~/Library/LaunchAgents/dev.switchbak.switchbak.plist ~/Library/LaunchAgents/dev.switchbak.switchbak.repos.plist
```

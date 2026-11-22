---
title: Log in
description: Log in with GitHub, join the organization of your team, and log in again when your access ends.
sidebar:
  order: 2
---

```bash
switchbak login
```

Login opens your browser and prints a code. If the browser does not open, open the page that login prints.

1. Sign in with GitHub
2. Make sure that the page shows the code that login printed
3. Press Approve

On a Mac with no browser, as over SSH, run `switchbak login --device`. It prints a page and a code. Open the page on any device, type the code, sign in with GitHub, and press Approve. Approve only a code that you typed yourself.

Login then makes your account, stores the credentials in your login keychain, and runs [setup](agents-and-roots.md). Your account is in a Switchbak organization:

- The organization of your team, when your team connected its GitHub organization and you are a member of that GitHub organization. The page asks "Join <team> as @login" before you approve. The admins of the team see each join.
- A new organization, with you as its admin, in all other cases. An outside collaborator of a GitHub organization gets a new organization, and does not join the team.

The uploads start when setup ends. Uploads and Audits do not need the GitHub App.

Login ends with this question:

```text
Connect GitHub now? [Y/n]
```

Press Return to [connect GitHub](connect-github.md) now.

## Log in again

A login with GitHub lasts while you are a member of a GitHub organization that your organization connected, or while the App is on your own GitHub account and your organization connected it. When that access ends, the uploads stop, and the watcher log says:

```text
your access to <organization> ended: GitHub no longer lists one of its installations for your account. Ask an admin of <organization> for access, then run `switchbak login`
```

When the notifications are on, one banner says "Your access to <organization> ended".

1. Ask an owner of the GitHub organization to make you a member
2. Run `switchbak login`

When GitHub no longer accepts your sign-in, the log tells you to run `switchbak login` again.

## Log out

```bash
switchbak logout
```

Logout logs this Mac out at the server, and removes the keychain items `switchbak`. It keeps `~/.config/switchbak` and the launch agents. The watcher uploads nothing until you log in again. Logout ends with the command to log in again:

```text
switchbak login
```

If the server does not answer, logout prints a warning and removes the keychain items. The server then keeps the login until it expires. To remove switchbak from this Mac, see [Upgrade and remove](upgrade-and-remove.md).

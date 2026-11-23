---
title: Log in
description: Log in with GitHub or Google, link your accounts, choose a workspace, and log in again when your access ends.
agent: |
  Set up Switchbak on this Mac with me. Switchbak keeps a Receipt of each change that a coding agent makes.

  Run each command yourself. No command reads stdin. I approve the sign-in code and the GitHub App myself. Never ask me for a password, a token or an invite link. Skip a step that is already done.

  1. Check that this Mac has Apple silicon and Homebrew. If it does not, stop and tell me.
  2. Install the client: `brew install switchbackai/tap/switchbak`.
  3. Sign in: run `switchbak login --device`. It prints a code and a link. Give both to me, and wait while I approve the code in my browser.
  4. Find the directories on this Mac that hold my git checkouts, for example ~/code or ~/src. Find the coding agents that I use, from these ids: claude_code, codex, cursor, gemini_cli, opencode. Show me the directories. Then run `switchbak setup -agents <ids> -root <dir> -yes`, with the ids comma-separated and one `-root` for each directory.
  5. Connect GitHub. Ask me if I am an admin, a member, or in a personal workspace. Skip this step for a member: an admin connects GitHub. In a personal workspace, ask me first, and skip it if I say no. Run `switchbak connect -print-url`. It prints a page on stdout and waits. Give me the page: I open it and install the Switchbak GitHub App. Wait for the command to finish.
  6. Run `switchbak next -json` and do the step it gives. When `by` is `agent`, run its `command`. When `by` is `person`, give me its `text` and wait until I say it is done. When `by` is `admin`, give me its `text` and stop. Repeat until `step` is `done`, or until the step only waits for a session or a pull request.
  7. Run `switchbak status -json`. Tell me what is ready and what is still to do.
sidebar:
  order: 2
---

```bash
switchbak login
```

Login opens your browser and prints a code. If the browser does not open, open the page that login prints.

1. Choose Continue with GitHub or Continue with Google
2. Make sure that the page shows the code that login printed
3. Press Approve

On a Mac with no browser, as over SSH, run `switchbak login --device`. It prints a page and a code. Open the page on any device, type the code, choose GitHub or Google, and press Approve. Approve only a code that you typed yourself.

Login then stores the credentials in your login keychain and runs [setup](agents-and-roots.md). The uploads start when setup ends. Uploads and Audits do not need the GitHub App.

## Log in with GitHub

A login with GitHub makes your account when you have none. Your account is in a Switchbak workspace:

- The workspace of your team, when your team connected its GitHub organization and you are a member of that GitHub organization. The page asks "Join <team> as @login" before you approve. The admins of the team see each join.
- A new workspace, with you as its admin, in all other cases. An outside collaborator of a GitHub organization gets a new workspace, and does not join the team.

When your workspace has no GitHub installation, login ends with this question:

```text
Connect GitHub now? [Y/n]
```

Press Return to [connect GitHub](connect-github.md) now. When your workspace already has one, login prints `GitHub connected ✓` and asks nothing.

## Log in with Google

A login with Google does not make a workspace. Create your workspace first:

1. Open [app.switchbak.dev/signup](https://app.switchbak.dev/signup) and choose Continue with Google
2. Choose Personal or Organization. You cannot change the type later
3. Name the workspace and press Create workspace
4. Run `switchbak login` and choose Continue with Google

Without a workspace, the page says "Create your workspace", and login stops with:

```text
the login was refused: No Switchbak workspace has <email>. Create your workspace at https://app.switchbak.dev/signup, then run switchbak login again.
```

A login with Google does not join the workspace of your team through GitHub. To join through your GitHub organization, log in with GitHub, or [link GitHub](#link-your-accounts) to your account.

When your Google email is the email of an account that signs in with GitHub, the page says "An account with this email signs in with GitHub". Run `switchbak login` again and choose Continue with GitHub. To sign in with Google later, link it on the Account page.

## Link your accounts

You can sign in to one account with both GitHub and Google. Link the second one in the web app:

1. Sign in at [app.switchbak.dev](https://app.switchbak.dev)
2. Open the Account tab. Linked accounts lists GitHub and Google
3. Press Link GitHub account or Link Google account, and sign in with it

The page then says "Your Google account is linked. You can sign in with it."

Switchbak merges no accounts. A link to a GitHub or Google account that another Switchbak account holds is refused: "This Google account belongs to another Switchbak account". Sign in with that account, or ask an admin. Each person links one GitHub account and one Google account. You cannot remove a link.

When you sign in on the web with Google and your email is the email of an account that signs in with GitHub, the page says "An account with this email signs in with GitHub". Press Continue with GitHub. That sign-in links your Google account.

## More than one workspace

You can be a member of more than one workspace: a personal one and the workspace of your team, for example.

- On the web, the sign-in opens the workspace that you used last. "Choose a workspace" lists the others. In a workspace, the menu beside its name in the header switches to another.
- The page of `switchbak login` lists your workspaces and says "Choose the organization to log in to". This Mac sends to the one that you choose. Run `switchbak login` again to change it.

## Log in again

A login with GitHub lasts while you are a member of a GitHub organization that your workspace connected, or while the App is on your own GitHub account and your workspace connected it. When that access ends, the uploads stop, and the watcher log says:

```text
your access to <organization> ended: GitHub no longer lists one of its installations for your account. Ask an admin of <organization> for access, then run `switchbak login`
```

When the notifications are on, one banner says "Your access to <organization> ended".

1. Ask an owner of the GitHub organization to make you a member
2. Run `switchbak login`

A login with Google does not depend on GitHub access. When GitHub no longer accepts your sign-in, the log tells you to run `switchbak login` again.

## Log out

```bash
switchbak logout
```

Logout logs this Mac out at the server, and removes the keychain items `switchbak`. It keeps `~/.config/switchbak` and the launch agents. The watcher uploads nothing until you log in again. Logout ends with the command to log in again:

```text
switchbak login
```

If the server does not answer, logout prints a warning and removes the keychain items. The server then keeps the login until it expires. To remove switchbak from this Mac, see [Upgrade and remove](upgrade-and-remove.md).

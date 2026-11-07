# Switchbak user guide

Switchbak carries the sessions of your AI coding agents from your Mac to the
switchback warehouse of your organisation. Each pull request then gets a
Receipt: the record of the sessions behind the change. This guide takes you
from an empty Mac to the first Receipt.
[Where your data goes](DATA-NOTICE.md) names each place a session goes.

You need a Mac with Apple silicon, [Homebrew](https://brew.sh), and the
invitation from your organisation. The invitation holds a passcode that starts
with `sepj_`.

## 1. Install

```bash
brew install switchbackai/tap/switchbak
switchbak version
```

`switchbak version` prints the release you installed.

## 2. Sign up

```bash
switchbak signup
```

Signup asks for your email and the passcode from the invitation. The passcode
belongs to your organisation and is reusable. Each person enters their own
email. Signup stores the credentials in your login keychain, and then runs
setup.

If an operator gave you a refresh token that starts with `sepr_` instead of a
passcode, run `switchbak login`, paste the token, and then run
`switchbak setup`.

## 3. Set up

Setup asks two questions.

- Which paths to watch. Setup finds the places where agents keep their
  session files and shows them as a checklist, by agent. Nothing is selected
  until you select it. A session under a path you did not select never
  leaves your Mac.
- Which directories hold your git checkouts. A repository outside these
  directories is never minted, and its pull requests get no Receipt.
  `switchbak setup -root <dir>` names one later. `-root` is repeatable and
  replaces the list.

Setup then loads two launch agents and waits for the first upload. A fresh
install has no session until an agent runs, so no upload yet is not a failure.

Check the installation at any time:

```bash
switchbak status
```

It prints the endpoint, the installation, the two agents, the watched paths,
and the bytes the server holds.

Signup ends with this step:

```text
Next, once per Tenant: an owner of the GitHub organisation opens

  https://sep.switchbak.dev/v1/web/login

logs in with the same email and passcode, and presses Connect GitHub.
Pull requests get a Receipt only after that.
```

## 4. Connect GitHub

Do this once per organisation. An owner of the GitHub organisation does it.

1. Open `https://sep.switchbak.dev/v1/web/login`.
2. Log in with the same email and passcode as signup.
3. Press Connect GitHub. GitHub asks which repositories the App may read.
   Choose them.
4. Confirm on the page that follows. The page says "Switchback is connected".

A member who is not an owner sees "Waiting for an owner to approve". GitHub
sent the install to an owner. Ask an owner to approve it, and then start
again.

The Receipt check and the Receipt comment appear on the next push to a pull
request in a chosen repository.

## 5. Erase a session

```bash
switchbak erase <path>
```

`<path>` is a session file. The server erases the whole session that the file
belongs to, from every layer of your organisation's data, and marks the file
as erased. A later upload of the same file is refused, and `switchbak cursor`
for it answers 410. A second erase of the same file says "already erased".

Erase does not reach a backup until the backup ages out, the copy that the
Audit Service holds, or a Receipt that is on GitHub.
[Where your data goes](DATA-NOTICE.md) says what each of those keeps.

## 6. Pause, upgrade, remove

```bash
switchbak pause      # the watcher submits nothing until resume
switchbak resume
brew upgrade switchbak
```

The watcher restarts itself on the new binary after an upgrade.

To remove switchbak, boot out the launch agents first:

```bash
switchbak teardown
brew uninstall switchbak
```

Teardown leaves `~/.config/switchbak`, the logs in `~/Library/Logs`, and the
keychain item `switchbak`. Delete them yourself if you want nothing left.
Teardown erases nothing on the server. Use `switchbak erase` for that before
you remove the client.

## 7. Where your data goes

Each place a session goes, what is held there, and what erase removes:
[Where your data goes](DATA-NOTICE.md).

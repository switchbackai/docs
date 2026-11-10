# Switchbak user guide

Switchbak carries the sessions of your AI coding agents from your Mac to the
switchback warehouse of your organisation. Each pull request then gets a
Receipt: the record of the sessions behind the change. This guide takes you
from an empty Mac to the first Receipt.
[Where your data goes](DATA-NOTICE.md) names each place a session goes.
Switchbak is in beta. [The beta](DATA-NOTICE.md#the-beta) names its terms.

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
email. Each person who signs up with the passcode can read the sessions of
each other person of the organisation, so do not send it outside your
organisation. [The warehouse](DATA-NOTICE.md#the-warehouse) has the details.
Signup stores the credentials in your login keychain, and then runs setup.

If an operator gave you a refresh token that starts with `sepr_` instead of a
passcode, run `switchbak login`, paste the token, and then run
`switchbak setup`.

## 3. Set up

Setup asks two questions.

- Which paths to watch. Setup finds the places where agents keep their
  session files and shows them as a checklist, by agent. Nothing is selected
  until you select it. A session under a path you did not select never
  leaves your Mac. The client masks the secrets that it finds before upload.
  [Secrets](DATA-NOTICE.md#secrets) names what it masks and what it does not.
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
the bytes the server holds, the `audit` line of your newest session, and the
GitHub accounts connected to your Tenant. `github    not connected` means that
no owner has done step 5 yet.

Signup ends with this step:

```text
Next, once per Tenant: an owner of the GitHub organisation opens

  https://sep.switchbak.dev/v1/web/login

logs in with the same email and passcode, and presses Connect GitHub.
Pull requests get a Receipt only after that.
```

### Unmask a kind of secret

The client masks each kind of secret. To send one kind unmasked, put its name in
`~/.config/switchbak/unmask.conf`:

```bash
echo "jwt,bearer" > ~/.config/switchbak/unmask.conf
launchctl kickstart -k gui/$(id -u)/dev.switchbak.switchbak
```

- Separate the names with commas or new lines. `#` starts a comment.
- The names are `aws_access_key`, `aws_secret_key`, `gcp_api_key`,
  `private_key`, `jwt`, `bearer`, `github_token`, `anthropic_key`,
  `openai_key`, `slack_token`, `slack_webhook` and `env_secret`.
- An unknown name stops each command that sends. The error lists the names.
- The watcher reads the file when it starts. Restart it after each change, as
  above.
- `switchbak status` prints an `unmasked` line with the names.
- Delete the file to mask each kind again.

## 4. Read your first session

When the first session reaches the server, setup ends with this line, and
`switchbak status` prints the same line under `uploads`:

```text
Read what the audit of your newest session found:

  switchbak audit <path>
```

Run that line. It prints the Verdict, the count of Findings, and one line for
each Finding. If the Audit is not finished, it waits for it. You do not need
GitHub for this step.

The first upload sends your past sessions too. The warehouse stores them, and
audits only the sessions active from one day before your signup on. For a
past session, `switchbak status` says it has no Audit yet, and
`switchbak audit <path>` asks for its Audit and waits for it.

If the Audit of your newest session failed, `switchbak status` says so under
the `audit` line, with one word for the reason, for example
`its Audit failed (credit)`. Run the line to read the full message.
`switchbak audit -json <path>` exits non-zero for an Audit that is not done.

### When an Audit finds something

You do not need the path to read an Audit:

```text
switchbak audit -latest              # your newest session that has an Audit
switchbak audit -repo ~/src/app      # the newest of a checkout
switchbak audit -branch main         # the newest on a branch
```

`switchbak status` prints the newest Verdict of each checkout under your roots,
under `verdicts`.

The watcher shows a macOS notification when an Audit has a `fail` Verdict or a
`fix` Finding. The notification gives the command that reads the Audit. To stop
the notifications, run `switchbak notify off`. To start them again, run
`switchbak notify on`.

## 5. Connect GitHub

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

## 6. Erase a session

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

## 7. Pause, upgrade, remove

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

## 8. Where your data goes

Each place a session goes, what is held there, and what erase removes:
[Where your data goes](DATA-NOTICE.md).

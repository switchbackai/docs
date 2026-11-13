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
  session files and shows them as a checklist, by agent.
  [Supported agents](#supported-agents) names them. Nothing is selected
  until you select it. A session under a path you did not select never
  leaves your Mac. The client masks the secrets that it finds before upload.
  [Secrets](DATA-NOTICE.md#secrets) names what it masks and what it does not.
- Which directories hold your git checkouts. A repository outside these
  directories is minted only when a session names a clone of it. Otherwise
  its pull requests get no Receipt.
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
no owner has done step 4 yet.

### Supported agents

Setup offers the session files of these agents. The warehouse audits the
sessions of each, and a Receipt cites them.

| Agent       | Session files                           |
| ----------- | --------------------------------------- |
| Claude Code | `~/.claude/projects/`                   |
| Codex       | `~/.codex/sessions/`                    |
| Cursor      | `~/.cursor/projects/`                   |
| Gemini CLI  | `~/.gemini/tmp/`, `~/.gemini/sessions/` |
| OpenCode    | `~/.local/share/opencode/storage/`      |

Setup shows only the paths that exist on your Mac. Run `switchbak setup`
again after you install another agent.

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

## 4. Connect GitHub

Do this once per organisation, as soon as one person has signed up. An owner
of the GitHub organisation does it. Pull requests get no Receipt until it is
done. Step 5 does not need it.

Signup ends with this step:

```text
Next, once per Tenant: an owner of the GitHub organisation opens

  https://sep.switchbak.dev/v1/web/login

logs in with the same email and passcode, and presses Connect GitHub.
Pull requests get a Receipt only after that.
```

To connect:

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

## 5. Read your first session

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

To have the watcher show a macOS notification for an Audit with a `fail`
Verdict or a `fix` Finding, run `switchbak notify on`. Notifications are off
until you turn them on. `switchbak notify off` turns them off again.

## 6. Read a Receipt

On each push to a pull request in a connected repository, the switchback App
writes a Receipt in two places: a check run named `Receipt`, and one comment
that it edits on each push. The comment starts like this:

> ### 🧾 Receipt · 🟡 Needs attention
>
>> **Add a small retry helper for transient payment API failures.**
>> <sub>session</sub>
>
> | Said vs did       | Blast radius                            | Scope                                     |
> | :---------------- | :-------------------------------------- | :---------------------------------------- |
> | 🟢 **None found** | 🔴 **High** <sub>billing/payments</sub> | 🟢 **None flagged** <sub>of 3 paths</sub> |

The quote is the intent of the change, in the words of the session. The
citation under it says who stated it.

The heading gives one of three states:

- 🟢 Normal review: nothing below asks for more than a normal review.
- 🟡 Needs attention: the blast radius is medium or high, a path is flagged,
  or another session touched the same files.
- 🔴 Claims contradicted: the session says that a check passed, and its own
  tool results do not show it.

The table has three columns:

- Said vs did: each claim that the session made and its tool results
  contradict, with the turn of the claim.
- Blast radius: low, medium or high, from rules on the changed paths, with the
  reason, for example `billing/payments` or `docs only`. The Audit can raise
  the level from what the session says. It does not lower it.
- Scope: the changed paths that the session does not explain.

Under the table, the Scope section lists each path with a mark and the reason
from the session:

| Mark | Meaning                                                                                             |
| ---- | --------------------------------------------------------------------------------------------------- |
| 🟢   | The session asked for the change.                                                                   |
| 🧪   | A test of what the session asked for.                                                               |
| 🟡   | Flagged: the session did not mention it, or the session promised it and the diff does not touch it. |
| ⚪   | Flagged: the diff neither touches nor explains it.                                                  |

"Human redirects" lists each time a person corrected the agent, with the turn.
The check adds a "Why this change?" note to each changed file. "Open in
Switchback" opens the receipt page on `sep.switchbak.dev`. The footer names the
head commit that the Receipt describes.

## 7. Erase a session

```bash
switchbak erase <path>
```

`<path>` is a session file. The server erases the whole session that the file
belongs to, from every layer of your organisation's data, and marks the file
as erased. A later upload of the same file is refused, and `switchbak cursor`
for it answers 410. A second erase of the same file says "already erased".

Erase does not reach a backup until the backup ages out, the copies that the
Audit Service and its model provider hold, or a Receipt that is on GitHub.
[Where your data goes](DATA-NOTICE.md) says what each of those keeps.

## 8. Pause, upgrade, remove

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

## 9. Commands

| Command                          | What it does                                                          |
| -------------------------------- | --------------------------------------------------------------------- |
| `switchbak version`              | Prints the release you installed.                                     |
| `switchbak signup`               | Redeems a `sepj_` passcode, stores the credentials, and runs setup.   |
| `switchbak login`                | Stores a `sepr_` refresh token that it reads on standard input.       |
| `switchbak setup`                | Writes the watch list and the roots, and loads the launch agents.     |
| `switchbak setup -root <dir>`    | Replaces the roots. Repeat `-root` for each directory.                |
| `switchbak status`               | Prints the installation, the uploads, the Audits and GitHub.          |
| `switchbak audit <path>`         | Prints the Verdict and the Findings of a session, and waits for them. |
| `switchbak audit -latest`        | The same, for your newest session that has an Audit.                  |
| `switchbak audit -repo <dir>`    | The same, for the newest session of a checkout.                       |
| `switchbak audit -branch <name>` | The same, for the newest session on a branch.                         |
| `switchbak audit -json <path>`   | The Audit as JSON. Exits non-zero for an Audit that is not done.      |
| `switchbak notify on`, `off`     | Turns the Audit notifications of the watcher on or off.               |
| `switchbak pause`, `resume`      | Stops and starts the uploads.                                         |
| `switchbak erase <path>`         | Erases the session of a file from the warehouse.                      |
| `switchbak teardown`             | Boots out the launch agents and removes their files.                  |

## 10. Where your data goes

Each place a session goes, what is held there, and what erase removes:
[Where your data goes](DATA-NOTICE.md).

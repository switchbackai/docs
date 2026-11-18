---
title: Switchbak user guide
---

Switchbak carries the sessions of your AI coding agents from your Mac to your organization's warehouse. Each pull request then gets a Receipt: the record of the sessions behind the change.

1. [Set up Switchbak](#1-set-up-switchbak): install the client, log in with GitHub, and connect GitHub
2. [Use Switchbak](#2-use-switchbak): read the Receipt on a pull request, run the CLI, and manage the members of your organization

Switchbak is in beta. [The beta](DATA-NOTICE.md#the-beta) names its terms. [Where your data goes](DATA-NOTICE.md) names each place a session goes.

You need:

- A Mac with Apple silicon (M1 or later). The client does not run on a Mac with an Intel processor, on Windows or on Linux
- [Homebrew](https://brew.sh)
- A GitHub account

## 1. Set up Switchbak

### 1.1 Install the client

```bash
brew install switchbackai/tap/switchbak
switchbak version
```

`switchbak version` prints the release you installed.

### 1.2 Log in

```bash
switchbak login
```

Login opens your browser and prints a code. If the browser does not open, open the page that login prints.

1. Sign in with GitHub
2. Make sure that the page shows the code that login printed
3. Press Approve

On a Mac with no browser, as over SSH, run `switchbak login --device`. It prints a page and a code. Open the page on any device, type the code, sign in with GitHub, and press Approve. Approve only a code that you typed yourself.

Login then makes your account, stores the credentials in your login keychain, and runs setup. Your account is in a Switchbak organization:

- The organization of your team, when your team connected its GitHub organization and you are a member of that GitHub organization. The page asks "Join <team> as @login" before you approve. The admins of the team see each join.
- A new organization, with you as its admin, in all other cases. An outside collaborator of a GitHub organization gets a new organization, and does not join the team.

The uploads start when setup ends. Uploads and Audits do not need the GitHub App.

Login ends with this question:

```text
Connect GitHub now? [Y/n]
```

Press Return to do step 1.3 now.

#### Setup

Setup asks two questions.

- Which agents to watch. Setup shows a checklist with one row for each [supported agent](#supported-agents), with the count and size of its session files. Nothing is selected until you select it. A session of an agent that you did not select never leaves your Mac. The warehouse masks the secrets that it finds on arrival.
- Which directories hold your git checkouts. Setup shows each candidate with the count of checkouts below it. A repository outside these directories is minted only when a session names a clone of it. Otherwise its pull requests get no Receipt.

| Key     | What it does                                  |
| ------- | --------------------------------------------- |
| ↑ and ↓ | Move.                                         |
| Space   | Select or clear the row.                      |
| →       | Show the projects of Claude Code or Cursor.   |
| ←       | Hide the projects.                            |
| a       | Select each row, or clear each row.           |
| Enter   | Confirm. On "add a path", type a path to add. |
| Ctrl-C  | Stop. Setup changes nothing.                  |

To keep one project on your Mac, select its agent, press →, and clear the project. Setup writes an exclusion for it. Codex, Gemini CLI and OpenCode do not keep their sessions by project, so they have no project rows.

To change your choices later:

```bash
switchbak agents    # the agents and projects, then restart the watcher
switchbak roots     # the directories of your checkouts
```

Each starts from your current choices. When you clear an agent, the sessions that it sent stay in the warehouse. `switchbak erase <path>` erases one.

Setup then loads two launch agents and waits for the first upload. A fresh install has no session until an agent runs, so no upload yet is not a failure.

Check the installation at any time:

```bash
switchbak status
```

It prints the endpoint, the installation, the two agents, the watched paths, the bytes the server holds, the `audit` line of your newest session, and the GitHub accounts connected to your organization. Before step 1.3, status prints:

```text
github    Receipts on pull requests are off
```

Uploads and Audits run without step 1.3. The next line names your step. An admin of your organization reads ``run `switchbak connect` to turn them on``. Another member reads the admins to ask.

#### Supported agents

Setup offers the session files of these agents. The warehouse audits the sessions of each, and a Receipt cites them.

| Agent       | Session files                           |
| ----------- | --------------------------------------- |
| Claude Code | `~/.claude/projects/`                   |
| Codex       | `~/.codex/sessions/`                    |
| Cursor      | `~/.cursor/projects/`                   |
| Gemini CLI  | `~/.gemini/tmp/`, `~/.gemini/sessions/` |
| OpenCode    | `~/.local/share/opencode/storage/`      |

Setup marks an agent "not found" when its session files are not on your Mac. Run `switchbak agents` after you install another agent.

### 1.3 Connect GitHub

```bash
switchbak connect
```

Do this once for each GitHub organization or account whose pull requests get a Receipt. Pull requests get no Receipt until it is done. [Read an Audit](#read-an-audit) does not need it.

1. Connect opens the Connect page of Switchbak in your browser. The page lists your GitHub account, and each GitHub organization that has the App and that you are a member of
2. Press Install on your account, or on an organization. To install on an organization that is not in the list, press Install on another organization
3. Select which repositories the GitHub App may read
4. Confirm on the page that follows

Connect then prints `✓ GitHub connected`. When your organization is already connected, connect prints the connected accounts and opens the page, so that you can install on your own account.

A member of a GitHub organization who is not an owner sees "Waiting for an owner to approve". GitHub sent the install to an owner. Ask an owner to approve it, and then run `switchbak connect` again.

The Receipt check and the Receipt comment appear on the next push to a pull request in a chosen repository.

When the GitHub account is already connected to the Switchbak organization of your team, connect offers to join that organization.

## 2. Use Switchbak

### 2.1 The Receipt on a pull request

On each push to a pull request in a connected repository, the Switchbak App
writes a Receipt in two places: a check run named `🧾 Receipt`, and one comment
that it edits on each push. The comment is short:

> ### 🧾 Receipt
>
>> **🎯 Add a small retry helper for transient payment API failures.** <sub>session</sub>
>
> | False claims | Blast radius                            | Scope                                     |
> | :----------- | :-------------------------------------- | :---------------------------------------- |
> | 🟢 **None**  | 🔴 **High** <sub>billing/payments</sub> | 🟢 **None flagged** <sub>of 3 paths</sub> |
>
> <sub>Head 8ab31c2 · 1 Claude Code session · Open in Switchbak ↗</sub>

The quote is the intent of the change, in the words of the session. The
citation after it says who stated it and in which turn.

The table has three columns:

- False claims: the claims that the session made and that its own tool results
  do not back. The session says that a check passed, and the run failed or
  did not run.
- Blast radius: low, medium or high, from rules on the changed paths, with the
  reason, for example `billing/payments` or `docs only`. The Audit can raise
  the level from what the session says. It does not lower it.
- Scope: the changed paths that the session does not explain.

A red or yellow count links to the check, which lists the detail. The check
opens with the same intent and table, then these sections:

- 🔴 False claims: each claim, what the tool results show, and the turn.
- 🔖 Decision record: the decisions, each with the option that the session
  rejected, then the constraints, the human redirects and the open questions.
  Each item cites its turn. An item with no turn is not shown.
- ↔️ Scope diff: each changed path with a mark and the reason from the session.

| Mark | Meaning                                                                                             |
| ---- | --------------------------------------------------------------------------------------------------- |
| 🟢   | The session asked for the change.                                                                   |
| 🧪   | A test of what the session asked for.                                                               |
| 🟡   | Flagged: the session did not mention it, or the session promised it and the diff does not touch it. |
| ⚪   | Flagged: the diff neither touches nor explains it.                                                  |

The check adds a "Why is this here?" note to each changed file. Its title
names the head commit that the Receipt describes and the sessions. "Open in
Switchbak" opens the receipt on `sep.switchbak.dev`.

### 2.2 CLI commands

#### Read an Audit

When the first session reaches the server, setup ends with this line, and
`switchbak status` prints the same line under `uploads`:

```text
Read what the audit of your newest session found:

  switchbak audit <path>
```

Run that line. It prints the Verdict, the count of Findings, and one line for each Finding. If the Audit is not finished, it waits for it. You do not need GitHub for this step.

The first upload sends your past sessions too. The warehouse stores them, and audits only the sessions active from one day before your first login on. For a past session, `switchbak status` says it has no Audit yet, and `switchbak audit <path>` asks for its Audit and waits for it.

If the Audit of your newest session failed, `switchbak status` says so under the `audit` line, with one word for the reason, for example `its Audit failed (credit)`. Run the line to read the full message.

#### Follow your Audits

You do not need the path to read an Audit:

```text
switchbak audit -latest              # your newest session that has an Audit
switchbak audit -repo ~/src/app      # the newest of a checkout
switchbak audit -branch main         # the newest on a branch
```

`switchbak status` prints the newest Verdict of each checkout under your roots, under `verdicts`.

To have the watcher show a macOS notification for an Audit with a `fail` Verdict or a `fix` Finding, run `switchbak notify on`. Notifications are off until you turn them on. `switchbak notify off` turns them off again.

#### Erase a session

```bash
switchbak erase <path>
```

`<path>` is a session file. The server erases the whole session that the file belongs to, from every layer of your organization's data, and marks the file as erased. A later upload of the same file is refused. A second erase of the same file says "already erased".

Erase does not reach the backups until they expire, or the Receipts already on GitHub. [Erase](DATA-NOTICE.md#3-erase) has the details.

#### Log in again

A login with GitHub lasts while you are a member of a GitHub organization that your organization connected, or while the App is on your own GitHub account and your organization connected it. When that access ends, the uploads stop, and the watcher log says:

```text
your access to <organization> ended: GitHub no longer lists one of its installations for your account. Ask an admin of <organization> for access, then run `switchbak login`
```

When the notifications are on, one banner says "Your access to <organization> ended".

1. Ask an owner of the GitHub organization to make you a member
2. Run `switchbak login`

When GitHub no longer accepts your sign-in, the log tells you to run `switchbak login` again.

#### Pause, upgrade, remove

```bash
switchbak pause      # the watcher submits nothing until resume
switchbak resume
brew upgrade switchbak
```

The watcher restarts itself on the new binary after an upgrade.

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

#### All commands

| Command                          | What it does                                                          |
| -------------------------------- | --------------------------------------------------------------------- |
| `switchbak login`                | Signs you in with GitHub, stores the credentials, and runs setup.     |
| `switchbak login --device`       | The same, with a code that you approve on another device.             |
| `switchbak version`              | Prints the release you installed.                                     |
| `switchbak connect`              | Connects GitHub, so that pull requests get a Receipt.                 |
| `switchbak setup`                | Writes the watch list and the roots, and loads the launch agents.     |
| `switchbak setup -root <dir>`    | Replaces the roots. Repeat `-root` for each directory.                |
| `switchbak agents`               | Chooses the agents and projects to watch, and restarts the watcher.   |
| `switchbak roots`                | Chooses the directories that hold your checkouts.                     |
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
| `switchbak uninstall`            | Teardown, then logs out and removes the keychain items, logs, config. |

### 2.3 Members of your organization

An admin of your organization sees its members and can remove a member. The person who made the organization is its admin.

1. Open `https://sep.switchbak.dev/v1/web/login`
2. Press Sign in with GitHub
3. Press Members of <organization>. The newest joins come first.
4. Press Remove next to a member. Remove signs the member out at once.

GitHub access does not add a removed member again. The login page of that person says "An admin removed you from <organization>".

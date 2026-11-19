---
title: Where your data goes
description: What the Switchbak client reads and sends, what the warehouse masks, where each copy of a session is held, and what erase removes.
slug: data-notice
sidebar:
  order: 1
---

Switchbak sends the session files of your AI coding agents to your organization's warehouse. This notice names what the client reads, what it sends, what the warehouse masks, where each copy is held, and what erase removes. It describes what the software does. The privacy policy and the terms are separate documents.

1. [On your Mac](#1-on-your-mac): what the client reads, sends and keeps.
2. [Where a session goes](#2-where-a-session-goes): the warehouse, what it masks, the Audit Service, GitHub and the backups.
3. [Erase](#3-erase): what erase removes, and what stays.

## 1. On your Mac

### What a session file holds

A session file is the transcript that an agent writes as it works: your prompts, the replies of the agent, the files it read, the commands it ran and their output, and the edits it made. It holds code. Choose the paths you watch with that in mind.

### What the client reads

- The files under the paths you selected at setup, as bytes. The client reads no file outside them. It parses no transcript; the server decides which files are session files.
- The git checkouts under the directories you named as roots. For each, the client sends a repository id made from its remote URL, as `<host>/<owner>/<name>`, and each remote URL. A checkout with no remote on a known host gets an id made from its path and a fingerprint of your Mac. The client reads no file of the checkout itself.
- The absolute paths in the session files that it sends. When a path is inside a git checkout outside your roots, as an agent's clone into a temporary directory, the client sends that checkout as it sends one under the roots, but only when its remote is on a known host.
- The name of your Mac. Each file is known to the server as `<host name>:<absolute path>`.
- Your email, once, only when a Switchbak operator enrolled you without GitHub. It identifies you within your organization. The server does not verify it.
- The release version of the client, on each request.

### What the client does not read or send

- Anything outside the watched paths. There is no default watch list.
- Keystrokes, the clipboard, the screen, your browser, other applications.
- Telemetry. The client sends none of its own.
- Traces of its own requests, unless `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` was set in the shell that ran setup. Then each request sends a span to that address.

The client sends a secret in a session file as it is. The warehouse masks it when the upload arrives. [Secrets](#secrets) names what it masks.

### What stays on your Mac

| Where                                | What                                                                                       |
| ------------------------------------ | ------------------------------------------------------------------------------------------ |
| `~/.config/switchbak`                | The watch list, the roots, the checkout table and the host name.                           |
| `~/Library/Logs`                     | The log of the watcher.                                                                    |
| The login keychain, item `switchbak` | The refresh token and the id of your installation. The token is replaced at each exchange. |

`switchbak teardown` leaves all three. Delete them yourself.

## 2. Where a session goes

### Your GitHub identity

When you log in with GitHub, Switchbak keeps your GitHub user id and your GitHub login. The id identifies you. The login is the name that Switchbak shows, and Switchbak updates it at each login. Switchbak does not keep your email from GitHub. GitHub sign-in also tells Switchbak which installations of the GitHub App you can access. To check that access again, Switchbak keeps the GitHub sign-in token of the App, encrypted. It drops the token when your access ends.

### The warehouse

The client sends the bytes of each watched file to `sep.switchbak.dev` over TLS on port 443, with the checkout table, your host name, the id of your installation and the client version. The warehouse runs in an AWS account that Switchbak operates. It holds the data of your organization in a Postgres schema and role of its own. A login of another organization cannot read it.

Within your organization, each member can read every session of the organization, with its prompts and code, and every Receipt. A person is a member when one of these is true:

- The person made the organization when they logged in with GitHub.
- The person logged in with GitHub, and GitHub gives the person access to an installation of the GitHub App that your organization connected. This includes the outside collaborators of a GitHub organization. Switchbak checks this access again each time the client renews its credentials. When the access ends, the membership ends.
- A Switchbak operator enrolled the person without GitHub, for example an account for CI.

The admins of your organization see each join on the members page. An admin can remove a member, and GitHub access does not add that person again. Choose who can access the installation with that in mind.

A person who joins a team from an organization of their own moves into the organization of the team. Their sessions of the last 24 hours go to the warehouse of the team, and each member of the team can read them. The move starts only when the person presses Approve. Their earlier organization is retired. Its other sessions stay in it, and the team cannot read them. Switchbak erases it 7 days after the move. Until then, its Receipt links on pull requests still open. The backups that hold it expire 30 days after the erase.

### Secrets

The client does not mask secrets. The warehouse masks each secret that it finds when an upload arrives, before it stores the upload. It writes `*` over the secret, at the same length. It masks the session files, the host name and checkout table that the client sends with them, and the agent's description of a session. The checkout table holds the directory and the remote URLs of each checkout. The client removes the user name and password from each remote URL before it sends them.

The warehouse masks:

- AWS access keys and AWS secret access keys.
- Google Cloud API keys.
- Private key blocks.
- JSON Web Tokens and bearer tokens.
- GitHub tokens.
- Anthropic and OpenAI API keys.
- Slack tokens and Slack webhook URLs.
- `NAME=value` assignments whose upper-case name contains `SECRET`, `TOKEN`, `PASSWORD`, `PASSWD`, `API_KEY`, `APIKEY`, `PRIVATE_KEY` or `CREDENTIAL`.

It does not mask:

- Email addresses.
- Names of people.
- Free text that matches none of the kinds above, for example a password that you type into a prompt as a word.

Masking does not find every secret, so keep secrets out of your sessions.

### The Audit Service

The warehouse sends each upload to the Audit Service, which reads the session and answers with a verdict and findings. A session that ended more than one day before you first logged in is stored and not sent, until you run `switchbak audit <path>` for it.

### The GitHub App

After `switchbak connect`, the Switchbak App reads the pull requests of the repositories your organization chose: their commits, changed files, reviews, head and base. It reads no repository contents, issues or members. For each pull request, it writes one check run and one comment: the Receipt, which quotes the sessions behind the change, with citations. Everyone who can see the pull request can see the Receipt. The check links to a receipt page on `sep.switchbak.dev` that opens without a login for anyone who has the link.

### Backups

A dump of the warehouse database is taken each night and kept for 30 days. An erased session stays in the backups until they expire.

## 3. Erase

### What erase removes, and what stays

`switchbak erase <path>` erases one session: its bytes, its lines, its facts, its audits, its search documents, and each Receipt that quotes it, in one transaction. The server marks each file of the session as erased. A later upload of it is refused.

These stay:

- The record that an upload happened: which file, which byte range, when. The bytes are gone.
- The id of your installation, the time of its first and last upload, and the client version of the last. Switchbak counts installations with them.
- Your user and your organization. A removal by an admin, or a revoke by the operator of your organization, signs you out and keeps the record of you.
- The backups until they expire, and the Receipts on GitHub.

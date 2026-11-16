# Where your data goes

Switchbak sends the session files of your AI coding agents to your organization's warehouse. This notice names what the client reads, what it sends, what it masks, where each copy is held, and what erase removes. It describes what the software does. The privacy policy and the terms are separate documents.

1. [On your Mac](#1-on-your-mac): what the client reads, masks and keeps.
2. [Where a session goes](#2-where-a-session-goes): the warehouse, the Audit Service, GitHub and the backups.
3. [Erase](#3-erase): what erase removes, and what stays.

## The beta

Switchbak is in beta. During the beta, these terms apply:

- The service runs in an environment that is not stable. It can stop or change without notice.
- Switchbak does not guarantee the durability of your data. Do not use the warehouse as the only copy of a session.
- At the end of the beta, Switchbak deletes the data of your organization from the warehouse. The backups that hold it expire 30 days later. The other copies that erase does not reach stay, as [What erase removes, and what stays](#what-erase-removes-and-what-stays) names.

## 1. On your Mac

### What a session file holds

A session file is the transcript that an agent writes as it works: your prompts, the replies of the agent, the files it read, the commands it ran and their output, and the edits it made. It holds code. Choose the paths you watch with that in mind.

### What the client reads

- The files under the paths you selected at setup, as bytes. The client reads no file outside them. It parses no transcript; the server decides which files are session files.
- The git checkouts under the directories you named as roots. For each, the client sends a repository id made from its remote URL, as `<host>/<owner>/<name>`, and each remote URL. A checkout with no remote on a known host gets an id made from its path and a fingerprint of your Mac. The client reads no file of the checkout itself.
- The absolute paths in the session files that it sends. When a path is inside a git checkout outside your roots, as an agent's clone into a temporary directory, the client sends that checkout as it sends one under the roots, but only when its remote is on a known host.
- The name of your Mac. Each file is known to the server as `<host name>:<absolute path>`.
- Your email, once, at signup. It identifies you within your organization. The server does not verify it.
- The release version of the client, on each request.

### What the client does not read or send

- Anything outside the watched paths. There is no default watch list.
- Keystrokes, the clipboard, the screen, your browser, other applications.
- Telemetry. The client sends none of its own.
- Traces of its own requests, unless `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` was set in the shell that ran setup. Then each request sends a span to that address.

### Secrets

The client masks each secret that it finds before any byte leaves your Mac. It writes `*` over the secret, at the same length. It masks the session files, and the host name and checkout table that it sends with them. The checkout table holds the directory and the remote URLs of each checkout. The client removes the user name and password from each remote URL. The warehouse masks each upload again with the same rules.

The client and the warehouse mask:

- AWS access keys and AWS secret access keys.
- Google Cloud API keys.
- Private key blocks.
- JSON Web Tokens and bearer tokens.
- GitHub tokens.
- Anthropic and OpenAI API keys.
- Slack tokens and Slack webhook URLs.
- `NAME=value` assignments whose upper-case name contains `SECRET`, `TOKEN`, `PASSWORD`, `PASSWD`, `API_KEY`, `APIKEY`, `PRIVATE_KEY` or `CREDENTIAL`.

They do not mask:

- Email addresses.
- Names of people.
- Free text that matches none of the kinds above, for example a password that you type into a prompt as a word.

Masking does not find every secret, so keep secrets out of your sessions.

To turn off one kind of masking on your Mac, name it in `~/.config/switchbak/unmask.conf`. The names are `aws_access_key`, `aws_secret_key`, `gcp_api_key`, `private_key`, `jwt`, `bearer`, `github_token`, `anthropic_key`, `openai_key`, `slack_token`, `slack_webhook` and `env_secret`. `switchbak status` prints an `unmasked` line with the names that you turned off.

### What stays on your Mac

| Where                                | What                                                                                       |
| ------------------------------------ | ------------------------------------------------------------------------------------------ |
| `~/.config/switchbak`                | The watch list, the roots, the checkout table and the host name.                           |
| `~/Library/Logs`                     | The log of the watcher.                                                                    |
| The login keychain, item `switchbak` | The refresh token and the id of your installation. The token is replaced at each exchange. |

`switchbak teardown` leaves all three. Delete them yourself.

## 2. Where a session goes

### The warehouse

The client sends the bytes of each watched file to `sep.switchbak.dev` over TLS on port 443, with the checkout table, your host name, the id of your installation and the client version. The warehouse runs in an AWS account that Switchbak operates. It holds the data of your organization in a Postgres schema and role of its own. A login of another organization cannot read it.

Within your organization, each person who signed up with its passcode can read every session of the organization, with its prompts and code, and every Receipt. The passcode is therefore a secret of your organization. Do not give it to a person who must not read your sessions.

### The Audit Service

The warehouse sends each upload to the Audit Service, which reads the session and answers with a verdict and findings. A session that ended more than one day before your signup is stored and not sent, until you run `switchbak audit <path>` for it.

### The GitHub App

After Connect GitHub, the Switchbak App reads the pull requests of the repositories your organization chose: their commits, changed files, reviews, head and base. It reads no repository contents, issues or members. For each pull request, it writes one check run and one comment: the Receipt, which quotes the sessions behind the change, with citations. Everyone who can see the pull request can see the Receipt. The check links to a receipt page on `sep.switchbak.dev` that opens without a login for anyone who has the link.

### Backups

A dump of the warehouse database is taken each night and kept for 30 days. An erased session stays in the backups until they expire.

## 3. Erase

### What erase removes, and what stays

`switchbak erase <path>` erases one session: its bytes, its lines, its facts, its audits, its search documents, and each Receipt that quotes it, in one transaction. The server marks each file of the session as erased. A later upload of it is refused.

These stay:

- The record that an upload happened: which file, which byte range, when. The bytes are gone.
- The id of your installation, the time of its first and last upload, and the client version of the last. Switchbak counts installations with them.
- Your user and your organization, until the operator of your organization revokes them.
- The backups until they expire, and the Receipts on GitHub.

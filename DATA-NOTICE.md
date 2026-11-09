# Where your data goes

Switchbak sends the session files of your AI coding agents to the switchback
warehouse of your organisation. This notice names what the client reads, what
it sends, where each copy is held, and what erase removes. It describes what
the software does. The privacy policy and the terms are separate documents.

## What a session file holds

A session file is the transcript that an agent writes as it works: your
prompts, the replies of the agent, the files it read, the commands it ran and
their output, and the edits it made. It holds code. Choose the paths you watch
with that in mind.

## What the client reads on your Mac

<!-- clients/macos/README.md, Watch; The checkout table; Host name. -->

- The files under the paths you selected at setup, as bytes. The client reads
  no file outside them. It parses no transcript; the server decides which
  files are session files.
- The git checkouts under the directories you named as roots. For each, the
  client sends a repository id made from its remote URL, as
  `<host>/<owner>/<name>`, and each remote URL. A checkout with no remote on a
  known host gets an id made from its path and a fingerprint of your Mac. The
  client reads no file of the checkout itself.
- The name of your Mac. Each file is known to the server as
  `<host name>:<absolute path>`.
- Your email, once, at signup. It identifies you within your organisation.
  The server does not verify it.
- The release version of the client, on each request.

## What the client does not read or send

<!-- clients/macos/docs/DISTRIBUTION.md, The usage counts; Considered. -->

- Anything outside the watched paths. There is no default watch list.
- Keystrokes, the clipboard, the screen, your browser, other applications.
- Telemetry. The client sends none of its own.
- Traces of its own requests, unless `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` was
  set in the shell that ran setup. Then each request sends a span to that
  address.

## Where a session goes

<!-- services/sep/docs/RETENTION.md; AUDITOR.md; ARCHITECTURE.md sections 9 and 11;
     just sep github-app; infrastructure/aws/bucket.tf, variables.tf. -->

### The warehouse

The client sends the bytes of each watched file to `sep.switchbak.dev` over
TLS on port 443, with the checkout table, your host name, the id of your
installation and the client version. The warehouse runs in an AWS account that
switchback operates, in the region `us-west-2`. It holds the data of your
organisation in a Postgres schema and role of its own. A login of another
organisation cannot read it.

Within your organisation, each person who signed up with its passcode can read
every session of the organisation, with its prompts and code, and every Receipt.
The warehouse does not limit a login to the sessions of its own person. The
passcode is therefore a secret of your organisation. Do not give it to a person
who must not read your sessions.

The warehouse keeps each session until erase. From the bytes it derives the
records it serves: the lines of the session, the facts it extracts, the search
index and the Receipts.

### The Audit Service

The warehouse sends each upload to the Audit Service, which reads the session
and answers with a verdict and findings. A session that ended more than one
day before your signup is stored and not sent, until you run
`switchbak audit <path>` for it. The Audit Service is a language-model
service that switchback operates. The warehouse sends each timestamped line
of the session in order. Before it sends, it replaces a repeated attachment or
tool output with a reference to the first copy, replaces each image with its
type, size and hash, and cuts a tool output over 8 KiB to 2 KiB at each end.
Your prompts and the code in the session go as they are.

The Audit Service holds its copy on its own terms. Erase does not reach it.

### GitHub

After Connect GitHub, the switchback App reads the pull requests of the
repositories your organisation chose: their commits, changed files, reviews,
head and base. It reads no repository contents, issues or members. For each
pull request it writes one check run and one comment: the Receipt, which
quotes the sessions behind the change, with citations. Everyone who can see
the pull request can see the Receipt. The check links to a receipt page on
`sep.switchbak.dev` that opens without a login for anyone who has the link.

GitHub holds the check and the comment under the terms of your organisation's
GitHub account. Erase does not edit GitHub.

### Backups

A dump of the warehouse database is taken each night at 03:00 UTC and copied
to a bucket in the same AWS account. A replaced copy expires 30 days later. An
erased session stays in the backups until they expire.

## What erase removes, and what stays

<!-- services/sep/docs/RETENTION.md, What removes data; staging/schema.sql,
     submitter first_seen, last_seen, last_client_version. -->

`switchbak erase <path>` erases one session: its bytes, its lines, its facts,
its audits, its search documents, and each Receipt that quotes it, in one
transaction. The server marks each file of the session as erased. A later
upload of it is refused.

These stay:

- The record that an upload happened: which file, which byte range, when.
  The bytes are gone.
- The id of your installation, the time of its first and last upload, and the
  client version of the last. switchback counts installations with them.
- Your user and your organisation, until the operator of your organisation
  revokes them.
- The copy the Audit Service holds, the backups until they expire, and the
  Receipts on GitHub.

## On your Mac

<!-- clients/macos/cmd/chaland/setup.go, teardown. -->

- `~/.config/switchbak`: the watch list, the roots, the checkout table and
  the host name.
- `~/Library/Logs`: the log of the watcher.
- The login keychain, item `switchbak`: the refresh token and the id of your
  installation. The token is replaced at each exchange.

`switchbak teardown` leaves all three. Delete them yourself.

## Contact

To erase a session, run `switchbak erase <path>`. To erase an installation or
an organisation, ask the operator who gave you the passcode.

---
title: FAQ
description: The terms of the beta, and answers to the questions that people ask first.
sidebar:
  order: 2
---

## What are the terms of the beta?

Switchbak is in beta. During the beta, these terms apply:

- The service runs in an environment that is not stable. It can stop or change without notice.
- Switchbak does not guarantee the durability of your data. Do not use the warehouse as the only copy of a session.
- At the end of the beta, Switchbak deletes the data of your organization from the warehouse. The backups that hold it expire 30 days later. The other copies that erase does not reach stay, as [What erase removes, and what stays](../security/security-and-privacy.md#what-erase-removes-and-what-stays) names.

## Which computers does the client run on?

A Mac with Apple silicon (M1 or later). The client does not run on a Mac with an Intel processor, on Windows or on Linux. [Set up the CLI](../guides/cli/set-up.md#before-you-start) names what else you need.

## Which agents does Switchbak support?

Claude Code, Codex, Cursor, Gemini CLI and OpenCode. [Supported agents](../guides/cli/set-up.md#supported-agents) names where each keeps its session files.

## Who can read my sessions?

Each member of your organization can read every session of the organization, with its prompts and code, and every Receipt. A login of another organization cannot read them. [The warehouse](../security/security-and-privacy.md#the-warehouse) says who is a member.

## Who can see the Receipt on a pull request?

Everyone who can see the pull request can see the check run and the comment. Only a signed-in member of your organization can open the Receipt on `app.switchbak.dev`. See [The GitHub App](../security/security-and-privacy.md#the-github-app).

## Why does my pull request have no Receipt?

[If there's no Receipt](../guides/cli/set-up.md#if-theres-no-receipt) lists the causes and what to do for each.

## How do I remove a session?

Run `switchbak erase <path>`. [Erase a session](../guides/cli/manage.md#erase-a-session) says what it removes and what stays.

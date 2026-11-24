---
title: Accounts and workspaces
description: Pick a Personal or Team workspace, join your team, link GitHub and Google to one account, and switch between workspaces.
sidebar:
  order: 2
---

## Your workspace

The first time you log in, whether from `switchbak login` or at [app.switchbak.dev](https://app.switchbak.dev), you create a workspace. The page says "Create your workspace":

1. Check that the page shows the code from your terminal, if you started from `switchbak login`.
2. Pick a type:
   - **Personal**: just you. Pull requests in your own GitHub repositories get a Receipt.
   - **Team**: you and your teammates. Pull requests in your GitHub organization's repositories get a Receipt. You're the admin, and you [invite your teammates](../admin/invite-teammates.md).
3. Keep the suggested name or change it. For a team, use your team's name.
4. Press **Create workspace**.

You can't change a workspace's type later. To add another workspace, create it at [app.switchbak.dev/signup](https://app.switchbak.dev/signup).

## Join your team

If your team already connected its GitHub organization and you're a member of that organization, logging in with GitHub asks "Join <team> as @login" before you approve. Your team's admins can see each person who joins. Outside collaborators on the GitHub organization can't join this way. To make your own workspace instead, press **Create a new workspace instead**.

Logging in with Google doesn't join you through GitHub. To join that way, log in with GitHub, or [link GitHub](#link-github-and-google) to your account first. An invite link from an admin works with either.

## Sign in with Google

Your Google account needs an email address that Google has verified. If it doesn't have one, login stops with:

```text
the login was refused: Google has not verified the email of <email>. Verify it with Google, then run switchbak login again.
```

If your email already belongs to an account that signs in with GitHub, the page says "An account with this email signs in with GitHub". Choose **Continue with GitHub** instead. Signing in on the web that way also links your Google account.

## Link GitHub and Google

You can sign in to the same account with both GitHub and Google:

1. Sign in at [app.switchbak.dev](https://app.switchbak.dev).
2. Open your avatar menu and choose **Profile**. Under **Accounts**, you'll see the accounts you sign in with.
3. Under **Add an account**, press **Link a GitHub account** or **Link a Google account**, and sign in.

The page then confirms, for example "Your Google account is linked. You can sign in with it."

A few limits:

- Each person links one GitHub account and one Google account.
- You can't remove a link once it's made.
- Switchbak never merges two accounts. If a GitHub or Google account already belongs to a different Switchbak account, the link is refused with "This Google account belongs to another Switchbak account". Sign in with that account instead, or ask an admin.

## More than one workspace

You can belong to several workspaces, such as your personal one and your team's.

- **On the web**: signing in opens the workspace you used last. "Choose a workspace" lists the others, and the menu next to the workspace name in the header switches between them.
- **On your Mac**: the `switchbak login` page lists your workspaces and asks you to "Choose the organization to log in to". This Mac sends sessions to the one you pick. Run `switchbak login` again to change it.
- **Which one this Mac uses**: run `switchbak whoami`. `switchbak status` prints the same on its `account` line:

  ```text
  github octo · google octo@example.com · workspace Acme (Team)
  ```

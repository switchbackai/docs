---
title: Erase a session
description: Erase a session from the warehouse of your organization.
sidebar:
  order: 4
---

```bash
switchbak erase <path>
```

`<path>` is a session file. The server erases the whole session that the file belongs to, from every layer of your organization's data, and marks the file as erased. A later upload of the same file is refused. A second erase of the same file says "already erased".

Erase does not reach the backups until they expire, or the Receipts already on GitHub. [Erase](../your-data/DATA-NOTICE.md#3-erase) has the details.

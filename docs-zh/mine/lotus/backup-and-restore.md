---
title: 'Lotus Miner: 备份和恢复'
description: '经常备份Lotus Miner是非常必要的。本页面将引导您了解如何备份Lotus Miner，以及如何恢复备份。'
breadcrumb: '备份和恢复'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 备份

该流程备份 Lotus miner 的元数据，这是恢复操作所需的。此备份不包括扇区数据。

1. 为这个备份创建一个目录:

   ```bash
   mkdir -p ~/lotus-backups/2020-11-15
   ```

1. 调用 `backup` 来备份你的miner，并为 `backup.cbor`文件提供目的路径:

   ```bash
   lotus-miner backup /root/lotus-backups/2020-11-15/backup.cbor

   > Success
   ```

   Add the `--offline` backup if your miner is not currently running:

   ```bash
   lotus-miner backup --offline /root/lotus-backups/2020-11-15/backup.cbor

   > Success
   ```

1. 备份 `config.toml`和`storage.json` 文件:

   ```bash
   cp ~/.lotusminer/config.toml ~/.lotusminer/storage.json /root/lotus-backups/2020-11-15
   ```

现在备份已经完成。保存备份时一定要遵循 3-2-1 规则:

> 至少保留三(3)份数据副本，并在不同的存储介质上存储两(2)份备份，其中一(1)份位于异地。——[Nakivo, 2017](https://www.nakivo.com/blog/3-2-1-backup-rule-efficient-data-protection-strategy/)

## 恢复

1. 复制你的 `backup.cbor`, `config.toml`, 和 `storage.json`文件发送给miner，如果miner在另一台计算机上。
1. 调用`restore`从备份文件恢复miner:

   ```bash/
   lotus-miner init restore /root/lotus-backups/2020-11-15/backup.cbor

   > ...
   > 2020-11-15T17:53:41.630Z        INFO    main    lotus-storage-miner/init_restore.go:254 Initializing libp2p identity
   > 2020-11-15T17:53:41.631Z        INFO    main    lotus-storage-miner/init_restore.go:266 Configuring miner actor
   > 2020-11-15T17:53:41.643Z        INFO    main    lotus-storage-miner/init.go:592 Waiting for message: bafy2bzacea3a7kqp3du5lwhm6xlaawxbz3ae7luefmhlcewljclauit7yexuq
   ```

1. 复制 `config.toml`和 `storage.json`到 `~/.lotusminer`:

   ```bash
   cp lotus-backups/2020-11-15/config.toml lotus-backups/2020-11-15/storage.json .lotusminer
   ```

1. 启动你的 miner:

   ```bash
   lotus-miner run
   ```

现在恢复已经完成。

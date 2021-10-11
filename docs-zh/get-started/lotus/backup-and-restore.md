---
title: 备份与还原
description: "您可以备份Lotus节点。然后，如果出现问题，或者只是希望将Lotus节点从一台计算机移动到另一台计算机，则可以恢复该备份."
---

# 备份与还原

您可以备份Lotus节点。然后，如果出现问题，或者只是希望将Lotus节点从一台计算机移动到另一台计算机，则可以恢复该备份。

这个备份过程与[' lotus-miner ' backup](../../mine/lotus/backup-and-restore.md)的备份过程不同。此备份过程不保留任何挖掘信息。

## 备份

1. 如果您的' lotus '守护进程已经在运行，请停止它.
1. 启动 `lotus daemon backup`:
    
    ```shell
    lotus backup --offline ~/lotus-backup.cbor
    ```

    ```shell output
    2021-09-24T20:21:03.986Z        INFO    backupds        backupds/datastore.go:75Starting datastore backup
    2021-09-24T20:21:03.987Z        INFO    backupds        backupds/datastore.go:130
    Datastore backup done
    ```

1. Lotus守护进程数据现在已经备份到 `lotus-backup.cbor`.

## 恢复

1. 如果您的' lotus '守护进程已经在运行，请停止它.
1. 运行`lotus daemon` 同时使用`--restore`:

    ```shell
    lotus daemon 2>&1 --restore=offline-backup.cbor
    ```

    ```shell output
    2021-09-24T20:24:51.729Z        INFO    main    lotus/daemon.go:218     lotus repo: /root/.lotus                                                                                              
    2021-09-24T20:24:51.730Z        INFO    paramfetch      go-paramfetch@v0.0.2/paramfetch.go:191  Parameter file /var/tmp/filecoin-proof-parameters/v28-proof-of-spacetime-fallback-merkletree-poseidon_hasher-8-0-0-7d739b8cf60f1b0709eeebee7730e297683552e4b69cab6984ec0285663c5781.vk is ok
    ...
    2021-09-24T20:24:52.296Z        INFO    badger  v2@v2.2007.2/value.go:1178      Replay took: 2.975µs
    2021-09-24T20:24:52.297Z        INFO    backupds        backupds/log.go:125     opening log     {"file": "/root/.lotus/kvlog/metadata/1632514590.log.cbor"}
    ```

1. `lotus daemon` 应该继续从执行备份时的块高度运行.


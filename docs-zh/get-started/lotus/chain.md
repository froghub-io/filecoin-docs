---
title: 'Lotus: 链管理'
description: 'Lotus 链承载着计算 Filecoin 网络当前状态所需的信息。本指南解释了如何管理链的几个方面，包括如何通过从快照加载链来减少节点的同步时间。'
breadcrumb: '链管理'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}.

[[TOC]]

## 同步

Lotus 将通过从当前 _头_ 到最后一个同步的纪元获取区块头，自动同步到最新的 _链头_ 。然后，节点会检索并验证从上一个同步的纪元到当前头的所有区块。一旦 Lotus 被同步，它将在每个纪元被挖掘时了解新的区块，并对它们进行相应的验证。每个纪元可能会看到数量不等的挖矿区块。

| 名称|结束高度|信息开始高度|状态开始高度|
| ------------------------------------ | ------------- | --------------------------- | --------------------------- |
| [轻量级](#lightweight-snapshot) | 当前区块 | 当前区块-2000区块 | 当前区块-2000区块。 |
| [全链](#full-chain-snapshot) | 当前区块 | 创世纪区块 |当前区块-2000区块 |


### 轻量级快照

我们建议大多数用户从最小的、轻量级的快照执行初始节点同步。受信任状态快照不包含完整的链，可能不适合需要对历史状态信息执行查询的节点，如块浏览器，但对大多数用户来说都适用。

:::warning
这些轻量级状态快照 **不包含任何消息收据** 。要获得消息收据，你需要从 genesis 块同步你的 Lotus 节点，而不使用任何这些快照。
:::

1. 下载最新的轻量级快照及其校验和:

   **Mainnet**

   + [这个 URL](https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car) 总是包含主网可用的最新快照.

    ```shell
    curl -sI https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car | perl -ne '/x-amz-website-redirect-location:\s(.+)\.car/ && print "$1.sha256sum\n$1.car"' | xargs wget
    ```

   **Testnet**

   :::警告
   Testnet快照由Filecoin社区自愿维护，可能不是最新的。使用前请仔细检查
   :::

   + 校正:下载最新快照: [lotus_cali_snapshot_2021_07_14_high_73770.car.tar.xz](https://www.mediafire.com/file/q7tc2bmcc9d09vv/lotus_cali_snapshot_2021_07_14_high_73770.car.tar.xz/file).


2. 检查下载的快照`sha256sum`:

    ```shell with-output
    # 基于您下载的快照文件，替换`.sha256sum` 和 `.car`的名称 
    echo "$(cut -c 1-64 minimal_finality_stateroots_517061_2021-02-20_11-00-00.sha256sum) minimal_finality_stateroots_517061_2021-02-20_11-00-00.car" | sha256sum --check
    ```
    ```
    minimal_finality_stateroots_517061_2021-02-20_11-00-00.car: OK
    ```

3. 使用下面的命令启动Lotus守护进程 `--import-snapshot`:

    ```shell
    # 根据下载的快照替换文件名称`.car` .
    lotus daemon --import-snapshot minimal_finality_stateroots_517061_2021-02-20_11-00-00.car
    ```

我们强烈建议您在导入之前下载并验证快照的校验和。但是，如果你愿意，你可以跳过sha256sum检查，直接使用快照URL:

```shell
lotus daemon --import-snapshot https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car
```

### 全链快照

完整的全链快照包含了从起源到当前提示集的每一个区块。你可以通过供给 `--import-chain` 选项来信任地导入这些完整的快照，以便在导入时重新计算完整的状态。

```sh
lotus daemon --import-chain https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/complete_chain_with_finality_stateroots_latest.car
```

由于 Filecoin 区块链的规模和复杂性，这一操作将需要多日。

### 检查同步状态

有两种方法可以跟踪 Lotus 守护进程是否正确地同步了链，以及它是否完成同步:


#### 同步状态

使用 `sync status` 来输出本地链的当前状态。

````sh
lotus sync status

> sync status:
> worker 0:
>         Base:   [bafy2bzacecnamqgqmifpluoeldx7zzglxcljo6oja4vrmtj7432rphldpdmm2]
>         Target: [bafy2bzaceb4b3ionbbxz4uqoehzkjlt4ayta7bneh2bh5xatnwypeuqypebmw bafy2bzaceb2uct4pawanule5bt2ivepcgqls6e6f52lccofvdyfynyfnsa3aa bafy2bzacealylayv2mpgx7wkf54diu6vqmw5yubdgkauii7q2fb7hvwk4343i] (414300)
>         Height diff:    414300
>         Stage: header sync
>         Height: 414300
>         Elapsed: 765.267091ms

#### Sync wait

使用 `sync wait` 作为一个持续的过程不断输出当前链的状态。

```bash
lotus sync wait

> Worker: 0; Base: 0; Target: 414300 (diff: 414300)
> State: header sync; Current Epoch: 410769; Todo: 3531
> Validated 0 messages (0 per second)
> ...
````

使用 `chain getblock` 检查最后一个同步区块的挖矿时间。

```bash
date -d @$(./lotus chain getblock $(./lotus chain head) | jq .Timestamp)

> Mon 24 Aug 2020 06:00:00 PM EDT
```

## 创建一个快照

可以创建一个完整的链式CAR-snapshot  `chain export` ：

```bash
lotus chain export <filename>
```

要备份一定数量的最近的状态根，请使用 `--recent-stateroots` 选项，以及你想要备份的状态根数量：

```bash
lotus chain export --recent-stateroots=2000 <filename>
```

要创建一个 _pruned_ 快照，并且只包含由导出的状态根直接引用的块，请添加 `skip-old-msgs` 选项：

```bash
lotus chain export --recent-stateroots=2000 --skip-old-msgs <filename>
```

## 恢复自定义快照

你可以通过使用 `--import-snapshot` 选项启动守护进程来恢复快照：

```bash
# Without verification
lotus daemon --import-snapshot <filename>

# With verification
lotus daemon --import-chain <filename>
```

如果您不想让守护进程在快照完成后立即启动，请在命令中添加 `--halt-after-import' 标志：

```bash
lotus daemon --import-snapshot --halt-after-import <filename>
```

## 压缩链数据

可以对Lotus使用的当前链数据进行 _修剪_ ，通过从最小快照重新同步来减少节点的磁盘占用：

1. 停止 Lotus daemon:

```bash
lotus daemon stop
```

1. 删除Lotus路径中 `datastore/chain/` 文件夹的内容：

```bash
rm -rf ~/.lotus/datastore/chain/*
```

1. 使用[轻量级快照](#lightweight-snapshot)启动守护进程：

```bash
lotus daemon --import-snapshot https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car
```

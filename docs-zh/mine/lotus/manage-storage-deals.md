---
title: 'Lotus Miner: 管理存储交易'
description: '本指南描述了Lotus Miner可以用来管理存储交易的不同工作流程和选项。'
breadcrumb: '管理存储交易'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

在 miner 的生命周期内， Filecoin 网络客户端将查询 miner 发布的存储价格 _询问_ 并发起交易。交易经历以下几个阶段：

1. 数据传输（用于在线交易）或数据导入（用于离线交易）
2. 带有交易数据的封装扇区 (miner)
3. 证明（每 24 小时）

以下各节深入介绍了 Lotus 可用于管理存储交易过程的多个部分的不同方式。

## 启用和禁用交易

在miner中有两种启用和禁用新存储交易的方法。 另外:

- 编辑`[DealMaking]` 中的选项 [miner configuration file](miner-configuration.md) 和 [restarting the miner](miner-lifecycle.md).
- 使用 `lotus-miner storage-deals selection` 命令。

由于重启 miner 是一项微妙的操作，因此最好让 Lotus 通过使用 `lotus-miner storage-deals selection` 命令来处理事情。

要禁用存储交易，请运行：

```shell
lotus-miner storage-deals selection reject --online --offline
```

上面的命令会根据上面使用的标志自动更 `config.toml` 文件中的值以进行脱机和在线交易。

您可以使用以下方法验证当前状态：

```shell
lotus-miner storage-deals selection list
```

要 _重新启用_ 存储交易，请运行：

```shell
$ lotus-miner storage-deals selection reset
$ # Verify that they have been enabled
$ lotus-miner storage-deals selection list
considering online storage deals: true
considering offline storage deals: true
```

请注意，上面的值会影响新交易。正在进行的交易仍然必须兑现。

## 设定要价

接受新交易的最重要方面之一是 miner 们的条件和价格。在这些条件下评估传入的交易，并由 Lotus Miners 自动接受或拒绝。

仓储价格等条件, 设置为 `lotus-miner storage-deals set-ask` 指令，例如：

```shell
lotus-miner storage-deals set-ask \
  --price 0.0000001 \
  --verified-price 0.0000001  \
  --min-piece-size 56KiB \
  --max-piece-size 32GB
```

上面的命令将每个 GiB 的交易价格设置为`0.0000001 FIL` (`100 nanoFIL`) 。这意味着，客户必须为每存储的 GiB 每 30 秒支付 `100 nanoFIL` 。 如果客户希望在一周的时间内存储 5GiB， 则总价格将为: `5GiB * 100nanoFIL/GiB_Epoch * 20160 Epochs = 10080 microFIL`.

该命令还用于设置最小和最大交易量。请使用该指令 `lotus-miner storage-deals set-ask --help` 以查看所有选项。

您可以通过以下方式显示 miner 的当前要价：

```shell
lotus-miner storage-deals get-ask
```

Lotus 客户还可以通过以下方式请求 miner 价格：

```shell
lotus client query-ask <minerID>
```

## 列出当前所有交易

可以通过运行以下命令找到当前交易及其当前状态：

```shell
lotus-miner storage-deals list -v
```

该列表显示：

- 交易创建时。
- 正在存储的 DataCID。
- 提交客户的钱包地址。
- 时间的大小和持续时间 (每个时段为 30 秒).

## 待公布的交易
要列出在您的发布队列中等待的交易：

```shell
lotus-miner storage-deals pending-publish
```

您可以通过 `--publish-now` 选项随时发布交易：

```shell
lotus-miner storage-deals pending-publish --publish-now
```

miner的默认配置设置为批量多笔交易，每小时最多发布8笔交易的消息。您可以在您的[配置文件](miner-configuration.md#publishing-several-deals-in-one-message)中更改 `PublishMsgPeriod` 和 `MaxDealsPerPublishMsg` 。

## Blocking storage deals by PieceCID

Lotus Miner 提供了内部工具来导入 PieceCID-blocklist:

```shell
lotus-miner storage-deals set-blocklist blocklist-file.txt
```

`blocklist-file.txt` 应包含一个 CID 列表，每个 CID 都位于单独的行上。可以使用以下命令检查当前块列表 (blocklist)：

```shell
lotus-miner storage-deals get-blocklist
```

要重置和清除快列表，请运行：

```shell
lotus-miner storage-deals reset-blocklist
```

## 将同一扇区的交易分组

在空间允许的情况下，miner 在开始收到交易的那一刻与封装包含数据的扇区之间存在一定的延迟，这使得 miner 可以在每个扇区中包含多个交易。每个扇区的交易数量越高，操作效率就越高，因为它需要更少的封装和验证操作。

可以使用[configuration](miner-configuration.md)中的`[Sealing]`部分的 `WaitDealsDelay` 选项来设置延迟。

## 离线存储交易

当要传输的数据量 [非常庞大时](../../store/lotus/very-large-files.md#deals-with-offline-data-transfer), 将某些硬盘直接运送给 miner 并以 **离线** 方式完成交易可能会更有效。

在这种情况下，miner 将必须使用以下命令手动导入存储交易数据：

```shell
lotus-miner storage-deals import-data <dealCid> <filePath>
```

### 线下交易流程

这是离线存储交易如何工作的_general_过程:

1. 存储提供商必须将“考虑离线存储交易”设置为“true”。
1. 存储提供商和客户阐明存储交易的关键方面。他们必须就以下问题达成协议:
   a.存储有效载荷有多大。
   a.交易期限。
   a.数据存储给客户的价格。
   a.交易是否经过核实。
   a.交易的开始阶段。
   a.当数据准备好下载时。
   a.估计/最低下载速度。
1. 客户端提供了一种传输存储有效负载的方法，通常使用URL链接。然而，在存储有效负载相当大的情况下，客户机物理地向存储提供者发送包含数据的硬盘驱动器可能是最理想的。存储提供者必须决定将数据临时存储在何处。这可以在较慢的硬盘列上。
   a.客户端必须以'car '文件方式发送数据。必须生成每个'的CID。Car ' file _before_发送数据到存储提供程序。
   b.客户端必须共享每个'.car‘的cid文件与存储提供商。
1. 如果文件是由客户端压缩后通过互联网发送的，存储提供商必须解压数据。此时，存储提供商可能需要调整交易价格，以适应数据大小的任何变化。
1. 这个客户发送了一份交易提案。存储提供商可以通过运行“lotus-miner storage-deals list”来查看。该交易将处于“WaitingForData”状态。
1. 存储提供程序使用 `lotus-miner storage-deals import-data <dealCid> <carFilePath>`.

:::tip
每次导入需要5 ~ 20分钟。有时候，命令看起来像已经停止了。要有耐心。
:::

1. 导入的交易将通过正常流程' Empty '→' AP '→' WaitDeal '，直到' WaitDeal '、扇区过期或被手动推送。存储提供商仍然支付发布和密封消息的费用。
1. 如果存储提供者更改了此特定交易的存储价格，那么在完成导入之后，它们必须恢复到正常价格。
1. 一旦交易完成并处于“活跃”状态，存储提供商就可以删除原始".car"文件。如果扇区没有完全密封并变为“活动”，存储提供商必须创建一个新的dealCid来重试使用相同的".car"文件。存储提供商无法重用失败的dealCid。

这只是安排离线存储交易的通用工作流。不同的存储提供程序和客户端之间的工作流可能不同。
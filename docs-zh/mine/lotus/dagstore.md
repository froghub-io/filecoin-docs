---
title: 'Lotus Miner: 关于市场的事'
description: ''
breadcrumb: '关于市场的事'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

[[TOC]]
::: warning
本指南是WIP，如果您有任何反馈，请创建一个问题!
:::
## 概念的概述

::: tip
dagstore的目标是在Lotus v1.11.2中引入。一旦确认，我们会更新文档。
:::

dagstore是一个分片存储，可以有效地保存大型IPLD图，打包为位置透明的可附加CAR文件，在理想情况下可以实现零拷贝访问。

dagstore是' lotus-miner '中_markets_子系统的一个组件。它取代了以前的獾积木仓库。它旨在提供高效率和吞吐量，并最大限度地减少交易过程中的资源利用。

dagstore利用了[CARv2](https://github.com/ipld/ipld/blob/master/specs/transport/car/carv2/index.md)的索引特性，使普通的CAR文件能够充当读写块存储。这些CAR文件作为市场和交易过程中数据交换的直接媒介，不需要中间缓冲区。

与之前dagstore的介绍相比:

* 在存储交易方面，miner不再在形成未密封的CAR之前将数据存入Badger存储。相反，当数据通过graphsync传输时，将直接构建未密封的CAR。
* 在回收交易，miner不再加载未密封的车到獾区块存储。检索直接从静止的数据(未密封的CAR)提供。
* 
DAG存储包括三层:

1. 存储层(管理分片)。
2. 索引存储库(管理索引)。
3. DAG访问层(管理查询)。

## 术语

以下是术语的定义:

- **Shard: dagstore中的数据存储单元。每个Filecoin块(交易中的数据)都是dagstore中唯一的碎片。每个分片由一个唯一的**键**标识，其值为**Piece CID**。
- **Shard state:** dagstore Shard的状态。它可以是以下情况之一:
  —“shardstatennew”:shard已经注册，但还没有初始化。
  —“ShardStateInitializing”:shard正在初始化。
  —“ShardStateAvailable”:表示该shard已经初始化，能够进行检索。然而，此时没有活跃的碎片读取器。
  —“ShardStateServing”:表示该shard有活动的reader，当前至少有一次检索服务。
  —“shardstateerror”:表示在shard操作(例如初始化或获取)过程中遇到了意外错误，因此shard需要恢复到完全可操作状态。
  —“shardstaterrecovery”:该shard正在尝试从错误状态恢复。
- **Shard initialization:**获取Shard的数据，索引它，并存储在' dagstore/index '目录下的索引的行为。
- **Shard acquisition:**获取Shard的数据，用索引连接它，并为Shard数据建立一个访问器来服务于检索。
- **Index:**一个_CID到CAR_文件偏移量的映射，与一个分片相关联。
- **Mount:** dagstore的一个关键特性是shard数据的位置透明度，并且Mount是教dagstore如何获取shard数据的组件。可以从本地路径、HTTP URL、分布式文件系统、Lotus存储子系统(正是我们在Lotus中使用的挂载类型)或其他任何地方挂载分片。
- 
## 目录结构

默认情况下，dagstore的根目录是:

- `$LOTUS_MARKETS_PATH/dagstore`, 如果你正在运行 [split miner/market deployment](./split-markets-miners.md).
- `$LOTUS_MINER_PATH/dagstore`, 如果你不是

目录结构如下:

```
 dagstore
     |___ index                         # (1)
     |___ transients                    # (2)
     |___ datastore                     # (3)
     |___ .shard-registration-complete  # (4)
```

1. “index”:保存分片索引。
2. ' transients ':保存被索引的临时碎片数据(未密封的碎片)。
3.' datastore ':记录分片状态和元数据，因此它可以重新启动。
4. ”。Shard-registration-complete ':标记文件，表示初始迁移已经完成。

## 第一次迁移

当你第一次启动你的lotus-miner或者市场节点(如果你已经使用引入dagstore的lotus(我们稍后会添加确切的版本)将它分离出来)，迁移过程将在**惰性初始化模式下注册所有的shard。当交易出现时，碎片被提取并初始化，以及时服务于检索。

通过对关键字‘migrator’进行grepping，您可以在日志输出中监控迁移的进度。下面的示例输出。注意第一行，它指定了有多少交易将被评估(这个数字包括从未在链上进行的失败交易，因此不会被迁移)，以及最后一行(表示迁移成功完成):

```
2021-08-09T22:06:35.701+0300    INFO    dagstore.migrator       dagstore/wrapper.go:286 registering shards for all active deals in sealing subsystem    {"count": 453}
2021-08-09T22:06:35.701+0300    WARN    dagstore.migrator       dagstore/wrapper.go:335 deal has nil piece CID; skipping        {"deal_id": 0}
2021-08-09T22:06:35.701+0300    INFO    dagstore.migrator       dagstore/wrapper.go:348 registering deal in dagstore with lazy init     {"deal_id": 2208881, "piece_cid": "baga6ea4seaqhnvxy55e
nveknyqhkkh7mltcrrcx35yvuxdmcbfouaafkvp6niay"}
2021-08-09T22:06:35.702+0300    INFO    dagstore.migrator       dagstore/wrapper.go:318 async shard registration completed successfully {"shard_key": "baga6ea4seaqhnvxy55enveknyqhkkh7mltcrrcx
35yvuxdmcbfouaafkvp6niay"}
[...]
2021-08-09T22:06:35.709+0300    INFO    dagstore.migrator       dagstore/wrapper.go:361 finished registering all shards {"total": 44}
[...]
2021-08-09T22:06:35.826+0300    INFO    dagstore.migrator       dagstore/wrapper.go:365 confirmed registration of all shards
2021-08-09T22:06:35.826+0300    INFO    dagstore.migrator       dagstore/wrapper.go:372 successfully marked migration as complete
2021-08-09T22:06:35.826+0300    INFO    dagstore.migrator       dagstore/wrapper.go:375 dagstore migration complete
```

## 迫使批量初始化

在不久的将来，当miner开始向网络发布索引以发布他们拥有的内容时，强制批量初始化将变得很重要，并且新的检索功能(例如自动分片路由)将变得可用。

如果可能的话，你应该现在就开始，因为如果你有很多存储交易，这个过程最好是逐步进行的，并且需要更长的时间框架。

::: warning
初始化在存储系统上放置IO工作负载。您可以在您希望/方便时停止/启动此命令，以证明截止日期接近和过去，以避免IOPS饥饿或与窗口PoSt竞争。

要停止批量初始化(参见下一段)，请按Control-C。此时正在初始化的碎片将在后台继续，但不再执行初始化。下次运行该命令时，它将从停止的地方恢复。
:::

可以使用' lotus-miner dagstore initialize-all '命令强制批量初始化。这个命令将强制初始化每个仍处于“shardstatennew”状态的shard。控制操作:
- 你必须通过`--concurrency=N`属性设置并发级别 .
- 值' 0 '将禁用节流，所有碎片将立即初始化。⚠️慎用!
- 默认情况下，只有未密封的部分将被索引，以避免强制取消密封作业。要索引密封的部分，可以使用“-include-sealed”标记。

::: tip
在我们的测试环境中，我们发现迁移以400-500分片/交易每秒的速度进行，在以下硬件规格:AMD Ryzen Threadripper 3970X, 256GB DDR4 3200 RAM，三星970 EVO 2TB SSD, RTX3080 10GB GPU。
:::

## 配置

DAG存储可以通过配置。运行_markets_子系统的节点的Toml文件。请参阅“[DAGStore]”一节。Lotus船具有健全的默认值:

```toml
[DAGStore]
  # Path to the dagstore root directory. This directory contains three
  # subdirectories, which can be symlinked to alternative locations if
  # need be:
  #  - ./transients: caches unsealed deals that have been fetched from the
  #    storage subsystem for serving retrievals.
  #  - ./indices: stores shard indices.
  #  - ./datastore: holds the KV store tracking the state of every shard
  #    known to the DAG store.
  # Default value: <LOTUS_MARKETS_PATH>/dagstore (split deployment) or
  # <LOTUS_MINER_PATH>/dagstore (monolith deployment)
  # RootDir = ""

  # The maximum amount of indexing jobs that can run simultaneously.
  # 0 means unlimited.
  # Default value: 5.
  #
  # type: int
  # MaxConcurrentIndex = 5

  # The maximum amount of unsealed deals that can be fetched simultaneously
  # from the storage subsystem. 0 means unlimited.
  # Default value: 0 (unlimited).
  #
  # type: int
  # MaxConcurrentReadyFetches = 0

  # The maximum number of simultaneous inflight API calls to the storage
  # subsystem.
  # Default value: 100.
  #
  # type: int
  # MaxConcurrencyStorageCalls = 100

  # The time between calls to periodic dagstore GC, in time.Duration string
  # representation, e.g. 1m, 5m, 1h.
  # Default value: 1 minute.
  #
  # type: Duration
  # GCInterval = "1m"
```

## 碎片自动恢复错误

分片可能由于各种原因出错，例如存储系统不能为交易/分片提供未密封的CAR服务，如果分片索引被意外删除，等等。

Lotus将自动尝试通过触发一次恢复来恢复失败的碎片。

你可以使用' lotusminer dagstore list-shards '命令查看失败的分片，也可以对' ShardStateError '进行grepping。

## CLI命令

' lotus-miner '可执行文件包含一个' dagstore '命令和几个有用的子命令:

- `lotus-miner dagstore list-shards`
- `lotus-miner dagstore initialize-shard <key>`
- `lotus-miner dagstore initialize-all --concurrency=10`
- `lotus-miner dagstore recover-shard <key>`
- `lotus-miner dagstore gc`

参考“-help”文本获取更多信息。

在[split -miner /market部署](./split-markets-miner .md)上，只要您的环境变量配置正确，这些命令就会击中markets节点。

## 建议

1. 如果可能，配置您的市场节点'storage.Json'指向与您的挖掘/密封/存储节点共享的存储路径。这将避免不必要的网络传输。
2. 尽快计划并执行[批量初始化](#强制批量初始化)。

## 故障排除

### Lotus版本回滚

如果您要从Lotus 1.11.2-dev(或更高版本)降级到1.11.1(或更低版本)，那么在降级之前，您需要确保未完成的存储协议已经达到“StorageDealAwaitingPrecommit”状态。在这个阶段，“市场”子系统将交易交给“密封”子系统。

如果在未完成的存储交易达到这个状态之前进行降级，市场进程将会恐慌。

如果你正在经历这种恐慌，你将需要恢复到你以前的版本和所有的存储交易，以达到“StorageDealAwaitingPrecommit”，然后再尝试降级。
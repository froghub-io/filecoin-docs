---
title: 'Lotus Miner: 关于市场的事'
description: ''
breadcrumb: '关于市场的事'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

[[TOC]]
::: warning
本指南是WIP，如果您有任何反馈，请创建一个issue!
:::
## 概念的概述

::: tip
dagstore的目标是在Lotus v1.11.2中引入。一旦确认，我们会更新文档。
:::

dagstore是一个分片存储，可以有效地保存大型IPLD图，打包为位置透明的可附加CAR文件，在理想情况下可以实现零拷贝访问。

dagstore 是 `lotus-miner` 中 _markets_ 子系统的一个组件。 它取代了以前的 Badger 暂存块存储。 它旨在提供高效率和吞吐量，并最大限度地减少交易操作期间的资源利用率。

dagstore 利用 [CARv2](https://github.com/ipld/ipld/blob/master/specs/transport/car/carv2/index.md) 的索引功能使普通 CAR 文件能够充当读写 块商店。 这些 CAR 文件作为市场和交易过程中数据交换的直接媒介，不需要中间缓冲区。

与引入 dagstore 之前相比：

* 在存储交易中，矿工不再在形成未封装的 CAR 之前将数据暂存到 Badger 存储中。 相反，未封装的 CAR 是在通过图形同步传输数据时直接构建的。
* 在检索交易中，矿工不再首先将未封装的 CAR 加载到 Badger 区块存储中。 直接从静止数据（未封装的 CAR）中检索。

DAG 存储包括三层：

1. 存储层(管理分片)。
2. 索引存储库(管理索引)。
3. DAG访问层(管理查询)。

## 术语

以下是术语的定义:

- **Shard：** dagstore 中数据存储的单位。每个 Filecoin 部分（交易中的数据）都是 dagstore 中的一个唯一分片。每个分片都由唯一的 **key** 标识，其值为 **Piece CID**。
- **Shard state：** dagstore 分片所处的状态。它可以是以下之一：
  - `ShardStateNew`：表示一个分片已经被注册，但是还没有被初始化。
  - `ShardStateInitializing`：表示正在初始化分片。
    - `ShardStateAvailable`：表示分片已经初始化并且能够提供检索服务。但是，此时没有活跃的分片读取器。
  - `ShardStateServing`：表示分片有活跃的读者，因此目前至少服务于一次检索。
    - `ShardStateErrored`：表示在分片操作（例如初始化或获取）期间遇到了意外错误，因此需要恢复分片才能完全正常运行。
    - `ShardStateRecovering`：表示分片正在尝试从错误状态中恢复。
- **Shard initialization：** 获取分片数据、对其进行索引并将索引存储在`dagstore/index` 目录下的行为。
- **Shard acquisition：** 获取分片数据，将其与索引连接，并为分片数据构建访问器以提供检索服务的行为。
- **Index：** _CID 到 CAR_ 文件偏移量的映射，与分片相关联。
- **Mount：** dagstore 的一个关键特性是分片数据的位置透明性，挂载是教 dagstore 如何获取分片数据的组件。分片可以从本地路径、HTTP URL、分布式文件系统、Lotus 存储子系统（正是我们在 Lotus 中使用的挂载类型）或其他任何东西挂载。

## 目录结构

默认情况下，dagstore的根目录是:

- `$LOTUS_MARKETS_PATH/dagstore`, 如果你正在运行 [ split miner/market deployment ](./split-markets-miners.md) .
- `$LOTUS_MINER_PATH/dagstore`, 如果你不是

目录结构如下:

```
 dagstore
     |___ index                         # (1)
     |___ transients                    # (2)
     |___ datastore                     # (3)
     |___ .shard-registration-complete  # (4)
```

1. `index`：保存分片索引。
2. `transients`：在它们被索引时保存临时分片数据（未封装的部分）。
3. `datastore`：记录分片状态和元数据，以便它可以在重启后继续存在。
4. `.shard-registration-complete`：表示初始迁移已完成的标记文件。

## 第一次迁移

当您第一次启动您的 lotus-miner 或市场节点时，如果您已使用引入 dagstore 的 lotus 将其拆分（我们将在稍后添加确切版本），迁移过程将在 **延迟初始化** 模式下注册所有分片。随着交易的到来，分片被及时获取和初始化以服务于检索。

您可以通过搜索关键字`migrator`来监控日志输出中的迁移进度。 这是示例输出。 请注意第一行，它指定将评估的交易数量（此数字包括从未上链的失败交易，因此不会被迁移），以及最后几行（表示迁移已成功完成）：

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

您可以使用 `lotus-miner dagstore initialize-all` 命令强制批量初始化。 此命令将强制初始化仍处于“ShardStateNew”状态的每个分片。 要控制操作：
- 您必须通过 `--concurrency=N` 标志设置并发级别。
  - 值为 0 将禁用节流，所有分片将立即初始化。 ⚠️慎用！
- 默认情况下，只有未封装的部分才会被索引以避免强制打开作业。 要索引封装件，请使用 `--include-sealed` 标志。

::: tip
在我们的测试环境中，我们发现迁移以每秒 400-500 个分片/交易的速度进行，硬件规格如下：AMD Ryzen Threadripper 3970X、256GB DDR4 3200 RAM、Samsung 970 EVO 2TB SSD、RTX3080 10GB GPU。
:::

## 配置

DAG 存储可以通过运行市场子系统的节点的 config.toml 文件进行配置。 请参阅 [DAGStore] 部分。 Lotus 附带了合理的默认值：

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

分片可能由于各种原因出错，例如存储系统不能为交易/分片提供未封装的CAR服务，如果分片索引被意外删除，等等。

Lotus将自动尝试通过触发一次恢复来恢复失败的碎片。

你可以使用`lotusminer dagstore list-shards`命令查看失败的分片，也可以对`ShardStateError`进行grepping。

## CLI命令

`lotus-miner` 可执行文件包含一个`dagstore`命令和几个有用的子命令:

- `lotus-miner dagstore list-shards`
- `lotus-miner dagstore initialize-shard <key>`
- `lotus-miner dagstore initialize-all --concurrency=10`
- `lotus-miner dagstore recover-shard <key>`
- `lotus-miner dagstore gc`

参考“-help”文本获取更多信息。

在[split -miner /market部署](./split-markets-miner.md)上，只要您的环境变量配置正确，这些命令就会击中markets节点。

## 建议

1. 如果可能，配置您的Market节点`storage.Json`指向与您的`mining/sealing/proving`节点共享的存储路径。这将避免不必要的网络传输。
2. 尽快计划并执行[批量初始化](#强制批量初始化)。

## 故障排除

### Lotus版本回滚

如果您要从 Lotus 1.11.2-dev（或更高版本）降级到 1.11.1（或更低版本），在降级之前，您需要确保未完成的存储交易已达到 `StorageDealAwaitingPrecommit` 状态。 这是 _markets_ 子系统将交易移交给 _sealing_ 子系统的阶段。

如果在未完成的存储交易达到此状态之前执行降级，_markets_ 过程将发生混乱。

如果您遇到这种异常，您将需要恢复到以前的版本和所有存储交易以达到`StorageDealAwaitingPrecommit`，然后再尝试再次降级。

---
title: 'Lotus Miner: 配置参考'
description: '本指南介绍了Lotus Miner配置文件，详细介绍了其中包含的选项的含义。'
breadcrumb: '配置参考'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

Lotus Miner 配置是在安装过程中的[初始化步骤](miner-setup.md)之后创建的，并且在定义时放置在 `~/.lotusminer/config.toml` 或 `$LOTUS_MINER_PATH/config.toml`中。

_默认配置_ 中所有项目都带有注释，因此为了自定义其中一项，需要删除`# `。

::: tip
为了使所有配置更改生效， miner 必须 [重启](miner-lifecycle.md).
:::

[[TOC]]

## API 部分

API 部分的控制设置 [Miner API](../../reference/lotus-api.md):

```toml
[API]
  # minerAPI的绑定地址
  ListenAddress = "/ip4/127.0.0.1/tcp/2345/http"
  # 这应该设置为外部看到的minerAPI地址
  RemoteListenAddress = "127.0.0.1:2345"
  # 一般网络超时值
  Timeout = "30s"
```

如上，默认情况下，侦听地址绑定到本地环回接口。如果需要打开对其他机器的 Miner API 的访问权限，则需要将其设置为要使用的网络接口的 IP 地址或`0.0.0.0` (表示“所有接口”). 请注意，即使公开，API 访问仍然受[JWT 令牌](docs-zh/build/lotus/api-tokens.md) 保护.

将`RemoteListenAddress`配置为另一个节点必须使用此值才能访问此 API。通常是 Miner 的 IP 地址和 API 端口，但是根据您的设置（代理，公共 IP 等），它可能是不同的 IP。

## Libp2p 部分

本部分配置中miner嵌入 Libp2p 节点。如[设置](miner-setup.md#与miner的连接) 中所述，使用 miner 的公共 IP 和固定端口来调整此部分非常重要：

```toml
[Libp2p]
  # libp2p主机的绑定地址。0表示随机端口。
  # 类型:多地址字符串数组
  ListenAddresses = ["/ip4/0.0.0.0/tcp/0", "/ip6/::/tcp/0"]
  # 插入您想要显式显示的任何地址
  # 在这里向其他同行宣布。否则,他们是
  # 猜到了
  # 类型:多地址字符串数组
  AnnounceAddresses = []
  # 插入任何避免在这里宣布的地址。
  # 类型:多地址字符串数组
  NoAnnounceAddresses = []
  # 连接管理器设置，如果您
  # 机器连接过多。
  ConnMgrLow = 150
  ConnMgrHigh = 180
  ConnMgrGrace = "20s"
```

如果已建立的数目超过`ConnMgrHigh`设置的值，则连接管理器将开始切断现有的连接，直到达到`ConnMgrLow`的设置值。比`ConnMgrGrace`还更小的连接将被保留。

## Pubsub 部分

本部分控制某些 Pubsub 设置。 Pubsub 用于在网络中分发消息：

```toml
[Pubsub]
  # 通常，您不会运行pubsub引导节点，因此将此设置为false
  Bootstrapper = false
  # FIXME
  RemoteTracer = ""
  # DirectPeers指定具有直接对等协议的对等体。这些同行
  # 连接到外部的网格，与所有(有效)消息无条件
  # 转发给他们。路由器将与这些对等体保持开放的连接。
  # 注意对等体协议应该与直接对等体是对等的
  # 两端对称配置。
  # 类型:多地址peerinfo字符串数组，必须包括peerid (/p2p/12D3K…)
  DirectPeers = []
```

## 交易完成部分

本节控制用于进行存储和检索交易的参数：

```toml
[Dealmaking]
  # 启用后，miner可以接受在线交易
  ConsiderOnlineStorageDeals = true
  # 启用后，miner可以接受线下交易
  ConsiderOfflineStorageDeals = true
  # 启用后，miner可以接受检索交易
  ConsiderOnlineRetrievalDeals = true
  # 启用后，miner可以接受离线检索交易
  ConsiderOfflineRetrievalDeals = true
  # 启用后，miner可以接受经过验证的交易
  ConsiderVerifiedStorageDeals = true
  # 启用后，miner可以接受未经验证的交易
  ConsiderUnverifiedStorageDeals = true
  # 交易时要拒绝的数据CID清单
  PieceCidBlocklist = []
  # 最大的预期时间将使交易进入一个封闭的领域将需要
  # 这包括交易转移和公布所需的时间
  # before being assigned to a sector
  # 在被分配到某个区域之前
  ExpectedSealDuration = "24h0m0s"
  # 当一笔交易准备发布时，等待的时间就更多了
  # 交易要准备好发布之前，所有作为一批发布
  PublishMsgPeriod = "1h0m0s"
  # 最大数量的交易包括在一个单一的发布交易消息
  MaxDealsPerPublishMsg = 8

  # 用于对存储交易进行细粒度评估的命令(见下面)
  Filter = "/absolute/path/to/storage_filter_program"

  # 用于对检索交易进行细粒度评估的命令(见下面)
  RetrievalFilter = "/absolute/path/to/retrieval_filter_program"
```

`ExpectedSealDuration` 是对封装所需时间的估计，用于拒绝开始时间可能早于封装预期完成的交易。可以通过 [基准测试](benchmarks.md) 或 [扇区保护](sector-pledging.md).

::: warning
`ExpectedSealDuration`的最终值应等于`(TIME_TO_SEAL_A_SECTOR + WaitDealsDelay) * 1.5`。该等式确保了 miner 不会致力于将扇区封装得太早。
:::

### 在一条信息中发布多个交易

`PublishStorageDeals` 消息可以在一条消息中发布许多交易。 
当一个交易准备好要发布时，lotus 会等待到 `PublishMsgPeriod` 。
在发送 `PublishStorageDeals` 信息之前，等待其他交易准备就绪。

但是一旦 `MaxDealsPerPublishMsg` 准备好了，lotus 就会立即发布所有的交易。

例如，如果`PublishMsgPeriod`是1小时：

- 下午1:00，交易1 已经准备好发布。
  Lotus 会等到下午2:00其他交易准备好后再发送`PublishStorageDeals`。
- 下午1:30，交易2 准备发布。
- 下午1:45，交易3 可以发布了。
- 下午2:00，lotus 在一条 `PublishStorageDeals` 消息中发布交易 1、2和3。

如果 `MaxDealsPerPublishMsg` 为2，那么在上面的例子中，当 交易2 准备在1:30发布时。
lotus 会立即在一条 `PublishStorageDeals` 消息中发布 交易1 和 交易2 。
交易3 将在随后的 `PublishStorageDeals` 消息中发布。

> 注意：如果 "PublishStorageDeals "中的任何一笔交易在执行时未能通过验证，即：开始时间已经过去，所有的交易将无法发布。

## 使用过滤器进行细粒度存储和检索交易接受金

您的用例可能需要对交易参数的组合进行非常精确和动态的控制。

Lotus 提供了两个 IPC 钩子，允许您在miner接受每个交易之前指定一个命令来执行:

- `Filter` 用于存储交易.
- `RetrievalFilter` 用于检索交易.

被执行的命令在标准输入时接收到 deal 参数的 JSON 表示，完成后它的退出代码被解释为:

- `0`: 成功，继续交易。
- `non-0`: 失败，拒绝交易。

拒绝任何检索交易的最基础的过滤器是这样的:
`RetrievalFilter = "/bin/false"`. `/bin/false`立即退出的二进制代码是`1`.

[这个 Perl 脚本](https://gist.github.com/ribasushi/53b7383aeb6e6f9b030210f4d64351d5/9bd6e898f94d20b50e7c7586dc8b8f3a45dab07c#file-dealfilter-pl)让miner拒绝特定的客户端，只接受设置为相对较快开始的交易。

您也可以使用第三方内容策略框架，如 Murmuration Labs 的 `bitscreen` :

```sh
# grab filter program
go get -u -v github.com/Murmuration-Labs/bitscreen

# add it to both filters
Filter = "/path/to/go/bin/bitscreen"
RetrievalFilter = "/path/to/go/bin/bitscreen"
```

## 封装扇区

本节围绕控制封装扇区的一些行为：

```toml
[Sealing]
  # 在任何给定的时间内，有多少个扇区可以等待更多的交易加入。
  # 如果miner同时接受多个交易，最多将创建MaxWaitDealsSectors的新扇区。
  # 如果超过MaxWaitDealsSectors交易被并行接受，只有MaxWaitDealsSectors交易将被并行处理
  # 注意，与处理吞入率相关的设置过高可能会导致扇区包装效率较差
  MaxWaitDealsSectors = 2
  # 当创建新的CC扇区时，可以同时密封多少扇区的上限(0 =无限)
  MaxSealingSectors = 0
  # 当创建有交易的新扇区时，可以同时密封多少扇区的上限(0 =无限)
  MaxSealingSectorsForDeals = 0
  # CommittedCapacitySectorLifetime 是承诺容量(CC)扇区的持续时间
  # 在此之前，它必须扩展或转换为包含行业的交易
  # 终止。值必须在180-540天(包括)之间
  #
  # type: Duration
  CommittedCapacitySectorLifetime = "12960h0m0s"
  
  # 一个新成立的行业在开始结业之前需要等待更多交易的一段时间。
  # 完全填满的扇区将立即开始密封
  WaitDealsDelay = "6h0m0s"
  # 是否保留未密封的交易数据副本，不管客户是否要求。这让miner
  # 避免稍后解密数据的较高成本，以更多的存储空间为代价
  AlwaysKeepUnsealedCopy = true
  # 在向链提交扇区证明之前运行扇区终结
  FinalizeEarly = false
  # 是否使用可用的miner余额作为行业抵押品，而不是随消息一起发送
  CollateralFromMinerBalance = false
  # 在发送消息之前，最小可用余额保持在miner actor中
  AvailableBalanceBuffer = 0
  # 即使miner角色中没有可用的余额，也不要在消息中发送抵押品
  DisableCollateralFallback = false
  # 启用/禁用预提交批处理(在nv13之后生效)
  BatchPreCommits = true
  # 最大预提交批大小最多256个扇区-批将立即发送超过这个大小
  MaxPreCommitBatch = 256
  # 超过最小批数后，需要等待多久才能提交批
  PreCommitBatchWait = "24h0m0s"
  # 在扇区/批处理开始过期之前，强制批处理提交的时间缓冲区
  PreCommitBatchSlack = "3h0m0s"

  # 启用/禁用提交聚合(在nv13之后生效)
  AggregateCommits = true
  # 最小批处理提交大小，不小于4
  MinCommitBatch = 4
  # 最大批处理提交大小高达819个扇区-批量将立即发送超过这个大小
  MaxCommitBatch = 819
  # 超过最小批数后，需要等待多久才能提交批
  CommitBatchWait = "24h0m0s"
  # 强制批处理提交的时间缓冲，在批处理中的扇区/交易开始过期之前
  CommitBatchSlack = "1h0m0s"

  # 在它下面停止做提交聚合，而不是单独向链提交证明
  AggregateAboveBaseFee = 0.00000000015 #0.15nano
  

  TerminateBatchMax = 100
  TerminateBatchMin = 1
  TerminateBatchWait = "5m0s"

```

## 储存部分

储存扇区控制 miner 是否可以执行某些封装行动。根据设置和其他[seal workers](seal-workers.md) 的使用，您可能需要修改某些选项。

```toml
[Storage]
  # 同时可以获取多少个扇区数据的上限
  ParallelFetchLimit = 10
  # 封印步骤，miner可以自己进行。有时候我们有专门的封号工来做，不希望miner为此投入任何资源
  AllowPreCommit1 = true
  AllowPreCommit2 = true
  AllowCommit = true
  AllowUnseal = true
```

### PreCommitSectorsBatch

`PreCommitSectorsBatch` 引入的 [FIP-0008 ](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0008.md) 支持miner再次预提交多个扇区。

在lotus v1.10.0和up版本中，如果' BatchPreCommit '设置为false，一旦它们准备好了，预承诺将通过' PreCommitSector '消息发送到链。如果' BatchPreCommit '设置为true, lotus将批处理预承诺，直到' MaxPreCommitBatch '， ' PreCommitBatchWait '或' PreCommitBatchSlack '中的任何一个被命中:
- ' MaxPreCommitBatch '是在一个' PreCommitSectorsBatch '消息中批处理的扇区预承诺的最大数量。根据FIP-0008，这个值最大为256。
- ' PreCommitBatchWait '是在提交当前批处理之前等待多长时间。注:预承诺票的过期时间约为**31.5小时**，一个扇区的预承诺票过期将导致整个消息失败。因此，**我们建议miner将此值设置为低于30小时
- ' PreCommitBatchSlack '是一个时间缓冲区，用来在任何部门的预提交票据或交易到期之前强制提交当前批。例如，如果这个值被设置为1小时，即120个epoch，那么一个' PreCommitSectorsBatch '消息将在该批中precommits' tickets和deal' start epoch中最早的epoch之前的120个epoch被提交。**我们建议您设置一个较长的松弛，以防止由于过期而导致的消息失败
> Note, the current batch will be sent if any of `MaxPreCommitBatch`, `PreCommitBatchWait` or `PreCommitBatchSlack` is hit.

要检查批处理队列中预承诺的扇区列表，请执行:

```
./lotus-miner sectors batching precommit
```

输出是扇区ID：

```
$ ./lotus-miner sectors batching precommit
14
15
16
```

要忽略配置并强制推送当前批次，请运行。

```
./lotus-miner sectors batching precommit --publish-now=true
```

然后在输出中，信息CID的 `PreCommitSectorsBatch` 信息，并列出正在提交的各部门的预先承诺的部门编号。

```
$ ./lotus-miner sectors batching precommit --publish-now=true
Batch 0:
	Message: bafy2bzacecgihnlvbsqu7yksco3vs5tzk3ublbcnkedlofr6nhbq55k5ye3ci
	Sectors:
		14	OK
		15	OK
		16	OK
```

### ProveCommitAggregate

`ProveCommitAggregate` 介绍的 [FIP-0013](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0013.md) 支持miner在1的时候证明-承诺一些部门。

在Lotus v1.10.0及以上版本中，如果`AggregateCommits`被设置为false，证明承诺一旦准备好，将通过`ProveCommitSector`消息被发送到链上。如果 "AggregateCommits "设置为true，lotus将聚合和批处理预承诺，直到 "MaxCommitBatch"、"CommitBatchWait "或 "CommitBatchSlack "中的任何一个被击中。
- `MaxCommitBatch'是在一个`ProveCommitAggregate'消息中批处理的部门证明承诺的最大数量。根据FIP-0013，这个值最多为819。
- `CommitBatchWait'是在越过`MinCommitBatch'后，在提交当前批次前**等待的时间。注意：证明承诺必须在预承诺登陆链后30天内**提交。建议将此值设置为低于30天，以防止抵押品损失。
- `CommitBatchSlack`是在任何部门的预先承诺或交易过期之前，强行提交当前批次的时间缓冲。例如，如果这个值设置为1小时，也就是120个纪元，那么在本批预承诺到期和交易开始纪元中最早的纪元前120个纪元，将为现有批次提交一个`证明承诺Aggregate'消息。**我们建议你设置一个较长的松弛时间，以防止由于交易到期或抵押品损失而导致消息失败**。
- `AggregateAboveBaseFee`是开始聚合证明的网络基础费用。当网络基础费用低于此值时，证明承诺将通过`ProveCommitSector`单独提交。**根据FIP-0013中引入的[Batch Incentive Alignment](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0013.md#batch-incentive-alignment)，我们建议你将此值设置为0.15 nanoFIL，以避免在燃烧中出现意外的聚合费用。**

`MinCommitBatch'是在一个`ProveCommitAggregate'消息中被分批的最小扇区证明承诺量。根据FIP-0013，该值不能小于4，这是证明-承诺集合在单一证明-承诺gas成本上获胜的交叉点。如果 "MaxCommitBatch"、"CommitBatchWait "或 "CommitBatchSlack "中的任何一个被证明承诺量击中，则该批中的证明承诺将通过 "ProveCommitSector "单独进行。

> 注:聚合证明将产生一个折扣的gas费用，所以总的来说，它将比链上相同数量的证明更少的gas使用量，但最低费用将适用。 将更多的证明聚合到一个聚合消息中是更便宜的，这意味着聚合1000个证明比聚合10个扇区更有益。 因此，如果一个miner想板载更多的存储，建议将更多的证明聚合到一个单一的消息。  

要检查批处理队列中证明承诺的扇区列表，请运行:

```
./lotus-miner sectors batching commit
```

输出扇区id：

```
$ ./lotus-miner sectors batching commit
10
11
12
13
14
15
16
17
```

要忽略配置并强制推送当前批处理，执行命令:

```
./lotus-miner sectors batching commit --publish-now=true
```

然后在输出中列出了“ProveCommitAggregate”消息的消息CID和正在提交的扇区证明承诺的扇区号:

```
$ ./lotus-miner sectors batching commit --publish-now=true
Batch 0:
	Message: bafy2bzacedtmykgf5g4evdvapacpmo4l32ewu5l7yxqkzjh3h6fhev7v7qoys
	Sectors:
		15	OK
		17	OK
		12	OK
		10	OK
		11	OK
		13	OK
		16	OK
		14	OK
```

如果队列中的扇区小于' MinCommitBatch '，则会为每个扇区发送单独的' ProveCommitSector '消息:

```
Batch 0:
	Message: bafy2bzacedpwysxdsg2ft3hfbwn6ayyaanivfwkx4inav3zm34hwmmwgsljkk
	Sectors:
		18	OK
Batch 1:
	Message: bafy2bzacedrx7l34ckaue7hm2ubousl3djuigyu2xw4xzywgkhttxecsm5ba2
	Sectors:
		19	OK
```

### CommittedCapacitySectorLifetime

可用的单位有:

```
"ms": int64(毫秒),  
 "s":  int64(秒),  
 "m":  int64(分钟),   
 "h":  int64(小时),
```

例如，如果您想将扇区生命周期设置为180天，则可以将180天乘以每天24小时得到4320小时，并将此值设置为 `"4320h0m0s"`.

## 存储部分

存储区控制miner是否可以执行某些密封操作。根据设置和使用的附加 [seal workers](seal-workers.md), 您可能需要修改一些选项.

```toml
[Storage]
  # Upper bound on how many sectors can be fetched in parallel by the storage system at a time
  ParallelFetchLimit = 10
  # Sealing steps that the miner can perform itself. Sometimes we have a dedicated seal worker to do them and do not want the miner to commit any resources for this.
  AllowAddPiece = true
  AllowPreCommit1 = true
  AllowPreCommit2 = true
  AllowCommit = true
  AllowUnseal = true
```

## 费用部分

费用部分允许为miner提交给链的不同消息设置gas消耗的限制:

```toml
[Fees]
  # 最高缴费金额
  MaxPreCommitGasFee = "0.025 FIL"
  MaxCommitGasFee = "0.05 FIL"
  MaxTerminateGasFee = "0.5 FIL"
  # 这是一个高价值的操作，所以违约费用更高。
  MaxWindowPoStGasFee = "5 FIL"
  MaxPublishDealsFee = "0.05 FIL"
  MaxMarketBalanceAddFee = "0.007 FIL"
  [Fees.MaxPreCommitBatchGasFee]
      Base = "0 FIL"
      PerSector = "0.02 FIL"
  [Fees.MaxCommitBatchGasFee]
      Base = "0 FIL"
      PerSector = "0.03 FIL" 

```

由于网络拥塞，消息的基本费用可能增加或减少。你的汽油限额将必须大于基本费用的信息被包括在内。然而，当基本费用非常高时，一个非常大的最大费用可能导致资金的快速燃烧，因为miner在正常操作期间自动提交消息，所以要小心。即使实际费用远低于设定的最大费用，也必须有比设定的最大费用更多的可用资金。

在“MaxPreCommitBatchGasFee.PerSector”/“MaxCommitBatchGasFee”中设置您愿意为每个**行业支付的最大费用。以避免意外的高成本。

> 注: 当前的' MaxCommitBatchGasFee。PerSector '足以聚合6个扇区的证明。请根据实际操作分别进行调整。**如果值过低，消息可能会在内存池中等待很长时间。如果你没有足够的资金，信息将不会发送
>
## 地址部分

地址部分允许用户指定发送消息的其他地址。这有助于在网络费用高的情况下缓解重要消息的头部阻塞。更多详细信息请参见[Miner addresses](Miner -addresses.md)部分。

```toml
[Addresses]
  # 发送PreCommit消息的地址
  PreCommitControl = []
  # 发送Commit消息的地址
  CommitControl = []
  # 发送终止扇区消息的地址
  TerminateControl = []
  # 发送PublishStorageDeals的地址
  DealPublishControl = []
  # 禁止对自动发送的消息使用所有者地址。
  # 当所有者地址是离线/硬件密钥时，这很有用
  DisableOwnerFallback = false
  # 对可能使用其他控制地址的消息禁用工作人员地址
  DisableWorkerFallback = false
```
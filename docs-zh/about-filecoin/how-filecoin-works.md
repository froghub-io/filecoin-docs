---
title: 如何使用Filecoin
description: An overview of how the Filecoin network operates - binding clients and miners through storage and retrieval deals.
---

# 如何使用 Filecoin

本页介绍了 Filecoin 网络的基本运作方式。虽然 Filecoin 类似于其他加密货币，但是希望在网络上构建的开发人员应该注意到一些差异。

## 网络

Filecoin 网络是由不同组件方式的 Filecoin 节点组成的一个分布式对等网络。

节点通过安全通道进行通信，它们利用安全通道向网络分发信息(传播信息) ，在彼此之间传输数据，并发现其他节点，维持一个良好的连接群，即使有成千上万的节点参与，类似块与消息的信息也能快速传输。

## Filecoin 节点

_Filecoin 节点_ 或 _Filecoin 客户端_ 是同步 Filecoin 区块链并验证每个块中的消息的对等点，一旦应用，就会提供全局状态。节点可以管理 [Filecoin 钱包](..get-startedlotussend-and-receive-fil.md) 并在其上接收 FIL。
Filecoin 节点还可以通过广播向网络发布不同类型的消息。例如，客户端可以发布消息，将 FIL 从一个地址发送到另一个地址。节点可以向 Filecoin miner提出[存储和检索协议](#交易)，并在协议执行后为其支付费用。
运行一个 Filecoin 节点是一项低级任务，通常意味着要让程序每周 7 天、每天 24 小时运行。目前有几种 Filecoin 节点实施方案正在开发中，其中[Lotus](../store/lotus/README.md)是最先进的。

## Filecoin miner

这些miner通过执行不同类型的[交易](#交易)，并在链条上添加新块(每 30 秒添加一次) ，为铁路网络提供服务，他们因此获得 FIL 奖励。从miner的角度来看，关于miner类型、奖励和交易执行的更多细节可以在[如何开采](../mine/how-mining-works.md)的部分找到。
运行 Filecoin 采矿器是一项技术含量很高的任务，对硬件有着很高的要求来完成必要的证明。Lotusminer 是到目前为止 Filecoin 采矿器的首选方案。

## 交易

Filecoin 中有两种主要的交易类型: 存储交易和检索交易。

存储协议是客户和存储miner之间的协议，用于在网络中存储一些数据。一旦交易开始，miner收到了要存储的数据，它将反复向供应链[证明](#证明)它一直按照协议存储数据，以便能够收取[奖励](../mine/mining-rewards.md)。如果不能做到，miner的 FIL 将被[惩罚](../mine/slashing.md)或失去。

检索协议是客户和检索挖掘者(或许是亦或许不是存储挖掘者)之间的协议，用于提取存储在网络中的数据(力求以快速和可靠的方式)。与存储交易不同的是，这些交易是通过支付渠道为接收到的数据进行递增支付的环节来完成的。

## 证明

正如上面提到的，存储miner必须证明他们正在按照交易条款存储数据。这意味着:

- 他们必须存储客户机提交的所有数据
- 他们必须在整个交易期间储存它

密码学用于证实这些目的，正如本文中关于 [Filecoin 验证系统](https://filecoin.io/blog/filecoin-proof-system/) 的阐述。

通过使用 _Proof Of Replication (PoRep)_ ，开采者证明他们已经接收了所有的数据，并且他们使用物理存储对其进行了唯一的编码，其他开采者无法复制(因此对于相同数据的两个协议不能存储与同一个物理磁盘)。这份证明需要在交易开始时给出，并封装操作完成。

一旦交易处于活跃状态并在其整个生命周期内，miner将使用_时空证明 (PoSt)_ 来证明它_仍在_存储与交易相关的数据。对于 PoSt，随机miner需要证明他们存储的数据的随机部分仍然存在。

Filecoin 的客户和其他miner不断验证包含在每个块的证据是否有效，提供必要的安全措施及对miner不履行交易的惩罚。

## Gas 费用

执行消息，例如在链中包含事务或证明，会消耗网络上的计算和存储资源。_Gas_ 是消息消耗的资源的度量。消息消耗的 gas 直接影响发送方为将消息包含到miner的新块中而支付的成本。

历史上，在其他区块链中，miner以本地货币单位指定 gas 费用，然后根据消息消耗的 gas 费用向区块生成miner支付优先费。Filecoin 的工作方式与此类似，只是需要消耗一定数量的费用(发送到一个不可恢复的地址)来补偿网络资源的支出，因为所有节点都需要验证消息。这个想法是基于以太坊的[EIP1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md)。

Filecoin 网络中消耗的费用由动态的 **BaseFee** 给出，它会根据网络拥堵参数(块大小)自动调整。当前值可以从[block explorer](../get-started/explore-the-network.md)或[inspect The current head](../mine/lotus/message-pool.md)中获得。

此外，许多与 gas 相关的参数被附加到每条消息上，并决定miner获得的奖励数量。以下是术语和概念的概述:

- **_GasUsage_**:消息执行实际消耗的 gas 量。目前的协议不知道一条消息在执行前会消耗多少 gas，但可以估算(参见[prices](https://github.com/filecoin-project/lotus/blob/d678fe4bfa5b4c70bcebd46cdc38aafc452b42d1/chain/vm/gas.go#L87))。以gas为单位的gas消耗量。
- **_BaseFee_**:指执行每一个消息所 _消耗的每单位的 gas_ 即燃烧的 FIL 的数量。它是以 attoFIL/Gas 为单位测量的。
- **_GasLimit_**:消息执行可以消耗的 gas 数量的限制，由消息发送方估计和指定。它是以 gas 为单位来测量的。块中包含的所有消息的 *GasLimit*的和不能超过 _BlockGasLimit_。如果没有 _Gas_，则消息将无法执行，并且执行的任何效果都将被还原。
- **_GasFeeCap_**:发送方为了在块中包含消息而愿意为每个 Gas 单位支付的最大 token 数量。它是以 attoFIL/Gas 为单位测量的。消息发送者在发送消息时必须有 _GasFeeCap \* GasLimit_ 的最小余额，即便不是所有余额都会被消耗。gas 费可以作为一种保护措施，防止意外的高额 _BaseFee_ 波动。
- **_GasPremium_**:支付给区块生产miner的优先费用。这是由 _GasFeeCap_ 封顶的。_BaseFee_ 具有更高的优先级。它以 attoFIL/Gas 为单位测量，可低至 1 attoFIL/Gas。
- **_Overestimation burn_**:当 _GasLimit_ 和 _GasUsage_ 之间的差值很大时，额外增加的 gas 量。参阅[当前实现](https://github.com/filecoin-project/lotus/blob/v0.10.0/chain/vm/burn.go#L38))。

发送者的发送一条消息的总费用为:

- _GasUsage \* BaseFee_ FIL (消耗掉) **+**
- _GasLimit \* GasPremium_ FIL (miner 的回报) **+**
- _OverEstimationBurn \* BaseFee_ FIL

一个重要的细节是，无论使用了多少 _GasFeeCap_，消息总是会支付 _burn fee_。因此，低的 _GasFeeCap_ 可能导致 _GasPremium_ 减少，甚至是负的gas费!在这种情况下，包含消息的miner将不得不自掏腰包支付所需金额，这意味着他们不太可能在新的区块中包含此类消息。

Filecoin 实现可能会选择他们的miner如何选择消息以包含在新块中，但他们通常会[尝试最大化miner的奖励](../mine/lotus/message-pool.md)。

## Actors

Actor 是一种用于管理状态的 [软件设计模式](https:en.wikipedia.orgwikiActor_model)。帐户、多重签名、miner以及任何具有状态的东西，例如帐户余额，都作为 _actor_ 实现。

Actors 相当于以太坊虚拟机中的智能合约的 Filecoin。因此，Actor 是系统的核心组件。 Filecoin 区块链当前状态的任何更改都必须通过 Actor 触发。

参见：[https:spec.filecoin.iosection-systems.filecoin_vm](https:spec.filecoin.iosection-systems.filecoin_vm)

## 地址

在 Filecoin 中，地址用于识别参与者。有4种地址类型：

- `0` - ID地址
- `1` - SECP256K1 公钥地址
- `2` - Actor 地址
- `3` - BLS 公钥地址

### ID 地址 - `f0`

所有actor都有一个ID，例如“99”，这是一个在创建actor时由InitActor分配给它的短整数。 _ID 地址_是带有网络前缀的参与者 ID（主网为“f”），ID 的地址类型为“0”。

例如，主网上的 [Burn Account](https:filfox.infoenaddressf099) actor 的 ID 为“99”，ID 地址为“f099”。

### 公钥地址 - `f1` and `f3`

由用户直接管理的参与者（如帐户）是从公私密钥对派生的。如果您有权访问私钥，则可以对该参与者发送的消息进行签名。公钥用于为参与者派生地址。

例如，【火币热钱包】(https:filfox.infoenaddressf1abjxfbp274xpdqcpuaykwkfb43omjotacm2p3za)有secp256k1公钥地址`f1abjxfbp274xpdqcpuaykwkfb43omza9f33235320000的公钥地址。两个地址标识相同的帐户参与者。发送到任一地址的消息将应用于同一个帐户。

公钥地址允许 Ledger 等设备仅从公钥中为您的帐户派生有效的 Filecoin 地址。它不需要询问远程节点您的 ID 地址是什么。

Filecoin 支持以“f1”开头的 secp256k1 地址和以“f3”开头的 BLS 地址。

### 健壮地址和ID地址

公钥地址被称为“健壮地址”，因为它们不依赖于文件币链状态。

Actor ID 由 InitActor 在链上定义。如果将相同的 ID 分配给不同分支上的不同演员，则演员 ID 在其创建后的短时间内可能会发生变化。您可以将 ID 地址视为关系数据库中单调递增的数字主键。在 SQL 术语中发生链重组或回滚时，您最终可能会为不同的行引用相同的 ID。 [预期共识](https:spec.filecoin.iosection-algorithms.expected_consensus) 算法将解决冲突，一旦定义新 ID 的状态足够老（共识术语中_达到最终性_），就不会发生任何变化； ID 永远绑定到那个演员。

健壮的地址提供了一种在链状态最终确定之前引用参与者的安全方法。 ID 地址被用作一种节省空间的方式来识别文件币链状态中的参与者，其中每个字节都很重要，并且是一种人性化的简洁形式。

### 参与者地址 `f2`

参与者地址提供了一种为与公钥无关的参与者创建健壮地址的方法。它们本质上是帐户创建输出的随机 sha256 哈希值。 [ZH 存储miner](https:filfox.infoenaddressf01248) 具有 Actor 地址 `f2plku564ddywnmb5b2ky7dhk4mb6uacsxuuev3pi` 和 ID 地址 `f01248`。

### BLS 曲线 `f3`
除了 secp256k1 `f1` 地址，Filecoin 中的 BLS 地址以 `f3` 开头。 Filecoin 对 BLS 签名使用曲线 bls12-381。 Bls12-381 是一对两条相关的曲线：G1 和 G2。 bls12-381 的实现可以根据公钥是否在 G1 上而签名在 G2 上而有所不同，反之亦然。

Filecoin 使用 G1 作为公钥，使用 G2 作为签名，因为 G1 允许公钥的较小表示。这与 ETH2 的设计决策相同，但与 Zcash 形成对比，Zcash 在 G1 上有签名，在 G2 上有公钥。

另请注意，Filecoin 以小端顺序存储和解释私钥。这与 ETH2 密钥形成对比，后者也使用 bls12-381 但以大端顺序存储。

## 附加材料

Filecoin 构建在[成熟的项目](../project/related-projects.md) 之上，比如 libp2p (网络、地址、消息分发)、 IPLD (数据格式、编码和内容寻址数据结构)、 IPFS (数据传输)和 multiformats (未来可证明的数据类型)。

以下是一些有用的介绍 Filecoin 技术的链接，以及 Filecoin 本身的介绍:

- IPFS:

  - [IPFS IPFS 入门指南](https://hackernoon.com/a-beginners-guide-to-ipfs-20673fedd3f)
  - [IPFS 概念](https://docs.ipfs.io/concepts/)
  - [ProtoSchool tutorials](https://proto.school/#/tutorials)

- libp2p:

  - [为什么使用 libp2p?](https://www.parity.io/why-libp2p/)
  - [libp2p: 一个模块化的 p2p 网络栈](https://www.youtube.com/watch?v=xqVmEzsin3Y)

- Filecoin:
  - [介绍 Filecoin，一个分散存储网络](https://www.youtube.com/watch?v=EClPAFPeXIQ)
  - [Filecoin primer](https://ipfs.io/ipfs/QmWimYyZHzChb35EYojGduWHBdhf9SD5NHqf8MjZ4n3Qrr/Filecoin-Primer.7-25.pdf)
  - [建立 Filecoin 生态系统](https://youtu.be/SXlTBvcqzz8)
  - [Filecoin 特征: gas 费用](https://filecoin.io/blog/filecoin-features-gas-fees/)

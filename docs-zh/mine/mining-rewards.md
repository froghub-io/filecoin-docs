---
title: '挖矿奖励'
description: '在Filecoin中，Miner通过为网络做出贡献来获得不同类型的奖励。'
breadcrumb: '挖矿奖励'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

他们付出的努力主要有两种奖励类型：仓储费和集体奖励。

## 仓储费

_PoSt (Proof-of-Spacetime)_ 在网络上每隔 24 小时执行一次窗口检查，以确保 Miner 继续正常托管其所需扇区。相应地，每个存储 Miner 的保证扇区集都被划分为子集，每个窗口一个子集。在给定的窗口内，每个存储 Miner 必须为各自子集中的每个部门提交 PoSt。每天，Miner 处于非活动状态，它将获得[故障处理费](slashing.md).

**仓储费** 是达成交易后客户定期支付的费用，以换取存储数据。这些费用会随着时间的推移继续执行其职责，并自动存入 Miner 的关联提款钱包，并在收到后短暂锁定。

## 块奖励 (Block rewards)

**块奖励** 是给采矿者的一笔大笔款项，用于计入新区块。与仓储费不同，这些奖励不是来自关联的客户；相反，该网络“印制”了新的 FIL，既是通货膨胀措施，也是激励 Miner 推进链条的一种激励措施。网络上所有活跃的 Miner 都有机会获得块奖励，他们的机会与当前为网络贡献的存储空间量成正比。

赢得开采新区块的权利的机制称为 _WinningPoSt_. 在 Filecoin 网络中, 时间被离散为一系列时期-区块链的高度与经过的时期数相对应。 在每个时期的开始，都会选择少量的存储 Miner 来挖出新的区块。除了区块奖励之外，每个 Miner 还可以收取与区块中包含的每个消息相关的费用。

每个技巧集上的块数基于 λ = 5 的随机变量的 Poisson 分布。 Miner 的实现可以使用几种策略来选择在每个块中包括哪些消息，以最大程度地减少重叠。只有每个消息的“首次执行”将收取相关的费用，并且按照与该块关联的 VRF（可验证随机函数）票证的哈希值对执行进行排序。

## 已验证客户

为了通过简单的容量承诺进一步激励“有用”数据的存储，存储 Miner 有额外的机会竞争已验证客户提供的特殊交易。此类客户在提供涉及存储有意义数据的交易意图方面获得了认证，并且存储 Miner 为这些交易赚取的权力会乘以乘数。在考虑了此乘数之后，给定存储 Miner 拥有的权力总量称为**质量调整权力**.

## 检索费

在完成检索交易时（通过将部分数据发送到客户端），使用 _payment channels_ 逐步支付检索费用。这发生在链下。
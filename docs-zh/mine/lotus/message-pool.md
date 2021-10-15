---
title: 'Lotus Miner: 消息池'
description: '消息池（mpool）是Lotus的组件，用于处理待处理的消息以包含在链中。'
breadcrumb: '消息池'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }} 将消息直接添加到本地发布的消息或通过 pubsub 传播添加到 mpool。每当 miner 准备为技巧集创建一个块时，它都会调用 mpool 选择算法，该算法选择一组适当的消息，从而优化 miner 的奖励和连锁能力。

执行消息时, 他们使用 _Gas_。 使用大量的 _Gas_, 每个消息附带的参数以及网络当前的 _BaseFee_ 决定了最终的 FIL 成本，以将交易包括在链中。部分成本由网络消耗。 另一部分提供给第一个区块的 miner，其中包括交易作为奖励。

下面将解释消息的不同上限和费用，以及如何检查消息池并与之交互的说明。

::: tip
Lotus 提供了使用 `lotus mpool` 子命令与消息池进行交互的工具。
:::

[[TOC]]

## 消息选择

挖掘新区块时，miner 必须选择一组消息以最大程度地获得奖励。考虑到使用 pubsub 进行消息分发的工作方式，并且 miner 之间不会相互传递票证，因此无法完全确定其他 miner 是否还将消息也包含在新tipset中的其他块中，如果他们的区块先执行，也许可以获得奖励。 这种问题叫 NP-hard (背包包装的一种情况), 因此充其量只能在合理的时间内对最佳选择进行近似估算。

鉴于 miner 的票证质量，Lotus 采用了一种复杂的算法来从池中选择要包含的消息。票证质量反映了tipset中某个区块的执行顺序的概率。 给定票证质量，该算法将计算每个区块的概率，并选择相关的消息链，以使奖励最大化，同时还优化链的容量。

如果票证质量足够高，则使用贪婪选择算法代替，该算法只选择最大奖励的相关链。请注意，始终选择来自优先级地址的待处理消息链，无论其盈利能力如何。

## Gas，费用，限额和上限

当执行一条消息时，它消耗了 Gas。 一条消息消耗的总 Gas 体量直接影响将该消息放置在区块链中的成本，这是发送方必须支付的价格。

::: tip
可以为 Lotus 配置多个地址，以根据操作对费用和限制进行更精细的控制，并避免行首阻塞，特别是对于 _WindowPoSts_ 这样的高价值操作。参考 [miner 地址指南](miner-addresses.md).
:::

[Filecoin 是如何运行的页面](../../about-filecoin/how-filecoin-works.md)详细解释了 gas 的使用和费用。作为额外的提示，您可以使用 Lotus 来了解当前的 _BaseFee_:

```sh
# Will print the last BaseFee in attoFIL
lotus chain head | xargs lotus chain getblock | jq -r .ParentBaseFee
```

## 查看待处理消息

如果 miner 认为消息不够吸引人，无法包含在新块中，则它们可能会卡在消息池中。这通常是由于 _GasFeeCap_ 太低而导致的，例如，当网络的 _BaseFee_ 很高时。 如果网络拥塞，也可能是 _GasPremium_ 太低的结果。

您可以使用以下方法检查池中当前是否有消息，以及由节点专门发送的消息：

```sh
lotus mpool pending --local
```

对于每条消息，您将能够看到诸如 _GasLimit_, _GasFeeCap_ 和 _GasPremium_ 值之类的关键信息, 如上所述。

为了减少输出到消息键值，你可以使用：

```sh
lotus mpool pending --local | grep "Nonce" -A5
```

为了避免消息发送时在池中停留时间过长，可以调整[配置中的Lotus Miner费用](miner-configuration.md)，并使用 [ _WindowPoSts_ 的附加控制地址](miner-addresses.md)。现有的信息可以随时用下面解释的程序替换。

## 更新池中的消息

您可以通过推送具有相同 Nonce 的新消息来替换池中的消息，**该 Nonce 具有新的 GasPremium，该 GasPremium 至少比原始消息大 25％** 。为此，最简单的方法是使用：

```sh
lotus mpool replace --auto <from> <nonce>
```

上面的命令将替换池中的相关消息，并根据当前网络条件的估计，自动使用新的 _GasPremium_ 和 _GasFeeCap_ 重新定价。你也可以设置' -fee-limit '，如果你希望限制总金额的消费信息。所有其他标志都被忽略。

::: warning
`--fee-limit` 使用带有小数支持的FIL单位，然而 `--max-fee` 使用 `attoFIL`.
:::

或者，_GasPremium_， _GasFeeCap_ 可以用它们各自的标志手动设置:

```sh
lotus mpool replace --gas-feecap <feecap> --gas-premium <premium> <from> <nonce>
```

如果新的 _gas premium_ 低于原始比率的 1.25，则该消息将不包含在池中。直接使用 [`MpoolPush` API method](../../reference/lotus-api.md) 方法时，可以更改其他消息字段，例如事务的接收者。在这种情况下，新消息将需要首先在本地签名。

在正常情况下，不应改变 _GasLimit_。关于如何使用可选标志来替换 _GasLimit_ 的说明，请参考以下内容：

```sh
lotus mpool replace --help
```


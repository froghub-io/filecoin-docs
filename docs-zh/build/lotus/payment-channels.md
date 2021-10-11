---
title: 'Lotus：付款渠道'
description: '本指南说明了付款渠道在Lotus中的工作方式，并提供了一些有关如何使用它们的示例。'
breadcrumb: '付款渠道'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

付款渠道用于在两个参与者之间转移资金。

例如，在 Lotus 中，当客户想要[从提供者获取数据](../../about-filecoin/how-filecoin-works.md#交易)时，会创建一个支付渠道。客户端发送付款渠道的凭证，提供者则发送数据作为响应。付款渠道和凭证可用于任何情况，在这种情况下，交易双方需要在彼此之间进行链下增量转移价值。

## 工作原理

- 以初始金额在链上创建支付渠道。
- 凭证可让客户和提供者逐步在链外交换资金。提供者可以在任何阶段向链提交凭证。
- 付款渠道的任何一方都可以在链上结算付款渠道。
- 在结算期(目前是 12 个小时)，付款渠道的任何一方都可以在链上发起 collect。
- Collect 将已提交的凭证的值发送给渠道的收件人(提供者)，并将剩余的渠道余额退还给渠道创建者(客户)。
- 凭证具有一个 lane，一个随机数和一个值，其中在同一 lane 中具有较高随机数的凭证会取代具有较低随机数的凭证。
  ( 每笔交易都是在不同的 lane 上创建的。

## CLI 示例

为了快速理解，我们可以使用 Lotus CLI 来显示支付渠道的工作方式。Lotus CLI 是 Lotus 守护进程的客户端，因此在此运行的每个命令都对应于 Lotus 的[API 调用](../../reference/lotus-api.md)。

客户创建了一个向提供者的付款渠道，价值为 10 FIL：

```sh
$ lotus paych add-funds <from_addr> <to_addr> 10
<channel addr>
```

客户在 lane0（隐式）中创建凭证，其随机数为 1（隐式），值为 2：

```sh
$ lotus paych voucher create <channel addr> 2
<voucher>
```

客户端将凭证发送给提供者，提供者将凭证添加到其本地存储中：

```sh
$ lotus paych voucher add <channel addr> <voucher>
```

提供者向客户端发送一些数据。

客户在 lane0（隐式）中创建一个凭证，其随机数为 2（隐式），值为 4：

```sh
$ lotus paych voucher create <channel addr> 4
<voucher>
```

客户端将凭证发送给提供者，然后提供者添加凭证并发回更多数据。
等等。

客户可以通过使用相同的客户和提供者地址调用`paych add-funds` 在支付渠道创建后向其添加值：

```sh
$ lotus paych add-funds <client addr> <provider addr> 5
<channel addr> # Same address as above. Channel now has 15
```

客户收到所有数据后，就可以建立渠道。请注意，不必立即进行结算。例如，客户可以保持渠道开放，只要它想继续与提供者进行交易。

```sh
$ lotus paych settle <channel addr>
```

提供者可以将凭证提交给链 (请注意，当 Lotus 在链上看到结算消息时会自动执行此操作)。提供者可能已收到许多价值逐渐增加的凭证。提供者应当提交最佳凭证。请注意，每条 lane 都有一张最佳凭证：

```sh
$ lotus paych voucher best-spendable <channel addr>
<voucher>
<voucher>
<voucher>

$ lotus paych voucher submit <channel addr> <voucher>
```

一旦结算期结束，客户或提供者都可以嗲用 collect 来支付资金。

```sh
$ lotus paych collect <channel addr>
```

---
title: 动态检索定价
description: Lotus允许您设置不同的策略来计算检索交易的报价。默认策略和外部策略。
---

# 动态检索定价

Lotus允许您设置不同的策略来计算检索交易的报价。两个可用的策略是_Default_和_External_:

|策略名称|描述|
| --- | --- |
| Default |Lotus自带一个内置的默认定价策略，为已验证的未密封交易提供免费检索。miner仍然可以向客户收取数据传输费用，如果他们希望关闭免费数据传输在miner配置验证交易。miner也可以向客户收取开封费用，如果他们没有开封的扇区文件来获取交易有效载荷。|
| External | Miners可以为Lotus配置一个外部定价脚本，以替代默认定价策略对价格检索交易进行定价。将使用相关的交易参数调用该脚本，Lotus将使用输出报价对交易进行定价。|

## 默认策略

默认定价策略使用在`Ask Store`中配置的价格，使用`lotus retrieval-deals set-ask` CLI命令设置价格，为所有检索交易定价。然而，如果有一个验证的有效载荷存储交易，它将不收取数据传输费用。这个行为可以通过在`DealMaking`中设置`VerifiedDealsFreeTransfer`标志为`false`来关闭。RetrievalPricing的配置部分:

```toml
[Dealmaking.RetrievalPricing]
Strategy = "default"
[Dealmaking.RetrievalPricing.Default]
VerifiedDealsFreeTransfer = false
```

如果我们已经有一个包含检索有效载荷的未密封扇区文件，它也不会为开封收费。

## 外部政策

用户可以配置一个外部定价脚本，类似于交易筛选机制，该脚本将一个JSON编组的 `PricingInput` 作为输入，并输出一个JSON编组的`Ask`，也称为 _the quote_。`PricingInput`结构体定义如下:

```go
type PricingInput struct {
    // PayloadCID is the cid of the payload to retrieve.
    PayloadCID cid.Cid

    // PieceCID is the cid of the Piece from which the Payload will be retrieved.
    PieceCID cid.Cid

    // PieceSize is the size of the Piece from which the payload will be retrieved.
    PieceSize abi.UnpaddedPieceSize

    // Client is the peerID of the retrieval client.
    Client peer.ID

    // VerifiedDeal is true if there exists a verified storage deal for the PayloadCID.
    VerifiedDeal bool

    // Unsealed is true if there exists an unsealed sector from which we can retrieve the given payload.
    Unsealed bool

    // CurrentAsk is the ask configured in the ask-store via the `lotus retrieval-deals set-ask` CLI command.
    CurrentAsk Ask
}
```

输出`Ask`定义为:

```go
type Ask struct {
    PricePerByte            abi.TokenAmount
    UnsealPrice             abi.TokenAmount
    PaymentInterval         uint64
    PaymentIntervalIncrease uint64
}
```

要使用此模式而不是上面的默认模式，配置的 `DealMaking.RetrievalPricing` 部分需要配置为使用 `external` 定价策略，并且需要给出定价脚本的绝对路径：

```toml
[Dealmaking.RetrievalPricing]
Strategy = "external"
[Dealmaking.RetrievalPricing.External]
Path = "/var/script"
```


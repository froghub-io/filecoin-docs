---
title: 'Lotus: 检索数据'
description: '本指南将向您展示如何使用Lotus检索Filecoin网络上存储的数据。'
breadcrumb: '检索数据'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

数据检索是通过与 _检索 miner_ 进行 _检索操作_ 来实现的。 在这个协议中，客户同意就给定的数据向 miner 支付一定的费用。使用[付款渠道](../../build/lotus/payment-channels.md)支付的付款会随着收到数据而逐步增加。与存储交易不同，检索交易发生在链外。

当前，Lotus 支持从原始存储数据的存储 miner 直接检索，但是，根据网络规范，该规范计划通过支持独立的个人检索 miner 来专门针对这个业务，使得检索成为更高效，快速，可靠的操作。届时，客户将能够在网络中搜索所需数据的所有可能的提供者（通过 DHT，链或带外聚合器），比较交易条款，并根据需要选择最佳的检索选项 。

## 总览

要从 Filecoin 网络检索数据，Lotus 节点需要：

1. 针对存储数据的 miner 使用所需的 _数据的 CID_ 执行检索查询。
2. 收到 miner 的确认，确认其持有该数据并且可以提供价格。
3. 发送同意提议条款的交易提议。
4. 从 miner 那里接收数据，确认数据正确无误，然后在付款渠道上发送增量付款，直到数据传输完成为止。

当前必须接收全部数据，未来将有可能使用 IPLD 选择器来选择自定义子集进行检索。

## 根据 CID 查询数据

为了检索一些数据，你将需要 **数据的 CID** 来创建存储订单。

您可以使用客户端，通过以下命令来查询所有 miner 已知的数据存储：

```sh
lotus client find <Data CID>
```

## 进行检索交易

使用简单的命令可以简化 _检索交易_ 过程：

```sh
lotus client retrieve --miner <miner ID> <Data CID> <outfile>
```

该命令带有其他可选参数(查看 `--help`).

如果输出文件不存在，它将在 Lotus 存储库目录中创建。 此过程可能需要 2 到 10 分钟。

::: warning
如果你添加了一个序列化为 IPLD-DAG 的 CAR 文件，该文件无法被转化为文件(即非 unixfs 的任何格式), 请添加 `--car` 参数并根据需要手动反序列化 DAG。
:::

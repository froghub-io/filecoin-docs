---
title: 网络性能
description: "为Filecoin网络性能提供高可靠的基准测试是非常重要的。然而，当您开始与Filecoin交互时，您可以使用这些启发式方法来理解一般的Filecoin网络性能，以及它如何适合您的用例."
---

# 网络性能

Filecoin网络是一个去中心化存储市场和网络，通过去中心化协议和区块链上可公开验证的存储证明提供数据持久性。目前Filecoin的网络性能主要取决于安全参数和Filecoin的[proof structures](https://spec.filecoin.io/#algorithms__pos) 。

为Filecoin网络性能提供高可靠的基准测试是非常重要的。然而，当您开始与Filecoin交互时，您可以使用这些启发式方法来理解一般的Filecoin网络性能，以及它如何适合您的用例。

### 财务转账

 [transferring FIL](../get-started/lotus/send-and-receive-fil.md#sending-fil) 通常非常快，平均需要1个区块时间(或大约30秒)才能在链上反映出来。我们认为120块(1小时)是高价值传输的保守确认数量。

## 数据存储

Filecoin [数据存储协议](../store/lotus/store-data.md) 一旦协议被提出并被接受，有几个关键组成部分:

1. 为存储市场参与者提供资金:这个过程需要1-2分钟，并确保客户和miner都有资金和抵押品来支付交易。

2. 数据传输:交易流的这一部分涉及客户节点向Miner节点发送相关数据。数据传输速率差别很大，这取决于客户端和miner的网络和磁盘带宽。通常，客户端和miner之间的网络速度将是关键的决定因素。

3. 交易显示在链上:一旦miner接收到数据，他们验证它，以确保它符合交易参数，然后他们在链上发布交易。

4. 扇区封装: 一旦交易出现在链上，miner仍必须完成[生成Proof-of-Replication并封装扇区](https://spec.filecoin.io/#systems__filecoin_mining__sector__adding_storage) 。在满足这些[Miner的最低硬件需求](../mine/hardware-requirements.md#general-hardware-requirements)的机器上，对于一个32gb的扇区，这个过程目前估计需要大约1.5小时。

对于大多数存储客户端来说, 最重要的度量是从交易接受到交易链上出现所花费的时间。这个度量是以上步骤(1)到(3)的总和。根据目前的高水平基准测试，估计一个MiB文件完成这些步骤大约需要5-10分钟。

## 数据检索

Filecoin 网络有两种方法可以直接 [检索数据](../store/lotus/retrieve-data.md#overview) from the Filecoin network:

- **快速检索**:默认情况下，一些Filecoin客户端，如lotus，允许存储miner存储数据的未封装副本之外的一个封装副本。封装副本对于矿工必须提交的正在进行的存储证明是必要的，而未封装副本可以用于更快地从存储矿工检索数据。虽然这是一个有价值的特性，但不能保证所有miner都存储额外的未封装的存储数据副本，因为这不是协议的可验证部分。在lotus中，这个特性被称为 _fast-retrieval_。
- **解封后的检索**:由于Filecoin协议的设计，存储miner本质上是加密保证以其封装格式存储客户端数据。因此，如果存储miner没有存储的数据的未封装副本，他们将不得不首先打开封装的数据(即解码编码的数据)，然后将其返回给请求者(即检索客户端)。

在这两种方法中，接受检索交易后的数据检索过程包括:

1. **用于检索的支付渠道资金**:类似于上面的存储交易支付渠道资金，除了用于数据检索。支付渠道创建和融资的时间估计与上面提到的大致相同。

2. **unseal(如果需要)**:miner解除(解码)数据，以便请求者可以读取它。封装和开封是对称的过程，这意味着它们在两个方向上花费的时间大致相同。因此，解封装步骤估计需要与上述封装步骤相同的时间，或者在运行最低硬件要求的机器上，对于32gib扇区，大约需要3小时。

3. .**数据传输**:miner开始将数据传输回数据请求者。这也会以与原始数据传输速率相似的速率传输回来，这取决于几个因素。

由于在数据检索过程中涉及的各个步骤，Filecoin存储目前满足与传统的 _warm_ 或 _cold_ 存储相似的性能条。为了获得类似于其他热存储解决方案的性能，大多数用户使用了带有缓存层(如IPFS)的Filecoin。这些混合和多层存储解决方案使用IPFS进行热存储，使用Filecoin进行负担得起的、频繁的和版本化的备份。一些混合存储产品的例子包括[Powergate](../build/powergate.md)和[Textile Buckets](../build/filecoin-pin-services.md)。


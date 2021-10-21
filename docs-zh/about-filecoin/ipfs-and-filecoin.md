---
title: IPFS 和 Filecoin
description: Learn more about the relationship and different use-cases between IPFS and Filecoin.
---

# IPFS 和 Filecoin

Filecoin 和 IPFS 是用于在分布式网络中存储和共享数据的互补协议。这两个系统都是免费的、开源的，并共享许多构建块，包括数据表示格式 (IPLD) 和网络通信协议 (libp2p)。虽然与 IPFS 交互不需要使用 Filecoin，但所有 Filecoin 节点都是引擎盖下的 IPFS 节点，并且（通过一些手动配置）可以使用 libp2p 连接到其他 IPFS 节点并从其他 IPFS 节点获取 IPLD 格式的数据。但是，Filecoin 节点不加入或参与公共 IPFS DHT。

本页面旨在解释 IPFS 和 Filecoin 项目之间的关系，并帮助用户决定哪种方法最适合他们的用例。

## 数据存储激励

[IPFS](https:ipfs.io) 允许用户在对等网络中存储和传输可验证的内容寻址数据。 IPFS 用户通常将他们想要的数据持久化在他们自己的 IPFS 节点上。这称为 [固定](https:docs.ipfs.ioconceptspersistence)。有时可能会使用第三方固定服务或通过个人 IPFS 用户组（如 [IPFS 协作集群]（https:collab.ipfscluster.io））固定数据。只要一个用户存储数据，数据就存在于网络中，并且可以在其他用户请求时将其提供给其他用户。

单独的 IPFS 不包含激励其他人存储数据的内置机制。这是 Filecoin 旨在解决的挑战。 Filecoin 建立在 IPFS 之上，旨在为长期存储创建分布式存储市场。具有大存储容量的节点可以将其存储租给用户并获得报酬。

Filecoin 网络可确保安全存储数据。然而，存储、验证和解封（分别称为封装、证明和检索）的过程在计算上是昂贵的并且可能需要时间。这对于数据检索尤其重要，数据检索应该尽可能快。出于这个原因，Filecoin 启用了一个额外的检索市场，其中专用节点可以通过保留未封装的缓存副本来帮助快速从网络交付内容以进行支付。这种交付机制可能会使用 IPFS，但仍在设计中。有关交付机制的更多信息，请参阅 [ResNetLab 的去中心化数据交付市场研究](https:github.comprotocolResNetLabblobmasterOPEN_PROBLEMSDECENTRALIZED_DATA_DELIVERY_MARKETS.md)。

Filecoin 旨在增加长期持久性以安全存储大批量数据，而 IPFS 则针对内容的快速检索和分发进行优化。

## 使用 IPFS 和 Filecoin

### 使用 IPFS 进行内容寻址

IPFS 非常适合开始为各种分布式 Web 应用程序使用内容寻址。在大多数情况下：

- 数据由用户自己的节点提供。否则，必须依靠其他对等点自愿无私地存储数据或依靠集中式钉扎服务。
- 必须信任集中式 IPFS 固定服务才能完成其工作。 IPFS 没有内置规定来验证数据是否由固定服务存储和正确提供。
- 热门内容更容易访问。流行的内容（有许多提供商）自然会变得更快更容易在 IPFS 中检索，这在有外部激励在多个节点中同步和存储数据时非常有用，并且适用于可以使用强大的社会契约来确保内容保持托管和维护的情况长期。
- 
### 使用 Filecoin 进行数据持久化

Filecoin 建立在 IPFS 的内容寻址基础上，以使用加密经济激励措施增加长期数据持久性。使用 Filecoin：

- 客户与miner签订_存储交易_以存储数据。网络验证miner是否正确存储了数据。在_存储交易_期间定期进行小额付款。
- 不遵守存储协议的miner将受到惩罚。
- 内容检索可能由存储miner直接提供，也可能由专门的检索miner提供。请求数据的用户为此服务付费。
- Filecoin 擅长长时间存储大量数据。

### 一起使用 IPFS 和 Filecoin

许多解决方案将这两个网络结合起来以实现两全其美：IPFS 用于内容寻址和数据发现，以及 Filecoin 用于长期持久性。为了实现这一点，像 [Powergate](..buildpowergate.md) 这样的服务会备份 Filecoin 网络上的数据，同时确保可以在 IPFS 公共 DHT 中发现内容。数据始终可用并且可以快速检索，同时确保随着时间的推移安全且可验证地备份在 Filecoin 网络上。

## IPFS 和 Filecoin 背后的技术

Filecoin 和 IPFS 在许多层面都由相同的技术提供支持：

- [IPLD](https://ipld.io/) 指定内容寻址数据的数据格式，例如区块链或 IPFS 存储文件的方式。
- [libp2p](https://libp2p.io/) 提供点对点网络功能、连接安全性和密钥发现以及数据分发功能，如 DHT 和 Pubsub。
- [Multiformats](https://multiformats.io) 定义面向未来的标识符和数据类型。
- [Graphsync](https://github.com/ipfs/go-graphsync) and [Bitswap](https://github.com/ipfs/go-bitswap) 实现节点之间快速高效的 IPLD 数据传输


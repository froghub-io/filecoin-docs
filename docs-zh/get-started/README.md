---
title: 入门
description: Filecoin网络是由miner和客户组成的。他们进行交易并为维护Filecoin区块链做出贡献，获得存储服务，并在此过程中获得奖励。本节将引导你如何开始，建立一个节点，并创建一个简单的应用程序
breadcrumb:
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 熟悉以下概念

- 阅读[Filecoin如何工作](../about-filecoin/how-filecoin-works.md)和[IPFS和Filecoin](../about-filecoin/ipfs-and-filecoin.md)。
- 完成[Protoschool教程](https://proto.school/verifying-storage-on-filecoin/) ，以获得更近距离的实际操作。
- 查看[现有网络](https://networks.filecoin.io)。
- 使用[可用区块探索器](explorve-the-network.md)中的一个探索主网。探索区块、消息、miner的记分牌。观看自调的基本费用、交易以及链上追踪的所有事物。

## 在 Filecoin 上存储内容

:::tip
寻找一种简单的方法来存储和访问你的文件在Filecoin ?使用一个社区的构建工具和服务开始. [看一看现在 →](../store/README.md)
:::

- 访问[Slate](../store/slate.md) 存储内容Filecoin并从您的浏览器做交易.
- 安装和启动 [Lotus Node](lotus/README.md). 设置你的第一个钱包并学习如何 [发送和接收 ⨎](lotus/send-and-receive-fil.md) and [使存储交易](../store/lotus/store-data.md).
- 使用 [Starling](../store/starling.md) 在Lotus简化存储交易的管理。
- 检查 [Lotus API methods](../reference/lotus-api) 学习如何以编程方式在Filecoin网络存储数据.

### 向 Filecoin 贡献

- [Mine Filecoin](../mine/README.md):适用于那些想要为网络提供存储和检索功能的用户。
- [Build on Filecoin](../build/README.md): 适用于那些想要构建与 Filecoin 网络交互的应用程序的人。

## Filecoin 软件

| 名字                                                             |                                                                                                                                                                                                                  |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Lotus](lotus/README.md)                                         | Filecoin节点的实现，由协议实验室维护。<br /><br />对于想要参与Filecoin网络验证区块的用户，可以通过命令行管理钱包和执行交易                                                                                         |
| [Slate](../store/slate.md)                                       | Slate 是一个完全开放源代码的文件共享网络，设计用于研究和协作，由 [Textile](https://textile.io)提供支持, [IPFS](https://ipfs.io) 和 Filecoin. <br /><br /> 对于那些希望在由分散技术支持的云中轻松存储数据的用户。 |
| [Powergate](../build/powergate.md)                               | 使用 IPFS（“热”存储层）和 Filecoin（“冷”存储层）存储数据的多层存储解决方案。                                                                                                                                     |
| [Fleek 空间守护进程](https://blog.fleek.co/posts/daemon-release) | 一个包装 IPFS 的工具，可以尽可能快开始编写一个分散的桌面应用程序。它是建立在 Textile Threads, Buckets 和 Powergate 的基础上。                                                                                    |
| [Starling](../store/starling.md)                                 | 用于 Filecoin 网络上简化、协调、分散存储的命令行界面                                                                                                                                                             |

## 钱包

Filecoin钱包允许您管理FIL,Filecoin原生的令牌。钱包存储私钥,允许您授权Filecoin事务,包括支付存储交易和FIL发送给其他账户。看到(关于钱包地址)(. / lotus / send-and-receive-fil.md # about-wallet-addresses)了解Filecoin账户使用的地址。

下表列出了推荐的钱包的实现：

| 名字                                           |                                                                                                                                                                  |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Lotus](lotus/README.md)                       | Lotus 可以管理 bls、sec1p256k1 钱包并支持[Ledger 集成](lotus/ledger.md)。                                                                                        |
| [Glif 钱包](https://wallet.glif.io/?network=f) | Glif 是一个轻量级的 web 界面，以发送和接收 Filecoin 与 Ledger 设备([介绍](https://reading.supply/@glif/install-the-filecoin-app-on-your-ledger-device-y33vhX))。 |

Lotus和Glif钱包支持 [Ledger](https://www.ledger.com/) 硬件设备, 允许您使用Filecoin没有储存你的私钥在网络连接设备。这可以帮助保护你的有价值的私有密钥从恶意软件在你的电脑上,所以一般用于大余额的账户。

有很多 [额外的钱包](https://docs.filecoin.io/reference/#other-wallets) 支持Filecoin令牌,包括手机钱包.

### Filecoin 实施

目前有 4 个 Filecoin 协议实现（或“节点软件”）正在进行中：

- [lotus](https://github.com/filecoin-project/lotus/) (Go)。这种实施方式最接近功能完整，因此，建议采用Filecoin协议实施方式。
- [venus](https://github.com/filecoin-project/venus) (Go): 这个实现目前在Filecoin网络上运行着数十个节点。我们鼓励参与者对这种实现进行实验，并向 [Venus team](https://filecoinproject.slack.com/archives/CEHHJNJS3).
- [forest](https://github.com/chainsafe/forest) (Rust)
- [fuhon](https://github.com/filecoin-project/cpp-filecoin) (C++)

这些软件客户端中的每一个都实现了[Filecoin 协议规范](https://filecoin-project.github.io/specs) 。要了解为什么有多个 Filecoin 实现，请阅读 [此博客文章](https://filecoin.io/blog/announcing-filecoin-implementations-in-rust-and-c++/).

以下是 Filecoin 协议主要部分各实现进度的快照（更新日期：2020 年 6 月 24 日:

|                    | lotus | venus | forest | fuhon |
| ------------------ | ----- | ----- | ------ | ----- |
| 1. Node            | ✅    | ✅    | ✅     | ✅    |
| 2. Files & data    | ✅    | 🔶    | 🔶     | ✅    |
| 3. Virtual Machine | ✅    | ✅    | 🔶     | 🔶    |
| 4. VM Actors       | 🔶    | 🔶    | 🔶     | 🔶    |
| 5. Blockchain      | ✅    | ✅    | ✅     | ✅    |
| 6. Token           | ✅    | ✅    | ✅     | ✅    |
| 7. Storage Mining  | ✅    | 🔄    | 🔄     | 🔄    |
| 8. Market          | ✅    | 🔶  | 🔄      | ⛔️     |

✅ : 全功能的实现。
🔄 : 从另一个实现重用组件。
🔶 : 部分实现。
⛔️ : 等待实现。

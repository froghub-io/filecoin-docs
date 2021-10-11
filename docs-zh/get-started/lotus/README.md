---
title: Lotus
description: Lotus是一个由protocollabs编写的Filecoin实现，protocollabs是IPFS、libp2p和Filecoin的创建者。
---

# Lotus

{{ $frontmatter.description }}

写在 [Go](https://golang.org) 它实际上是一套命令行应用程序

- Lotus 节点 (`lotus`): Filecoin 节点：验证网络交易，管理 FIL 钱包，可以执行存储和检索交易。
- Lotus miner (`lotus-miner`): 一个 Filecoin miner. 请参见[Lotus miner](../../mine/lotus/README.md) 文档中相应的 [miner](../../mine/README.md) .
- Lotus worker (`lotus-worker`): 协助 miner 完成与采矿有关的任务的 worker。有关更多信息，请参见其各自的 [指导](../../mine/lotus/seal-workers.md)

安装说明对这三种方法都是通用的，但本节主要介绍 **Lotus 节点**:：安装、启动、同步链和管理 Lotus 钱包。 有关如何使用 Lotus 进行存储交易的文档可以在 [商店](../../store/lotus/README.md) 章节. 其他文档也可用于 [miner ](../../mine/lotus/README.md) 和 [开发人员](../../build/lotus/README.md)!

::: warning
Lotus 是一个命令行应用程序，**只能在 Linux 和 MacOS 上运行**，需要**从源代码**构建。用户应该熟悉命令行应用程序的工作方式。
:::

## Lotus 入门

以下是 switfly 开始使用 Lotus 的主要指南：

- [启动并安装 Lotus 节点](installation.md)
- [创建钱包并将 FIL 发送或接收到您的地址](send-and-receive-fil.md)
- [在不同网络之间切换](switch-networks.md)
- [了解 Lotus 配置](configuration-and-advanced-usage.md)

请查看侧菜单以获取更多指南！

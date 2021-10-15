---
title: 部署
description: 如何开始在Filecoin上构建应用程序的文档。
---

# 部署

Filecoin 适用于构建者。如果您对利用 Filecoin 协议和分散存储网络来构建改变游戏规则的应用程序的潜力感到兴奋，那么您来对地方了。

:::tip
Use one of the community built tools and services to get started. [Take a look now →](../store/README.md)
:::

## 开始

有几个选项可以开始集成 Filecoin。以下是一些入门指南:

- [使用 Glif 节点构建](hosted-lotus.md), 供寻找端点以向链提交消息的用户使用。还提供带有可选 Powergate 的独立 Lotus）。
- [使用 Lotus 构建](lotus/README.md), 对于希望与他们自己的本地 Lotus 节点进行交互的用户。
- [使用 Powergate 构建](hosted-powergate.md), 对于希望将 IPFS（快速检索）和 Filecoin（备份）与两者完全控制相结合的用户。
- [使用Textile buckets构建](textile-buckets.md), 适用于寻找基于 Filecoin 存档的简单 IPFS 存储的用户，支持加密和共享存储桶。
- [存储和检索数据](../get-started/store-and-retrieve) 按照本教程直接使用 Lotus 节点。

## Filecoin 支撑的存储 provider

以下产品提供了由 Filecoin 网络支撑的存储解决方案，并且可能[集成 IPFS 为热数据层（FPS）](filecoin-pinning-services.md)。

::: tip
我们计划在宣布新的提供商并扩展其功能时定期更新此列表。
:::

| 名称                                                | 描述                                                                     | [IPFS Pinning API](https://ipfs.github.io/pinning-services-api-spec/) 支持 |
| --------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| [Textile Buckets](https://docs.textile.io/buckets/) | 一项使开发团队可以在分散的 DB 和存储堆栈上端到端构建软件项目的托管服务。 | 暂无                                                                       |
| **Chainsafe**                                       | 即将到来。                                                               | 暂无                                                                       |
| [Pinata](https://pinata.cloud)                      | IPFS 固件服务，即将随 Filecoin 到来                                      | 暂无                                                                       |

有关 Filecoin 支持的固件服务的优点和架构的更多信息，请查看[FPS 页面](filecoin-pinning-services.md)。

## 托管节点

托管节点提供者会为您运行 Filecoin 节点软件，因此您可以专注于集成和在此之上构建。

| 名称                                  | 描述                                                                                                                                                                     | [IPFS Pinning API](https://ipfs.github.io/pinning-services-api-spec/) 支持 |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| [Powergate 托管](hosted-powergate.md) | Textile 团队提供托管的[Powergate](./powergate.md)实例。 在[这里](https://blog.textile.io/announcing-managed-powergate-instances-enterprise-filecoin-and-ipfs/)阅读公告。 | 暂无                                                                       |
| [Glif 节点](hosted-lotus.md)          | Glif 节点托管 Lotus 实例，可通过 Lotus JSON-RPC API 端点访问。                                                                                                        | 暂无                                                                       |

## 开发人员参考

以下文档链接可以帮助您开始在 Filecoin 上部署：

| 名称                               | 描述                                                                                                                                                                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [在 Lotus 上构建](lotus/README.md) | Lotus 节点为 JSON-RPC API 提供基于 JWT 令牌的授权。                                                                                                                                                                       |
| [Powergate](powergate.md)          | Powergate 是一种多层存储解决方案，可使用 IPFS 和 Filecoin 存储数据。                                                                                                                                                      |
| [本地 devnet](local-devnet.md)     | 了解如何在自己的计算机上部署 Filecoin 网络。                                                                                                                                                                              |

## 其他资源

- [用于 Web3 基础架构的 Filecoin 集成](https://www.youtube.com/watch?v=Q0oe6i7d1u4) (视频)
- [什么是 IPFS 固件服务？](https://medium.com/pinata/what-is-an-ipfs-pinning-service-f6ed4cd7e475#:~:text=An%20IPFS%20pinning%20service%20is,running%20your%20own%20IPFS%20nodes.) (Pinata explainer)
- [IPFS 文件：持久性，永久性，固定](https://docs.ipfs.io/concepts/persistence/)
- [在 Filecoin 上开发](https://www.youtube.com/watch?v=aGCpq0Xf-w8) (视频)
- Textile 的工具：[视频](https://www.youtube.com/watch?v=IZ8M9m9_uJY)[博客文章](https://blog.textile.io/developer-tools-for-filecoin-ipfs-web/)
- [使用 Fleek 的 Space 守护程序构建去中心化应用](https://www.youtube.com/watch?v=pWJ5fty-7mA) (视频)

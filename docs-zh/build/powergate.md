---
title: 'Powergate'
description: 'Powergate 是一种多层存储解决方案，可通过IPFS（“热”存储层）和Filecoin（“冷”存储层）存储数据'
breadcrumb: 'Powergate'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

Powergate 为开发人员提供了更高级别的 API，可简化与 IPFS 和 Filecoin 节点的交互。 Powergate 还管理钱包，长期交易，并提供许多可改善在 Filecoin 上成为存储客户端的整体体验的功能。

您可以在[Textile 文档](https://docs.textile.io/powergate/)中阅读有关 Powergate 的更多信息。

Powergate 是 **推荐的解决方案**，适用于希望使用更简单的接口和从 Filecoin 获得更好的性能，但更喜欢自己管理节点的开发人员。

::: tip
可用托管的 Powergate 节点。查看如何获得一个并开始使用它在我们的[托管的 Powergate 指南](hosted-powergate.md)。
:::

## 如何使用 Powergate

与 Powergate 交互的方法有很多。 这些途径已在 Textile 的 Powergate 文档中详细记录。 这里概述了进阶途径，以供快速参考：

- **Powergate CLI**: 您可以[安装](https://docs.textile.io/powergate/#getting-started)，运行，并直接使用[Powergate CLI](https://docs.textile.io/powergate/cli/pow/)。
- **Powergate JS API 客户端**: 如果您想在 JS 应用程序中使用 Powergate，使用[Powergate JS Client](https://textileio.github.io/js-powergate-client/)。
- **Powergate Go API 客户端**: 如果您想在 Go 应用程序中使用 Powergate，使用[Powergate Go Client](https://godoc.org/github.com/textileio/powergate/api/client)。

::: tip
有时，通过例子学习是最好的学习方法。

- 请参阅基于[Powergate JS Client](../build/examples/simple-pinning-service/overview.md) 构建的示例应用程序（简单固定服务）的演示。
- 查看在[Powergate JS Client](https://github.com/filecoin-project/slate/)上构建的完整生产应用程序（Slate）。
  :::

## 其他 Powergate 资源

有关 Powergate 的工作方式的详细说明，建议阅读以下文档：

- [Filecoin 开发人员工具](https://blog.textile.io/filecoin-developer-tools-concepts/)
- Powergate 介绍：[文档](https://docs.textile.io/powergate/)和[视频](https://www.youtube.com/watch?v=aiOTSkz_6aY)
- [通过 FFS 在 Powergate 上存储数据](https://docs.textile.io/powergate/ffs/)
- [FFS 设计概述](https://github.com/textileio/powergate/blob/master/ffs/Design.md)
- [使用托管的 Powergate 开始工作](hosted-powergate.md)

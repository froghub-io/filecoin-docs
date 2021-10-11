---
title: '在Lotus上部署'
description: 'Lotus通过全面的JSON-RPC API提供了其全部功能。'
breadcrumb: '在Lotus上部署'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }} _Lotus 节点_ 和 _Lotus Miner_ 应用程序都公开 API(某些部分的 API 有重复)。 这些 API 监听了本地端口，并使用 JWT 令牌对每个请求执行授权。

如果你希望与 Lotus 节点 API，你将需要：

- 运行你自己的[Lotus 守护进程](../../store/lotus/README.md) (在您选择的 Lotus 网络上-建议使用 calibration-net recommended)，或者
- 运行[本地的 devnet](../local-devnet.md)，或者
- 使用协议实验室提供的[托管的 Lotus 节点](../hosted-lotus.md)。

## Lotus API 入门

1. **决定你如何运行 Lotus**:

   根据您的需要，有几种选择:

   - 您可以按照以下步骤安装 Lotus 节点 [默认说明](../../get-started/lotus/installation.md) 加入 Filecoin 网络之一。
   - 你可以运行一个 [本地开发网](../local-devnet.md).

   你也可以使用 [Glif node](../hosted-lotus.md). 以下步骤适用于运行您自己的 Lotus 守护程序.

1. **为你的 Lotus 节点启用远程 API 访问**:

   默认情况下，Lotus 守护进程和 Lotus Miner 不支持远程 API 访问，因为它们被配置为只监听本地请求。您将需要编辑配置以在公共接口上监听。

   这在[这里](enable-remote-api-access.md)进行了解释。此外，您希望确保您的节点可以从外部访问。我们有一个miner的[连接指南](https://docs.filecoin.io/mine/lotus/connectivity/)，其中一些技巧也适用于普通的、非miner节点。

1. **获取一个 token**:

   API 使用 JWT 令牌对请求进行身份验证。Lotus(和 Lotus Miner)提供了具有不同作用域的令牌:读、写、签和管理。获取标记的过程在[这里](api-tokens.md)解释。

   这个令牌可以用来配置 `lotus` 来与任何远程 lotus 守护进程对话:

   ```sh
   # 下面的代码将使lotus对lotus_endpoint发出请求，
   # 而不是针对本地运行的守护进程。
   export FULLNODE_API_INFO=<token>:<lotus_endpoint>
   lotus net id
   ```

   您可以使用它来测试您的 API 端点是否可达并工作良好。

1. **开始使用 JSON-API**

   了解 JSON-RPC API 的工作方式，在哪里联系以及如何获取[参考](../../reference/lotus-api.md)中每种方法的文档.

   这将使您熟悉 API 的操作方式。从那时起，您就可以开始利用任何[现有的库](api-client-libraries.md)，或者编写自己的库!

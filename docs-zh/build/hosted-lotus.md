---
title: 'Glif 节点'
description: 'Glif在Filecoin测试网和主网上提供了许多同步的Lotus节点端点。'
breadcrumb: 'Hosted nodes'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

#### 主网端口

开发人员可以使用“https://api.node.glif.io”端口上的[JSON RPC API](../reference/lotus-api.md)直接与负载均衡、同步的主网节点交互。

与单纯的 Lotus 不同，上面的端点是经过强化和限制的:

- 只支持 read 调用和`MPoolPush()`接口。
- 只支持 POST 请求。
- 如果需要，可以使用[Filecoin 签名工具](signing-libraries.md)在提交消息之前对消息进行签名。

#### 测试网端口

对于使用[JSON RPC API](../reference/lotus-api.md)来同步 testnet 节点端点，`https://calibration.node.glif.io`是可用的。

#### 自定义端点

可以请求自定义端点，包括高级权限设置。让我们知道你的用例。

::: tip
有关支持、问题和当前状态，请访问 [# Filecoin -glif-node-hosting](https://filecoinproject.slack.com/archives/C017HM9BJ8Z) 频道 [Filecoin Community Slack](https://filecoin.io/slack) 。
:::

下面是一些开始使用 Glif 节点的步骤:

1. **(可选)填写 Glif 节点的[请求表单](https://forms.gle/rfXx2yKbhgrwUv837)**:

   如果需要具有特殊特性的自定义节点，这是一个可选步骤。您需要提供一些关于预期使用和需求的详细信息。当你的申请获批准后，你会收到:

   - 一个 JWT token
   - 一个自定义端点

1. **(可选)安装 Lotus 并将其用作客户端**:

   我们可以使用`lotus`与 Glif 节点 API 进行通信(作为客户端)。这在两方面很有用:

   - 它允许我们在使用自定义端点时验证端点是否工作，以及凭证是否正确。
   - 因为我们可以尝试直接使用`lotus` CLI 快速检查，所以调试更容易。

   要使用`lotus`，请从[releases 页面](https://github.com/filecoin-project/lotus/releases/)下载并提取适当的 lotus 版本。**lotus 版本需要与正在运行的节点** 匹配。我们不会运行 Lotus 守护进程或同步链，我们只将其用作客户端。

   ::: tip
   使用以下方法检查 Glif 节点实例的运行版本:

   ```sh
   curl -X POST 'https://api.node.glif.io' -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.Version","params":[]}'
   ```

   :::

   下载后，为了让 Lotus 二进制文件与 Lotus 远程端点对话，导出以下环境变量:

   ```sh
   export FULLNODE_API_INFO=<token>:<endpoint>
   # 例如，使用默认URL(不需要令牌)
   export FULLNODE_API_INFO=https://api.node.glif.io
   ```

   你可以测试它是否可以工作:

   ```sh
   ./lotus net id
   12D3KooWBF8cpp65hp2u9LK5mh19x67ftAam84z9LsfaquTDSBpt
   ```

   如果上面的方法不起作用，请验证您使用了正确的令牌和多地址。

   默认情况下，所有读操作以及 MPoolPush 方法都是启用的。这意味着你需要使用你自己的外部管理的钱包[亲自签名消息](signing-libraries.md)，除非你得到一个完全受控的完整节点。但是，我们可以使用 CLI 发送任何读取命令。以下只是一些例子:

   ```sh
   ./lotus net id
   ./lotus net peers
   ./lotus sync status
   ./lotus chain head
   ...
   ```

   熟悉节点的功能并验证端点。CLI 交互在快速调试时非常有用。注意，默认的 Glif 端点是跨几个 Lotus 节点进行负载均衡的!

1. **开始在 JSON-RPC API 上直接集成**:

   您的应用程序很可能直接与 Lotus JSON-RPC API 交互。以下是获取 API 操作知识的第一步:

   - 请阅读[Lotus API reference](../reference/lotus-api.md)中的说明。理解如何执行调用、身份验证如何工作以及参数和响应如何在 JSON-RPC 中编码。尝试一些使用`curl`的例子。
   - 通过以上内容，了解如何从 Lotus Go 文档获取每个端点的参数和期望的格式。这将是检查是否有东西不工作或某些参数的格式不被理解的第一个地方。
   - 您还可以使用这个[Lotus API 文档](https://documenter.getpostman.com/view/4872192/SWLh5mUd?version=latest)，它以更易读的形式介绍了 Glif 节点支持的方法，并提供了额外的提示。
   - 如果您计划发送交易，您将需要管理钱包并为您的消息创建签名。有关不同的解决方案，请参阅[signing libraries](signing-libraries.md)页面。

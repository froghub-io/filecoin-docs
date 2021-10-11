---
title: '托管的 Powergate'
description: 'Powergate是一个多层存储解决方案，使用IPFS(“热”存储层)和Filecoin(“冷”存储层)存储数据。托管的Powergate实例可根据请求提供给构建器。'
breadcrumb: '托管的 Powergate'
---

# {{ $frontmatter.title }}

[Powergate](Powergate.md)是一个多层存储解决方案，使用 IPFS(“热”存储层)和 Filecoin(“冷”存储层)存储数据。托管的 Powergate 实例可根据请求提供给构建器。

本指南将帮助您开始使用 _托管的 Powergate_。我们将使用 Powergate CLI 与提供给我们的 Powergate 端点交互，并熟悉它们。

1. **注册托管的 Powergate 实例**:

   请在[https://blog.textile.io/hosted-powergate/](https://blog.textile.io/hosted-powergate/)上填写表格。当您的申请被批准时，您将收到一封包含连接说明和指定端点的电子邮件。

1. **下载并安装`pow` CLI**:

   [`pow` CLI 工具](https://github.com/textileio/powergate)将帮助我们与 Powergate 实例进行交互。它可以安装:

   ```sh
   git clone https://github.com/textileio/powergate
   cd powergate
   make install-pow
   ```

1. **设置远程端点**:

   欢迎电子邮件中提供了端点。让`pow`使用它:

   ```sh
   # Use your provided endpoint
   export POW_SERVERADDRESS=api.pow.something.textile.io:443
   # Verify it works
   pow version
   ```

1. **创建一个新的用户实例**:

    一个用户实例管理所有必要的状态和功能，以通过 Powergate 提供多层文件存储。每个 Powergate 设置可以管理任意数量的用户实例。要创建一个新的 User：

   ```sh
   pow admin user create
   ```

   这将打印出一个实例ID和一个 User auth token 。写下这个令牌，因为我们在每一个其他用户操作中都需要它。作为一个可选的便利条件（相对于在每个 `pow` 命令中包含用户 `--token` 标志），你可以通过 `POW_TOEKN` 环境变量让 Powergate 知道它。

   ```sh
   export POW_TOKEN=<token>
   ```

   托管的 Powergate 实例会自动配置为你创建的每一个用户实例添加小额资金。如果你需要多个配置不同的用户实例，你可以多次重复 `create` 步骤，但你需要使用 `--token` 标志，以便 Powergate 知道要与哪个用户实例交互。你可以检查 [默认配置](https://docs.textile.io/powergate/storageconfig/) 在一个 User 实例中的存储作业。

   ```sh
   pow config default -t [User auth token]
   ```

   关于用户实例的其他细节可以在 [官方文档](https://docs.textile.io/powergate/storage/#intro-to-users) 中找到。


1. **导入你的数据**:

   除非你的数据已经在 IPFS 上可用(在这种情况下你可以跳过这个步骤)，你可以使用 Powergate 来导入你的数据，使用 `stage` 命令:

   ```sh
   pow ffs stage <path/filename>
   ```

   注意输出的 CID。这将用于启动 Powergate 存储。

1. **启动数据存储**:

   下面的命令为 CID 推送一个新的存储配置，并为它创建一个存储作业:

   ```sh
   pow ffs config push <cid>
   ```

   除非有提供自定义的配置，否则使用的配置将基于默认配置(参见`pow ffs config push -help`)。

   Powergate 将自动找到miner并执行存储交易。你可以通过以下方式查看进度:

   ```sh
   pow ffs watch <job id>
   ```

   有关如何使用 `pow` 和执行其他操作(如检索)的更多详细信息和最新信息，请参见 [官方 Textile 文档](https://docs.textile.io/powergate/ffs/) 。

1. **与 Powergate API 交互**:

   一旦熟悉了 Powergate 工作流程，就可以开始以编程的方式控制 Powergate 实例。Textile 使用 gRPC API 端点为 Powergate 提供 Go 和 Javascript API 客户端:

   - [js-powergate-client](https://github.com/textileio/js-powergate-client)
   - [Go Powergate client module](https://godoc.org/github.com/textileio/powergate/api/client)

其他资源，包括使用 Powergate 的视频和示例，可以从我们的[贡献页面](Powergate.md#Additional-Powergate-resources)获得。

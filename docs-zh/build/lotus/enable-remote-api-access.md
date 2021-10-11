---
title: 'Lotus: 启用远程 API 访问'
description: '本指南介绍了如何配置Lotus，使其API可以被远程访问。'
breadcrumb: 'Enable remote API access'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

**Lotus Miner** 和 **Lotus Node** 应用在运行时默认带有其自己的本地API端点设置。 `lotus` 和 `lotus-miner` 都充当守护程序 (与 `lotus daemon` 或 `lotus-miner run` 一起启动) 并作为该守护程序的客户端（其他所有命令）。

在本节中，我们将解释如何启用由守护程序运行的对Lotus API的远程访问。

::: callout
**该说明同时适用于 `lotus` 与 `lotus-miner`**. 为了简化开发, 我们将通过编辑[Lotus Node configuration](../../get-started/lotus/configuration-and-advanced-usage.md) 来说明如何使用 `lotus`来完成此操作, 并且同样可以通过编辑 [Lotus Miner configuration](../../mine/lotus/miner-configuration.md) 来实现。
:::

## 设置API端点的监听接口

默认情况下,  API 监听本地 "loopback" 接口 (`127.0.0.1`). 这是 `config.toml` 文件中的 [configured](../../get-started/lotus/configuration-and-advanced-usage.md) :

要远程访问 API , Lotus 需要监听正确的 IP/接口。 与每个接口相关的 IP 通常可以通过命令 `ip a` 找到。一旦知道了正确的 IP，就可以在配置中设置它:

```toml
[API]
  ListenAddress = "/ip4/<EXTERNAL_INTERFACE_IP>/tcp/3453/http" # port is an example

  # Only relevant for lotus-miner
  RemoteListenAddress = "<EXTERNAL_IP_AS_SEEN_BY_OTHERS:<EXTERNAL_PORT_AS_SEEN_BY_OTHERS>"
```

::: tip
也可以使用 `0.0.0.0` 。这是一个通配符，表示“所有接口”。 根据网络设置，这可能会影响安全性（侦听错误的暴露接口）。
:::

进行这些更改后，请重新启动受影响的进程。

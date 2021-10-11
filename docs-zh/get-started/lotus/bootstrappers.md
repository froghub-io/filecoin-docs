---
title: 运行引导程序节点
description: '运行您自己的引导程序节点'
breadcrumb: '引导程序节点'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

### 引导程序

Lotus daemons 可以配置为充当网络引导程序。引导程序作为初始点
联系其他 Lotus daemons以寻找对等体.

::: tip
除非您正在运行专用测试网络，否则通常不需要运行网络引导程序节点。
:::

### 配置引导程序节点

由于引导程序节点处理的流量与典型的 lotus daemon略有不同，我们建议使用
以下配置。此配置将设置节点作为引导程序 

```toml
  [API]
    ListenAddress = "/ip4/0.0.0.0/tcp/1234/http"
  [Libp2p]
    ListenAddresses = ["/ip4/0.0.0.0/tcp/1347"]
    ConnMgrLow = 400
    ConnMgrHigh = 500
    ConnMgrGrace = "5m0s"
    Bootstrapper = true
  [Pubsub]
    Bootstrapper = true 

```

### 启动 Bootstrapper 节点

使用引导程序配置文件启动 lotus daemon. `--profile=bootstrapper` 覆盖配置默认值
为 libp2p 和 pubsub 子系统启用引导程序模式. 如果您的daemon配置文件包含 `Bootstrapper = true` 如上例所示, 此选项不是必需的.

```bash
lotus daemon --profile=bootstrapper
```

### 操作 Bootstrapper 节点
引导程序节点将自动使用现有引导程序进行引导。如果您正在运营自己的基础设施，您可能需要手动将引导程序相互对等。

```bash
lotus net peers
lotus net connect <peer_multiaddr>
```

### 配置 lotus daemon以连接到此引导程序.

Lotus 引导程序是在编译时内置的。您可以找到公共引导程序节点列表
每个网络 [here](https://github.com/filecoin-project/lotus/tree/master/build/bootstrap). 可以通过将以下内容添加到您的daemon配置文件来覆盖此列表.


```
[Libp2p]
    BootstrapPeers = [
      "<multiaddr>"
    ]
```

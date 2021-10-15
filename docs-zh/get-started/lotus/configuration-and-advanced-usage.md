---
title: Lotus配置和进阶用法
description: 本指南记录了 Lotus Node 中的环境变量、配置和其他高级特性。
breadcrumb: 配置和进阶用法
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

[[TOC]]

## Configuration

Lotus 守护进程在`~/.lotus/config.toml`. 请注意，默认情况下，所有设置都会被注释。下面是一个配置示例：

```toml
[API]
  # 为 Lotus API 绑定地址
  ListenAddress = "/ip4/127.0.0.1/tcp/1234/http"
  # 不用到lotus daemon
  RemoteListenAddress = ""
  # 常规网络超时值
  Timeout = "30s"

# Libp2p提供与其他Filecoin网络节点的连接
[Libp2p]
  # 为 libp2p 绑定地址  host - 0 意为随机端口.
  ListenAddresses = ["/ip4/0.0.0.0/tcp/0", "/ip6/::/tcp/0"]
  # 显式插入您想要的任何地址
  # 在这里向其他节点公告，否则，他们会
  # 猜测.
  AnnounceAddresses = []
  # 插入任何地址都不被公告。
  NoAnnounceAddresses = []
  # 连接管理的设置， 如果你的机器无法负荷
  # 过多连接，则减少数值。
  ConnMgrLow = 150
  ConnMgrHigh = 180
  ConnMgrGrace = "20s"

# Pubsub用于在网络中广播信息
[Pubsub]
  Bootstrapper = false
  RemoteTracer = "/dns4/pubsub-tracer.filecoin.io/tcp/4001/p2p/QmTd6UvR47vUidRNZ1ZKXHrAFhqTJAD27rKL9XYghEKgKX"

# 以下部分可用于启用从IPFS添加和检索文件
[Client]
  UseIpfs = false
  IpfsMAddr = ""
  IpfsUseForRetrieval = false
  # 客户端之间同时传输数据的最大数量
  # 和存储提供商
  SimultaneousTransfers = 20

# Metrics配置
[Metrics]
  Nickname = ""
  HeadNotifs = false

# Wallet配置
[Wallet]
  EnableLedger = false

# Fee configuration
[Fees]
  DefaultMaxFee = 0.007
```
 
## 连通性

通常，您的 lotus 守护进程将与网络中的其他进程建立连接，并尝试使用 uPnP 使其自身可拨号。如果希望手动确保守护程序可访问：

- 在 Libp2p 部分的`ListenAddresses` 中设置您选择的固定端口（即 6665). -打开路由器中转发到此端口的端口。这通常被称为“端口转发”，不同型号的路由器的指令不同，但网上有很多指南。
- 将您的公共 IP/端口添加到`AnnounceAddresses`. 例如， `/ip4/<yourIP>/tcp/6665`.

请注意**使用 Lotus 作为网络的客户端并不是完全可访问的要求**，因为您的节点已经直接拨出到其他节点和 miner。

## 环境变量

Lotus 节点的某些方面可以使用环境变量进行控制。

大多数 Lotus 二进制文件通用的变量：

- `LOTUS_FD_MAX`: 设置进程的文件描述符限制
- `LOTUS_MAX_HEAP` (v1.2.3+): [内存监控](https://github.com/raulk/go-watchdog)将尝试依照的最大堆大小。值是一个数字字节量 (`12345678`)或公制的存储单元(例如:`16GiB`)。如果不设置，内存监控将使用系统的总内存作为内存监控的限制。在 Go 运行时，内存监控是克服[gc 相关缺点](https://github.com/golang/go/issues/42805)所必需的。
- `LOTUS_DISABLE_WATCHDOG=1` (v1.2.3+): 如果设置，将关闭内存监控。当在 OS/内核没有报告正确信息的环境中可能是必要的设置。
- `LOTUS_JAEGER`: 设置发送跟踪的 Jaeger URL。见 TODO。
- `LOTUS_DEV`: 任何非空值都将启用更详细的日志记录，只对开发人员有用。
- `GOLOG_OUTPUT`: 控制程序记录的位置。可能值：`stdout`、`stderr`、`file`。多个值可以与“+”组合。
- `GOLOG_FILE`: 要记录到的文件的路径。
- `GOLOG_LOG_FMT`: 日志格式（json，nocolor）。

特定于“Lotus 守护程序”的变量：

- `LOTUS_PATH`:存储 Lotus 数据的位置（默认为`~/.Lotus`）
- `LOTUS_MAX_HEAP` (v1.2.3+): 最大堆大小 [memory watchdog](https://github.com/raulk/go-watchdog) 会努力遵守. 值是数字字节量 (`12345678`) 或公制中的存储单元 (e.g. `16GiB`). 如果没有设置, 内存看门狗将使用系统总内存作为内存看门狗的限制. 内存看门狗需要克服 [GC-相关缺点](https://github.com/golang/go/issues/42805) 在 Go 运行时.
- `LOTUS_DISABLE_WATCHDOG=1` (v1.2.3+): 如果设置，将禁用内存看门狗。在 OSkernel 不报告正确信息的环境中可能是必要的.
- `LOTUS_SKIP_GENESIS_CHECK=_yes_`: 仅当您希望使用不同的 genesis 块运行 lotus 网络时才设置。
- `LOTUS_CHAIN_TIPSET_CACHE`: 设置链存储 tipset 缓存的大小。默认为“8192”。如果频繁执行任意 tipset 查找，则会增加。
- `LOTUS_CHAIN_INDEX_CACHE`: 设置 epoch 索引缓存的大小。默认为“32768”。如果您经常执行深度链查找，以查找远离最新高度的块高度，则会增加此值。
- `LOTUS_BSYNC_MSG_WINDOW`: 设置消息获取块同步请求的初始最大窗口大小。如果您有低带宽的 internet 连接，请设置为 10-20。

## 控制远程守护程序

“lotus”应用程序作为 lotus 守护进程的客户端，可以通过设置以下环境变量与运行在任何位置（而不仅仅是本地位置）的 lotus 守护进程进行通信：

```sh
FULLNODE_API_INFO="TOKEN:/ip4/<IP>/tcp/<PORT>/http"
```

在“Lotus Node”上，可以通过以下方式生成完整的变量字符串，包括新的令牌：

```sh
lotus auth api-info --perm admin
```

请注意，您可能需要编辑结果以为远程节点放置正确的 IP。请参阅 [关于 API 的文档](../../build/lotus/api-tokens.md) 有关令牌的详细信息。

## 日志级别控制

```sh
lotus log set-level <level>
```

此命令可用于切换 Lotus 节点不同系统的日志记录级别。按降序排列

日志详细信息的级别是“debug”、“info”、“warn”和“error”。

例如，要将“chain”和“blocksync”设置为“debug”级别的日志，请运行

`lotuslog set level--system chain--system blocksync debug`。

要查看各种日志记录系统，请运行：

```sh
lotus log list
```

::: tip
上面的 [节环境变量](#环境变量) 部分记录了一些允许控制日志记录位置和格式的 `GOLOG_*`变量.
:::

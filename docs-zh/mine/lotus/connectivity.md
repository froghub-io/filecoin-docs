---
title: 'Lotus Miner：连接性'
description: '本指南显示了改善Miner连接性的提示和技巧。'
breadcrumb: '连接性'
---

# {{ $frontmatter.title }}

像所有点对点协议的参与者一样，Filecoin Miner 需要稳定且高质量的对等池进行通信，以执行其各种功能。 {{ $frontmatter.description }} 这补充了 [connectivity section](miner-setup.md#connectivity-to-the-miner) 在安装说明和 [seal workers](seal-workers.md) 指南.

[[TOC]]

## 查找您的公共 IP 地址

通常，您可以使用诸如 ifconfig.me 之类的服务找到您的公共 IP 地址。从miner上运行以下命令可以显示其他人看到的 IP：

```sh
curl ifconfig.me
```

::: warning
在某些设置中，返回的 IP 将不是正确的设置，在这些设置中，传出的流量通过传入的流量通过不同的出口点（即 NAT 网关）进行路由，从而呈现出不同的 IP。您应该熟悉自己的网络设置！
:::

## 测试与 IP 地址/端口的连接

有多种测试方法:

- 要检查可公开访问的 IP，您可以使用许多在线检查器之一，例如 [这里](https://www.yougetsignal.com/tools/open-ports/), 或 [这里](https://ping.eu/port-chk).
- 适用于局域网（也适用于公共 IP）, 您从另一台计算机上使用 netcat 工具: `ncat -w 5 <PUBLIC_IP> <PORT>` （如果返回的退出代码为非零或错误，则表示无法建立连接.
- 还有 Telnet: `telnet <PUBLIC_IP> <PORT>`.
- 您可以将自己喜欢的搜索引擎用于与您的设置和环境特别相关的更多方式。

## Lotus Miner 可达性

当 Lotus Miner 运行且可达时，应向其报告:

```sh
$ lotus-miner net reachability
AutoNAT status:  Public
Public address:  /ip4/<IP>/tcp/<port>
```

验证公用地址是否符合您的期望。 `AutoNAT status: Private` 表示在任何已公布的地址上都无法访问 Lotus Miner。

## 检查对等点数

为了确保存储和检索交易的顺利进行，建议在每次启动后检查 Miner 连接了多少个对等方：

```sh
lotus-miner net peers
```

启动 Miner 后，对等方计数应立即增加。您还可以使用以下方式手动连接到对等方：

```sh
lotus-miner net connect <address1> <address2>...
```

[主网](https://github.com/filecoin-project/lotus/blob/master/build/bootstrap/mainnet.pi) 中提供了一个引导对等体的列表。引导对等体在每个网络中都是唯一的，所以请务必使用与您所需网络相对应的列表。 其他引导列表位于[这里](https://github.com/filecoin-project/lotus/blob/master/build/bootstrap/) 。

## 转发端口

如果您在 NAT 环境下运行（例如，在家庭设置中，通常情况下有一台路由器控制着上网访问）, 有时有必要启用从外部端口到 Miner 端口的端口转发。

::: tip
使用说明因品牌型号而异。请使用您最喜欢的搜索引擎来发现如何为路由器启用端口转发
:::

## 获取公共 IP

如果您不控制设备后面的 NAT /防火墙（例如在企业网络和其他防火墙内），则可以使用另一种解决方案。您可以设置**中继端点**，以便您的 Miner 可以通过外部可公开拨打的端点来中继其互联网流量。

有多种方法可以实现这一目标:

- 使用 VPN 服务。我们建议使用由 Wireguard-powere 支持的 IPv6 VPN 服务，该服务将为您提供可公开路由的 IPv6 地址。
- 使用 [SSH 反向隧道](https://www.howtogeek.com/428413/what-is-reverse-ssh-tunneling-and-how-to-use-it) 在具有公共 IP 的机器和 Miner 之间建立代理。

## 常见错误

[故障排除页面](miner-troubleshooting.md#common-connectivity-errors) 列出了常见的连接错误。

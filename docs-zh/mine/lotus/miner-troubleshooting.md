---
title: 'Lotus Miner: 故障排除'
description: '该页面列出了用户可能遇到的一些最常见的错误，从而为Lotusminer提供了一些故障排除建议。'
breadcrumb: '故障排除'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

::: callout
**您是否成功克服了其他与采矿相关的问题?** 请通过底部的链接对其进行编辑，以对此页做出贡献!
:::

[[TOC]]

## 错误: 无法获取 bellman.lock

**Bellman** 创建 lockfile 来锁定进程的 GPU。如果未正确清理此文件，则会发生此错误:

```sh
mining block failed: computing election proof: github.com/filecoin-project/lotus/miner.(*Miner).mineOne
```

当 miner 无法获取`bellman.lock`时，会发生此错误。要解决此问题，您需要停止`lotus-miner`并删除`/tmp/bellman.lock`。

## 错误：无法获取 api 端点

```sh
lotus-miner info
# WARN  main  lotus-storage-miner/main.go:73  failed to get api endpoint: (/Users/user/.lotusminer) %!w(*errors.errorString=&{API not running (no endpoint)}):
```

如果看到此消息，则说明您的**Lotus Miner**尚未准备就绪。您的 Lotus 节点需要[完成同步](../../get-started/lotus/chain.md#checking-sync-status).

## 错误：您的计算机可能不够快

```sh
CAUTION: block production took longer than the block delay. Your computer may not be fast enough to keep up
```

如果看到此消息，则表示[您的计算机速度太慢](../hardware-requirements.md) 并且您的块不包含在链中，并且您将不会获得任何奖励。

## 错误：设备上没有剩余空间

```sh
lotus-miner sectors pledge
# No space left on device (os error 28)
```

如果看到此消息，则意味着[扇区承诺将过多数据写入`$TMPDIR`](sector-pledging.md)默认情况下是根分区（这在 Linux 安装程序中很常见）。通常，您的根分区不会获得最大的存储分区，因此您需要将环境变量更改为其他变量。

## 错误：GPU 未使用

如果您怀疑未使用您的 GPU，请首先确保它是可支持的，或者按照[自定义 GPU 指南](gpus.md)中的说明进行设置。 您也可以按照该指南中的说明运行一个快速的 lotus-bench 基准来验证您的 GPU 是否正在使用。

## 常见的连接错误

| 错误                                                                                               | 释义                                                                                                                                                                                                                                                                                                                                                                                           | 如何解决                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| N/A                                                                                                | 如果您看到交易成功率"N/A"，则原因可能是一旦您的 miner 锁定了其第一部门，交易机器人将开始尝试存储交易。从 miner 封锁其第一扇区的那一刻起，您应该获得最多 48 小时的存储交易结果（存储交易的当前超时值）。对于检索交易，报告存储交易成功后，您应该最多看到 12 个小时的结果（检索交易的当前超时）。信息中心目前仅记录交易结果。如果您正在进行存储或检索交易，则仍会看到"N/A"，直到它传播到整个链。 | 无需 miner 采取任何行动。                                                                                                                                                                                              |
| ClientQueryAsk failed : failed to open stream to miner: dial backoff                               | 尝试连接到远程主机，但失败。                                                                                                                                                                                                                                                                                                                                                                   | 这可能是由于端口问题，配置文件中设置的 IP 或根本没有 Internet 连接引起的。请参考[建立公共 IP 地址](https://docs.filecoin.io/mine/connectivity/#establishing-a-public-ip-address).                                      |
| ClientQueryAsk failed : failed to open stream to miner: failed to dial                             | 交易机器人无法为 miner 打开网络套接字。                                                                                                                                                                                                                                                                                                                                                        | 这可能是因为 miner 的 IP 无法建立公共链接，或者端口问题。请参考[建立公共 IP 地址](https://docs.filecoin.io/mine/connectivity/#establishing-a-public-ip-address).                                                       |
| ClientQueryAsk failed : failed to open stream to miner: routing: not found                         | 交易机器人无法找到 miner 的 IP 和/或端口。                                                                                                                                                                                                                                                                                                                                                     | 确保您[在链上发布了 miner 的多地址](./miner-setup.md#publishing-the-miner-addresses)                                                                                                                                   |
| ClientQueryAsk failed : failed to read ask response: stream reset                                  | 由于高丢包率或 libp2p 过于频繁地断开/失败连接而导致的连接丢失。                                                                                                                                                                                                                                                                                                                                | [修复中。] Lotus 团队当前正在进行一项更改，以使用 libp2p 的连接标记功能，该功能将在丢失时重试连接。([go-fil-markets /＃361](https://github.com/filecoin-project/go-fil-markets/issues/361)) 。miner 无需采取任何行动。 |
| StorageDealError PublishStorageDeals: found message with equal nonce as the one we are looking for | [尚未明确。] 我们怀疑链验证错误                                                                                                                                                                                                                                                                                                                                                                | miner 无需采取任何行动。                                                                                                                                                                                               |
| ClientMinerQueryOffer - Retrieval query offer errored: get cid info: No state for /bafk2bz...      | [尚未明确。]                                                                                                                                                                                                                                                                                                                                                                                   | miner 无需采取任何行动。                                                                                                                                                                                               |

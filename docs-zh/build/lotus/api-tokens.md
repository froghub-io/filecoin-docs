---
title: 'Lotus: API token'
description: '本指南解释了如何为 Lotus API 生成新的令牌，以及可以为每个令牌附加哪些权限。'
breadcrumb: 'API token'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

[[TOC]]

## 获取 tokens

任何想要与 [API endpoints](../../reference/lotus-api.md) 通讯的客户端 (由 Lotus Node 或 Lotus Miner 公开) 都需要 token。 Token 可以通过如下方式获得。

Lotus 节点:

```sh
lotus auth create-token --perm <read,write,sign,admin>
```

Lotus Miner:

```sh
lotus-miner auth create-token --perm <read,write,sign,admin>
```

注意，Lotus 守护进程和/或 Lotus Miner 需要在后台运行！

## 权限

有不同的权限可供选择：

- `read` - 读取节点状态, 不含隐私数据
- `write` - 写入本地存储 / 链, 和 `read` 权限.
- `sign` - 使用存储在钱包中的私钥进行签名, `read` 和 `write` 权限.
- `admin` - 管理权限, `read`, `write`, 和 `sign` 权限.

## Default tokens

请注意，如何运行 `lotus auth create-token` 实际上是取决于如何触发对后台运行的 Lotus 守护进程公开的 API 请求的。 但是 Lotus 应用程序(作为客户机)使用了一个默认的预生成的 API token，这个 token 在本地可用， 位于 `~/.lotus/token`.

同样适用于 `lotus-miner`.

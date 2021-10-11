---
title: 'Lotus: 通过IPFS导入数据'
description: '本指南将向您展示如何使用Lotus将IPFS托管的数据直接添加到Filecoin网络。'
breadcrumb: '通过IPFS导入数据'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

Lotus 支持处理[IPFS](https://ipfs.io)中存储的数据, 无需将其重新导入 lotus。

要启用此集成，你需要有一个[IPFS 守护进程运行在后台](https://docs.ipfs.io/how-to/command-line-quick-start/#take-your-node-online).

然后， 打开 `~/.lotus/config.toml` (或者如果你手动设置 `$LOTUS_PATH`, 在哪个目录下) 查找客户字段，这只 UseIpfs 为 true。

```shell
[Client]
UseIpfs = true
```

在重启 lotus 守护进程之后, 你应该能够 [处理](store-data.md) IPFS 节点中的数据:

```shell
$ ipfs add -r SomeData
QmSomeData
$ ./lotus client deal QmSomeData t01000 0.0000000001 80000
```

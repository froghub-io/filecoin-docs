---
title: 探索网络
description: 有几种方法可以探索并从Filecoin网络中获得见解
breadcrumb: 探索网络
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

[[TOC]]

## 区块浏览器

| Name                                                 | Screenshot                                                                |
| ---------------------------------------------------- | ------------------------------------------------------------------------- |
| [Filscan](https://filscan.io/)                       | <img src="./images/explore-the-filecoin-chain/filscan.png" width="400">   |
| [Filscout](https://filscout.io/)                     | <img src="./images/explore-the-filecoin-chain/filscout.png" width="400">  |
| [Filfox](https://filfox.io/)                         | <img src="./images/explore-the-filecoin-chain/filfox.png" width="400">    |
| [Filplorer](https://filplorer.com/)                  | <img src="./images/explore-the-filecoin-chain/filplorer.png" width="400"> |
| [1475 Explorer](https://1475ipfs.com/#/blockBrowser) | <img src="./images/explore-the-filecoin-chain/1475ipfs.png" width="400">  |

## Lotus

一旦您 [使用 Lotus 设置](lotus/README.md) 您可以使用命令行查询有关网络的信息。

获取区块头部:

```sh
lotus chain head
```

打印区块:

```sh
lotus chain getblock <block_cid>
```

打印消息信息:

```sh
lotus chain getmessage <message_cid>
```

有关其他链相关命令检查:

```sh
lotus chain --help
```

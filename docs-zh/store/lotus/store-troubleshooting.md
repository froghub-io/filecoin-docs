---
title: 'Lotus:节点故障排除'
description: '此页面通过列出用户在使用Lotus存储数据时可能会遇到的一些最常见的错误，并提供了一些故障排除建议。'
breadcrumb: '节点故障排除'
---

# # {{ $frontmatter.title }}

{{ $frontmatter.description }}

::: callout
**在存储数据时，您是否成功解决了其他与 Lotus 相关的问题？** 请通过底部的链接编辑后提交到本业！
:::

[[TOC]]

## 错误：无法开始交易

```sh
WARN  main  lotus/main.go:72  failed to start deal: computing commP failed: generating CommP: Piece must be at least 127 bytes
```

此错误意味着文件的最小大小为 127 字节。

## 错误：检索过程中响应的文件为 0kb

这意味着要检索的文件可能尚未封装，因此无法检索。

miner 可以使用以下命令确认封装进度：

```sh
lotus-miner sectors list
```

当封装完成后， `pSet: NO` 会变成 `pSet: YES`.

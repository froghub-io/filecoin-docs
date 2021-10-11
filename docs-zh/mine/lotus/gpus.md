---
title: 'Lotus Miner: 自定义GPU'
description: '本指南说明了如何对Lotus Miner未明确支持的GPU模型进行基准测试和测试。'
breadcrumb: '自定义GPU'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

[[TOC]]

已知可支持的 GPU 列表在 [硬件要求](../hardware-requirements.md) 中可查看。

## 启用自定义 GPU

如果要测试未明确支持的 GPU，请设置以下环境变量:

```sh
export BELLMAN_CUSTOM_GPU="<NAME>:<NUMBER_OF_CORES>"
```

这是尝试使用有 1536 核心数的 GeForce GTX 1660 Ti 的示例:

```sh
export BELLMAN_CUSTOM_GPU="GeForce GTX 1660 Ti:1536"
```

::: tip
要获取 GPU 的内核数量，您需要检查卡的规格。
:::

## 测试 GPU 是否可被使用

首先，要查看 GPU 利用率，请在一个终端中运行 `nvtop`, 然后在另一个终端中，运行 [benchmarking tool](benchmarks.md) 以模拟封装小尺寸扇区:

```sh
./lotus-bench sealing --sector-size=2KiB
```

此过程使用了大量的 GPU，通常需要约 4 分钟才能完成。 如果在整个过程中您没有在 Lotus 的 nvtop 中看到任何活动，则可能是您的 GPU 配置有误。

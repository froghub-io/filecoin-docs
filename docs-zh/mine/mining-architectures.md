---
title: '挖掘架构'
description: 'Filecoin允许任何人设置挖掘业务以参与全球分布式存储市场。'
breadcrumb: '挖掘架构'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

本节提供Filecoin Storage挖掘设置的示例，以指导miner在获取和建立他们的挖掘基础设施时规划和做出正确的选择。任何存储挖掘设置必须满足[最小硬件需求](hardware-requirements.md)。

::: callout
我们正在努力改进这一部分。如果您想共享您的挖掘设置，请使用底部的链接来编辑页面！
:::

[[TOC]]

## 协议实验室示例架构

以下 [Lotus](lotus/README.md) Miner 设置是[Guide to Filecoin Storage Mining](https://filecoin.io/blog/filecoin-guide-to-storage-mining/) 博客发布的一部分内容. 可以从[此处](https://filecoin.io/vintage/mining-hardware-config-testnet-v3.pdf) 下载 PDF:

| 硬件单元            | CPU 型号                      | GPU 型号                   | 内存       | 硬盘                        | 流程                                                        | 注释                                                                            |
| ------------------- | ----------------------------- | -------------------------- | ---------- | --------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 存储 Miner+节点     | AMD Epyc 7402 (24 cores)      | Nvidia Quadro RTX 6000     | 128-256GB  | Unspecified                 | 1x lotus <br /><br />1x lotus-miner                         | Miner 将封装功能委托给下面的 Worker。                                           |
| PC1 workers         | AMD Epyc 7F32 DP/UP (8 cores) | -                          | 128-256GiB | 6 x 1-2TiB SSD scratch disk | 6x lotus-worker                                             | 并行运行 6 个[Lotus seal workers](lotus/seal-workers.md) 仅在 PreCommit1 阶段。 |
| PC2, Commit workers | AMD Epyc 7402 (24 cores)      | 2 x Nvidia Quadro RTX 6000 | 256GiB     | 2-4TiB SSD scratch disk(s)  | 1x lotus-worker (PC2) <br /><br /> 1x lotus-worker (Commit) | 一个[worker](lotus/seal-workers.md) 致力于 PreCommit2，另一个致力于 Commit 阶段 |
| Storage miner + Node | Intel Xeon Platinum Processor 8358 (32 cores) | Nvidia GeForce RTX 3080 series or RTX 3090 | 128-256 GB | Unspecified | 1x lotus<br><br>1x lotus-miner | miner将密封功能委托给下面的工人. |
| PC1 workers | Intel Xeon Gold Processor 6346 (16 cores) | - | 128-256 GiB | 6 x 1-2 TiB SSD scratch disk | 6x lotus-worker | 仅在PreCommit1阶段并行运行6个Lotus seal工作程序. |
| PC2, Commit workers | Intel Xeon Platinum Processor 8358 (32 cores) | 2x Nvidia GeForce RTX 3080 series or RTX 3090 | 256 GiB | 2-4 TiB SSD scratch disk(s) | 1x lotus-worker (PC2)<br><br>1x lotus-worker (Commit) | 1个worker 致力于PreCommit2 and 另一个致力于Commit phase. |

---
title: 'Lotus: 非常大的文件'
description: '本指南对存储超大文件（超过1 TiB）进行了更深入的介绍，提供了更多有关如何存储数据的见解，并给出最佳实践的案例。'
breadcrumb: ''
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

本指南会默认您熟悉[常规存储交易流程](store-data.md).

[[TOC]]

## 最大化每个扇区的存储

在 Filecoin 中, **文件必须小于存储文件的扇区**.

通常，扇区被错误地描述为 32 GB 或 1 兆字节，实际上，它们分别是 32gibibytes（GiB）和 1mebibyte（MiB）。 因此，32GiB 扇区具有 2 ^ 30 字节（1,073,741,824 字节），而不是 1,000,000,000 字节。

但是， **并非扇区中的所有空间都可以有效利用**. 对于每 256 位，会保留 2 位用于证明过程。 因此，该扇区的可用规模为：

<center>
<b>扇区大小 * 254 / 256**</b>
</center>

这是一个快速计算表格：

| 扇区大小 | 可用大小             |
| -------- | -------------------- |
| 2KiB     | 2,032 bytes          |
| 8MiB     | 8,323,072 bytes      |
| 512MiB   | 532,676,608 bytes    |
| 32GiB    | 34,091,302,912 bytes |
| 64GiB    | 68,182,605,824 bytes |

## 处理离线数据传输

Filecoin 的离线数据传输功能更推荐用于 PB 级及更大体量的数据的传输。 这使拥有非常庞大的数据集的用户可以离线完成数据传输步骤(例如，通过将硬盘从客户端运送到存储 miner 的方式)，同时存储交易继续按预期在链上进行。

它是通过存储交易命令上的标志实现的，该标志告诉客户端不要通过网络传输数据，并改为向 miner 提供一个 CID（描述数据的唯一标识符），miner 必须匹配该 CID 以达成协议。这为客户端节点提供了如何灵活性设置交易-例如，将一个数据位于硬盘上的特定位置传递给 miner，以供他们用来生成分段 CID 的数据。

### 生成唯一的 CID

1. 无需导入，使用 Lotus 客户端生成输入的 CAR 文件：

```sh
lotus client generate-car <input_path/filename> <output_path/data.car>
```

2. 使用 Lotus 客户端 CID：

```sh
lotus client commP <inputCarFilePath>
```

### 离线将数据传输到 miner

这可以通过多种方式完成，例如将硬盘从客户端运送到存储 miner。

### 最后：miner 的角色

miner``可以导入数据并手动用以下命令处理：

```sh
lotus-miner storage-deals import-data <dealCid> <carFilePath>
```

一旦第一个时空证明（PoSt）达到链上，存储交易就被视为有效。

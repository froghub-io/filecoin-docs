---
title: '硬件要求'
description: 'Filecoin挖掘的最低硬件要求。'
breadcrumb: '硬件要求'
---

# {{ $frontmatter.title }}

Filecoin 挖矿的硬件要求与 “封装” 一个扇区并为每个封装扇区（_WindowPoSt_）生成常规的“时空证明”所需的计算资源联系在一起。

这些操作在计算上很昂贵，取决于操作员使用的扇区大小。 由运行 Miner 的 [Filecoin network](https://network.filecoin.io) 使用- nerpa，testnet，mainnet 等 -。 以供参考, 下面列出的要求对应于 mainnet 和一些 testnets (_calibration_, _nerpa_)使用的 **32GiB 扇区**.

不同的 Filecoin Miner 实现可能会不同的分配封装任务，例如，使用除 Miner 之外的其他 Worker。假设所有挖掘操作均在同一台机器上进行，以下是“一般”要求。每个操作所需的资源将在下面详细介绍。有关硬件类型和用法的具体示例，请参见[挖掘架构](mining-architectures.md).

[[TOC]]

## 通用硬件要求

### CPU

Miner 将需要 **8 个核心及以上的 CPU**.

我们强烈建议使用支持 _Intel SHA 扩展_: Zen 微体系结构以来为 AMD，Ice Lake 以后为 Intel。 缺少 SHA 扩展会导致速度显着下降。

### 内存

最少需要 **128 GiB 的内存** 。**应该** 搭配 **256 GiB 的 NVMe SSD** 固态硬盘。

### GPU

**推荐** 使用功能强大的 GPU，因为它可以显着加快 SNARK 计算。请参阅以下有关可利用 GPU 优势的操作。

[可支持的 GPU 的权威列表](https://github.com/filecoin-project/bellman#supported--tested-cards) 在[Bellman 存储库](https://github.com/filecoin-project/bellman#supported--tested-cards).

需要手动启用其他 GPU 模型 ([Lotus 说明](lotus/gpus.md)).

::: warning
在同一台计算机上混合使用 AMD 和 Nvidia GPU 会导致 OpenCL 问题，因此应避免使用
:::

### 硬盘

慢速磁盘会严重影响 Miner 操作的性能。例如，在封装过程中，32GiB 会扩展到〜480GiB。 Filecoin 网络参数超过 100GiB，在 Miner 启动期间需要读取和验证。如上所述，需要使用快速交换驱动器或文件来解决 RAM 不足的问题。

出于这个原因，建议最少量的基于 1TiB NVMe 的磁盘空间用于缓存存储。该磁盘应在封装过程中用于存储数据，缓存 Filecoin 参数并用作常规的临时存储位置。

还需要用于最终存储"sealed sectors"，Lotus 链等的其他硬盘驱动器。

## 具体操作要求

如上所述, Miner 必须执行不同性质的操作，这些操作在使用 CPU 和 GPU 资源方面会有所不同。下表显示了如何根据封装阶段或进行中的证明计算来利用资源:

| 操作方式                   | CPU 使用情况                   | GPU 使用情况 | 内存 (32Gib sectors) | 注释                                                                                                                                                                                               |
| -------------------------- | ------------------------------ | ------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sealing: preCommit phase 1 | Yes (1 core or 1 core-complex) | No           | 128GiB               | PoRep SDR 编码. 不适合并行化。核心使用量取决于 [`FIL_PROOFS_USE_MULTICORE_SDR`](https://github.com/filecoin-project/rust-fil-proofs/). 另请参考 [Lotus seal workers guide](lotus/seal-workers.md). |
| Sealing: preCommit phase 2 | Yes (when no GPU, all cores)   | Yes          | 128GiB               | 使用 Poseidon hashing 算法生成 Merkle 树, 仅 CPU 时速度较慢。                                                                                                                                      |
| Sealing: commit phase 1    | Yes (all cores)                | No           | -                    |                                                                                                                                                                                                    |
| Sealing: commit phase 2    | Yes (when no GPU, all cores)   | Yes          | ~ 192GiB             | 仅 CPU 时速度慢。                                                                                                                                                                                  |
| Unsealing                  | Yes (1 core)                   | No           | 128GiB               |                                                                                                                                                                                                    |
| Proving _WindowPoSt_       | Yes (all cores, when no GPU)   | Yes          | -                    | _WindowPoSts_ 必须在 30 分钟内提交。当没有 GPU 可用时，CPU 核数越多，速度越快                                                                                                                          |
| Proving _WinningPoSt_      | Yes                            | No           | -                    | _WinningPoSt_ 是一种强度较低的计算。必须在 25 秒内完成。                                                                                                                                           |

请注意在 [Lotus](lotus/README.md) 实现允许配置和发特定的封装阶段给 [Lotus 工作者们](lotus/seal-workers.md).

## 关于硬件要求

在可预见的未来，以上需求不会增加，花在硬件上的钱应该为用户提供多年可靠的服务，而其支付的费用是其自身的数倍。

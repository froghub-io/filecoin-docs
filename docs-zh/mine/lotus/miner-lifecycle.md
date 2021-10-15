---
title: 'Lotus Miner: 生命周期'
description: '如何在Lotus Miner上安全地执行维护。'
breadcrumb: 生命周期
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

这些操作通常与维护和升级有关。鉴于期望 miner 在运行长时间且昂贵的操作时以连续的方式向链条提交证明，因此重要的是，操作员必须熟悉如何管理 miner 生命周期中的某些事件，以便最大程度地保证执行这些事件。

[[TOC]]

## 安全重启 miner 守护进程

关闭 miner 并重新启动它的过程很复杂。要想在所有保证中都能做到这一点，必须考虑以下几个因素：

- miner 计划脱机多长时间。
- miner 证明期限的存在和分布。
- 开放的支付渠道和正在进行的检索交易的存在。
- 正在进行的封装操作。

### 减少离线时间

考虑到需要不断向网络发送证明，miner 应该尽可能少地处于离线状态。 _脱机时间_ 包括计算机完全重新启动 miner 守护程序所花费的时间。由于这些原因，我们建议您按照以下步骤操作：

1. 重新启动 Lotus Miner 进程之前，请重新编译并安装所有升级。
1. 确保证明参数位于快速存储驱动器（例如 NVMe 驱动器或 SSD）上。这些是首次启动miner时下载的证明参数，并保存到`var/tmp/filecoin-proof-parameters`，或`$FIL_PROOFS_PARAMETER_CACHE`（如果已定义环境变量）中。

### 确保当前截止日期的证明已发送

在仍有待处理操作的情况下关闭 miner 可能会导致 miner[惩罚](../slashing.md)。通过运行`lotus-miner proving info`来检查是否有未执行操作。如果任何的过去的期限显示 _拦截高度_，请不要重新启动。

在以下示例中， `Deadline Open`为 454, 早于`Current Epoch`500. 该miner不应关闭或重新启动：

```shell
$ lotus-miner proving info

Miner: t01001
Current Epoch:           500
Proving Period Boundary: 154
Proving Period Start:    154 (2h53m0s ago)
Next Period Start:       3034 (in 21h7m0s)
Faults:      768 (100.00%)
Recovering:  768
Deadline Index:       5
Deadline Sectors:     0
Deadline Open:        454 (23m0s ago)
Deadline Close:       514 (in 7m0s)
Deadline Challenge:   434 (33m0s ago)
Deadline FaultCutoff: 384 (58m0s ago)
```

在下一个示例中，可以安全重启 miner，因为`Deadlines`没有早于`Current Epoch`。您需要大约 45 分钟的时间，miner 才能恢复在线以声明故障。这被称为`Deadline FaultCutoff`。如果 miner 没有故障，那么您大约有一个小时的时间。

```shell
$ lotus-miner proving info

Miner: t01000
Current Epoch:           497
Proving Period Boundary: 658
Proving Period Start:    658 (in 1h20m30s)
Next Period Start:       3538 (in 25h20m30s)
Faults:      0 (0.00%)
Recovering:  0
Deadline Index:       0
Deadline Sectors:     768
Deadline Open:        658 (in 1h20m30s)
Deadline Close:       718 (in 1h50m30s)
Deadline Challenge:   638 (in 1h10m30s)
Deadline FaultCutoff: 588 (in 45m30s)
```

`proving info`示例显示了当前证明窗口和截止日期的信息。如果您希望看到任何即将截止的截止日期，可以使用：

```shell
$ lotus-miner proving deadlines
```

每行对应一个截止日期（30 分钟，涵盖 24 小时）。当前的已标记。有时不必向链提交任何证明的时间这对于查找一天中的 miner 很有用。

### 检查并暂时禁用交易

在停止 miner 之前，请检查交易状态，以确保 miner 没有正在接收客户的数据或正在检索客户的数据：

```shell
lotus-miner storage-deals list
lotus-miner retrieval-deals list
lotus-miner data-transfers list
```

为了防止在等待当前截止日期之前完成新交易时，可以禁用存储和检索交易。这样可以确保 miner 在关闭时不会发现自己处于交易进行中：

```shell
lotus-miner storage-deals selection reject --online --offline
lotus-miner retrieval-deals selection reject --online --offline
```

miner 完成重启后，可以使用以下方式重置交易：

```shell
lotus-miner storage-deals selection reset
lotus-miner retrieval-deals selection reset
```

### 检查正在进行的封装操作

要获得当前扇区和状态的概述，请运行：

```shell
lotus-miner sectors list
```

任何正在进行的封装操作将从最后一个检查点重新开始，通常对应于当前封装阶段的开始。鉴于封装工作非常耗时，因此在重新启动miner之前，您应该等待接近完成的某些阶段。

### 重启 miner

考虑到上述所有因素，您可以决定关闭miner的最佳时机：

```shell
lotus-miner stop
# When using systemd
# systemctl stop lotus-miner
```

您可以根据需要尽快重启miner。worker 不需要重新启动，因为他们会在miner恢复运行时自动重新连接到该miner。但是，如果要在关闭miner的同时升级节点，则需要重新启动机器。

## 重启 worker

Lotus [seal 工作者](seal-workers.md) 可以随时重启， 但如果它们处于封装步骤之一的中间，则操作将再次开始（从最后一个检查点开始）。

::: warning
在从头开始完全封装之前 (_pre-commit1_ 阶段)，最多可以尝试三种操作来完成 _precommit2_ 操作
:::

## 更改存储位置

如果您希望将与 miner 相关的存储位置更改为其他路径，对于 miner 或 seal 工作人员, 确保 Lotus miner 和所有 seal 工作人员都知道新位置。

```sh
lotus-miner storage list
```

上面的命令将为您提供[miner 已知的存储位置](custom-storage-layout.md) 的概述。 此信息存储在 `~/.lotusminer/storage.json` (或 `$LOTUS_MINER_PATH/storage.json`（如果已定义）)。Lotus seal 工作者将所有数据存储在`~/.lotusworker`文件夹(或 `$LOTUS_WORKER_PATH`（如果已定义）)中.

如果要更改 Lotus Miner 的任何存储位置，请执行以下步骤：

1. 将您的 miner 设置为拒绝任何新的存储和检索交易，以便在复制期间不修改存储。
2. 在miner运行时，**照原样**复制数据，将其保留在原始位置。由于这通常涉及移动大量存储，因此需要时间。在此期间，miner 将继续执行其任务.
3. 复制数据后，请按照上述建议[停止采miner](#safely-restarting-the-miner-daemon) 。
4. 编辑`storage.json`使用新的数据位置，并使 miner 无法使用旧数据（通过重命名或卸载），以确保启动时不再使用该数据。
5. 启动 miner。
6. 验证一切工作正常。如果是这样，您可以丢弃旧副本。

如果希望在保持当前容量的同时扩展存储空间，你始终可以使用额外的储存空间[增加到 Lotus Miner](custom-storage-layout.md) (请参考 `--help`).

如果要更改任何 lotus worker 的存储位置：

1. 停止 Lotus Worker。
2. 将数据移动到新位置。
3. 设置相应的`$LOTUS_WORKER_PATH`。
4. 再次启动该工作程序。

worker 在停止之前正在执行的任何操作都将从最后一个检查点（可以重新开始的点开始，这可能与当前封装阶段的开始相对应）重新开始。

::: warning
当前不支持在不同工作线程之间移动数据。将工作人员存储文件夹移动到另一台工作人员计算机将无法正常工作，因为 miner 希望正在进行的封装操作由最初分配给他们的工作人员完成。
:::

## 使用不同的 Lotus 节点

如果您打算在 miner 使用的 Lotus 节点上运行维护，或者由于当前节点不起作用而需要故障转移到另一个 Lotus 节点，请执行以下步骤：

1. [停止 miner](#safely-restarting-the-miner-daemon)
2. 设置`FULLNODE_API_INFO`环境变量到新节点的位置：

```sh
export FULLNODE_API_INFO=<api_token>:/ip4/<lotus_daemon_ip>/tcp/<lotus_daemon_port>/http
```

请按照以下步骤学习[如何取得 token](docs-zh/build/lotus/api-tokens.md).

3. 如果尚未导出钱包，请立即将其从旧节点导出，然后将其重新导入新的 Lotus 节点。
4. 启动 miner。它现在应该与新的 Lotus 节点通信，并且由于它与旧的 Lotus 节点具有相同的钱包，因此它应该能够代表 miner 执行必要的操作。

::: callout
确保新的 Lotus 节点已完全同步。
:::

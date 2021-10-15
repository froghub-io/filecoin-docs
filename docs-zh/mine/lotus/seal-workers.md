---
title: 'Lotus Miner: seal workers'
description: 'Lotus Worker是一个独立的应用程序，可以使用它将密封过程的各个阶段卸载到不同的机器或进程。 本指南解释如何设置一个或多个Lotus Workers。  '
breadcrumb: 'Lotus Workers'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

当 **Lotus Miner** 可以自己运行每个密封阶段(使用默认配置), Lotus workers 就可以创建 _sealing pipeline_ 从而提高资源利用率并使主 miner 从 CPU 密集型任务中解放出来，这样它就可以专注于执行*WindowPoSTs*和*WinningPoSTs*并将其提交给链。

[[TOC]]

## workers 的资源配置

每个**Lotus Worker**可以运行多个任务，这取决于您的硬件资源。 每个槽被称为_window_。 最终的数量由可用的铁芯数量和分配给它的密封阶段的要求决定。 这意味着8核CPU和单个GPU上的单个worker最多只能运行:

-任务将使用的CPU线程数。  
-良好性能所需的最小RAM数量。  
-运行任务所需的最大RAM数量，系统可以将部分RAM交换到磁盘，而性能不会受到太大影响。  
-系统是否可以使用图形处理器。

### 任务资源表

默认的资源表位于[resources.go](https://github.com/filecoin-project/lotus/blob/master/extern/sector-storage/resources.go#L47)中，可以对其进行编辑以调整调度行为，以更好地适应特定的密封集群。  

默认资源值表。 其中一些值相当保守:

|扇区大小|任务类型|线程|最小内存|最小磁盘空间| GPU |  
|-------------|------------|---------|---------|------------|------------|  
| 32G | AddPiece | 1* | 4G | 4G | |  
|     | PreCommit1 | 1** | 56G | 64G | |  
|     | PreCommit2 | 92%*** | 15G | 15G | If Present |  
|     | Commit1 | 0**** | 1G | 1G | |  
|     | Commit2 | 92%*** | 32G+30G | 32G+150G | If Present |  
| 64G | AddPiece | 1* | 8G | 8G | |  
|     | PreCommit1 | 1** | 112G | 128G | |  
|     | PreCommit2 | 92%*** | 30G | 30G | If Present |  
|     | Commit1 | 0**** | 1G | 1G | |  
|     | Commit2 | 92%*** | 64G+60G | 64G+190G | If Present |  

\* AddPiece可以使用多个线程，这个值可能会在不久的将来改变\
** 当使用 `FIL_PROOFS_USE_MULTICORE_SDR=1` env var时，PreCommit1可以使用多个核(最多的核共享L3缓存的数量)\
*** 取决于可用线程的数量，这个值意味着:

```
 12  * 0.92 = 11
 16  * 0.92 = 14
 24  * 0.92 = 22
 32  * 0.92 = 29
 64  * 0.92 = 58
 128 * 0.92 = 117
```

**** 就CPU时间而言，Commit1步骤非常便宜，并且阻塞了Commit2步骤。 将它分配给零线程将使它更有可能以更高的优先级调度。

Unseal任务与PreCommit1任务具有相同的资源用途。

### 资源窗口(Resource windows)

调度器使用了资源窗口的概念，以防止需要大量资源的任务被资源需求较小的任务占用。  

资源窗口只是一个密封任务的桶，当没有任务运行时，给定的工作人员可以基于工作人员可用的资源并行运行这些任务。  

在调度程序中，每个worker有:
-调度窗口—两个资源窗口，用于分配从全局队列执行的任务  
-准备窗口-一个准备执行任务的资源窗口(例如，如果需要，提取扇区数据)  
-执行窗口—当前执行任务的一个资源窗口

当任务到达全局调度队列时，调度器将寻找空的调度窗口，并根据一些因素，如worker是否已经直接访问扇区数据、worker支持的任务类型、worker是否有用于扇区数据的磁盘空间、 任务优先级-任务可以分配给调度窗口。  

在调度窗口被许多任务填满后，它被发送给worker进行处理。 worker将从调度窗口中取出任务，并开始在准备窗口中准备它们。 准备步骤完成后，任务将在执行窗口中执行。  

当worker完全处理了一个调度窗口后，它被发送回全局调度程序以获得更多的密封任务。

### 任务优先级

当调度程序决定运行哪些任务时，它会考虑运行特定任务的优先级。

有两个优先级层——高优先级，用于执行成本低但会阻塞其他操作的任务，而普通优先级用于所有其他任务。 默认优先级定义在下表中。  

| 任务类型    | 权重 |
|--------------|----------|
| AddPiece     | 6        |
| PreCommit1   | 5        |
| PreCommit2   | 4        |
| Commit2      | 3        |
| Commit1      | 2        |
| Unseal       | 1        |
| Fetch        | -1       |
| ReadUnsealed | -1       |
| Finalize     | -2       |

- 数字越小，优先级越高。  
- 负数表示优先级最高。

比较任务优先级时:  
- 优先级高的任务优先考虑  
- 有交易的扇区被认为是第二(交易越多优先级越高)  
- 如果相等，则根据表中的优先级选择任务  
- 如果以上相同，选择扇区数较低的扇区(这可以在向链提交消息时略微优化gas使用)

## 安装

::: callout
在密封过程中，大量的数据会在workers之间移动/复制，因此他们之间必须有良好的网络连接。
:::

在跟随[安装指南](../../get-started/lotus/installation.md)安装其他软件的时候，`lotus-worker`应用程序应该已经同时被构建并安装了。为了简单说明，我们建议在将要运行 Lotus Workers 的计算机中遵循相同的步骤(即使在该设备中未使用 Lotus Miner 和 Lotus 守护程序)。

## 设置 Miner

Lotus miner 需要准备好接受 workers 的 API 连接。

### 允许外部连接 minerAPI

将 `ListenAddress` 和 `RemoteListenAddress` 设置为非本地接口的 IP（或 `0.0.0.0`）如 [本文档](miner-configuration.md#api-section). worker 的机器[检查与 RemoteListenAddress 的连接](connectivity.md)。

### 获得身份验证令牌

```shell
lotus-miner auth api-info --perm admin
```

Lotus Worker将需要这个令牌来连接到 miner 。更多信息请查看 [API docs](../../build/lotus/api-tokens.md)。写下输出，以便在下一步使用。

### 配置 miner 封装功能

The Lotus Miner 本身就是一个 worker ，将像其他任何 worker 一样为封装操作做出贡献。 根据您希望让你的 workers 执行封装过程的哪个阶段，您可以选择配置 miner 将直接执行哪个阶段。这是在 miner 的 `config.toml` 中的 `Storage`部分里配置的：

```toml
[Storage]
  AllowAddPiece = true
  AllowPreCommit1 = true
  AllowPreCommit2 = true
  AllowCommit = true
  AllowUnseal = true
```

如果要将这些操作中的任何一个完全分配给 workers，将该操作设置为 `false`。

## 启动 Lotus workers

### 环境变量

确保 workers 在运行时可以访问以下环境变量。这些配置类似于 Miner daemon 运行时使用的[explained in the setup guide](miner-setup.md):

```
# MINER_API_INFO as obtained before
export TMPDIR=/fast/disk/folder3                    # used when sealing
export MINER_API_INFO:<TOKEN>:/ip4/<miner_api_address>/tcp/<port>/http`
export MARKETS_API_INFO:<TOKEN>:/ip4/<miner_api_address>/tcp/<port>/http`
export BELLMAN_CPU_UTILIZATION=0.875      # optimal value depends on exact hardware
export FIL_PROOFS_MAXIMIZE_CACHING=1
export FIL_PROOFS_USE_GPU_COLUMN_BUILDER=1 # when GPU is available
export FIL_PROOFS_USE_GPU_TREE_BUILDER=1   # when GPU is available
export FIL_PROOFS_PARAMETER_CACHE=/fast/disk/folder # > 100GiB!
export FIL_PROOFS_PARENT_CACHE=/fast/disk/folder2   # > 50GiB!

# The following increases speed of PreCommit1 at the cost of using a full
# CPU core-complex rather than a single core.
# See https://github.com/filecoin-project/rust-fil-proofs/ and the
# "Worker co-location" section below.
export FIL_PROOFS_USE_MULTICORE_SDR=1
```

::: tip
当初始获取参数文件时，记得设置[`IPFS_GATEWAY`变量时，从中国运行](tips-running-in-china.md)  
:::

### 运行 worker

```shell
lotus-worker run <flags>
```

上面的命令将启动 worker。根据您希望 worker 去执行的操作以及它所运行的硬件，您将要指定 worker 在哪些封装阶段可用:

```
   --addpiece                    enable addpiece (default: true)
   --precommit1                  enable precommit1 (32G sectors: 1 core, 128GiB RAM) (default: true)
   --unseal                      enable unsealing (32G sectors: 1 core, 128GiB RAM) (default: true)
   --precommit2                  enable precommit2 (32G sectors: multiple cores, 96GiB RAM) (default: true)
   --commit                      enable commit (32G sectors: multiple cores or GPUs, 128GiB RAM + 64GiB swap) (default: true)
```

一旦 worker 正在运行，它应当它应该连接到 Lotus miner。你可以通过以下方法来证明：

```shell
$ lotus-miner sealing workers
Worker 0, host computer
        CPU:  [                                                                ] 0 core(s) in use
        RAM:  [||||||||||||||||||                                              ] 28% 18.1 GiB/62.7 GiB
        VMEM: [||||||||||||||||||                                              ] 28% 18.1 GiB/62.7 GiB
        GPU: GeForce RTX 2080, not used

Worker 1, host othercomputer
        CPU:  [                                                                ] 0 core(s) in use
        RAM:  [||||||||||||||                                                  ] 23% 14 GiB/62.7 GiB
        VMEM: [||||||||||||||                                                  ] 23% 14 GiB/62.7 GiB
        GPU: GeForce RTX 2080, not used
```

### Miner 和 worker 一起工作

您可以在与 _Lotus Miner_ 相同的机器上运行 _Lotus Worker_。 这有助于管理进程之间的优先级，或更好地为每个任务分配可用的cpu。 为了避免冲突，我们建议禁用miner密封配置中的所有任务类型。

另外，要注意密封进程使用的本地资源(特别是CPU)。 windowpost是CPU密集型的，需要定期由miner提交。 如果一个miner正在并行执行其他cpu绑定的密封操作，它可能无法及时提交windowpost，因此[丢失抵押品](../slashing.md)。 出于这个原因，我们建议将可用的CPU核和密封阶段仔细分配给Lotus miner和Lotus Workers。

请注意，如果您共同定位miner和worker(s)，您不需要打开miner API，它可以一直监听本地接口。

### Lotus Worker 协同定位

在大多数情况下，每台机器只能运行一个Lotus Worker，因为 _Lotus Worker_ 将尝试使用所有可用资源。 在一个操作系统上下文中运行多个Lotus Workers将导致资源分配问题，这将导致调度程序分配比可用资源更多的工作。  

唯一的情况下每台机器运行多个worker可能是一个好主意,当有多个可用的GPU, lotus目前只支持一个GPU -在这种情况下,建议与worker重叠运行在单独的容器资源(CPU核分离,单独的内存分配,单独的GPU)

#### 分离Nvidia gpu

当使用专有的Nvidia驱动程序时，可以选择Lotus将使用哪个GPU设备，并使用`Nvidia_VISIBLE_DEVICES=[device number]`环境变量。

设备编号可以通过`nvidia-smi -L`命令获取。
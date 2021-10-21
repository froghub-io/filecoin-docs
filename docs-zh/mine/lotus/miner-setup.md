---
title: 'Lotus Miner: 建立一个高性能的miner'
description: '本指南描述了配置Lotus miner进行生产的必要步骤。'
breadcrumb: 'miner设置'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

::: warning
仅当您完全满足要在其中进行挖矿的网络的[最低 ​​ 硬件要求](../hardware-requirements.md) 时，才能进行挖矿。由于采矿过程在多个方面对机器要求很高，并且依赖于精确的配置，我们强烈建议您具备 Linux 的管理经验。
:::

[[TOC]]

## 先决条件

在尝试遵循本指南之前：

- 确保您符合[最低硬件要求](../hardware-requirements.md).
- 确保已按照说明进行操作[安装 Lotus 套件](../../get-started/lotus/installation.md)并确保您使用以下命令构建了 Lotus["Native Filecoin FFI"](../../get-started/lotus/installation.md#native-filecoin-ffi)。安装完成后，`lotus`, `lotus-miner`和`lotus-worker`将会被安装。
- 确保您的 Lotus 节点正在运行，因为 miner 将与其通信并且否则无法正常工作。
- 如果你在中国，阅读[在中国运行的技巧](tips-running-in-china.md)的第一页.

::: callout
请注意：如果您决定跳过以下任何部分，则将无法正常工作！仔细阅读并实践。
:::

## 在开始 miner 之前

在尝试启动miner之前，请遵循以下步骤。过早运行' lotus-miner '将导致错误。

### 安装额外的依赖关系

如果你使用的是Nvidia的GPU，请安装“Nvidia -opencl-icd”。大多数Linux发行版的包管理器中都包含这个包:

```shell
sudo apt update -y && sudo apt install -y nvidia-opencl-icd -y
```

### 性能调整

建议在您的环境中设置以下环境变量，以便**每次启动任何 Lotus 应用程序** (含义:守护程序启动时):

```sh
# See https://github.com/filecoin-project/bellman
export BELLMAN_CPU_UTILIZATION=0.875
```

`BELLMAN_CPU_UTILIZATION` 是一个可选变量，用于指定与GPU并行的多指数计算中要移到CPU的比例。这是为了让所有的硬件都被占用。这个区间必须是`0`和`1`之间的数字。值`0.875`是一个很好的起点，但如果你想要一个最佳的设置，你应该进行实验。不同的硬件设置会导致不同的最佳值。省略这个环境变量也可能是最佳的。

```sh
# See https://github.com/filecoin-project/rust-fil-proofs/


export FIL_PROOFS_MAXIMIZE_CACHING=1 # More speed at RAM cost (1x sector-size of RAM - 32 GB).
export FIL_PROOFS_USE_GPU_COLUMN_BUILDER=1 # precommit2 GPU acceleration
export FIL_PROOFS_USE_GPU_TREE_BUILDER=1

# The following increases speed of PreCommit1 at the cost of using a full
# CPU Core-Complex rather than a single core. Should be used with CPU affinities set!
# See https://github.com/filecoin-project/rust-fil-proofs/ and the seal workers guide.
export FIL_PROOFS_USE_MULTICORE_SDR=1
```

### 在不同的 Lotus 节点的机器上运行 miner

如果您选择在与 Lotus 节点不同的机器上运行 miner，请设置：

```sh
export FULLNODE_API_INFO=<api_token>:/ip4/<lotus_daemon_ip>/tcp/<lotus_daemon_port>/http
```

并且**确保`ListenAddress`[启用远程访问](../../build/lotus/enable-remote-api-access.md)**. 有关如何获取令牌的说明[点这儿](docs-zh/build/lotus/api-tokens.md).

相似地,`lotus-miner` (作为 Lotus miner 守护程序的客户端应用程序), 可以通过以下设置与远程 miner 交谈：

```sh
export MINER_API_INFO="TOKEN:/ip4/<IP>/tcp/<PORT>/http"
export MARKETS_API_INFO="TOKEN:/ip4/<IP>/tcp/<PORT>/http"
```

### 添加必要的交换

如果只有 128GiB 的 RAM，则需要确保系统至少提供额外的 256GiB 的非常快速的交换（最好是 NVMe SSD），否则您将无法封装扇区：

```sh
sudo fallocate -l 256G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
# show current swap spaces and take note of the current highest priority
swapon --show
# append the following line to /etc/fstab (ensure highest priority) and then reboot
# /swapfile swap swap pri=50 0 0
sudo reboot
# check a 256GB swap file is automatically mounted and has the highest priority
swapon --show
```

### 为miner创建钱包

你至少需要一个 BLS 钱包 (`t3...` for mainnet )来进行挖矿。我们建议使用[单独的所有者和工人地址](miner-addresses.md)。因此，创建至少两个钱包(除非你已经有一些了):

```sh
# A new BLS address to use as owner address:
lotus wallet new bls
f3...

# A new BLS address to use as worker address:
lotus wallet new bls
f3...
```

::: callout
接下来，确保将[发送一部分资金](../../get-started/lotus/send-and-receive-fil.md)到**worker 的地址**以便完成 miner 设置。
:::

有关 miner 可以使用的不同钱包以及如何配置它们的更多信息，阅读[miner 地址指南](miner-addresses.md)。

::: tip
安全的[备份您的钱包](../../get-started/lotus/send-and-receive-fil.md#exporting-and-importing-addresses)!
:::

### 下载参数

对于 miner 来说，它需要读取并验证 Filecoin 证明参数。这些可以预先下载（推荐），否则可以通过初始化过程下载。验证参数由几个文件组成，在 32GiB 扇区的情况下，总计**超过 100GiB**。

我们建议设置一个自定义位置，以存储在第一次运行时创建的参数和证明父级缓存：

```sh
export FIL_PROOFS_PARAMETER_CACHE=/path/to/folder/in/fast/disk
export FIL_PROOFS_PARENT_CACHE=/path/to/folder/in/fast/disk2
```

在每次（重新）启动时都会读取参数，因此使用具有非常快速访问权限的磁盘（例如 NVMe 驱动器）将加快 miner 和 worker（重新）启动速度。如果未设置上述变量，则默认情况下事情会以`/var/tmp/`结尾，但**通常缺少足够的空间**.

要下载参数，请执行以下操作：

```sh
# Use sectors supported by the Filecoin network that the miner will join and use.
# lotus-miner fetch-params <sector-size>
lotus-miner fetch-params 32GiB
lotus-miner fetch-params 64GiB
```

您可以在[网络仪表板](https://network.filecoin.io)中验证网络的扇区大小。`FIL_PROOFS_*_CACHE`变量不仅应在下载时保持定义，而且在启动 Lotus miner（或工作程序）时也应保持定义。

## 启动前的清单

总结以上所有内容，请确保：

- _工作人员地址_ 有一些资金，以便可以初始化 miner。
- 已定义以下环境变量，这些变量可用于任何 Lotus miner 运行：

  ```
  export LOTUS_MINER_PATH=/path/to/miner/config/storage
  export LOTUS_PATH=/path/to/lotus/node/folder # When using a local node.
  export BELLMAN_CPU_UTILIZATION=0.875 # Optimal value depends on your exact hardware.
  export FIL_PROOFS_MAXIMIZE_CACHING=1
  export FIL_PROOFS_USE_GPU_COLUMN_BUILDER=1 # When having GPU.
  export FIL_PROOFS_USE_GPU_TREE_BUILDER=1   # When having GPU.
  export FIL_PROOFS_PARAMETER_CACHE=/fast/disk/folder # > 100GiB!
  export FIL_PROOFS_PARENT_CACHE=/fast/disk/folder2   # > 50GiB!
  export TMPDIR=/fast/disk/folder3                    # Used when sealing.
  ```

- 参数已取到上面指定的缓存文件夹中。
- 系统具有足够的交换空间并且处于活动状态。

## miner 初始化

在首次运行miner之前，请先执行以下操作：

```sh
lotus-miner init --owner=<address>  --worker=<address> --no-local-storage
```

- 这个`--no-local-storage`标志被使用，以便我们以后可以配置。[特定的存储位置](custom-storage-layout.md)。这是可选的，但建议使用。
- Lotus miner 配置文件夹在`~/.lotusminer/`或`$LOTUS_MINER_PATH`（如果设置了）中创建。
- [miner 地址指南](miner-addresses.md)中说明了 _所有者地址_ 和 _工作人员地址_ 之间的差异。如上所述，我们建议使用两个单独的地址。 如果未提供`--worker`标志，则将使用所有者地址。当 miner 运行时，可以在以后添加 _控制地址_ 。

## 与 miner 的连接

在启动 miner 之前，对其进行配置**非常重要**，以便可以从 Filecoin 网络中的任何对等方访问它。为此，您将需要一个稳定的公网 IP 并按如下所示在`~/.lotusminer/config.toml`中编辑:

```toml
...
[Libp2p]
  ListenAddresses = ["/ip4/0.0.0.0/tcp/24001"] # choose a fixed port
  AnnounceAddresses = ["/ip4/<YOUR_PUBLIC_IP_ADDRESS>/tcp/24001"] # important!
...
```

一旦启动 miner，[确保您可以连接到其公网 IP/端口](connectivity.md).

## 启动 miner

现在您可以启动 Lotus 挖miner了：

```sh
lotus-miner run
```

或者，如果您正在使用 systemd 服务文件：

```sh
systemctl start lotus-miner
```

::: warning
在确认 miner 正在运行且在[可通过其公网 IP 地址访问](connectivity.md)之前,请不要从此处继续。
:::

## 发布 miner 地址

miner 启动并运行后，在链上发布您的 miner 地址（在上面配置），以便其他节点可以直接与之对话并达成交易：

```sh
lotus-miner actor set-addrs /ip4/<YOUR_PUBLIC_IP_ADDRESS>/tcp/24001
```

## 下一步

现在，您的 miner 应该已经初步设置并正在运行，但是**还有一些建议的任务**可以在黄金时间准备好：

- 设置你的[自定义存储布局](custom-storage-layout.md) (如果使用`--no-local-storage`，则为必需)。
- 编辑 miner[配置设置](miner-configuration.md)以符合您的要求。
- 了解什么时候是[关闭/重启miner](miner-lifecycle.md)的合适时机
- 使用 miner 封装某个扇区的时间来更新`ExpectedSealDuration`: 通过[运行基准](benchmarks.md)或[承诺一个扇区](sector-pledging.md)并记下时间来发现它。
- 配置其他[封装 worker](seal-workers.md)以提高 miner 封装扇区的能力。
- 配置一个[单独的 WindowPost 消息地址](miner-addresses.md)。

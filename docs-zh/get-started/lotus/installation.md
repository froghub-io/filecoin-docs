---
title: Lotus安装和设置
description: 本指南介绍如何安装Lotus应用程序和启动Lotus节点。
breadcrumb: 安装和设置
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}. 本指南介绍如何将 `lotus`, `lotus-miner` and `lotus-worker` 安装到您的计算机上, 然后逐步完成 lotus 节点的设置。有关运行 miner 的信息，请检查 [Lotus Miner 文档](/mine/lotus/README.md).

## 在云端运行

作为在本地运行的替代方法，您还可以在云提供商上运行 Lotus。 最简单和最便宜的路径是使用 [DigitalOcean 市场中的一键式应用程序](https://marketplace.digitalocean.com/apps/filecoin-lotus).

其他选项，包括 Amazon Web Services，包含在 [在云端运行](running-in-the-cloud.md).

## 最低要求

要运行 Lotus 节点，您的计算机必须具有：

- 已安装 macOS 或 Linux。尚不支持 Windows。
- 八核 CPU 和 32GiB 内存。支持 Intel SHA Extensions（AMD 自 Zen 微体系结构，或 Intel 自 Ice Lake）的机型将显著加快速度。
- 足够的空间来存储当前的 lotuschain（最好是在 SSD 存储介质上）。这个链条每周大约增长 12 GiB。 链也可以[从可信状态快照同步和压缩](chain.md)。

::: warning
这些是运行 Lotus 节点的最低要求. [miner 硬件要求](../../mine/hardware-requirements.md) 是不同的.
:::

## Linux

以下说明特定于 Linux 安装。如果要在 Mac 上安装 Lotus，请转到 [macOS](#macos)部分.

在 Linux 上安装 Lotus 有几种方法：

+ [快照包管理器](#snap-package-manager)
+ [应用图片](#appimage)
+ [从源头构建](#building-from-source).

:::warning miners应该从源代码构建
从源代码构建 Lotus 允许您严格配置 Lotus 的运行方式以及它如何与其依赖项进行通信。 希望提高系统效率的miner应该[通过从源代码构建来安装 Lotus](#building-from-source)。
:::

### 快照包管理器

要使用 Snap 安装 Lotus，请运行：

```shell
snap install lotus-filecoin
```

您还可以使用 `--edge` 标志安装每晚构建。 这些构建是每天晚上从“master”分支创建的 [Lotus GitHub 仓库](https://github.com/filecoin-project/lotus).

```shell
snap install lotus-filecoin --edge
```

您可以找到有关此 Snap 的更多信息 [在 Snapcraft.io 上](https://snapcraft.io/lotus-filecoin).

### 应用图片

[应用图片](https://appimage.org/) 是便携式应用程序，允许开发人员将软件和依赖项打包到单个可执行文件中。 AppImages 在大多数基于 Linux 的操作系统上运行.

1. 转到最新 [Lotus GitHub 存储库中的发布页面](https://github.com/filecoin-project/lotus/releases/latest).
1. 在 **Assets** 下，下载 AppImage。
1. 打开终端窗口并移动到您下载 AppImage 的位置。 此位置可能是您的 **Downloads** 文件夹：

    ```shell
    cd ~/Downloads
    ```

1. 使 AppImage 可执行:

    ```shell
    chmod +x lotus_v1.10.0_linux-amd64.appimage
    ```

1. 您现在可以通过双击它或从终端窗口打开它来运行 AppImage 文件:

    ```shell
    ./lotus-v1.10.0_linx-amd64.appimage
    ```

### 从源头构建

您可以按照以下步骤从源代码构建 Lotus 可执行文件.

#### 软件依赖

您需要安装以下软件来安装和运行 Lotus.

#### 特定于系统

构建 Lotus 需要一些系统依赖项，通常由您的发行版提供。

Arch:

```shell
sudo pacman -Syu opencl-icd-loader gcc git bzr jq pkg-config opencl-icd-loader opencl-headers opencl-nvidia hwloc 
```

Ubuntu/Debian:

```shell
sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y && sudo apt upgrade -y
```

Fedora:

```shell
sudo dnf -y install gcc make git bzr jq pkgconfig mesa-libOpenCL mesa-libOpenCL-devel opencl-headers ocl-icd ocl-icd-devel clang llvm wget hwloc hwloc-devel
```

OpenSUSE:

```shell
sudo zypper in gcc git jq make libOpenCL1 opencl-headers ocl-icd-devel clang llvm hwloc && sudo ln -s /usr/lib64/libOpenCL.so.1 /usr/lib64/libOpenCL.so
```

Amazon Linux 2:

```shell
sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm; sudo yum install -y git gcc bzr jq pkgconfig clang llvm mesa-libGL-devel opencl-headers ocl-icd ocl-icd-devel hwloc-devel
```

#### Rustup

Lotus 需要 [rustup](https://rustup.rs). 最简单的安装方法是：

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### Go

要构建 Lotus，您需要一个有效的[Go 1.16.4 或更高版本](https://golang.org/dl/):

```shell
wget -c https://golang.org/dl/go1.16.4.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
```

:::tip
你需要添加 `/usr/local/go/bin` 到你的路径. 对于大多数 Linux 发行版，您可以运行类似的东西：

```shell
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc && source ~/.bashrc
```

浏览 [官方 Golang 安装说明](https://golang.org/doc/install) 如果你卡住了.
:::

### 构建和安装 Lotus

一旦安装了所有依赖项，您就可以构建和安装 Lotus。

1. 克隆存储库:

   ```shell
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   ```

2. 检查您要使用的网络的版本
   要加入 mainnet，请切换到 master 分支和 [最新版本](https://github.com/filecoin-project/lotus/releases) 。
  
   如果你要从以前的 Lotus 安装中改变网络，或者有一个网络重置，请在继续之前阅读 [交换机网络指南](./switch-networks.md) 。
          
   对于 mainnet 以外的网络，请在 [Filecoin networks dashboard](https://networks.filecoin.io) 中查找你想加入的网络的当前分支或标签和提交，然后在下面为你的特定网络构建 Lotus 。
  
   ```sh
   git checkout <tag_or_branch>
   # For example:
   git checkout <vX.X.X> # tag for a release
   ```
  
     目前， _master_ 分支对应的是 **mainnet** 。

3. 如果你在中国，看看 [提示](tips-running-in-china.md).
4. 根据您的 CPU 型号，您如果想要导出其他环境变量：

   a.如果您有**AMD Zen 或 Intel Ice Lake CPU（或更高版本）**，请通过添加以下两个环境变量来启用 SHA 扩展的使用：

    ```shell
           export RUSTFLAGS="-C target-cpu=native -g"
           export FFI_BUILD_FROM_SOURCE=1
    ```

    有关此过程的更多详细信息，请参阅[本地 Filecoin FFI 部分](#本地-filecoin-ffi)

   a.一些没有 ADX 指令支持的老式 Intel 和 AMD 处理器可能会因为非法指令错误而紊乱。要解决这个问题，添加 `CGO_CFLAGS` 环境变量:

   ```shell
          export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
          export CGO_CFLAGS="-D__BLST_PORTABLE__"
   ```

   a.默认情况下，证明库中使用“multicore-sdr”选项。 除非明确禁用，否则此功能也用于 FFI。 要禁用“multicore-sdr”依赖项的构建，请将“FFI_USE_MULTICORE_SDR”设置为“0”：

   ```shell
       export FFI_USE_MULTICORE_SDR=0
   ```
   
5. 构建和安装 Lotus：

    ```sh
   # join mainnet 
   make clean all 
   
   # 或加入测试网或开发网:
   make clean calibnet # Calibration with min 32GiB sectors
   
   sudo make install
   ```

   这将把 `lotus`, `lotus-miner` 和 `lotus-worker` 存入 `/usr/local/bin`下.

   `lotus` 将使用 `$HOME/.lotus` 文件夹默认用于存储（配置、链数据、钱包）。 看 [高级选项](configuration-and-advanced-usage.md) 有关如何自定义 Lotus 文件夹的信息.

   安装完成后，使用下面的命令确保为正确的网络成功安装了 lotus.

   ```sh with-output
   lotus --version
   ```
   ```
   lotus version 1.9.0+calibnet+git.ada7f97ba
   ```


6. 现在应该安装了 Lotus。现在可以 [启动 Lotus 守护进程](#start-the-lotus-daemon-and-sync-the-chain).

#### 本地 Filecoin FFI

一些新的 CPU 架构，如 AMD 的 Zen 和 Intel 的 Ice Lake，都支持 SHA 扩展。启用这些扩展可以显著加快 LotusNode 的速度。要充分利用处理器的功能，请确保在从源代码构建**之前设置以下变量**:

```sh
export RUSTFLAGS="-C target-cpu=native -g"
export FFI_BUILD_FROM_SOURCE=1
```

这种构建方法不会生成可移植的二进制文件。确保在构建它的同一台计算机上运行二进制文件。

### 系统服务文件

Lotus 提供 **通用** 系统服务文件。它们可以安装在：

```sh
make install-daemon-service
make install-miner-service
```

::: warning
所提供的服务文件应根据用户需要进行 **检查和编辑** 因为它们非常通用，可能缺少用户所需的特定环境变量和设置。

一个例子是，日志被重定向到 `/var/log/lotus` 默认情况下，在 `journalctl`中不可见.
:::

## macOS

这些说明特定于 macOS。 您可以在 macOS 10.11 El Capitan 或更高版本上安装 Lotus。 如果您要在 Linux 发行版上安装 Lotus，请转到 [Linux 部分](#linux)。

在 macOS 上安装 Lotus 有几种方法：

- [使用 Homebrew 安装](#install-with-homebrew).
- [从源代码构建](#build-from-source).

:::warning miners应该从源代码构建
从源代码构建 Lotus 允许您严格配置 Lotus 的运行方式以及它如何与其依赖项进行通信。 希望提高系统效率的miner应该[通过从源代码构建来安装 Lotus](#build-from-source)。
:::

### 使用 Homebrew 安装

你可以在 macOS 上使用 Homebrew 快速安装 Lotus

1. Add the `filecoin-project/lotus` tap:

   ```shell
   brew tap filecoin-project/lotus
   ```

1. 安装Lotus:

    ```shell
    brew install lotus
    ```

1. 您现在应该已经安装了 Lotus。您现在可以 [启动 Lotus daemon](#启动lotus-daemon-并且同步链).

### 从源代码构建

您可以按照以下步骤从源代码构建 Lotus 可执行文件.

#### Software dependencies

您必须安装 XCode 和 Homebrew 才能从源代码构建 Lotus.

### XCode 命令行工具

Lotus 要求在构建 Lotus 二进制文件之前安装 X 代码 CLI 工具。

1. 检查是否已经通过 CLI 安装了 XCode 命令行工具，请运行：

   ```sh
   xcode-select -p
   ```

   如果此命令返回路径，则可以继续执行 [下一步](#安装自制程序). 否则，要通过 CLI 安装，请运行：

   ```sh
   xcode-select --install
   ```

1. 要更新，请运行：

   ```sh
   sudo rm -rf /Library/Developer/CommandLineTools
   xcode-select --install
   ```

##### Homebrew

我们建议 macOS 用户使用 [Homebrew](https://brew.sh) 安装每个必要的包.

1. 使用命令 `brew install` 安装以下软件包:

   ```shell
   brew install go bzr jq pkg-config rustup hwloc
   ```

接下来是克隆 Lotus 存储库并构建可执行文件.

#### 构建和安装 Lotus

安装说明因 Mac 中的 CPU 而异:

- [基于 M1 的 CPU](#m1-based-cpus)
- [基于 Intel 和 AMD 的 CPU](#intel-and-amd-based-cpus)

##### 基于 M1 的 CPU

:::warning 
这些说明用于在基于 M1 的 Mac 上安装 Lotus。如果您有基于 Intel 或 AMD 的 CPU，请使用 [基于 Intel 和 AMD 的 CPU 指令 ↓](#intel-and-amd-based-cpus)
:::

1. 克隆存储库:

   ```shell
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   ```

1. 运行 `git checkout <RELEASE TAG>` 以检出最新的 Lotus 版本:

    ```shell
    git checkout v1.10.0
    ```

   您可以使用 [Lotus GitHub 发布页面] 上列出的任何标签(https://github.com/filecoin-project/lotus/releases) 检出到该特定版本.

   :::tip
   如果您想检出到主网以外的网络，请查看 [Switching networks guide →](./switch-networks.md)
   :::

1. 创建必要的环境变量以允许 Lotus 在 ARM 架构上运行:

    ```shell
    export LIBRARY_PATH=/opt/homebrew/lib
    export FFI_BUILD_FROM_SOURCE=1
    ```

1. 构建 `lotus` 守护进程:

    ```shell
    make all
    ```

1. 运行最后的 `make` 命令将这个 `lotus` 可执行文件移动到 `usrlocalbin`。这允许您从任何目录运行 `lotus`.

    ```shell
    sudo make install
    ```

1. 您现在应该已经安装了 Lotus。您现在可以 [启动 Lotus 守护进程](#start-the-lotus-daemon-and-sync-the-chain).

##### 基于 Intel 和 AMD 的 CPU

:::warning 
这些说明用于在基于 Intel 或 AMD 的 Mac 上安装 Lotus。如果您有基于 M1 的 CPU，请使用 [基于M1的CPU指令↑](#m1-based-cpus)
:::

1. 克隆存储库:

   ```shell
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   ```

2. 运行 `git checkout <RELEASE TAG>` 以检出最新的 Lotus 版本:

    ```shell
    git checkout v1.10.0
    ```

   您可以使用列在 [Lotus GitHub 发布页面](https://github.com/filecoin-project/lotus/releases) 检出到该特定版本.

   :::tip
   如果您想检出到主网以外的网络，请查看 [Switching networks guide →](./switch-networks.md)
   :::

3. 如果你在中国，看看一些 [在中国运行 Lotus 的技巧](./tips-running-in-china.md)".
4. 一些没有 ADX 指令支持的较旧的 Intel 和 AMD 处理器可能会因非法指令错误而恐慌。要解决此问题，请添加 `CGO_CFLAGS` 环境变量：
5. 
   ```sh
   export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
   export CGO_CFLAGS="-D__BLST_PORTABLE__"
   ```

   这是由于 Lotus 错误导致 Lotus 无法在没有“adx”指令支持的处理器上运行，应尽快修复。

6. 构建和安装 Lotus:

   ```shell
   make clean && make all 
   sudo make install
   ```

7. 您现在应该已经安装了 Lotus。您现在可以 [启动 Lotus 守护进程](#start-the-lotus-daemon-and-sync-the-chain).

## 启动 Lotus 守护进程并同步链

`lotus` 应用程序作为守护进程和客户端运行，以控制该守护进程并与之交互。守护进程是一个长时间运行的程序，通常在后台运行。

当使用 _mainnet_ 时，我们建议启动守护进程[从可信的状态快照同步](chain.md#lightweight-snapshot)。在任何情况下，你都可以用以下命令启动守护进程：

```sh
lotus daemon
```

在第一次运行期间，Lotus 将：

- 将其数据文件夹设置在 `~/.lotus`.
- 下载必要的证明参数。一旦下载了几千兆字节的数据。
- 导入快照(如果指定)并开始同步 Lotus 链。

这个守护进程将立即开始产生大量的日志消息。从现在开始，您必须在一个新的终端上工作， `lotus`命令将与正在运行的守护进程通信。

:::tip
不要担心日志中显示的警告和错误的数量。它们是守护进程生命周期的正常部分，因为它参与了全球分布式共识网络。
:::

如果你使用快照，后续守护进程启动可以正常进行，没有任何选项:

```sh
lotus daemon
## When running with systemd do:
# systemctl start lotus-daemon
```

有关同步和快照的更多信息，[请参见 Chain management 部分](./chain.md)。

我们建议等待同步过程完成，当使用可信状态快照导入时，这应该会比较快:

```sh
lotus sync wait
```

## 与守护进程交互

`lotus` 命令允许您与 _running_ Lotus 守护进程交互。 `lotus-miner` 和 `lotus-worker` 命令的工作方式相同。

Lotus 带有内置的 CLI 文档。

```sh
lotus
  - chain: Interact with filecoin blockchain
  - client: Make deals, store data, retrieve data
  - wallet: Manage wallet
  - net: Manage P2P Network
  - sync: Inspect or interact with the chain syncer
  ...
  
# 显示通用帮助
lotus --help
# 显示帮助“客户”进行交易、存储数据、检索数据
lotus client --help
```

例如，在您的 Lotus 守护进程运行几分钟后，使用 `lotus sync` 来检查您的 Lotus 节点的同步状态.

```sh with-output
lotus net sync
```
```
sync status:
...
	Target:	[bafy2bzaceaki6bjhe2lxmtyexcff6vh5y5uw4tmbjr3gatwvh5dhaqqb2ykaa] (320791)
	Stage: complete
	Height: 320791
...
```

或者使用 `lotus net` 来检查它在 Filecoin 网络中连接的其他节点的数量.

```sh with-output
lotus net peers
```
```
12D3KooWSDqWSDNZtpJae15FBGpJLeLmyabUfZmWDWEjqEGtUF8N, [/ip4/58.144.221.27/tcp/33425]
12D3KooWRTQoDUhWVZH9z5u9XmaFDvFw14YkcW7dSBFJ8CuzDHnu, [/ip4/67.212.85.202/tcp/10906]
```

或者检查您的 Lotus 节点和网络的当前版本。

```sh with-output
lotus version
```
```
Daemon:  1.9.0+calibnet+git.ada7f97ba+api1.3.0
Local: lotus version 1.9.0+calibnet+git.ada7f97ba
# running lotus v1.9.0 on Calibration testnet
```

## 停止 Lotus 守护进程

要正常地停止正在运行的 lotus 守护进程（重新启动守护进程以更新 lotus 时需要），请使用以下命令：

```sh
lotus daemon stop
## When running with systemd do:
# systemctl stop lotus-daemon
```

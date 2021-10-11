---
title: Lotus切换网络
description: 有时，特别是在测试时，您希望切换到另一个Filecoin网络，或者需要在网络重置后重新连接到测试网络。本指南将向您展示如何使用Lotus在不同的Filecoin网络之间切换。
breadcrumb: 切换网络
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

正如我们在 [安装指南](installation.md), Lotus 被编译为在单个网络上运行，配置文件夹中的信息与该网络相对应。

+ 当地devnet - [您可以运行一个本地devnet](https://docs.filecoin.io/build/local-devnet/#manual-set-up)
+ Testnets
    + [Calibnet](https://network.filecoin.io/#calibration)
  + [NerpaNet](https://github.com/filecoin-project/community/discussions/74#discussioncomment-1348469) 在2021-08-16上已弃用，不再可用.
+ [Mainnet](https://network.filecoin.io/#mainnet)

你可以选择下列方法之一的切换到一个不同的网络。

## 清理、重新构建和重新安装

第一种方法是最简单的。在这种方法中，您将删除与之前运行的网络相关的所有数据，并启动为在新网络上运行而构建的 Lotus 二进制文件：

1. 关闭Lotus守护进程是否正在运行.
1. 删除“~ / .lotus"的文件夹,或无论你设置"$LOTUS_PATH"。默认是“~ / .lotus”
1. 克隆Lotus库和进入“Lotus”文件夹中:

    ```shell
    git clone https://github.com/filecoin-project/lotus
    cd lotus
    ```

1. 构建`lotus` 可执行文件使用"make clean"你想加入的指定网络:

   | 网络 | 构建命令 | 描述 |
       | --- | --- | --- |
   | Mainnet | `make clean all` | 生产Filecoin网络。FIL在这网络具有实际价值。 |
   | Calibnet | `make clean calibnet` | 一个测试网络最低扇区大小为32 Gib·FIL这网络上没有实际价值. |
   | Nerpanet | `make clean nerpanet` | 一个测试网络最低扇区大小为512 Mib·FIL这网络上没有实际价值. |

2. 再次启动Lotus守护进程,让它同步到新网络:

    ```shell
    lotus daemon
    ```

:::运行在一个不同的 `$LOTUS_PATH`
这个过程删除从旧的网络,包括钱包。如果你在 `mainnet` 并切换到 `calibnet` 但你想要保持你所有的 `mainnet` 数据完整切换时,改变你 `$LOTUS_PATH` 在运行之前 `lotus daemon`:

改变你的 `$LOTUS_PATH` 启动: `export LOTUS_PATH=~/.new-lotus-path`.
:::

## 备份 Lotus 数据

如果你希望Lotus数据备份,复制 `~/.lotus` (或者 `$LOTUS_PATH`) 文件夹的地方. 这将需要很长一段时间如果Lotus节点同步整个网络.

另一个选择是 [导出你的钱包](send-and-receive-fil.md) 并且 [导出链](chain.md) 对一个新安装的Lotus节点后导入.

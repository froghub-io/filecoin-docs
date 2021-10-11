---
title: 'Lotus Miner: 升级'
description: '本指南介绍了运行miner时如何安全地升级Lotus。'
breadcrumb: 'miner升级'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}.

有两种类型的升级。*upgrade in-place*是默认过程，仅更新软件。_upgrade with reset_ 删除所有数据并重置：

[[TOC]]

## 增量升级

1. 按照说明安全关闭 Lotus Miner[点这里](miner-lifecycle.md).
1. 关闭所有 seal workers
1. 关闭您的 Lotus Node (`lotus daemon stop`或`systemctl stop lotus-daemon`)
1. 拉出新版本并重建。有关更多信息，请再阅读[Lotus 安装指南](../../get-started/lotus/installation.md):

```sh
export RUSTFLAGS="-C target-cpu=native -g"
export FFI_BUILD_FROM_SOURCE=1
git pull
git checkout <tag_or_branch>
git submodule update
make clean
make all
make install
```

1.启动 Lotus 守护程序并等待同步：

```sh
lotus daemon
# or when using systemctl
systemctl start lotus-daemon
```

```sh
lotus sync wait
```

2.开始你的 miner 和 worker

```sh
lotus-miner run
```

```sh
lotus-worker run
```

## 重置升级

::: warning
仅当万不得已时才使用此升级过程，或者在升级链并要求采取此类措施时使用。
:::

这类似于从头开始重新安装所有内容，因此您可以按照通常的[安装](../../get-started/lotus/installation.md) 和[miner 设置](miner-setup.md)的指南。在执行此操作之前，请考虑:

- [备份您的 Lotus 钱包](../../get-started/lotus/send-and-receive-fil.md#exporting-and-importing-addresses)
- 您可能还想备份 Lotus Node 和 Miner 配置。

准备就绪后，停止所有操作并删除数据文件夹（或重命名）：

```sh
# Assuming you are using the default data folders
rm -rf ~/.lotus
rm -rf ~/.lotusminer
rm -rf ~/.lotusworker
```

之后，Lotus 应用程序将重置。

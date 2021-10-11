---
title: Lotus：升级
description: 本指南将向您展示如何安全地将Lotus节点升级到更新版本
breadcrumb: 升级
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Installing an update

如果您选择在安装和重新安装 Lotus 存储库之后重新构建和更新软件，那么通常会将其作为最新的存储库。您可以使用：

```sh
git pull
git checkout <branch or tag>
```

签出新版本后，按照 [安装指南](installation.md)中的说明重新生成并重新安装.

您可以使用以下方法验证当前版本：

```sh
lotus --version # for the lotus binary
lotus version   # for the currently running daemon
```

:::callout
**安装新版本后，您需要停止并重新启动守护程序**.
:::

## 切换网络

如果要切换网络，请阅读[本指南](switch-networks.md).

---
title: 'Starling'
description: 'Starling 是一个分散存储应用程序，设计用于存档设置，在存档设置中，在一段时间内证明文件的真实性的能力是至关重要的。'
breadcrumb: 'Starling'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

<center>
<a href="https://starlingstorage.io" target="_blank"><img src="./images/starling.gif" alt="starling" /></a>
</center>

## 准备开始

本指南将快速在你的电脑上设置 Starling。

### 先决条件

在你可以与 Starling 互动之前，你需要安装一些东西:

1. [Lotus](../get-started/lotus/installation.md).
1. [NodeJS](https://nodejs.org/en/download/) 版本 `12.19` 或更高.

### 步骤

1.  确保 Lotus 守护进程正在运行，并且已经完全同步。

1.  在一个新的终端窗口中，通过以下方式获取 Lotus API 令牌和端点:

    ```bash
    lotus auth api-info --perm admin

    > FULLNODE_API_INFO=eyJhbGcabdjwieusyiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwdj3isu2938X0.tmdXnxUflc8nhghfjiwo2l1o9T1QwT0jLskdEV5cYEc:/ip4/127.0.0.1/tcp/1234/http

    ```

1.  克隆 Starling 存储库:

    ```bash
    git clone https://github.com/filecoin-project/starling
    ```

1.  进入 `starling` 目录并安装依赖项:

    ```bash
    cd starling
    npm install
    sudo npm link
    ```

1.  配置 Starling 设置:

    ```bash
    starling config
    ```

1.  你已经准备好运行 Starling 了。

    a. 存储单个文件运行:

        ```bash
        starling store full/path/to/file
        ```

    b. 存储一个文件夹运行:

        ```bash
        starling store full/path/to/folder
        ```

    c. 启动交互监控界面:

        ```bash
        starling monitor
        ```

查看[官方文档](https://starlingstorage.io/commands.html)，更深入地了解 Starling 可以做什么。

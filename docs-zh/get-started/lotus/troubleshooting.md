---
title: Lotus：节点故障排除
description: 此页面通过列出用户可能遇到的一些最常见的错误，为Lotus节点提供一些故障排除建议
breadcrumb: 节点故障排除
---

# # {{ $frontmatter.title }}

{{ $frontmatter.description }}

::: callout
**您是否成功地克服了其他与 lotusnode 相关的问题？** 请用底部的链接编辑此页！
:::

[[TOC]]

## 构建失败

请仔细检查构建日志。如果您的 git 分支中有一个脏状态，请确保执行以下操作：

```sh
git checkout <desired_branch>
git reset origin/<desired_branch> --hard
make clean
```

(或者直接删除并克隆存储库，如中所示[安装说明](installation.md).

## 在中国开始构建/启动缓慢

请参阅[当在中国运行贴士](tips-running-in-china.md) 指南.

## 错误：initializing node error: cbor input had wrong number of fields

当您启动为一个网络编译的 Lotus 时，会发生这种情况，但它在 lotusdata 文件夹中遇到数据，而该文件夹是针对另一个网络的，或者是针对一个旧的不兼容版本的。

解决方案：按照[切换网络](switch-networks.md) 非常接近.

## 错误：无法连接 bootstrap peer

```sh
WARN  peermgr peermgr/peermgr.go:131  failed to connect to bootstrap peer: failerequest bigger than maximumd to dial : all dials failed
  * [/ip4/147.75.80.17/tcp/1347] failed to negotiate security protocol: connected to wrong peer
```

再次尝试运行构建步骤，并确保您拥有来自 GitHub 的最新代码。

## 错误：repo is already locked

您已经有另一个 lotus 守护进程在运行。先停下来(`lotus daemon stop`).

## 配置：Open files limit

Lotus 将尝试自动设置文件描述符（FD）限制。如果不起作用，您仍然可以将系统配置为允许高于默认值的值。

具体的说明取决于您的系统以及如何运行 Lotus（是否使用 systemd 等等）。请使用 [搜索引擎查找说明](https://duckduckgo.com/?q=increase+open+files+limit&t=ffab&ia=web) 因为有很多非常好的指南.

## 错误：Routing: not found

```
WARN  main  lotus/main.go:72  routing: not found
```

此错误意味着您尝试与之对话的 miner 处于脱机状态

## RPC 错误:请求大于最大值

```
ERROR	rpc	go-jsonrpc/server.go:90	RPC Error: request bigger than maximum 104857600 allowed
```

出于安全原因，在 RPC 服务器公开给外部请求的情况下，有一个最大请求大小。默认值是 100 MiB，但可以通过启动服务器的 CLI 命令的 `api-max-req-size` CLI 参数进行调整。如果命令没有命令行参数来调整这个值，请提交一个 [issue](https://github.com/filecoin-project/lotus/issues/new?assignees=&labels=area/api&template=bug_report.md&title=Missing api-max-req-size option in Lotus command)来报告它。

## Signal killed

如果您收到一个 `signal killed`错误， 它可能表明在构建过程中发生了错误。

```shell
/usr/local/go/pkg/tool/linux_amd64/link: signal: killed
make: *** [Makefile:68: lotus] Error 1
```

再次检查您的计算机是否符合 [最低硬件要求](./installation.md#最低要求)

## Go command not found

您可能会遇到错误，说找不到 `go` 命令

```shell with-output
sudo make install
```
```
bash: go: command not found
expr: syntax error: unexpected argument '14'
install -C ./lotus /usr/local/bin/lotus
install -C ./lotus-miner /usr/local/bin/lotus-miner
install -C ./lotus-worker /usr/local/bin/lotus-worker
...
```

您可以在 `sudo make install` 步骤中忽略此错误，它不会影响安装.

## 链接到先前标记为坏块的链

这可能会发生在当 Lotus folk 了一个错误的版本。解决方案是:

- 取消标记所有坏块
- 重置头部到一个已知的好的 epoch

```sh
lotus sync unmark-bad --all
lotus chain sethead --epoch <epochNumber>
```

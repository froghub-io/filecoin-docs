---
title: Lotus：在中国运行的小贴士
description: 本指南为中国用户提供了一些技巧，帮助他们解决在构建和运行Lotus时可能遇到的带宽问题或速度慢的问题。
breadcrumb: 中国运行的小贴士
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 加速首次启动验证的参数下载

运行 Lotus 需要下载一系列的证明参数默认情况下，这些文件在中国境外托管，下载速度非常慢。 为了解决这个问题，用户应该在运行`lotus`, `lotus-miner` 和`lotus-worker`中的任何一个时设置以下环境变量:

```sh
export IPFS_GATEWAY=https://proof-parameters.s3.cn-south-1.jdcloud-oss.com/ipfs/
```

## 在构建期间加速 Go 模块下载

构建 Lotus 需要下载一些 Go 模块。这些通常托管在 Github 上，而在中国 Github 的带宽非常低。要解决此问题，请使用本地代理，方法是在 **运行 Lotus 之前设置以下变量**：

```sh
export GOPROXY=https://goproxy.cn
```

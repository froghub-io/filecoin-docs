---
title: 'Lotus:存储数据'
description: '本指南将向您展示如何使用Lotus导入数据，进行交易从而将数据存储在Filecoin网络上。'
breadcrumb: '存储数据'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

::: tip
本节介绍“在线”数据导入，适用于较小体量的数据导入。对于“离线”导入和数据传输，请查看[如何处理非常大的文件](very-large-files.md) 指南，该指南将一些进阶知识作为本部分的补充。
:::

## 总览

为了成功地将数据添加到 Filecoin 网络，需要成功完成以下步骤：

1. 数据必须被打包成为[CAR 格式的文件](https://github.com/ipld/specs/blob/master/block-layer/content-addressable-archives.md).
2. miner 和客户端之间的存储交易必须由 miner 发起并接受。
3. 数据必须传输到 miner。
4. miner 必须将数据放在一个扇区中，将其封装并开始向网络提交证明。

从这个时刻起，存储交易就在网络上进行了。

## 导入数据

要将本地文件从文件系统本地导入到 Lotus 运转中，请执行以下操作：

```sh
lotus client import ./your-example-file.txt
```

成功后，此命令将返回 _数据的 CID_. 这是非常重要的信息，因为将来它将用于进行交易以存储和检索数据。

您可以使用以下方式列出本地导入的文件的数据 CID：

```sh
lotus client local
```

如果您需要导入一个完整的文件夹或许多文件，则最好先将 _tar_ 或者 _zip_ 格式的文件放入单个存档中。

## 导入自定义的 DAG

进阶的 IPLD 用户可能希望将定制 DAG 导入 Lotus（如果不是，则可以跳过本节）。

CAR 文件格式允许序列化任何 IPLD-DAG（即 IPLD-CBOR）。 定制 IPLD-DAG 应该以一种众所周知的格式（例如 CBOR）进行编码，否则 Lotus 将无法编译它们。

::: warning
CAR 文件必须包含完整的 DAG。 不支持只包含部分 DAG！
:::

如果您构建了自己的 CAR 文件，请确保直接使用`--car`指令将其导入。

### 大于扇区的文件

如果您的文件大于[正在使用的 Filecoin 网络](https://network.filecoin.io)的扇区，则需要首先将文件分成多个部分。

存储 miner 将提供他们指定的扇区大小参数，以便您为自己选择最佳选项。 较小的扇区更快，而较大的扇区更经济。

## 进行存储交易

一旦知道了 _数据的 CID_ ，就可以使用它与 miner 进行存储交易。

### 查找一个 miner

您可以通过以下方式获取网络中所有 miner 的列表：

```sh
lotus state list-miners
t0xxxx
t0xxxy
t0xxxz
...
```

### 查找价格和条件

为了向指定 miner 咨询所提供的条款，您可以运行以下命令：

```sh
lotus client query-ask <miner>
```

### 达成交易

对条款满意后，您可以使用在导入过程中获得的**数据的 CID**向 miner 提出交易建议。 运行:

```sh
lotus client deal
```

该命令将以交互方式来请求获得你的 CID，miner ID 和交易持续时间（以天为单位）。 您也可以使用以下参数来调用它：

```sh
lotus client deal <data CID> <miner> <price> <duration>
```

其中`duration`以块表示（1 块等效于 30s）。

### 确保达成协议

鉴于网络目前的速度和稳定性，用户可能会发现与 miner 的个别交易意外失败。因此，我们建议为您想要存储的每一个 [CAR 文件](https://github.com/ipld/specs/blob/master/block-layer/content-addressable-archives.md) 做最多 10 笔交易。虽然这看起来有点过头，但这是一个简单的方法，可以增加交易成功的机会，并让你的数据得到存储。随着网络的成熟，这种变通方法将变得越来越不必要。

## 检查交易状态

您可以使用以下命令展示交易列表：

```sh
lotus client list-deals
```

除其他事项外，该命令将为您提供相关交易的当前状态，是否已在链上（由 miner 发布）以及是否因无法兑现而被惩罚的信息。

为了成功达成交易，miner 需要正确配置和运行，接受交易并正确封装文件。 否则，交易将显示为错误状态。

您可以与多个 miner 进行同一数据的交易。

一旦交易成功并且数据被 _封装完毕_, 就可以被[检索](retrieve-data.md)到。

## 其他工具

[Filecoin.tools](https://filecoin.tools/) 也可以让你检查你的交易状态。

[Starling](https://github.com/filecoin-project/starling) 提供了一组实用程序，可通过运行中的 Lotus 节点对 Filecoin 网络进行查询和修改操作。

---
title: 'Lotus Miner: 扇区质押'
description: '抵押扇区是一种使用随机数据封装扇区以增加miner在网络中的算力的技术。本指南涵盖了将已质押过的扇区创建和升级到可用状态的动机和步骤。'
breadcrumb: '扇区质押'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 质押扇区的理由

正如我们已经[解释](../how-mining-works.md#付出与回报)过的那样，Filecoin 网络中 worker 的算力与贡献给网络的实时存储量（激活的扇区）成正比。 算力更大的 miner 有更多机会被选中开采新的区块。

通过用随机数据密封各个行业，miner可以向网络证明，当有足够的需求或它决定这么做时，它可以为实际交易提供这么多存储空间。 这就是所谓的承诺。 与此同时，承诺行业的运作方式与常规行业类似，从而增加了miner的实力。  

考虑到以上因素，**承诺[主网]网络的行业是最有意义的，当它提供了足够的能量，有真正的机会去开采新的区块时**。 否则，它只用于测试目的。

::: tip
在 miner 设置过程中对一个扇区进行质押，对于测试封装过程需要多长时间并确保在进行实际交易之前确保正确配置 miner 的硬件非常有用。
:::

## 质押一个扇区

使用以下命令质押扇区：

```sh
lotus-miner sectors pledge
```

这将在默认情况下，抵押 546 天的空间。

> 该协议允许扇区的过期时间在[180-540](https://github.com/filecoin-project/specs-actors/blob/73e0409ac77c918c8fc91681c250a710c4b9a374/actors/builtin/miner/policy.go#L201-L206)天之间。 一旦[issue #4760](https://github.com/filecoin-project/lotus/issues/4760)被解决，Lotus将允许用户设置承诺容量扇区的过期时间。

::: warning
这会将数据写入`$TMPDIR`，因此请确保有足够的可用空间。
:::

确认封装工作是否已开始：

```sh
lotus-miner sealing jobs
```

该步骤会返回一个在`<PATH_FOR_SEALING_STORAGE>/unsealed`中的文件。

几分钟后，您可以使用以下方法查看封装进度：

```sh
lotus-miner sectors list
# and
lotus-miner sealing workers
```

在对新的扇区封装完毕后， `pSet: NO` 会变成 `pSet: YES`.

## 调整预期的封装时间设置

如果你质押了一个扇区，则可以使用操作的时长来更新[`ExpectedSealDuration` 设置](miner-configuration.md#交易完成部分).

运行以下指令获得封装该扇区的所需的司机：

```
lotus-miner sectors status --log 0
```

然后按照上面链接的配置参考中的说明进行操作。

## 升级质押的扇区

最低承诺期为6个月。 但是，在此之前，可以用包含交易的新扇区替代承诺扇区，只要替代扇区在承诺扇区之后失效。 为_upgrade_标记一个扇区:

```sh
lotus-miner sectors mark-for-upgrade <sector number>
```

在新的扇区封装后的 24 小时内，扇区就会停止活动。从这时开始，质押的存储可以重新用于新的扇区。

## 检查部门到期

您可以检查哪些扇区即将过期。默认情况下，可以使用以下命令检查60天内过期的扇区:

```shell
lotus-miner sectors check-expire
```

如果你想检查将在33天内过期的扇区(devnet中的669600 epoch)，添加'——cut - off '选项，和你想要的epoch:

```shell with-output
lotus-miner sectors check-expire --cutoff 669600
```

```shell output
ID  SealProof  InitialPledge  Activation                      Expiration                  MaxExpiration                 MaxExtendNow                  
5   5          59.605 nFIL    1519 (1 day 9 hours ago)        691857 (in 4 weeks 2 days)  5257519 (in 34 weeks 3 days)  1587303 (in 10 weeks 2 days)  
10  5          59.605 nFIL    3588 (1 day 7 hours ago)        697617 (in 4 weeks 2 days)  5259588 (in 34 weeks 4 days)  1587303 (in 10 weeks 2 days)  
11  5          59.605 nFIL    4695 (1 day 6 hours ago)        697617 (in 4 weeks 2 days)  5260695 (in 34 weeks 4 days)  1587303 (in 10 weeks 2 days)  
15  5          59.605 nFIL    6891 (1 day 4 hours ago)        700497 (in 4 weeks 2 days)  5262891 (in 34 weeks 4 days)  1587303 (in 10 weeks 2 days)  
17  5          59.605 nFIL    7004 (1 day 3 hours ago)        700497 (in 4 weeks 2 days)  5263004 (in 34 weeks 4 days)  1587303 (in 10 weeks 2 days)
```

## 扩展领域

可以使用以下命令延长扇区的生命周期:

```shell
lotus-miner sectors renew [command options] [arguments...]
```

这是一个选择周期在' epochnumber-a ' epoch和' epochnumber-b ' epoch之间的扇区并将其更新为1555200 epoch的例子:

```shell
lotus-miner sectors renew  --from <epochnumber-a> --to <epochnumber-b> --new-expiration 1555200
```

这是一个将从文件中读取的扇区的生命周期更新到1555200 epoch的例子:

```shell
lotus-miner sectors renew  --sector-file <your-sectorfile> --new-expiration 1555200
```

::: 警告
你必须选择要续订的扇区。这意味着你必须指定'--from '和'--to '选项，或者指定扇区文件，如果没有选择扇区，这个命令将不起作用。

扇区文件格式:

```  
1  
2  
...
```  
:::

---
title: Disputer
description: 验证提交的Window PoSts是昂贵的，当网络拥塞导致gas基础费用上升时，成本会急剧增加。为了解决这一问题，Filecoin改进提案FIP-0010使节点操作人员能够乐观地接受链上的window post，而无需验证，允许它们稍后被链下验证者质疑。
---

# 争论者

[WindowPoSt](../../reference/glossary.md#window-proof-of-spacetime-windowpost) 信息对于存储电源的持续维护是必要的。验证提交的证明是昂贵的，而当gas基础费用由于拥塞上升时，这些消息变得更加昂贵。对于大多数空分区的miner来说，这一成本可能会超过他们维护电力的预期回报。我们需要确保这些消息对miner来说是便宜的，即使指定了非常高的gas费用上限

Filecoin改进提案0010 (FIP0010)允许miner乐观地接受链上的时空证明(Windows PoSt)而无需验证，允许他们稍后被链下验证者质疑。任何Lotus节点都可以通过调用`DisputeWindowedPoSt`对过去1800个时代(~15h)提交的链上存储证明进行争议。

当争议成功反驳了被乐观接受的windows PoSt时，miner将被罚款一个无效证明费(IPF)，在该miner提交证明时，每个分区中的活动扇区，外加20个固定费用。所有被错误证明的区域都被标记为错误，提交争议的地址将被授予一个固定的“DipsuteReward”。

## 惩罚和奖励

提交一个无效的WindowPost的惩罚和提交一个有效的争议的奖励都可以改变。在撰写本文时，这些值为:

|费/奖励              | 价值                                                      |
| ----------------------- | ---------------------------------------------------------- |
|无效证明费用(IPF) |(5.51 *每个扇区24小时内的预期区块奖励)+ 20 FIL |
|奖励| |有效争端4Fil                                                      |

## 运行disputer
您可以使用 Lotus 中的`chain discriminer`命令运行disputer。 以下示例在本地 devnet 上运行。

1. 完全同步一个 Lotus 节点。
2. 使用以下选项调用`chain discriminer` 函数，后跟`start` 命令：

   | Name        | Description                                                       |
   | ----------- | ----------------------------------------------------------------- |
   | `--max-fee` | 您愿意为“DisputeWindowedPoSt”消息花费的最大“FIL”金额。                |
   | `--from`    | 您要从中发送消息的地址。 如果未指定地址，Lotus 将使用默认地址。            |

   ```shell
   lotus chain disputer --max-fee 1 --from t3r25povzrwpomqlwtxtt25ou76galexvgr3ucgvvtwxiwy2gtqltlzshmtdyz4ys7mt5phoouedengajltbka start

   > checking sync status
   > Worker: 101; Base: 0; Target: 0 (diff: 0)
   > State: <unknown: 0>; Current Epoch: 0; Todo: 0
   > Validated 4 messages (1 per second)
   ```

3. disputer将继续验证提交的 WinPoSts。 要结束disputer，请按 `CTRL` + `c`：

   ```shell
   > Exit by user
   > setting up window post disputer
   > 2021-02-22T17:44:11.362-0500	ERROR	rpc	go-jsonrpc@v0.1.2/client.go:392	got rpc message with cancelled context: context canceled
   > ERROR: Notify stream was invalid
   ```

   当退出disputer时，您可以安全地忽略任何流错误。

## 手动纠纷

您可以使用`dispute` 命令手动发送特定的dispute消息。该特性的用例非常狭窄，仅供高级用户使用。执行手动纠纷运行' lotus chain disputer dispute [minerAddress] [index] [postIndex] '，其中:

|变量的名字|描述|
| -------------- | ---------------------------------------------------------------------|
| `minerAddress` | 提交你想要dispute的证明的minerid。同样的地址也是消息的接收者                |
| `index`        | 你想为miner dispute的证据的截止日期索引。  
| `postIndex`    | 发布快照指数 .                                                         |

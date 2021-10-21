---
title: 存储和检索
description: 存储和检索数据的过程使用Filecoin网络略不同于大多数存储平台是如何工作的。本教程将引导您完成整个端到端流程的数据,当你需要它!我们将使用Lotus和本教程中的命令行。
---

# 存储和检索 

存储和检索数据的过程使用Filecoin网络略不同于大多数存储平台是如何工作的。本教程将引导您完成整个端到端流程的数据,当你需要它!我们将使用Lotus和本教程中的命令行。

这个过程分为三个主要部分:设置,存储你的数据和检索数据。每个部分有几个子过程,我们需要遵循。

![存储和检索数据的端到端流程](./images/end-to-end-process.png)

| 部分 | 子任务 |
| --- | --- |
| 安装 | 1. 获得一个Lotus full-node.<br> 2. 在您的本地计算机上启动一个Lotus lite-node.<br> 3. 得到一个Fil地址.<br> 4. 注册 Filecoin Plus. |
| 存储数据 | 1. 打包你的数据.<br> 2. 你的数据导入到Lotus.<br> 3. 找到一个存储提供商通过Filecoin plus miner公司注册.<br> 4. 创建一个存储协议.<br> 5.等到交易完成. |
| 检索数据 | 1. Create a retrieval deal.<br> 2. Download your data.|

还需要大约一个小时来完成本教程。虽然没有太多的步骤,有一些等待网络来处理你的请求。

:::warning mainnet上运行
本教程使用Filecoin mainnet。你会看到接下来的一个小时里的一切都发生在一个生产网络与其他用户存储和检索数据。不过别担心,本教程不会花费你任何东西!只是要知道你会处理实际存储提供商,真实数据,真正的交易。
:::

## 先决条件

如果您使用的是mac OS必须有 [Homebrew](https://brew.sh) 安装. 如果您使用的是Linux你必须有 [Snapd](https://snapcraft.io/docs/installing-snapd) 安装.

## 做笔记

有几件事要记住在这个教程中,如miner id和地址。有一张表在每个部分显示的信息你应该记录:

| 变量 | 描述 | 示例 |
| --- | --- | --- |
| Miner ID | 每个存储提供商的惟一标识符. | `f01000`

上表是你将在整个教程中看到的一个例子;你不需要抄下来

## 术语和短语

本教程包含一些你可能不熟悉的单词和短语。如果你遇到不明白的问题，请回到这个表格:

|单词|定义|  
| --- | --- |  
|地址|其他用户可以发送FIL的字符串。 |  
|一种服务，通常是一个网站，可以让你查看区块链的详细信息，如交易、交易和地址。 |
|交易|两台计算机之间关于如何处理某些数据的协议。 |  
| FIL |文件币加密货币的简写形式。 例如: _We收费0.5 FIL每GiB。_ |  
| Filecoin(大写`F`)|交易和存储交易发生的网络。 例如: _博物馆可以使用Filecoin网络存储他们的数字档案。_ |  
| filecoin(小写`f`)| filecoin网络运行的加密货币。 例如: _您可以使用filecoin支付您的交易。_ |  
| Miner | _storage provider_ 的别名。 |  
|私钥|程序用于与Filecoin网络交互的一串字母和数字。 保管好你的私钥，不要与任何人分享。 |  
|存储协议存储提供商和客户之间关于存储什么数据、存储多长时间以及存储提供商可以收取多少费用的协议。 |
|存储提供商和客户之间关于存储提供商向客户发送数据可以收取多少费用的协议。 |
|存储客户端|想在Filecoin网络上存储东西的用户。 在本教程中，_you_ 是存储客户端。 |  
|存储提供商| Filecoin网络上为其他希望存储数据的用户提供存储空间的计算机。 存储提供者有时被称为 _miners_。 |  
|钱包|地址集。 把每个钱包看作一个文件夹，每个地址看作文件夹中的一个文件。 |  

## 下一个步骤

在管理Filecoin网络上的数据之前，我们需要设置Lotus节点和Filecoin钱包. [前往设置部分开始收集您的资源 →](安装)

 
---
title: '在Filecoin上存储数据'
description: '开始在Filecoin网络上存储数据。'
breadcrumb: '存储'
---

# 在 Filecoin 上存储数据

在Filecoin上存储数据可以让用户利用分布式网络的力量，以及由数千个不同的存储提供商或miner服务的开放市场。  

:::tip 正在寻找快速入门指南?
在Filecoin网络上存储和检索数据与您可能使用过的其他服务或api有些不同。 这就是为什么我们把[Store & retrieve指南放在一起→](../get-started/store-and-retrieve)
:::

## 开始使用

在 Filecoin 网络中，用户可以使用以下软件解决方案存储数据:

### Apps

以下应用程序允许您在没有技术设置的情况下在 Filecoin 网络上存储数据：

- [ChainSafe Files](https://files.chainsafe.io/)在类似dropbox的界面中提供端到端加密的去中心化云存储。 查看[ChainSafe的博客文章](https://medium.com/chainsafe-systems/introducing-chainsafe-files-3eedabdec922)以快速了解这项服务。  
- [Estuary](https://estuary.tech) 允许上传和存储内容在Filecoin网络直接从您的浏览器，命令行和API。
- Fleek的[Space Storage](https://space.storage/)是一个开源的、用户控制的、加密的文件存储和共享平台，使用IPFS和Filecoin，绑定到以太坊账户或常见的web OAuth选项。
- [Web3.Storage](https://web3.storage) 是IPFS pin服务和Filecoin存储平台的内置于一体。 上传文件到Web3。 立即存储和访问它们，在知道您的数据是安全的使用Filecoin网络备份。


### Filecoin 客户端节点

- [Lotus](lotus/README.md) 导入数据并使用其守护进程和 CLI 在链上执行交易。Lotus用户可以完全控制交易、选择的miner和用于支付的钱包。确保你熟悉[Lotus](./get-started/lotus/README.md)，并且已经[安装并运行](./get-started/lotus/installation.md)。

### 数字化保存

- [Starling](starling.md) 使用 Lotus 来简化数字 _保存者_ 和档案工作者的分散式存储。

### 视频

- [File.video](https://file.video/) 和[Voodfy](https://beta.voodfy.com/) 都是利用[LivePeer](https://livepeer.org/) 网络的去中心化转码提供去中心化的视频托管。

## 其他资源

还有一些额外的存储解决方案，你不应该错过。虽然它们的重点是开发者，但其中一些有简单的CLI接口，简化了它们的使用。

- [Powergate](https://github.com/textileio/powergate) 一个多层次的存储解决方案，它用[IPFS和Filecoin](../about-filecoin/ipfs-and-filecoin.md)存储数据。可以使用[自托管](../build/powergate.md)或[托管](../build/hosted-powergate.md)。
- [Textile Buckets](../build/textile-buckets.md) 使用 IPFS 提供类似于 S3 的存储，有 Filecoin 支持的存档，并且有一个易于使用的 CLI。
- [Pinata](https://pinata.cloud/) 是一个 IPFS 引脚服务，很快就会将 Filecoin 纳入其产品组合。
- [Fleek](https://fleek.co)在 IPFS 上提供简单的托管和存储解决方案，他们的[SpaceDaemon](https://docs.fleek.co/space-daemon/overview/) 和即将推出的 Space SDK 使用了 Filecoin。

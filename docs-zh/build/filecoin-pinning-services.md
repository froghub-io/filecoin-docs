---
title: 'Filecoin支持的固定服务'
description: 'Filecoin支持的固定服务（FPS）是数据存储和检索服务，可提供IPFS的性能和可用性以及Filecoin分散存储网络的数据持久性功能。'
breadcrumb: 'FPS架构'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

::: tip
您可以在此处找到[现有的 FPS 提供者](README.md)的列表。
:::

[[TOC]]

## 如何使用 FPS 服务

尽管每个 FPS 服务提供者对使用该服务的说明都稍有不同，但总体流程保持不变：

- 在 FPS 服务提供者处创建并配置您的帐户。
- 检索 FPS 服务提供者的身份验证令牌。
- 通过所使用服务的 API 发出存储请求。
- 维护和监视您的数据存储。
- 通过使用的服务的 API 检索数据。

## FPS 的主要优势

1. 数据备份在 Filecoin 网络上以实现数据持久性。

2. 开发人员无需担心维护自己的分散式基础架构。使用 FPS 还可以避免 _被厂商锁定_ ，因为所有提供商都对同一存储网络做出了贡献。

3. FPS 正在努力采用[IPFS 固定服务 API](https://ipfs.github.io/pinning-services-api-spec/)。 该通用 API 旨在与任何基于内容寻址的存储解决方案灵活配合使用，无论是 Filecoin，IPFS 还是将两者结合在一起的服务。从用户中提取 Filecoin 的特定工作流，而无需抛弃诸如不同定位，冗余副本和加密存储收据之类的功能。

## FPS 解决方案如何生效

FPS 解决方案在后台运行 IPFS（用于热存储）和 Filecoin（用于冷存储）软件客户端，通过它们的原生 API 或通过 [Powergate](powergate.md) 等工具直接与这些软件客户端通信。 FPS 服务管理不同网络之间的数据流，采用智能缓存策略使流行数据随时可用。

![Diagram showing a simplified architecture for a Filecoin IPFS Pinning Service (FPS). User makes API request to the FPS. The FPS stores and retrieves data from embedded go-ipfs and lotus nodes, which communicate with each other via libp2p and IPLD data formats.](./images/filecoin-pinning-services/fps-data-flows.png)

尽管每种服务的特定架构看起来会有所不同，但大多数 FPS 解决方案都遵循类似的幕后流程。

**数据存储**:

- 当用户通过 FPS 发出一个 API 请求存储特定 CID 时，FPS 会将该 CID 固定到其节点（该节点同公共 IPFS 网络相连）或“热”存储层。
- FPS 将同时启动 Filecoin 存储交易（“冷”存储层）以保留数据。
- 如果用户为其文件指定了一个大于 1 的复制因子（该数据的 X 个冗余副本），则 FPS 将为数据发起 X 个单独的 Filecoin 存储交易。
- 用户直接向提供此存储服务的 FPS 服务支付费用。

**数据检索**:

- 当用户通过 FPS 发出 API 请求检索特定的 CID 时，FPS 将首先尝试通过“热”存储层（公用 IPFS 网络上的固定数据）来检索 CID。
- 如果不成功，则 FPS 将通过“冷”存储层（与miner在 Filecoin 网络上存储的数据）检索 CID，并将其提供给请求者。
- 用户直接向提供此检索服务的 FPS 服务支付费用。

请记住，这些流程对用户是隐藏的，发生在幕后。 用户将与单个界面进行交互，该界面会将系统，节点管理和 Filecoin 交易管理的数据展示出来。

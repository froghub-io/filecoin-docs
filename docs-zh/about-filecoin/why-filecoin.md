---
title: 为什么使用 Filecoin?
description: Explore the features that make Filecoin a compelling system for storing files.
---

# 为什么使用 Filecoin?

本文概述了 Filecoin 的一些特性，这些特性使它成为一个非常有吸引力的文件存储系统。这个概述是为有参与大规模数据存储经验的人士准备的，例如，云存储或对等存储网络。

### 可验证的存储

Filecoin 具有内置流程来检查文件的历史记录并验证它们是否已随着时间的推移正确存储。每个存储提供商都证明他们每 24 小时都在维护他们的文件。客户端可以有效地扫描此历史记录以确认他们的文件已正确存储，即使客户端当时处于离线状态。任何观察者都可以检查任何存储提供商的跟踪记录，并会注意到提供商过去是否出现故障或离线。

::: callout
[在 ProtoSchool 了解存储验证](https://proto.school/#/verifying-storage-on-filecoin)
:::

### 公开市场

在 Filecoin，文件存储和检索协议是在公开市场谈判达成的。任何人都可以不需要许可就加入 Filecoin 网络。运行一个miner只需要一个与互联网连接的具有备用磁盘空间的设备。通过降低进入门槛，Filecoin 实现了一个由许多独立存储提供商组成的繁荣生态系统。

### 极具竞争力的价格

存储和检索的价格是由供应和需求决定的，没有企业的定价部门。Filecoin 提供可靠的存储，价格极具竞争力。矿业公司的竞争是基于他们的存储能力，可靠性和速度，而不是通过市场营销或者锁定用户。

### 可靠的储存

因为存储是付费的，所以 Filecoin 为文件保持长期可用性提供了一个可行的商业理由。文件存储在可靠的且始终与互联网连接的计算机上。

### 自我修复

Filecoin 网络不断验证文件是否被正确存储。该文件的区块链中有一个内置的自我修复过程，一旦发现有缺陷的miner，他们的文件将被重新分配给可靠的miner。

### 可证实的痕迹

在自我修复的过程中，Filecoin 生成可验证的跟踪信息，表明文件长时间以来被正确存储。客户端可以有效地扫描这些跟踪信息，以确认他们的文件已被正确存储，即使客户端当时处于脱机状态。任何观察者可以查看任何miner的跟踪记录，并记录到如果曾经有miner发生错误或离线。

::: callout
[了解如何在 ProtoSchool 进行存储验证](https://proto.school/#/verifying-storage-on-filecoin)
:::

### 为了声望而非营销

在 Filecoin 中，存储提供商通过在区块链上发布的业绩记录证明其可靠性，而不是通过提供商自己发布的营销声明。用户不需要依赖状态页面或来自存储提供商的自我报告的统计数据。

### 权衡的选择

用户可以在成本、冗余度和速度之间进行自己的权衡。用户不受限于他们的供应商提供的一组数据中心，但可以选择将他们的文件存储在任何参与 Filecoin 的miner身上。

### 使用空存储器

Filecoin 提供处于待用状态的磁盘空间。与其他没有资金激励的分布式网络不同，miner加入 Filecoin 可以获得报酬。Filecoin 降低了miner的使用难度，miner可以自行管理存储空间，无需人工监督就可以获得 Filecoin 令牌。

### 抵制审查制度

Filecoin 抵制审查，因为不能强迫任何中心服务提供商删除文件或扣留服务。这个网络由许多不同的人和组织运行的许多不同的计算机组成。故障或恶意的行为者会被网络发现并自动删除。

### 有效的区块链

在 Filecoin，miner因提供储量而受到奖励，而不是因为进行了浪费性能的计算。使用文件复制的证明和存储长期证明确保其块链的完整。它不像其他区块链那样依赖于能源密集型的工作证明方案。人们鼓励miner积累硬盘，并通过存储文件使用它们。Filecoin 不鼓励仅仅为了采矿而囤积显卡或应用专用集成电路。

### 为其他区块链提供存储空间

Filecoin 的区块链被设计用来存储大文件，而其他区块链通常只能存储极少量的数据，非常昂贵。可以为其他区块链提供存储空间，Filecoin 允许它们存储大文件。未来 Filecoin 将添加一种新的机制使得 Filecoin 的区块链能够与其他区块链上的交易相互操作。

### 内容寻址

文件是由它们包含的数据引用的，而不是像 url 这样薄弱的标识符。无论文件在何处托管或由谁托管，文件都是可用的。当一个文件广为流传时，它可以通过成群的计算机快速分发，而不需要依赖中央计算机，因为中央计算机可能会因此网络流量过载。

当多个用户存储同一个文件(并选择不加密公开该文件)时，每个希望下载该文件的用户都会从 Filecoin 保持该文件可用性中受益。无论文件是从哪里下载的，下载者都可以验证他们收到了正确的文件且完整。

### 内容分发网络

检索miner是一些拥有良好网络连接质量的计算机，它们连接着许多想要下载文件的用户。通过预取流行文件并将其分发给附近的用户，检索程序可以使网络通信流畅、文件下载迅速并得到奖励。

### 单一协议

实现 Filecoin 的应用程序可以使用相同的协议在任何miner上存储它们的数据。希望支持多个不同提供商的应用程序不限于其所有提供商都支持的最低公分母功能集。

### 没有封闭限制

迁移到不同的存储提供者将更加容易，因为它们都提供相同的服务和 api。用户不会因为依赖供应商的特定功能而被限制在供应商中。此外，文件的内容处理，使他们能够直接在miner之间传输，而无需用户下载和重新上传文件。

传统的云存储提供商通过降低文件存储成本来锁定用户，但是再次获取文件的成本却很高。为了避免这种情况，Filecoin 提供了一个检索市场，在这个市场中，miner们竞相以尽可能低的价格，尽可能快地把文件交还给用户。

### 代码开源

运行客户机和存储提供程序的代码是开源的。存储提供商不必开发自己的软件来管理他们的基础设施。每个人都能从 Filecoin 代码的改进中受益。

### 活跃的社区

Filecoin 有一个活跃的社区，可以回答问题并帮助新人入门。用户、开发人员和存储提供者之间存在一个开放对话框。如果您需要帮助，您可以联系到设计或建立该系统的人。访问 Filecoin 的聊天系统和论坛。

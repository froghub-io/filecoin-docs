---
title: 参考
description: Filecoin规范、实现和生态系统的有用参考资料。

---

# 参考

本节包含Filecoin的链接和参考资料。

- [参考](#reference)
  - [关于Filecoin](#about-filecoin)
  - [Filecoin 网络](#filecoin-network)
    - [节点实现](#node-implementations)
    - [网络](#networks)
  - [网络状态](#network-status)
    - [块探险家](#block-explorers)
    - [链数据和监控](#chain-data-and-monitoring)
    - [存储/交易状态](#storage-deals-status)
  - [存储Web应用程序](#storage-web-applications)
  - [api和开发工具](#apis-developer-tools)
    - [应用程序构建器的存储api](#storage-apis-for-app-builders)
    - [消息签名工具](#message-signing-tools)
    - [Wallet-related工具](#wallet-related-tools)
    - [节点基础设施和api](#node-infrastructure-apis)
      - [可伸缩的端点主机](#scalable-endpoint-hosting)
      - [Filecoin API客户端](#filecoin-api-clients)
      - [存储提供程序索引API](#storage-provider-index-api)
    - [数据准备工具](#data-prep-tools)
    - [使用IPFS和Filecoin的数据库](#databases-using-ipfs-and-filecoin)
    - [其他开发人员工具](#other-developer-tools)
  - [矿业](#mining)
    - [miner的声誉系统](#miner-reputation-systems)
    - [miner的工具](#miner-tools)
    - [存储客户端和miner程序](#storage-client-and-miner-programs)
    - [市场资源检索(WIP 实验)](#retrieval-market-resources-wip-experiments)
  - [钱包](#wallets)
    - [钱包(审计)](#wallets-audited)
    - [其他的钱包](#other-wallets)
  - [生态画廊](#ecosystem-galleries)
    - [活动](#hackathons)
    - [赠款和加速器](#grants-and-accelerators)

## 关于Filecoin

+ [**Filecoin 规范**](https://spec.filecoin.io/) - Filecoin协议及其相关子系统的技术规范。
+ [**工程Filecoin's 经济**](https://filecoin.io/2020-engineering-filecoins-economy-en.pdf) -  Filecoin的经济激励设计。
+ [**Filecoin Slack**](https://filecoin.io/slack) - 公开讨论Filecoin。
+ [**Filecoin 社区**](https://github.com/filecoin-project/community) - Filecoin社区和生态系统渠道，讨论论坛等等。
+ [**Filecoin 中文社区**](https://github.com/filecoin-project/community-china) - 中国社区的资源和论坛，由CoinSummer & PL维护和主持。
+ [**Filecoin Youtube 频道**](https://www.youtube.com/channel/UCPyYmtJYQwxM-EUyRUTp5DA) -  各种Filecoin研讨会、会议和聚会。
+ [**Filecoin 核心开发会议**](https://github.com/filecoin-project/tpm) - 技术会议，聚集不同的Filecoin团队进行协议开发。

## Filecoin 网络

### 节点实现

- [**Lotus**](https://github.com/filecoin-project/lotus) ,在GoLang上- _**推荐**_最先进的实现和 [安全审计](https://spec.filecoin.io/#section-intro.implementations-status).
- 其他实现(进行中):
  - [Fuhon](https://github.com/filecoin-project/cpp-filecoin) - C++
  - [Forest](https://github.com/ChainSafe/forest) - Rust
  - [Venus](https://github.com/filecoin-project/venus) (以前 go-filecoin) - 同样在GoLang上 ([Venus Docs](https://venus.filecoin.io/)).

+ Lotus Docker Hub Images (非官方):
  + [glif/lotus](https://github.com/glifio/filecoin-docker)
  + [ognots/lotus](https://hub.docker.com/r/ognots/lotus) - mainnet-v1.830-rc1
  + [textile/lotus](https://hub.docker.com/r/textile/lotus) - latest

### 网络

[**Network.filecoin.io**](https://network.filecoin.io) - 列出所有当前的Filecoin网络和相关信息。

+ **主网**
  + [Mainnet 网络状态](https://filecoin.statuspage.io/) - 报告Filecoin主网的状态和事件.
+ **Calibration**
  + 最大的测试网，支持32GiB和64GiB扇区。
  + 看 [#fil-net-calibration-announce](https://filecoinproject.slack.com/archives/C01C5PT7ETC) 公告和 [#fil-net-calibration-discuss](https://filecoinproject.slack.com/archives/C01D42NNLMS) 提问和讨论 [Filecoin Slack](https://filecoin.io/slack).
+ **本地开发网**
  + [**使用Lotus运行本地Devnet** ](https://docs.filecoin.io/build/local-devnet).
  + [Textile's Local Devnet ](https://docs.textile.io/powergate/localnet/#localnet-with-lotus-client) -  使用模拟行业建设者更快的交易确认，它是存储应用程序原型。
  + [Ganache for Filecoin](https://www.trufflesuite.com/docs/filecoin/ganache/overview) - 通过多种方式支持Filecoin的开发。

## 网络状态

检查网络和链的状态和细节的工具。

### 块探险家

- [Filfox.info](https://filfox.info/en) -  主网
- [Filscan](https://filscan.io) -  主网 & Calibration
- [Filscout](https://filscout.io) - 主网 & Calibration
- [1475 Filecoin Explorer](https://1475ipfs.com/#/blockBrowser) -  主网
- [Grafana](https://stats.filecoin.io/) - 网络统计仪表板
  - [Mainnet](https://stats.filecoin.io/)
  - [Calibration](https://stats.calibration.fildev.network/d/z6FtI92Zz/chain?orgId=1&refresh=25s&from=now-30m&to=now&kiosk)

### 链数据及监控

- [Filstats.io](https://filstats.io) - 节点遥测监测-添加您的节点!
- [Sentinel 项目](https://github.com/filecoin-project/sentinel) - Grafana背后的Filecoin网络监控与分析系统
- [Statediff](https://node.glif.io/space07/statediff/rpc/) - 探索和比较Filecoin状态的变化。
- "Orphan 块" (不是Filecoin规范中的官方协议术语) - 没有奖励的区块要么是在错误的tipset上挖的，网络没有及时交付, 或导致重组的混合.
  - [Orphan 块统计](https://filscout.com/en/orphan-block)
  - [Orphan 块集合](https://filscout.com/en/orphan-block/alllist)

### 存储/交易状态

- [Filecoin 存储数据](https://storage.filecoin.io/) - Filecoin的一般存储汇总。
- [filecoin.tools](https://filecoin.tools) - 检查CID的存储交易状态。
- [file.app](https://file.app/) - Filecoinminer分析。
- [交易清单在 Filfox.io](https://filfox.info/en/deal)

## 存储Web应用程序

基于网络的应用程序存储您的数据在Filecoin。不需要命令行或编码经验。

- [ChainSafe 文件](https://files.chainsafe.io/) - dropbox风格的用户界面，使用Oauth或一般的Metamask登录
- [Estuary](https://estuary.tech) 允许直接从浏览器上传和存储内容到Filecoin网络。
- [File.video](https://file.video/) and [Voodfy](https://beta.voodfy.com/) - 从LivePeer视频托管与分散转码
- [**Slate.host**](https://slate.host) - Filecoin上的一个存储应用程序，用于收集、组织和链接文件并共享它们 [Product Hunt here](https://www.producthunt.com/posts/slate-f195dcdd-18e2-4dc2-8c70-45208ccbb862) 在github上的 [filecoin-project/slate](https://github.com/filecoin-project/slate/)
- [Starling数据完整性框架](https://www.starlinglab.org/)
  - 安全地捕获、存储和验证人类历史
  - 学习 [starlinglab.org/78days](https://www.starlinglab.org/78days/) 或者 [Filecoin 博客采访](https://filecoin.io/blog/starling-framework/)
- [Starling Storage API + CLI](https://github.com/filecoin-project/starling) - RESTful API + Node.js， 用于简化保存用例的数据存储。访问 [Starlingstorage.io](https://starlingstorage.io/) 来学习更多.

## api和开发工具

开发者工具，API客户端和存储服务，开发者可以用来构建Filecoin。

### Storage APIs for app builders

- [Estuary](https://estuary.tech) - 一个简单的IPFS节点，集成了最小的Filecoin客户端库。它允许任何拥有公共数据的人使用一些API调用来存储和检索它。它面向基础设施运营商、开发者和Filecoin用户.
  - [Estuary Docs](https://docs.estuary.tech) - 更多关于如何使用Estuary及其API的文档。
  - [Estuary WWW](https://github.com/application-research/estuary-www) - 一个简单的网站应用示例，可以共享任何Estuary节点。
- [NFT.storage](https://nft.storage/) - 协议实验室的beta服务，用于在IPFS和Filecoin上存储链下非ft数据。
- [**Powergate**](https://docs.textile.io/powergate/) - 基础设施工具，利用运行IPFS节点和Filecoin节点，使用IPFS进行热存储和检索，以及存储交易助手和应用程序开发人员的其他便利功能.
  - [POW CLI](https://docs.textile.io/powergate/#command-line-interface) - CLI运行在Powergate API上.
  - [Powergate JS 客户端](https://github.com/textileio/js-powergate-client) - 基于Powergate gRPC api的JS客户端。
  - [Powergate Go 客户端](https://pypi.org/project/pygate-grpc/) - 使用Powergate api和Go客户端构建你的Go应用程序。
- [Slate.host API](https://github.com/filecoin-project/slate/#developer-api) - [Slate.host](https://slate.host) 有一个Developer API，允许你用帐户上传文件。
- [Space SDK from Fleek](https://fleek.co/space-sdk/) - 由Fleek的托管服务支持的JS库，使用IPFS, Textile, Filecoin, Ethereum等。
- [Textile Buckets](https://docs.filecoin.io/build/textile-buckets/) - 简化的云桶存储在IPFS上，使用Powergate下的存档到Filecoin选项，由Textile托管.

### 消息签名工具

- [Filecoin JS 签名者](https://github.com/blitslabs/filecoin-js-signer) - 一个纯粹的Typescript / Javascript库，用于创建、签名和广播消息来发送FIL，并与Filecoin的内置角色(如Payment Channel和Multisig)交互，以及其他实用函数.
  - 也可以在npm [@blitslabs/filecoin-js-signer](https://www.npmjs.com/package/@blitslabs/filecoin-js-signer)
  - 目前Filecoin Loans项目用于其移动钱包(用React Native编写)并创建支付渠道。
- [Filecoin 签名工具](https://github.com/Zondax/filecoin-signing-tools) - 一个纯JS或Rust / WASM / JSONRPC库，用于创建除了Filecoin节点之外的签名消息.
  - 也可以在npm [@zondax/filecoin-signing-tools](https://www.npmjs.com/package/@zondax/filecoin-signing-tools)
  - 支持 [分类帐硬件设备集成](https://github.com/Zondax/ledger-filecoin/) 和支付渠道 ([paych演示例子](https://github.com/mgoelzer/zondax-pch-demo)). Multisig支持将很快被添加.
  - 有关如何使用它的开源示例，请参见 [Glif web的钱包](https://github.com/glifio/wallet) 于github.

### Wallet-related工具

- [Filecoin Rosetta API代理](https://github.com/Zondax/rosetta-filecoin) - [Rosetta](https://www.rosetta-api.org/) 是Coinbase创建的一个API标准，为钱包和交易所的许多链提供一致的接口。
- [FilSnap MetaMask插件](https://pages.consensys.net/filecoin-metamask-snap-preview) - MetaMask有一个新的插件系统叫做 [Snaps](https://github.com/MetaMask/metamask-snaps-beta/wiki) 目前还在测试阶段，开发者可以尝试一下。

### 节点基础设施和api

> 请注意: 深入调用链的历史记录可能需要一些时间才能返回，使用链数据库可能更有效

- [Glif 节点](https://docs.filecoin.io/build/hosted-lotus/) 和 [Infura](https://infura.io/docs/filecoin) - 托管到Filecoin主网和测试网的端点.
  + 这些端点支持只读调用和 `MPoolPush()` 用于向网络发送已签名的事务(可以使用 [消息签名工具](#message-signing-tools)).
- [**Lotus JSON-RPC API**](https://docs.filecoin.io/build/lotus/#getting-started-with-lotus-apis) - Lotus通过API提供了其功能的完整特性集.
  + [lotus API邮差示例](https://documenter.getpostman.com/view/4872192/SWLh5mUd?version=latest) - (仅显示样本钱包调用)

#### 可伸缩的端点主机

用于运行负载均衡的Lotus JSON RPC API端点的节点集群。

+ [Filecoin-图表](https://github.com/glifio/filecoin-chart) (k8 集群) - 用于托管Lotus Node客户机的Helm图表.

#### Filecoin API客户端

- [Filecoin.js](https://github.com/filecoin-shipyard/filecoin.js) (过时的) -  用于通过JSON-RPC API与Lotus交互的高级JS库。
- [js-lotus-客户端](https://github.com/filecoin-shipyard/js-lotus-client) - 用于基本解析Lotus JSON RPC API的低级JS包装器。
- [lotus-json-rpc-提供者](https://www.npmjs.com/package/@coinsummer/lotus-jsonrpc-provider)  (过时的) - 在TypeScript中包装Lotus API.

#### 存储提供程序索引API

+ [Figment - miner声誉系统API](https://learn.figment.io/network-documentation/filecoin/rpc-and-rest-api/miner-reputation-system-api) - 基于miner存储容量，扇区故障和交易惩罚的声誉评分。
+ [Filrep.io API](https://filrep.io/api) - 一套RESTFul JSON端点，用于发现最好的存储提供商进行交易。
+ [Textile Miner Index](https://blog.textile.io/introducing-the-miner-index/) - API和CLI通过价格，观察交易，从北美节点的速度找到miner

### 数据准备工具

- [CAR 文件](https://github.com/ipld/specs/blob/master/block-layer/content-addressable-archives.md) - 对于小于32和64 GiB的Lotus导入自动使用，Filecoin归档格式从dag序列化，请参见 [offline deals for large datasets](https://docs.filecoin.io/store/lotus/very-large-files/#deals-with-offline-data-transfer).
- [go-graphsplit](https://github.com/filedrive-team/go-graphsplit) - 由FileDrive块更大的单个DAG存储在默认的Filecoin 32和64 GiB扇区大小。
- [IPFS](https://ipfs.io) - 您可以使用' ipfs add '与ipfs节点 ，然后[添加Filecoin节点的CID](https://docs.filecoin.io/store/lotus/import-data-from-ipfs).

### 使用IPFS和Filecoin的数据库

- [OrbitDB](https://orbitdb.org/) - 在IPFS上去中心化的多方数据库，与主题pubsub和CRDTs同步。Filecoin集成使用Powergate可在 [orbit-db-powergate-io](https://github.com/filecoin-shipyard/orbit-db-powergate-io).
- [ThreadsDB](https://docs.textile.io/threads/) - 去中心化的多方数据库，用于IPFS上的用户筒仓数据，Filecoin即将集成.

### 其他开发人员工具

- [js-rle](https://github.com/willscott/js-rle) - RLE+ Spec. 了解 [rle-bitset-encoding in the Filecoin Spec](https://spec.filecoin.io/#section-appendix.data_structures.rle-bitset-encoding).
- [Truffle for Filecoin](https://www.trufflesuite.com/docs/filecoin/truffle/quickstart) - 构建应用程序将文件保存到IPFS和Filecoin.


## 矿业

### miner的声誉系统

- [Codefi 存储](https://storage.codefi.network/) - 查看Filecoin存储市场，miner信息，要价，完成交易
- [FIL Swan](https://www.filswan.com/) - 对于离线交易，miner信息，价格，离线交易接受。
- [Filrep.io](https://filrep.io/) - 在线miner及其定价指数，按实力和声誉评分排序
- [Textile Miner Index](https://blog.textile.io/introducing-the-miner-index/) - API和CLI通过价格，观察交易，从北美节点的速度找到miner.
- [SpaceGap](https://spacegap.github.io/) - 显示前50家miner的存储证明截止日期和行业细节.

### miner的工具

- [Bidbot](https://github.com/textileio/bidbot) - 一个Filecoin 网络 sidecar在存储交易拍卖出价。
- [Filgas.io](https://fgas.io/) - 实时Filecoin mining gas查询。
- [Hactar](https://www.hactar.app/) - 分析您的Filecoinminer节点。
- [Lotus Farcaster](https://github.com/s0nik42/lotus-farcaster) - Prometheus, Grafana和Python监控仪表盘。
- [Mining Benchmarks](https://filecoin-benchmarks.on.fleek.co/): Filecoin社区的硬件性能比较。

### 存储客户端和miner程序

- [Filecoin Plus验证数据程序](https://github.com/filecoin-project/filecoin-plus-client-onboarding)
  - 通过一个社会信任网络来激励存储在Filecoin上的有价值的数据
  - 客户可以向公证员申请获得DataCap，并以其质量调整能力的10倍奖励miner，增加区块奖励的概率
- [Filecoin 发现商店](https://store.filecoin-discover.com/)
  - 在那里，存储miner可以购买硬盘，其中的离线数据充满了有价值的数据集 - ([博客 post](https://filecoin.io/blog/offline-data-transfer-for-large-scale-data/))
- [Miner X Fellowship](https://docs.google.com/document/d/1iqZ2xV5tlOJMrPQAg7V1XJQZz6CF1LYDHkwRGtoV5-g/edit) - 支持和学习中小型miner的经验.
- [Slingshot Competition](https://slingshot.filecoin.io/)

### 市场资源检索 (WIP 实验)

检索市场处于早期发展阶段;研发团队正在积极探索改进方案。

- [浏览器检索客户端](https://github.com/filecoin-shipyard/browser-retrieval)
- [使用WASM的浏览器检索客户端](https://github.com/jimpick/lotus-retrieve-api-daemon)
- [ChainSafe的全节点检索客户端](https://github.com/ChainSafe/fil-secondary-retrieval-markets)
- [去中心化数据交付市场-开放问题和rfc](https://github.com/protocol/ResNetLab/blob/master/OPEN_PROBLEMS/DECENTRALIZED_DATA_DELIVERY_MARKETS.md)
- [2020年7月检索市场研讨会](https://www.youtube.com/watch?v=eUcsZ1JS9pM) [Sessions]的列表 (https://docs.google.com/document/d/17bEHP2CHkQFYYQnl7YpatAOh6kWxjlNgihdc4F66SVM/edit)

## 钱包

用于发送和接收FIL令牌的工具。

### 钱包(审计)

下面推荐由知名安全审计员对其开源代码进行第三方审计的钱包.

- [Glif web 钱包](https://github.com/openworklabs/filecoin-web-wallet) - **_推荐_** - 安全审计web钱包，支持发送和接收FIL, 也集成了Ledger硬件(使用审计 [filecoin-signing-tools library](https://github.com/Zondax/filecoin-signing-tools) 下面).
- [**Ledger HW 钱包** in Filecoin Docs](https://docs.filecoin.io/get-started/lotus/ledger/#setup-your-ledger-device) - **_推荐_** - Ledger Live还不支持Filecoin，但Ledger的硬件钱包可以与Glif一起使用。或Filecoin Lotus节点.

### 其他的钱包

下面的钱包支持FIL令牌。我们建议验证这些代码是否已经由有信誉的第三方审计人员进行了安全审计，并且代码库是开源的。请自行评估这些钱包的安全风险，因为不安全的钱包可能会导致资金损失。

- [BlitsWallet](https://blits.net/) - 由Filecoin.loans背后的团队提供
- [Cobo](https://cobo.com/)
- [FilWallet.ai](https://filwallet.ai/) - Filscan.io背后的团队
- [MathWallet](https://mathwallet.org/)
- [ImToken](https://token.im/)
- [TrustWallet](https://trustwallet.com/)
  - [Open-source](https://github.com/trustwallet/wallet-core) 在币安的官方移动钱包Github上

## 生态画廊

- [Awesome Filecoin](https://www.awesomefilecoin.com/) - Filecoin上很棒的项目
- [**Community Projects Showcase**](https://github.com/filecoin-project/community/#ecosystem-projects) - 关于生态系统项目的最新消息
- [Filecoin Ecosystem Grid](https://github.com/filecoin-project/community/discussions/194)

### 活动

- [即将到来的活动](https://github.com/protocol/grants#hackathons)
  + 请关注即将到来的黑客马拉松!
  + 所有获奖者都有资格参加 [Next Steps Grants](https://github.com/filecoin-project/devgrants/blob/master/microgrants/microgrants.md) 在黑客马拉松之后!

### 赠款和加速器

- [**Filecoin Dev 拨款**](https://filecoin.io/grants) - 正在进行的每月开发资助计划，以支持开源项目+新的 [RFPs](https://github.com/filecoin-project/devgrants/tree/master/rfps) 在Filecoin上
  - 由 [Filecoin 基金会](https://fil.org)
- 加速器
  - [Apollo - Gitcoin x Filecoin](https://gitcoin.co/blog/apollo/#:~:text=APOLLO%20will%20run%20from%20August,using%20Filecoin%20and%20Web3%20ecosystem) - 从2020年夏天
  - [Filecoin Frontier Accelerator with LongHash](https://filecoin.io/blog/filecoin-frontier-accelerator/) - 申请截止日期为2020年11月15日
  - [Filecoin Launchpad Accelerator with ConsenSys Tachyon](https://consensys.net/blog/press-release/filecoin-launchpad-accelerator-powered-by-tachyon/) - 从2020年秋季
  - [Huobi-Filecoin Incubation Center](https://filecoin.io/blog/huobi-launches-filecoin-incubation-center/)

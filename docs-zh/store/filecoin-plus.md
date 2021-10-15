---
title: "Filecoin Plus"
description: "Filecoin Plus的目标是通过向网络添加一层社会信任，并引入一种名为DataCap的新资源，实现Filecoin网络的需求侧，并最大化Filecoin上的有用存储量。 希望在网络上使用板载存储的客户可以向社区选择的公证处申请接收DataCap，这可以用来激励存储供应商接受存储交易。"
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 概念

Filecoin Plus基于一套指导原则，[详细见FIP-0003](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0003.md) ，该计划聚焦于提高Filecoin的有效性，使其成为人类最重要信息的分散存储网络。  

根密钥持有者、公证人、客户端和存储提供者通过DataCap的分配和支出进行交互。 公证员批量检索DataCap，然后将其分配给可信任的客户，这些客户使用DataCap为存储交易提供资金。 接受DataCap的存储提供商在该交易中提供的存储空间的质量调整能力得到了10倍的提升，这增加了他们在网络中的区块回报份额。 这创建了一个机制，激励所有参与者使Filecoin更有用。

### DataCap

当将DataCap分配给客户端时，客户端可以在存储处理存储提供者的存储中使用它。 这些交易带来更高的交易质量乘数，这将存储提供商在网络上的“质量调整能力”提高10倍，随着时间的推移，存储提供商将获得更好的区块奖励。 DataCap是分批授予公证处的，公证处可以将其分配给使用DataCap为存储交易提供资金的客户。 DataCap被用来做交易。

### 公证

公证员被选为Filecoin网络的受托人，负责将DataCap分配给有价值的存储用例的客户。 公证员的基本职责包括:

- 负责地将DataCap分配给客户端，以补贴网络上可靠和有价值的存储。
- 确保在分配DataCap时，任何一方都不会以任何可能危及网络的形式获得过度信任。
- 遵循操作指导方针，保留决策流程的记录，并响应对其分配决策进行审计的任何请求。

你可以找到当前的列表 [active notaries at plus.fil.org](https://plus.fil.org).

公证人通过 [申请流程](https://github.com/filecoin-project/notary-governance/tree/main/notaries#application--selection-process) 选择。 如果获得批准，[root key-holders](https://github.com/filecoin-project/notary-governance/tree/main/root-key-holders#overview) （链上社区决策的执行者) 授予公证身份和 DataCap 金额。 那些有兴趣成为公证人的人应通过在 [notary governance repo](https://github.com/filecoin-project/notary-governance/) 中提交问题来申请此角色。
### 客户端

客户可以使用他们的DataCap来激励存储提供商满足他们的需求。 这可以包括提供满足特定需求的附加功能和服务级别。 这样，随着时间的推移，Filecoin上与存储相关的商品和服务将变得更有价值和更具竞争力。 公证员对客户进行审查，以确保客户收到与他们的声誉和需求相称的DataCap，并确保客户负责分配该DataCap。

## 使用 DataCap

### 获取 DataCap

客户端需要有一个可以接收DataCap的链上Filecoin地址。 如果您正在设置一个新地址，请确保通过向该地址发送最小数量的FIL来初始化它，例如，通过从交换器购买一些FIL。 您将需要一个地址来继续以下列任何一种方式获取DataCap。  

_Note:从网络版本12开始，DataCap分配是Filecoin地址上的一次使用积分。 如果你收到一个分配并且需要更多的分配，你应该用一个你已经初始化过的唯一地址发出一个新的请求。 [FIP-0012](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0012.md)在网络版本13(actor v5)中被接受并实现，它允许客户端地址多次接收DataCap_

客户通过向公证人提出请求来获得DataCap。 对于您的第一个32GiB的DataCap分配，您可以使用一个自动验证器，例如https://verify.glif.io/。 自动验证器的存在是为了将DataCap立即授予可以通过特定方法验证自己的客户端。 例如，verify.glif.io自动公证将DataCap授予那些拥有> 180天历史且在过去30天内未在该站点使用过GitHub账户的客户。

1. 请访问https://verify.glif.io/
2. 连接你的GitHub帐户-点击页面右上角的**Start**按钮
3. 如果还没有，请登录GitHub
4. 在“Request”下的框中粘贴你想要接收DataCap的地址，并点击**Request**
5. 自动公证人现在将尝试发送消息到Filecoin网络，您的地址将被授予32GiB的DataCap。 这大约需要1分钟
6. 当完成时，你现在有32GiB开始交易! 你总是可以回到这个网站，并使用“检查”框，看看你有多少DataCap在一个特定的地址  

对于更大规模地接收DataCap(用于业务需求和生产用例)，取决于连接到网络的数据量，客户端有两个选择:

- 直接向特定的公证员申请寻找-最适合客户 <100TiB 的DataCap
- 寻找最适合 >100TiB 的 DataCap(通常在500TiB-5PiB范围内)的客户


直接向指定公证员申请:
1. 前往[Filecoin Plus Registry](https://plus.fil.org/) ，并继续**For Clients**
2. 点击**Get Verified**
3. 点击 **General Verification**。 这个链接将带您到公证人登记处，在那里您可以向特定的公证人请求DataCap。 公证员可能会专门处理他们选择支持的请求类型。 建议您在您的业务区域选择一个公证人，该公证人还涵盖您将将自己归类到的*用例*的一般类别
4. 通过选择他们行的复选框确定您想要申请的公证人，并单击**Make Request**
5. 填写应该弹出的表单。 公证人在授予您所要求的DataCap之前进行任何必要的尽职调查
6. 点击**Sign in with GitHub**允许应用程序创建一个GitHub问题的代表
7. 在您登录后，按钮应该更改为**Send request**。 点击此按钮可以为您创建一个问题，并将其发送给合适的公证人!

在[Fil+ Client Onboarding repo](https://github.com/filecoin-project/filecoin-plus-client-onboarding) 中，每个请求都被跟踪为一个GitHub问题。 您也可以在那里跟踪您的应用程序的进展。 公证员在分配数据卡之前可能会询问额外的信息。  

要申请一个大数据集公证，请遵循[Applying for a large DataCap allocation](https://github.com/filecoin-project/filecoin-plus-large-datasets#applying-for-a-large-datacap-allocation) 的步骤。

### 消耗 DataCap

一旦你有了一个使用DataCap的地址，你就可以使用DataCap作为支付的一部分进行交易。 由于存储提供商在接受Fil+交易时获得交易质量的倍数，许多存储提供商提供特别的价格和服务，以吸引使用DataCap进行交易的客户。  

默认情况下，当您使用分配了DataCap的地址进行交易时，您将在进行交易时花费DataCap.

如果通过[API](https://github.com/filecoin-project/lotus/blob/master/documentation/en/api-v0-methods.md#ClientStartDeal) 进行交易，请确保在调用“ClientStartDeal”时将“VerifiedDeal”参数设置为“true”。

```json
[
  {
    "Data": {
      "TransferType": "string value",
      "Root": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "PieceCid": null,
      "PieceSize": 1024
    },
    "Wallet": "f01234",
    "Miner": "f01234",
    "EpochPrice": "0",
    "MinBlocksDuration": 42,
    "ProviderCollateral": "0",
    "DealStartEpoch": 10101,
    "FastRetrieval": true,
    "VerifiedDeal": true
  }
]
```

如果从命令行进行交易，确保传递标志`--verified-deal=true`作为参数。

```shell
 lotus client deal --verified-deal=true
```

### 检查DataCap的剩余余额

一旦你收到一个地址的DataCap，你可以通过访问一个启用这个功能的网站(例如[verify.glif.io](https://verify.glif.io/))或通过在一个节点上查询你的地址来检查余额。

#### 使用lotus v1.10.0 ^

```
lotus filplus check-client-datacap f00000
```

#### 使用lotus v1.9.0及以下版本
_注意: [Lotus-shed](https://github.com/filecoin-project/lotus/tree/master/cmd/lotus-shed) 是您需要构建和安装的一个单独的包([Lotus](https://github.com/filecoin-project/lotus) 源代码中的`make Lotus-shed`)，尽管这些特性被指定为合并到Lotus._

```
lotus-shed verifreg check-client f00000
```

### 寻找存储供应商接受Fil+交易

客户可以通过几种不同的方式找到存储提供商来接受Fil+存储协议:
1.  在[Filecoin Plus Registry](https://plus.fil.org/) 的**For Clients**部分，有一个[Miner Registry](https://plus.fil.org/miners) ，它列出了一组愿意接受Filecoin + storage交易的自选miner
1.  使用Miner Reputation系统，如[Filecoin Reputation system](http://filrep.io/) 或Textile的 [Miner Index](https://docs.textile.io/filecoin/miner-index/) 来识别能够满足您需求的存储miner
1.  加入Filecoin Slack的[#fil-plus](https://filecoinproject.slack.com/archives/C01DLAPKDGX) 频道讨论存储选项
1.  通过您的节点进入网络并查询存储提供商(使用“查询-询问”)，以查看它们已验证的交易价格

## 参与Fil+ 管理

如果你有兴趣参与治理和规划，以下是你可以参与的方式:

- 加入Filecoin Slack的[#fil-plus](https://filecoinproject.slack.com/archives/C01DLAPKDGX)频道  
- 参加每隔一周的周二举行的社区治理电话会议。 使用Filecoin社区活动日历加入或观看#fil-plus的更新  
- 在[公证人治理回购]中创建和评论公开问题(https://github.com/filecoin-project/notary-governance/issues)  
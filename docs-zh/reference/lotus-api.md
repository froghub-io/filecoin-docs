---
title: 'Lotus API 方法'
description: '本页列出了Lotus API中所有可用的方法。该列表直接来自Lotus GitHub仓库。'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

Lotus Node 和 Lotus Miner 在启动时都会提供 JSON-RPC API 。 lotus 和 lotus-miners 的 CLI 应用程序使用这些 API 来控制运行中的守护进程，因此这些应用程序执行的所有必要功能也都以 API 方法存在。

## 特性

### Endpoints

API 可以通过以下方式访问：

- `http://[api:port]/rpc/v0` - HTTP RPC-API endpoint
- `ws://[api:port]/rpc/v0` - Websocket RPC-API endpoint
- `http://[api:port]/rest/v0/import` (PUT only) - 用于文件导入（多部分上传）的 REST endpoint，它需要写权限。

_Lotus Node_ 在其[配置](../get-started/lotus/configuration-and-advanced-usage.md)和_Lotus Miner_[自有配置文件](../mine/lotus/miner-configuration.md)中配置其监听接口和端口。

### API 客户端库

阅读[Lotus客户端库页面](../build/lotus/api-client-libraries.md)以了解现有客户端的概况。

Lotus使用自己的Go库实现 [JSON-RPC](https://github.com/filecoin-project/go-jsonrpc) 。关于如何使用它的客户端的例子可在[这里](../build/lotus/go-json-rpc.md)。

### cURL 实例

为了演示API请求，我们将从 [api/api_full.go](https://github.com/filecoin-project/lotus/blob/master/api/api_full.go) 中获取方法 `ChainHead` 并创建一个CURL命令。这个方法的定义是：

```go
ChainHead(context.Context) (*types.TipSet, error)
```

因此， `ChainHead` 将翻译成以下 [JSON-RPC](https://www.jsonrpc.org/specification) 请求对象。

```json
{
    "jsonrpc": "2.0",
    "method": "Filecoin.ChainHead",
    "params": [],
    "id": 1
}
```

注意`id`是一个任意的**数**。

为了进行cURL请求，我们还需要一个[授权令牌，可以很容易获得](../build/lotus/api-tokens.md)。

```sh
curl -X POST \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $(cat ~/.lotus/token)" \
--data '{ "jsonrpc": "2.0", "method": "Filecoin.ChainHead", "params": [], "id": 1 }' \
'http://127.0.0.1:1234/rpc/v0'
```

响应将是一个与 [Tipset类型](https://pkg.go.dev/github.com/filecoin-project/lotus/chain/types?tab=doc#TipSet) 相对应的JSON对象(它实际上是从 [ExpTipSet类型](https://pkg.go.dev/github.com/filecoin-project/lotus/chain/types?tab=doc#ExpTipSet) 序列化为JSON的)。

现在让我们使用 [ChainGetMessage方法](https://pkg.go.dev/github.com/filecoin-project/lotus/api?tab=doc#FullNode) 对一个CID为 `bafy2bzacedcdedrghloawlwkntdhqnknqzxgh26ddwix7ld2a5ygagco3ngee` 的消息进行参数请求。根据上述情况， JSON-RPC 请求的有效载荷将是这样的：

```json
{
    "jsonrpc": "2.0",
    "method": "Filecoin.ChainGetMessage",
    "params": [
        { "/": "bafy2bzacedcdedrghloawlwkntdhqnknqzxgh26ddwix7ld2a5ygagco3ngee" }
    ],
        "id": 1
}
```

请注意CID是如何被序列化的（一个常见的错误。然后，cURL请求将被：

```sh
curl -X POST \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $(cat ~/.lotusminer/token)" \
--data '{"jsonrpc":"2.0","method":"Filecoin.ChainGetMessage","params":[{"/":"bafy2bzacedcdedrghloawlwkntdhqnknqzxgh26ddwix7ld2a5ygagco3ngee"}],"id":1}' \
'http://127.0.0.1:1234/rpc/v0'
```

而响应是一个 JSON 序列化的 [消息类型](https://pkg.go.dev/github.com/filecoin-project/lotus/chain/types?tab=doc#Message) 。以上所有内容应该能帮助你利用 Lotus APIs 的强大功能进行引导。

---

# 方法

## 组

### Closing


Perms: read

Inputs: `null`

Response: `{}`

### Session


Perms: read

Inputs: `null`

Response: `"07070707-0707-0707-0707-070707070707"`

### Shutdown


Perms: admin

Inputs: `null`

Response: `{}`

### Version


Perms: read

Inputs: `null`

Response:
```json
{
  "Version": "string value",
  "APIVersion": 65792,
  "BlockDelay": 42
}
```

## Auth


### AuthNew


Perms: admin

Inputs:
```json
[
  null
]
```

Response: `"Ynl0ZSBhcnJheQ=="`

### AuthVerify


Perms: read

Inputs:
```json
[
  "string value"
]
```

Response: `null`

## Beacon
Beacon 方法组包含与随机 Beacon （DRAND）交互的方法。


### BeaconGetEntry
BeaconGetEntry 返回给定 filecoin epoch 的 beacon entry 。如果
该 entry 尚未产生，call 将被阻止，直到该条目的 entry 变为可用


Perms: read

Inputs:
```json
[
  10101
]
```

Response:
```json
{
  "Round": 42,
  "Data": "Ynl0ZSBhcnJheQ=="
}
```

## Chain
链式方法组包含了用于与区块链，但不需要任何形式的状态计算。


### ChainDeleteObj
ChainDeleteObj 删除由给定 CID 引用的节点。


Perms: admin

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `{}`

### ChainExport
ChainExport 返回一个带有 CAR dump 的链数据的字节流。
导出的链数据包括来自给定 tipset 的头链。
回到创世纪，整个创世纪状态，以及最新的 `nroots` 状态树。
如果设置了 oldmsgskip ，那么在请求的根之前的消息也不包括在内。


Perms: read

Inputs:
```json
[
  10101,
  true,
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `"Ynl0ZSBhcnJheQ=="`

### ChainGetBlock
ChainGetBlock返回给定CID指定的块。


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:
```json
{
  "Miner": "f01234",
  "Ticket": {
    "VRFProof": "Ynl0ZSBhcnJheQ=="
  },
  "ElectionProof": {
    "WinCount": 9,
    "VRFProof": "Ynl0ZSBhcnJheQ=="
  },
  "BeaconEntries": null,
  "WinPoStProof": null,
  "Parents": null,
  "ParentWeight": "0",
  "Height": 10101,
  "ParentStateRoot": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "ParentMessageReceipts": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Messages": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "BLSAggregate": {
    "Type": 2,
    "Data": "Ynl0ZSBhcnJheQ=="
  },
  "Timestamp": 42,
  "BlockSig": {
    "Type": 2,
    "Data": "Ynl0ZSBhcnJheQ=="
  },
  "ForkSignaling": 42,
  "ParentBaseFee": "0"
}
```

### ChainGetBlockMessages
ChainGetBlockMessages 返回存储在指定块中的消息。


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:
```json
{
  "BlsMessages": null,
  "SecpkMessages": null,
  "Cids": null
}
```

### ChainGetGenesis
ChainGetGenesis 返回 genesis tipset。


Perms: read

Inputs: `null`

Response:
```json
{
  "Cids": null,
  "Blocks": null,
  "Height": 0
}
```

### ChainGetMessage
ChainGetMessage 从链块存储中读取指定 CID 引用的消息。


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:
```json
{
  "Version": 42,
  "To": "f01234",
  "From": "f01234",
  "Nonce": 42,
  "Value": "0",
  "GasLimit": 9,
  "GasFeeCap": "0",
  "GasPremium": "0",
  "Method": 1,
  "Params": "Ynl0ZSBhcnJheQ==",
  "CID": {
    "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
  }
}
```

### ChainGetNode
目前还没有人对这个方法发表评论。

Perms: read

Inputs:
```json
[
  "string value"
]
```

Response:
```json
{
  "Cid": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Obj": {}
}
```

### ChainGetParentMessages
ChainGetParentMessages 返回存储在指定块的父级 tipset 中的消息。


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `null`

### ChainGetParentReceipts
ChainGetParentReceipts 返回指定块的父级 tipset 的消息接收。


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `null`

### ChainGetPath
ChainGetPath返回一组从一个 tipset 到另一个 tipset 所需的还原/应用操作，例如：
```
       to
        ^
from   tAA
  ^     ^
tBA    tAB
 ^---*--^
     ^
    tRR
```
将返回 `[revert(tBA), apply(tAB), apply(tAA)]`


Perms: read

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ],
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `null`

### ChainGetRandomnessFromBeacon
ChainGetRandomnessFromBeacon 用于对 beacon 进行随机性采样。


Perms: read

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ],
  2,
  10101,
  "Ynl0ZSBhcnJheQ=="
]
```

Response: `null`

### ChainGetRandomnessFromTickets
ChainGetRandomnessFromTickets 用于对链条进行随机性采样。


Perms: read

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ],
  2,
  10101,
  "Ynl0ZSBhcnJheQ=="
]
```

Response: `null`

### ChainGetTipSet
ChainGetTipSet 返回由给定的 TipSetKey 指定的提示集。


Perms: read

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "Cids": null,
  "Blocks": null,
  "Height": 0
}
```

### ChainGetTipSetByHeight
ChainGetTipSetByHeight 可以回溯到指定纪元的 tipset 。
如果在指定的纪元没有块，将返回一个较早纪元的 tipset 。


Perms: read

Inputs:
```json
[
  10101,
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "Cids": null,
  "Blocks": null,
  "Height": 0
}
```

### ChainHasObj
ChainHasObj 检查给定的 CID 是否存在于链块存储中。


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `true`

### ChainHead
ChainHead 返回当前链的头部。


Perms: read

Inputs: `null`

Response:
```json
{
  "Cids": null,
  "Blocks": null,
  "Height": 0
}
```

### ChainNotify
ChainNotify返回链头更新的通道。
第一条消息保证是：len == 1，type == 'current'。


Perms: read

Inputs: `null`

Response: `null`

### ChainReadObj
ChainReadObj 从链块存储中读取指定 CID 引用的 ipld 节点，并返回原始字节。


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `"Ynl0ZSBhcnJheQ=="`

### ChainSetHead
ChainSetHead 强行设置当前链头。谨慎使用。


Perms: admin

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `{}`

### ChainStatObj
ChainStatObj 返回 'obj' 引用的图的统计数据。
如果同时指定了 'base' ，那么返回的统计数据将是两个对象之间的差异。


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:
```json
{
  "Size": 42,
  "Links": 42
}
```

### ChainTipSetWeight
ChainTipSetWeight 计算指定的 tipset 的重量。


Perms: read

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `"0"`

## Client
客户端方法都要以客户的身份与存储和检索市场进行交互。


### ClientCalcCommP
ClientCalcCommP 计算指定文件的 CommP。


Perms: read

Inputs:
```json
[
  "string value"
]
```

Response:
```json
{
  "Root": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Size": 1024
}
```

### ClientCancelDataTransfer
ClientCancelDataTransfer 取消给定的传输 ID 和其他对等体的数据传输。


Perms: write

Inputs:
```json
[
  3,
  "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
  true
]
```

Response: `{}`

### ClientDataTransferUpdates
目前还没有人对这个方法发表评论。

Perms: write

Inputs: `null`

Response:
```json
{
  "TransferID": 3,
  "Status": 1,
  "BaseCID": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "IsInitiator": true,
  "IsSender": true,
  "Voucher": "string value",
  "Message": "string value",
  "OtherPeer": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
  "Transferred": 42
}
```

### ClientDealPieceCID
ClientCalcCommP 计算指定 CID 的 CommP 和数据大小。


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:
```json
{
  "PayloadSize": 9,
  "PieceSize": 1032,
  "PieceCID": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
}
```

### ClientDealSize
ClientDealSize 计算实际交易数据大小。


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:
```json
{
  "PayloadSize": 9,
  "PieceSize": 1032
}
```

### ClientFindData
ClientFindData 识别拥有某个文件的对等体，并返回 QueryOffers（每个对等体一个）。


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  null
]
```

Response: `null`

### ClientGenCar
ClientGenCar 为指定的文件生成一个 CAR 文件。


Perms: write

Inputs:
```json
[
  {
    "Path": "string value",
    "IsCAR": true
  },
  "string value"
]
```

Response: `{}`

### ClientGetDealInfo
ClientGetDealInfo 返回给定交易的最新信息。


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:
```json
{
  "ProposalCid": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "State": 42,
  "Message": "string value",
  "Provider": "f01234",
  "DataRef": {
    "TransferType": "string value",
    "Root": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "PieceCid": null,
    "PieceSize": 1024,
    "RawBlockSize": 42
  },
  "PieceCID": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Size": 42,
  "PricePerEpoch": "0",
  "Duration": 42,
  "DealID": 5432,
  "CreationTime": "0001-01-01T00:00:00Z",
  "Verified": true,
  "TransferChannelID": {
    "Initiator": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "Responder": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "ID": 3
  },
  "DataTransfer": {
    "TransferID": 3,
    "Status": 1,
    "BaseCID": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "IsInitiator": true,
    "IsSender": true,
    "Voucher": "string value",
    "Message": "string value",
    "OtherPeer": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "Transferred": 42
  }
}
```

### ClientGetDealStatus
ClientGetDealStatus 返回给定代码的状态。


Perms: read

Inputs:
```json
[
  42
]
```

Response: `"string value"`

### ClientGetDealUpdates
ClientGetDealUpdates 返回更新的交易状态。


Perms: read

Inputs: `null`

Response:
```json
{
  "ProposalCid": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "State": 42,
  "Message": "string value",
  "Provider": "f01234",
  "DataRef": {
    "TransferType": "string value",
    "Root": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "PieceCid": null,
    "PieceSize": 1024,
    "RawBlockSize": 42
  },
  "PieceCID": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Size": 42,
  "PricePerEpoch": "0",
  "Duration": 42,
  "DealID": 5432,
  "CreationTime": "0001-01-01T00:00:00Z",
  "Verified": true,
  "TransferChannelID": {
    "Initiator": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "Responder": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "ID": 3
  },
  "DataTransfer": {
    "TransferID": 3,
    "Status": 1,
    "BaseCID": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "IsInitiator": true,
    "IsSender": true,
    "Voucher": "string value",
    "Message": "string value",
    "OtherPeer": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "Transferred": 42
  }
}
```

### ClientHasLocal
ClientHasLocal 表示是否在本地存储某个 CID。


Perms: write

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `true`

### ClientImport
ClientImport 将指定路径下的文件导入 filetore。


Perms: admin

Inputs:
```json
[
  {
    "Path": "string value",
    "IsCAR": true
  }
]
```

Response:
```json
{
  "Root": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "ImportID": 50
}
```

### ClientListDataTransfers
ClientListTransfers 返回所有正在进行的数据传输的状态。


Perms: write

Inputs: `null`

Response: `null`

### ClientListDeals
ClientListDeals 返回本地客户的交易信息。


Perms: write

Inputs: `null`

Response: `null`

### ClientListImports
ClientListImports 列出了导入的文件和它们的根 CID。


Perms: write

Inputs: `null`

Response: `null`

### ClientMinerQueryOffer
ClientMinerQueryOffer 返回特定miner和文件的 QueryOffer。


Perms: read

Inputs:
```json
[
  "f01234",
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  null
]
```

Response:
```json
{
  "Err": "string value",
  "Root": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Piece": null,
  "Size": 42,
  "MinPrice": "0",
  "UnsealPrice": "0",
  "PaymentInterval": 42,
  "PaymentIntervalIncrease": 42,
  "Miner": "f01234",
  "MinerPeer": {
    "Address": "f01234",
    "ID": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "PieceCID": null
  }
}
```

### ClientQueryAsk
ClientQueryAsk 从指定的miner那里返回一个签名的 StorageAsk。


Perms: read

Inputs:
```json
[
  "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
  "f01234"
]
```

Response:
```json
{
  "Price": "0",
  "VerifiedPrice": "0",
  "MinPieceSize": 1032,
  "MaxPieceSize": 1032,
  "Miner": "f01234",
  "Timestamp": 10101,
  "Expiry": 10101,
  "SeqNo": 42
}
```

### ClientRemoveImport
客户端 RemoveImport 删除文件导入。


Perms: admin

Inputs:
```json
[
  50
]
```

Response: `{}`

### ClientRestartDataTransfer
ClientRestartDataTransfer 试图用给定的传输ID和其他对等体重新启动数据传输。


Perms: write

Inputs:
```json
[
  3,
  "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
  true
]
```

Response: `{}`

### ClientRetrieve
客户端检索（ClientRetrieve）按照订单指定的方式启动文件的检索。


Perms: admin

Inputs:
```json
[
  {
    "Root": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "Piece": null,
    "Size": 42,
    "Total": "0",
    "UnsealPrice": "0",
    "PaymentInterval": 42,
    "PaymentIntervalIncrease": 42,
    "Client": "f01234",
    "Miner": "f01234",
    "MinerPeer": {
      "Address": "f01234",
      "ID": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
      "PieceCID": null
    }
  },
  {
    "Path": "string value",
    "IsCAR": true
  }
]
```

Response: `{}`

### ClientRetrieveTryRestartInsufficientFunds
ClientRetrieveTryRestartInsufficientFund 试图重新启动由于资金不足而卡住的给定支付通道上的停滞检索。


Perms: write

Inputs:
```json
[
  "f01234"
]
```

Response: `{}`

### ClientRetrieveWithEvents
ClientRetrieveWithEvents 按照顺序指定的方式发起对文件的检索，并提供状态更新的通道。


Perms: admin

Inputs:
```json
[
  {
    "Root": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "Piece": null,
    "Size": 42,
    "Total": "0",
    "UnsealPrice": "0",
    "PaymentInterval": 42,
    "PaymentIntervalIncrease": 42,
    "Client": "f01234",
    "Miner": "f01234",
    "MinerPeer": {
      "Address": "f01234",
      "ID": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
      "PieceCID": null
    }
  },
  {
    "Path": "string value",
    "IsCAR": true
  }
]
```

Response:
```json
{
  "Event": 5,
  "Status": 0,
  "BytesReceived": 42,
  "FundsSpent": "0",
  "Err": "string value"
}
```

### ClientStartDeal
ClientStartDeal 提议与miner进行交易。


Perms: admin

Inputs:
```json
[
  {
    "Data": {
      "TransferType": "string value",
      "Root": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "PieceCid": null,
      "PieceSize": 1024,
      "RawBlockSize": 42
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

Response: `null`

## Create


### CreateBackup
CreateBackup 在指定的文件名下创建节点备份。本方法要求在运行 lotus 守护进程时，环境变量 LOTUS_BACKUP_BASE_PATH 必须设置为某个路径，并且调用 CreateBackup 时指定的路径必须在基本路径范围内。


Perms: admin

Inputs:
```json
[
  "string value"
]
```

Response: `{}`

## Gas


### GasEstimateFeeCap
GasEstimateFeeCap 估算 gas 费用上限。


Perms: read

Inputs:
```json
[
  {
    "Version": 42,
    "To": "f01234",
    "From": "f01234",
    "Nonce": 42,
    "Value": "0",
    "GasLimit": 9,
    "GasFeeCap": "0",
    "GasPremium": "0",
    "Method": 1,
    "Params": "Ynl0ZSBhcnJheQ==",
    "CID": {
      "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
    }
  },
  9,
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `"0"`

### GasEstimateGasLimit
GasEstimateGasLimit 估计消息使用的gas并返回。如果消息未能执行，则返回失败。


Perms: read

Inputs:
```json
[
  {
    "Version": 42,
    "To": "f01234",
    "From": "f01234",
    "Nonce": 42,
    "Value": "0",
    "GasLimit": 9,
    "GasFeeCap": "0",
    "GasPremium": "0",
    "Method": 1,
    "Params": "Ynl0ZSBhcnJheQ==",
    "CID": {
      "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
    }
  },
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `9`

### GasEstimateGasPremium
GasEstimateGasPremium 估计一个消息应该使用什么样的天 gas 价格，才有很大的可能被包含在`nblocksincl`时代。


Perms: read

Inputs:
```json
[
  42,
  "f01234",
  9,
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `"0"`

### GasEstimateMessageGas
GasEstimateMessageGas估计未设置message gas field的 gas 值。


Perms: read

Inputs:
```json
[
  {
    "Version": 42,
    "To": "f01234",
    "From": "f01234",
    "Nonce": 42,
    "Value": "0",
    "GasLimit": 9,
    "GasFeeCap": "0",
    "GasPremium": "0",
    "Method": 1,
    "Params": "Ynl0ZSBhcnJheQ==",
    "CID": {
      "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
    }
  },
  {
    "MaxFee": "0"
  },
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "Version": 42,
  "To": "f01234",
  "From": "f01234",
  "Nonce": 42,
  "Value": "0",
  "GasLimit": 9,
  "GasFeeCap": "0",
  "GasPremium": "0",
  "Method": 1,
  "Params": "Ynl0ZSBhcnJheQ==",
  "CID": {
    "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
  }
}
```

## I

### ID

Perms: read

Inputs: `null`

Response: `"12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf"`

## Log


### LogList


Perms: write

Inputs: `null`

Response: `null`

### LogSetLevel


Perms: write

Inputs:
```json
[
  "string value",
  "string value"
]
```

Response: `{}`

## Market


### MarketAddBalance
MarketAddBalance将资金添加到市场 actor 中。


Perms: sign

Inputs:
```json
[
  "f01234",
  "f01234",
  "0"
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### MarketGetReserved
MarketGetReserved 获取当前为该地址保留的资金量。


Perms: sign

Inputs:
```json
[
  "f01234"
]
```

Response: `"0"`

### MarketReleaseFunds
MarketReleaseFunds 释放 MarketReserveFunds 保留的资金。


Perms: sign

Inputs:
```json
[
  "f01234",
  "0"
]
```

Response: `{}`

### MarketReserveFunds
MarketReserveFunds 为交易储备资金。


Perms: sign

Inputs:
```json
[
  "f01234",
  "f01234",
  "0"
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### MarketWithdraw
MarketWithdraw 提取市场 actor 的解锁资金。


Perms: sign

Inputs:
```json
[
  "f01234",
  "f01234",
  "0"
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

## Miner


### MinerCreateBlock
目前还没有人对这个方法发表评论。

Perms: write

Inputs:
```json
[
  {
    "Miner": "f01234",
    "Parents": [
      {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      {
        "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
      }
    ],
    "Ticket": {
      "VRFProof": "Ynl0ZSBhcnJheQ=="
    },
    "Eproof": {
      "WinCount": 9,
      "VRFProof": "Ynl0ZSBhcnJheQ=="
    },
    "BeaconValues": null,
    "Messages": null,
    "Epoch": 10101,
    "Timestamp": 42,
    "WinningPoStProof": null
  }
]
```

Response:
```json
{
  "Header": {
    "Miner": "f01234",
    "Ticket": {
      "VRFProof": "Ynl0ZSBhcnJheQ=="
    },
    "ElectionProof": {
      "WinCount": 9,
      "VRFProof": "Ynl0ZSBhcnJheQ=="
    },
    "BeaconEntries": null,
    "WinPoStProof": null,
    "Parents": null,
    "ParentWeight": "0",
    "Height": 10101,
    "ParentStateRoot": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "ParentMessageReceipts": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "Messages": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "BLSAggregate": {
      "Type": 2,
      "Data": "Ynl0ZSBhcnJheQ=="
    },
    "Timestamp": 42,
    "BlockSig": {
      "Type": 2,
      "Data": "Ynl0ZSBhcnJheQ=="
    },
    "ForkSignaling": 42,
    "ParentBaseFee": "0"
  },
  "BlsMessages": null,
  "SecpkMessages": null
}
```

### MinerGetBaseInfo
目前还没有人对这个方法发表评论。

Perms: read

Inputs:
```json
[
  "f01234",
  10101,
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "MinerPower": "0",
  "NetworkPower": "0",
  "Sectors": null,
  "WorkerKey": "f01234",
  "SectorSize": 34359738368,
  "PrevBeaconEntry": {
    "Round": 42,
    "Data": "Ynl0ZSBhcnJheQ=="
  },
  "BeaconEntries": null,
  "EligibleForMining": true
}
```

## Mpool
Mpool 方法用于与消息池进行交互。消息池管理所有通过网络传入和传出的 "消息"。


### MpoolBatchPush
MpoolBatchPush 批量推送签名消息到 mempool。


Perms: write

Inputs:
```json
[
  null
]
```

Response: `null`

### MpoolBatchPushMessage
MpoolBatchPushMessage 批量推送一条无符号消息到 mempool。


Perms: sign

Inputs:
```json
[
  null,
  {
    "MaxFee": "0"
  }
]
```

Response: `null`

### MpoolBatchPushUntrusted
MpoolBatchPushUntrusted 批量从非信任来源向 mempool 推送签名消息。


Perms: write

Inputs:
```json
[
  null
]
```

Response: `null`

### MpoolClear
MpoolClear 清除mpool中的待处理信息。


Perms: write

Inputs:
```json
[
  true
]
```

Response: `{}`

### MpoolGetConfig
MpoolGetConfig 返回当前 mpool 配置的(副本)


Perms: read

Inputs: `null`

Response:
```json
{
  "PriorityAddrs": null,
  "SizeLimitHigh": 123,
  "SizeLimitLow": 123,
  "ReplaceByFeeRatio": 12.3,
  "PruneCooldown": 60000000000,
  "GasLimitOverestimation": 12.3
}
```

### MpoolGetNonce
MpoolGetNonce 为指定的 sender 获取下一个 nonce .注意，这个方法可能不是原子的，使用 MpoolPushMessage 代替。


Perms: read

Inputs:
```json
[
  "f01234"
]
```

Response: `42`

### MpoolPending
MpoolPending 返回待处理的 mempool 消息。


Perms: read

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `null`

### MpoolPush
MpoolPush 向 mempool 推送一条签名消息。


Perms: write

Inputs:
```json
[
  {
    "Message": {
      "Version": 42,
      "To": "f01234",
      "From": "f01234",
      "Nonce": 42,
      "Value": "0",
      "GasLimit": 9,
      "GasFeeCap": "0",
      "GasPremium": "0",
      "Method": 1,
      "Params": "Ynl0ZSBhcnJheQ==",
      "CID": {
        "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
      }
    },
    "Signature": {
      "Type": 2,
      "Data": "Ynl0ZSBhcnJheQ=="
    },
    "CID": {
      "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
    }
  }
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### MpoolPushMessage
MpoolPushMessage 原子化地分配一个 nonce，标志，并将消息推送到 mempool。
maxFee 仅在没有指定GasFeeCap/GasPremium字段时使用。
当 maxFee 设置为 0 时，MpoolPushMessage 将根据当前的链路状况猜测合适的费用。


Perms: sign

Inputs:
```json
[
  {
    "Version": 42,
    "To": "f01234",
    "From": "f01234",
    "Nonce": 42,
    "Value": "0",
    "GasLimit": 9,
    "GasFeeCap": "0",
    "GasPremium": "0",
    "Method": 1,
    "Params": "Ynl0ZSBhcnJheQ==",
    "CID": {
      "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
    }
  },
  {
    "MaxFee": "0"
  }
]
```

Response:
```json
{
  "Message": {
    "Version": 42,
    "To": "f01234",
    "From": "f01234",
    "Nonce": 42,
    "Value": "0",
    "GasLimit": 9,
    "GasFeeCap": "0",
    "GasPremium": "0",
    "Method": 1,
    "Params": "Ynl0ZSBhcnJheQ==",
    "CID": {
      "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
    }
  },
  "Signature": {
    "Type": 2,
    "Data": "Ynl0ZSBhcnJheQ=="
  },
  "CID": {
    "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
  }
}
```

### MpoolPushUntrusted
MpoolPushUntrusted 从非信任来源向 mempool 推送签名消息。


Perms: write

Inputs:
```json
[
  {
    "Message": {
      "Version": 42,
      "To": "f01234",
      "From": "f01234",
      "Nonce": 42,
      "Value": "0",
      "GasLimit": 9,
      "GasFeeCap": "0",
      "GasPremium": "0",
      "Method": 1,
      "Params": "Ynl0ZSBhcnJheQ==",
      "CID": {
        "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
      }
    },
    "Signature": {
      "Type": 2,
      "Data": "Ynl0ZSBhcnJheQ=="
    },
    "CID": {
      "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
    }
  }
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### MpoolSelect
MpoolSelect 返回一个待处理的消息列表，以便包含在下一个块中。


Perms: read

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ],
  12.3
]
```

Response: `null`

### MpoolSetConfig
MpoolSetConfig 将 mpool 配置设置为提供的配置的（副本）。


Perms: write

Inputs:
```json
[
  {
    "PriorityAddrs": null,
    "SizeLimitHigh": 123,
    "SizeLimitLow": 123,
    "ReplaceByFeeRatio": 12.3,
    "PruneCooldown": 60000000000,
    "GasLimitOverestimation": 12.3
  }
]
```

Response: `{}`

### MpoolSub
目前还没有人对这个方法发表评论。

Perms: read

Inputs: `null`

Response:
```json
{
  "Type": 0,
  "Message": {
    "Message": {
      "Version": 42,
      "To": "f01234",
      "From": "f01234",
      "Nonce": 42,
      "Value": "0",
      "GasLimit": 9,
      "GasFeeCap": "0",
      "GasPremium": "0",
      "Method": 1,
      "Params": "Ynl0ZSBhcnJheQ==",
      "CID": {
        "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
      }
    },
    "Signature": {
      "Type": 2,
      "Data": "Ynl0ZSBhcnJheQ=="
    },
    "CID": {
      "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
    }
  }
}
```

## Msig
Msig方法用于与文件币网络上的 multisig 钱包交互。


### MsigAddApprove
MsigAddApprove 批准先前提议的 AddSigner 消息。
它需要以下参数： `<multisig address>`, `<sender address of the approve msg>`, `<proposed message ID>`,
`<proposer address>`, `<new signer>`, `<whether the number of required signers should be increased>`


Perms: sign

Inputs:
```json
[
  "f01234",
  "f01234",
  42,
  "f01234",
  "f01234",
  true
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### MsigAddCancel
MsigAddCancel 取消之前提议的 AddSigner 消息。
它需要以下参数：`<multisig address>`, `<sender address of the cancel msg>`, `<proposed message ID>`,
`<new signer>`, `<whether the number of required signers should be increased>`


Perms: sign

Inputs:
```json
[
  "f01234",
  "f01234",
  42,
  "f01234",
  true
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### MsigAddPropose
MsigAddPropose 建议在多签名人中增加一个签名人。
它需要以下参数：`<multisig address>`, `<sender address of the propose msg>`,
`<new signer>`, `<whether the number of required signers should be increased>`


Perms: sign

Inputs:
```json
[
  "f01234",
  "f01234",
  "f01234",
  true
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### MsigApprove
MsigApprove 通过交易ID批准先前提出的 multisig message。
它需要以下参数：`<multisig address>`, `<proposed transaction ID>` `<signer address>`


Perms: sign

Inputs:
```json
[
  "f01234",
  42,
  "f01234"
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### MsigApproveTxnHash
MsigApproveTxnHash 可以批准之前提出的 multisig message，该消息使用交易ID和提案中使用的参数的哈希值来指定。这种批准方法可以用来确保你只批准你认为准确的事务。
它需要以下参数： `<multisig address>`, `<proposed message ID>`, `<proposer address>`, `<recipient address>`, `<value to transfer>`,
`<sender address of the approve msg>`, `<method to call in the proposed message>`, `<params to include in the proposed message>`


Perms: sign

Inputs:
```json
[
  "f01234",
  42,
  "f01234",
  "f01234",
  "0",
  "f01234",
  42,
  "Ynl0ZSBhcnJheQ=="
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### MsigCancel
MsigCancel 取消了之前提议的 multisig message。
它需要以下参数：`<multisig address>`, `<proposed transaction ID>`, `<recipient address>`, `<value to transfer>`,
`<sender address of the cancel msg>`, `<method to call in the proposed message>`, `<params to include in the proposed message>`


Perms: sign

Inputs:
```json
[
  "f01234",
  42,
  "f01234",
  "0",
  "f01234",
  42,
  "Ynl0ZSBhcnJheQ=="
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### MsigCreate
MsigCreate创建一个 multisig 钱包。
它需要以下参数：`<required number of senders>`, `<approving addresses>`, `<unlock duration>`
`<initial balance>`, `<sender address of the create msg>`, `<gas price>`


Perms: sign

Inputs:
```json
[
  42,
  null,
  10101,
  "0",
  "f01234",
  "0"
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### MsigGetAvailableBalance
MsigGetAvailableBalance 返回 Multisig 余额中可以提取或使用的部分。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `"0"`

### MsigGetPending
MsigGetPending会返回给定 multisig 钱包的待处理交易。一旦待处理的交易被完全批准，它们将不再出现在这里。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `null`

### MsigGetVested
MsigGetVested 返回在某一时期内归属某个多变量的 FIL 的数量。
它需要以下参数：`<multisig address>`, `<start epoch>`, `<end epoch>`


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ],
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `"0"`

### MsigGetVestingSchedule
MsigGetVestingSchedule 返回给定的 multisig 的归属细节。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "InitialBalance": "0",
  "StartEpoch": 10101,
  "UnlockDuration": 10101
}
```

### MsigPropose
MsigPropose 提出了一个 multisig message
它需要以下参数：`<multisig address>`, `<recipient address>`, `<value to transfer>`,
`<sender address of the propose msg>`, `<method to call in the proposed message>`, `<params to include in the proposed message>`


Perms: sign

Inputs:
```json
[
  "f01234",
  "f01234",
  "0",
  "f01234",
  42,
  "Ynl0ZSBhcnJheQ=="
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### MsigRemoveSigner
MsigRemoveSigner 提议从 multisig 中删除一个签名者。
它接受要进行更改的 multisig、要发送消息的提议者地址、要删除的地址以及一个布尔值，该布尔值表示签名阈值是否应该随着地址的删除而降低一个。


Perms: sign

Inputs:
```json
[
  "f01234",
  "f01234",
  "f01234",
  true
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### MsigSwapApprove
MsigSwapApprove 批准先前提议的 SwapSigner。
它需要以下参数： `<multisig address>`, `<sender address of the approve msg>`, `<proposed message ID>`,
`<proposer address>`, `<old signer>`, `<new signer>`


Perms: sign

Inputs:
```json
[
  "f01234",
  "f01234",
  42,
  "f01234",
  "f01234",
  "f01234"
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### MsigSwapCancel
MsigSwapCancel 取消了先前提议的 SwapSigner。
它需要以下参数：`<multisig address>`, `<sender address of the cancel msg>`, `<proposed message ID>`,
`<old signer>`, `<new signer>`


Perms: sign

Inputs:
```json
[
  "f01234",
  "f01234",
  42,
  "f01234",
  "f01234"
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### MsigSwapPropose
MsigSwapPropose建议在 multisig 中交换2个签名人。
它需要以下参数：`<multisig address>`, `<sender address of the propose msg>`, `<old signer>`, `<new signer>`


Perms: sign

Inputs:
```json
[
  "f01234",
  "f01234",
  "f01234",
  "f01234"
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

## Net


### NetAddrsListen


Perms: read

Inputs: `null`

Response:
```json
{
  "Addrs": null,
  "ID": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf"
}
```

### NetAgentVersion


Perms: read

Inputs:
```json
[
  "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf"
]
```

Response: `"string value"`

### NetAutoNatStatus


Perms: read

Inputs: `null`

Response:
```json
{
  "Reachability": 1,
  "PublicAddr": "string value"
}
```

### NetBandwidthStats


Perms: read

Inputs: `null`

Response:
```json
{
  "TotalIn": 9,
  "TotalOut": 9,
  "RateIn": 12.3,
  "RateOut": 12.3
}
```

### NetBandwidthStatsByPeer


Perms: read

Inputs: `null`

Response:
```json
{
  "12D3KooWSXmXLJmBR1M7i9RW9GQPNUhZSzXKzxDHWtAgNuJAbyEJ": {
    "TotalIn": 174000,
    "TotalOut": 12500,
    "RateIn": 100,
    "RateOut": 50
  }
}
```

### NetBandwidthStatsByProtocol


Perms: read

Inputs: `null`

Response:
```json
{
  "/fil/hello/1.0.0": {
    "TotalIn": 174000,
    "TotalOut": 12500,
    "RateIn": 100,
    "RateOut": 50
  }
}
```

### NetBlockAdd


Perms: admin

Inputs:
```json
[
  {
    "Peers": null,
    "IPAddrs": null,
    "IPSubnets": null
  }
]
```

Response: `{}`

### NetBlockList


Perms: read

Inputs: `null`

Response:
```json
{
  "Peers": null,
  "IPAddrs": null,
  "IPSubnets": null
}
```

### NetBlockRemove


Perms: admin

Inputs:
```json
[
  {
    "Peers": null,
    "IPAddrs": null,
    "IPSubnets": null
  }
]
```

Response: `{}`

### NetConnect


Perms: write

Inputs:
```json
[
  {
    "Addrs": null,
    "ID": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf"
  }
]
```

Response: `{}`

### NetConnectedness


Perms: read

Inputs:
```json
[
  "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf"
]
```

Response: `1`

### NetDisconnect


Perms: write

Inputs:
```json
[
  "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf"
]
```

Response: `{}`

### NetFindPeer


Perms: read

Inputs:
```json
[
  "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf"
]
```

Response:
```json
{
  "Addrs": null,
  "ID": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf"
}
```

### NetPeerInfo


Perms: read

Inputs:
```json
[
  "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf"
]
```

Response:
```json
{
  "ID": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
  "Agent": "string value",
  "Addrs": null,
  "Protocols": null,
  "ConnMgrMeta": {
    "FirstSeen": "0001-01-01T00:00:00Z",
    "Value": 123,
    "Tags": {
      "name": 42
    },
    "Conns": {
      "name": "2021-03-08T22:52:18Z"
    }
  }
}
```

### NetPeers


Perms: read

Inputs: `null`

Response: `null`

### NetPubsubScores


Perms: read

Inputs: `null`

Response: `null`

## Paych
Paych 方法是用来与支付渠道进行交互和管理的。


### PaychAllocateLane
目前还没有人对这个方法发表评论。

Perms: sign

Inputs:
```json
[
  "f01234"
]
```

Response: `42`

### PaychAvailableFunds
目前还没有人对这个方法发表评论。

Perms: sign

Inputs:
```json
[
  "f01234"
]
```

Response:
```json
{
  "Channel": "\u003cempty\u003e",
  "From": "f01234",
  "To": "f01234",
  "ConfirmedAmt": "0",
  "PendingAmt": "0",
  "PendingWaitSentinel": null,
  "QueuedAmt": "0",
  "VoucherReedeemedAmt": "0"
}
```

### PaychAvailableFundsByFromTo
目前还没有人对这个方法发表评论。

Perms: sign

Inputs:
```json
[
  "f01234",
  "f01234"
]
```

Response:
```json
{
  "Channel": "\u003cempty\u003e",
  "From": "f01234",
  "To": "f01234",
  "ConfirmedAmt": "0",
  "PendingAmt": "0",
  "PendingWaitSentinel": null,
  "QueuedAmt": "0",
  "VoucherReedeemedAmt": "0"
}
```

### PaychCollect
目前还没有人对这个方法发表评论。

Perms: sign

Inputs:
```json
[
  "f01234"
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### PaychGet
目前还没有人对这个方法发表评论。

Perms: sign

Inputs:
```json
[
  "f01234",
  "f01234",
  "0"
]
```

Response:
```json
{
  "Channel": "f01234",
  "WaitSentinel": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
}
```

### PaychGetWaitReady
目前还没有人对这个方法发表评论。

Perms: sign

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `"f01234"`

### PaychList
目前还没有人对这个方法发表评论。

Perms: read

Inputs: `null`

Response: `null`

### PaychNewPayment
目前还没有人对这个方法发表评论。

Perms: sign

Inputs:
```json
[
  "f01234",
  "f01234",
  null
]
```

Response:
```json
{
  "Channel": "f01234",
  "WaitSentinel": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Vouchers": null
}
```

### PaychSettle
目前还没有人对这个方法发表评论。

Perms: sign

Inputs:
```json
[
  "f01234"
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### PaychStatus
目前还没有人对这个方法发表评论。

Perms: read

Inputs:
```json
[
  "f01234"
]
```

Response:
```json
{
  "ControlAddr": "f01234",
  "Direction": 1
}
```

### PaychVoucherAdd
目前还没有人对这个方法发表评论。

Perms: write

Inputs:
```json
[
  "f01234",
  {
    "ChannelAddr": "f01234",
    "TimeLockMin": 10101,
    "TimeLockMax": 10101,
    "SecretPreimage": "Ynl0ZSBhcnJheQ==",
    "Extra": {
      "Actor": "f01234",
      "Method": 1,
      "Data": "Ynl0ZSBhcnJheQ=="
    },
    "Lane": 42,
    "Nonce": 42,
    "Amount": "0",
    "MinSettleHeight": 10101,
    "Merges": null,
    "Signature": {
      "Type": 2,
      "Data": "Ynl0ZSBhcnJheQ=="
    }
  },
  "Ynl0ZSBhcnJheQ==",
  "0"
]
```

Response: `"0"`

### PaychVoucherCheckSpendable
目前还没有人对这个方法发表评论。

Perms: read

Inputs:
```json
[
  "f01234",
  {
    "ChannelAddr": "f01234",
    "TimeLockMin": 10101,
    "TimeLockMax": 10101,
    "SecretPreimage": "Ynl0ZSBhcnJheQ==",
    "Extra": {
      "Actor": "f01234",
      "Method": 1,
      "Data": "Ynl0ZSBhcnJheQ=="
    },
    "Lane": 42,
    "Nonce": 42,
    "Amount": "0",
    "MinSettleHeight": 10101,
    "Merges": null,
    "Signature": {
      "Type": 2,
      "Data": "Ynl0ZSBhcnJheQ=="
    }
  },
  "Ynl0ZSBhcnJheQ==",
  "Ynl0ZSBhcnJheQ=="
]
```

Response: `true`

### PaychVoucherCheckValid
目前还没有人对这个方法发表评论。

Perms: read

Inputs:
```json
[
  "f01234",
  {
    "ChannelAddr": "f01234",
    "TimeLockMin": 10101,
    "TimeLockMax": 10101,
    "SecretPreimage": "Ynl0ZSBhcnJheQ==",
    "Extra": {
      "Actor": "f01234",
      "Method": 1,
      "Data": "Ynl0ZSBhcnJheQ=="
    },
    "Lane": 42,
    "Nonce": 42,
    "Amount": "0",
    "MinSettleHeight": 10101,
    "Merges": null,
    "Signature": {
      "Type": 2,
      "Data": "Ynl0ZSBhcnJheQ=="
    }
  }
]
```

Response: `{}`

### PaychVoucherCreate
目前还没有人对这个方法发表评论。

Perms: sign

Inputs:
```json
[
  "f01234",
  "0",
  42
]
```

Response:
```json
{
  "Voucher": {
    "ChannelAddr": "f01234",
    "TimeLockMin": 10101,
    "TimeLockMax": 10101,
    "SecretPreimage": "Ynl0ZSBhcnJheQ==",
    "Extra": {
      "Actor": "f01234",
      "Method": 1,
      "Data": "Ynl0ZSBhcnJheQ=="
    },
    "Lane": 42,
    "Nonce": 42,
    "Amount": "0",
    "MinSettleHeight": 10101,
    "Merges": null,
    "Signature": {
      "Type": 2,
      "Data": "Ynl0ZSBhcnJheQ=="
    }
  },
  "Shortfall": "0"
}
```

### PaychVoucherList
目前还没有人对这个方法发表评论。

Perms: write

Inputs:
```json
[
  "f01234"
]
```

Response: `null`

### PaychVoucherSubmit
目前还没有人对这个方法发表评论。

Perms: sign

Inputs:
```json
[
  "f01234",
  {
    "ChannelAddr": "f01234",
    "TimeLockMin": 10101,
    "TimeLockMax": 10101,
    "SecretPreimage": "Ynl0ZSBhcnJheQ==",
    "Extra": {
      "Actor": "f01234",
      "Method": 1,
      "Data": "Ynl0ZSBhcnJheQ=="
    },
    "Lane": 42,
    "Nonce": 42,
    "Amount": "0",
    "MinSettleHeight": 10101,
    "Merges": null,
    "Signature": {
      "Type": 2,
      "Data": "Ynl0ZSBhcnJheQ=="
    }
  },
  "Ynl0ZSBhcnJheQ==",
  "Ynl0ZSBhcnJheQ=="
]
```

Response:
```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

## State
状态方法用于查询、检查和与链状态交互。
大多数方法都会取一个 TipSetKey 作为参数。查询的状态是 tipset的父状态。
可以提供一个 nil 的 TipSetKey 作为参数，这将导致使用链中最重的 tipset 。


### StateAccountKey
StateAccountKey 返回给定 ID 地址的公钥地址。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `"f01234"`

### StateAllMinerFaults
StateAllMinerFaults 返回给定 tipset 的回溯时间内发生的所有未过期的 Faults。


Perms: read

Inputs:
```json
[
  10101,
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `null`

### StateCall
StateCall运行给定的消息，并返回其结果，不做任何持久化的改变。
StateCall 将消息应用到 tipset 的父状态。该消息不会应用在传递进来的 tipset 的消息之上。


Perms: read

Inputs:
```json
[
  {
    "Version": 42,
    "To": "f01234",
    "From": "f01234",
    "Nonce": 42,
    "Value": "0",
    "GasLimit": 9,
    "GasFeeCap": "0",
    "GasPremium": "0",
    "Method": 1,
    "Params": "Ynl0ZSBhcnJheQ==",
    "CID": {
      "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
    }
  },
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "MsgCid": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Msg": {
    "Version": 42,
    "To": "f01234",
    "From": "f01234",
    "Nonce": 42,
    "Value": "0",
    "GasLimit": 9,
    "GasFeeCap": "0",
    "GasPremium": "0",
    "Method": 1,
    "Params": "Ynl0ZSBhcnJheQ==",
    "CID": {
      "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
    }
  },
  "MsgRct": {
    "ExitCode": 0,
    "Return": "Ynl0ZSBhcnJheQ==",
    "GasUsed": 9
  },
  "GasCost": {
    "Message": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "GasUsed": "0",
    "BaseFeeBurn": "0",
    "OverEstimationBurn": "0",
    "MinerPenalty": "0",
    "MinerTip": "0",
    "Refund": "0",
    "TotalCost": "0"
  },
  "ExecutionTrace": {
    "Msg": {
      "Version": 42,
      "To": "f01234",
      "From": "f01234",
      "Nonce": 42,
      "Value": "0",
      "GasLimit": 9,
      "GasFeeCap": "0",
      "GasPremium": "0",
      "Method": 1,
      "Params": "Ynl0ZSBhcnJheQ==",
      "CID": {
        "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
      }
    },
    "MsgRct": {
      "ExitCode": 0,
      "Return": "Ynl0ZSBhcnJheQ==",
      "GasUsed": 9
    },
    "Error": "string value",
    "Duration": 60000000000,
    "GasCharges": null,
    "Subcalls": null
  },
  "Error": "string value",
  "Duration": 60000000000
}
```

### StateChangedActors
StateChangedActors 返回在两个给定的状态 CID 之间状态发生变化的所有角色。
TODO：这是否应该采取 tipset 代替？


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:
```json
{
  "t01236": {
    "Code": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "Head": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "Nonce": 42,
    "Balance": "0"
  }
}
```

### StateCirculatingSupply
StateCirculatingSupply 返回在给定的 tipset 上 Filecoin 的确切流通供应量。
这在协议本身的任何地方都不会被使用，只用于外部消费。


Perms: read

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `"0"`

### StateCompute
StateCompute是一个灵活的命令，它将给定的消息应用于给定的 tipset 。
这些消息的运行就像虚拟机处于提供的高度一样。


Perms: read

Inputs:
```json
[
  10101,
  null,
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "Root": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Trace": null
}
```

### StateDealProviderCollateralBounds
StateDealProviderCollateralBounds 返回存储提供商可以发行的最小和最大抵押品。它把交易规模和验证状态作为参数。


Perms: read

Inputs:
```json
[
  1032,
  true,
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "Min": "0",
  "Max": "0"
}
```

### StateDecodeParams
StateDecodeParams 试图根据接收者 actor 地址和方法号，对提供的 params 进行解码。


Perms: read

Inputs:
```json
[
  "f01234",
  1,
  "Ynl0ZSBhcnJheQ==",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `{}`

### StateGetActor
StateGetActor 返回指定角色的 nonce 和余额。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "Code": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Head": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Nonce": 42,
  "Balance": "0"
}
```

### StateGetReceipt
StateGetReceipt 返回给定消息的消息收据。


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "ExitCode": 0,
  "Return": "Ynl0ZSBhcnJheQ==",
  "GasUsed": 9
}
```

### StateListActors
StateListActors 返回该状态下每个 actor 的地址。


Perms: read

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `null`

### StateListMessages
StateListMessages 回溯并返回所有与地址匹配的消息，以给定的高度为终点。


Perms: read

Inputs:
```json
[
  {
    "To": "f01234",
    "From": "f01234"
  },
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ],
  10101
]
```

Response: `null`

### StateListMiners
StateListMiners 返回在 Power Actor中声称拥有权力的每个miner的地址。


Perms: read

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `null`

### StateLookupID
StateLookupID 检索给定地址的 ID 地址。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `"f01234"`

### StateMarketBalance
StateMarketBalance 在存储市场中查找给定地址的托管和锁定余额。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "Escrow": "0",
  "Locked": "0"
}
```

### StateMarketDeals
StateMarketDeals 返回存储市场中每笔交易的信息。


Perms: read

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "t026363": {
    "Proposal": {
      "PieceCID": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "PieceSize": 1032,
      "VerifiedDeal": true,
      "Client": "f01234",
      "Provider": "f01234",
      "Label": "string value",
      "StartEpoch": 10101,
      "EndEpoch": 10101,
      "StoragePricePerEpoch": "0",
      "ProviderCollateral": "0",
      "ClientCollateral": "0"
    },
    "State": {
      "SectorStartEpoch": 10101,
      "LastUpdatedEpoch": 10101,
      "SlashEpoch": 10101
    }
  }
}
```

### StateMarketParticipants
StateMarketParticipants 返回存储市场中每个参与者的托管和锁定余额。


Perms: read

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "t026363": {
    "Escrow": "0",
    "Locked": "0"
  }
}
```

### StateMarketStorageDeal
StateMarketStorageDeal 返回有关指定交易的信息。


Perms: read

Inputs:
```json
[
  5432,
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "Proposal": {
    "PieceCID": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "PieceSize": 1032,
    "VerifiedDeal": true,
    "Client": "f01234",
    "Provider": "f01234",
    "Label": "string value",
    "StartEpoch": 10101,
    "EndEpoch": 10101,
    "StoragePricePerEpoch": "0",
    "ProviderCollateral": "0",
    "ClientCollateral": "0"
  },
  "State": {
    "SectorStartEpoch": 10101,
    "LastUpdatedEpoch": 10101,
    "SlashEpoch": 10101
  }
}
```

### StateMinerActiveSectors
StateMinerActiveSectors 返回给定miner正在积极证明的sectors 信息。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `null`

### StateMinerAvailableBalance
StateMinerAvailableBalance 返回miner余额中可以提取或花费的部分。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `"0"`

### StateMinerDeadlines
StateMinerDeadlines 返回给定miner的所有证明期限。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `null`

### StateMinerFaults
StateMinerFaults 返回指示给定miner故障扇区的 bitfield 


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
[
  5,
  1
]
```

### StateMinerInfo
StateMinerInfo 返回关于指定miner的信息。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "Owner": "f01234",
  "Worker": "f01234",
  "NewWorker": "f01234",
  "ControlAddresses": null,
  "WorkerChangeEpoch": 10101,
  "PeerId": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
  "Multiaddrs": null,
  "WindowPoStProofType": 8,
  "SectorSize": 34359738368,
  "WindowPoStPartitionSectors": 42,
  "ConsensusFaultElapsed": 10101
}
```

### StateMinerInitialPledgeCollateral
StateMinerInitialPledgeCollateral 返回指定miner sector 的初始质押担保品。


Perms: read

Inputs:
```json
[
  "f01234",
  {
    "SealProof": 8,
    "SectorNumber": 9,
    "SealedCID": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "SealRandEpoch": 10101,
    "DealIDs": null,
    "Expiration": 10101,
    "ReplaceCapacity": true,
    "ReplaceSectorDeadline": 42,
    "ReplaceSectorPartition": 42,
    "ReplaceSectorNumber": 9
  },
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `"0"`

### StateMinerPartitions
StateMinerPartitions 返回指定期限内的所有分区。


Perms: read

Inputs:
```json
[
  "f01234",
  42,
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `null`

### StateMinerPower
StateMinerPower 返回指定miner的功率。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "MinerPower": {
    "RawBytePower": "0",
    "QualityAdjPower": "0"
  },
  "TotalPower": {
    "RawBytePower": "0",
    "QualityAdjPower": "0"
  },
  "HasMinPower": true
}
```

### StateMinerPreCommitDepositForPower
StateMinerInitialPledgeCollateral 返回指定miner sector 的预先承诺存款。


Perms: read

Inputs:
```json
[
  "f01234",
  {
    "SealProof": 8,
    "SectorNumber": 9,
    "SealedCID": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "SealRandEpoch": 10101,
    "DealIDs": null,
    "Expiration": 10101,
    "ReplaceCapacity": true,
    "ReplaceSectorDeadline": 42,
    "ReplaceSectorPartition": 42,
    "ReplaceSectorNumber": 9
  },
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `"0"`

### StateMinerProvingDeadline
StateMinerProvingDeadline 计算一个证明期在某个时代的截止日期，并返回与截止日期相关的计算结果。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "CurrentEpoch": 10101,
  "PeriodStart": 10101,
  "Index": 42,
  "Open": 10101,
  "Close": 10101,
  "Challenge": 10101,
  "FaultCutoff": 10101,
  "WPoStPeriodDeadlines": 42,
  "WPoStProvingPeriod": 10101,
  "WPoStChallengeWindow": 10101,
  "WPoStChallengeLookback": 10101,
  "FaultDeclarationCutoff": 10101
}
```

### StateMinerRecoveries
StateMinerRecoveries返回一个 bitfield ，指示给定miner正在恢复的 sectors 。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
[
  5,
  1
]
```

### StateMinerSectorAllocated
StateMinerSectorAllocated 检查是否有一个 sector 被分配。


Perms: read

Inputs:
```json
[
  "f01234",
  9,
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `true`

### StateMinerSectorCount
StateMinerSectorCount返回miner sectors  集和证明集中的sectors 数。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "Live": 42,
  "Active": 42,
  "Faulty": 42
}
```

### StateMinerSectors
StateMinerSectors  返回给定miner的 sectors 信息。如果过滤 bitfield  为nil，则包含所有 sectors。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    0
  ],
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `null`

### StateNetworkName
StateNetworkName 返回节点同步到的网络名称。


Perms: read

Inputs: `null`

Response: `"lotus"`

### StateNetworkVersion
StateNetworkVersion 返回给定 tipset 的网络版本。


Perms: read

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `9`

### StateReadState
StateReadState返回指定 actor 的状态。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "Balance": "0",
  "Code": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "State": {}
}
```

### StateReplay
StateReplay重播给定的消息，假设它被包含在指定的 tipset 的块中。
如果没有提供 tipset  key，则会查找合适的 tipset。


Perms: read

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ],
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:
```json
{
  "MsgCid": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Msg": {
    "Version": 42,
    "To": "f01234",
    "From": "f01234",
    "Nonce": 42,
    "Value": "0",
    "GasLimit": 9,
    "GasFeeCap": "0",
    "GasPremium": "0",
    "Method": 1,
    "Params": "Ynl0ZSBhcnJheQ==",
    "CID": {
      "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
    }
  },
  "MsgRct": {
    "ExitCode": 0,
    "Return": "Ynl0ZSBhcnJheQ==",
    "GasUsed": 9
  },
  "GasCost": {
    "Message": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "GasUsed": "0",
    "BaseFeeBurn": "0",
    "OverEstimationBurn": "0",
    "MinerPenalty": "0",
    "MinerTip": "0",
    "Refund": "0",
    "TotalCost": "0"
  },
  "ExecutionTrace": {
    "Msg": {
      "Version": 42,
      "To": "f01234",
      "From": "f01234",
      "Nonce": 42,
      "Value": "0",
      "GasLimit": 9,
      "GasFeeCap": "0",
      "GasPremium": "0",
      "Method": 1,
      "Params": "Ynl0ZSBhcnJheQ==",
      "CID": {
        "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
      }
    },
    "MsgRct": {
      "ExitCode": 0,
      "Return": "Ynl0ZSBhcnJheQ==",
      "GasUsed": 9
    },
    "Error": "string value",
    "Duration": 60000000000,
    "GasCharges": null,
    "Subcalls": null
  },
  "Error": "string value",
  "Duration": 60000000000
}
```

### StateSearchMsg
StateSearchMsg在链中搜索一个消息，并返回它的收据和它被执行的 tipset。


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:
```json
{
  "Message": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Receipt": {
    "ExitCode": 0,
    "Return": "Ynl0ZSBhcnJheQ==",
    "GasUsed": 9
  },
  "ReturnDec": {},
  "TipSet": [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ],
  "Height": 10101
}
```

### StateSearchMsgLimited
StateSearchMsgLimited在消息链中回溯到极限时间，并返回它的接收和执行的 tipset。


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  10101
]
```

Response:
```json
{
  "Message": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Receipt": {
    "ExitCode": 0,
    "Return": "Ynl0ZSBhcnJheQ==",
    "GasUsed": 9
  },
  "ReturnDec": {},
  "TipSet": [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ],
  "Height": 10101
}
```

### StateSectorExpiration
StateSectorExpiration 返回给定 sector 到期的时间。


Perms: read

Inputs:
```json
[
  "f01234",
  9,
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "OnTime": 10101,
  "Early": 10101
}
```

### StateSectorGetInfo
StateSectorGetInfo 返回指定miner sector 的链上信息。如果没有找到 sector 信息，则返回 null。
注意：在某些情况下，返回的 info.Expiration 可能不准确，请使用 StateSectorExpiration 获取准确的过期时间。


Perms: read

Inputs:
```json
[
  "f01234",
  9,
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "SectorNumber": 9,
  "SealProof": 8,
  "SealedCID": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "DealIDs": null,
  "Activation": 10101,
  "Expiration": 10101,
  "DealWeight": "0",
  "VerifiedDealWeight": "0",
  "InitialPledge": "0",
  "ExpectedDayReward": "0",
  "ExpectedStoragePledge": "0"
}
```

### StateSectorPartition
StateSectorPartition 找到指定扇区的 deadline/partition 。


Perms: read

Inputs:
```json
[
  "f01234",
  9,
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "Deadline": 42,
  "Partition": 42
}
```

### StateSectorPreCommitInfo
StateSectorPreCommitInfo 返回指定miner sector 的PreCommit 信息。


Perms: read

Inputs:
```json
[
  "f01234",
  9,
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "Info": {
    "SealProof": 8,
    "SectorNumber": 9,
    "SealedCID": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "SealRandEpoch": 10101,
    "DealIDs": null,
    "Expiration": 10101,
    "ReplaceCapacity": true,
    "ReplaceSectorDeadline": 42,
    "ReplaceSectorPartition": 42,
    "ReplaceSectorNumber": 9
  },
  "PreCommitDeposit": "0",
  "PreCommitEpoch": 10101,
  "DealWeight": "0",
  "VerifiedDealWeight": "0"
}
```

### StateVMCirculatingSupplyInternal
StateVMC CirculatingSupplyInternal 返回给定提示集的 Filecoin 流通供应量的近似值。
这是由运行时接口向 actors 代码报告的值。


Perms: read

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response:
```json
{
  "FilVested": "0",
  "FilMined": "0",
  "FilBurnt": "0",
  "FilLocked": "0",
  "FilCirculating": "0"
}
```

### StateVerifiedClientStatus
StateVerifiedClientStatus 返回给定地址的数据上限。
如果该地址的数据上限表中没有条目，则返回 nil。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `"0"`

### StateVerifiedRegistryRootKey
StateVerifiedClientStatus 返回验证注册处的根键地址。


Perms: read

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `"f01234"`

### StateVerifierStatus
StateVerifierStatus 返回给定地址的数据上限。
如果地址的数据上限表中没有条目，则返回 nil。


Perms: read

Inputs:
```json
[
  "f01234",
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `"0"`

### StateWaitMsg
StateWaitMsg 在链中查找消息。如果没有找到，它就会阻塞，直到消息到达链上，并到达指定的置信度深度。


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  42
]
```

Response:
```json
{
  "Message": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Receipt": {
    "ExitCode": 0,
    "Return": "Ynl0ZSBhcnJheQ==",
    "GasUsed": 9
  },
  "ReturnDec": {},
  "TipSet": [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ],
  "Height": 10101
}
```

### StateWaitMsgLimited
StateWaitMsgLimited 会在链上查找消息的极限时间。
如果没有找到，它就会阻塞，直到消息到达链上，并到达指定的置信度深度。


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  42,
  10101
]
```

Response:
```json
{
  "Message": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Receipt": {
    "ExitCode": 0,
    "Return": "Ynl0ZSBhcnJheQ==",
    "GasUsed": 9
  },
  "ReturnDec": {},
  "TipSet": [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ],
  "Height": 10101
}
```

## Sync
同步方法组包含了与 lotus 同步服务交互和观察的方法。


### SyncCheckBad
SyncCheckBad 检查一个块是否被标记为坏，如果是，则返回原因。


Perms: read

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `"string value"`

### SyncCheckpoint
SyncCheckpoint 将一个区块标记为 checkpointed，意味着它永远不会与它分叉。


Perms: admin

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `{}`

### SyncIncomingBlocks
SyncIncomingBlocks 返回一个通道流传进来的，可能还没有同步的块头。


Perms: read

Inputs: `null`

Response:
```json
{
  "Miner": "f01234",
  "Ticket": {
    "VRFProof": "Ynl0ZSBhcnJheQ=="
  },
  "ElectionProof": {
    "WinCount": 9,
    "VRFProof": "Ynl0ZSBhcnJheQ=="
  },
  "BeaconEntries": null,
  "WinPoStProof": null,
  "Parents": null,
  "ParentWeight": "0",
  "Height": 10101,
  "ParentStateRoot": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "ParentMessageReceipts": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Messages": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "BLSAggregate": {
    "Type": 2,
    "Data": "Ynl0ZSBhcnJheQ=="
  },
  "Timestamp": 42,
  "BlockSig": {
    "Type": 2,
    "Data": "Ynl0ZSBhcnJheQ=="
  },
  "ForkSignaling": 42,
  "ParentBaseFee": "0"
}
```

### SyncMarkBad
SyncMarkBad 将一个区块标记为坏的，意味着它永远不会被同步。
使用时要特别小心。


Perms: admin

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `{}`

### SyncState
SyncState 返回 lotus  同步系统的当前状态。


Perms: read

Inputs: `null`

Response:
```json
{
  "ActiveSyncs": null,
  "VMApplied": 42
}
```

### SyncSubmitBlock
SyncSubmitBlock可以用来通过这个节点将新创建的区块提交到网络上。


Perms: write

Inputs:
```json
[
  {
    "Header": {
      "Miner": "f01234",
      "Ticket": {
        "VRFProof": "Ynl0ZSBhcnJheQ=="
      },
      "ElectionProof": {
        "WinCount": 9,
        "VRFProof": "Ynl0ZSBhcnJheQ=="
      },
      "BeaconEntries": null,
      "WinPoStProof": null,
      "Parents": null,
      "ParentWeight": "0",
      "Height": 10101,
      "ParentStateRoot": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "ParentMessageReceipts": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "Messages": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "BLSAggregate": {
        "Type": 2,
        "Data": "Ynl0ZSBhcnJheQ=="
      },
      "Timestamp": 42,
      "BlockSig": {
        "Type": 2,
        "Data": "Ynl0ZSBhcnJheQ=="
      },
      "ForkSignaling": 42,
      "ParentBaseFee": "0"
    },
    "BlsMessages": null,
    "SecpkMessages": null
  }
]
```

Response: `{}`

### SyncUnmarkAllBad
SyncUnmarkAllBad 清除坏块缓存，使其可以同步到之前标记为坏块的链。


Perms: admin

Inputs: `null`

Response: `{}`

### SyncUnmarkBad
SyncUnmarkBad 将一个区块取消标记为坏的，使其可以再次被验证和同步。


Perms: admin

Inputs:
```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `{}`

### SyncValidateTipset
SyncValidateTipset 表示所提供的 tipset 是否有效。


Perms: read

Inputs:
```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `true`

## Wallet


### WalletBalance
WalletBalance 返回给定地址在当前链头的余额。


Perms: read

Inputs:
```json
[
  "f01234"
]
```

Response: `"0"`

### WalletDefaultAddress
WalletDefaultAddress 返回钱包中标记为默认的地址。


Perms: write

Inputs: `null`

Response: `"f01234"`

### WalletDelete
WalletDelete从钱包中删除一个地址。


Perms: write

Inputs:
```json
[
  "f01234"
]
```

Response: `{}`

### WalletExport
WalletExport 返回钱包中一个地址的私钥。


Perms: admin

Inputs:
```json
[
  "f01234"
]
```

Response:
```json
{
  "Type": "bls",
  "PrivateKey": "Ynl0ZSBhcnJheQ=="
}
```

### WalletHas
WalletHas 表示给定地址是否在钱包中。


Perms: write

Inputs:
```json
[
  "f01234"
]
```

Response: `true`

### WalletImport
WalletImport接收一个包含私钥的 KeyInfo ，并将其导入钱包。


Perms: admin

Inputs:
```json
[
  {
    "Type": "bls",
    "PrivateKey": "Ynl0ZSBhcnJheQ=="
  }
]
```

Response: `"f01234"`

### WalletList
WalletList 列出了钱包中的所有地址。


Perms: write

Inputs: `null`

Response: `null`

### WalletNew
WalletNew在钱包中用给定的 sigType 创建一个新地址。
可用的密钥类型: bls, secp256k1, secp256k1-ledger。
支持数字类型。1-secp256k1，2-BLS已废弃。


Perms: write

Inputs:
```json
[
  "bls"
]
```

Response: `"f01234"`

### WalletSetDefault
WalletSetDefault 将给定的地址标记为默认地址。


Perms: admin

Inputs:
```json
[
  "f01234"
]
```

Response: `{}`

### WalletSign
WalletSign 使用给定的地址对给定的字节进行签名。


Perms: sign

Inputs:
```json
[
  "f01234",
  "Ynl0ZSBhcnJheQ=="
]
```

Response:
```json
{
  "Type": 2,
  "Data": "Ynl0ZSBhcnJheQ=="
}
```

### WalletSignMessage
WalletSignMessage 使用给定的地址签署给定的信息。


Perms: sign

Inputs:
```json
[
  "f01234",
  {
    "Version": 42,
    "To": "f01234",
    "From": "f01234",
    "Nonce": 42,
    "Value": "0",
    "GasLimit": 9,
    "GasFeeCap": "0",
    "GasPremium": "0",
    "Method": 1,
    "Params": "Ynl0ZSBhcnJheQ==",
    "CID": {
      "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
    }
  }
]
```

Response:
```json
{
  "Message": {
    "Version": 42,
    "To": "f01234",
    "From": "f01234",
    "Nonce": 42,
    "Value": "0",
    "GasLimit": 9,
    "GasFeeCap": "0",
    "GasPremium": "0",
    "Method": 1,
    "Params": "Ynl0ZSBhcnJheQ==",
    "CID": {
      "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
    }
  },
  "Signature": {
    "Type": 2,
    "Data": "Ynl0ZSBhcnJheQ=="
  },
  "CID": {
    "/": "bafy2bzacebbpdegvr3i4cosewthysg5xkxpqfn2wfcz6mv2hmoktwbdxkax4s"
  }
}
```

### WalletValidateAddress
WalletValidateAddress 验证一个给定的字符串是否可以被解码为一个完整的地址。


Perms: read

Inputs:
```json
[
  "string value"
]
```

Response: `"f01234"`

### WalletVerify
WalletVerify需要一个地址、一个签名和一些字节，并指示签名是否有效。
地址不一定要在钱包里。


Perms: read

Inputs:
```json
[
  "f01234",
  "Ynl0ZSBhcnJheQ==",
  {
    "Type": 2,
    "Data": "Ynl0ZSBhcnJheQ=="
  }
]
```

Response: `true`


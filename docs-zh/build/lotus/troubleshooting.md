---
title: 'Lotus: API故障排除'
description: '本页列出了一些可能会遇到的最常见错误，从而为Lotus API用户提供了一些故障排除建议。'
breadcrumb: 'API故障排除'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

::: callout
**您是否成功解决过其他与 API 相关的问题？** 请通过底部的链接对其进行编辑，从而该页面做出贡献！
:::

[[TOC]]

## 类型: params

`params`必须是一个数组。 如果没有`params`，您仍然应该传递一个空数组。

## 类型: TipSet

对于诸如`Filecoin.StateMinerPower`之类接受参数类型为`TipSet`的方法，您可以传递`null`来使用当前链头。

```sh
curl -X POST \
     -H "Content-Type: application/json" \
     --data '{ "jsonrpc": "2.0", "method": "Filecoin.StateMinerPower", "params": ["t0101", null], "id": 3 }' \
     'http://127.0.0.1:1234/rpc/v0'
```

## 类型: 发送 CID

如果您未将 CID 序列化为[JSON IPLD link](https://did-ipid.github.io/ipid-did-method/#txref)，则会收到错误消息。这是一个错误的 CURL 请求的示例：

```sh
curl -X POST \
     -H "Content-Type: application/json" \
     --data '{ "jsonrpc": "2.0", "method":"Filecoin.ClientGetDealInfo", "params": ["bafyreiaxl446wlnu6t6dpq4ivrjf4gda4gvsoi4rr6mpxau7z25xvk5pl4"], "id": 0 }' \
     'http://127.0.0.1:1234/rpc/v0'
```

要解决此问题，请将`params`属性更改为：

```sh
curl -X POST \
     -H "Content-Type: application/json" \
     --data '{ "jsonrpc": "2.0", "method":"Filecoin.ClientGetDealInfo", "params": [{"/": "bafyreiaxl446wlnu6t6dpq4ivrjf4gda4gvsoi4rr6mpxau7z25xvk5pl4"}], "id": 0 }' \
     'http://127.0.0.1:1234/rpc/v0'
```

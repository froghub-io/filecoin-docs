---
title: Lotus发送和接收FIL
description: 本指南将向您展示如何创建和管理Lotus钱包，以及如何使用它将一些Filecoin发送到其他地址，每个节点可以有多个地址。
breadcrumb: 发送和接收 ⨎
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

要使用 Lotus 接收和发送 FIL，需要[安装并运行一个 Lotus 节点](installation.md)。

[[TOC]]

## 关于钱包地址

使用钱包时，帐户由其标识 [地址](/about-filecoin/how-filecoin-works.md#addresses). Filecoin 地址总是以字母“f”和一个数字开头，表示地址的类型。

Filecoin 账户有两种地址，较长的公钥地址和较短的 ID 地址。两个地址指的是同一个账户，可用于使用钱包发送和接收 FIL。

#### 公钥地址

一个 [公钥地址](/about-filecoin/how-filecoin-works.md#public-key-addresses-f1-and-f3) 直接从加密密钥派生。公钥地址以字符 `f1` (secp256k1) 或 `f3` (BLS) 开头，具体取决于使用的加密密钥类型。

这是 secp256k1 公钥地址的示例: `f1abjxfbp274xpdqcpuaykwkfb43omjotacm2p3za`.

公钥地址是引用 Filecoin 帐户的最常见方式，并且它们受到硬件钱包的支持，例如 [Ledger](https://ledger.com).

因为公钥地址不依赖于任何区块链状态，所以它们被认为是 [robust](/about-filecoin/how-filecoin-works.md#robust-addresses-versus-id-addresses) 并且推荐用于涉及 FIL 传输的大多数用例，例如，当通过交换将 FIL 发送给另一个用户时。

#### ID 地址

与公钥地址相比，ID 地址是一种紧凑且更“人性化”的帐户引用方式。 ID 地址始终以字符“f0”开头，后跟数字序列，例如：“f033259”。

Filecoin 帐户的每个 ID 地址都有一个对应于同一帐户的备用公钥地址。您可以通过在 Filecoin 区块浏览器 [FilFox](https:filfox.info) 上搜索公钥地址来找到任何公钥地址的 ID 地址。

因为它们比公钥地址更紧凑，所以在指代miner和其他长期存在的 Filecoin [Actors](about-filecoinhow-filecoin-works.mdactors) 时，经常使用 ID 地址。由于这些参与者收到大量消息，紧凑的地址可以显着节省 gas 费用。多重签名钱包是一种 Actor。

虽然您可以使用钱包将 FIL 发送到 ID 地址，但您应该首先在 [FilFox](https:filfox.info) 上查看帐户的详细信息，以查看帐户的创建时间以及相应的公钥地址。如果地址是最近创建的（在 [finality period](referenceglossary.mdfinality) 内），随着网络达成共识，它有可能被重新分配，而应该使用公钥地址。

有关地址的更多信息可以在 [Filecoin 的工作原理](....about-filecoinhow-filecoin-works.mdaddresses) 部分找到。

## 创建钱包

### 创建一个 BLS 钱包

```shell
lotus wallet new bls
```

### 创建一个 secp256k1 钱包

```shell
lotus wallet new
```

### 创建一个 多签名 钱包

```shell
lotus msig create address1 address2..
```

这将创建一个新地址并打印它。您可以区分主网和测试网地址，因为主网地址以`f`开头，测试网地址以`t` 开头。

::: warning
您钱包中的地址信息存储在 `~/.lotus/keystore`(或`$LOTUS_PATH/keystore`)中。删除这些文件夹也会删除钥匙，你将失去对那些钱包里的任何资金的控制。我们建议在创建好钱包后立即[备份您的钱包](#exporting-and-importing-addresses)或使用[硬件钱包](ledger.md)。
:::

## 列出地址

您可以根据需要创建任意多个地址。其中一个将是*默认地址*。

您可以看到当前节点的所有地址列表:

```shell
lotus wallet list
```

你可以使用以下命令看到默认地址:

```shell
lotus wallet default
```

如果你愿意，你可以修改一个不同的默认地址:

```shell
lotus wallet set-default <address>
```

## 获取 FIL

对于非主网网络，`FIL`可以从 faucet 获取。faucet 的列表可以在[networks 仪表板](https://networks.filecoin.io)上找到。对于主网来说，最简单的方法是从交易所购买`FIL`。并不是所有的交易所都支持`FIL`，所以在注册之前做好调查。

一旦你获得一些`FIL`，使用`wallet balance` 查询你的余额:

```shell
lotus wallet balance
```

请记住，只有当守护进程与链完全同步时，才会看到最新的余额。

## 发送 FIL

使用`send` 命令，后面跟着接收地址和你想要发送的 `FIL` 数量

```shell with-output
# lotus send <target address> <FIL amount>
lotus send f1zp2... 3
```
```
bafy1...
```

Lotus将输出一个事务散列交易成功后。您可以查看该事务使用的细节(Filecoin explorer) (https: docs.filecoin.io /开始/ explore-the-network / # block-explorers)。

Lotus 假设您希望从 _默认地址_ 发送`FIL` 。要从一个特定的地址发送 FIL，使用 `--from`后跟你想要发送`FIL` 的地址。这个地址必须已经创建或导入到你的 Lotus 节点。

```shell with-output
# lotus send --from=<sender address> <target address> <FIL amount>
lotus send --from f1zp2... f15zt... 3.141
```
```
bafy2...
```

对于进阶发送选项:

```shell
lotus send --help
```

#### 指定调用参数

如果你想要使用的lotus发送指定调用参数,您可以使用以下代码片段的编码参数

```shell
lotus chain encode params --encoding=hex <toAddr> <method id> <params>
```

映射方法 >方法id可以找到(Filecoin Git中心存储库)(https://github.com/filecoin-project/specs-actors/blob/master/actors/builtin/methods.go).

然后发送它,运行:

```shell
lotus send --params-hex=<encoded output from the previous step>
```

### 交易费用

每一个发送 `FIL`的交易都要根据它的 _gas_ 使用支付额外的费用。Gas 和费用在[Filecoin 如何工作指南](../../about-filecoin/how-filecoin-works.md)中有解释。默认情况下，Lotus 会自动设置所有必要的值。但是，您可能希望在 `send`命令中使用 `--gas-feecap` 标志，以避免在网络拥塞严重时发生意外。有关消息和费用的更多信息，请参阅 [Message Pool guide](../../mine/lotus/message-pool.md)和[Gas fees](../../about-filecoin/how-filecoin-works/#gas-fees) 部分。

## 导出和导入地址

::: warning
保护您地址的私钥安全!不要与任何人分享!把它们储存在一个安全的地方!
:::

您可以导出和重新导入一个钱包，包括一个不同的 Lotus 节点。使用`wallet export`从节点导出地址:

```shell
lotus wallet export <address> > <address>.key
```

使用 `wallet import` 将地址导入节点:

```shell
lotus wallet import wallet.private
```

同时：

### 离线节点

每个节点将其钱包存储在`~/.lotus/keystore`中:

```
~/.lotus/keystore/
├── MF2XI2...
├── MRSWMYLVNR...
├── NRUWE4BSOA...
├── O5QWY3DFOQWWMM3RNZSXI6TKOJYHQYTMMQZHQNDBNRY...
└── O5QWY3DFOQWWMM3VOBZHAZLCOIZGINLDMRZWWNLMNJS...
```

要在节点脱机时导出钱包，请将这些文件 _从_ `~/.lotus/keystore`复制到另一个位置。要导入这个钱包，请将这些文件复制 _到_ `~/.lotus/keystore`。Lotus 节点在下次启动时将自动使用这些密钥。

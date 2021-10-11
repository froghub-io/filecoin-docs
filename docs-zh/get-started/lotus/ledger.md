---
title: 'Ledger钱包支持'
description: 'Lotus支持使用Ledger硬件钱包作为FIL传输的后端。'
breadcrumb: 'Ledger 钱包'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}. Ledger 硬件 Filecoin 集成目前不支持BLS地址，只支持 `secp256k1` 。 BLS 支持在项目路线图上，并将很快被添加。要设置您的 Ledger 设备，请按照以下步骤进行设置。

## 设置你的 Ledger 设备

1. 安装 [Ledger Live](https://www.ledger.com/start/) 并按照说明设置您的设备。Linux 用户可能需要添加 [必要的 udev 规则](https://support.ledger.com/hc/en-us/articles/115005165269-Fix-connection-issues) 。
1. 在 Ledger live 设置启用**开发者模式**:

   ![ledger-enable-dev-mode](../images/ledger.png)

1. 你现在应该可以在 Ledger Live 的**Manager**部分搜索并安装**Filecoin**应用程序。

## Ledger 钱包 UI 选项

您可以使用[基于浏览器的 Glif 钱包](#glif-wallet)，也可以使用[Lotus 节点和 Ledger 集成](#lotus)手动管理您的资金。

### Glif 钱包

Filecoin 不能直接通过 Ledger Live 应用程序访问。不过，你可以在[Glif .io](https://glif.io)上使用 Glif 钱包的 Ledger 硬件。Glif 是一个开源的 Filecoin 钱包，你可以在浏览器中使用。它使用[Filecoin Ledger 集成库](https://github.com/Zondax/ledger-filecoin/)，该库已经过第三方安全审计。

### Lotus

您可以使用 Filecoin Lotus 节点和 Ledger 硬件来管理您的资金。

#### 将您的 Ledger 添加到 Lotus 节点

确保完全信任正在连接的 Lotus 节点。

1. 在[Lotus configuration](configuration-and-advanced-usage.md) (`~/.lotus/config.toml`)中，将`EnableLedger = true` 添加到 `[Wallet]`部分:

   ```toml
   [Wallet]
     EnableLedger = true
   ```

1. 解锁你的 Ledger 设备。
1. 打开您的 Ledger 设备上的 Filecoin 应用程序，并保持它与您的计算机连接。
1. 使用 `wallet new secp256k1-ledger` 创建一个基于 Ledger 的 wallet:

   ```sh
   lotus wallet new secp256k1-ledger
   ```

   您必须在您的 Ledger 账设备上确认创建。

   ::: tip
   `lotus wallet new secp256k1-ledger`将提供一个新的基于 Ledger 的密钥，无论何时调用。当在不同的 Lotus 节点或已重置的节点上调用时，将根据 Ledger 设备主密钥生成相同的密钥。
   :::

1. 从这一点上说，来自 Ledger 钱包的任何[FIL 发送操作](send-and-receive-fil.md) 都必须在 Ledger 设备上得到批准。确保它已连接、解锁并运行 Filecoin 应用程序。

::: tip
`lotus-shed` 应用程序提供了额外的 Ledger 功能，比如列出设备中的密钥并提供有关这些密钥的信息。
:::

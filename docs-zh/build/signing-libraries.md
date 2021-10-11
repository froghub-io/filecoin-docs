---
title: '签名库'
description: '签名库可用于签名事务，而无需专用节点。'
breadcrumb: '签名库'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}. 这个库使得那些离线运行的，或是运行在移动设备上的，或者是在任何地方运行的应用程序能够创建事务，然后可将事务提交给任何 Filecoin API 端点(也许通过第三方)。

::: callout
**This documentation page is a stub!** 如果您有更多有关签名库的信息或知识，请在此页面贡献它！
:::

[[TOC]]

## Filecoin 签名工具

[Filecoin 签名工具项目](https://zondax.ch/projects/filecoin-signing-tools/#features)提供 Rust Native 和 WASM 签名库，以及一个 JSON RPC 服务器实现来远程公开它们的功能，以及一些关于如何从多种语言使用所有这些功能的示例。

[这里是源码库](https://github.com/Zondax/filecoin-signing-tools).

## Filecoin.js

[Filecoin.js](https://filecoin-shipyard.github.io/filecoin.js/)旨在成为与本地或远程 Filecoin 节点交互的完整库。可用于[签名](https:filecoin-shipyard.github.iofilecoin.jsdocssign-message)和验证消息，支持多个钱包提供商。
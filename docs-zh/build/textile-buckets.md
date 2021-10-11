---
title: 'Textile Buckets'
description: 'Buckets是一种Textile 产品，以与标准云存储非常相似的方式提供存储，但在底层使用IPFS和Filecoin。'
breadcrumb: 'Textile Buckets'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

下面是快速安装 buckets 的步骤:

1. **下载并安装`hub`CLI**:

   安装过程[如文档所示](https://docs.textile.io/hub/accounts/)。您需要从[releases 页面](https://github.com/textileio/textile/releases/latest)获取最新版本。

1. **初始化帐号并登录**:

   ```sh
   hub init # Follow instructions
   ...
   hub login # if you already have a username
   ```

   详细的说明可以在[官方文档](https://docs.textile.io/hub/accounts/#account-setup)中找到。

1. **初始化一个新的 bucket**:

   Buckets 映射到本地目录。想要从工作目录创建一个 bucket，运行:

   ```sh
   cd /path/to/your/data
   hub bucket init
   ```

   ::: warning
   Buckets 默认不加密。如果要存储敏感数据，请使用 `hub bucket init --private` 选项。[在这里阅读更多](https://docs.textile.io/buckets/#encryption)。
   :::

   还可以使用 `hub bucket init --existing`标志来检索现有 buckets(或者在共享 buckets 的情况下，拉取其他人执行的更改)。

1. **修改并提交**:

   在你的 bucket 文件夹中添加或修改文件后，你可以通过推送它们来发布更改:

   ```sh
   hub bucket status # show changes to the bucket
   hub bucket push   # publish changes to IPFS
   ```

1. **在 IPFS 上探索你的内容**:

   你的内容已被推送，并可在 IPFS 上获得。你可以展示线程，IPNS 和网站链接与你的 bucket 关联:

   ```sh
   hub bucket links
   ```

   第一个链接将带您到 Hub 网关，并允许您检查当前发布的文件。例如，如果您托管一个网站，您可以使用 IPNS 链接在浏览器上打开它。

1. **存档你的 bucket，并在 Filecoin 备份它**:

   您可以在任何点存档您的 bucket，并存储在 Filecoin 上:

   ```sh
   # 存档
   hub bucket archive
   # 确认状态
   hub bucket archive status
   # 观察状态
   hub bucket archive status -w
   ```

1. **了解更多关于 Textile buckets**:

   - 所有的`hub`命令和子命令都有一个`--help`标志用来显示可用的标志和使用说明。这些也在[这里发布](https://docs.textile.io/hub/cli/hub_buck/)。
   - 此处以[Buckets 指南](https://docs.textile.io/buckets/)为基础，包含更多详细信息，如[权限](https://docs.textile.io/buckets/permissions/)、共享 Buckets 、组织等。
   - Filecoin 存储在 Textile buckets 是一个非常新的功能!请务必阅读[Bucket Archiving](https://docs.textile.io/buckets/archiving/)以获得有关它如何工作、限制和价格的最新信息。
   - 这篇[博客文章](https://blog.textile.io/buckets-diffing-syncing-archiving/)包含了有关存档和恢复的解释性视频和信息。一旦有了交易 CID，还可以使用 Lotus[检索数据](../store/lotus/retrieve-data.md)。

1. **直接使用 Buckets API**:

- [js-textile](https://textileio.github.io/js-textile/docs/hub.buckets)提供了使用 Javascript 访问 Buckets API 的方式。以下提供了一些[例子](https://github.com/textileio/js-examples)。
- Go support 也是[可用的](https://docs.textile.io/tutorials/go/getting-started/).

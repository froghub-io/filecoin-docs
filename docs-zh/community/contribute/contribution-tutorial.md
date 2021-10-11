---
title: 贡献教程
description: 通过查找问题、修复问题并将其提交到项目中，为Filecoin文档做出贡献。
---

# 贡献教程

当然 [语法、格式和样式](./grammar-formatting-and-style.md) 和 [写作指南](./writing-guide.md) 它们都可以帮助你为 Filecoin Docs 项目编写优秀的内容, 但它们并不深入研究如何实际提交内容更改.本指南将指导您查找问题、修复问题，然后将修复提交到 `filecoin-project/filecoin-docs` 项目。

围绕 Filecoin 文档有很多小问题，这些问题会使得对 Filecoin 项目的贡献变得简单、有用。在这里，我们将介绍：

1. 发现问题。
2. 讨论这个问题。
3. 创建修复。
4. 提交一个 _pull request_。
5. 等待复查。
6. 合并修复程序。

这看起来一个小问题的修复需要许多步骤, 但它们都是必要的，以确保我们保持这个项目中的文档符合标准。另外，你不是自己一个人在战斗——这些步骤中的一半会由 Filecoin docs 项目维护人员完成！

## 发现问题

Filecoin 项目托管在 GitHub 中。 原因有很多,其中之一就是 GitHub 附带了一个问题跟踪器，它使核心 Filecoin 团队能够从社区发现问题.所有社区问题都可以在 docs 存储库中读取文档、查找问题并提出问题 (简称 a _repo_ for short)。

所有涉及 Filecoin 文档本身的问题都可以在 `filecoin-project/filecoin-docs` repo 下的 [**Issues** tab](https://github.com/filecoin-project/filecoin-docs/issues/)。 在这里，您可以看到当前打开的所有问题。我们尝试用相关的描述性标签来标记每个问题。 像 _difficulty_ and _size_ 这样的标签可以让人了解到完成一项任务所需的工作量。

让我们开始寻找一个问题。

1. 转到 Filecoin Docs 存储库[github.com/filecoin-project/filecoin-docs](https://github.com/filecoin-project/filecoin-docs).
2. 选择 **Issues** 选项卡。
3. 单击 **Label** 下拉列表，选择 **help wanted** 标签。
4. 选择你感兴趣的问题。

记下发行号，以后放在手边。

## 讨论这个问题

从可用的标记中可以看出，存在许多不同类型的问题。有些是很小的一句话修改，另一些是需要重写几页的大项目。对于小问题，可能很少或根本没有讨论。没有必要浪费每个人的时间来谈论改变一个破坏了的关联。但更重要的问题可能需要项目不同成员的投入。

当加入讨论时，请记住，结束一个问题可能需要几天或几周的时间。 考虑到这一点，请尝试在每条消息中包含任何人可能需要的所有相关信息。
让我们对您选择的问题进行讨论：

1. 通读之前的所有帖子，以尽快了解这个问题。
2. 添加您认为必要的任何评论。
3. 如果你还想解决这个问题，请发一条信息说你愿意所有它。

一旦您声明了某个问题的所有权，项目维护人员会将您指派给它。如果这是一个大问题，Filecoin 团队的人会时不时地与您联系，确保您拥有解决问题所需的一切。

## 创建修复程序

如果你已经做到了这一点，那么你应该有一个问题在手，并对如何解决它有一个基本的想法。下一步是实施你的修复！过程如下：

1. 创建一个 _fork_。
2. 在您的计算机上进行本地更改。
3. 推动你的改变。

一个项目的 _fork_ of 是你自己的项目副本。您可以随时对此副本进行任意多的更改，因为它是您自己的。这样做的目的是，你可以修改这个个人副本，并将你的更改发送给项目团队，然后项目团队可以审查你所做的所有工作。

以下是创建现有 Filecoin 文档分支的过程：

1. 转到[GitHub](https://github.com/filecoin-project/filecoin-docs)中的 `filecoin-project/filecoin-docs`存储库。
2. 选择 **Fork** 创建项目的副本。
3. 将项目副本克隆到本地计算机：

   ```shell
   git clone https://github.com/YOUR_USERNAME/filecoin-docs.git
   ```

4. 在本地进行更改。
5. 完成所有更改后，请确保将所有内容推回到 GitHub：

   ```shell
   git add .
   git commit -m "Fixed a broken URL, issue #123."
   git push
   ```

当添加一个主动修复项目中的问题的提交注释时，尝试用几句话来总结修复，并引用问题编号。遵循这个惯例可以让其他人更快地看到你所做的事情。

## 创建拉取请求

一旦您完成了提交，并准备好让核心团队成员对您的工作进行评审，就可以创建一个请求了。

1. 转到[GitHub](https://github.com/filecoin-project/filecoin-docs)上的`filecoin-project/filecoin-docs`。
2. 选择 **Pull requests** 选项卡。
3. 单击**New pull request**。
4. 单击 **compare across forks** 然后从 **head repository** 下拉列表中选择您的存储库。
5. 留下评论来扩展您的更改。
6. 单击 **Create pull request**。

GitHub 将检查您的更改是否与您尝试合并到的分支产生任何合并冲突。

## 等待审核

来自社区的所有请求在合并之前必须由至少一个项目成员审阅。根据拉取请求的大小，这可能需要几分钟到几天的时间来检查所有内容。 根据拉取请求的复杂性，可能需要进一步讨论您的更改。继续返回 GitHub 并检查您的[通知页面](https://github.com/notifications) 确保你不会错过任何东西。

## 合并修复程序

一旦您的请求被批准，具有正确权限的项目成员将合并它。合并完成后将立即通知您。

## 完成

好了，你拿到了！您已经成功地完成了对 Filecoin 文档的第一次贡献。我们一直在寻找伟大的执笔者和教育工作者，帮助我们改进 Filecoin 文档，让互联网更好地为每个人服务，所以继续努力吧！



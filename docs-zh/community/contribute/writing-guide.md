---
title: 写作指南
description: 了解如何为Filecoin项目编写文档的详细信息。
---

# 写作指南

这本指南解释如何写一篇文章。而 [语法、格式和样式指南](./grammar-formatting-and-style.md)让你知道你应该遵循的规则，这将帮助你正确地组织你的写作，并为你的听众选择正确的语调。

## 演练

演练的目的是告诉用户如何做某事。他们不需要说服读者某事或解释一个概念。演练是读者为实现某个过程或功能而必须遵循的一系列步骤。

Filecoin Docs 项目中的绝大多数文档都属于“演练”类别。演练通常很短，有一个中立的基调，教读者如何实现一个特定的过程或功能。它们向读者展示了具体的步骤，包括去哪里，输入什么，以及应该点击的内容。演练中几乎没有概念性信息。

### 目标

编写演练时，请使用以下目标：

| Goal          | Keyword     | Explanation                                                       |
| ------------- | ----------- | ----------------------------------------------------------------- |
| **Audience**  | _General_   | Easy for anyone to read with minimal effort.                      |
| **Formality** | _Neutral_   | Slang is restricted, but standard casual expressions are allowed. |
| **Domain**    | _Technical_ | Acronyms and tech-specific language is used and expected.         |
| **Tone**      | _Neutral_   | Writing contains little to no emotion.                            |
| **Intent**    | _Instruct_  | Tell the reader _how_ to do something.                            |

#### 功能或过程

演练的最终目标是让读者实现一个非常特殊的功能。安装 Filecoin 桌面应用程序就是一个例子。下面的演练并不能让读者了解如何使用分散式 web 或 Filecoin 是什么。不过，到最后，他们的电脑上会安装 Filecoin 桌面应用程序。

#### 短长度

由于演练涉及一个特定的功能或过程，所以它们往往很短。演练的估计阅读时间在 2 到 10 分钟之间。大多数情况下，演练中最关键的内容以编号列表的形式显示。图像和 gif 可以帮助读者理解他们应该做什么。

如果将漫游转换为视频，则该视频不应超过 5 分钟。

### 穿行结构

演练分为三个主要部分：

1. 我们要做的事。
2. 我们需要做的步骤。
3. 总结我们刚刚做了什么，以及可能的下一步行动。

## 概念性文章

写文章的目的是告知和解释某事。这些文章不包含读者现在必须执行的任何步骤或操作。

与演练相比，这些文章的语气大不相同。有些主题和概念可能很难理解，所以这些文章都非常喜欢创造性的写作和有趣的图表。无论作家能做些什么使一个主题更容易理解，那就更好了。

### 文章目标

撰写概念性文章时，应遵循以下目标：

| Goal          | Keyword                  | Explanation                                                                      |
| ------------- | ------------------------ | -------------------------------------------------------------------------------- |
| **Audience**  | _Knowledgeable_          | Requires a certain amount of focus to understand.                                |
| **Formality** | _Neutral_                | Slang is restricted, but standard casual expressions are allowed.                |
| **Domain**    | _Any_                    | Usually _technical_, but depends on the article.                                 |
| **Tone**      | _Confident and friendly_ | The reader must feel confident that the writer knows what they're talking about. |
| **Intent**    | _Describe_               | Tell the reader _why_ something does the thing that it does, or why it exists.   |

### 文章结构

文章分为五个主要部分：

1. 介绍我们要解释的事情。
2. 怎么回事。
3. 为什么它是必要的。
4. 它还涉及哪些其他主题。
5. 对我们刚刚读到的内容进行简要回顾。

## 教程

写教程时，你是在教读者如何实现一个复杂的最终目标。教程是演练和概念性文章的混合体。大多数教程将跨越多个页面，其中包含多个演练。

以假设的教程“使用 Filecoin 启动并运行”为例。本教程可能有以下几页：

1. 简要介绍什么是 Filecoin。
2. 选择并安装命令行客户端。
3. 了解存储交易
4. 导入并存储文件。

第 1 页和第 3 页是概念性文章，向读者描述特定的设计模式和想法。所有其他页面都是演练，指导用户如何执行一个特定的操作。

设计教程时，请记住已经存在的演练和文章，并记下在创建教程之前需要完成的任何其他内容项。

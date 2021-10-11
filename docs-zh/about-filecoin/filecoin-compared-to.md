---
title: Filecoin与其他方案的对比
description: 尽管Filecoin与其他文件存储解决方案具有某些相似之处，但协议上还是具有重大差异。
---

# 比较 Filecoin

Filecoin 结合了其他文件存储和分发系统的许多元素。Filecoin 之所以与众不同，是因为它在开放的对等网络上运行，同时仍提供经济诱因和证明来确保文件正确存储。此页面将 Filecoin 与共享某些相同属性的其他技术进行了比较。

- [Filecoin vs. Amazon S3, Google Cloud Storage](#filecoin-vs-amazon-s3-google-cloud-storage)
- [Filecoin vs. 比特币](#filecoin-vs-比特币)

### Filecoin vs. Amazon S3, Google Cloud Storage

<table class="comparison">
    <tr>
        <th></th>
        <th>Filecoin</th>
        <th>Amazon S3, Google Cloud Storage</th>
    </tr>
    <tr>
        <td>主要用例</td>
        <td>以极具竞争力的价格存储文件</td>
        <td>使用熟悉的、广泛支持的服务存储文件</td>
    </tr>
    <tr>
        <td>价格</td>
        <td>由竞争激烈的公开市场决定</td>
        <td>由企业价格部门设定</td>
    </tr>
    <tr>
        <td>集权</td>
        <td>许多小型独立存储提供商</td>
        <td>少数大公司</td>
    </tr>
    <tr>
        <td>可靠性</td>
        <td>由网络独立检查并可以公开验证</td>
        <td>公司自行报告自己的统计信息</td>
    </tr>
    <tr>
        <td>API</td>
        <td>应用程序可以使用Filecoin协议访问所有存储提供商</td>
        <td>应用程序必须为每个存储提供商实现不同的API</td>
    </tr>
    <tr>
        <td>恢复</td>
        <td>检索文件的竞争市场</td>
        <td>通常比存储文件以将用户锁定在更昂贵的价格</td>
    </tr>
    <tr>
        <td>故障修复</td>
        <td>如果文件丢失，网络将自动为用户退款</td>
        <td>如果文件丢失或无法使用，公司可以为用户提供保障</td>
    </tr>
    <tr>
        <td>支持</td>
        <td>如果出现问题，Filecoin协议无需人工干预即可确定发生了什么</td>
        <td>如果出现问题，用户请与支持服务台联系以寻求解决方案</td>
    </tr>
    <tr>
        <td>物理位置</td>
        <td>位于世界任何地方的miner</td>
        <td>限于提供商数据中心所在的位置</td>
    </tr>
    <tr>
        <td>作为一个服务提供商</td>
        <td>存储提供商（计算机，硬盘驱动器，互联网连接）的进入门槛低</td>
        <td>存储提供商（法律协议，市场营销，支持人员）的高准入门槛</td>
    </tr>
</table>

### Filecoin vs 比特币

<table class="comparison">
    <tr>
        <th></th>
        <th>Filecoin</th>
        <th>比特币</th>
    </tr>
    <tr>
        <td>主要用例</td>
        <td>档案储存</td>
        <td>网络支付</td>
    </tr>
    <tr>
        <td>数据存储</td>
        <td>擅长廉价存储大量数据</td>
        <td>少量数据可以高成本存储在区块链上</td>
    </tr>
    <tr>
        <td>证明</td>
        <td>使用复制证明和时空证明来保护区块链</td>
        <td>使用工作证明来保护区块链</td>
    </tr>
    <tr>
        <td>理念</td>
        <td>拥有最多存储空间的miner拥有最大的权力</td>
        <td>计算速度最快的miner拥有最大的能力</td>
    </tr>
    <tr>
        <td>采矿硬件</td>
        <td>硬盘，GPU和CPU</td>
        <td>ASICs</td>
    </tr>
    <tr>
        <td>挖矿用途</td>
        <td>存储</td>
        <td>掀起热潮</td>
    </tr>
    <tr>
        <td>miner类型</td>
        <td>仓储miner，检索miner，维修miner</td>
        <td>所有miner执行证明工作</td>
    </tr>
    <tr>
        <td>正常运行时间要求</td>
        <td>存储miner因正常运行时间获得奖励，因停机而受到处罚</td>
        <td>miner可以离线而不会受到惩罚</td>
    </tr>
    <tr>
        <td>状态</td>
        <td>自2020年开始运行的主网</td>
        <td>2009年运行至今</td>
    </tr>
</table>

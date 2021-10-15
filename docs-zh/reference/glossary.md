---
title: 相关名词解释
description: Filecoin 术语的定义和使用
---

## Address

Filecoin 网络中，地址 (Address) 是唯一的加密值，用于公开标识用户。此值（公钥）与相应的私钥成对出现。这两个密钥之间的数学关系是这样的：对私钥的访问允许创建可以用公钥验证的签名。Filecoin 为此专门使用了 Boneh–Lynn–Shacham（BLS）签名方案。

## Block

在区块链中，区块 (Block) 是记录的基本单位。每个块以密码方式链接到一个或多个先前的块。区块通常包含[Message](#Message)，与区块链跟踪的某些状态（例如，财务记录）的变化相关。

## Blockchain

基本上，区块链 (Blockchain) 是一种记录系统，其中新记录或[区块](#Block)以加密方式链接到先前的记录。这种结构是安全、可验证和分布式事务账本的基础组件。

## Block height

[区块](#区块)的高度 (Block height) 与区块链添加到区块链之前经过的纪元(epoch)的数量相对应。Filecoin 区块链的高度定义为区块链中任何区块的最大高度

## Capacity commitment

如果一家存储矿业公司认为任何可用的交易方案都没有吸引力，他们也可以做出一个容量承诺(capacity commitments)，用任意数据而不是客户数据填充[扇区](#sector)。维护此扇区允许存储 miner 证明他们正在代表网络预留空间。

## Collateral

为了达成存储交易(storage deal），要求存储 miner 提供[Filecoin 货币](#fil)作为抵押品(collateral)，在采矿者未能履行其存储承诺的情况下支付给客户作为补偿。

## Deal

Filecoin 网络中的两个参与者可以签订一项协议，其中一方承包另一方的服务。Filecoin 规范目前详细说明了  存储交易 (Deal) （其中一方同意为另一方存储指定时间长度的数据）和 检索交易（其中一方同意向另一方传输指定的数据）。

## Election

每个纪元(epoch)，Filecoin 存储 miner 的一小部分被选中为 Filecoin 区块链挖掘新的区块。miner 当选的概率大致与他们贡献的 Filecoin 网络总存储容量的份额成正比。

## Epoch

Filecoin 区块链中的时间被离散为当前长度为 30 秒的纪元(epoch)。每一个纪元，都会选出一个子集的存储 miner，通过时空的胜利证明（Winning Proof Spacetim）为 Filecoin 区块链添加一个新区块。

## FIL

*FIL*是 Filecoin 货币单位的名称；也可以用 Unicode 符号表示带双划的整数（⨎）。

## Faucet

Faucet 是一种提供免费服务的服务。通常情况下，Faucet 是为了网络中新用户的利益而运行的，为他们提供了开始交易所需的种子资金。

## Fault

当存储 miner 无法完成给定扇区的[WindowPoSt](#windowpost)时，Filecoin 网络会为该扇区注册一个 _fault_ ，并且 miner 是惩罚（slash）。如果存储 miner 不能快速解决故障，则网络假定他们已放弃承诺。

## Filecoin

术语 _Filecoin_ 用于泛指Filecoin项目、协议和网络。

## Finality

Finality是指记录到Filecoin区块链的消息和状态的不变性。 当新的块被添加到区块链时，旧的块被修改变得越来越困难，直到它们变得实际上不可能被修改  . _finality period是块被认为是完全不可变之前所经过的时间  . 在当前[mainnet](#mainnet)中，这被配置为900 [epoch] (#epoch).

## Gas

Gas 是[Message](#Message)的属性，对应于在给定的区块中包含该消息所涉及的资源。对于块中包含的每条消息，块的创建者从消息的发送方提取一个费用；该费用与消息的 Gas 成比例。

## Mainnet

主网 (main network) 是"main"和"network"
的组合体，是指 Filecoin 项目和社区的主要面向公众的网络。主网体现了广泛采用和持久性的期望；其协议的更改取决于网络参与者的采用。

如果用作专有名词，请将“I am mining on Mainnet”大写

## Message

术语消息 (Message) 用于指作为区块一部分存储的数据。一个块可以包含多条消息。

## miner

Filecoin 项目使用术语 miner(miner)来指网络中为客户提供有价值服务的参与者。目前，Filecoin 规范识别两种 miner 类型：[存储 miner](#storage-miner)和[检索 miner](#retrieval-miner)。

## Pledged storage

miner 承诺通过[复制证明](#proof-of-replication-porep)为 Filecoin 网络保留的存储容量称为存储保证(pledged storage)。

## Proof-of-Storage

许多区块链网络的基础是参与者为区块链提供有价值的东西——这一贡献很难伪造，但如果真的做出了贡献，则可以微不足道地加以验证。基于这种方法的区块链通常被认为需要“证明-X_X”，其中 X_X 是有价值的贡献。Filecoin 区块链重视存储容量的贡献；它基于一种新颖的存储证明结构，将其与其他区块链区分开来，后者通常需要贡献计算能力。
作为一个术语，存储证明(Proof-of-Storage))是指 Filecoin 协议的设计元素，它允许人们（在某种非常高的容忍度下）保证声称提供给定存储量的参与者确实履行了该承诺。事实上，Filecoin 的存储证明结构提供了一个更强大的声明，允许用户有效地验证参与者是否在存储特定的数据段，而无需拥有文件本身的副本。 \*注：这里的“证明”用在非正式的意义上——通常，这些证明采用概率论元的形式，而不是具体的证明；也就是说，从技术上讲，可能有可能让其他参与者相信自己在做出自己没有做的贡献，但这种可能性很小，几乎不可能。

## Proof-of-Replication (PoRep)

复制证明 (Proof-of-Replication) 是一个过程，存储 miner 可以向 Filecoin 网络证明，他们已经代表网络创建了某些数据的唯一副本。

## Proof-of-Spacetime (PoSt)

时空证明 (Proof-of-Spacetime) 是一个过程，存储 miner 可以向 Filecoin 网络证明他们代表网络继续存储某些数据的唯一副本。在当前的 Filecoin 规范中，时空证明有两种不同的表现形式：[WindowPoSt](#windowpost)和[WinningPoSt](#winningpost)。

## Quality-adjusted storage power

存储 miner 从客户端验证（verified client）提供的存储交易中获得的存储能力将通过乘数来增加。将质量乘数(quality adjusted)考虑在内。

## Retrieval miner

检索 miner (Retrieval miner) 是 Filecoin 参与者，与客户进行检索交易，同意向客户提供特定文件以换取 FIL）。请注意，与存储 miner 不同，检索 miner 不会额外获得向 Filecoin 区块链添加区块的能力；他们唯一的奖励是从客户端提取的费用。

## Seal

_封装 (Seal)_ 是 Filecoin 协议的基本组成部分之一。它是一个在扇区（sector）上执行的计算密集型过程，其结果是该扇区的唯一表示。这种新表示的性质对于[复制证明](#复制证明)和[时空证明](#时空证明)过程至关重要。

## Sector

存储 miner 代表 Filecoin 网络将数据存储在称为扇区 (Sector) 的固定大小数据块中。

## Slash

当扇区（sector）注册了一个错误（fault），Filecoin 网络将删除本应存储该扇区的存储 miner；也就是说，它将评估对未遵守存储承诺的 miner 的处罚（从 miner 提供的抵押品（collateral）中支付）。当惩罚(slashing)发生时，为了[选举](#election)，从 miner 的总权力中减去 miner 为相关部门赚取的权力。

## Storage miner

存储 miner(storage miner)是代表网络存储数据的 Filecoin 参与者。存储miner通过与他们签订服务合同的客户付款，以及通过定期授权以自己创建的区块（block）扩展 Filecoin 区块链（blockchain）来获得奖励。当他们创建一个块时，存储 miner 将获得新铸造的 FIL，以及他们可以向其他试图在块中包含消息（message）的参与者征收的交易费。

## Storage power

存储 miner 的存储功率是一个与它们通过容量承诺（capacity commitments）或存储交易（deal）代表网络提供的存储容量大致成比例的值。存储能力(Storage power)用于根据存储 miner 在整个网络存储容量中的贡献来选择奖励。

## Zero-knowledge succinct non-interactive argument of knowledge (zk-SNARK)

知识论证(argument of knowledge)是一种结构，通过这种结构，一方称为证明者(prover)，可以说服另一方，即验证者(verifier)，证明者有权获得某些信息。这种结构有几个可能的限制：:

- 知识的非交互论元( A _non-interactive_ argument of knowledge)要求仅从证明者发送给验证者的单个消息就可以作为一个充分的论据.

- 知识的零知识论元(A _zero-knowledge_ argument of knowledge)要求验证者不需要访问证明者可以访问的知识来验证证明者的主张.

一个简洁的知识论证是一个可以“快速”验证的论点，对于这两个术语的恰当定义来说，它是“小”的。

零知识、简洁的非交互式知识论元（zk-SNARK）体现了所有这些特性。Filecoin 利用这些结构使其分布式网络能够有效地验证存储 miner 正在存储他们承诺存储的文件，而无需验证人员自己维护这些文件的副本。

## Testnet

是“test”和“network”的组合体，是其中一个用来指代[primary Filecoin testing networks](https://network.filecoin.io/#calibration)的术语.

注：如果用作专有名词，请将该术语大写。例如，“我在 Testnet 上挖掘。”

## Tipset

[Tipset](https://filecoin.io/blog/tipsets-family-based-approach-to-consistence/)是一组区块，每个区块具有相同的高度和父 tipset；Filecoin 区块是一个 tipset 链，而不是区块链。

每个 tipset 被分配一个权重，该权重对应于每个 tipset 块中编码的承诺所提供的网络存储量。网络的一致性协议指导节点建立在最重的链上。

通过基于 tipsets 的区块链，Filecoin 可以允许多个存储 miner 在同一个纪元(epoch)中创建块，从而提高网络吞吐量。通过构造，这也提供了网络安全性：一个节点试图故意阻止第二个节点的有效块进入规范链，这与一致的对重链的偏好背道而驰

## Verified client

为了进一步鼓励在简单的容量承诺（capacity commitment）上存储“有用”数据，存储 miner 有额外的机会竞争已验证客户端（verified clients）提供的特殊的交易（deal）。这类客户在提供涉及存储有意义数据的交易的意图方面得到了认证，而存储矿业公司为这些交易获得的权力通过乘数得到增强。

## WindowPoSt

_WindowProof-of-Spacetime_（WindowPoSt） 是审核存储 miner 所做承诺的机制。它将每个 24 小时划分为一系列窗口。相应地，每个存储 miner 的抵押扇区被划分为子集，每个窗口有一个子集。在给定的窗口内，每个存储 miner 必须为其各自子集中的每个扇区提交一份[时空证明](#proof-of-spacetime-post)。这需要随时访问每个被挑战的扇区，并将导致零知识论元证明以区块中的消息发布到 Filecoin 区块链。通过这种方式，在任何 24 小时内，至少对质押保管的每个部门进行一次审计，并保存一份永久的、可核实的、公开的记录，证明每个存储采矿者的持续承诺。

Filecoin 网络期望存储数据的持续可用性。未能提交扇区的 WindowPoSt 将导致过错，并且为该扇区提供的存储 miner 将被[Slash](#Slash)。

## WinningPoSt

_Winning Proof-of-Spacetime_ (WinningPoSt) 是[Storage miner](#storage-miner)对Filecoin网络的贡献进行奖励的机制。在每个[epoch](#epoch)开始时，少量的存储miner会被[Election](#election)，让他们各自开采一个新的[block](#block)。作为这样做的要求，每个miner的任务是提交一个指定[扇区](#sector)的压缩[存储证明](#proof-of-storage)。每个成功创建区块的当选miner都会被授予[FIL](#fil)，以及向其他Filecoin参与者收取费用的机会，以便在区块中包含[Message](#message)。

未在必要的窗口内完成此操作的存储 miner 将丧失开采区块的机会，但不会因未能这样做而受到处罚。

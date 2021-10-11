---
title: 'Lotus Miner: 地址'
description: 'miner 可以配置所有者地址、工作地址和其他控制地址。这些允许管理从miner发送和接收的资金的粒度，并为挖掘操作提供额外的安全性。'
breadcrumb: 'Miner 地址'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

在 miner 初始化过程中，在链上创建了一个 _miner actor_，这个 actor 给 miner 一个 ID `t0...` 。miner actor 负责收集发送给 miner 的所有付款。例如，当发送一个支付用于执行不同类型的交易时，该支付将被发送给 miner actor，而不是 miner 本身。

Lotus Miner 守护进程执行网络所需的操作，并可以使用不同的 Lotus 节点钱包支付费用或与 _miner actor_ 进行交互。查看[Lotus 入门指南](../../get-started/lotus/send-and-receive-fil.md)以获得有关如何管理 Lotus 钱包的更多信息。

miner 使用的当前配置的地址可以用如下方式列出:

```sh
lotus-miner actor control list
```

与 miner 关联的不同类型的地址如下所述:

## 拥有者地址

所有者地址对应于[miner 初始化](miner-setup.md)期间提供的 Lotus 节点地址。只有在以下情况下才需要 _owner address_:

- 更改 _miner actor_ 中的所有者或工作者地址。
- 从 _miner actor_ 中提取余额。
- 提交 _WindowPoSts_ ， **除非 _control address_ 被定义并且有足够的余额** （下面继续）。

选择为 miner 的 _owner 地址_ 的地址被设计为在 _冷存储_ 中保持脱机，或者由[硬件钱包](../../get-started/lotus/ledger.md)进行备份。在生产环境中，我们强烈建议使用单独的 _owner_ 和 _worker_ 地址。

可以使用以下命令更新所有者地址:

```sh
lotus-miner actor set-owner --really-do-it <address>
```

旧地址和新地址必须对 Lotus 节点可用。您可以[创建新地址或导入现有地址](../../get-started/lotus/send-and-receive-fil.md)。

## worker 地址

_worker 地址_ 用于发送和支付 miner 的日常操作:

- 初始化链上的 miner。
- 修改 miner 节点 id 或多地址。
- 与市场和支付渠道参与者互动。
- 签署新块。
- 提交证据，宣布错误。*WindowPoSts*被提交使用*worker 地址*如果:
  - 没有定义控制地址或没有足够的余额。
  - _所有者地址_ 没有足够的余额。

与*owner address*不同，作为 miner 的*worker 地址*的地址集应该是 Lotus 本地钱包的一部分，并且可以被 miner 访问。Lotus Miner 将使用它所连接的 Lotus 节点触发所有必要的事务。*worker 地址*必须有足够的资金来支付miner的日常操作，包括初始化。

## 控制地址

_控制地址_ 用于向链提交 _WindowPoSt_ 证明。_WindowPoSt_ 是 Filecoin 中验证存储的机制，miner需要每 24 小时提交所有扇区的证明。这些证明作为信息提交给区块链，因此需要支付相应的费用。

许多与挖矿相关的操作都需要向链发送消息，但并不是所有的操作都像 _WindowPoSts_ 那样有很高的价值。通过使用 _control address_，您可以停止持有一行事务的第一个事务。这个阻塞问题被称为[线首阻塞](https://en.wikipedia.org/wiki/Head-of-line_blocking)

可以创建和配置多个 _control 地址_。第一个有足够资金提交一个 _WindowPoSt_ 事务的控制地址将被使用。如果没有足够资金的控制地址，则使用所有者地址。如果所有者地址没有足够的资金，或者是不可用的，那么 worker 地址将被用来提交一个 _WindowPoSt_。

否则，Lotus 将转移到 _owner_，并最终转移到 _worker_ 地址。

设置一个 _control 地址_:

1. 创建一个新地址，给它发送一些 gas 费用:

   ```sh
   lotus wallet new bls
   > f3defg...

   lotus send --from <address> f3defg... 100
   ```

2. 通知 miner 新地址:

   ```sh
   lotus-miner actor control set --really-do-it f3defg...

   > Add f3defg...
   > Message CID: bafy2...
   ```

3. 等待消息到达链上:

   ```sh
   lotus state wait-msg bafy2...

   > ...
   > Exit Code: 0
   > ...
   ```

4. 检查 miner 控制地址列表，以确保地址被正确添加:

   ```sh
   lotus-miner actor control list

   > name       ID      key        use    balance
   > owner      t01111  f3abcd...  other  300 FIL
   > worker     t01111  f3abcd...  other  300 FIL
   > control-0  t02222  f3defg...  post   100 FIL
   ```

重复此步骤以添加其他地址。

5. 您可以指定其他参与者来检查控制地址:

```shell
lotus-miner --actor f01000 actor control list
```

### 使用控制地址提交

通过将控制地址设置为执行预提交和提交，来清理工作地址所需的任务。这样，只有市场消息从工作人员地址发送。如果基准费用很高，那么你仍然可以把这些板块放在链上，而不会被发布交易之类的东西屏蔽。

该特性从 2020 年 12 月 09 日起在 [`filecoin-project/lotus`的`master`分支](https://github.com/filecoin-project/lotus/)中启用，但还没有在标记版本中启用。您需要使用 `master` 分支从 GitHub 构建 Lotus 来使用这个特性。

1.创建两个控制地址。控制地址可以是任意类型的地址: `secp256k1 ` 或`bls`:

```bash
lotus wallet new bls

> f3rht...

lotus wallet new bls

> f3sxs...

lotus wallet list

> Address   Balance  Nonce  Default
> f3rht...  0 FIL    0      X
> f3sxs...  0 FIL    0
```

2. 在这两个地址里加些资金。
3. 等待约 5 分钟，等待分配 id 的地址。
4. 获取这些地址的 ID:

   ```bash
   lotus wallet list -i

    > Address   ID        Balance                   Nonce  Default
    > f3rht...  f0100933  0.59466768102284489 FIL   1      X
    > f3sxs...  f0100939  0.4 FIL                   0
   ```

5. 添加控制地址:

   ```shell with-output
   lotus-miner actor control set --really-do-it=true f0100933 f0100939
   ```
   ```
    Add f3rht...
    Add f3sxs...
    Message CID: bafy2bzacecfryzmwe5ghsazmfzporuybm32yw5q6q75neyopifps3c3gll6aq
   ```

   <br/>

   ```shell with-output
     lotus-miner actor control list
   ```
   ```
   name       ID      key        use    balance
   owner      t01...  f3abcd...  other  15 FIL
   worker     t01...  f3abcd...  other  10 FIL
   control-0  t02...  f3defg...  post   100 FIL
   control-1  t02...  f3defg...  post   100 FIL
   ```

6. 将新创建的地址添加到 miner 配置的`[Addresses]`部分:

   ```yaml
   [Addresses]
       PreCommitControl = ["f3rht..."]
       CommitControl = ["f3sxs..."]
   ```

7. 重启 `lotus-miner`.

## 管理余额

通过调用 `info` 获得相关的miner钱包余额:

```bash
lotus-miner info

> Miner: t01000
> Sector Size: 2 KiB
> Byte Power:   100 KiB / 100 KiB (100.0000%)
> Actual Power: 1e+03 Ki / 1e+03 Ki (100.0000%)
>   Committed: 100 KiB
>   Proving: 100 KiB
> Below minimum power threshold, no blocks will be won
> Deals: 0, 0 B
>   Active: 0, 0 B (Verified: 0, 0 B)
>
> Miner Balance: 10582.321501530685596531 FIL
>   PreCommit:   0.000000286878768791 FIL
>   Pledge:      0.00002980232192 FIL
>   Locked:      10582.321420164834231291 FIL
>   Available:   0.000051276650676449 FIL
> Worker Balance: 49999999.999834359275302423 FIL
> Market (Escrow):  0 FIL
> Market (Locked):  0 FIL
```

在这个例子中，miner ID 为 `t01000`，它的总余额为`10582.321501530685596531 FIL`，还有一个可用余额为`0.000051276650676449 FIL`，可以用作抵押品或支付质权。worker 余额为 `49999999.999834359275302423 FIL`。

## 从 Miner actor 处提取资金

通过调用`actor withdraw`将资金从 Miner actor 地址转移到所有者地址:

```bash
lotus-miner actor withdraw <amount>
```

::: tip
Lotus 节点需要提供所有者的地址，并有足够的资金支付这笔交易的 gas 费用。为了使操作成功，需要临时导入冷地址。
:::

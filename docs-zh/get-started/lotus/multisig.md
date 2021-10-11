# 多重签名钱包

多签名(multisig)钱包是指需要多个密钥来授权`FIL`交易的钱包。

## 创建一个多签名钱包

使用`lotus msig create`创建一个多签名钱包:

```bash
lotus msig create signerAddress1 signerAddress2 signerAddress3...

> Created new multisig:  f01002 f24mscgjtgymb3dqtm4ycwydh4nhygktgxm3nbgva
```

在上面的例子中，`f01002` 是 id 地址，`f24mscgjtgymb3dqtm4ycwydh4nhygktgxm3nbgva`是操作员地址。两个地址都代表新创建的多签名钱包。

默认情况下，批准事务时需要所有签名者的签名。但是，您可以使用 `--required` 选项更改所需批准的数量:

```bash
lotus msig create --required=2 signerAddress1 signerAddress2 signerAddress3
```

上面的示例创建了一个有三个签署人的多签名钱包，但是执行一个事务只需要两个批准。

## 提议并批准一项交易

多签名钱包的任何签名者都可以 _提议_ 交易。 _提议者_ 在提议时自动批准事务。只有当接收到的审批数量等于所需的审批数量时，事务才会执行。一个[多签名钱包可以被检查](#inspect-a-multisig-wallet)以获得所需的批准的数量。如果一个多签名钱包只需要一个签名者，那么一个交易将在它的提议上立即执行。

使用 `lotus msig propose` 提议交易:

````bash
lotus msig propose --from=proposerAddress walletAddress destinationAddress value

> send proposal in message:  bafy2bzaceajm2mghc5rludlbcr3bnpqgcz5m6gmldq6ycrc4trkejz36tnrqe
Transaction ID: 0

在上例中`bafy2bzaceajm2mghc5rludlbcr3bnpqgcz5m6gmldq6ycrc4trkejz36tnrqe`是`messageID`，`0`是`transactionID`。

其他签字人可以使用 `lotus msig approve` 来批准邮件。


```bash
lotus msig approve walletAddress transactionID proposerAddress destinationAddress value
````

`transactionID`、`proposerAddress`、`destinationAddress `和 `value `的值必须与提案中使用的值一致。


## 检查一个多签名钱包

使用 `lotus msig inspect` 来获取 多签名钱包的信息。

```bash
lotus msig inspect walletaddress

> Balance: 0 FIL
> Spendable: 0 FIL
> Threshold: 2 / 3 # number of signature required / number of signers the wallet has
> Signers:
> ID      Address
> t01001  t1ai2gcr2xlpyxcbjlegojbpr3ovdyfdyzigjoyza
> t0100   t3r4d3avth4agwxy6ko35reeuydcqaa6cq4mt6owg3zjq23pxqc6xvn7scb43dyhaf2cjnjhtioek6innbpgda
> t01003  t3rpukrggza4jjt6vpihiqoekth6tiopzhvxbp36qhrzfu4xpk6n3mxo5geh6bdavkkkhqk7owt2an2wrundtq
> Transactions:  1
> ID      State    Approvals  To                                         Value   Method   Params
> 0       pending  1          t1fjswymsauvfh5zxw34t2pgz7iev2fn56unyw6ci  20 FIL  Send(0)
```

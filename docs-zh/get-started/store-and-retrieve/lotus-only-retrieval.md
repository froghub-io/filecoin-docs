## 预安装

```shell
# 创建随机文件。
rm -f /tmp/613-mb-file
dd if=/dev/urandom of=/tmp/613-mb-file bs=1MB count=613 

# 将文件导入Lotus.
lotus client import /tmp/613-mb-file
  <DATA_CID>

# 为随机文件创建交易。
lotus client deal
> Data CID: <DATA_CID>
> Duration: 180
> Miner: f0127896
> ... 
> <PROPOSAL CID>

# 查看交易状态。
lotus client inspect-deal --proposal-cid=<PROPOSAL_ID>

# 把数据找回来。
lotus client retrieve --miner f0127896 <DATA_CID> /tmp/retrieved_613mb_file
```

你需要的东西:

1. Proposal ID. 有时候也称为一种协议CID.
1. Miner ID. 有时也称为提供者CID.
1. Data CID.

## Proposal ID

1. 它被称为 `DealCid` 运行时 `lotus client list-deal --verbose`:

    ```shell
    Created          DealCid                                                      DealId  Provider  State                          On Chain?  Slashed?  PieceCID                                                          Size      Price          Duration  TransferChannelID                                                                                                              TransferStatus  Verified  Message
   Jun 21 23:00:07  bafyreig237v7gnohrn3k425v5xnavgn6pbddvhjm3whjpko5r4vqvjfdmy  0       f0127896  StorageDealCheckForAcceptance  N          N         baga6ea4seaqj24gc2ov6ixvng6rbtscwykbvexl7hmobr7zrg6l56bfsmhg7kky  1016 MiB  0.0521085 FIL  521085    12D3KooWK5tFBXQghZm3E6JBAiGkhVeM2Bo6drZLmEzQJyV7NwV5-12D3KooWQrZnhRaBecSZYKR815zH65xkg1TvfyPWUGYwehHvVEKB-1624329431588035303  Completed       false     Provider state: StorageDealWaitingForData
    ```

2.Done

## Miner ID

1. 运行 `lotus client get-deal <PROPOSAL ID / DEAL CID OR WHATEVER IT'S CALLED> | jq '."DealInfo: "."Provider"'`:

    ```shell
    lotus client get-deal bafyreig237v7gnohrn3k425v5xnavgn6pbddvhjm3whjpko5r4vqvjfdmy | jq '."DealInfo: "."Provider"'
    ```

    得到 Miner ID:

    ```
    "f0127896"
    ```

1. 完成

## Data CID

1. 运行 `lotus client get-deal <PROPOSAL ID> | jq '."DealInfo: "."DataRef"."Root"."/"'`:

    ```shell
    lotus client get-deal bafyreig237v7gnohrn3k425v5xnavgn6pbddvhjm3whjpko5r4vqvjfdmy | jq '."DealInfo: "."DataRef"."Root"."/"'
    ```

    得到 Data CID:

    ```shell
    "bafykbzacecjiqho3qy2wwvtdqwhwalsklpdwrssn7jmg7jzvuya75xtuir2yg"
    ```

1. 完成

## 把它放在一起

1. 所有这些值添加到一个检索命令:

    ```shell
    lotus client retrieve --miner <MINER ID> <DATA CID> outfile.tar
    ```

   所以像这样:

    ```shell
    lotus client retrieve --miner f0127896 bafykbzacecjiqho3qy2wwvtdqwhwalsklpdwrssn7jmg7jzvuya75xtuir2yg ~/outfile.tar
    ```

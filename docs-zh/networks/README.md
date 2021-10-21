---
title: 网络
description: Filecoin网络有几个不同的网络用于测试、登台和生产目的.
---

# 网络

本页包含Filecoin的[可用网络](#available-networks)信息。

## 可用的网络

Filecoin有两个可用的网络:

- [Mainnet](#mainnet), 唯一生产Filecoin网络。
- [Calibration](#calibration), Filecoin的主要测试网络。

::: tip
检查每个网络的状态并订阅[status.filecoin.io](https://status.filecoin.io)的更新。
:::

### Mainnet

Mainnet是Filecoin的主要网络。主网开始于148888号街区。支持32gib和64gib扇区。

**Maintainer**: [协议实验室](https://protocol.ai)

**Genesis**:

- CAR 文件: `QmavMCf95w2UMYGD1J5GpHcWBWXR2jTFYmtAkgeroMmpk1`
- Reset时间戳: `2020-08-24T22:00:00Z`
- Genesis 块 CID: `bafy2bzacecnamqgqmifpluoeldx7zzglxcljo6oja4vrmtj7432rphldpdmm2`
- sha1 Digest: `4782cb42b4b01793b5cd9f593cc3dc87b6d3c7b4`

**网络参数**:

- 支持扇区大小: `32 GiB` and `64 GiB`
- 共识Miner最小算力: `10 TiB`
- Epoch间隔: `30 s`
- Expected Leaders per Epoch: `5`
- WindowPoSt Proving Period: `2880`
- WindowPoSt Challenge Window: `60`
- WindowPoSt Period Deadlines: `48`
- Pre-Commit Challenge Delay: `150`

**Bootstrap peers**:

```
/dns4/bootstrap-0.mainnet.filops.net/tcp/1347/p2p/12D3KooWCVe8MmsEMes2FzgTpt9fXtmCY7wrq91GRiaC8PHSCCBj
/dns4/bootstrap-1.mainnet.filops.net/tcp/1347/p2p/12D3KooWCwevHg1yLCvktf2nvLu7L9894mcrJR4MsBCcm4syShVc
/dns4/bootstrap-2.mainnet.filops.net/tcp/1347/p2p/12D3KooWEWVwHGn2yR36gKLozmb4YjDJGerotAPGxmdWZx2nxMC4
/dns4/bootstrap-3.mainnet.filops.net/tcp/1347/p2p/12D3KooWKhgq8c7NQ9iGjbyK7v7phXvG6492HQfiDaGHLHLQjk7R
/dns4/bootstrap-4.mainnet.filops.net/tcp/1347/p2p/12D3KooWL6PsFNPhYftrJzGgF5U18hFoaVhfGk7xwzD8yVrHJ3Uc
/dns4/bootstrap-5.mainnet.filops.net/tcp/1347/p2p/12D3KooWLFynvDQiUpXoHroV1YxKHhPJgysQGH2k3ZGwtWzR4dFH
/dns4/bootstrap-6.mainnet.filops.net/tcp/1347/p2p/12D3KooWP5MwCiqdMETF9ub1P3MbCvQCcfconnYHbWg6sUJcDRQQ
/dns4/bootstrap-7.mainnet.filops.net/tcp/1347/p2p/12D3KooWRs3aY1p3juFjPy8gPN95PEQChm2QKGUCAdcDCC4EBMKf
/dns4/bootstrap-8.mainnet.filops.net/tcp/1347/p2p/12D3KooWScFR7385LTyR4zU1bYdzSiiAb5rnNABfVahPvVSzyTkR
/dns4/lotus-bootstrap.ipfsforce.com/tcp/41778/p2p/12D3KooWGhufNmZHF3sv48aQeS13ng5XVJZ9E6qy2Ms4VzqeUsHk
/dns4/bootstrap-0.starpool.in/tcp/12757/p2p/12D3KooWGHpBMeZbestVEWkfdnC9u7p6uFHXL1n7m1ZBqsEmiUzz
/dns4/bootstrap-1.starpool.in/tcp/12757/p2p/12D3KooWQZrGH1PxSNZPum99M1zNvjNFM33d1AAu5DcvdHptuU7u
/dns4/node.glif.io/tcp/1235/p2p/12D3KooWBF8cpp65hp2u9LK5mh19x67ftAam84z9LsfaquTDSBpt
/dns4/bootstrap-0.ipfsmain.cn/tcp/34721/p2p/12D3KooWQnwEGNqcM2nAcPtRR9rAX8Hrg4k9kJLCHoTR5chJfz6d
/dns4/bootstrap-1.ipfsmain.cn/tcp/34723/p2p/12D3KooWMKxMkD5DMpSWsW7dBddKxKT7L2GgbNuckz9otxvkvByP
```

**资源**:

- [Latest chain snapshot (pruned)](https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car)
- [Latest chain snapshot (full)](https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/complete_chain_with_finality_stateroots_latest.car)
- [Status page and incidents](https://filecoin.statuspage.io/)
- [Stats dashboard](https://stats.filecoin.io/)
- [Slack Channel for Updates: #fil-mainnet-announcements](https://filecoinproject.slack.com/archives/C019UFEACBT)
- [Slack Channel for Questions: #fil-mainnet](https://filecoinproject.slack.com/archives/C0179RNEMU4)
- [Block explorer: 1475 Explorer](https://1475ipfs.com/#/blockBrowser)
- [Block explorer: Filfox](https://filfox.io/)
- [Block explorer: Filplorer](https://filplorer.com/)
- [Block explorer: Filscan](https://filscan.io/)
- [Block explorer: Filscout](https://filscout.io/)

### Calibration

Calibration网络是最真实的模拟Filecoin主网:

- 由于使用最终证明结构和参数，未来的存储miner可以体验更现实的封装性能和硬件要求。
- 未来的存储客户端可以在网络上存储和检索真实的数据。客户可以参与交易流程和存储+检索功能。
- 扇区大小与主网相同。Calibration网络支持32gib和64gib扇区。

**Maintainer**: [Protocol Labs](https://protocol.ai)

**Genesis**:

- CAR File: `QmY581cXXtNwHweiC69jECupu9EBx274huHjSgxPNv1zAAj`
- Reset Timestamp: `2021-02-19T23:10:00Z`
- Genesis Block CID: `bafy2bzaceapb7hfdkewspic7udnogw4xnhjvhm74xy5snwa24forre5z4s2lm`
- sha1 Digest: `944c0c13172b9f552dfed5dfaffaba95113c8254`

**网络参数**:

- Supported Sector Sizes: `32 GiB` and `64 GiB`
- Consensus Miner Min Power: `32 GiB`
- Epoch Duration Seconds: `30`
- Expected Leaders per Epoch: `5`
- WindowPoSt Proving Period: `2880`
- WindowPoSt Challenge Window: `60`
- WindowPoSt Period Deadlines: `48`
- Pre-Commit Challenge Delay: `150`

**Bootstrap peers**:

```
/dns4/bootstrap-0.calibration.fildev.network/tcp/1347/p2p/12D3KooWRLZAseMo9h7fRD6ojn6YYDXHsBSavX5YmjBZ9ngtAEec
/dns4/bootstrap-1.calibration.fildev.network/tcp/1347/p2p/12D3KooWJFtDXgZEQMEkjJPSrbfdvh2xfjVKrXeNFG1t8ioJXAzv
/dns4/bootstrap-2.calibration.fildev.network/tcp/1347/p2p/12D3KooWP1uB9Lo7yCA3S17TD4Y5wStP5Nk7Vqh53m8GsFjkyujD
/dns4/bootstrap-3.calibration.fildev.network/tcp/1347/p2p/12D3KooWLrPM4WPK1YRGPCUwndWcDX8GCYgms3DiuofUmxwvhMCn
```
**资源**:

- [Faucet](https://faucet.calibration.fildev.network/)
- [Stats Dashboard](https://stats.calibration.fildev.network/)
- [Slack Channel for Updates: #fil-net-calibration-announce](https://filecoinproject.slack.com/archives/C01C5PT7ETC)
- [Slack Channel for Questions: #fil-net-calibration-discuss](https://filecoinproject.slack.com/archives/C01D42NNLMS)
- [Block explorer - Filscout for Calibration](https://calibration.filscout.com/en)
- [Block explorer - filscan for Calibration](https://calibration.filscan.io/)

### 弃用网络

下面是一些已经弃用的网络:

|名称|描述|弃用的|
| --- | --- | --- |
| Nerpa |微小扇区大小的测试网络。这个网络是为应用程序开发人员在转移到Calibration测试网络之前测试他们的应用程序的非常基本的功能。| 2021-08-16 |

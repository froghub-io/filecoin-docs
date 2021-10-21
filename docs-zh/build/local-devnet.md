---
title: '运行Filecoin本地dev-net'
description: '在本地运行 Filecoin 网络对于想要构建和测试其应用程序的开发人员非常有用。此页面提供有关在本地运行 Filecoin 网络的不同方法的指南.'
breadcrumb: '本地dev-net'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 手动设置

您可以使用常规的 Lotus 二进制文件启动开发网。此方法将使用 2 KiB 扇区启动 Lotus，允许资源较少的系统运行开发网。此解决方案可在具有 2 个 CPU 内核和 4 GB RAM 的计算机上轻松运行。
此过程需要您使用多个终端窗口，因此您可能会找到一个终端多路复用器，例如 [Tmux](https://github.com/tmux/tmux) 有帮助.

1. 一些较旧的 Intel 和 AMD 处理器不支持 [ADX instruction set](https://en.wikipedia.org/wiki/Intel_ADX) 可能会因非法指令错误而恐慌. 要解决这个问题, 添加 `CGO_CFLAGS` 环境变量:

   ```shell
   export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
   export CGO_CFLAGS="-D__BLST_PORTABLE__"
   ```

1. 更换 `LOTUS_PATH` 和 `LOTUS_MINER_PATH` 带有临时值:

   ```shell
   export LOTUS_PATH=~/.lotusDevnet
   export LOTUS_MINER_PATH=~/.lotusminerDevnet
   ```

   如果将这些值添加到配置文件中，例如 `~/.bashrc` 如果您想在 Filecoin 主网上运行节点，则必须删除它们.

1. 克隆 Lotus 仓库:

   ```shell
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus
   ```

1. 使用 2048 字节扇区在调试模式下制作 Lotus 二进制文件:

   ```shell with-output
   make 2k
   ```
   ```
   git submodule update --init --recursive
   Submodule 'extern/filecoin-ffi' (https://github.com/filecoin-project/filecoin-ffi.git) registered for path 'extern/filecoin-ffi'
   ...
   ```

1. Lotus 将自动寻找 Filecoin 主网的起源。跳过这一步，使用 `LOTUS_SKIP_GENESIS_CHECK` 环境变量:

   ```shell
   export LOTUS_SKIP_GENESIS_CHECK=_yes_
   ```

1. 抓取2048字节参数:

   ```shell with-output
   ./lotus fetch-params 2048
   ```
   ```
   2021-02-23T10:58:01.469-0500    INFO    build   go-paramfetch@v0.0.2-0.20200701152213-3e0f0afdc261/paramfetch.go:138  Parameter file /var/tmp/filecoin-proof-parameters/v28-proof-of-spacetime-fallback-merkletree-poseidon_hasher-8-0-0-0cfb4f178bbb71cf2ecfcd42accce558b27199ab4fb59cb78f2483fe21ef36d9.vk is ok
   ...
   c261/paramfetch.go:162  parameter and key-fetching complete
   ```

1. 为genesis block预先封装一些扇区:

   ```shell with-output
   ./lotus-seed pre-seal --sector-size 2KiB --num-sectors 2
   ```
   ```
   sector-id: {{1000 0} 0}, piece info: {2048 baga6ea4seaqoej3hzxzqr5y25ibovtjrhed7yba5vm6gwartr5hsgcbao7aluki}
   ...
   2021-02-23T10:59:36.937-0500    INFO    preseal seed/seed.go:232        Writing preseal manifest to /home/user/.genesis-sectors/pre-seal-t01000.json
   ```

1. 创建 genesis block:

   ```shell
   ./lotus-seed genesis new localnet.json
   ```

1. 用一些 FIL 为默认账户注资:

   ```shell with-output
   ./lotus-seed genesis add-miner localnet.json ~/.genesis-sectors/pre-seal-t01000.json
   ```
   ```
   t3wknmlrksha5itapqstc46zdals676h67vjl7lg2lvmrxozzuth6hovuuamgfbk6cqgha3m3qfo4fxmuhubha some initial balance
   ```

1. 启动第一个节点:

   ```shell
   ./lotus daemon --lotus-make-genesis=devgen.car --genesis-template=localnet.json --bootstrap=false
   ```

1. 创建一个新的终端窗口或选项卡并重新导出 `LOTUS_PATH` 和 `LOTUS_MINER_PATH` 变量:

   ```shell
   export LOTUS_PATH=~/.lotusDevnet
   export LOTUS_MINER_PATH=~/.lotusminerDevnet
   ```

   如果您将上述变量添加到配置文件中，例如 `~/.bashrc` 那么你就可以获取该文件:

   ```shell
   source ~/.bashrc
   ```

1. 导入 genesis miner key:

   ```shell with-output
   ./lotus wallet import --as-default ~/.genesis-sectors/pre-seal-t01000.key
   ```
   ```
   imported key t3sxyian3zr52a32r7gpyx55rhf4wmbsm7e6ir3ygcaytrl44txwxwyron7uo4pbbqvmsaek36gqbjmmpwkwga successfully!
   ```

1. 设置 genesis miner. 此过程可能需要几分钟时间:

   ```shell with-output
   ./lotus-miner init --genesis-miner --actor=t01000 --sector-size=2KiB --pre-sealed-sectors=~/.genesis-sectors --pre-sealed-metadata=~/.genesis-sectors/pre-seal-t01000.json --nosync
   ```
   ```
   2021-02-23T11:05:17.941-0500    INFO    main    lotus-storage-miner/init.go:124 Initializing lotus miner
   ...
   2021-02-23T16:55:57.257Z        INFO    main    lotus-storage-miner/init.go:494 Importing pre-sealed sector metadata for t01000
   2021-02-23T16:55:57.266Z        INFO    main    lotus-storage-miner/init.go:266 Miner successfully created, you can now start it with 'lotus-miner run'
   ```

1. 启动 miner:

   ```shell with-output
   ./lotus-miner run --nosync
   ```
   ```
   2021-02-23T16:58:13.493Z        INFO    main    lotus-storage-miner/run.go:95   Checking full node sync status
   2021-02-23T16:58:13.501Z        INFO    modules modules/core.go:64      memory limits initialized       {"max_mem_heap": 0, "total_system_mem": 2101817344, "effective_mem_limit": 2101817344}
   ...
   ```

您现在有一个 Lotus 节点和一个正在运行的miner！你可以与它互动

## Textile cointainer

Textile 的开发人员创建了一种快速的方法来运行 Lotus dev-net 以进行测试。除了易于设置之外，这个开发网的一个优点是使用模拟的“扇区构建器”，这使得诸如封装之类的昂贵操作变得更加容易。

前往 [textileio/lotus-devnet GitHub 仓库](https://github.com/textileio/lotus-devnet) 了解如何在 Textile dev-net 上设置节点.

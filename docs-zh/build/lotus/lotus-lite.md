---
标题：Lite 节点
描述：“Lotus lite 节点是能够在低端硬件上运行的 Lotus full node的精简版本。Lotus lite 节点不包含任何链数据，只能执行消息签名和交易。但是，它们启动起来非常快，并且可以与其他 Lotus lite 节点并行处理事务。”
---

# Lite 节点 

Lotus lite-node 是 Lotus full node的精简版，能够在低端硬件上运行。 Lotus lite-nodes 不包含任何链数据，只能执行消息签名和交易交易。但是，它们启动起来非常快，并且可以与其他 Lotus lite 节点并行处理事务。

在开始之前，让我们先回顾一下我们将在本指南中使用的术语：

| 学期 | 描述 |
| --- | --- |
| Lotus | 主要的 Filecoin 实现，用 Golang 编写. |
| Full-node | 一个 Lotus 节点，包含 Filecoin 网络的所有区块链数据. |
| Lite-node | 一个 Lotus 节点，不包含 Filecoin 网络的任何区块链数据。 Lite 节点依赖于对完整节点的访问才能运行. |

## 先决条件

要启动 Lotus lite 节点，您需要：

1. A [Lotus full-node](../../get-started/lotus/installation). 为获得最佳结果，请确保此节点已完全同步. 
2. 一台至少具有 2GB RAM 和双核 CPU 的计算机，用作 Lotus lite 节点。这可以是您的本地机器。这台计算机必须安装 Rust and Go 1.16.4 或更高版本。
3. 你必须有 [所需的所有软件依赖项](../../get-started/lotus/installation#software-dependencies) 来建立Lotus.

## full node准备

如果您有权访问正在使用的完整节点，则需要对其配置进行一些小的修改。

:::tip
如果您使用的是协议实验室 `api.chain.love` Lotus full node, 您不需要完成此部分。 Protocol Labs Lotus full node已配置为接受所有传入请求，因此您无需创建任何 API 密钥。

如果您使用的是节点托管服务，例如 [Glif](https://www.glif.io/) 或者 [Infura](https://infura.io/), 您可能需要通过服务网站创建 API 密钥.
:::

1. 在你的full node打开 `~/.lotus/config` 和:

    a. Uncommend line 3.
    a. Change `127.0.0.1` to `0.0.0.0`.

    ```toml
    ListenAddress = "/ip4/0.0.0.0/tcp/1234/http"
    ```

    保存并退出文件。

1. 为您的 lite-node 创建一个 API 令牌以使用：

    ```shell
    # lotus auth create-token --perm <read,write,sign,admin>
    lotus auth create-token --perm write
    ```

    您选择的权限取决于您的用例。看看 [API 令牌部分以了解更多信息 →](./api-tokens/#obtaining-tokens)

1. 将此 API 令牌发送到您的 lite-node 或将成为 lite-node 管理员的任何人。
1. 如果您正在运行 `lotus daemon`，请停止并重新启动它。这会强制 Lotus 打开我们刚刚设置的 API 端口。

接下来，您将在 lite 节点上创建 Lotus 可执行文件并以 _lite_ 模式运行它！

## 创建可执行文件 

您需要创建 Lotus 可执行文件来运行您的 lite-node。此过程与创建full node时相同。

### 基于 AMD 和 Intel 的计算机

1. 在要运行 lite-node 的计算机上, 克隆 [Lotus GitHub 仓库](https://github.com/filecoin-project/lotus) 

    ```shell
    git clone https://github.com/filecoin-project/lotus
    cd lotus
    ```

1. 创建可执行文件，但不要运行任何东西:

    ```shell
    make clean all
    sudo make install
    ```

    如果您在这里遇到错误，可能是因为您没有安装所有的 Lotus 依赖项。快速浏览一下 [Lotus 入门指南](../../get-started/lotus/installation/#software-dependencies) 并仔细检查您是否安装了所有依赖项，以及 Golang 和 Rust.

1. 浏览 [开始于 lite-node](#启动轻节点).

### 基于 M1 的 Mac

由于基于 M1 的 Mac 计算机的新颖架构，在创建 `lotus` 可执行文件之前必须设置一些特定的环境变量.

1. 克隆 [Lotus repository](https://github.com/filecoin-project/lotus) 来源于 GitHub: 

    ```shell   
    git clone https://github.com/filecoin-project/lotus
    cd lotus
    ```

1. 引入子模块:

    ```shell
    git submodule update --init --recursive
    ```

1. 创建必要的环境变量以允许 Lotus 在 ARM 架构上运行:

    ```shell
    export GOARCH=arm64
    export CGO_ENABLED=1
    export LIBRARY_PATH=/opt/homebrew/lib
    export FFI_BUILD_FROM_SOURCE=1
    ```

1. 进入 `extern/filecoin-ffi` 目录并切换到 `m1-portable` 分支:

    ```shell
    cd extern/filecoin-ffi
    git fetch -a
    git checkout master
    ```

1. 创建 `filecoin-ffi` 可执行文件:

    ```shell
    make clean
    make
    ```

1. 移回 Lotus 根目录并创建 `lotus` daemon:

    ```shell
    cd ../../
    make lotus
    ```

1. 移动到 [启动lite-node](#启动lite-node).

## 启动 lite-node

您已经准备好 Lotus 可执行文件，并且可以访问 Lotus full node。剩下的就是将您的 Lotus lite 节点连接到完整节点！

1. 在 lite-node 上，创建一个名为 `FULLNODE_API_INFO` 的环境变量，并在调用 `lotus daemon --lite` 时为其赋予以下值。确保将“API_TOKEN”替换为您从full node获得的令牌，并将“YOUR_FULL_NODE_IP_ADDRESS”替换为您的full node的 IP 地址：
    ```shell with-output
    FULLNODE_API_INFO=API_TOKEN:/ip4/YOUR_FULL_NODE_IP_ADDRESS/tcp/1234 lotus daemon --lite
    ```
    ```
    2021-03-02T23:59:50.609Z        INFO    main    lotus/daemon.go:201     lotus repo: /root/.lotus
    ...
    ```
    
    `API_TOKEN` 变量后面必须跟一个冒号 (`:`).
    
    如果你没有`API_TOKEN`, 您可以在没有任何命令的情况下运行上述命令，并获得对full node的只读访问权限:

    ```shell
    FULLNODE_API_INFO=/ip4/YOUR_FULL_NODE_IP_ADDRESS/tcp/1234 lotus daemon --lite
    ```

1. 您现在可以与 Lotus lite 节点交互:

    ```shell with-output
    lotus wallet balance f10...
    ```
    ```
    100 FIL
    ```

lite-node 的功能有限，并且设计为仅执行消息签名和事务操作。 Lite-nodes 不能直接封装数据或查询链。所有链请求都通过附加的full node。如果由于某种原因，full node离线，任何连接到它的精简节点也将离线。
### 访问和权限 

设置 Lotus lite 节点而不使用 [API token from a full-node](./api-tokens/) 导致精简节点对full node具有只读访问权限。虽然对于大多数用例，只读访问应该没问题，但在某些情况下，您需要对full node进行写访问。
## 用例 

Lotus lite-node 可以执行基于交易的功能，如创建交易、提议交易、签署消息等。它们本身没有任何链数据，完全依赖full node来获取链数据。 Lotus lite 节点本身完全没用。

一个用例是需要在一分钟内签署多条消息的服务，例如交换。在这种情况下，服务可以有多个轻节点专门用于签署和处理事务计算，而单个full node维护链数据。

另一种情况是一个组织有很多数据想要存储在 Filecoin 上，但没有资源来运行full node。他们可以创建一个 Lotus lite-node 来与他们信任的full node创建交易，然后一旦找到miner，lite-node 就可以将数据传输给miner。

## 优点和缺点

由于 Lotus lite 节点不需要同步任何链数据，因此它们能够快速启动。由于它们的硬件要求极低，因此可以使用非常小的占用空间来启动多个 lite 节点。项目可以通过在必要时添加或删除 Lotus lite 节点来横向扩展或缩减其处理能力。

然而，lite-nodes 有一些明显的缺点。虽然 lite 节点可以在不访问full node的情况下执行某些功能，但所有需要访问链数据的事务和进程都必须通过 Lotus full node路由。

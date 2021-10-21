---
title: 'Lotus Miner: 基准测试'
description: 'Lotus自带了一个基准测试工具，可以用来测试每个资源密集型挖矿操作需要多长时间。本指南介绍了如何安装基准测试工具，以及一些基本操作。'
breadcrumb: '基准测试'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 安装

1. 你的电脑上必须有Lotus资源库。如果你没有现有的存储库副本，[从GitHub克隆它](https://github.com/filecoin-project/lotus/)。

   ```shell with-output
   git clone https://github.com/filecoin-project/lotus.git ~/lotus
   ```
   ```
   Cloning into '/root/lotus'...
   remote: Enumerating objects: 93, done.
   ...
   Resolving deltas: 100% (51531/51531), done.
   ```

1. 必须在' ~/lotus '存储库文件夹中构建' lotus '二进制文件。如果你只是克隆了存储库或者放错了“lotus”二进制文件，那么构建项目:

   ```shell with-output
   cd ~/lotus
   make clean all && make install
   ```
   ```
   rm -rf  build/.filecoin-install build/.update-modules  lotus lotus-miner lotus-worker lotus-shed lotus-gateway lotus-seed lotus-pond lotus-townhall lotus-fountain lotus-chainwatch lotus-bench lotus-stats lotus-pcr lotus-health lotus-wallet testground
   make -C extern/filecoin-ffi/ clean
   ...
   install -C ./lotus /usr/local/bin/lotus
   install -C ./lotus-miner /usr/local/bin/lotus-miner
   install -C ./lotus-worker /usr/local/bin/lotus-worker
   ```

1. 调用' make Lotus -bench '来构建Lotus基准二进制代码:

   ```shell with-output
   make lotus-bench
   ```
   ```
   rm -f lotus-bench
   go build -o lotus-bench ./cmd/lotus-bench
   ...
   go run github.com/GeertJohan/go.rice/rice append --exec lotus-bench -i ./build
   ```

   这将在当前文件夹中生成一个“lotus-bench”二进制文件。

1. 现在可以对系统运行“lotus-bench”。

## 使用方法

使用该工具的自我记录功能来探索不同的命令。

```shell with-output
    ./lotus-bench --help
```
```
  NAME:
  lotus-bench - Benchmark performance of lotus on your hardware

  USAGE:
  lotus-bench [global options] command [command options] [arguments...]

  VERSION:
  1.2.0

  COMMANDS:
  prove    Benchmark a proof computation
  sealing
  import   benchmark chain import and validation
  help, h  Shows a list of commands or help for one command

  GLOBAL OPTIONS:
  --help, -h     show help (default: false)
  --version, -v  print the version (default: false)
```

## 命令

### 证明

使用 `lotus-bench prove [命令选项] [参数...]` 对证明计算进行基准测试。例如：

```shell
./lotus-bench prove
```

可用的选项：

| 选项                  | 说明                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `--no-gpu`           | 禁用基准运行的gpu使用（默认：false）。                                                         |
| `--miner-addr value` | 传递miner地址（只有在使用现有扇形结构时才需要）（默认："t01000"）。                                  |
| `--help, -h`         | 显示帮助（默认：false）。                                                                    |

### 封装

使用 `lotus-bench sealing [命令选项] [参数...]` 对封装计算进行基准测试。例如：

```shell with-output
./lotus-bench sealing
```
```
2020-11-23T18:05:22.028Z        INFO    lotus-bench     lotus-bench/main.go:78  Starting lotus-bench
...
----
results (v28) (536870912)
seal: addPiece: 21.783625761s (23.5 MiB/s)
seal: preCommit phase 1: 4m45.456592593s (1.794 MiB/s)
seal: preCommit phase 2: 5m39.64126859s (1.507 MiB/s)
seal: commit phase 1: 48.158372ms (10.38 GiB/s)
seal: commit phase 2: 2m10.561079144s (3.922 MiB/s)
seal: verify: 6.236412ms
unseal: 3m52.85376877s  (2.199 MiB/s)

generate candidates: 231.814µs (2.106 TiB/s)
compute winning post proof (cold): 23.405645045s
compute winning post proof (hot): 22.507299071s
verify winning post proof (cold): 257.502167ms
verify winning post proof (hot): 7.473581ms

compute window post proof (cold): 7.132316755s
compute window post proof (hot): 6.893502363s
verify window post proof (cold): 57.524992ms
verify window post proof (hot): 5.629919ms
```

可用的选项：

| 选项                                        | 说明                                                                                          |
| ------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `--storage-dir value`                      | 长期存储扇区的存储目录的路径（默认："~/.lotus-bench"）。                                            |
| `--sector-size value`                      | 扇区的大小，以字节为单位，即32GiB（默认："512MiB"）。                                               |
| `--no-gpu`                                 | 禁用基准运行的gpu使用（默认：false）。                                                            |
| `--miner-addr value`                       | 传递miner地址（只有在使用现有扇形结构时才需要）（默认："t01000"）。                                     |
| `--benchmark-existing-sectorbuilder value` | 传递一个目录，用于在现有的扇形建构机上运行岗位计时。                                                  |
| `--json-out`                               | 以json格式输出结果（默认：false）。                                                              |
| `--skip-commit2`                           | 跳过基准的 commit2 （snark）部分 （默认：false）                                                  |
| `--skip-unseal`                            | 跳过基准的解封部分 （默认：false）                                                                |
| `--save-commit2-input value`               | 将 commit2 的输入保存到一个文件中                                                                |
| `--num-sectors value`                      | （默认：1）                                                                                   |
| `--parallel value`                         | （默认：1）                                                                                   |
| `--help, -h`                               | 显示帮助 （默认：false）                                                                       |

### 导入

使用 `lotus-bench导入命令[命令选项][参数...]` 进行基准链导入和验证。例如：

```shell
./lotus-bench import analyze import.car
```

可用的命令：

| 命令       | 说明                        |
| --------- | -------------------------- |
| `analyze` | 分析一个 `.car` 文件。        |
| `help`    | 显示帮助信息。                |

可用的选项：

| 选项                              | 说明                                                                                                                                                 |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--start-tipset value`              | 在给定的 tipset key 开始验证；格式为cid1,cid2,cid3...                                                                                                 |
| `--end-tipset value`                | 在给定的 tipset key 上停止验证；格式为cid1,cid2,cid3...                                                                                               |
| `--genesis-tipset value`            | 创始 tipset key; 格式为cid1,cid2,cid3...                                                                                                           |
| `--start-height value`              | 在给定的高度开始验证；注意高度的链式遍历非常慢（默认：0）                                                                                                  |
| `--end-height value`                | 在给定的高度后停止验证；请注意高度链的遍历速度非常慢（默认值：0）                                                                                            |
| `--batch-seal-verify-threads value` | 设置批量封印验证的平行度系数（默认：4）                                                                                                                 |
| `--repodir value`                   | 设置 lotus bench 运行的 repo 目录（默认为/tmp）                                                                                                      |
| `--syscall-cache value`             | 从数据存储中读写系统调用结果。                                                                                                                        |
| `--export-traces`                   | 我们是否应该导出执行痕迹（默认：true）。                                                                                                               |
| `--no-import`                       | 如果设置为 "true"，则必须先导入链条。（默认值：false）                                                                                                  |
| `--global-profile`                  | (默认：true)                                                                                                                                     |
| `--only-import`                     | (默认：假)                                                                                                                                       |
| `--use-pebble`                      | (默认：假)                                                                                                                                       |
| `--car value`                       | CAR文件的路径；导入时需要；验证时，需要CAR路径或 --head 标志                                                                                            |
| `--head value`                      | 头部的 tipset key，在对现有 chain store 进行基准验证时，如果没有 CAR，则有用；如果同时提供 --car 和 --head，则 --head 优先于 CAR 根；格式为 cid1,cid2,cid3...  |
| `--help, -h`                        | 显示帮助（默认：假）                                                                                                                               |                                                                           
| `--version, -v`                     | 打印版本（默认：false）                                                                                                                           |


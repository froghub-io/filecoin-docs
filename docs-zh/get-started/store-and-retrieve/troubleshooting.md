---
title: 故障排除
description: 在存储和检索Filecoin时遇到问题?请查看这些故障排除步骤。
---

# 故障排除

## ERROR: connect: 连接失败

如果在尝试将Lotus lite节点连接到Lotus全节点时出现' connect: connection refused '错误，这可能是因为全节点没有正确配置。仔细检查你的~ / .lotus /配置。Toml '文件第3行没有注释，地址设置为' 0.0.0.0 ':

    ```shell
    [API]
    ListenAddress = "/ip4/0.0.0.0/tcp/1234/http"
    #  RemoteListenAddress = ""
    ```

如果在编辑`config.toml`后仍然遇到问题，请重新设置Lotus全节点计算机 . 确保计算机重新启动后，用“Lotus daemon”启动Lotus守护进程.

## 我用的是哪个shell

运行' echo $SHELL '，找出你使用的SHELL:

```shell with-output
echo $SHELL  
```
```                                                                                                ~
/bin/zsh
```

## 我的Mac有哪个CPU ?

打开终端窗口并运行:

```shell
sysctl -n machdep.cpu.brand_string
```

基于M1的mac将返回“Apple M1”。搭载AMD或英特尔处理器的mac电脑将获得类似“英特尔(R) Core(TM) i7-10700K CPU @ 3.80GHz”的功能。

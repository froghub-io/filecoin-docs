---
title: '日志'
description: 'miner可以使用日志来详细观察程序的工作流程，并简化故障排除.'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 文件位置

日志目录默认是 `~/.lotusminer/journal` . 如果你配置了`LOTUS_MINER_PATH`,  i它应该位于 `LOTUS_MINER_PATH/journal`. 最新的日志文件是 `lotus-journal.ndjson`.

日志文件默认使用json格式，带有系统和事件标识符，便于过滤和处理。

## 检查日志

1. 检查密封过程及密封状态:

    ```shell with-output
    cat lotus-journal.ndjson | grep sealing_states
    ```

    ```json output
    {"System":"storage","Event":"sealing_states","Timestamp":"2021-09-22T12:51:04.144905781+08:00","Data":{"SectorNumber":67,"SectorType":5,"From":"PreCommitBatchWait","After":"WaitSeed","Error":""}}
    {"System":"storage","Event":"sealing_states","Timestamp":"2021-09-22T12:53:14.389710503+08:00","Data":{"SectorNumber":67,"SectorType":5,"From":"WaitSeed","After":"Committing","Error":""}}
    ```

1. 检查 `windowpost`:

    ```shell with-output
    cat lotus-journal.ndjson | grep wdpost
    ```

    ```json output
    {"System":"wdpost","Event":"scheduler","Timestamp":"2021-09-22T12:49:33.802956998+08:00","Data":{"Deadline":{"CurrentEpoch":31436,"PeriodStart":29458,"Index":32,"Open":31378,"Close":31438,  "Challenge":31358,"FaultCutoff":31308,"WPoStPeriodDeadlines":48,"WPoStProvingPeriod":2880, "WPoStChallengeWindow":60,"WPoStChallengeLookback":20,"FaultDeclarationCutoff":70},"Height":31436, "TipSet":[{"/":"bafy2bzaceajca6lstl3f6ez2ilfsrqlhugcfvr7eybfyomvtbebt43z2xyjm2"}],"State":"started"}}  
    ```

1. 检查_mined_记录:

    ```shell with-output
    cat lotus-journal.ndjson | grep block_mined
    ```

    ```json output
    {"System":"miner","Event":"block_mined","Timestamp":"2021-09-22T12:49:56.313760193+08:00","Data":{"cid":{"/":"bafy2bzaceazj2htu5d5ylny5ixj2kxp7tmcfubgbo7hotc3z37zsrleidoolu"},"epoch":31437,"nulls":0,"parents":[{"/":"bafy2bzaceajca6lstl3f6ez2ilfsrqlhugcfvr7eybfyomvtbebt43z2xyjm2"}],"timestamp":1630872025}}
    ```

---
title: 'Lotus：将Go与JSON-RPC API结合使用'
description: '这是有关如何使用Filecoin项目的json-rpc库为Go客户端提供动力以与Lotus API交互的指南。'
breadcrumb: '将Go与JSON-RPC API结合使用'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

要使用 Lotus Go 客户端，可以使用[go-jsonrpc](https://github.com/filecoin-project/go-jsonrpc)库与 Lotus API 节点进行交互。该库是由 Lotus 开发人员编写的，并由 Lotus 本身使用。

首先，您可以导入必要的 Go 模块来解决依赖关系：

```shell
$ go get github.com/filecoin-project/go-jsonrpc
```

## 准备步骤

- 如果您的 Lotus 实例是远程托管的， 请确保您具有[远程 API 访问的权限](enable-remote-api-access.md).
- 您将需要[获得 API 令牌](docs-zh/build/lotus/api-tokens.md)

## 使用客户端

这是有关如何连接到 Lotus API 的完整代码段：

```go
package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/filecoin-project/go-jsonrpc"
	"github.com/filecoin-project/lotus/api/apistruct"
)

func main() {
	authToken := "<value found in ~/.lotus/token>"
	headers := http.Header{"Authorization": []string{"Bearer " + authToken}}
	addr := "127.0.0.1:1234"

	var api apistruct.FullNodeStruct
	closer, err := jsonrpc.NewMergeClient(context.Background(), "ws://"+addr+"/rpc/v0", "Filecoin", []interface{}{&api.Internal, &api.CommonStruct.Internal}, headers)
	if err != nil {
		log.Fatalf("connecting with lotus failed: %s", err)
	}
	defer closer()

       // Now you can call any API you're interested in.
	tipset, err := api.ChainHead(context.Background())
	if err != nil {
		log.Fatalf("calling chain head: %s", err)
	}
	fmt.Printf("Current chain head is: %s", tipset.String())
}

```

运行 `go mod init` 来设置 `go.mod` 文件，就可以开始了！

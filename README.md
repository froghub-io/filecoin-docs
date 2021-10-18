# Filecoin Docs

**查看Filecoin项目的概念中文文档请跳转到[filecoin-docs.froghub.io](https://filecoin-docs.froghub.io/).** 您可能还对Filecoin的[技术规范](https://filecoin-project.github.io/specs/) 或[lotus教程](https://lotu.sh)中实现细节感兴趣。

## Working on this platform

要启动这个 VuePress 站点的本地实例，请参见下文：

1. 安装 NPM 依赖项：

   ```shell
   npm install
   ```

2. 在 _开发模式_ 下启动中文版应用程序：

   ```shell
   npm run start-zh
   ```

3. 在浏览器中打开[localhost:8080](http://localhost:8080)。

## Code organization

- 中文翻译的内容位于`docs-zh`文件中，是英文文档路径`docs`的镜像。每个主要部分都有自己的子文件夹。
- 导航是从 [docs-zh/.vuepress/config.js](https://github.com/filecoin-project/filecoin-docs/blob/master/docs-zh/.vuepress/config.js) 和每个 Markdown 文件中的元数据生成的。添加新内容时，请务必在此配置文件中创建一个条目。
- 要在主页上展示新文章，您还需要 `manualSidebar` 在 [docs-zh/.vuepress/themes/components/Home.vue](https://github.com/filecoin-project/filecoin-docs/blob/master/docs-zh/.vuepress/theme/components/Home.vue).处更新Home 组件中的对象。

## Contributing

Learn more about [contributing to this docs site](https://docs.filecoin.io/community/contribute/ways-to-contribute/#documentation).

## License

All software code is copyright (c) Protocol Labs, Inc. under the **MIT license**. Other written documentation and content is copyright (c) Protocol Labs, Inc. under the [**Creative Commons Attribution-Share-Alike License**](https://creativecommons.org/licenses/by/4.0/). See [LICENSE file](./LICENSE.md) for details.

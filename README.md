# experiment-helper-mobile

XDU 实验计算器

**Web 端使用地址**  <https://experiment-helper.wizzstudio.com>

## 开发环境配置

> 推荐基于 VSCode 的 [Dev Container](https://code.visualstudio.com/docs/devcontainers/containers) 功能进行开发

```sh
yarn install --ignore-engines # this project only support node version <= 17, but the current node version is higher than 17, so use --ignore-engines
# or
yarn install --registry=https://registry.npmjs.org --ignore-engines # use --registry to get the lasest version of core

yarn serve
```

核心计算逻辑见 [experiment-helper-core](https://github.com/117503445/experiment-helper-core)

## 开源协议

此代码库使用 [MIT](./LICENSE) 协议。使用者可以自由的部署、修改、分发代码，但需在 `关于` 等界面中声明 `WizzStudio` 的原创性。也欢迎提 PR。

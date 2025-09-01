---
title: UnoCSS Nuxt 模块
description: 用于 UnoCSS 的 Nuxt 模块。
---

# Nuxt 模块

用于 UnoCSS 的 Nuxt 模块。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D unocss @unocss/nuxt
```

```bash [yarn]
yarn add -D unocss @unocss/nuxt
```

```bash [npm]
npm install -D unocss @unocss/nuxt
```

```bash [bun]
bun add -D unocss @unocss/nuxt
```

:::

将 `@unocss/nuxt` 添加到你的 Nuxt 配置文件中：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
  ],
})
```

创建一个 `uno.config.ts` 文件：

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS 配置选项
})
```

模块会自动注入 `uno.css` 入口文件。

## 支持状态

|               | Nuxt 2 | Nuxt Bridge | Nuxt 3 |
| ------------- | :----- | :---------- | :----- |
| Webpack Dev   | ✅     | ✅          | 🚧     |
| Webpack Build | ✅     | ✅          | ✅     |
| Vite Dev      | -      | ✅          | ✅     |
| Vite Build    | -      | ✅          | ✅     |

## 配置

我们推荐使用专门的 `uno.config.ts` 文件进行配置。详情请参阅 [配置文件](/guide/config-file)。

你可以启用 `nuxtLayers` 选项，这样 Nuxt 将自动合并来自每个 Nuxt 层的 `uno.config` 文件：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  // ...
  unocss: {
    nuxtLayers: true,
  },
})
```

然后你可以在根配置文件中重新导出生成的配置：

```ts [uno.config.ts]
import config from './.nuxt/uno.config.mjs'

export default config
```

或者修改/扩展它：

```ts
import { mergeConfigs } from '@unocss/core'
import config from './.nuxt/uno.config.mjs'

export default mergeConfigs([config, {
  // 你的覆盖配置
}])
```

## 许可证

- MIT License &copy; 2021-PRESENT [Anthony Fu](https://github.com/antfu)
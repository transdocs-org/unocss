---
title: UnoCSS Astro 集成
description: 用于 Astro 的 UnoCSS 集成（@unocss/astro）。
---

# Astro 集成

用于 [Astro](https://astro.build/) 的 UnoCSS 集成：`@unocss/astro`。请查看 [示例](https://github.com/unocss/unocss/tree/main/examples/astro)。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D unocss
```

```bash [yarn]
yarn add -D unocss
```

```bash [npm]
npm install -D unocss
```

```bash [bun]
bun add -D unocss
```

:::

```ts [astro.config.ts]
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

export default defineConfig({
  integrations: [
    UnoCSS(),
  ],
})
```

创建一个 `uno.config.ts` 文件：

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS 配置项
})
```

### 样式重置

默认情况下，不会注入 [浏览器样式重置](/guide/style-reset)。要启用它，请安装 `@unocss/reset` 包：

::: code-group

```bash [pnpm]
pnpm add -D @unocss/reset
```

```bash [yarn]
yarn add -D @unocss/reset
```

```bash [npm]
npm install -D @unocss/reset
```

```bash [bun]
bun add -D @unocss/reset
```

:::

然后更新你的 `astro.config.ts` 文件：

```ts [astro.config.ts]
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

export default defineConfig({
  integrations: [
    UnoCSS({
      injectReset: true // 或者指定重置文件的路径
    }),
  ],
})
```

### 不使用预设的用法

该插件不包含任何默认预设。

::: code-group

```bash [pnpm]
pnpm add -D @unocss/astro
```

```bash [yarn]
yarn add -D @unocss/astro
```

```bash [npm]
npm install -D @unocss/astro
```

```bash [bun]
bun add -D @unocss/astro
```

:::

```ts [astro.config.mjs]
import UnoCSS from '@unocss/astro'

export default {
  integrations: [
    UnoCSS(),
  ],
}
```

更多详细信息，请参考 [Vite 插件](/integrations/vite)。

::: info
如果你正在基于 UnoCSS 构建一个元框架，请查看 [此文件](https://github.com/unocss/unocss/blob/main/packages-presets/unocss/src/astro.ts)，了解如何绑定默认预设的示例。
:::

## 注意事项

[`client:only`](https://docs.astro.build/en/reference/directives-reference/#clientonly) 组件必须放置在 [`components`](https://docs.astro.build/en/core-concepts/project-structure/#srccomponents) 文件夹中，或添加到 UnoCSS 的 `content` 配置中，以便被处理。
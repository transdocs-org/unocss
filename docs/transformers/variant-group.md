---
title: 变体组转换器
description: 为 UnoCSS 启用 Windi CSS 的变体组功能 (@unocss/transformer-variant-group)
---

# 变体组转换器

为 UnoCSS 启用 [Windi CSS 的变体组功能](https://windicss.org/features/variant-groups.html)。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/transformer-variant-group
```

```bash [yarn]
yarn add -D @unocss/transformer-variant-group
```

```bash [npm]
npm install -D @unocss/transformer-variant-group
```

```bash [bun]
bun add -D @unocss/transformer-variant-group
```

:::

```ts [uno.config.ts]
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...
  transformers: [
    transformerVariantGroup(),
  ],
})
```

::: tip
此预设已包含在 `unocss` 包中，你也可以从那里导入它：

```ts
import { transformerVariantGroup } from 'unocss'
```

:::

## 使用方式

```html
<div class="hover:(bg-gray-400 font-medium) font-(light mono)" />
```

将被转换为：

```html
<div class="hover:bg-gray-400 hover:font-medium font-light font-mono" />
```

## 许可证

- MIT License &copy; 2021-PRESENT [Anthony Fu](https://github.com/antfu)
---
title: MDC 提取器
description: 用于 UnoCSS 的 MDC 提取器 (@unocss/extractor-mdc)
---

# MDC 提取器

支持从 [MDC（Markdown 组件）](https://content.nuxtjs.org/guide/writing/mdc) 语法中提取类。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/extractor-mdc
```

```bash [yarn]
yarn add -D @unocss/extractor-mdc
```

```bash [npm]
npm install -D @unocss/extractor-mdc
```

```bash [bun]
bun add -D @unocss/extractor-mdc
```

:::

```ts [uno.config.ts]
import extractorMdc from '@unocss/extractor-mdc'
import { defineConfig } from 'unocss'

export default defineConfig({
  extractors: [
    extractorMdc(),
  ],
})
```

它将在 `.md`、`.mdc` 和 `.markdown` 文件中启用类的提取，用于提取内联属性中使用的类。例如：

```md
# Title{.text-2xl.font-bold}

Hello [World]{.text-blue-500}

![image](/image.png){.w-32.h-32}
```

其中的 `text-2xl`、`font-bold`、`text-blue-500`、`w-32`、`h-32` 类将被提取出来。
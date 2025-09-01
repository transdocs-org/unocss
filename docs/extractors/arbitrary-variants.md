---
title: 任意变体提取器
---

# 任意变体提取器

一个更复杂的提取器，用于支持工具类的任意变体。

```html
<div class="[&>*]:m-1 [&[open]]:p-2"></div>
```

将分别捕获 `[&>*]:m-1` 和 `[&[open]]:p-2` 作为变体。

该提取器作为默认提取器包含在 [`@unocss/preset-mini`](/presets/mini) 中。通常不需要手动安装此包。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/extractor-arbitrary-variants
```

```bash [yarn]
yarn add -D @unocss/extractor-arbitrary-variants
```

```bash [npm]
npm install -D @unocss/extractor-arbitrary-variants
```

```bash [bun]
bun add -D @unocss/extractor-arbitrary-variants
```

:::

```ts [uno.config.ts]
import extractorArbitrary from '@unocss/extractor-arbitrary-variants'
import { defineConfig } from 'unocss'

export default defineConfig({
  extractors: [
    extractorArbitrary(),
  ],
})
```
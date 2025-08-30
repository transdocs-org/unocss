---
title: 核心
description: UnoCSS 的核心引擎，不包含任何预设。你可以将其作为自己原子化 CSS 框架的引擎使用。
---

# Core

不包含任何预设的 UnoCSS 核心引擎：`@unocss/core`。你可以将其作为自己原子化 CSS 框架的引擎使用。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/core
```

```bash [yarn]
yarn add -D @unocss/core
```

```bash [npm]
npm install -D @unocss/core
```

```bash [bun]
bun add -D @unocss/core
```

:::

## 使用方法

```ts
import { createGenerator } from '@unocss/core'

const generator = await createGenerator(
  { /* 用户选项 */ },
  { /* 默认选项 */ }
)

const { css } = await generator.generate(code)
```

## 许可证

- MIT License &copy; 2021-PRESENT [Anthony Fu](https://github.com/antfu)
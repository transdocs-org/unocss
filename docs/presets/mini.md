---
title: Mini 预设
description: UnoCSS 的最小预设 (@unocss/preset-mini)。
outline: deep
---

# Mini 预设

UnoCSS 的基础预设，仅包含最核心的工具类。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-mini)

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-mini
```

```bash [yarn]
yarn add -D @unocss/preset-mini
```

```bash [npm]
npm install -D @unocss/preset-mini
```

```bash [bun]
bun add -D @unocss/preset-mini
```

:::

```ts [uno.config.ts]
import presetMini from '@unocss/preset-mini'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetMini(),
    // ...其他预设
  ],
})
```

::: tip
该预设包含在 `unocss` 包中，你也可以直接从那里导入：

```ts
import { presetMini } from 'unocss'
```

:::

## 规则

该预设是 [`@unocss/preset-wind3`](/presets/wind3) 的子集，仅包含与 CSS 属性对齐的最基本工具类，排除了 Tailwind CSS 中引入的一些主观或复杂的工具类（如 `container`、`animation`、`gradient` 等）。如果你希望基于 Tailwind CSS 或 Windi CSS 中熟悉的工具类之上构建自己的自定义预设，这是一个很好的起点。

## 特性

### 暗黑模式

默认情况下，该预设使用 `dark:` 变体生成基于类的暗黑模式。

```html
<div class="dark:bg-red:10" />
```

将生成：

```css
.dark .dark\:bg-red\:10 {
  background-color: rgb(248 113 113 / 0.1);
}
```

#### 基于媒体查询的暗黑模式

如果你想全局使用基于媒体查询的暗黑模式，可以修改 `dark:` 变体的配置：

```ts
presetMini({
  dark: 'media'
})
```

现在：

```html
<div class="dark:bg-red:10" />
```

将生成：

```css
@media (prefers-color-scheme: dark) {
  .dark\:bg-red\:10 {
    background-color: rgb(248 113 113 / 0.1);
  }
}
```

### CSS @layer

支持使用 `layer-xx:` 变体生成 [CSS 原生的 @layer](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@layer)：

```html
<div class="layer-foo:p4" />
<div class="layer-bar:m4" />
```

将生成：

```css
@layer foo {
  .layer-foo\:p4 {
    padding: 1rem;
  }
}
@layer bar {
  .layer-bar\:m4 {
    margin: 1rem;
  }
}
```

### 主题

你可以在配置中完全自定义你的 `theme` 属性，UnoCSS 最终会将其深度合并到默认主题中。

:::warning
`breakpoints` 属性不会被深度合并，而是被覆盖，请参阅 [Breakpoints](/config/theme#breakpoints)。
:::

```ts
presetMini({
  theme: {
    // ...
    colors: {
      veryCool: '#0000ff', // class="text-very-cool"
      brand: {
        primary: 'hsl(var(--hue, 217) 78% 51%)', // class="bg-brand-primary"
      }
    },
  }
})
```

## 选项

### dark

- **类型：** `class | media | DarkModeSelectors`
- **默认值：** `class`

暗黑模式选项。可以是 `class`、`media` 或自定义选择器对象（`DarkModeSelectors`）。

```ts
interface DarkModeSelectors {
  /**
   * 亮色变体的选择器。
   *
   * @default '.light'
   */
  light?: string

  /**
   * 暗色变体的选择器。
   *
   * @default '.dark'
   */
  dark?: string
}
```

### attributifyPseudo

- **类型：** `Boolean`
- **默认值：** `false`

将伪选择器生成为 `[group=""]` 而不是 `.group`。

### variablePrefix

- **类型：** `string`
- **默认值：** `un-`

CSS 自定义属性的前缀。

### prefix

- **类型：** `string | string[]`
- **默认值：** `undefined`

工具类前缀。

### preflight

- **类型：** `boolean` | `on-demand`
- **默认值：** `true`

是否生成预设样式（preflight CSS）。可选值包括：

- `true`：始终生成预设样式。
- `false`：不生成预设样式。
- `on-demand`：仅对使用的工具类生成预设样式。
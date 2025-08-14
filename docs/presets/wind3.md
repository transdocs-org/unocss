---
title: Wind3 预设
description: 用于 UnoCSS 的 Tailwind CSS / Windi CSS 紧凑预设（@unocss/preset-wind3）。
outline: deep
---

# Wind3 预设

用于 UnoCSS 的 Tailwind CSS / Windi CSS 紧凑预设。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-wind3)

::: info
`@unocss/preset-wind` 和 `@unocss/preset-uno` 已被弃用，并重命名为 `@unocss/preset-wind3`。此预设继承自 [`@unocss/preset-mini`](/presets/mini)。
:::

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-wind3
```

```bash [yarn]
yarn add -D @unocss/preset-wind3
```

```bash [npm]
npm install -D @unocss/preset-wind3
```

```bash [bun]
bun add -D @unocss/preset-wind3
```

:::

```ts [uno.config.ts]
import presetWind3 from '@unocss/preset-wind3'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
  ],
})
```

::: tip
该预设已包含在 `unocss` 包中，你也可以从那里导入：

```ts
import { presetWind3 } from 'unocss'
```

:::

## 规则

此预设的主要目标是提供与 [Tailwind CSS](https://tailwindcss.com/) 和 [Windi CSS](https://windicss.org/) 的兼容性。需要注意的是，完全兼容性可能无法保证。详细用法请参考它们的 <a href="https://tailwindcss.com/docs" target="_blank">文档</a>。

关于此预设包含的所有规则和预设，请参考我们的 <a href="/interactive/" target="_blank">交互式文档</a> 或直接查看 [源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-wind3)。

## 功能

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

要全局使用基于媒体查询的暗黑模式，可以修改 `dark:` 变体的配置：

```ts
presetWind3({
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

#### 按需启用基于媒体查询的暗黑模式

要按需使用基于媒体查询的暗黑模式，可以使用 `@dark:` 变体：

```html
<div class="@dark:bg-red:10" />
```

将生成：

```css
@media (prefers-color-scheme: dark) {
  .\@dark\:bg-red\:10 {
    background-color: rgb(248 113 113 / 0.1);
  }
}
```

## 与 Tailwind CSS 的差异

### 引号

由于提取器的工作方式，模板中（即要处理的文件）不支持使用引号。例如你不能写 `before:content-['']`。在这种情况下，你可以引入一个新的工具类来显式设置，例如 `class="before:content-empty"`。

### background-position 与任意值

Tailwind [允许](https://tailwindcss.com/docs/background-position#using-custom-values) 使用裸语法为 `background-position` 设置自定义值：

```html
<div class="bg-[center_top_1rem]"></div>
```

而 Wind 预设会将 `center_top_1rem` 解释为颜色。请使用 `position:` 前缀实现相同功能：

```html
<div class="bg-[position:center_top_1rem]"></div>
```

### 动画

Tailwind CSS 的内置动画较少，我们完全支持其动画规则，并且内部集成了 [Animate.css](https://github.com/animate-css/animate.css) 以提供更多动画效果。

你可以使用 `animate-` 前缀来引导智能提示快速找到所需的动画。

:::tip
我们不会合并 Tailwind 和 Animate.css 中冲突的动画名称。如果需要使用 Animate.css 中的动画名称，请使用 `animate-<name>-alt`。
:::

例如：

|                                                                                                                                         Tailwind CSS                                                                                                                                          |                                                                                                                                            Animate.css                                                                                                                                            |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                                                       `animate-bounce`                                                                                                                                        |                                                                                                                                       `animate-bounce-alt`                                                                                                                                        |
| <div w-full flex="~ items-center justify-center"><div class="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-purple-900/5 dark:ring-purple-200/20 shadow-lg rounded-full flex items-center justify-center"><div text-purple size-5 i-carbon-arrow-down></div></div></div> | <div w-full flex="~ items-center justify-center"><div class="animate-bounce-alt bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-purple-900/5 dark:ring-purple-200/20 shadow-lg rounded-full flex items-center justify-center"><div text-purple size-5 i-carbon-arrow-down></div></div></div> |

如果你想自定义或修改动画效果，我们提供了高度可配置的选项。你可以通过配置项修改动画的持续时间、延迟、速度曲线等。

```ts [uno.config.ts]
export default defineConfig({
  theme: {
    animation: {
      keyframes: {
        custom: '{0%, 100% { transform: scale(0.5); } 50% { transform: scale(1); }}',
      },
      durations: {
        custom: '1s',
      },
      timingFns: {
        custom: 'cubic-bezier(0.4,0,.6,1)',
      },
      properties: {
        custom: { 'transform-origin': 'center' },
      },
      counts: {
        custom: 'infinite',
      },
    }
  }
})
```

预览自定义动画：

<div class="animate-custom bg-white dark:bg-slate-800 p-2 w-fit ring-1 ring-purple-900/5 dark:ring-purple-200/20 shadow-lg rounded-md flex items-center justify-center">animate-custom</div>

:::tip
你也可以添加 `category` 来对动画进行分组以便管理。这将有助于下游工具更好地使用动画效果。

```ts [uno.config.ts] {9}
export default defineConfig({
  theme: {
    animation: {
      keyframes: {
        custom: '{0%, 100% { transform: scale(0.5); } 50% { transform: scale(1); }}',
      },
      // ...
      category: {
        custom: '缩放动画',
      },
    }
  }
})
```

:::

## 与 Windi CSS 的差异

### 断点

| Windi CSS | UnoCSS      |
| :-------- | :---------- |
| `<sm:p-1` | `lt-sm:p-1` |
| `@lg:p-1` | `at-lg:p-1` |
| `>xl:p-1` | `xl:p-1`    |

### 括号语法中的空格

此预设使用 `_` 而非 `,` 来表示括号语法中的空格。

| Windi CSS                          | UnoCSS                             |
| :--------------------------------- | :--------------------------------- |
| `grid-cols-[1fr,10px,max-content]` | `grid-cols-[1fr_10px_max-content]` |

由于某些 CSS 规则需要 `,` 作为值的一部分，例如 `grid-cols-[repeat(3,auto)]`。

## 实验性功能

::: warning
此预设包含实验性功能，随时可能以破坏性方式更改。
:::

### 媒体悬停（Media Hover）

媒体悬停解决了在移动端点击带有悬停样式的元素后，悬停状态会持续保留的问题，直到点击其他位置。

由于常规的 `:hover` 样式使用非常广泛，该变体使用 `@hover` 语法来区分常规的 `hover` 伪类。

变体 `@hover-text-red` 将生成：

```css
@media (hover: hover) and (pointer: fine) {
  .\@hover-text-red:hover {
    --un-text-opacity: 1;
    color: rgb(248 113 113 / var(--un-text-opacity));
  }
}
```

## 选项

::: info
此预设的选项继承自 [`@unocss/preset-mini`](/presets/mini#options)。
:::

### important

- **类型:** `boolean | string`
- **默认值:** `false`

`important` 选项允许你控制 UnoCSS 的工具类是否应标记为 `!important`。当你将 UnoCSS 与具有高优先级选择器的现有 CSS 结合使用时，这非常有用。

::: warning
启用此选项会将 `!important` 应用于 UnoCSS 生成的所有工具类。如果你只想将其应用于特定工具类，请改用 `important:` 变体。
:::

然而，当引入某些第三方 JS 库，这些库会向元素添加内联样式时，使用此选项可能会引发一些问题。在这种情况下，UnoCSS 的 `!important` 工具类会覆盖内联样式，从而破坏你的预期设计。

为了解决这个问题，你可以将 `important` 设置为一个 ID 选择器，例如 `#app`：

```ts [uno.config.ts]
import presetWind3 from '@unocss/preset-wind'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3({
      important: '#app',
    }),
  ],
})
```

此配置将给定的选择器前缀添加到所有工具类上，从而有效提高其特异性，而无需实际使用 `!important`。

工具类 `dark:bg-blue` 将输出：

```css
#app :is(.dark .dark\:bg-blue) {
  --un-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--un-bg-opacity));
}
```
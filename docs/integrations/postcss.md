---
title: UnoCSS PostCSS 插件
outline: deep
---

# PostCSS 插件

用于 UnoCSS 的 PostCSS 插件。支持 `@apply`、`@screen` 和 `theme()` 指令。

[源代码](https://github.com/unocss/unocss/tree/main/packages-integrations/postcss)

::: warning
此包目前处于实验阶段。它不遵循语义化版本控制（semver），补丁版本中可能会引入破坏性变更。
:::

## 安装

::: code-group

```bash [pnpm]
pnpm add -D unocss @unocss/postcss
```

```bash [yarn]
yarn add -D unocss @unocss/postcss
```

```bash [npm]
npm install -D unocss @unocss/postcss
```

```bash [bun]
bun add -D unocss @unocss/postcss
```

:::

```ts [postcss.config.mjs]
import UnoCSS from '@unocss/postcss'

export default {
  plugins: [
    UnoCSS(),
  ],
}
```

```ts [uno.config.ts]
import { defineConfig, presetWind3 } from 'unocss'

export default defineConfig({
  content: {
    filesystem: [
      '**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}',
    ],
  },
  presets: [
    presetWind3(),
  ],
})
```

```css [style.css]
@unocss;
```

## 使用方法

### `@unocss`

`@unocss` at-rule 是一个占位符，将被生成的 CSS 替换。

你也可以单独注入每个层：

```css [style.css]
@unocss preflights;
@unocss default;

/*
  回退层。建议始终包含它。
  只有未使用的层会在这里注入。
*/
@unocss;
```

如果你想无论是否已包含都注入所有层，可以使用 `@unocss all`。当你希望在多个文件中包含生成的 CSS 时，这会很有用。

```css
@unocss all;
```

或者，如果你想要排除某个特定层，可以使用 `@unocss !<layer>` 指令：

```css
@unocss !preflights, !<other-layer>;
```

### `@apply`

```css
.custom-div {
  @apply text-center my-0 font-medium;
}
```

将会转换为：

```css
.custom-div {
  margin-top: 0rem;
  margin-bottom: 0rem;
  text-align: center;
  font-weight: 500;
}
```

### `@screen`

`@screen` 指令允许你通过名称创建媒体查询，引用来自 [`theme.breakpoints`](https://github.com/unocss/unocss/blob/main/README.md#extend-theme) 的断点。

```css
.grid {
  @apply grid grid-cols-2;
}
@screen xs {
  .grid {
    @apply grid-cols-1;
  }
}
@screen sm {
  .grid {
    @apply grid-cols-3;
  }
}
/* ... */
```

将会转换为：

```css
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (min-width: 320px) {
  .grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
/* ... */
```

#### 断点变体支持

`@screen` 还支持 `lt`、`at` 变体。

##### `@screen lt`

```css
.grid {
  @apply grid grid-cols-2;
}
@screen lt-xs {
  .grid {
    @apply grid-cols-1;
  }
}
@screen lt-sm {
  .grid {
    @apply grid-cols-3;
  }
}
/* ... */
```

将会转换为：

```css
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (max-width: 319.9px) {
  .grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
@media (max-width: 639.9px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
/* ... */
```

##### `@screen at`

```css
.grid {
  @apply grid grid-cols-2;
}
@screen at-xs {
  .grid {
    @apply grid-cols-1;
  }
}
@screen at-xl {
  .grid {
    @apply grid-cols-3;
  }
}
@screen at-xxl {
  .grid {
    @apply grid-cols-4;
  }
}
/* ... */
```

将会转换为：

```css
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (min-width: 320px) and (max-width: 639.9px) {
  .grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
@media (min-width: 1280px) and (max-width: 1535.9px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (min-width: 1536px) {
  .grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
/* ... */
```

### `theme()`

使用 `theme()` 函数可以通过点表示法访问你的主题配置值。

```css
.btn-blue {
  background-color: theme('colors.blue.500');
}
```

将会编译为：

```css
.btn-blue {
  background-color: #3b82f6;
}
```
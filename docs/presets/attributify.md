---
title: 属性模式预设
description: 这个 UnoCSS 预设为其他预设启用 attributify 模式。
outline: deep
---

# 属性模式预设

此预设为其他预设启用 [attributify 模式](#attributify模式)。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-attributify)

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-attributify
```

```bash [yarn]
yarn add -D @unocss/preset-attributify
```

```bash [npm]
npm install -D @unocss/preset-attributify
```

```bash [bun]
bun add -D @unocss/preset-attributify
```

:::

```ts [uno.config.ts]
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
  presets: [
    presetAttributify({ /* 预设选项 */ }),
    // ...
  ],
})
```

::: 提示
此预设包含在 `unocss` 包中，你也可以从那里导入它：

```ts
import { presetAttributify } from 'unocss'
```

:::

## Attributify 模式

想象一下，你有一个使用 Tailwind CSS 工具类的按钮。当类列表变长时，它会变得难以阅读和维护。

```html
<button
  class="bg-blue-400 hover:bg-blue-500 text-sm text-white font-mono font-light py-2 px-4 rounded border-2 border-blue-200 dark:bg-blue-500 dark:hover:bg-blue-600"
>
  按钮
</button>
```

使用 attributify 模式，你可以将工具类拆分为属性：

```html
<button
  bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
  text="sm white"
  font="mono light"
  p="y-2 x-4"
  border="2 rounded blue-200"
>
  按钮
</button>
```

例如，`text-sm text-white` 可以合并为 `text="sm white"`，而无需重复相同的前缀。

## 前缀自引用

对于像 `flex`、`grid`、`border` 这样前缀和工具类名称相同的属性，提供了一个特殊的 `~` 值。

例如：

```html
<button class="border border-red">按钮</button>
```

可以写成：

```html
<button border="~ red">按钮</button>
```

## 无值属性模式

除了 Windi CSS 的 attributify 模式外，该预设还支持无值属性。

例如，

```html
<div class="m-2 rounded text-teal-400" />
```

现在可以写成：

```html
<div m-2 rounded text-teal-400 />
```

::: info
注意：如果你使用 JSX，`<div foo>` 可能会被转换为 `<div foo={true}>`，这将导致 UnoCSS 生成的 CSS 无法匹配属性。为解决这个问题，你可以同时使用此预设并尝试 [`transformer-attributify-jsx`](/transformers/attributify-jsx)。
:::

## 属性冲突

如果属性模式的名称与元素或组件的属性发生冲突，可以在属性前添加 `un-` 前缀以明确这是 UnoCSS 的 attributify 模式。

例如：

```html
<a text="red">这与链接的 `text` 属性冲突</a>
<!-- 变成 -->
<a un-text="red">文字颜色为红色</a>
```

默认情况下，前缀是可选的。如果你想强制使用前缀，请设置：

```ts
presetAttributify({
  prefix: 'un-',
  prefixedOnly: true, // <--
})
```

你也可以通过以下方式禁用对某些属性的扫描：

```ts
presetAttributify({
  ignoreAttributes: [
    'text'
    // ...
  ]
})
```

## TypeScript 支持（JSX/TSX）

创建 `shims.d.ts` 文件并添加以下内容：

> 默认情况下，类型包括来自 `@unocss/preset-wind3` 的常见属性。如果你需要自定义属性，请参考 [类型源码](https://github.com/unocss/unocss/blob/main/packages-presets/preset-attributify/src/jsx.ts) 实现你自己的类型。

### Vue

自从 Volar 0.36 起，[它对未知属性变得严格](https://github.com/johnsoncodehk/volar/issues/1077#issuecomment-1145361472)。要禁用该限制，你可以在项目中添加以下文件：

```ts [html.d.ts]
declare module '@vue/runtime-dom' {
  interface HTMLAttributes {
    [key: string]: any
  }
}
declare module '@vue/runtime-core' {
  interface AllowedComponentProps {
    [key: string]: any
  }
}
export {}
```

### React

```ts
import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module 'react' {
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}
```

### Vue 3

```ts
import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module '@vue/runtime-dom' {
  interface HTMLAttributes extends AttributifyAttributes {}
}
```

### SolidJS

```ts
import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module 'solid-js' {
  namespace JSX {
    interface HTMLAttributes<T> extends AttributifyAttributes {}
  }
}
```

### Svelte & SvelteKit

```ts
declare namespace svelteHTML {
  import type { AttributifyAttributes } from '@unocss/preset-attributify'

  type HTMLAttributes = AttributifyAttributes
}
```

### Astro

```ts
import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare global {
  namespace astroHTML.JSX {
    interface HTMLAttributes extends AttributifyAttributes { }
  }
}
```

### Preact

```ts
import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module 'preact' {
  namespace JSX {
    interface HTMLAttributes extends AttributifyAttributes {}
  }
}
```

### 带前缀的 Attributify

```ts
import type { AttributifyNames } from '@unocss/preset-attributify'

type Prefix = 'uno:' // 将其更改为你的前缀

interface HTMLAttributes extends Partial<Record<AttributifyNames<Prefix>, string>> {}
```

## 选项

### strict

- **类型：** `boolean`
- **默认值：** `false`

仅生成 attributify 或 class 的 CSS。

### prefix

- **类型：** `string`
- **默认值：** `'un-'`

attributify 模式的前缀。

### prefixedOnly

- **类型：** `boolean`
- **默认值：** `false`

仅匹配带前缀的属性。

### nonValuedAttribute

- **类型：** `boolean`
- **默认值：** `true`

支持匹配无值属性。

### ignoreAttributes

- **类型：** `string[]`

要忽略提取的属性列表。

### trueToNonValued

- **类型：** `boolean`
- **默认值：** `false`

如果 DOM 中的实际值为 `true`，无值属性也会匹配。此选项用于支持将无值属性编码为 `true` 的框架。启用此选项将破坏以 `true` 结尾的规则。

## 致谢

初始想法来自 [@Tahul](https://github.com/Tahul) 和 [@antfu](https://github.com/antfu)。之前的 [Windi CSS 实现](https://windicss.org/posts/v30.html#attributify-mode) 由 [@voorjaar](https://github.com/voorjaar) 完成。
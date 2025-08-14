---
title: 属性化 JSX 转换器
description: 支持在 JSX/TSX 中使用无值属性化（@unocss/transformer-attributify-jsx）
---

# 属性化 JSX 转换器

支持在 JSX/TSX 中使用 [无值属性化](/presets/attributify#valueless-attributify)：`@unocss/transformer-attributify-jsx`。

## 演示

<!-- @unocss-ignore -->

```jsx
export function Component() {
  return (
    <div text-red text-center text-5xl animate-bounce>
      unocss
    </div>
  )
}
```

将被转换为：

```jsx
export function Component() {
  return (
    <div text-red="" text-center="" text-5xl="" animate-bounce="">
      unocss
    </div>
  )
}
```

::: details 如果没有此转换器，JSX 会将无值属性视为布尔属性。

```jsx
export function Component() {
  return (
    <div text-red={true} text-center={true} text-5xl={true} animate-bounce={true}>
      unocss
    </div>
  )
}
```

:::

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/transformer-attributify-jsx
```

```bash [yarn]
yarn add -D @unocss/transformer-attributify-jsx
```

```bash [npm]
npm install -D @unocss/transformer-attributify-jsx
```

```bash [bun]
bun add -D @unocss/transformer-attributify-jsx
```

:::

```ts{11} [uno.config.ts]
import { defineConfig, presetAttributify } from 'unocss'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'

export default defineConfig({
  // ...
  presets: [
    // ...
    presetAttributify(),
  ],
  transformers: [
    transformerAttributifyJsx(), // <--
  ],
})
```

::: 提示
该转换器已包含在 `unocss` 包中，你也可以直接从那里导入：

```ts
import { transformerAttributifyJsx } from 'unocss'
```

:::

## 注意事项

::: warning
其规则与 [属性化预设](/presets/attributify) 几乎相同，但有几点需要注意。
:::

```html
<div translate-x-100% />
<!-- 不能以 `%` 结尾 -->

<div translate-x-[100px] />
<!-- 不能包含 `[` 或者 `]` -->
```

你可以改用带值的属性形式：

```html
<div translate="x-100%" />

<div translate="x-[100px]" />
```

## 屏蔽列表

此转换器只会转换有效的 UnoCSS 工具类属性。
你也可以通过 `blocklist` 排除某些属性不被转换。

```js
transformerAttributifyJsx({
  blocklist: [/text-[a-zA-Z]*/, 'text-5xl']
})
```

```jsx
<div text-red text-center text-5xl animate-bounce>
  unocss
</div>
```

将被编译为：

```html
<div text-red text-center text-5xl animate-bounce="">unocss</div>
```
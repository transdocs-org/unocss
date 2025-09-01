---
title: 样式重置
description: UnoCSS 默认不提供样式重置或预设样式，以实现最大的灵活性，并避免污染你的全局 CSS。
outline: deep
---

# 浏览器样式重置

UnoCSS 默认不提供样式重置或预设样式，以避免污染你的全局 CSS 并实现最大的灵活性。如果你将 UnoCSS 与其他 CSS 框架一起使用，它们可能已经为你完成了样式重置。如果你单独使用 UnoCSS，可以使用类似 [Normalize.css](https://github.com/csstools/normalize.css) 的重置库。

我们也提供了一些小型的样式重置包供你快速使用：

## 安装

::: code-group

```bash [pnpm]
pnpm add @unocss/reset
```

```bash [yarn]
yarn add @unocss/reset
```

```bash [npm]
npm install @unocss/reset
```

```bash [bun]
bun add @unocss/reset
```

:::

## 使用方法

你可以将以下任意一个重置样式表添加到你的 `main.js` 文件中。

### Normalize.css

源码：https://github.com/csstools/normalize.css

```ts
import '@unocss/reset/normalize.css'
```

### sanitize.css

源码：https://github.com/csstools/sanitize.css

```ts
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
```

### Eric Meyer

源码：https://meyerweb.com/eric/tools/css/reset/index.html

```ts
import '@unocss/reset/eric-meyer.css'
```

### Tailwind

```ts
import '@unocss/reset/tailwind.css'
```

### Tailwind 兼容版

```ts
import '@unocss/reset/tailwind-compat.css'
```

该重置基于 [Tailwind 的重置样式](#tailwind)，但移除了按钮的背景颜色覆盖，以避免与 UI 框架产生冲突。请参见 [相关 issue](https://github.com/unocss/unocss/issues/2127)。

::: code-group

```css [重置前]
button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}
```

```css [重置后]
button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  /*background-color: transparent; !* 2 *!*/
  background-image: none; /* 2 */
}
```

:::
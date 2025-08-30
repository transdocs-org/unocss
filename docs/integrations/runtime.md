---
title: UnoCSS CDN 运行时
description: UnoCSS 的 CSS-in-JS 运行时（@unocss/runtime）。
outline: deep
---

# 运行时

UnoCSS 运行时提供了一个可在浏览器中直接运行的 CDN 构建版本。它会检测 DOM 变化并即时生成样式。

## 使用方法

将以下代码添加到你的 `index.html` 文件中：

```html [index.html]
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
```

在加载运行时之前，你可以通过定义配置来配置 UnoCSS 运行时：

```html
<!-- 定义 unocss 配置... -->
<script>
  window.__unocss = {
    rules: [
      // 自定义规则...
    ],
    presets: [
      // 自定义预设...
    ],
    // ...
  }
</script>
<!-- 然后加载运行时 -->
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
```

默认情况下会应用 [Wind3 预设](/presets/wind3)。

运行时不包含预设样式（preflights），如果你希望重置样式，可以自行添加，或者使用 [Reset 包](/guide/style-reset) 提供的样式：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@unocss/reset/normalize.min.css" />
<!-- 或者 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css" />
```

## 构建版本

我们提供了多个构建版本以满足不同的使用场景。

### Uno（默认）

包含 `@unocss/preset-wind3` 预设：

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/uno.global.js"></script>
```

### Attributify

包含 `@unocss/preset-wind3` 和 `@unocss/preset-attributify` 预设：

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/attributify.global.js"></script>
```

### Mini

包含 `@unocss/preset-mini` 和 `@unocss/preset-attributify` 预设：

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/mini.global.js"></script>
```

### Core

如果你需要自由组合预设，可以只加载核心运行时，并手动指定所需的预设。UnoCSS 所有[官方预设](/presets/#presets)都可以使用。在初始化核心运行时前，先加载你需要的预设。

```html
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/preset-icons.global.js"></script>
<script>
  window.__unocss = {
    presets: [
      () =>
        window.__unocss_runtime.presets.presetIcons({
          scale: 1.2,
          cdn: 'https://esm.sh/',
        }),
    ],
  }
</script>
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/core.global.js"></script>
```

## 与打包工具一起使用

```bash
npm i @unocss/runtime
```

```ts
import initUnocssRuntime from '@unocss/runtime'

initUnocssRuntime({ /* 配置项 */ })
```

你可以通过 `defaults` 属性传入一个 UnoCSS 配置：

```ts
import initUnocssRuntime from '@unocss/runtime'
import config from './uno.config'

initUnocssRuntime({ defaults: config })
```

预设可以从 `esm.sh` 导入：

```ts
import { defineConfig } from '@unocss/runtime'
import presetIcons from 'https://esm.sh/@unocss/preset-icons/browser'
import presetWind3 from 'https://esm.sh/@unocss/preset-wind3'

export default defineConfig({
  presets: [presetWind3(), presetIcons({ cdn: 'https://esm.sh/' })],
})
```

## 防止 FOUC

由于 UnoCSS 在 DOM 准备好后才开始运行，可能会出现“未样式化内容的闪烁”（FOUC），用户可能会看到未应用样式的页面内容。

你可以使用 `un-cloak` 属性配合 CSS 规则如 `[un-cloak] { display: none }` 来隐藏未样式化的元素，直到 UnoCSS 为其应用样式。

::: code-group

```css
[un-cloak] {
  display: none;
}
```

```html
<div class="text-blue-500" un-cloak>这段文字只会在蓝色样式下显示。</div>
```

:::
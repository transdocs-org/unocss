---
title: 指南
description: 开始使用 UnoCSS
---

# 什么是 UnoCSS？

UnoCSS 是一个即时的原子化 CSS 引擎，设计灵活且可扩展。其核心不带有特定的样式偏好，所有的 CSS 工具类都通过预设提供。

例如，你可以在本地的 [配置文件](/guide/config-file) 中通过定义规则来创建自定义的 CSS 工具类。

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  rules: [
    ['m-1', { margin: '1px' }],
  ],
})
```

这将在你的项目中添加一个新的 CSS 工具类 `m-1`。由于 UnoCSS 是按需加载的，除非你在代码中使用它，否则不会产生任何效果。例如，如果你有如下组件：

```html
<div class="m-1">Hello</div>
```

UnoCSS 会检测到 `m-1` 并生成以下 CSS：

<!-- eslint-skip -->

```css
.m-1 { margin: 1px; }
```

为了使其更灵活，你可以通过将规则的第一个参数（我们称之为 matcher）改为 `RegExp`，并将主体改为函数，来使你的规则动态化。例如：

```diff [uno.config.ts]
export default defineConfig({
  rules: [
-    ['m-1', { margin: '1px' }],
+    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
  ],
})
```

这样，你现在可以拥有任意的 margin 工具类，比如 `m-1`、`m-100` 或者 `m-52.43`。同样地，UnoCSS 仅在你使用时才会生成对应的样式。

```html
<div class="m-1">Hello</div>
<div class="m-7.5">World</div>
```

<!-- eslint-skip -->

```css
.m-1 { margin: 1px; }
.m-7.5 { margin: 7.5px; }
```

## 预设

当你创建了一些规则后，你可以将它们提取成一个预设，并与他人分享。例如，你可以为公司的设计系统创建一个预设，并与团队共享。

```ts [my-preset.ts]
import { Preset } from 'unocss'

export const myPreset: Preset = {
  name: 'my-preset',
  rules: [
    [/^m-([.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^p-([.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
  ],
  variants: [/* ... */],
  shortcuts: [/* ... */],
  // ...
}
```

```ts [uno.config.ts]
import { defineConfig } from 'unocss'
import { myPreset } from './my-preset'

export default defineConfig({
  presets: [
    myPreset, // 你自己的预设
  ],
})
```

类似地，我们为你准备了一些[官方预设](/presets/)，你可以立即开始使用它们。此外，你还可以在社区中找到许多有趣的 [社区预设](/presets/community)。

## 体验

你可以在浏览器中尝试 UnoCSS，前往 <a href="/play/" target="_blank">Playground</a>。或者在 <a href="/interactive/" target="_blank">Interactive Docs</a> 中查阅默认预设提供的工具类。

## 集成

UnoCSS 提供了多种框架/工具的集成支持：

<ContentIntegrations />

## 示例

所有示例的源代码可以在 [/examples](https://github.com/unocss/unocss/tree/main/examples) 目录中找到。

<ContentExamples/>
```
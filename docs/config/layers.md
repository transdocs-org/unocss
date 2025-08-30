---
title: 层级
icon: ph:stack-bold
description: UnoCSS 允许你自定义层级。
---

# 层级

CSS 的顺序会影响其优先级。虽然引擎会[保留规则的顺序](/config/rules#ordering)，但有时你可能希望将一些工具类分组，以显式控制它们的顺序。

## 使用

与 Tailwind CSS 提供的三个固定层级（`base`、`components`、`utilities`）不同，UnoCSS 允许你自定义层级。要设置层级，可以在规则中将元数据作为第三个参数传入：

```ts
rules: [
  [/^m-(\d)$/, ([, d]) => ({ margin: `${d / 4}rem` }), { layer: 'utilities' }],
  // 如果省略 layer，则默认为 `default`
  ['btn', { padding: '4px' }],
]
```

这将生成：

<!-- eslint-skip -->

```css
/* layer: default */
.btn { padding: 4px; }
/* layer: utilities */
.m-2 { margin: 0.5rem; }
```

你也可以在每个预设样式中设置层级：

```ts
preflights: [
  {
    layer: 'my-layer',
    getCSS: async () => (await fetch('my-style.css')).text(),
  },
]
```

## 顺序控制

你可以通过以下方式控制层级顺序：

<!--eslint-skip-->

```ts
layers: {
  'components': -1,
  'default': 1,
  'utilities': 2,
  'my-layer': 3,
}
```

未指定顺序的层级将按字母顺序排序。

当你希望在层级之间插入自定义 CSS 时，可以更新你的入口模块：

```ts
// 'uno:[layer-name].css'
import 'uno:components.css'

// 所有非 'components' 和 'utilities' 的层级将回退到此处
import 'uno.css'

// 你自己的 CSS
import './my-custom.css'

// "utilities" 层级将具有最高优先级
import 'uno:utilities.css'
```

## CSS 层叠层级（Cascade Layers）

你可以通过以下选项输出 CSS 层叠层级：

```ts
outputToCssLayers: true
```

也可以通过以下方式更改 CSS 层级名称：

```ts
outputToCssLayers: {
  cssLayerName: (layer) => {
    // 默认层级将输出到 "utilities" CSS 层级
    if (layer === 'default')
      return 'utilities'

    // shortcuts 层级将输出到 "utilities" CSS 层级下的 "shortcuts" 子层级
    if (layer === 'shortcuts')
      return 'utilities.shortcuts'

    // 其他层级直接使用其名称作为 CSS 层级名称
  }
}
```

## 使用变体创建层级

你可以通过变体来创建层级。

使用 `uno-layer-<name>:` 可以创建一个 UnoCSS 层级：

```html
<p class="uno-layer-my-layer:text-xl">text</p>
```

<!-- eslint-skip -->

```css
/* layer: my-layer */
.uno-layer-my-layer\:text-xl{ font-size:1.25rem; line-height:1.75rem; }
```

使用 `layer-<name>:` 可以创建一个 CSS `@layer`：

```html
<p class="layer-my-layer:text-xl">text</p>
```

<!-- eslint-skip -->

```css
/* layer: default */
@layer my-layer{ .layer-my-layer\:text-xl{ font-size:1.25rem; line-height:1.75rem; } }
```
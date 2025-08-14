---
title: 排版预设
description: UnoCSS 的排版类（@unocss/preset-typography）。
outline: deep
---

# 排版预设

提供一组“prose”类，用于为原始 HTML 添加排版默认样式。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-typography)

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-typography
```

```bash [yarn]
yarn add -D @unocss/preset-typography
```

```bash [npm]
npm install -D @unocss/preset-typography
```

```bash [bun]
bun add -D @unocss/preset-typography
```

:::

::: tip
此预设包含在 `unocss` 包中，也可以直接从那里导入：

```ts
import { presetTypography } from 'unocss'
```

:::

## 使用方法

```js [uno.config.js]
import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetWind3
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(), // 使用 attributify 模式时必需
    presetWind3(), // 必需
    presetTypography(),
  ],
})
```

::: code-group

```html [类]
<article class="text-base prose prose-truegray xl:text-xl">
  {{ markdown }}
  <p class="not-prose">Some text</p>
</article>
```

```html [属性]
<article text-base prose prose-truegray xl="text-xl">
  {{ markdown }}
  <p class="not-prose">Some text</p>
</article>
```

:::

::: warning
注意：`not-prose` 只能作为类使用，不能作为属性使用。
:::

## 特点

### 任意字体大小

可以为正文应用任意字体大小，`prose` 会根据该字体大小对相应 HTML 元素的样式进行缩放。例如，`prose text-lg` 的正文字体大小为 `1.125rem`，而 `h1` 将以该大小的 2.25 倍进行缩放。查看 [所有支持的 HTML 元素](https://github.com/unocss/unocss/blob/main/packages-presets/preset-typography/src/preflights/default.ts)。

### 任意颜色

可以通过 `prose-${colorName}` 应用任意颜色（例如 `prose-coolgray`、`prose-sky`），因为 `prose` 默认没有颜色。查看 [所有可用颜色](#colors)。例如，`prose prose-truegray` 将使用相应颜色应用于相应 HTML 元素。

### 单个工具实现暗色模式

使用 `prose-invert` 实现排版暗色模式（背景色需用户自行处理）。例如，`prose dark:prose-invert` 在暗色模式下将使用反转颜色。

### 自定义样式

不在 `prose` 内的元素样式保持不变。不会像其他框架那样进行样式重置，正如 UnoCSS 的一贯做法。

### 使用 `not` 工具撤销样式

使用 `not-prose` 可撤销某个元素的排版样式。例如，`<table class="not-prose">` 将跳过该 `table` 元素的此预设样式 **（注意：`not` 工具只能通过类使用，因为它仅在 CSS 选择器中使用，UnoCSS 不会扫描它）**。

### 兼容性选项

此预设使用了一些尚未广泛支持的伪类，但你可以禁用它们。([#2064](https://github.com/unocss/unocss/pull/2064))

- 如果启用 `noColonNot` 或 `noColonWhere`，则 `not-prose` 不可用。
- 如果启用 `noColonIs`，attributify 模式将出现错误行为。

## 工具类

|  规则   |                                                    该规则对应的样式                                                    |
| :-----: | :-----------------------------------------------------------------------------------------------------------------------: |
| `prose` | 查看 [GitHub 上的代码](https://github.com/unocss/unocss/blob/main/packages-presets/preset-typography/src/preflights/default.ts). |

### 颜色

| 规则（颜色）   |
| --------------- |
| `prose-rose`    |
| `prose-pink`    |
| `prose-fuchsia` |
| `prose-purple`  |
| `prose-violet`  |
| `prose-indigo`  |
| `prose-blue`    |
| `prose-sky`     |
| `prose-cyan`    |
| `prose-teal`    |
| `prose-emerald` |
| `prose-green`   |
| `prose-lime`    |
| `prose-yellow`  |
| `prose-amber`   |
| `prose-orange`  |
| `prose-red`     |
| `prose-gray`    |
| `prose-slate`   |
| `prose-zinc`    |
| `prose-neutral` |
| `prose-stone`   |

## 配置选项

此预设提供了 `selectorName` 和 `cssExtend` 配置，供希望覆盖或扩展样式的用户使用。

:::tip
传递给 `cssExtend` 的 CSS 声明：

- 如果值冲突，**将覆盖**内置样式；
- 否则，**将与内置样式深度合并**。
  :::

### selectorName

- **类型：** `string`
- **默认值：** `prose`

用于应用排版工具类的类名。要撤销元素的样式，请使用 `not-${selectorName}`，默认为 `not-prose`。

:::tip
`not` 工具只能通过类使用。
:::

### cssExtend

- **类型：** `Record<string, CSSObject>`
- **默认值：** `undefined`

通过 CSS 声明块扩展或覆盖 CSS 选择器。

### compatibility

- **类型：** `TypographyCompatibilityOptions`
- **默认值：** `undefined`

详见 [兼容性选项](#兼容性选项)。
:::warning
注意：这将影响部分功能。
:::

```ts
interface TypographyCompatibilityOptions {
  noColonWhere?: boolean
  noColonIs?: boolean
  noColonNot?: boolean
}
```

## 示例

```ts [uno.config.ts]
import { presetTypography } from '@unocss/preset-typography'
import { defineConfig, presetAttributify, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(), // 使用 attributify 模式时必需
    presetWind3(), // 必需
    presetTypography({
      selectorName: 'markdown', // 现在使用方式如 `markdown markdown-gray`, `not-markdown`
      // cssExtend 是一个对象，键为 CSS 选择器，值为 CSS 声明块，类似编写普通 CSS。
      cssExtend: {
        'code': {
          color: '#8b5cf6',
        },
        'a:hover': {
          color: '#f43f5e',
        },
        'a:visited': {
          color: '#14b8a6',
        },
      },
    }),
  ],
})
```

## 致谢

- [Tailwind CSS Typography](https://github.com/tailwindlabs/tailwindcss-typography)
- [Windi CSS Typography](https://github.com/windicss/windicss/tree/main/src/plugin/typography)
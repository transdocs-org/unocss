---
title: 排版预设
description: UnoCSS 的排版类（@unocss/preset-typography）。
outline: deep
---

# 排版预设

提供一组 prose 类，可用于为原生 HTML 添加排版默认值。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-typography)

## 安装

::: code-group
```bash [pnpm]
pnpm add -D @unocss/preset-typography
```
（原文为空，无需翻译）
```bash [yarn]
yarn add -D @unocss/preset-typography
```
```markdown
```bash [npm]
npm install -D @unocss/preset-typography
```
```markdown
```bash [bun]
bun add -D @unocss/preset-typography
```
:::

::: tip
该预设已包含在 `unocss` 包中，你也可以从那里导入它：
```ts
import presetTypography from '@unocss/preset-typography'
// 或
import { presetTypography } from 'unocss'
```
:::

## 用法
```ts [uno.config.ts]
import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetWind3 // 或 presetWind4
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(), // 必需！
    presetAttributify(), // 使用 attributify 模式时必须
    presetTypography(),
  ],
})
```
::: code-group
```html [类]
<article class="text-base prose dark:prose-invert xl:text-xl">
  {{ markdown }}
  <p class="not-prose">一些文本</p>
</article>
```
（由于您没有提供需要翻译的 Markdown 文本，我无法进行翻译。请把完整的 Markdown 内容贴在下一条消息中，我会保持原有格式并翻译成中文。）
```html [属性]
<article text-base prose="~ dark:invert" xl="text-xl">
  {{ markdown }}
  <p class="not-prose">一些文本</p>
</article>
```
:::

::: warning
注意：`not-prose` 只能作为类名使用，不能作为属性。
:::

## 亮点

### 任意尺寸

使用内置的尺寸变体应用不同的排版尺寸：`prose-sm`、`prose-base`、`prose-lg`、`prose-xl` 和 `prose-2xl`。默认的 `prose` 类使用基础尺寸，你也可以用特定的尺寸工具类进行覆盖。
```html
<!-- 不同尺寸 -->
<article class="prose prose-sm">小号排版</article>
<article class="prose prose-base">基础排版（默认）</article>
<article class="prose prose-lg">大号排版</article>
<article class="prose prose-xl">特大号排版</article>
<article class="prose prose-2xl">2倍特大号排版</article>
```
你也可以将尺寸工具类与响应式变体结合使用：
```html
<!-- 响应式排版尺寸 -->
<article class="prose prose-sm md:prose-base lg:prose-lg xl:prose-xl">
  随屏幕尺寸自动缩放的响应式排版
</article>

<!-- 与其他工具类一起使用 -->
<article class="prose prose-lg prose-gray dark:prose-invert">大尺寸排版，支持颜色与深色模式</article>
```
### 任意颜色

使用 `presetWind3/4` 提供的 `prose-${colorName}` 工具类来应用任意颜色。这些颜色来自主题的 `colors` 键，建议使用从 `50` 到 `950` 的完整色阶以获得适当的渐变效果。因此，**必须**使用 `presetWind3/4`。

`prose` 的默认颜色为 `prose-gray`。prose 颜色工具类将应用于各种排版元素，如标题、链接、引用块和代码块。
```html
<!-- 不同的颜色主题 -->
<article class="prose prose-gray">灰色主题的排版</article>
<article class="prose prose-blue">蓝色主题的排版</article>
<article class="prose prose-green">绿色主题的排版</article>
<article class="prose prose-purple">紫色主题的排版</article>
```
| 自然色                                                                 | 强调色                                                    |
| ---------------------------------------------------------------------- | --------------------------------------------------------- |
| 这些具有不同的颜色调度范围，会影响全局排版的使用。                   | 这些仅改变链接颜色，不会影响其他颜色。                   |
| `prose-slate`                                                          | `prose-rose`                                              |
| `prose-slate`                                                          | `prose-red`                                               |
| `prose-gray`                                                           | `prose-orange`                                            |
| `prose-zinc`                                                           | `prose-amber`                                             |
| `prose-neutral`                                                        | `prose-yellow`                                            |
| `prose-stone`                                                          | `prose-lime`                                              |
|                                                                        | `prose-green`                                             |
|                                                                        | `prose-emerald`                                           |
|                                                                        | `prose-teal`                                              |
|                                                                        | `prose-cyan`                                              |
|                                                                        | `prose-sky`                                               |
|                                                                        | `prose-blue`                                              |
|                                                                        | `prose-indigo`                                            |
|                                                                        | `prose-violet`                                            |
|                                                                        | `prose-purple`                                            |
|                                                                        | `prose-fuchsia`                                           |
|                                                                        | `prose-pink`                                              |
|                                                                        | `prose-rose`                                              |

你可以将颜色与尺寸和响应式变体组合使用：
```html
<!-- 响应式颜色变化 -->
<article class="prose prose-gray md:prose-blue lg:prose-green">
  在不同断点处改变颜色的排版
</article>

<!-- 颜色、尺寸与深色模式 -->
<article class="prose prose-lg prose-slate dark:prose-invert">
  大尺寸、石板色并支持深色模式的排版
</article>
```
### 使用单个工具类实现深色模式

通过 `prose-invert` 应用排版深色模式（背景色需由用户自行处理）。例如，`prose dark:prose-invert` 将在深色模式下使用反色。

### 完全属于你自己的样式

不在 `prose` 范围内的元素样式保持不变，不会重置样式，就像 UnoCSS 一样。

### 用 `not` 工具类撤销样式

给元素添加 `not-prose` 即可撤销排版样式。例如，`<table class="not-prose">` 将跳过此预设对 `table` 元素的样式 **（注意：`not` 工具类只能在 class 中使用，因为它仅用于 CSS 选择器，且不会被 UnoCSS 扫描）**。

### 兼容性选项

此预设使用了一些尚未广泛支持的伪类，但你可以选择禁用它们。([#2064](https://github.com/unocss/unocss/pull/2064))

- 如果启用 `noColonNot` 或 `noColonWhere`，`not-prose` 将不可用。
- 如果启用 `noColonIs`，属性化模式的行为将不正确。

## 选项

该预设提供全面的配置选项，可自定义排版样式、颜色、大小及行为。

:::tip
传递给 `cssExtend` 的 CSS 声明将：

- **覆盖** 内置样式，若值冲突；
- **深度合并** 到内置样式，若无冲突。
:::

### selectorName

- **类型：** `string`
- **默认值：** `prose`

用于排版工具类的类名。如需撤销元素样式，使用 `not-${selectorName}`，默认为 `not-prose`。

:::tip
`not` 工具类只能在 class 中使用。
:::

### cssExtend

- **类型：** `Record<string, CSSObject> | ((theme: T) => Record<string, CSSObject>)`
- **默认值：** `undefined`

通过 CSS 声明块扩展或覆盖 CSS 选择器。可以是静态对象，也可以是接收主题并返回 CSS 选择器的函数。

### important

- **类型：** `boolean | string`
- **默认值：** `false`

控制排版工具类是否标记为 `!important`。设为 `true` 时，所有排版样式都会加上 `!important`；设为字符串时，该字符串将作为 CSS 选择器作用域。

### colorScheme

- **类型：** `TypographyColorScheme`
- **默认值：** 见下文

排版元素的颜色方案。每个键代表一个排版元素，值格式为 `[light, dark]` => `[color, invert-color]`。

**默认颜色方案：**
```json
{
  "body": [700, 300],
  "headings": [900, "white"],
  "lead": [600, 400],
  "links": [900, "white"],
  "bold": [900, "white"],
  "counters": [500, 400],
  "bullets": [300, 600],
  "hr": [200, 700],
  "quotes": [900, 100],
  "quote-borders": [200, 700],
  "captions": [500, 400],
  "kbd": [900, "white"],
  "kbd-shadows": [900, "white"],
  "code": [900, "white"],
  "pre-code": [200, 300],
  "pre-bg": [800, "rgb(0 0 0 / 50%)"],
  "th-borders": [300, 600],
  "td-borders": [200, 700]
}
```
### sizeScheme

- **类型：** `TypographySizeScheme`
- **默认值：** `undefined`

排版元素的尺寸方案。允许你为不同尺寸自定义各种排版元素的 CSS 样式。与 `cssExtend` 类似，但会对不同的文本尺寸进行细粒度的样式覆盖。

**示例：**
```json
{
  "sm": {
    "h1": { "font-size": "1.5rem" },
    "p": { "font-size": "0.875rem" }
  },
  "base": {
    "h1": { "font-size": "2rem" },
    "p": { "font-size": "1rem" }
  },
  "lg": {
    "h1": { "font-size": "2.5rem" },
    "p": { "font-size": "1.125rem" }
  }
}
```
### cssVarPrefix

- **类型：** `string`
- **默认值：** `--un-prose`

为生成的 CSS 自定义属性（CSS 变量）指定前缀。通过该选项，你可以自定义预设内部使用的 CSS 变量的命名方式。

### compatibility

- **类型：** `TypographyCompatibilityOptions`
- **默认值：** `undefined`

参见 [兼容性选项](#compatibility-options)。
:::warning
请注意，这会影响某些功能。
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
    presetAttributify(), // 如果使用 attributify 模式则必须
    presetWind3(), // 必须
    presetTypography({
      selectorName: 'markdown', // 现在可以这样使用：`markdown markdown-gray`、`not-markdown`
      // cssExtend 是一个对象，键为 CSS 选择器，值为 CSS 声明块，写法与普通 CSS 相同
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
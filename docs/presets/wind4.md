---
title: Wind4 预设
description: 用于 UnoCSS 的 Tailwind4 CSS 紧凑预设（@unocss/preset-wind4）。
outline: deep
---

# Wind4 预设

这是 UnoCSS 的 Tailwind4 CSS 紧凑预设。它兼容 PresetWind3 的所有功能，并在此基础上进行了增强。

[源码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-wind4)

::: tip
建议花一点时间阅读本文档以了解相关变化
:::

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-wind4
```

```bash [yarn]
yarn add -D @unocss/preset-wind4
```

```bash [npm]
npm install -D @unocss/preset-wind4
```

```bash [bun]
bun add -D @unocss/preset-wind4
```

:::

```ts twoslash [uno.config.ts]
import presetWind4 from '@unocss/preset-wind4'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    //  ^?
  ],
})
```

## 兼容性

如需了解浏览器支持和兼容性，请参考 [Tailwind 兼容性文档](https://tailwindcss.com/docs/compatibility)。

## 主题

`PresetWind4` 的主题与 `PresetWind3` 几乎一致，但部分主题键名进行了调整。

::: warning
切换到 PresetWind4 时，请参考下表检查您的主题键配置并做出相应调整。
:::

|                                            PresetWind3                                            |                          PresetWind4                          |
| :-----------------------------------------------------------------------------------------------: | :-----------------------------------------------------------: |
|                                           `fontFamily`                                            |                            `font`                             |
|                                            `fontSize`                                             |            移至 `text` 中的 `fontSize` 属性             |
|                                           `lineHeight`                                            |   移至 `text` 中的 `lineHeight` 属性 或使用 `leading`   |
|                                          `letterSpacing`                                          | 移至 `text` 中的 `letterSpacing` 属性 或使用 `tracking` |
|                                          `borderRadius`                                           |                           `radius`                            |
|                                             `easing`                                              |                            `ease`                             |
|                                           `breakpoints`                                           |                         `breakpoint`                          |
|                                       `verticalBreakpoints`                                       |                     `verticalBreakpoint`                      |
|                                            `boxShadow`                                            |                           `shadow`                            |
|                                                 -                                                 |                         `insetShadow`                         |
|     尺寸属性如 `width`、`height`、`maxWidth`、`maxHeight`、`minWidth`、`minHeight`      |                   统一使用 `spacing`                    |
|                                       `transitionProperty`                                        |                          `property`                           |
| `gridAutoColumn`、`gridAutoRow`、`gridColumn`、`gridRow`、`gridTemplateColumn`、`gridTemplateRow` |                               -                               |
|                                       `container.maxWidth`                                        |                     `containers.maxWidth`                     |
|                                                 -                                                 |                          `defaults`                           |

### `Theme.defaults`

`Theme.defaults` 是一个全局默认主题配置，它将应用于 `reset` 样式或作为某些规则的默认值。

以下是 `Theme.defaults` 的默认值，您可以在自己的主题配置中覆盖它们。

<details>
<summary>点击查看默认值</summary>

```ts twoslash [uno.config.ts]
import type { Theme } from '@unocss/preset-wind4/theme'

export const defaults: Theme['default'] = {
  transition: {
    duration: '150ms',
    timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  font: {
    family: 'var(--font-sans)',
    featureSettings: 'var(--font-sans--font-feature-settings)',
    variationSettings: 'var(--font-sans--font-variation-settings)',
  },
  monoFont: {
    family: 'var(--font-mono)',
    featureSettings: 'var(--font-mono--font-feature-settings)',
    variationSettings: 'var(--font-mono--font-variation-settings)',
  },
}
```

</details>

## 选项

PresetWind4 的基本配置与 [PresetWind3](/presets/wind3#options) 类似，但有以下重要更改。

### 预加载样式（Preflights）

我们在 `PresetWind4` 中新增了 `preflights` 配置选项，用于控制是否启用预设样式。

#### 重置样式（Reset）

在 PresetWind4 中，我们与 Tailwind4 对齐了重置样式并将其集成在内部。您无需再安装额外的 CSS 重置包，如 `@unocss/reset` 或 `normalize.css`。

```ts [main.ts]
import '@unocss/reset/tailwind.css' // [!code --]
import '@unocss/reset/tailwind-compat.css' // [!code --]
```

只需通过开关控制是否启用重置样式：

```ts twoslash [uno.config.ts]
import presetWind4 from '@unocss/preset-wind4'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: { // [!code ++]
        reset: true, // [!code ++]
      } // [!code ++]
    }),
  ],
})
```

#### 主题

选择如何生成主题的 CSS 变量。

##### 模式

安装了 `presetWind4` 的 UnoCSS 引擎会在解析工具类时自动收集主题依赖，并在最后生成 CSS 变量。

- `true`: 完全生成主题键。
- `false`: 禁用主题键。（不推荐 ⚠️）
- `'on-demand'`: 仅在使用时生成主题键。-> ✅ **（默认）**

```ts twoslash [uno.config.ts]
import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: { // [!code ++]
        theme: true, // [!code ++]
      }, // [!code ++]
    }),
  ],
})
```

##### 处理器

您可以进一步控制主题变量的输出。例如，如果您希望将主题变量中的 `rem` 转换为 `px`，我们提供了 `createRemToPxProcessor` 函数来处理您的主题变量。

```ts twoslash [uno.config.ts]
import { createRemToPxProcessor } from '@unocss/preset-wind4/utils' // [!code ++]
import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: { // [!code ++]
        theme: { // [!code ++]
          mode: 'on-demand', // 默认为 'on-demand' // [!code ++]
          process: createRemToPxProcessor(), // [!code ++]
        } // [!code ++]
      }, // [!code ++]
    }),
  ],
})
```

顺便说一句，如果您想使用 `presetRemToPx` 预设来将 `rem` 转换为 `px`，则无需再单独导入该预设，因为 `presetWind4` 已在内部提供了该功能。

```ts twoslash [uno.config.ts]
import { createRemToPxProcessor } from '@unocss/preset-wind4/utils' // [!code ++]
import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: { // [!code ++]
        theme: { // [!code ++]
          process: createRemToPxProcessor(), // [!code ++]
        } // [!code ++]
      }, // [!code ++]
    }),
  ],
  postprocess: [createRemToPxProcessor()], // [!code ++]
})
```

## 生成的 CSS

在 PresetWind4 的输出中新增了三个图层：`base`、`theme` 和 `properties`。

|  图层名称  |              描述              | order |
| :----------: | :-----------------------------------: | :---: |
| `properties` | 由 `@property` 定义的 CSS 属性 | -200  |
|   `theme`    |      与主题相关的 CSS 变量      | -150  |
|    `base`    |      基础预加载/重置样式      | -100  |

### `properties` 图层

我们在许多规则中使用 `@property` 来定义 CSS 属性，以实现更好的性能和更小的体积。

例如，常用的工具类如 `text-op-xx`、`bg-op-xx` 等。

```css
@property --un-text-opacity {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 100%;
}
```

### `theme` 图层

我们将与主题相关的 CSS 变量放在 `theme` 图层中，以便于您直接覆盖和使用。
它可以是完整生成，也可以是按需生成。始终来自您的主题配置。

::: info
生成的键名可能与 Tailwind4 不完全相同。我们尽量避免对主题键名进行重大更改，以尊重从 `presetWind3` 迁移的用户。
您也可以在 [Preflights Theme Process](#process) 中自定义输出。
:::

```css
:root,
:host {
  --spacing: 0.25rem;
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  --colors-black: #000;
  --colors-white: #fff;
  /* ... */
}
```

## 与其他预设的兼容性

`PresetWind4` 在功能上增强并兼容 `PresetWind3`。由于其他包最初是为 `PresetWind3` 开发的，在一起使用时可能会出现一些问题。已知问题包括：

### presetRemToPx

在 `PresetWind4` 中不再需要 `presetRemToPx`，因为它已内置。您可以从配置中移除它。

请参考 [process](#process) 选项。

### presetLegacyCompat

在 `presetWind4` 中，我们使用 `oklch` 颜色模型来支持更好的颜色对比度和颜色感知。因此，它与 `presetLegacyCompat` 不兼容，**不建议一起使用**。

请参考 [兼容性](#compatibility) 部分以获取更多信息。
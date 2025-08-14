---
title: 网络字体预设
description: UnoCSS 对网络字体的支持（@unocss/preset-web-fonts）。
outline: deep
---

# 网络字体预设

只需提供字体名称，即可轻松使用来自 [Google Fonts](https://fonts.google.com/) 和 [FontShare](https://www.fontshare.com/) 的网络字体。

查看 [所有支持的供应商](#providers)。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-web-fonts)

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-web-fonts
```

```bash [yarn]
yarn add -D @unocss/preset-web-fonts
```

```bash [npm]
npm install -D @unocss/preset-web-fonts
```

```bash [bun]
bun add -D @unocss/preset-web-fonts
```

:::

```ts [uno.config.ts]
import presetWebFonts from '@unocss/preset-web-fonts'
import presetWind3 from '@unocss/preset-wind3'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetWebFonts({ /* 配置项 */ }),
  ],
})
```

::: tip
此预设已包含在 `unocss` 包中，也可以从那里导入：

```ts
import { presetWebFonts } from 'unocss'
```

:::

## 供应商

当前支持的供应商：

- `none` - 不做任何处理，将字体视为系统字体
- `google` - [Google Fonts](https://fonts.google.com/)
- `bunny` - [Privacy-Friendly Google Fonts](https://fonts.bunny.net/)
- `fontshare` - [ITF 提供的高质量字体服务](https://www.fontshare.com/)
- `fontsource` - [以 NPM 包形式提供的开源字体](https://fontsource.org/)
- `coollabs` - [Google Fonts 的隐私友好替代方案](https://fonts.coollabs.io/)

::: info
欢迎提交 PR 添加更多供应商。🙌
:::

### 自定义获取函数

使用你自己的函数来获取字体资源。

```ts [uno.config.ts]
import presetWebFonts from '@unocss/preset-web-fonts'
import presetWind3 from '@unocss/preset-wind3'
import axios from 'axios'
import ProxyAgent from 'proxy-agent'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetWebFonts({
      // 使用带有 HTTPS 代理的 axios
      customFetch: (url: string) => axios.get(url, { httpsAgent: new ProxyAgent('https://localhost:7890') }).then(it => it.data),
      provider: 'google',
      fonts: {
        sans: 'Roboto',
        mono: ['Fira Code', 'Fira Mono:400,700'],
      },
    }),
  ],
})
```

## 配置选项

### provider

- **类型：** `WebFontsProviders`
- **默认值：** `google`

网络字体的服务提供商。

```ts
type WebFontsProviders = 'google' | 'bunny' | 'fontshare' | 'fontsource' | 'coollabs' | 'none'
```

### fonts

- **类型：** `Record<string, WebFontMeta | string | (WebFontMeta | string)[]>`

字体配置。更多细节请参见 [示例](#示例)。

```ts
interface WebFontMeta {
  name: string
  weights?: (string | number)[]
  italic?: boolean
  /**
   * 覆盖提供商配置
   * @默认值 与根配置一致
   */
  provider?: WebFontsProviders
}
```

### extendTheme

- **类型：** `boolean`
- **默认值：** `true`

扩展主题对象。

### themeKey

- **类型：** `string`
- **默认值：** `fontFamily`

主题对象中的键名。

### inlineImports

- **类型：** `boolean`
- **默认值：** `true`

内联 CSS 的 `@import()`。

### customFetch

- **类型：** `(url: string) => Promise<string>`
- **默认值：** `undefined`

使用自定义函数获取字体资源。参见 [自定义获取函数](#custom-fetch-function)。

## 示例

```ts
presetWebFonts({
  provider: 'google', // 默认提供商
  fonts: {
    // 这些配置会扩展默认主题
    sans: 'Roboto',
    mono: ['Fira Code', 'Fira Mono:400,700'],
    // 自定义字体
    lobster: 'Lobster',
    lato: [
      {
        name: 'Lato',
        weights: ['400', '700'],
        italic: true,
      },
      {
        name: 'sans-serif',
        provider: 'none',
      },
    ],
  },
})
```

以下 CSS 将自动生成：

<!-- eslint-skip -->

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto&family=Fira+Code&family=Fira+Mono:wght@400;700&family=Lobster&family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap');

/* layer: default */
.font-lato {
  font-family: "Lato", sans-serif;
}
.font-lobster {
  font-family: "Lobster";
}
.font-mono {
  font-family: "Fira Code", "Fira Mono", ui-monospace, SFMono-Regular, Menlo,
    Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
.font-sans {
  font-family: "Roboto", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
}
```

## 本地提供字体

默认情况下，此预设将从提供商的 CDN 获取字体。如果你想从本地提供字体，可以使用 `@unocss/preset-web-fonts/local` 中的处理器下载字体并从你自己的服务器提供。

```ts
import presetWebFonts from '@unocss/preset-web-fonts'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWebFonts({
      provider: 'none',
      fonts: {
        sans: 'Roboto',
        mono: 'Fira Code',
      },
      // 下载字体并从本地提供
      processors: createLocalFontProcessor({
        // 字体缓存目录
        cacheDir: 'node_modules/.cache/unocss/fonts',

        // 字体资源保存目录
        fontAssetsDir: 'public/assets/fonts',

        // 客户端访问字体的基准 URL
        fontServeBaseUrl: '/assets/fonts'
      })
    }),
  ],
})
```

这会将字体资源下载到 `public/assets/fonts` 并通过 `/assets/fonts` 提供给客户端。在这样做时，请确保字体的许可证允许你重新分发，此工具不承担任何法律问题。

::: info

此功能仅适用于 Node.js，无法在浏览器中运行。

:::
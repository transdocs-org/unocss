---
title: Web fonts 预设
description: UnoCSS 的 Web 字体支持（@unocss/preset-web-fonts）。
outline: deep
---

# Web Fonts 预设

只需提供字体名称，即可使用来自 [Google Fonts](https://fonts.google.com/) 和 [FontShare](https://www.fontshare.com/) 的 Web 字体。

查看[所有支持的提供商](#providers)。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-web-fonts)

## 安装

::: code-group
```bash [pnpm]
pnpm add -D @unocss/preset-web-fonts
```
请提供需要翻译的Markdown文本，我将立即为您翻译成中文并保持原有格式不变。
```bash [yarn]
yarn add -D @unocss/preset-web-fonts
```
```markdown
```bash [npm]
npm install -D @unocss/preset-web-fonts
```
（由于您未提供需要翻译的文本，因此这里没有任何内容可供翻译。请提供需要翻译的Markdown文本，我将为您翻译成中文并保持原有格式不变。）
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
此预设已包含在 `unocss` 包中，你也可以从该包导入：
```ts
import { presetWebFonts } from 'unocss'
```
:::

## 提供商

当前支持的提供商：

- `none` - 不执行任何操作，将字体视为系统字体
- `google` - [Google Fonts](https://fonts.google.com/)
- `bunny` - [隐私友好的 Google Fonts](https://fonts.bunny.net/)
- `fontshare` - [ITF 提供的高质量字体服务](https://www.fontshare.com/)
- `fontsource` - [以整洁的 NPM 包形式自托管开源字体](https://fontsource.org/)
- `coollabs` - [Google Fonts 的隐私友好型替代品](https://fonts.coollabs.io/)

::: info
欢迎提交 PR 以添加更多提供商。🙌
:::

### 自定义 fetch 函数

使用你自己的函数来获取字体源。
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
      // 使用 axios 并配置 https 代理
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
## 选项

### provider

- **类型：** `WebFontsProviders`
- **默认值：** `google`

网络字体的提供商服务。
```ts
type WebFontsProviders = 'google' | 'bunny' | 'fontshare' | 'fontsource' | 'coollabs' | 'none'
```
### 字体

- **类型：** `Record<string, WebFontMeta | string | (WebFontMeta | string)[]>`

字体配置。更多细节请参见[示例](#example)。
```ts
interface WebFontMeta {
  name: string
  weights?: (string | number)[]
  italic?: boolean
  /**
   * 覆盖默认的字体提供商
   * @default <matches root config>
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

主题对象的键名。

### inlineImports

- **类型：** `boolean`
- **默认值：** `true`

内联 CSS `@import()`。

### customFetch

- **类型：** `(url: string) => Promise<string>`
- **默认值：** `undefined`

使用自定义函数获取字体源。参见 [自定义 fetch 函数](#custom-fetch-function)。

## 示例
```ts
presetWebFonts({
  provider: 'google', // 默认提供商
  fonts: {
    // 这些将扩展默认主题
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

/* 层：默认 */
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
## 本地托管字体

默认情况下，预设会从字体提供商的 CDN 获取字体。如果你想在本地托管字体，可以下载字体并使用 `@unocss/preset-web-fonts/local` 中的处理器，将它们从你自己的服务器提供。
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
      // 这将下载字体并在本地提供
      processors: createLocalFontProcessor({
        // 缓存字体的目录
        cacheDir: 'node_modules/.cache/unocss/fonts',

        // 保存字体资源的目录
        fontAssetsDir: 'public/assets/fonts',

        // 从客户端提供字体的基础 URL
        fontServeBaseUrl: '/assets/fonts',

        // 自定义 fetch 函数用于下载字体
        fetch: async url => axios.get(url)
      })
    }),
  ],
})
```
这会将字体资源下载到 `public/assets/fonts`，并在客户端通过 `/assets/fonts` 提供。执行此操作时，请确保字体的许可证允许你进行再分发，该工具不对任何法律问题负责。

::: info

此功能仅适用于 Node.js，在浏览器中无法使用。

:::
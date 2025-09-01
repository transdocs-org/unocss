---
title: UnoCSS Vite 插件
description: Vite 插件 for UnoCSS (@unocss/vite)。
outline: deep
---

<script setup lang="ts">
import { examples } from '../.vitepress/content'

const playgrounds = examples.reduce((acc, cur) => {
  acc[cur.name] = cur
  return acc
}, {})
</script>

# Vite 插件

Vite 插件随 `unocss` 包一起提供。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D unocss
```

```bash [yarn]
yarn add -D unocss
```

```bash [npm]
npm install -D unocss
```

```bash [bun]
bun add -D unocss
```

:::

安装插件：

```ts [vite.config.ts]
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
  ],
})
```

创建一个 `uno.config.ts` 文件：

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS 选项
})
```

在主入口文件中添加 `virtual:uno.css`：

```ts [main.ts]
import 'virtual:uno.css'
```

## 模式

Vite 插件提供了一组模式，启用不同的行为。

### `global` (默认)

这是插件的默认模式：在此模式下，你需要在入口点添加 `uno.css` 的导入。

此模式为 `build` 和带有 `HMR` 支持的 `dev` 启用一组 Vite 插件。

生成的 `css` 将作为全局样式表注入到 `index.html` 中。

### `vue-scoped`

此模式会将生成的 CSS 注入到 Vue SFC 的 `<style scoped>` 中以实现隔离。

### `svelte-scoped`

`svelte-scoped` 模式已移至其独立包，请参阅 [@unocss/svelte-scoped/vite](/integrations/svelte-scoped)。

### `shadow-dom`

由于 `Web Components` 使用 `Shadow DOM`，无法直接从全局样式表中样式化内容（除非使用 `CSS 自定义属性`，它们可以穿透 `Shadow DOM`），你需要将插件生成的 CSS 内联到 `Shadow DOM` 样式中。

要内联生成的 CSS，只需将插件模式配置为 `shadow-dom` 并在每个 Web 组件的样式 CSS 块中包含 `@unocss-placeholder` 魔法占位符。如果你在 Vue SFC 中定义 Web 组件并希望与 UnoCSS 一起定义自定义样式，可以将占位符包裹在 CSS 注释中以避免 IDE 中的语法错误。

### `per-module` (实验性)

此模式将为每个模块生成一个 CSS 样式表，可作用域。

### `dist-chunk` (实验性)

此模式将在构建时为每个代码块生成一个 CSS 样式表，非常适合 MPA。

## 在 DevTools 中编辑类

由于 "按需" 的限制，DevTools 无法知道你尚未在源代码中使用的内容。因此如果你想通过直接在 DevTools 中更改类来尝试效果，只需在主入口文件中添加以下代码。

```ts
import 'uno.css'
import 'virtual:unocss-devtools'
```

::: warning
请谨慎使用，在底层我们使用 [`MutationObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) 来检测类的变化。这意味着不仅你的手动更改，还包括你的脚本所做的更改都会被检测并包含在样式表中。当你基于脚本标签中的某些逻辑添加动态类时，这可能导致开发环境和生产构建之间的某些不一致。如果可能的话，我们建议将你的动态部分添加到 [safelist](https://github.com/unocss/unocss/issues/511) 或为你的生产构建设置 UI 回归测试。
:::

## 框架

某些 UI/App 框架有一些需要注意的地方，必须进行修复才能正常工作。如果你使用了以下框架之一，请应用相应的建议。

### VanillaJS / TypeScript

当使用 VanillaJS 或 TypeScript 时，你需要添加 `js` 和 `ts` 文件扩展名，以允许 UnoCSS 读取和解析内容，默认情况下 `js` 和 `ts` 文件是被排除的，请查看 [从构建工具管道中提取](/guide/extracting#extracting-from-build-tools-pipeline) 部分。

### React

如果你使用 `@vitejs/plugin-react`：

```ts [vite.config.ts]
import React from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    React(),
    UnoCSS(),
  ],
}
```

如果你使用 `@unocss/preset-attributify`，你应该从 `build` 脚本中移除 `tsc`。

如果你将 `@vitejs/plugin-react` 与 `@unocss/preset-attributify` 一起使用，必须将插件添加到 `@vitejs/plugin-react` 之前。

```ts [vite.config.ts]
import React from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS(),
    React(),
  ],
}
```

你在 [examples/vite-react](https://github.com/unocss/unocss/tree/main/examples/vite-react) 目录中有一个使用这两个插件的 `React` 示例项目，请查看 `package.json` 中的脚本和其 Vite 配置文件。

<ContentExample :item="playgrounds['vite-react']"  class="Link" integrations />

### Preact

如果你使用 `@preact/preset-vite`：

```ts [vite.config.ts]
import Preact from '@preact/preset-vite'
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS(),
    Preact(),
  ],
}
```

或者如果你使用 `@prefresh/vite`：

```ts [vite.config.ts]
import Prefresh from '@prefresh/vite'
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS(),
    Prefresh(),
  ],
}
```

如果你使用 `@unocss/preset-attributify`，你应该从 `build` 脚本中移除 `tsc`。

你在 [examples/vite-preact](https://github.com/unocss/unocss/tree/main/examples/vite-preact) 目录中有一个使用这两个插件的 `Preact` 示例项目，请查看 `package.json` 中的脚本和其 Vite 配置文件。

<ContentExample :item="playgrounds['vite-preact']"  class="Link" integrations />

### Svelte

你必须将插件添加到 `@sveltejs/vite-plugin-svelte` 之前。

要支持 `class:foo` 和 `class:foo={bar}`，请添加插件并在 `extractors` 选项中配置 `extractorSvelte`。

你可以使用带有 `class:` 的简单规则，例如 `class:bg-red-500={foo}`，或使用 `shortcuts` 来包含多个规则，请查看下方链接示例项目中的 `src/App.svelte`。

```ts [vite.config.ts]
import { svelte } from '@sveltejs/vite-plugin-svelte'
import extractorSvelte from '@unocss/extractor-svelte'
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS({
      extractors: [
        extractorSvelte(),
      ],
      /* 更多选项 */
    }),
    svelte(),
  ],
}
```

<ContentExample :item="playgrounds['vite-svelte']"  class="Link" integrations />

### Sveltekit

要支持 `class:foo` 和 `class:foo={bar}`，请添加插件并在 `extractors` 选项中配置 `extractorSvelte`。

你可以使用带有 `class:` 的简单规则，例如 `class:bg-red-500={foo}`，或使用 `shortcuts` 来包含多个规则，请查看下方链接示例项目中的 `src/routes/+layout.svelte`。

```ts [vite.config.ts]
import { sveltekit } from '@sveltejs/kit/vite'
import extractorSvelte from '@unocss/extractor-svelte'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS({
      extractors: [
        extractorSvelte(),
      ],
      /* 更多选项 */
    }),
    sveltekit(),
  ],
})
```

<ContentExample :item="playgrounds['sveltekit']"  class="Link mb-4" integrations />

<ContentExample :item="playgrounds['sveltekit-preprocess']"  class="Link mb-4" integrations />

<ContentExample :item="playgrounds['sveltekit-scoped']"  class="Link" integrations />

### Web Components

要使用 Web Components，你需要在插件中启用 `shadow-dom` 模式。

不要忘记移除对 `uno.css` 的导入，因为 `shadow-dom` 模式不会暴露它，应用程序将无法工作。

```ts [vite.config.ts]
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS({
      mode: 'shadow-dom',
      /* 更多选项 */
    }),
  ],
}
```

在每个 `web component` 上只需在其样式 CSS 块中添加 `@unocss-placeholder`：

```ts
const template = document.createElement('template')
template.innerHTML = `
<style>
:host {...}
@unocss-placeholder
</style>
<div class="m-1em">
...
</div>
`
```

如果你使用 [Lit](https://lit.dev/)：

```ts
@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    :host {...}
    @unocss-placeholder
  `
  // ...
}
```

你在 [examples/vite-lit](https://github.com/unocss/unocss/tree/main/examples/vite-lit) 目录中有一个 `Web Components` 示例项目。

#### `::part` 内置支持

你可以使用 `::part`，因为插件通过 `shortcuts` 和 `preset-mini` 中的 `part-[<part-name>]:<rule|shortcut>` 规则支持它，例如使用简单的规则如 `part-[<part-name>]:bg-green-500` 或使用某个 `shortcut`：请查看下方链接示例项目中的 `src/my-element.ts`。

`part-[<part-name>]:<rule|shortcut>` 只能与使用 `shadow-dom` 模式的此插件一起使用。

插件使用 `nth-of-type` 来避免同一 Web 组件中的多个部分或不同 Web 组件中的相同部分发生冲突，你无需担心，插件会为你处理。

```ts [vite.config.ts]
import UnoCSS from 'unocss/vite'

export default {
  plugins: [
    UnoCSS({
      mode: 'shadow-dom',
      shortcuts: [
        { 'cool-blue': 'bg-blue-500 text-white' },
        { 'cool-green': 'bg-green-500 text-black' },
      ],
      /* 更多选项 */
    }),
  ],
}
```

然后在你的 Web 组件中：

```ts
// my-container-wc.ts
const template = document.createElement('template')
template.innerHTML = `
<style>
@unocss-placeholder
</style>
<my-wc-with-parts class="part-[cool-part]:cool-blue part-[another-cool-part]:cool-green">...</my-wc-with-parts>
`
```

```ts
// my-wc-with-parts.ts
const template = document.createElement('template')
template.innerHTML = `
<style>
@unocss-placeholder
</style>
<div>
  <div part="cool-part">...</div>
  <div part="another-cool-part">...</div>
</div>
`
```

<ContentExample :item="playgrounds['vite-lit']"  class="Link" integrations />

### Solid

你需要在 UnoCSS 插件之后添加 `vite-plugin-solid` 插件。

```ts [vite.config.ts]
import UnoCSS from 'unocss/vite'
import solidPlugin from 'vite-plugin-solid'

export default {
  plugins: [
    UnoCSS({
      /* 选项 */
    }),
    solidPlugin(),
  ],
}
```

<ContentExample :item="playgrounds['vite-solid']"  class="Link" integrations />

### Elm

你需要在 UnoCSS 插件之前添加 `vite-plugin-elm` 插件。

```ts [vite.config.ts]
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import Elm from 'vite-plugin-elm'

export default defineConfig({
  plugins: [
    Elm(),
    UnoCSS(),
  ],
})
```

<ContentExample :item="playgrounds['vite-elm']"  class="Link" integrations />

## Legacy

如果 `@vitejs/plugin-legacy` 使用了 `renderModernChunks: false`，你需要将其添加到 `unocss` 选项中。

```ts
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { presetWind3 } from 'unocss'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [presetWind3()],
      legacy: {
        renderModernChunks: false,
      },
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
      renderModernChunks: false,
    }),
  ],
})
```

## 许可证

- MIT License &copy; 2021-PRESENT [Anthony Fu](https://github.com/antfu)
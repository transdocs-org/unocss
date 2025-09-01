---
title: 图标预设
description: 为 UnoCSS 使用纯 CSS 的任意图标 (@unocss/preset-icons)。
outline: deep
---

<script setup>
const toggleDark = () => {
  document.querySelector('.VPSwitchAppearance')?.click()
}
</script>

# 图标预设

为 UnoCSS 使用纯 CSS 的任意图标。

[源代码](https://github.com/unocss/unocss/tree/main/packages-presets/preset-icons)

::: tip
推荐阅读：[纯 CSS 中的图标](https://antfu.me/posts/icons-in-pure-css)
:::

使用图标时请遵循以下约定：

- `<前缀><图标集>-<图标>`
- `<前缀><图标集>:<图标>`

例如：

```html
<!-- 来自 Phosphor 图标的基础锚图标 -->
<div class="i-ph-anchor-simple-thin" />
<!-- 来自 Material Design Icons 的橙色闹钟 -->
<div class="i-mdi-alarm text-orange-400" />
<!-- 大号 Vue 标志 -->
<div class="i-logos-vue text-3xl" />
<!-- 亮模式下为太阳，暗模式下为月亮，来自 Carbon -->
<button class="i-carbon-sun dark:i-carbon-moon" />
<!-- 笑脸 Twemoji，悬停时变为流泪 -->
<div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
```

<div class="w-full flex items-center justify-center gap-x-4 text-4xl p-2 mt-4">
  <div class="i-ph:anchor-simple-thin" />
  <div class="i-mdi:alarm text-orange-400 hover:text-teal-400" />
  <div class="w-2em h-2em i-logos:vue transform transition-800 hover:rotate-180" />
  <button class="i-carbon:sun dark:i-carbon:moon !w-2em !h-2em" @click="toggleDark()" title="切换暗模式"/>
  <div class="i-twemoji:grinning-face-with-smiling-eyes hover:i-twemoji:face-with-tears-of-joy" />
  <div class="text-base my-auto flex"><div class="i-carbon:arrow-left my-auto mr-1" /> 悬停它</div>
</div>

查看 [所有可用图标](https://icones.js.org/)。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/preset-icons @iconify-json/[你想要的图标集]
```

```bash [yarn]
yarn add -D @unocss/preset-icons @iconify-json/[你想要的图标集]
```

```bash [npm]
npm install -D @unocss/preset-icons @iconify-json/[你想要的图标集]
```

```bash [bun]
bun add -D @unocss/preset-icons @iconify-json/[你想要的图标集]
```

:::

我们使用 [Iconify](https://iconify.design) 作为图标数据源。你需要在 `devDependencies` 中安装对应的图标集，遵循 `@iconify-json/*` 的命名规则。例如，`@iconify-json/mdi` 对应 [Material Design Icons](https://materialdesignicons.com/)，`@iconify-json/tabler` 对应 [Tabler](https://tabler-icons.io/)。你可以在 [Icônes](https://icones.js.org/) 或 [Iconify](https://icon-sets.iconify.design/) 查看所有可用图标集。

```ts [uno.config.ts]
import presetIcons from '@unocss/preset-icons'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({ /* 选项 */ }),
    // ...其他预设
  ],
})
```

::: tip
该预设包含在 `unocss` 包中，你也可以从那里导入它：

```ts
import { presetIcons } from 'unocss'
```

:::

::: info
你也可以单独使用该预设作为现有 UI 框架的补充以获得纯 CSS 图标！
:::

如果你希望一次性安装 Iconify 上所有可用的图标集（约 130MB）：

::: code-group

```bash [pnpm]
pnpm add -D @iconify/json
```

```bash [yarn]
yarn add -D @iconify/json
```

```bash [npm]
npm install -D @iconify/json
```

```bash [bun]
bun add -D @iconify/json
```

:::

### 额外属性

你可以提供额外的 CSS 属性来控制图标的默认行为。以下示例使图标默认以内联块显示：

```ts
presetIcons({
  extraProperties: {
    'display': 'inline-block',
    'vertical-align': 'middle',
    // ...
  },
})
```

## 模式覆盖

默认情况下，此预设会根据每个图标的特性自动选择渲染模式。你可以在 [这篇博客](https://antfu.me/posts/icons-in-pure-css) 中了解更多。在某些情况下，你可能希望显式设置每个图标的渲染模式。

- `?bg` 表示 `background-img` - 将图标渲染为背景图像
- `?mask` 表示 `mask` - 将图标渲染为遮罩图像

例如，`vscode-icons:file-type-light-pnpm` 是一个带有颜色的图标（SVG 不包含 `currentColor`），它将被渲染为背景图像。使用 `vscode-icons:file-type-light-pnpm?mask` 可以将其渲染为遮罩图像并忽略其颜色。

```html
<div class="w-full flex items-center justify-center gap-x-4 text-4xl p-2 mt-4">
  <div class="i-vscode-icons:file-type-light-pnpm" />
  <div class="i-vscode-icons:file-type-light-pnpm?mask text-red-300" />
</div>
```

<div class="w-full flex items-center justify-center gap-x-4 text-4xl p-2 mt-4">
  <div class="i-vscode-icons:file-type-light-pnpm" />
  <div class="i-vscode-icons:file-type-light-pnpm?mask text-red-300" />
</div>

## 配置图标集和图标解析器

你可以通过 `@iconify-json/[你想要的图标集]`、`@iconify/json` 或在 `UnoCSS` 配置中使用 `collections` 选项提供自定义图标集。

### 浏览器

加载 `iconify` 图标集时应使用 `@iconify-json/[你想要的图标集]` 而不是 `@iconify/json`，因为 `json` 文件体积太大。

#### 构建工具

使用构建工具时，你可以使用 `动态导入` 提供图标集，这样它们将作为异步 chunk 被打包并在需要时加载。

```ts
import presetIcons from '@unocss/preset-icons/browser'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
        logos: () => import('@iconify-json/logos/icons.json').then(i => i.default),
      }
    })
  ]
})
```

#### CDN

如果你希望从 CDN 加载，可以自 `v0.32.10` 起指定 `cdn` 选项。我们推荐 [esm.sh](https://esm.sh/) 作为 CDN 提供商。

```ts
presetIcons({
  cdn: 'https://esm.sh/'
})
```

#### 自定义

你也可以使用 [CustomIconLoader](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L17) 或 [InlineCollection](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L86) 提供自己的自定义图标集，例如使用 `InlineCollection`：

```ts
presetIcons({
  collections: {
    custom: {
      circle: '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"></circle></svg>',
      /* ... */
    },
    carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default as any),
    /* ... */
  }
})
```

然后，你可以在 HTML 中使用它：`<span class="i-custom:circle"></span>`

### Node.js

在 `Node.js` 环境中，预设会自动搜索已安装的 iconify 数据集，因此无需注册 `iconify` 图标集。

你也可以使用 [CustomIconLoader](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L24) 或 [InlineCollection](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L100) 提供自己的自定义图标集。

#### FileSystemIconLoader

此外，你还可以使用 [FileSystemIconLoader](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/node-loaders.ts#L9) 从文件系统加载自定义图标。你需要安装 `@iconify/utils` 包作为 `dev dependency`。

```ts [unocss.config.ts]
import fs from 'node:fs/promises'
// 加载器辅助工具
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        // 键作为图标集名称
        'my-icons': {
          account: '<svg><!-- ... --></svg>',
          // 懒加载你的自定义图标
          settings: () => fs.readFile('./path/to/my-icon.svg', 'utf-8'),
          /* ... */
        },
        'my-other-icons': async (iconName) => {
          // 你的自定义加载器，可自由实现
          // 例如，从远程服务器获取：
          return await fetch(`https://example.com/icons/${iconName}.svg`).then(res => res.text())
        },
        // 从文件系统加载图标的辅助工具
        // `./assets/icons` 下 `.svg` 扩展名的文件将按文件名加载
        // 你也可以提供一个转换回调来修改每个图标（可选）
        'my-yet-other-icons': FileSystemIconLoader(
          './assets/icons',
          svg => svg.replace(/#fff/, 'currentColor')
        )
      }
    })
  ]
})
```

#### ExternalPackageIconLoader

从 `@iconify/utils v2.1.20` 开始，你可以使用新的 [createExternalPackageIconLoader](https://github.com/iconify/iconify/blob/main/packages/utils/src/loader/external-pkg.ts#L13) 辅助函数加载其他包中的图标。

::: warning 警告
外部包必须包含 `icons.json` 文件，其中包含以 `IconifyJSON` 格式编写的 `icons` 数据，可以通过 Iconify Tools 导出。更多详情请查看 [将图标集导出为 JSON 包](https://iconify.design/docs/libraries/tools/export/json-package.html)。
:::

例如，你可以使用 `an-awesome-collection` 或 `@my-awesome-collections/some-collection` 加载你的自定义或第三方图标：

```ts [unocss.config.ts]
import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      collections: createExternalPackageIconLoader('an-awesome-collection')
    })
  ]
})
```

你也可以将它与其他自定义图标加载器结合使用，例如：

```ts [unocss.config.ts]
import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { defineConfig, presetIcons } from 'unocss'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        ...createExternalPackageIconLoader('other-awesome-collection'),
        ...createExternalPackageIconLoader('@my-awesome-collections/some-collection'),
        ...createExternalPackageIconLoader('@my-awesome-collections/some-other-collection'),
        'my-yet-other-icons': FileSystemIconLoader(
          './assets/icons',
          svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')
        )
      }
    })
  ]
})
```

## 图标自定义

你可以使用 `customizations` 配置选项来自定义所有图标。

可用的自定义函数：

- `transform`: 转换原始 `svg`，仅在使用 `custom` 图标集时应用（`iconify` 图标集除外）。
- `customize`: 修改默认图标自定义值。
- `iconCustomizer`: 修改默认图标自定义值。

对于每个加载的图标，自定义将按以下顺序应用：

- 如果使用自定义图标集且提供了 `transform`，则对原始 `svg` 应用 `transform`
- 如果提供了 `customize`，则对默认自定义值应用 `customize`
- 如果提供了 `iconCustomizer`，则对 `customize` 自定义值应用 `iconCustomizer`

### 全局自定义图标转换

加载自定义图标时，你可以对其进行转换，例如添加 `fill` 属性并设置为 `currentColor`：

```ts
presetIcons({
  customizations: {
    transform(svg) {
      return svg.replace(/#fff/, 'currentColor')
    }
  }
})
```

从 `0.30.8` 版本开始，`transform` 会提供 `collection` 和 `icon` 名称：

```ts
presetIcons({
  customizations: {
    transform(svg, collection, icon) {
      // 不对这个图标集的这个图标应用 fill
      if (collection === 'custom' && icon === 'my-icon')
        return svg
      return svg.replace(/#fff/, 'currentColor')
    }
  }
})
```

### 全局图标自定义

加载任何图标时，你可以为所有图标自定义通用属性，例如统一设置大小：

```ts
presetIcons({
  customizations: {
    customize(props) {
      props.width = '2em'
      props.height = '2em'
      return props
    }
  }
})
```

### 图标/图标集自定义

你可以使用 `iconCustomizer` 配置选项自定义每个图标。

`iconCustomizer` 会覆盖配置。

`iconCustomizer` 会应用到所有图标集，即对来自 `custom` 加载器、`custom collections` 或 `@iconify` 的每个图标应用。

例如，你可以配置 `iconCustomizer` 来更改某个图标集的所有图标或某个特定图标：

```ts
presetIcons({
  customizations: {
    iconCustomizer(collection, icon, props) {
      // 自定义该图标集的所有图标
      if (collection === 'my-other-icons') {
        props.width = '4em'
        props.height = '4em'
      }
      // 自定义该图标集的某个图标
      if (collection === 'my-icons' && icon === 'account') {
        props.width = '6em'
        props.height = '6em'
      }
      // 自定义该 @iconify 图标集的某个图标
      if (collection === 'mdi' && icon === 'account') {
        props.width = '2em'
        props.height = '2em'
      }
    }
  }
})
```

## 指令

你可以在 CSS 中使用 `icon()` 指令来获取图标的元数据。

```css
.icon {
  background-image: icon('i-carbon-sun');
}
```

::: warning
`icon()` 依赖于 `@unocss/preset-icons` 并会使用其配置，确保你已添加此预设。
:::

关于 `icon()` 指令的更多信息，请查看 [指令](/transformers/directives#icon)。

## 选项

### scale

- 类型：`number`
- 默认值：`1`

相对于当前字体大小（1em）的比例。

### mode

- 类型：`'mask' | 'bg' | 'auto'`
- 默认值：`'auto'`
- 参见：https://antfu.me/posts/icons-in-pure-css

生成 CSS 图标的模式。

::: tip

- `mask` - 使用背景颜色和 `mask` 属性表示单色图标
- `bg` - 使用背景图像表示图标，颜色是静态的
- `auto` - 根据图标样式智能选择 `mask` 或 `bg` 模式

:::

### prefix

- 类型：`string | string[]`
- 默认值：`'i-'`

匹配图标规则的类前缀。

### extraProperties

- 类型：`Record<string, string>`
- 默认值：`{}`

应用于生成的 CSS 的额外 CSS 属性。

### warn

- 类型：`boolean`
- 默认值：`false`

当匹配到缺失的图标时发出警告。

### iconifyCollectionsNames

- 类型：`string[]`
- 默认值：`undefined`

要使用的额外 `@iconify-json` 图标集。当默认图标预设集合名称中未列出新的 `@iconify-json` 图标集时，应使用此选项。

### collections

- 类型：`Record<string, (() => Awaitable<IconifyJSON>) | undefined | CustomIconLoader | InlineCollection>`
- 默认值：`undefined`

在 Node.js 环境中，预设会自动搜索已安装的 iconify 数据集。在浏览器环境中，此选项用于提供具有自定义加载机制的数据集。

### layer

- 类型：`string`
- 默认值：`'icons'`

规则层。

### customizations

- 类型：`Omit<IconCustomizations, 'additionalProps' | 'trimCustomSvg'>`
- 默认值：`undefined`

自定义图标自定义设置。

### autoInstall

- 类型：`boolean`
- 默认值：`false`

检测到使用时自动安装图标源包。

::: warning
仅在 `node` 环境中有效，在 `浏览器` 环境中此选项将被忽略。
:::

### unit

- 类型：`string`
- 默认值：`'em'`

自定义图标单位。

### cdn

- 类型：`string`
- 默认值：`undefined`

从 CDN 加载图标。应以 `https://` 开头并以 `/` 结尾。

推荐：

- `https://esm.sh/`
- `https://cdn.skypack.dev/`

### customFetch

- 类型：`(url: string) => Promise<any>`
- 默认值：`undefined`

预设使用 [`ofetch`](https://github.com/unjs/ofetch) 作为默认 fetcher，你也可以提供自定义的 fetch 函数来获取图标数据。

### processor

- 类型：`(cssObject: CSSObject, meta: Required<IconMeta>) => void`
- 默认值：`undefined`

```ts
interface IconMeta {
  collection: string
  icon: string
  svg: string
  mode?: IconsOptions['mode']
}
```

在字符串化之前对 CSS 对象进行处理。参见 [示例](https://github.com/unocss/unocss/blob/7d83789b0dee8c72c401db24263ea429086de95d/test/preset-icons.test.ts#L66-L82)。

## 高级自定义图标集清理

将此预设与你的自定义图标一起使用时，建议使用类似 [Iconify](https://iconify.design/) 对任何图标集所做的清理流程。所有你需要的工具都在 [Iconify Tools](https://iconify.design/docs/libraries/tools/) 中提供。

你可以参考这个仓库，其中使用了此预设在 `Vue 3` 项目中：[@iconify/tools/@iconify-demo/unocss](https://github.com/iconify/tools/tree/main/%40iconify-demo/unocss)。

有关图标清理的更多细节，请阅读 [Iconify](https://iconify.design/) 的文章 [清理图标](https://iconify.design/docs/articles/cleaning-up-icons/)。

## 可访问性注意事项

使用图标时，重要的是要考虑所有潜在用户。一些用户可能正在使用屏幕阅读器，他们需要替代文本来理解图标的含义。你可以使用 `aria-label` 属性为图标提供描述：

```html
<a href="/profile" aria-label="Profile" class="i-ph:user-duotone"></a>
```

如果图标是纯装饰性的且不需要替代文本，可以使用 `aria-hidden="true"` 将其隐藏在屏幕阅读器之外：

```html
<a href="/profile">
  <span aria-hidden="true" class="i-ph:user-duotone"></span>
  My Profile
</a>
```

还有许多其他技术可以为屏幕阅读器提供提示文本，例如，[Wind3 预设](./wind3) 包含 [sr-only](/interactive/?s=sr-only) 可以视觉上隐藏元素但仍使其对屏幕阅读器可见。

你可以在网上找到许多关于图标可访问性的资源，CSS 图标的行为类似于图标字体，因此你可以使用与图标字体相同的技巧。
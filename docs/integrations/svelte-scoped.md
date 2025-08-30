---
title: UnoCSS Svelte Scoped
description: 适用于 UnoCSS 的 Svelte Scoped Vite 插件和 Svelte 预处理器。
outline: deep
---

# Svelte Scoped

将每个 Svelte 组件的工具类样式生成的 CSS 直接放置在 Svelte 组件的 `<style>` 块中，而不是全局 CSS 文件中。

例如这个组件：

```svelte
<div class="mb-1" />
```

会被转换为：

```svelte
<div class="uno-ei382o" />

<style>
  :global(.uno-ei382o) {
    margin-bottom: 0.25rem;
  }
</style>
```

## 使用场景

| 使用场景       |     | 描述                                                                                                                                                 | 推荐使用的包                                           |
| -------------- | --- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| 小型应用       | :x: | 使用一个全局 CSS 文件更方便。请使用 [Svelte](/integrations/vite#svelte)/[SvelteKit](/integrations/vite#sveltekit) 的常规 Vite 插件。 | [unocss/vite](/integrations/vite#svelte)               |
| 大型应用       | ✅  | Svelte Scoped 可以帮助你避免不断增长的全局 CSS 文件。                                                                                                  | [@unocss/svelte-scoped/vite](#vite-plugin)             |
| 组件库         | ✅  | 生成的样式会直接包含在构建的组件中，无需在使用方应用的构建流程中使用 UnoCSS。                                                                          | [@unocss/svelte-scoped/preprocess](#svelte-preprocessor) |

## 实现原理

常规的 UnoCSS/Tailwind CSS 设置会将工具类样式放在一个全局 CSS 文件中，并确保样式顺序正确。而 Svelte Scoped 则将样式分散到多个 Svelte 组件的 CSS 文件中，并且这些文件的顺序是任意的。然而，为了支持类似 RTL（从右到左）等[以下列出的用例](#context-aware)，必须保持工具类样式为全局样式。这个问题通过使用 Svelte 的 `:global()` 包裹器来解决，它会绕过默认的 Svelte CSS 哈希方法，并使用基于文件名 + 类名的哈希来生成全局唯一的类名，从而避免样式冲突。

## 使用方法

由于 Svelte Scoped 会重写你的工具类名，因此你在编写类名时受到一定限制：

| 支持的语法            | 示例                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------- |
| class 属性             | `<div class="mb-1" />`                                                                   |
| class 指令             | `<div class:mb-1={condition} />`                                                         |
| class 指令简写         | `<div class:logo />`                                                                      |
| class 属性传递         | `<Button class="mb-1" />`                                                                |
| 类似 clsx 的语法       | `<div class={["mb-1", { logo, 'font-bold': isBold() }, isUnderlined() && 'underline' ]} />` |

Svelte Scoped 被设计为可以无缝替换使用工具类的项目。因此，class 属性中的表达式也是支持的（例如 `<div class="mb-1 {foo ? 'mr-1' : 'mr-2'}" />`），但我们建议你使用 `clsx` 语法。此外，如果你之前使用了其他方式添加类名（例如在 `<script>` 块中或使用 attributify 模式），你需要在使用 Svelte Scoped 前进行额外处理。你可以使用 `safelist` 选项，或者查看下面的 [presets](#presets-support) 部分了解更多提示。

### 上下文感知

尽管样式分布在你的 Svelte 组件中，但它们仍然是全局类，并且可以与组件外部的元素产生关联。以下是一些示例：

#### 父级依赖

依赖于父组件中属性的类：

```svelte
<div class="dark:mb-2 rtl:right-0"></div>
```

会转换为：

```svelte
<div class="uno-3hashz"></div>

<style>
  :global(.dark .uno-3hashz) {
    margin-bottom: 0.5rem;
  }
  :global([dir="rtl"] .uno-3hashz) {
    right: 0rem;
  }
</style>
```

#### 子元素影响

你可以在三个子元素之间添加间距，其中一些元素在其他组件中：

```svelte
<div class="space-x-1">
  <div>Status: online</div>
  <Button>FAQ</Button>
  <Button>Login</Button>
</div>
```

会转换为：

```svelte
<div class="uno-7haszz">
  <div>Status: online</div>
  <Button>FAQ</Button>
  <Button>Login</Button>
</div>

<style>
  :global(.uno-7haszz > :not([hidden]) ~ :not([hidden])) {
    --un-space-x-reverse: 0;
    margin-left: calc(0.25rem * calc(1 - var(--un-space-x-reverse)));
    margin-right: calc(0.25rem * var(--un-space-x-reverse));
  }
</style>
```

#### 向子组件传递类名

你可以通过添加 `class` 属性将自定义类传递到组件中，在组件被使用时生效。

```svelte
<Button class="px-2 py-1">Login</Button>
```

会转换为：

```svelte
<Button class="uno-4hshza">Login</Button>

<style>
  :global(.uno-4hshza) {
    padding-left:0.5rem;
    padding-right:0.5rem;
    padding-top:0.25rem;
    padding-bottom:0.25rem;
  }
</style>
```

接收组件类名的一个简单方法是在元素上使用 `{$$props.class}`，例如 `div class="{$$props.class} foo bar" />`。

### Apply 指令

你可以在 `<style>` 块中使用 apply 指令，支持 `--at-apply` 或 `@apply`，也可以使用 `applyVariables` 选项自定义值。

Svelte Scoped 能够正确处理像 `dark:text-white` 这样的上下文依赖类，这是一般 [`@unocss/transformer-directives`](/transformers/directives) 包无法做到的，因为它不是专门为 Svelte style 块设计的。例如，使用 Svelte Scoped 的组件：

```svelte
<div />

<style>
  div {
    --at-apply: rtl:ml-2;
  }
</style>
```

将被转换为：

```svelte
<div />

<style>
  :global([dir=\\"rtl\\"]) div {
    margin-right: 0.5rem;
  }
</style>
```

为了让 `rtl:ml-2` 正常工作，`[dir="rtl"]` 选择器被包裹在 `:global()` 中，以防止 Svelte 编译器自动将其移除（因为组件中没有带有该属性的元素）。但是，`div` 不能包含在 `:global()` 包裹器中，否则该样式将影响整个应用中的 `div`。

### 其他 style 块指令

[theme()](https://unocss.dev/transformers/directives#theme) 也是支持的，但 [@screen](https://unocss.dev/transformers/directives#screen) **不支持**。

## Vite 插件

在 Svelte 或 SvelteKit 应用中，将生成的样式直接注入到你的 Svelte 组件中，同时将最少必要的样式放在全局样式表中。查看 Stackblitz 上的 [SvelteKit 示例](https://github.com/unocss/unocss/tree/main/examples/sveltekit-scoped)：

[![在 StackBlitz 中打开](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/unocss/unocss/tree/main/examples/sveltekit-scoped)

### 安装

::: code-group

```bash [pnpm]
pnpm add -D unocss @unocss/svelte-scoped
```

```bash [yarn]
yarn add -D unocss @unocss/svelte-scoped
```

```bash [npm]
npm install -D unocss @unocss/svelte-scoped
```

```bash [bun]
bun add -D unocss @unocss/svelte-scoped
```

:::

#### 添加插件

将 `@unocss/svelte-scoped/vite` 添加到你的 Vite 配置中：

```ts [vite.config.ts]
import { sveltekit } from '@sveltejs/kit/vite'
import UnoCSS from '@unocss/svelte-scoped/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS({
      // injectReset: '@unocss/reset/normalize.css', // 查看类型定义获取所有包含的重置选项或如何自定义
      // ...其他 Svelte Scoped 选项
    }),
    sveltekit(),
  ],
})
```

#### 添加配置文件

按[下方](#配置)说明设置你的 `uno.config.ts` 文件。

#### 全局样式

尽管几乎所有样式都被放入各个组件中，但仍有一些必须放在全局样式表中：preflights、safelist 以及可选的 reset（如果你使用了 `injectReset` 选项）。

在你的 `<head>` 标签中添加 `%unocss-svelte-scoped.global%` 占位符。在 Svelte 中是 `index.html`，在 SvelteKit 中是 `app.html` 并且应放在 `%sveltekit.head%` 之前：

<!-- eslint-skip -->

```html [index.html]
<head>
  <!-- ... -->
  <title>SvelteKit using UnoCSS Svelte Scoped</title>
  %unocss-svelte-scoped.global%
  %sveltekit.head%
</head>
```

如果使用 SvelteKit，还需要在 `src/hooks.server.js` 文件中添加以下代码到 `transformPageChunk` 钩子中：

```js [src/hooks.server.js]
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace(
        '%unocss-svelte-scoped.global%',
        'unocss_svelte_scoped_global_styles'
      ),
  })
  return response
}
```

这个转换必须放在路径包含 `hooks` 和 `server` 的文件中（例如 `src/hooks.server.js`、`src/hooks.server.ts`），因为 `svelte-scoped` 会在你的服务器钩子文件中查找 `unocss_svelte_scoped_global_styles` 并将其替换为全局样式。确保不要从其他文件导入此转换，例如使用 `@sveltejs/kit/hooks` 中的 `sequence`。

_在普通 Svelte 项目中，Vite 的 `transformIndexHtml` 钩子会自动完成此操作。_

## Svelte 预处理器

通过预处理器将生成的样式直接注入到构建的组件中，从而构建一个不依赖于额外 CSS 文件的组件库。查看 Stackblitz 上的 [SvelteKit Library 示例](https://github.com/unocss/unocss/tree/main/examples/sveltekit-preprocess)：

[![在 StackBlitz 中打开](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/unocss/unocss/tree/main/examples/sveltekit-preprocess)

### 安装

::: code-group

```bash [pnpm]
pnpm add -D unocss @unocss/svelte-scoped
```

```bash [yarn]
yarn add -D unocss @unocss/svelte-scoped
```

```bash [npm]
npm install -D unocss @unocss/svelte-scoped
```

```bash [bun]
bun add -D unocss @unocss/svelte-scoped
```

:::

#### 添加预处理器

将 `@unocss/svelte-scoped/preprocess` 添加到你的 Svelte 配置中：

```ts [svelte.config.js]
import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import UnoCSS from '@unocss/svelte-scoped/preprocess'

const config = {
  preprocess: [
    vitePreprocess(),
    UnoCSS({
      // ...预处理器选项
    }),
  ],
  // 其他 Svelte 配置
}
```

#### 不要在开发模式下合并类名

在普通应用中使用 Svelte Scoped 时，Vite 插件会自动检测 `dev` 和 `build` 模式。在开发模式下，类名会保持独立并在原地哈希，以便在浏览器开发者工具中轻松切换。例如，`class="mb-1 mr-1"` 会变成 `class="_mb-1_9hwi32 _mr-1_84jfy4"`。在生产环境中，这些类名将被编译成一个带有前缀（默认为 `uno-`）和基于文件名 + 类名的哈希的单一类名，例如 `class="uno-84dke3"`。

如果你想在预处理器中获得相同的行为，必须根据环境手动设置 `combine` 选项。一种方法是安装 [cross-env](https://www.npmjs.com/package/cross-env) 并更新你的 dev 脚本如下：

```
"dev": "cross-env NODE_ENV=development vite dev"
```

然后调整你的 svelte.config.js：

```diff
+const prod = process.env.NODE_ENV !== 'development'
const config = {
  preprocess: [
    vitePreprocess(),
    UnoCSS({
+      combine: prod,
    }),
  ],
}
```

#### 添加配置文件

按[下方](#配置)说明设置你的 `uno.config.ts` 文件。

### Preflights

使用预处理器时，你可以通过添加 `uno-preflights` 作为样式属性，将 preflights 包含到需要的组件中：

```html
<style uno-preflights></style>
```

任何以点开头的特殊 preflights（例如 `.prose :where(a):not(:where(.not-prose, .not-prose *))`）都会被包裹在 `:global()` 中，以避免被 Svelte 编译器自动移除。

_如果你的类不依赖 preflights，或者你的组件只在已经包含 preflights 的应用中使用，则不需要将 preflights 添加到单个组件中。_

### Safelist

使用预处理器时，你可以通过添加 `uno-safelist` 作为样式属性，将 safelist 类包含到组件中：

```html
<style uno-safelist></style>
```

你的 safelist 样式将被包裹在 `:global()` 中，以避免被 Svelte 编译器自动移除。

## 配置

将你的 UnoCSS 设置放在 `uno.config.ts` 文件中：

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS 选项
})
```

由于 Svelte Scoped 与常规 UnoCSS 全局使用方式不同，**不支持提取器（Extractors）**。但支持预设和转换器，详见以下部分。有关其他所有细节，请参阅 [配置文件](/guide/config-file) 和 [配置参考](/config/)。

### 预设支持

由于部分样式必须放在全局样式表中，其余样式包含在各自组件中，因此预设需要根据具体情况处理：

| 预设                                                                                                                                                                                                                                                                                                                                                                      | 支持 | 说明                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ~~[@unocss/preset-uno](https://unocss.dev/presets/uno)~~, [@unocss/preset-mini](https://unocss.dev/presets/mini), [@unocss/preset-wind3](https://unocss.dev/presets/wind3), [@unocss/preset-icons](https://github.com/unocss/unocss/tree/main/packages-presets/preset-icons), [@unocss/web-fonts](https://github.com/unocss/unocss/tree/main/packages-presets/preset-icons) | ✅   | 这些以及所有社区插件（如 [unocss-preset-forms](https://github.com/Julien-R44/unocss-preset-forms)）仅依赖于规则/变体/preflights，可以正常工作。                                                           |
| [@unocss/preset-typography](https://github.com/unocss/unocss/tree/main/packages-presets/preset-typography)                                                                                                                                                                                                                                                                  | ✅   | 由于此预设将规则集添加到你的 preflights 中，因此使用此预设时必须将 `prose` 类添加到 safelist，否则 preflights 将不会被触发。该预设的其他类（如 `prose-pink`）可以组件作用域。                           |
| [@unocss/preset-rem-to-px](https://github.com/unocss/unocss/tree/main/packages-presets/preset-rem-to-px)                                                                                                                                                                                                                                                                    | ✅   | 此类仅修改样式输出的预设都可以正常工作。                                                                                                                                                               |
| [@unocss/preset-attributify](https://github.com/unocss/unocss/tree/main/packages-presets/preset-attributify)                                                                                                                                                                                                                                                                | -    | 预设无法工作。请改用 [unplugin-attributify-to-class](https://github.com/MellowCo/unplugin-attributify-to-class) Vite 插件 (`attributifyToClass({ include: [/\.svelte$/]})`) 在 Svelte Scoped 插件之前使用 |
| [@unocss/preset-tagify](https://github.com/unocss/unocss/tree/main/packages-presets/preset-tagify)                                                                                                                                                                                                                                                                          | -    | 添加自定义提取器的预设无法工作。请创建预处理器将 `<text-red>Hi</text-red>` 转换为 `<span class="text-red">Hi</span>`，然后提交 PR 添加链接。                                                             |

对于其他预设，如果它们不依赖于传统的 `class="..."` 用法，你需要先将这些类名预处理为 `class="..."` 属性。如果它们像 typography 的 `.prose` 类一样添加了预设，则需要将触发预设的类名添加到 safelist 中。

### 转换器支持

转换器支持你的 CSS 文件（css|postcss|sass|scss|less|stylus|styl）。要使用它们，请将转换器添加到 `vite.config.ts` 的 `cssFileTransformers` 选项中：

```ts [vite.config.ts]
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  plugins: [
    UnoCSS({
      cssFileTransformers: [transformerDirectives()],
    }),
    sveltekit(),
  ],
})
```

::: info
由于 Svelte Scoped 的工作方式，**在 Svelte 组件中不支持转换器**。
:::

## 作用域工具类激发创造力

关于何时使用作用域样式的一些建议：如果你在一个大型项目的生命周期中，每次使用像 `.md:max-w-[50vw]` 这样只使用一次的类时，你都会因为全局样式表体积不断增大而感到担忧，那么可以尝试这个包。对使用特定类的犹豫会抑制创造力。当然，你也可以使用 `--at-apply: md:max-w-[50vw]` 在样式块中，但这很繁琐，且上下文中的样式是有用的。此外，如果你想在项目中引入大量图标，你将开始感受到将其添加到全局样式表中的负担。当每个组件承载自己的样式和图标时，你可以继续扩展你的项目，而无需分析每次新增的成本效益。

## 许可证

- MIT License &copy; 2022-PRESENT [Jacob Bowdoin](https://github.com/jacob-8)
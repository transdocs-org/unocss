---
title: UnoCSS Svelte Scoped
description: 用于 UnoCSS 的 Svelte Scoped Vite 插件和 Svelte 预处理器。
outline: deep
---

# Svelte Scoped

将每个 Svelte 组件的实用工具样式生成的 CSS 直接放入该组件的 `<style>` 块中，而不是放在全局 CSS 文件中。

该组件：
```svelte
<div class="mb-1" />
```
被转换为：
```svelte
<div class="uno-ei382o" />

<style>
  :global(.uno-ei382o) {
    margin-bottom: 0.25rem;
  }
</style>
```
## 何时使用

| 使用场景       |     | 描述                                                                                                                             | 应使用的包                                               |
| -------------- | --- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| 小型应用       | :x: | 使用 1 个全局 CSS 文件更方便。请使用常规 Vite 插件：[Svelte](/integrations/vite#svelte) / [SvelteKit](/integrations/vite#sveltekit)。 | [unocss/vite](/integrations/vite#svelte)                 |
| 大型应用       | ✅  | Svelte Scoped 可避免全局 CSS 文件不断增长。                                                                                        | [@unocss/svelte-scoped/vite](#vite-plugin)               |
| 组件库         | ✅  | 生成的样式直接注入到构建后的组件中，无需在使用组件库的应用构建流程里再引入 UnoCSS。                                               | [@unocss/svelte-scoped/preprocess](#svelte-preprocessor) |

## 工作原理

常规的 UnoCSS / Tailwind CSS 会把工具类样式放在按正确顺序排列的全局 CSS 文件中。而 Svelte Scoped 则把样式分散到多个任意顺序的 Svelte 组件 CSS 文件中。不过，为了让样式在需要时仍能保持上下文感知（如 RTL 等），工具类样式必须保持全局。这就带来了一个挑战：使用 Svelte 的 `:global()` 包装器可以绕过默认的 CSS 哈希机制，改为基于“文件名 + 类名”生成唯一类名，从而避免冲突地暴露为全局样式。

## 用法

由于 Svelte Scoped 会重写你的工具类名，你只能在以下位置书写它们：

| 支持的语法             | 示例                                                                                     |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| class 属性             | `<div class="mb-1" />`                                                                   |
| class 指令             | `<div class:mb-1={condition} />`                                                         |
| class 指令简写         | `<div class:logo />`                                                                     |
| class 属性传递         | `<Button class="mb-1" />`                                                                |
| 类似 `clsx` 的写法     | `<div class={["mb-1", { logo, 'font-bold': isBold() }, isUnderlined() && 'underline' ]} />` |

Svelte Scoped 被设计为可直接替换现有使用工具类的项目。因此，class 属性中的表达式同样支持（例如 `<div class="mb-1 {foo ? 'mr-1' : 'mr-2'}" />`），但我们建议你今后使用 `clsx` 语法。注意，如果你之前通过 `<script>` 块或 attributify 模式等方式使用类名，则需要额外处理才能迁移到 Svelte Scoped。你可以使用 `safelist` 选项，并参考下方的 [预设](#presets-support) 章节获取更多提示。

### 上下文感知

尽管样式被分散到各个 Svelte 组件中，它们依旧是全局类，并能在组件外部元素上生效。示例如下：

#### 依赖父级

依赖于父组件属性的类：
```svelte
<div class="dark:mb-2 rtl:right-0"></div>
```
变成：
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
#### 影响子元素间距

你可以在 3 个子元素之间添加间距，其中某些子元素位于独立的组件中：
```svelte
<div class="space-x-1">
  <div>状态：在线</div>
  <Button>常见问题</Button>
  <Button>登录</Button>
</div>
```
变为：
```svelte
<div class="uno-7haszz">
  <div>状态：在线</div>
  <Button>常见问题</Button>
  <Button>登录</Button>
</div>

<style>
  :global(.uno-7haszz > :not([hidden]) ~ :not([hidden])) {
    --un-space-x-reverse: 0;
    margin-left: calc(0.25rem * calc(1 - var(--un-space-x-reverse)));
    margin-right: calc(0.25rem * var(--un-space-x-reverse));
  }
</style>
```
#### 向子组件传递类

你可以为组件添加一个 `class` 属性，以便在任意使用该组件的地方传递自定义类。
```svelte
<Button class="px-2 py-1">登录</Button>
```
变为：
```svelte
<Button class="uno-4hshza">登录</Button>

<style>
  :global(.uno-4hshza) {
    padding-left:0.5rem;
    padding-right:0.5rem;
    padding-top:0.25rem;
    padding-bottom:0.25rem;
  }
</style>
```
在接收组件中实现该类的简单方法是，将其通过 `{$$props.class}` 放置到元素上，例如 `div class="{$$props.class} foo bar" />`。

### 使用 apply 指令

你可以在 `<style>` 代码块中使用 `--at-apply`、`@apply`，或通过 `applyVariables` 选项设置的自定义值来应用指令。

Svelte Scoped 甚至能正确处理上下文相关的类，例如 `dark:text-white`，而常规的 [`@unocss/transformer-directives`](/transformers/directives) 包无法正确处理，因为它并非专门为 Svelte 的样式块设计。例如，使用 Svelte Scoped 时，该组件：
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
  :global([dir="rtl"]) div {
    margin-right: 0.5rem;
  }
</style>
```
为了让 `rtl:ml-2` 正常工作，`[dir="rtl"]` 选择器被包裹在 `:global()` 中，以防止 Svelte 编译器因组件内没有该属性元素而自动将其移除。然而，`div` 不能被包含在 `:global()` 包装器中，否则该样式会影响到应用中的每一个 `div`。

### 其他样式块指令

同样支持使用 [theme()](https://unocss.dev/transformers/directives#theme)，但 [@screen](https://unocss.dev/transformers/directives#screen) **不被支持**。

## Vite 插件

在 Svelte 或 SvelteKit 应用中，将生成的样式直接注入到 Svelte 组件中，同时将最少必要的样式放在全局样式表中。可在 Stackblitz 查看 [SvelteKit 示例](https://github.com/unocss/unocss/tree/main/examples/sveltekit-scoped)：

[![在 StackBlitz 打开](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/unocss/unocss/tree/main/examples/sveltekit-scoped)

### 安装

::: code-group
```bash [pnpm]
pnpm add -D unocss @unocss/svelte-scoped
```
```markdown
# 快速开始

欢迎使用我们的服务！请按照以下步骤开始：

1. 克隆仓库  
   ```bash
   git clone https://github.com/example/project.git
   ```

2. 安装依赖  
   ```bash
   cd project
   npm install
   ```

3. 启动开发服务器  
   ```bash
   npm run dev
   ```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。
```
```bash [yarn]
yarn add -D unocss @unocss/svelte-scoped
```
请提供需要翻译的 Markdown 文本，我将为您翻译成中文并保持原有格式不变。
```bash [npm]
npm install -D unocss @unocss/svelte-scoped
```
（原文为空，无需翻译）
```bash [bun]
bun add -D unocss @unocss/svelte-scoped
```
:::

#### 添加插件

在你的 Vite 配置中添加 `@unocss/svelte-scoped/vite`：
```ts [vite.config.ts]
import { sveltekit } from '@sveltejs/kit/vite'
import UnoCSS from '@unocss/svelte-scoped/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS({
      // injectReset: '@unocss/reset/normalize.css', // 查看类型定义以了解所有内置的重置选项，或如何传入你自己的重置
      // ...其他 Svelte Scoped 选项
    }),
    sveltekit(),
  ],
})
```
#### 添加配置文件

按照[下文](#configuration)的描述设置你的 `uno.config.ts` 文件。

#### 全局样式

虽然几乎所有样式都放在各个组件内部，但仍有少量样式必须放到全局样式表中：preflights、safelist 以及可选的 reset（如果你使用了 `injectReset` 选项）。

在 `<head>` 标签中加入 `%unocss-svelte-scoped.global%` 占位符。在 Svelte 中这是 `index.html`；在 SvelteKit 中则是在 `app.html` 中 `%sveltekit.head%` 之前：

<!-- eslint-skip -->
```html [index.html]
<head>
  <!-- ... -->
  <title>使用 UnoCSS Svelte Scoped 的 SvelteKit</title>
  %unocss-svelte-scoped.global%
  %sveltekit.head%
</head>
```
如果你使用的是 SvelteKit，还必须在 `src/hooks.server.js` 文件的 `transformPageChunk` 钩子中添加以下内容：
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
此转换必须位于[路径包含 `hooks` 和 `server`](https://github.com/unocss/unocss/blob/main/packages-integrations/svelte-scoped/src/_vite/global.ts#L12) 的文件中（例如 `src/hooks.server.js`、`src/hooks.server.ts`），因为 `svelte-scoped` 会在你的 server hooks 文件中查找并将 `unocss_svelte_scoped_global_styles` 替换为你的全局样式。务必不要从另一个文件导入此转换，例如在使用 `@sveltejs/kit/hooks` 的 [sequence](https://kit.svelte.dev/docs/modules#sveltejs-kit-hooks-sequence) 时。

_在普通的 Svelte 项目中，Vite 的 `transformIndexHtml` 钩子会自动完成这一步。_

## Svelte 预处理器

使用实用工具类样式构建一个不依赖配套 CSS 文件的组件库，方法是使用预处理器将生成的样式直接注入到构建后的组件中。在 Stackblitz 查看 [SvelteKit Library 示例](https://github.com/unocss/unocss/tree/main/examples/sveltekit-preprocess)：

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/unocss/unocss/tree/main/examples/sveltekit-preprocess)

### 安装

::: code-group
```bash [pnpm]
pnpm add -D unocss @unocss/svelte-scoped
```
```markdown
# 使用 Docker 部署 PostgreSQL

## 前提条件
- 已安装 [Docker](https://docs.docker.com/get-docker/)
- 已安装 [Docker Compose](https://docs.docker.com/compose/install/)

## 步骤

### 1. 创建项目目录
```bash
mkdir pg-docker && cd pg-docker
```

### 2. 创建 `docker-compose.yml`
```yaml
version: "3.9"
services:
  postgres:
    image: postgres:15
    container_name: pg
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: secret
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

### 3. 启动容器
```bash
docker compose up -d
```

### 4. 验证
```bash
docker exec -it pg psql -U user -d mydb -c "SELECT version();"
```

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| 端口冲突 | 修改 `ports` 映射，例如 `"5433:5432"` |
| 数据丢失 | 确保 `volumes` 正确挂载 |

## 延伸阅读
- [PostgreSQL 官方文档](https://www.postgresql.org/docs/)
- [Docker Hub 镜像](https://hub.docker.com/_/postgres)
```
```bash [yarn]
yarn add -D unocss @unocss/svelte-scoped
```
```markdown
# 快速开始

## 安装

```bash
npm install awesome-package
```

## 使用

### 基础示例

```js
import { doSomething } from 'awesome-package';

doSomething();
```

### 进阶用法

```js
import { doSomething, doMore } from 'awesome-package';

doSomething();
doMore({
  option1: true,
  option2: 'zh-CN'
});
```

## API 参考

### doSomething()

执行默认操作。

#### 参数

- 无

#### 返回值

- `boolean`：成功返回 `true`，失败返回 `false`。

### doMore(options)

执行更多操作。

#### 参数

- `options`（对象）：
  - `option1`（布尔值，可选）：启用特性 1。
  - `option2`（字符串，可选）：指定语言。

#### 返回值

- `Promise<string>`：返回操作结果。
```
```bash [npm]
npm install -D unocss @unocss/svelte-scoped
```
（原文为空，无需翻译）
```bash [bun]
bun add -D unocss @unocss/svelte-scoped
```
:::

#### 添加预处理器

在你的 Svelte 配置中添加 `@unocss/svelte-scoped/preprocess`：
```ts [svelte.config.js]
import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import UnoCSS from '@unocss/svelte-scoped/preprocess'

const config = {
  preprocess: [
    vitePreprocess(),
    UnoCSS({
      // ... 预处理器选项
    }),
  ],
  // 其他 Svelte 配置
}
```
#### 不要在开发环境中合并类名

在普通应用中使用 Svelte Scoped 时，Vite 插件会自动区分 `dev` 与 `build` 环境。在开发环境中，类名将保持独立，并在原地进行哈希处理，以便你在浏览器的开发者工具中轻松开关。`class="mb-1 mr-1"` 会变成类似 `class="_mb-1_9hwi32 _mr-1_84jfy4` 的形式。而在生产环境中，这些类名会被合并成一个类名，并使用你指定的前缀（默认为 `uno-`）以及基于文件名 + 类名的哈希值，例如 `class="uno-84dke3"`。

如果你在使用预处理器时也希望获得相同的行为，就必须根据环境手动设置 `combine` 选项。一种方法是安装 [cross-env](https://www.npmjs.com/package/cross-env)，并将你的 dev 脚本更新为：
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

按照[下文](#configuration)的说明设置你的 `uno.config.ts` 文件。

### 预置样式

使用预处理器时，你可以通过将 `uno-preflights` 作为样式属性添加到特定组件中，从而仅在这些组件中引入所需的预置样式。
```html
<style uno-preflights></style>
```
任何以句点开头的特殊预检（preflight），例如 `.prose :where(a):not(:where(.not-prose, .not-prose *))`，都会被包裹在 `:global()` 中，以避免被 Svelte 编译器自动剔除。

_如果你的类不依赖预检，或者构建的组件只在已包含预检的应用中使用，那么就没有必要在每个组件里单独添加预检。_

### 安全列表（Safelist）

使用预处理器时，可以通过在组件上添加 `uno-safelist` 作为 style 属性，来把安全列表中的类包含进该组件。
```html
<style uno-safelist></style>
```
你的 safelist 样式会被包裹在 `:global()` 中，以避免被 Svelte 编译器自动移除。

## 配置

将 UnoCSS 的配置放在 `uno.config.ts` 文件中：
```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS 配置项
})
```
由于普通 UnoCSS 全局用法与 Svelte Scoped 用法之间的差异，Extractors 不受支持。Presets 和 Transformers 如以下各节所述受支持。其他所有细节请参见 [配置文件](/guide/config-file) 和 [配置参考](/config/)。

### Presets 支持

由于需要将少量必要样式放在全局样式表中，其余样式按需包含在每个组件中，因此必须逐个处理各个 preset：

| Preset                                                                                                                                                                                                                                                                                                                                                                      | 支持情况 | 备注                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ~~[@unocss/preset-uno](https://unocss.dev/presets/uno)~~、[@unocss/preset-mini](https://unocss.dev/presets/mini)、[@unocss/preset-wind3](https://unocss.dev/presets/wind3)、[@unocss/preset-icons](https://github.com/unocss/unocss/tree/main/packages-presets/preset-icons)、[@unocss/web-fonts](https://github.com/unocss/unocss/tree/main/packages-presets/preset-icons) | ✅        | 这些以及所有仅依赖 rules/variants/preflights 的社区插件（例如 [unocss-preset-forms](https://github.com/Julien-R44/unocss-preset-forms)）均可正常工作。                                                                                                                                                                                                                                  |
| [@unocss/preset-typography](https://github.com/unocss/unocss/tree/main/packages-presets/preset-typography)                                                                                                                                                                                                                                                                  | ✅        | 由于此 preset 会将规则集添加到 preflights，因此在使用时必须将 `prose` 类加入 safelist，否则 preflights 不会被触发。该 preset 的其他所有类（例如 `prose-pink`）均可组件作用域化。<hr/> 在 `v66.5.0` 之后，`prose` 样式被重构为 `rule`，因此不再需要将其加入 safelist。 |
| [@unocss/preset-rem-to-px](https://github.com/unocss/unocss/tree/main/packages-presets/preset-rem-to-px)                                                                                                                                                                                                                                                                    | ✅        | 此 preset 及所有仅修改样式输出的类似 preset 均可正常工作。                                                                                                                                                                                                                                                                                                                                   |
| [@unocss/preset-attributify](https://github.com/unocss/unocss/tree/main/packages-presets/preset-attributify)                                                                                                                                                                                                                                                                | -        | 该 preset 无法工作。请改用 [unplugin-attributify-to-class](https://github.com/MellowCo/unplugin-attributify-to-class) Vite 插件（`attributifyToClass({ include: [/\.svelte$/]})`），并确保在 Svelte Scoped Vite 插件之前引入。                                                                                                                                                                            |
| [@unocss/preset-tagify](https://github.com/unocss/unocss/tree/main/packages-presets/preset-tagify)                                                                                                                                                                                                                                                                          | -        | 添加自定义 extractors 的 preset 无法工作。请创建一个预处理器，将 `<text-red>Hi</text-red>` 转换为 `<span class="text-red">Hi</span>`，然后提交 PR 在此添加链接。                                                                                                                                                                                                              |

对于其他 preset，如果它们不依赖传统的 `class="..."` 用法，则需要先将这些类名预处理到 `class="..."` 属性中。如果它们添加了类似 typography 的 `.prose` 类，则需要将触发 preset 添加的类放入 safelist。

### Transformers 支持

Transformers 可用于你的 CSS 文件（css|postcss|sass|scss|less|stylus|styl）。要使用它们，请将 transformer 添加到 `vite.config.ts` 中的 `cssFileTransformers` 选项：
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
由于 Svelte Scoped 的工作方式，Transformers 在 Svelte 组件中不受支持。
:::

## 作用域工具类释放创造力

关于何时使用作用域样式的一些建议：如果你在一个大型项目的生命周期中，每次使用诸如 `.md:max-w-[50vw]` 这种只使用一次的类时，都会因为感觉全局样式表越来越大而心生抵触，那就试试这个包吧。对使用恰好所需类的犹豫会抑制创造力。当然，你可以在样式块中使用 `--at-apply: md:max-w-[50vw]`，但那会变得乏味，而且上下文中的样式很有用。此外，如果你想在项目中包含大量图标，你会开始感受到将它们添加到全局样式表的重量。当每个组件都承载自己的样式和图标时，你就可以继续扩展项目，而无需分析每次新增的成本收益。

## 许可证

- MIT 许可证 &copy; 2022-至今 [Jacob Bowdoin](https://github.com/jacob-8)
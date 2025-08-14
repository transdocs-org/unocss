---
outline: deep
---

# 提取（Extracting）

UnoCSS 通过在你的代码库中搜索工具类的使用情况，并按需生成相应的 CSS。我们将这个过程称为 **提取**。

## 内容来源

UnoCSS 支持从多个来源提取工具类的使用情况：

- [构建工具管道](#从构建工具管道提取) - 直接从构建工具管道中提取
- [文件系统](#从文件系统提取) - 通过读取和监听文件来从文件系统中提取
- [内联文本](#从内联文本提取) - 从内联的纯文本中提取

来自不同来源的工具类使用情况会被合并，并生成最终的 CSS。

### 从构建工具管道提取

这在 [Vite](/integrations/vite) 和 [Webpack](/integrations/webpack) 集成中被支持。

UnoCSS 将读取经过你的构建工具管道的内容，并从中提取工具类的使用情况。这是最高效且准确的提取方式，因为我们只会智能地提取你的应用中实际使用的工具类，在提取过程中不会进行额外的文件 I/O 操作。

默认情况下，UnoCSS 会从构建管道中的以下扩展名文件中提取工具类使用情况：`.jsx`、`.tsx`、`.vue`、`.md`、`.html`、`.svelte`、`.astro`，然后按需生成适当的 CSS。`.js` 和 `.ts` 文件 **默认不包含在内**。

你可以通过更新 `uno.config.ts` 来配置它们：

```ts [uno.config.ts]
export default defineConfig({
  content: {
    pipeline: {
      include: [
        // 默认
        /\.(vue|svelte|[jt]sx|vine.ts|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // 包含 js/ts 文件
        'src/**/*.{js,ts}',
      ],
      // 排除文件
      // exclude: []
    },
  },
})
```

你还可以在单个文件中添加 `@unocss-include` 魔法注释，告诉 UnoCSS 强制扫描该文件。如果你需要扫描 `*.js` 或 `*.ts` 文件，请在配置中包含所有 js/ts 文件作为扫描目标。

```ts
// ./some-utils.js

// 因为 `.js` 文件默认不被包含，
// 以下注释告诉 UnoCSS 强制扫描此文件。
// @unocss-include
export const classes = {
  active: 'bg-primary text-white',
  inactive: 'bg-gray-200 text-gray-500',
}
```

同样地，你可以添加 `@unocss-ignore` 来跳过整个文件的扫描和转换。

如果你想让 UnoCSS 跳过某个代码块的提取，可以在代码块前后使用 `@unocss-skip-start` 和 `@unocss-skip-end`。注意必须 **成对使用** 才能生效。

```html
<p class="text-green text-xl">绿色 大号</p>

<!-- @unocss-skip-start -->
<!-- `text-red` 不会被提取 -->
<p class="text-red">红色</p>
<!-- @unocss-skip-end -->
```

### 从文件系统提取

在某些集成中，你可能无法访问构建工具管道（例如 [PostCSS](/integrations/postcss) 插件），或者你正在与后端框架集成，导致代码不会经过构建管道。这时你可以手动指定需要提取的文件。

```ts [uno.config.ts]
export default defineConfig({
  content: {
    filesystem: [
      'src/**/*.php',
      'public/*.html',
    ],
  },
})
```

匹配的文件将在开发模式下被直接从文件系统中读取并监听其变化。

### 从内联文本提取

此外，你还可以从内联文本中提取工具类的使用情况，这些文本可能来自其他地方。

你也可以传入一个异步函数来返回内容。但请注意，该函数只会在构建时调用一次。

```ts [uno.config.ts]
export default defineConfig({
  content: {
    inline: [
      // 纯文本
      '<div class="p-4 text-red">一些文本</div>',
      // 异步获取
      async () => {
        const response = await fetch('https://example.com')
        return response.text()
      },
    ],
  },
})
```

## 局限性

由于 UnoCSS 是在 **构建时** 工作的，这意味着只有静态呈现的工具类会被生成并应用到你的应用中。在运行时动态使用或从外部资源获取的工具类 **可能不会** 被检测或应用。

### 安全列表（Safelist）

有时你可能想使用动态拼接的方式，例如：

```html
<div class="p-${size}"></div>
<!-- 这不会生效！ -->
```

由于 UnoCSS 在构建时使用静态提取，编译时无法知道所有可能的工具类组合。这时你可以配置 `safelist` 选项。

```ts [uno.config.ts]
safelist: 'p-1 p-2 p-3 p-4'.split(' ')
```

对应的 CSS 将始终被生成：

<!-- eslint-skip -->

```css
.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-3 { padding: 0.75rem; }
.p-4 { padding: 1rem; }
```

或者更灵活的写法：

```ts [uno.config.ts]
safelist: [
  ...Array.from({ length: 4 }, (_, i) => `p-${i + 1}`),
]
```

如果你希望在运行时实现真正的动态生成，可以查看 [@unocss/runtime](/integrations/runtime) 包。

### 静态组合列表

另一种解决动态构造工具类限制的方法是，你可以使用一个对象静态列出所有组合。例如，如果你想要这样写：

```html
<div class="text-${color} border-${color}"></div>
<!-- 这不会生效！ -->
```

你可以创建一个对象，列出所有组合（假设你知道所有可能的 `color` 值）：

```ts
// 因为它们是静态的，UnoCSS 能够在构建时提取它们
const classes = {
  red: 'text-red border-red',
  green: 'text-green border-green',
  blue: 'text-blue border-blue',
}
```

然后在模板中使用它：

```html
<div class="${classes[color]}"></div>
```

### 屏蔽列表（Blocklist）

类似于 `safelist`，你也可以配置 `blocklist` 来排除某些工具类的生成。这在排除一些错误提取时非常有用。与 `safelist` 不同的是，`blocklist` 支持字符串精确匹配和正则表达式模式匹配。

```ts [uno.config.ts]
blocklist: [
  'p-1',
  /^p-[2-4]$/,
]
```

这将排除 `p-1`、`p-2`、`p-3` 和 `p-4` 的生成。
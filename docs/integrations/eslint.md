---
title: UnoCSS ESLint 配置
description: UnoCSS 的 ESLint 配置（@unocss/eslint-config）。
---

# ESLint 配置

UnoCSS 的 ESLint 配置：`@unocss/eslint-config`。

## 安装

::: code-group

```bash [pnpm]
pnpm add -D @unocss/eslint-config
```

```bash [yarn]
yarn add -D @unocss/eslint-config
```

```bash [npm]
npm install -D @unocss/eslint-config
```

```bash [bun]
bun add -D @unocss/eslint-config
```

:::

在 [Flat Config 风格](https://eslint.org/docs/latest/use/configure/configuration-files-new) 中：

```js [eslint.config.js]
import unocss from '@unocss/eslint-config/flat'

export default [
  unocss,
  // 其他配置
]
```

在传统的 `.eslintrc` 风格中：

```json [.eslintrc]
{
  "extends": [
    "@unocss"
  ]
}
```

## 规则

- `@unocss/order` - 强制 class 选择器的特定顺序。
- `@unocss/order-attributify` - 强制 attributify 选择器的特定顺序。
- `@unocss/blocklist` - 禁止特定的 class 选择器 [可选]。
- `@unocss/enforce-class-compile` - 强制 class 编译 [可选]。

### 规则选项

#### `@unocss/order`

- `unoFunctions` (string[]) - 标记匹配名称的函数调用以应用此规则。这些是纯名称，不是模式，不区分大小写。默认值：`['clsx', 'classnames']`。
- `unoVariables` (string[]) - 标记匹配名称的变量声明以应用此规则。这些是带有标志 `i` 的正则表达式。默认值：`['^cls', 'classNames?$']`，例如会匹配变量名 `clsButton` 和 `buttonClassNames`。

### 可选规则

这些规则默认未启用。要启用它们，请在 `.eslintrc` 中添加以下内容：

```json [.eslintrc]
{
  "extends": [
    "@unocss"
  ],
  "rules": {
    "@unocss/<rule-name>": "warn", // 或 "error"
    "@unocss/<another-rule-name>": ["warn" /* 或 "error" */, { /* 选项 */ }]
  }
}
```

#### `@unocss/blocklist`

当使用在 `blocklist` 中列出的工具类时发出警告或错误。

你可以通过使用 `message` 属性自定义被阻止规则的消息，使其更具信息性和上下文相关性：

```ts [unocss.config.ts]
export default defineConfig({
  blocklist: [
    ['bg-red-500', { message: '请改用 bg-red-600' }],
    [/-auto$/, { message: s => `请改用 ${s.replace(/-auto$/, '-a')}` }], // -> "my-auto" 在 blocklist 中：请改用 "my-a"
  ],
})
```

#### `@unocss/enforce-class-compile` :wrench:

_此规则设计为与 [compile class 转换器](https://unocss.dev/transformers/compile-class) 一起使用。_

当 class 属性或指令不以 `:uno:` 开头时发出警告或错误。

:wrench: 自动为所有 class 属性和指令添加前缀 `:uno:`。

选项：

- `prefix` (string) - 可与 [自定义前缀](https://github.com/unocss/unocss/blob/main/packages-presets/transformer-compile-class/src/index.ts#L34) 一起使用。默认值：`:uno:`
- `enableFix` (boolean) - 当为 `false` 时可用于逐步迁移。默认值：`true`

**注意**：目前仅支持 Vue。如果你想在 JSX 中使用，请贡献 PR。如果你在寻找 Svelte 中的实现，你可能需要查看 [`svelte-scoped`](https://unocss.dev/integrations/svelte-scoped) 模式。

## 参考项目

感谢 [@devunt](https://github.com/devunt) 提供的 [eslint-plugin-unocss](https://github.com/devunt/eslint-plugin-unocss)。
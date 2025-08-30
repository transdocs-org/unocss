---
title: 自动补全工具
description: UnoCSS 的自动补全工具（@unocss/autocomplete）。
---

# 自动补全

UnoCSS 的自动补全工具：`@unocss/autocomplete`。该功能已集成在 <a href="/play" target="_blank" rel="noreferrer">在线体验平台</a> 和 [VS Code 插件](/integrations/vscode) 中。

## 使用方式

### 静态规则

像下面这样的静态规则无需任何配置即可直接生效。

```ts
rules: [
  ['flex', { display: 'flex' }]
]
```

### 动态规则

对于动态规则，你可以为规则提供一个额外的 `meta` 对象，并指定自动补全模板。

```ts
rules: [
  [
    /^m-(\d)$/,
    ([, d]) => ({ margin: `${d / 4}rem` }),
    { autocomplete: 'm-<num>' }, // <-- 这里
  ],
]
```

模板使用一个简单的 DSL 来定义自动补全建议。语法如下：

- `(...|...)`：使用 `|` 分隔的逻辑“或”组。当部分组匹配时，它们将作为建议显示。
- `<...>`：内置的简写。目前支持 `<num>`、`<percent>` 和 `<directions>`。
- `$...`：主题推导。例如 `$colors` 将列出主题中 `colors` 对象的所有属性。

## 示例

### 示例 1

- **模板**： `(border|b)-(solid|dashed|dotted|double|hidden|none)`
- **输入**： `b-do`
- **建议**： `b-dotted`, `b-double`

### 示例 2

- **模板**： `m-<num>`
- **输入**： `m-`
- **建议**： `m-1`, `m-2`, `m-3`…

### 示例 3

- **模板**： `text-$colors`
- **输入**： `text-r`
- **建议**： `text-red`, `text-rose`…

### 示例 4

对于多个模板的情况：

- **模板**： `['(border|b)-<num>', '(border|b)-<directions>-<num>']`
- **输入**： `b-`
- **建议**： `b-x`, `b-y`, `b-1`, `b-2`…
- **输入**： `b-x-`
- **建议**： `b-x-1`, `b-x-2`…

## 许可证

- MIT License &copy; 2021-PRESENT [Anthony Fu](https://github.com/antfu)
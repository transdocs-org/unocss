---
title: 变体
description: 变体允许你对现有的规则应用一些变化。
---

# 变体

[变体（Variants）](https://windicss.org/utilities/general/variants.html) 允许你对现有的规则应用一些变化，比如 Tailwind CSS 中的 `hover:` 变体。

## 示例

<!--eslint-skip-->

```ts
variants: [
  // hover:
  (matcher) => {
    if (!matcher.startsWith('hover:'))
      return matcher
    return {
      // 去除 `hover:` 前缀并传递给下一轮的变体和规则
      matcher: matcher.slice(6),
      selector: s => `${s}:hover`,
    }
  },
],
rules: [
  [/^m-(\d)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
]
```

- `matcher` 控制何时启用该变体。如果返回值是一个字符串，它将被用作匹配规则的选择器。
- `selector` 提供了自定义生成的 CSS 选择器的功能。

## 底层原理

让我们看看匹配 `hover:m-2` 时发生了什么：

- `hover:m-2` 从用户的使用中被提取出来
- `hover:m-2` 被发送给所有变体进行匹配
- 我们的变体匹配了 `hover:m-2` 并返回 `m-2`
- 结果 `m-2` 将用于下一轮变体的匹配
- 如果没有其他变体匹配，`m-2` 接下来会去匹配规则
- 我们的第一个规则匹配成功并生成 `.m-2 { margin: 0.5rem; }`
- 最后，我们将变体的转换应用到生成的 CSS 上。在这个例子中，我们在 `selector` 钩子中前置了 `:hover`

最终生成的 CSS 如下：

<!-- eslint-skip -->

```css
.hover\:m-2:hover { margin: 0.5rem; }
```

这样，当用户将鼠标悬停在元素上时，才会应用 `m-2` 的样式。

## 进阶用法

变体系统非常强大，本指南无法完全涵盖其所有功能。你可以查看 [默认预设的实现](https://github.com/unocss/unocss/tree/main/packages-presets/preset-mini/src/_variants) 来了解更多高级用法。
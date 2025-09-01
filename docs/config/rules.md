---
title: 规则
description: 为 UnoCSS 编写自定义规则非常简单。
---

# 规则

规则用于定义工具类及其生成的 CSS。UnoCSS 拥有许多内置规则，同时也支持轻松添加自定义规则。

## 静态规则

以这个例子为例：

```ts
rules: [
  ['m-1', { margin: '0.25rem' }],
]
```

每当在用户的代码库中检测到 `m-1` 时，就会生成以下 CSS：

<!-- eslint-skip -->

```css
.m-1 { margin: 0.25rem; }
```

> **注意**：样式体语法遵循 CSS 属性语法，例如使用 `font-weight` 而不是 `fontWeight`。如果属性名中包含连字符 `-`，则需要使用引号括起来。
>
> ```ts
> rules: [
>   ['font-bold', { 'font-weight': 700 }],
> ]
> ```

## 动态规则

为了让规则更智能，可以将匹配器改为 `RegExp`，并将样式体改为函数：

```ts
rules: [
  [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
  [/^p-(\d+)$/, match => ({ padding: `${match[1] / 4}rem` })],
]
```

样式体函数的第一个参数是 `RegExp` 的匹配结果，可以通过解构获取匹配的分组。

例如，使用以下 HTML：

```html
<div class="m-100">
  <button class="m-3">
    <icon class="p-5" />
    My Button
  </button>
</div>
```

将生成以下 CSS：

<!-- eslint-skip -->

```css
.m-100 { margin: 25rem; }
.m-3 { margin: 0.75rem; }
.p-5 { padding: 1.25rem; }
```

恭喜！现在你已经拥有了自己强大的原子 CSS 工具类。尽情使用吧！

## CSS 规则回退

在某些情况下，你可能希望利用 CSS 规则回退来使用新 CSS 特性，同时支持旧浏览器。你可以选择返回一个二维数组作为具有相同键的规则的 CSS 表示。例如：

```ts
rules: [
  [/^h-(\d+)dvh$/, ([_, d]) => {
    return [
      ['height', `${d}vh`],
      ['height', `${d}dvh`],
    ]
  }],
]
```

这将使 `h-100dvh` 生成：

<!-- eslint-skip -->

```css
.h-100dvh { height: 100vh; height: 100dvh; }
```

## 排序

UnoCSS 在生成的 CSS 中会尊重你定义规则的顺序，后面的规则具有更高的优先级。

当使用动态规则时，可能会匹配多个 token。默认情况下，这些在单个动态规则下匹配的结果将在组内按字母顺序排序。

## 规则合并

默认情况下，UnoCSS 会合并具有相同样式体的 CSS 规则以最小化 CSS 文件大小。

例如，`<div class="m-2 hover:m2">` 将生成：

```css
.hover\:m2:hover,
.m-2 {
  margin: 0.5rem;
}
```

而不是两个独立的规则：

```css
.hover\:m2:hover {
  margin: 0.5rem;
}
.m-2 {
  margin: 0.5rem;
}
```

## 特殊符号

自 v0.61 起，UnoCSS 支持使用特殊符号来为生成的 CSS 定义额外的元信息。你可以在动态规则匹配函数的第二个参数中访问这些符号。

例如：

```ts
rules: [
  [/^grid$/, ([, d], { symbols }) => {
    return {
      [symbols.parent]: '@supports (display: grid)',
      display: 'grid',
    }
  }],
]
```

将生成：

```css
@supports (display: grid) {
  .grid {
    display: grid;
  }
}
```

### 可用符号

- `symbols.parent`: 生成的 CSS 规则的父级包装器（如 `@supports`, `@media` 等）
- `symbols.selector`: 一个函数，用于修改生成的 CSS 规则的选择器（见下面示例）
- `symbols.layer`: 一个字符串/函数/正则表达式匹配，用于设置生成的 CSS 规则所属的 UnoCSS 层
- `symbols.variants`: 应用于当前 CSS 对象的变体处理器数组
- `symbols.shortcutsNoMerge`: 一个布尔值，用于禁用当前规则在快捷方式中的合并
- `symbols.noMerge`: 一个布尔值，用于禁用当前规则在快捷方式中的合并
- `symbols.sort`: 一个数字，用于覆盖当前 CSS 对象的排序顺序

## 多选择器规则

自 v0.61 起，UnoCSS 支持通过 [JavaScript 生成器函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator) 来定义多选择器规则。

例如：

```ts
rules: [
  [/^button-(.*)$/, function* ([, color], { symbols }) {
    yield {
      background: color
    }
    yield {
      [symbols.selector]: selector => `${selector}:hover`,
      // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix
      background: `color-mix(in srgb, ${color} 90%, black)`
    }
  }],
]
```

将生成多个 CSS 规则：

```css
.button-red {
  background: red;
}
.button-red:hover {
  background: color-mix(in srgb, red 90%, black);
}
```

## 完全控制规则

::: tip
这是一个高级功能，在大多数情况下不会用到。
:::

当你确实需要一些 [动态规则](#dynamic-rules) 和 [变体](/config/variants) 的组合无法覆盖的高级规则时，UnoCSS 还提供了一种方法，让你完全控制生成的 CSS。

你可以从动态规则的样式体函数中返回一个字符串，该字符串将 **直接** 被写入生成的 CSS 中（这也意味着你需要自己处理 CSS 转义、变体应用、CSS 构建等）。

```ts [uno.config.ts]
import { defineConfig, toEscapedSelector as e } from 'unocss'

export default defineConfig({
  rules: [
    [/^custom-(.+)$/, ([, name], { rawSelector, currentSelector, variantHandlers, theme }) => {
      // 丢弃不匹配的规则
      if (name.includes('something'))
        return

      // 如果需要，可以禁用此规则的变体
      if (variantHandlers.length)
        return
      const selector = e(rawSelector)
      // 返回一个字符串而不是对象
      return `
${selector} {
  font-size: ${theme.fontSize.sm};
}
/* 你可以定义多个规则 */
${selector}::after {
  content: 'after';
}
.foo > ${selector} {
  color: red;
}
/* 或者媒体查询 */
@media (min-width: ${theme.breakpoints.sm}) {
  ${selector} {
    font-size: ${theme.fontSize.sm};
  }
}
`
    }],
  ],
})
```
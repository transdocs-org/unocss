---
title: 主题
description: UnoCSS 同样支持你在 Tailwind CSS / Windi CSS 中可能已经熟悉的主题系统。
outline: deep
---

# 主题

UnoCSS 同样支持你在 Tailwind CSS / Windi CSS 中可能已经熟悉的主题系统。在用户层面，你可以在配置中指定 `theme` 属性，它将与默认主题进行深度合并。

## 使用方法

<!--eslint-skip-->

```ts
theme: {
  // ...
  colors: {
    veryCool: '#0000ff', // class="text-very-cool"
    brand: {
      primary: 'hsl(var(--hue, 217) 78% 51%)', // class="bg-brand-primary"
      DEFAULT: '#942192' // class="bg-brand"
    },
  },
}
```

::: tip
在解析过程中，`theme` 始终会存在于 `context` 中。
:::

### 在 `rules` 中使用

在规则中使用主题：

```ts
rules: [
  [/^text-(.*)$/, ([, c], { theme }) => {
    if (theme.colors[c])
      return { color: theme.colors[c] }
  }],
]
```

### 在 `variants` 中使用

在变体中使用主题：

```ts
variants: [
  {
    name: 'variant-name',
    match(matcher, { theme }) {
      // ...
    },
  },
]
```

### 在 `shortcuts` 中使用

在动态快捷方式中使用主题：

```ts
shortcuts: [
  [/^badge-(.*)$/, ([, c], { theme }) => {
    if (Object.keys(theme.colors).includes(c))
      return `bg-${c}4:10 text-${c}5 rounded`
  }],
]
```

## 断点（Breakpoints）

::: warning
当提供自定义的 `breakpoints` 对象时，它会覆盖默认的断点而不是合并。
:::

以下示例中，你只能使用 `sm:` 和 `md:` 断点变体：

<!--eslint-skip-->

```ts
theme: {
  // ...
  breakpoints: {
    sm: '320px',
    md: '640px',
  },
}
```

如果你想继承原始主题的断点，可以使用 `extendTheme`：

```ts
extendTheme: (theme) => {
  return {
    ...theme,
    breakpoints: {
      ...theme.breakpoints,
      sm: '320px',
      md: '640px',
    },
  }
}
```

::: info
`verticalBreakpoints` 与 `breakpoints` 相同，但用于垂直布局。
:::

此外，我们会根据大小对屏幕断点进行排序（相同单位）。对于不同单位的断点，为了避免错误，请在配置中统一使用相同的单位。

<!--eslint-skip-->

```ts
theme: {
  // ...
  breakpoints: {
    sm: '320px',
    // 因为 uno 不支持不同单位大小的比较排序，请转换为相同单位。
    // md: '40rem',
    md: `${40 * 16}px`,
    lg: '960px',
  },
}
```

## extendTheme

`extendTheme` 允许你编辑 **深度合并后的主题**，以获取完整的主题对象。

自定义函数可以直接修改主题对象：

```ts
extendTheme: (theme) => {
  theme.colors.veryCool = '#0000ff' // class="text-very-cool"
  theme.colors.brand = {
    primary: 'hsl(var(--hue, 217) 78% 51%)', // class="bg-brand-primary"
  }
}
```

也可以返回一个新的主题对象，从而完全替换原主题：

```ts
extendTheme: (theme) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      veryCool: '#0000ff', // class="text-very-cool"
      brand: {
        primary: 'hsl(var(--hue, 217) 78% 51%)', // class="bg-brand-primary"
      },
    },
  }
}
```
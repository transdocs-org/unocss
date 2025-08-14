---
title: 快捷类
description: UnoCSS 提供的快捷类功能与 Windi CSS 的功能相似。
---

# 快捷类

受 [Windi CSS](https://windicss.org/features/shortcuts.html) 的启发，快捷类允许你将多个规则组合成一个简写的类名。

## 使用方法

<!--eslint-skip-->

```ts
shortcuts: {
  // 多个工具类的快捷方式
  'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
  'btn-green': 'text-white bg-green-500 hover:bg-green-700',
  // 单个工具类的别名
  'red': 'text-red-100',
}
```

除了简单的映射之外，UnoCSS 还允许你定义动态快捷类。

类似于 [规则](/config/rules)，动态快捷类由一个匹配器 `RegExp` 和一个处理函数组成。

```ts
shortcuts: [
  // 你仍然可以使用对象形式
  {
    btn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
  },
  // 动态快捷类
  [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
]
```

有了这个定义，我们可以使用 `btn-green` 和 `btn-red` 来生成以下 CSS：

```css
.btn-green {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  --un-bg-opacity: 1;
  background-color: rgb(74 222 128 / var(--un-bg-opacity));
  border-radius: 0.5rem;
  --un-text-opacity: 1;
  color: rgb(220 252 231 / var(--un-text-opacity));
}
.btn-red {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  --un-bg-opacity: 1;
  background-color: rgb(248 113 113 / var(--un-bg-opacity));
  border-radius: 0.5rem;
  --un-text-opacity: 1;
  color: rgb(254 226 226 / var(--un-text-opacity));
}
```
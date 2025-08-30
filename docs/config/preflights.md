---
title: 预检
description: 你可以从配置中注入原始 CSS 作为预检。解析后的 `theme` 可用于自定义 CSS。
---

# 预检

你可以从配置中注入原始 CSS 作为预检。解析后的 `theme` 可用于自定义 CSS。

<!--eslint-skip-->

```ts
preflights: [
  {
    getCSS: ({ theme }) => `
      * {
        color: ${theme.colors.gray?.[700] ?? '#333'};
        padding: 0;
        margin: 0;
      }
    `,
  },
]
```
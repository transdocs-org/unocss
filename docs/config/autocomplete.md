# 自动补全

可以在 <a href="/play" target="_blank" rel="noreferrer">playground</a> 和 [VS Code 扩展](/integrations/vscode) 中对 UnoCSS 的智能建议进行自定义。

<!--eslint-skip-->

```ts
autocomplete: {
  templates: [
    // 主题推断
    'bg-$color/<opacity>',
    // 简写
    'text-<font-size>',
    // 逻辑或组合
    '(b|border)-(solid|dashed|dotted|double|hidden|none)',
    // 常量
    'w-half',
  ],
  shorthands: {
    // 等价于 `opacity: "(0|10|20|30|40|50|60|70|90|100)"`
    'opacity': Array.from({ length: 11 }, (_, i) => i * 10),
    'font-size': '(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)',
    // 覆盖内置简写
    'num': '(0|1|2|3|4|5|6|7|8|9)',
  },
  extractors: [
      // ...extractors
  ],
}
```

- `templates` 使用简单的 DSL 来指定自动补全的建议。

- `shorthands` 是简写名称及其模板的映射。如果值是一个 `Array`，则表示一个逻辑或组。

- `extractors` 用于提取可能的类，并将类名风格的建议转换为正确的格式。例如，你可以查看我们如何实现 [attributify 自动补全提取器](https://github.com/unocss/unocss/blob/main/packages-presets/preset-attributify/src/autocomplete.ts)。

- 如需更多帮助，请参考[此处](/tools/autocomplete)。
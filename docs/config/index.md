---
title: 配置 UnoCSS
description: 配置是 UnoCSS 强大的原因。
outline: deep
---

# 配置 UnoCSS

## 配置

配置是 UnoCSS 强大的原因。

- [规则](/config/rules) - 定义原子 CSS 工具类
- [快捷方式](/config/shortcuts) - 将多个规则组合成单个简写
- [主题](/config/theme) - 定义主题变量
- [变体](/config/variants) - 对规则应用自定义约定
- [提取器](/config/extractors) - 定义从何处以及如何提取工具类的使用
- [预置样式](/config/preflights) - 定义全局原始 CSS
- [层级](/config/layers) - 定义每个工具类层级的顺序
- [预设](/config/presets) - 常见用例的预定义配置
- [转换器](/config/transformers) - 对用户源代码进行转换以支持约定的代码转换器
- [自动补全](/config/autocomplete) - 定义自定义的自动补全建议

## 选项

### rules

- **类型：** `Rule<Theme>[]`

用于生成 CSS 工具类的规则。后出现的条目优先级更高。

### shortcuts

- **类型：** `UserShortcuts<Theme>`

类似于 Windi CSS 的快捷方式，允许通过组合现有工具类创建新的工具类。后出现的条目优先级更高。

### theme

- **类型：** `Theme`

用于规则之间共享配置的主题对象。

### extendTheme

- **类型：** `Arrayable<ThemeExtender<Theme>>`

自定义函数，用于修改主题对象。

也可以返回一个新的主题对象来完全替换原始对象。

### variants

- **类型：** `Variant<Theme>[]`

预处理选择器的变体，能够重写 CSS 对象。

### extractors

- **类型：** `Extractor[]`

处理源文件并输出可能的类/选择器的提取器。可以感知语言。

### preflights

- **类型：** `Preflight<Theme>[]`

原始 CSS 注入。

### layers

- **类型：** `Record<string, number>`

层级顺序。默认为 0。

### outputToCssLayers

- **类型：** `boolean | UseCssLayersOptions`
- **默认：** `false`

将层级输出到 CSS 层叠层级。

#### cssLayerName

- **类型：** `(internalLayer: string) => string | undefined | null`

指定内部层级应输出到的 CSS 层级名称（可以是子层级，例如 "mylayer.mysublayer"）。

如果返回 `undefined`，则使用内部层级名称作为 CSS 层级名称。
如果返回 `null`，则内部层级不会输出到 CSS 层级。

### sortLayers

- **类型：** `(layers: string[]) => string[]`

用于排序层级的自定义函数。

### presets

- **类型：** `(PresetOrFactory<Theme> | PresetOrFactory<Theme>[])[]`

常见用例的预定义配置。

### transformers

- **类型：** `SourceCodeTransformer[]`

对源代码的自定义转换器。

### blocklist

- **类型：** `BlocklistRule[]`

排除设计系统中选择器的规则（缩小可能性）。结合 `warnExcluded` 选项也可以帮助您识别错误的使用方式。

### safelist

- **类型：** `string[]`

始终包含的工具类。

### preprocess

- **类型：** `Arrayable<Preprocessor>`

预处理传入的工具类，返回假值以排除。

### postprocess

- **类型：** `Arrayable<Postprocessor>`

后处理生成的工具对象。

### separators

- **类型：** `Arrayable<string>`
- **默认：** `[':', '-']`

变体分隔符。

### extractorDefault

- **类型：** `Extractor | null | false`
- **默认：** `import('@unocss/core').defaultExtractor`

始终应用的默认提取器。默认情况下，它按空格和引号分割源代码。

它可能被预设或用户配置替换，只能存在一个默认提取器，后出现的会覆盖之前的。

传入 `null` 或 `false` 以禁用默认提取器。

### autocomplete

自动补全的附加选项。

#### templates

- **类型：** `Arrayable<AutoCompleteFunction | AutoCompleteTemplate>`

提供自动补全建议的自定义函数 / 模板。

#### extractors

- **类型：** `Arrayable<AutoCompleteExtractor>`

拾取可能的类并转换类名样式建议为正确格式的自定义提取器。

#### shorthands

- **类型：** `Record<string, string | string[]>`

提供自动补全建议的自定义快捷方式。如果值是数组，它将用 `|` 连接并用 `()` 包裹。

### content

用于提取工具类使用情况的源的选项。

支持的源：

- `filesystem` - 从文件系统提取
- `inline` - 从纯内联文本中提取
- `pipeline` - 从构建工具的转换管道中提取，例如 Vite 和 Webpack

从每个源提取的使用情况将合并在一起。

#### filesystem

- **类型：** `string[]`
- **默认：** `[]`

除了其他内容源外，从文件系统提取的 glob 模式。默认忽略 `node_modules`，但当您指定的路径包含 `node_modules` 时，unocss 将从中扫描。

在开发模式下，这些文件将被监听并触发 HMR。

#### inline

- **类型：** `string | { code: string; id?: string } | (() => Awaitable<string | { code: string; id?: string }>)) []`

要提取的内联文本。

#### pipeline

过滤器，用于确定是否从构建工具的转换管道中提取某些模块。

目前仅适用于 Vite 和 Webpack 集成。

设置为 `false` 以禁用。

##### include

- **类型：** `FilterPattern`
- **默认：** `[/\.(vue|svelte|[jt]sx|vine.ts|mdx?|astro|elm|php|phtml|html)($|\?)/]`

过滤要提取的文件的模式。支持正则表达式和 `picomatch` glob 模式。

默认情况下，**不会**提取 `.ts` 和 `.js` 文件。

##### exclude

- **类型：** `FilterPattern`
- **默认：** `[/\.(css|postcss|sass|scss|less|stylus|styl)($|\?)/]`

过滤**不**要提取的文件的模式。支持正则表达式和 `picomatch` glob 模式。

默认情况下，`node_modules` 和 `dist` 也会被提取。

### configResolved

- **类型：** `(config: ResolvedConfig) => void`

用于修改解析后的配置的钩子。

首先运行预设，然后是用户配置。

### configFile

- **类型：** `string | false`

从配置文件加载。

设置为 `false` 以禁用。

### configDeps

- **类型：** `string[]`

将触发配置重新加载的文件列表。

### cli

UnoCSS CLI 选项。

#### entry

- **类型：** `Arrayable<CliEntryItem>`

UnoCSS CLI 的入口点。

##### patterns

- **类型：** `string[]`

从文件系统提取的 glob 模式。

##### outFile

- **类型：** `string`

输出文件路径。

### shortcutsLayer

- **类型：** `string`
- **默认：** `'shortcuts'`

快捷方式的布局名称。

### envMode

- **类型：** `'dev' | 'build'`
- **默认：** `'build'`

环境模式。

### details

- **类型：** `boolean`

暴露内部细节用于调试 / 检查。

### warn

- **类型：** `boolean`
- **默认：** `true`

当匹配的选择器出现在黑名单中时发出警告。
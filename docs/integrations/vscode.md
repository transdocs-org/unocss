---
title: UnoCSS VS Code 扩展
description: 适用于 VS Code 的 UnoCSS。
---

# VS Code 扩展

[在 Marketplace 中安装](https://marketplace.visualstudio.com/items?itemName=antfu.unocss)

- 为匹配的工具类添加装饰和提示信息
- 自动加载配置
- 显示匹配的工具类数量

## 命令

<!-- commands -->

| 命令                         | 标题                                           |
| ---------------------------- | ---------------------------------------------- |
| `unocss.reload`              | UnoCSS：重新加载 UnoCSS                       |
| `unocss.insert-skip-annotation` | UnoCSS：为选中区域插入 `@unocss-skip` 注释 |

<!-- commands -->

## 配置项

<!-- configs -->

| 键名                             | 描述                                                       | 类型           | 默认值     |
| -------------------------------- | ------------------------------------------------------------ | -------------- | ---------- |
| `unocss.disable`                | 禁用 UnoCSS 扩展                                             | `boolean`      | `false`    |
| `unocss.languageIds`            |                                                              | `array`        | ``         |
| `unocss.root`                   | 包含 UnoCSS 配置文件的项目根目录                             | `array,string` | ``         |
| `unocss.include`                | 需要检测的文件目录                                           | `array,string` | ``         |
| `unocss.exclude`                | 不需要检测的文件目录                                         | `array,string` | ``         |
| `unocss.underline`              | 启用/禁用类名的下划线装饰                                    | `boolean`      | `true`     |
| `unocss.colorPreview`           | 启用/禁用颜色预览装饰                                        | `boolean`      | `true`     |
| `unocss.colorPreviewRadius`     | 颜色预览的圆角半径                                           | `string`       | `"50%"`    |
| `unocss.remToPxPreview`         | 启用/禁用在悬停时显示 rem 到 px 的预览                       | `boolean`      | `true`     |
| `unocss.remToPxRatio`           | rem 到 px 的转换比例                                         | `number`       | `16`       |
| `unocss.selectionStyle`         | 启用/禁用选中样式装饰                                        | `boolean`      | `true`     |
| `unocss.strictAnnotationMatch`  | 严格限制注释提示的显示位置                                   | `boolean`      | `false`    |
| `unocss.autocomplete.matchType` | 自动补全的匹配类型                                           | `string`       | `"prefix"` |
| `unocss.autocomplete.strict`    | 严格限制自动补全的显示位置                                   | `boolean`      | `false`    |
| `unocss.autocomplete.maxItems`  | 自动补全中显示的最大项目数                                   | `number`       | `1000`     |

<!-- configs -->

## 配置

为了获得最佳的 IDE 使用体验，我们建议你[使用单独的 `uno.config.ts` 文件](/guide/config-file)来配置你的 UnoCSS。

该扩展会尝试在你的项目中查找 UnoCSS 配置。如果没有找到配置文件，扩展将被禁用。

## 图标预设

如果你正在使用 [图标预设](/presets/icons)，你还可以安装 [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)，以获得图标的内嵌预览、自动补全以及悬停信息提示。
---
title: 包
description: "UnoCSS 包：可用的包及其在 unocss 中包含和启用的内容。"
outline: deep
---

# 包

UnoCSS 是一个包含多个包的单体仓库。本页面列出了所有包以及 `unocss` 包中包含的内容：

| 包                                                              | 描述                                       | 包含在 `unocss` 中 | 已启用 |
| ---------------------------------------------------------------- | ------------------------------------------ | ------------------ | ------ |
| [@unocss/core](/tools/core)                                      | 不包含预设的核心库                         | ✅                | -      |
| [@unocss/cli](/integrations/cli)                                 | UnoCSS 的命令行接口                        | ✅                | -      |
| [@unocss/preset-mini](/presets/mini)                             | 最小但必要的规则和变体                     | ✅                | ✅     |
| [@unocss/preset-wind3](/presets/wind3)                           | Tailwind CSS / Windi CSS 精简预设          | ✅                | ✅     |
| [@unocss/preset-wind4](/presets/wind4)                           | Tailwind4 CSS 精简预设                     | ✅                | ✅     |
| [@unocss/preset-attributify](/presets/attributify)               | 为其他规则启用 attributify 模式            | ✅                | 否     |
| [@unocss/preset-tagify](/presets/tagify)                         | 为其他规则启用 tagify 模式                 | ✅                | 否     |
| [@unocss/preset-icons](/presets/icons)                           | 基于 Iconify 的纯 CSS 图标解决方案          | ✅                | 否     |
| [@unocss/preset-web-fonts](/presets/web-fonts)                   | 网络字体（如 Google Fonts）支持            | ✅                | 否     |
| [@unocss/preset-typography](/presets/typography)                 | 排版预设                                   | ✅                | 否     |
| [@unocss/preset-rem-to-px](/presets/rem-to-px)                   | 将 rem 转换为 px 的工具                    | 否                | 否     |
| [@unocss/preset-legacy-compat](/presets/legacy-compat)           | 旧版兼容性实用工具集合                     | 否                | 否     |
| [@unocss/transformer-variant-group](/transformers/variant-group) | Windi CSS 变体组功能的转换器               | ✅                | 否     |
| [@unocss/transformer-directives](/transformers/directives)       | 类似 `@apply` 的 CSS 指令转换器            | ✅                | 否     |
| [@unocss/transformer-compile-class](/transformers/compile-class) | 将多个类编译为一个类                       | ✅                | 否     |
| [@unocss/transformer-attributify-jsx](/transformers/attributify-jsx) | 在 JSX/TSX 中支持无值的 attributify       | ✅                | 否     |
| [@unocss/extractor-pug](/extractors/pug)                         | Pug 解析器                                 | 否                | -      |
| [@unocss/extractor-svelte](/extractors/svelte)                   | Svelte 解析器                              | 否                | -      |
| [@unocss/autocomplete](/tools/autocomplete)                      | 自动补全工具                               | 否                | -      |
| [@unocss/config](/guide/config-file)                             | 配置文件加载器                             | ✅                | -      |
| [@unocss/reset](/guide/style-reset)                              | 常见 CSS 重置集合                          | ✅                | 否     |
| [@unocss/vite](/integrations/vite)                               | Vite 插件                                  | ✅                | -      |
| [@unocss/inspector](/tools/inspector)                            | UnoCSS 的检查器 UI                         | ✅                | -      |
| [@unocss/astro](/integrations/astro)                             | Astro 集成                                 | ✅                | -      |
| [@unocss/webpack](/integrations/webpack)                         | Webpack 插件                               | 否                | -      |
| [@unocss/nuxt](/integrations/nuxt)                               | Nuxt 模块                                  | 否                | -      |
| [@unocss/svelte-scoped](/integrations/svelte-scoped)             | Svelte Scoped Vite 插件 + 预处理器         | 否                | -      |
| [@unocss/next](/integrations/next)                               | Next.js 插件                               | 否                | -      |
| [@unocss/runtime](/integrations/runtime)                         | UnoCSS 的 CSS-in-JS 运行时                 | 否                | -      |
| [@unocss/eslint-plugin](/integrations/eslint)                    | ESLint 插件                                | 否                | -      |
| [@unocss/eslint-config](/integrations/eslint)                    | ESLint 配置                                | 否                | -      |
| [@unocss/postcss](/integrations/postcss)                         | PostCSS 插件                               | 否                | -      |
| [VS Code 扩展](/integrations/vscode)                            | VS Code 的 UnoCSS 插件                     | -                 | -      |
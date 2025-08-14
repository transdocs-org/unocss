---
outline: deep
---

# 为什么选择 UnoCSS？

## 动机

我们建议你阅读 UnoCSS 创建者 [Anthony Fu](https://antfu.me/) 撰写的博客文章 [Reimagine Atomic CSS](https://antfu.me/posts/reimagine-atomic-css)，以更好地了解 UnoCSS 背后的设计动机。

## UnoCSS 与 X 有何不同？

### Windi CSS

UnoCSS 由 [Windi CSS](https://windicss.org/) 团队的一名成员发起，很多灵感来源于我们在 Windi CSS 中所做的工作。尽管 Windi CSS 已不再积极维护（截至 2023 年 3 月），你可以将 UnoCSS 看作是 Windi CSS 的 _“精神继任者”_。

UnoCSS 继承了 Windi CSS 的按需生成特性、[属性模式](/presets/attributify)、[快捷类](/config/shortcuts)、[变体组](/transformers/variant-group)、[编译模式](/transformers/compile-class) 等功能。除此之外，UnoCSS 从零开始构建，充分考虑了最大化的可扩展性和性能，从而让我们能够引入一些新功能，如 [纯 CSS 图标](/presets/icons)、[无值属性模式](/presets/attributify#valueless-attributify)、[标签模式](/presets/tagify)、[网页字体](/presets/web-fonts) 等。

最重要的是，UnoCSS 被抽象为一个原子 CSS 引擎，所有功能都是可选的，让你可以轻松创建自己的约定、自己的设计系统和自己的预设——完全根据你所需功能的组合来实现。

### Tailwind CSS

Windi CSS 和 UnoCSS 都从 [Tailwind CSS](https://tailwindcss.com/) 中汲取了大量灵感。由于 UnoCSS 是从零构建的，我们得以全面回顾原子 CSS 的设计历史，并将其抽象为一个优雅且强大的 API。由于设计理念的显著不同，UnoCSS 与 Tailwind CSS 并不能进行直接的对比。但我们仍会列出一些主要差异。

Tailwind CSS 是一个 PostCSS 插件，而 UnoCSS 是一个同构引擎，并提供了一整套与构建工具的一流集成（包括一个 [PostCSS 插件](/integrations/postcss)）。这意味着 UnoCSS 可以更灵活地用于各种场景（例如 [CDN 运行时](/integrations/runtime)，它可以动态生成 CSS），并能与构建工具深度集成，提供更好的热更新（HMR）、性能和开发者体验（例如 [检查器](/tools/inspector)）。

从技术权衡的角度来看，UnoCSS 也设计为完全可扩展和可定制的，而 Tailwind CSS 则更具“主观性”。在 Tailwind CSS 上构建一个自定义的设计系统（或设计令牌）可能比较困难，并且你无法真正脱离 Tailwind CSS 的约定。使用 UnoCSS，你几乎可以完全掌控地构建任何你想要的东西。例如，我们在 [一个预设中实现了完整的 Tailwind CSS 兼容工具集](/presets/wind3)，并且社区中还存在大量 [基于其他有趣理念实现的预设](/presets/community)。

得益于 UnoCSS 提供的灵活性，我们可以在其基础上尝试许多创新功能，例如：

- [纯 CSS 图标](/presets/icons)
- [属性模式](/presets/attributify)
- [变体组](/transformers/variant-group)
- [快捷类](/config/shortcuts)
- [标签模式](/presets/tagify)
- [网页字体](/presets/web-fonts)
- [CDN 运行时](/integrations/runtime)
- [检查器](/tools/inspector)

由于与 Tailwind CSS 在设计目标上的差异，UnoCSS 并不支持 Tailwind CSS 的插件系统或配置方式，这意味着从一个深度定制的 Tailwind CSS 项目迁移过来可能会比较困难。这是一个有意为之的决策，目的是使 UnoCSS 高性能且可扩展，我们认为这种权衡是值得的。
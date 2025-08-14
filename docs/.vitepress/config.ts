import type { DefaultTheme } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import { version } from '../../package.json'

const ogUrl = 'https://unocss.dev/'
const ogImage = `${ogUrl}og.png#1`
const title = 'UnoCSS 中文文档'
const description = '即时按需原子化 CSS 引擎 | UnoCSS 中文文档，每日定时更新。'

const Guides: DefaultTheme.NavItemWithLink[] = [
  { text: '开始', link: '/guide/' },
  { text: '为什么选择 UnoCSS？', link: '/guide/why' },
  { text: '预设', link: '/guide/presets' },
  { text: '样式重置', link: '/guide/style-reset' },
  { text: '配置文件', link: '/guide/config-file' },
  { text: '提取与安全列表', link: '/guide/extracting' },
]

const Configs: DefaultTheme.NavItemWithLink[] = [
  { text: '概述', link: '/config/' },
  { text: '规则', link: '/config/rules' },
  { text: '快捷方式', link: '/config/shortcuts' },
  { text: '主题', link: '/config/theme' },
  { text: '变体', link: '/config/variants' },
  { text: '提取器', link: '/config/extractors' },
  { text: '转换器', link: '/config/transformers' },
  { text: '预初始化样式', link: '/config/preflights' },
  { text: '层级', link: '/config/layers' },
  { text: '自动补全', link: '/config/autocomplete' },
  { text: '预设', link: '/config/presets' },
]

const Integrations: DefaultTheme.NavItemWithLink[] = [
  { text: 'Vite', link: '/integrations/vite' },
  { text: 'Nuxt', link: '/integrations/nuxt' },
  { text: 'Next', link: '/integrations/next' },
  { text: 'Astro', link: '/integrations/astro' },
  { text: 'Svelte Scoped', link: '/integrations/svelte-scoped' },
  { text: 'Webpack', link: '/integrations/webpack' },
  { text: 'Runtime', link: '/integrations/runtime' },
  { text: 'CLI', link: '/integrations/cli' },
  { text: 'PostCSS', link: '/integrations/postcss' },
  { text: 'ESLint', link: '/integrations/eslint' },
  { text: 'VS Code 扩展', link: '/integrations/vscode' },
  { text: 'JetBrains IDE 插件', link: '/integrations/jetbrains' },
]

const Presets: DefaultTheme.NavItemWithLink[] = [
  { text: 'Mini', link: '/presets/mini' },
  { text: 'Wind3', link: '/presets/wind3' },
  { text: 'Wind4', link: '/presets/wind4' },
  { text: 'Icons', link: '/presets/icons' },
  { text: 'Attributify', link: '/presets/attributify' },
  { text: 'Typography', link: '/presets/typography' },
  { text: 'Web fonts', link: '/presets/web-fonts' },
  { text: 'Legacy Compat', link: '/presets/legacy-compat' },
  { text: 'Tagify', link: '/presets/tagify' },
  { text: 'Rem to px', link: '/presets/rem-to-px' },
]

const Transformers: DefaultTheme.NavItemWithLink[] = [
  { text: 'Variant Group', link: '/transformers/variant-group' },
  { text: 'Directives', link: '/transformers/directives' },
  { text: 'Compile Class', link: '/transformers/compile-class' },
  { text: 'Attributify JSX', link: '/transformers/attributify-jsx' },
]

const Extractors: DefaultTheme.NavItemWithLink[] = [
  { text: 'Pug Extractor', link: '/extractors/pug' },
  { text: 'MDC Extractor', link: '/extractors/mdc' },
  { text: 'Svelte Extractor', link: '/extractors/svelte' },
  { text: 'Arbitrary Variants Extractor', link: '/extractors/arbitrary-variants' },
]

const Tools: DefaultTheme.NavItemWithLink[] = [
  { text: 'Inspector', link: '/tools/inspector' },
  { text: 'Core', link: '/tools/core' },
  { text: 'Autocomplete', link: '/tools/autocomplete' },
]

const Resources: DefaultTheme.NavItemWithLink[] = [
  { text: 'Interactive Docs', link: '/interactive/', target: '_blank' },
  { text: 'Playground', link: '/play/', target: '_blank' },
  { text: 'Tutorial', link: 'https://tutorial.unocss.dev/', target: '_blank' },
]

const Introes: DefaultTheme.NavItemWithLink[] = [
  { text: '团队', link: '/team' },
]

const Nav: DefaultTheme.NavItem[] = [
  {
    text: '指南',
    items: [
      {
        text: '指南',
        items: Guides,
      },
    ],
    activeMatch: '^/guide/',
  },
  {
    text: '集成',
    items: [
      {
        text: '概述',
        link: '/integrations/',
      },
      {
        text: '集成',
        items: Integrations,
      },
      {
        text: '示例',
        link: '/integrations/#examples',
      },
    ],
    activeMatch: '^/integrations/',
  },
  {
    text: '配置',
    items: [
      {
        text: '配置文件',
        link: '/guide/config-file',
      },
      {
        text: '概念',
        items: Configs,
      },
    ],
    activeMatch: '^/config/',
  },
  {
    text: '预设',
    items: [
      {
        text: '概述',
        link: '/presets/',
      },
      {
        text: '社区预设',
        link: 'https://github.com/unocss-community',
      },
      {
        text: '预设',
        items: Presets,
      },
      {
        text: '转换器',
        items: Transformers,
      },
      {
        text: '提取器',
        items: Extractors,
      },
    ],
    activeMatch: '^/(presets|transformers|extractors)/',
  },
  {
    text: '资源',
    items: [
      ...Resources,
      {
        items: Introes,
      },
    ],
  },
  {
    text: `v${version}`,
    items: [
      {
        text: '更新日志',
        link: 'https://github.com/unocss/unocss/releases',
      },
      {
        text: '贡献指南',
        link: 'https://github.com/unocss/unocss/blob/main/.github/CONTRIBUTING.md',
      },
      {
        component: 'RainbowAnimationSwitcher',
        props: {
          text: '彩虹动画',
        },
      },
    ],
  },
]

const SidebarGuide: DefaultTheme.SidebarItem[] = [
  {
    text: '指南',
    items: Guides,
  },
  {
    text: '集成',
    items: [
      {
        text: '概述',
        link: '/integrations/',
      },
      ...Integrations,
      {
        text: '示例',
        link: '/integrations/#examples',
      },
    ],
  },
  {
    text: '配置',
    link: '/config/',
  },
  {
    text: '预设',
    link: '/presets/',
  },
]

const SidebarPresets: DefaultTheme.SidebarItem[] = [
  {
    text: '概述',
    link: '/presets/',
  },
  {
    text: '预设',
    collapsed: false,
    items: Presets,
  },
  {
    text: '社区预设',
    link: 'https://github.com/unocss-community',
  },
  {
    text: '转换器',
    collapsed: false,
    items: Transformers,
  },
  {
    text: '提取器',
    collapsed: false,
    items: Extractors,
  },
  {
    text: '其他包',
    collapsed: false,
    items: Tools,
  },
]

const SidebarConfig: DefaultTheme.SidebarItem[] = [
  {
    text: '配置',
    collapsed: false,
    items: Configs,
  },
  {
    text: '配置文件',
    link: '/guide/config-file',
  },
]

export default defineConfig({
  lang: 'zh-CN',
  title,
  titleTemplate: title,
  description,
  outDir: './dist',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: '/favicon.ico', type: 'image/png', sizes: '16x16' }],
    ['meta', { name: 'author', content: 'Anthony Fu' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: title }],
    ['meta', { name: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['meta', { name: 'twitter:site', content: '@antfu7' }],
    ['meta', { name: 'twitter:url', content: ogUrl }],
    ['link', { rel: 'search', type: 'application/opensearchdescription+xml', href: '/search.xml', title: 'UnoCSS' }],
    ['script', {
      defer: '',
      src: 'https://cdn.jsdmirror.com/gh/transdocs-org/cdn/transdocs-info-modal.js',
    }],
    ['script', {
      async: '',
      src: 'https://hm.baidu.com/hm.js?2fe1095387fd2f2c25892a4fde2f0cc2',
    }],
  ],
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: [
    /^\/play/,
    /^\/interactive/,
    /:\/\/localhost/,
  ],

  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    codeTransformers: [
      transformerTwoslash({
        processHoverInfo: info => info.replace(/_unocss_core\./g, ''),
      }),
    ],
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    nav: Nav,
    search: {
      provider: 'local',
    },
    sidebar: {
      '/guide/': SidebarGuide,
      '/integrations/': SidebarGuide,

      '/tools/': SidebarPresets,
      '/presets/': SidebarPresets,
      '/transformers/': SidebarPresets,
      '/extractors/': SidebarPresets,

      '/config/': SidebarConfig,
    },
    editLink: {
      pattern: 'https://github.com/unocss/unocss/edit/main/docs/:path',
      text: '建议修改此页面',
    },
    socialLinks: [
      { icon: 'bluesky', link: 'https://bsky.app/profile/unocss.dev' },
      { icon: 'github', link: 'https://github.com/unocss/unocss' },
      { icon: 'discord', link: 'https://chat.antfu.me' },
    ],
    footer: {
      message: 'MIT 协议发布。',
      copyright: '版权所有 © 2021-PRESENT transdocs.org',
    },
  },
})
---
title: UnoCSS CLI
description: UnoCSS 的 CLI 工具（@unocss/cli）。
---

# CLI

UnoCSS 的命令行接口：`@unocss/cli`。

- 🍱 适用于 Laravel 或 Kirby 等传统后端
- 👀 包含[监听模式](#development)
- 🔌 通过 [`uno.config.ts`](#configurations) 支持自定义配置

## 安装

此包随 `unocss` 包一起提供：

::: code-group

```bash [pnpm]
pnpm add -D unocss
```

```bash [yarn]
yarn add -D unocss
```

```bash [npm]
npm install -D unocss
```

```bash [bun]
bun add -D unocss
```

:::

你也可以安装独立包：

::: code-group

```bash [pnpm]
pnpm add -D @unocss/cli
```

```bash [yarn]
yarn add -D @unocss/cli
```

```bash [npm]
npm install -D @unocss/cli
```

```bash [bun]
bun add -D @unocss/cli
```

:::

::: info
如果你无法找到二进制文件（例如使用 `pnpm` 且仅安装了 `unocss`），你需要显式安装独立包 `@unocss/cli`。
:::

## 使用

你也可以将多个 glob 模式传递给 `@unocss/cli`：

```bash
unocss "site/snippets/**/*.php" "site/templates/**/*.php"
```

示例 package 配置：

::: info
确保在 npm 脚本的 glob 模式中添加转义引号。
:::

```json [package.json]
{
  "scripts": {
    "dev": "unocss \"site/{snippets,templates}/**/*.php\" --watch",
    "build": "unocss \"site/{snippets,templates}/**/*.php\""
  },
  "devDependencies": {
    "@unocss/cli": "latest"
  }
}
```

### 开发

添加 `--watch`（或 `-w`）标志以启用文件变更监听：

```bash
unocss "site/{snippets,templates}/**/*.php" --watch
```

### 生产

```bash
unocss "site/{snippets,templates}/**/*.php"
```

默认情况下，最终的 `uno.css` 将生成到当前目录。

## 内置功能

### 配置

在项目根目录创建 `uno.config.js` 或 `uno.config.ts` 配置文件以自定义 UnoCSS。

```ts [uno.config.ts]
import { defineConfig } from 'unocss'

export default defineConfig({
  cli: {
    entry: {}, // CliEntryItem | CliEntryItem[]
  },
  // ...
})

interface CliEntryItem {
  /**
   * Glob patterns to match files
   */
  patterns: string[]
  /**
   * The output filename for the generated UnoCSS file
   */
  outFile: string
}
```

有关选项列表，请查看 [UnoCSS 配置](/config/) 文档。

## 选项

| 选项                        |                                                                                                           |
| --------------------------- | --------------------------------------------------------------------------------------------------------- |
| `-v, --version`             | 显示当前 UnoCSS 版本                                                                                      |
| `-c, --config-file <file>`  | 配置文件                                                                                                   |
| `-o, --out-file <file>`     | 生成的 UnoCSS 文件的输出文件名。默认为当前工作目录下的 `uno.css`                                          |
| `--stdout`                  | 将生成的 UnoCSS 文件写入 STDOUT。会导致 `--watch` 和 `--out-file` 被忽略                                    |
| `-w, --watch`               | 指示是否监听 glob 模式找到的文件                                                                          |
| `--preflights`              | 启用预设样式                                                                                               |
| `--write-transformed`       | 用转换后的工具类更新源文件                                                                                 |
| `-m, --minify`              | 压缩生成的 CSS                                                                                             |
| `-h, --help`                | 显示可用的 CLI 选项                                                                                        |
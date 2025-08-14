# 配置文件

我们**强烈建议使用专用的 `uno.config.ts` 文件**来配置你的 UnoCSS，以获得最佳的 IDE 和其他集成体验。

一个功能完整的配置文件如下所示：

```ts twoslash [uno.config.ts]
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      // ...
    }
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
```

与在 `vite.config.ts` 或其他工具配置中的内联配置相比，使用专用的配置文件能够更好地与 [IDE](/integrations/vscode) 和其他集成工具（例如 [ESLint 插件](/integrations/eslint)）协同工作，同时还能改善 HMR 的行为。

默认情况下，UnoCSS 会自动在项目根目录中查找 `uno.config.{js,ts,mjs,mts}` 或 `unocss.config.{js,ts,mjs,mts}` 文件。你也可以手动指定配置文件，例如在 Vite 中：

```ts [vite.config.ts]
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS({
      configFile: '../my-uno.config.ts',
    }),
  ],
})
```

关于支持的完整配置选项列表，请参考[配置参考文档](/config/)。
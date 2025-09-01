# 预设

预设是部分配置，它们会被合并到主配置中。

在编写一个预设时，我们通常会导出一个构造函数，该函数可以接收一些预设特定的选项。例如：

```ts [my-preset.ts]
import { definePreset, Preset } from 'unocss'

export default definePreset((options?: MyPresetOptions) => {
  return {
    name: 'my-preset',
    rules: [
      // ...
    ],
    variants: [
      // ...
    ],
    // 它支持根配置中能使用到的大部分配置项
  }
})
```

然后用户可以像这样使用它：

```ts [uno.config.ts]
import { defineConfig } from 'unocss'
import myPreset from './my-preset'

export default defineConfig({
  presets: [
    myPreset({ /* 预设选项 */ }),
  ],
})
```

更多示例，可以查看[官方预设](/presets/)和[社区预设](/presets/community)。
# 转换器（Transformers）

提供统一的接口来转换源代码，以便支持特定的约定。

```ts [my-transformer.ts]
import { SourceCodeTransformer } from 'unocss'
import { createFilter } from 'unplugin-utils'

export default function myTransformers(options: MyOptions = {}): SourceCodeTransformer {
  return {
    name: 'my-transformer',
    enforce: 'pre', // 在其他转换器之前执行
    idFilter(id) {
      // 仅转换 .tsx 和 .jsx 文件
      return id.match(/\.[tj]sx$/)
    },
    async transform(code, id, { uno }) {
      // code 是一个 MagicString 实例
      code.appendRight(0, '/* my transformer */')
    },
  }
}
```

更多示例请查看[官方转换器](/presets/#transformers)。
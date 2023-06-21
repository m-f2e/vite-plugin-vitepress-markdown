import type { PluginOption, ResolvedConfig } from 'vite'
import type { UserOptions } from './typing'
import Parser from './parser'

const VitePluginVitePressMarkdown = (options?: UserOptions): PluginOption => {
  const opt = options ?? {}
  let parser: Parser | undefined
  return {
    name: 'vite-plugin-vitepress-markdown',
    // 读取配置
    async configResolved(_config: ResolvedConfig) {
      parser = new Parser(_config, opt)
      await parser.setupRender()
    },
    // 代码转换
    transform(code, id) {
      return parser?.transform(code, id)
    },
  }
}

export {
  VitePluginVitePressMarkdown,
  Parser,
}

export default VitePluginVitePressMarkdown

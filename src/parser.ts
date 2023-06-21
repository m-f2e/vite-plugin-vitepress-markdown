import type { ResolvedConfig } from 'vite'
import type { MarkdownRenderer, MarkdownEnv } from 'vitepress'
import { normalizePath } from 'vite'
import { createMarkdownRenderer } from 'vitepress'
import type { UserOptions } from './typing'
import { relative } from 'path'

class Parser {
  public md: MarkdownRenderer | undefined

  constructor(public readonly config: ResolvedConfig, public readonly options: UserOptions) {}

  // 初始化md解析器
  public async setupRender() {
    // 文件目录
    const srcDir = normalizePath(this.config.root ?? process.cwd())
    const base = normalizePath(this.config.base ?? '/')
    this.md = await createMarkdownRenderer(srcDir, this.options.markdown, base)
  }

  // 将md code转为vue
  public transform(code: string, path: string) {
    if (path.endsWith('.md')) {
      return this.mdToVue(code, path)
    }
  }

  public mdToVue(code: string, path: string) {
    // 相对路径 xx.md
    const relativePath = relative(this.config.root ?? process.cwd(), path)
    const mdEnv: MarkdownEnv = {
      path: normalizePath(path), // 绝对路径 user/xxx/ss/x.md
      relativePath: normalizePath(relativePath), // 相对路径 x.md
      cleanUrls: true, // 是否携带后缀，为true vitepress会移除后缀
    }
    // md to html
    const html = this.md?.render(code, mdEnv)
    // env中会存储所有的解析结果，默认返回html
    const { sfcBlocks } = mdEnv
    // 将解析后的样式
    const vue = [
      `<template><div class="vp-doc">${html}</div></template>`,
      sfcBlocks?.scriptSetup?.content ?? '',
      ...(sfcBlocks?.styles.map(v => v.content) ?? []),
    ].join('\n')
    return vue
  }
}

export {
  Parser,
}

export default Parser

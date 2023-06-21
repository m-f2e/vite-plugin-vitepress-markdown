import { resolve } from 'path'
import { describe, expect, it } from 'vitest'
import Parser from '../src/parser'
import testCode from './fixture/test.md?raw'

// 资源目录
const srcDir = resolve(__dirname, './fixture')

// 测试md路径
const testPath = resolve(srcDir, 'test.md')

describe('md to vue test', async () => {
  const parser = new Parser({
    root: srcDir,
    base: '/',
  } as any, {})
  await parser.setupRender()
  it('md to vue', async () => {
    const source = await parser.transform(testCode, testPath)
    expect(source).toMatchInlineSnapshot(`
      "<template><div class=\\"vp-doc\\"><h1 id=\\"h1\\" tabindex=\\"-1\\">h1 <a class=\\"header-anchor\\" href=\\"#h1\\" aria-label=\\"Permalink to &quot;h1&quot;\\">&ZeroWidthSpace;</a></h1>
      <h2 id=\\"h2\\" tabindex=\\"-1\\">h2 <a class=\\"header-anchor\\" href=\\"#h2\\" aria-label=\\"Permalink to &quot;h2&quot;\\">&ZeroWidthSpace;</a></h2>
      <h3 id=\\"h3\\" tabindex=\\"-1\\">h3 <a class=\\"header-anchor\\" href=\\"#h3\\" aria-label=\\"Permalink to &quot;h3&quot;\\">&ZeroWidthSpace;</a></h3>
      <h5 id=\\"h4\\" tabindex=\\"-1\\">h4 <a class=\\"header-anchor\\" href=\\"#h4\\" aria-label=\\"Permalink to &quot;h4&quot;\\">&ZeroWidthSpace;</a></h5>
      <h6 id=\\"h5\\" tabindex=\\"-1\\">h5 <a class=\\"header-anchor\\" href=\\"#h5\\" aria-label=\\"Permalink to &quot;h5&quot;\\">&ZeroWidthSpace;</a></h6>
      <div class=\\"tip custom-block\\"><p class=\\"custom-block-title\\">Tip Title</p>
      </div>
      </div></template>
      <script lang=\\"ts\\" setup>

      </script>
      <style>
        h1 {
          color: red;
        }
      </style>"
    `)
  })
})

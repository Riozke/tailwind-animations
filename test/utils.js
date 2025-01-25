import tailwindcss from 'tailwindcss'
import postcss from 'postcss'
import minify from '@csstools/postcss-minify'
import animationsPlugin from '../src/index.js'

const TAILWIND_BASE = '@tailwind utilities;'

export async function generatePluginCSS (options = {}) {
  const { inline = '', content = '' } = options

  const result_1 = await postcss([
    minify(),
    tailwindcss({
      plugins: [animationsPlugin],
      content: [{ raw: content }]
    })
  ])
    .process(`${TAILWIND_BASE} ${inline}`, {
      from: undefined
    })
  return result_1.css
}

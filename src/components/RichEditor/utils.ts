import escapeHtml from 'escape-html'
import { jsx } from 'slate-hyperscript'
import { Node, Text } from 'slate'

const serialize = (node: Node) => {
  if (Text.isText(node)) {
    if (node.bold) {
      return `<strong>${escapeHtml(node.text)}</strong>`
    }
  
    return escapeHtml(node.text)
  }

  const children: string = node.children.map(n => serialize(n)).join('')

  switch (node.type) {
    case 'quote':
      return `<blockquote><p>${children}</p></blockquote>`
    case 'paragraph':
      return `<p>${children}</p>`
    case 'link':
      return `<a href="${escapeHtml(node.url as string)}">${children}</a>`
    case 'code':
      return `<pre><code>${children}</code></pre>`
    default:
      return children
  }
}

export default serialize

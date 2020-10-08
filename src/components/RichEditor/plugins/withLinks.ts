import { ReactEditor } from 'slate-react'

export default (editor: ReactEditor) => {
  const { isInline } = editor
  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element)
  }

  return editor
}

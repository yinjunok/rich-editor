import { Editor } from 'slate'
import { TBooleanFormat, IValueFormat } from './types'

const helpers = {
  getMarkValue(editor: Editor, format: TBooleanFormat | keyof IValueFormat) {
    const marks = Editor.marks(editor)
    if (marks) {
      return marks[format] || null
    }

    return null
  },
  setMarkValue<T extends keyof IValueFormat>(editor: Editor, format: T, value: IValueFormat[T]) {
    editor.addMark(format, value)
  },
  isMarkActive(editor: Editor, format: TBooleanFormat) {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  },
  toggleMark(editor: Editor, format: TBooleanFormat) {
    const isActive = helpers.isMarkActive(editor, format)
    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  },
  isLinkActive(editor: Editor) {
    const [link] = Editor.nodes(editor, { match: n => n.type === 'link' })
    return !!link
  }
}

export default helpers

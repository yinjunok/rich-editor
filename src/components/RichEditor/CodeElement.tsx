import React, { FC } from 'react'
import { RenderElementProps } from 'slate-react'

const CodeElement: FC<RenderElementProps> = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

export default CodeElement

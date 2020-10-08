import React from 'react'
import { RenderElementProps, DefaultElement } from 'slate-react'
import Link from './Elements/Link'

const renderElement = (props: RenderElementProps): JSX.Element => {
  switch (props.element.type) {
    case 'link':
      return <Link {...props} />
    default:
      return <DefaultElement {...props} />
  }
}

export default renderElement

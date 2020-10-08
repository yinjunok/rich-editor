import React from 'react'
import { RenderLeafProps } from 'slate-react'
import Leaf from './Leaf'

const renderLeaf = (props: RenderLeafProps): JSX.Element => {
  return <Leaf {...props} />
}

export default renderLeaf

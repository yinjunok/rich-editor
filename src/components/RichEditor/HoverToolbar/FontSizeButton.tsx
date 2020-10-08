import React, { FC, useState, useEffect } from 'react'
import { useSlate } from 'slate-react'
import classNames from 'classnames'
import { ImFontSize } from 'react-icons/im'
import Button from './Button'
import helpers from '../helpers'
import styles from './styles.less'

const fontSizeList = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

const FontSizeSelect: FC<{ toolbarVisible: boolean }> = ({ toolbarVisible }) => {
  const editor = useSlate()
  const [visible, setVisible] = useState<boolean>(false)
  const currentSize = helpers.getMarkValue(editor, 'fontSize')

  useEffect(() => {
    if (!toolbarVisible) {
      setVisible(false)
    }
  }, [toolbarVisible])

  return (
    <Button
      className={classNames({[styles.hover]: visible})}
      onMouseDown={event => {
        event.preventDefault();
        event.stopPropagation()
        setVisible(true)
      }}
    >
      <ImFontSize />
      <ul
        className={styles.fontSizeDropList}
        style={{
          display: visible ? 'block' : 'none',
        }}
      >
        {fontSizeList.map(size => (
          <li
            key={size}
            className={classNames({[styles.active]: currentSize === size})}
            onMouseDown={(e) => {
              e.stopPropagation()
              setVisible(false)
              helpers.setMarkValue(editor, 'fontSize', size)
            }}
          >
            {size}
          </li>
        ))}
      </ul>
    </Button>
  );
}

export default FontSizeSelect

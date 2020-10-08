import React, { FC, useState, useEffect } from 'react'
import { useSlate } from 'slate-react'
import { ImLink } from 'react-icons/im'
import classNames from 'classnames'
import Button from './Button'
import styles from './styles.less'

const LinkButton: FC<{ toolbarVisible: boolean }> = ({ toolbarVisible }) => {
  const editor = useSlate()
  const [visible, setVisible] = useState<boolean>(false)

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
    <ImLink />
    <div className={styles.linkDrop}>
      <input placeholder='URL' />
      <input placeholder='Text' />
      <button>插入</button>

    </div>
  </Button>
  )
}

export default LinkButton

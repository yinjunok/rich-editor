import React, { FC, useState, useEffect } from 'react'
import { useSlate } from 'slate-react'
import styles from './styles.less'

interface IEditLink {
  url?: string
  text?: string
}

const LinkEditor: FC<IEditLink> = ({ url, text }) => {
  const editor = useSlate()
  const [link, setLink] = useState<IEditLink>({
    url: undefined,
    text: undefined
  })

  useEffect(() => {
    setLink({ url, text })
  }, [url, text])

  return (
    <div className={styles.linkEditor}>
      <input placeholder='URL' value={link.url} />
      <input placeholder='Text' value={link.text} />
      <button>插入</button>
    </div>
  )
}

export default LinkEditor

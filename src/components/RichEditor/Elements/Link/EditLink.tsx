import React, { FC, useState } from 'react'
import styles from './styles.less'

const EditLink: FC<{ url: string, text: string }> = ({  }) => {
  return (
    <div className={styles.linkDrop}>
    <input placeholder='URL' />
    <input placeholder='Text' />
    <button>插入</button>
  </div>
  )
}

export default EditLink

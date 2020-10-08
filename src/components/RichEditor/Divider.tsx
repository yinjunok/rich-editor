import React, { FC } from 'react'

const Divider: FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div
      style={{
        display: 'inline-block',
        height: '1.5em',
        verticalAlign: 'middle',
        width: 1,
        background: '#ebebeb'
      }}
      {...props}
    />
  )
}

export default Divider

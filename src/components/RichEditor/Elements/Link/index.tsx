import React, { FC } from 'react';
import { RenderElementProps } from 'slate-react';

const Link: FC<RenderElementProps> = ({ attributes, children, element }) => {
  return (
    <a
      {...attributes}
      href={element.url as string}
      target={element.target as string}
    >
      {children}
    </a>
  );
};

export default Link;

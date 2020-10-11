import React, { FC } from 'react';
import { RenderElementProps } from 'slate-react';
// import LinkEditor from './LinkEditor'

const Link: FC<RenderElementProps> = ({ attributes, children, element }) => {
  return (
    <>
      <a {...attributes} href={element.url as string}>
        {children}
      </a>
      {/* <LinkEditor text='' url='' /> */}
    </>
  );
};

export default Link;

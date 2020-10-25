import React from 'react';
import { RenderElementProps, DefaultElement } from 'slate-react';
import Link from './Elements/Link';

const renderElement = ({
  attributes,
  children,
  element,
}: RenderElementProps): JSX.Element => {
  switch (element.type) {
    case 'link':
      return (
        <Link attributes={attributes} element={element}>
          {children}
        </Link>
      );
    case 'paragraph':
      return <p {...attributes}>{children}</p>;
    case 'heading-1':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-2':
      return <h2 {...attributes}>{children}</h2>;
    case 'heading-3':
      return <h3 {...attributes}>{children}</h3>;
    case 'heading-4':
      return <h4 {...attributes}>{children}</h4>;
    default:
      return (
        <DefaultElement attributes={attributes} element={element}>
          {children}
        </DefaultElement>
      );
  }
};

export default renderElement;

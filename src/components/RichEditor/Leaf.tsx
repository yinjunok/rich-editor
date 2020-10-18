import React, { FC } from 'react';
import { RenderLeafProps } from 'slate-react';

const Leaf: FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  let renderChildren = children;
  if (leaf.bold) {
    renderChildren = <strong>{renderChildren}</strong>;
  }

  if (leaf.italic) {
    renderChildren = <em style={{ fontStyle: 'italic' }}>{renderChildren}</em>;
  }

  if (leaf.underline) {
    renderChildren = (
      <u style={{ textDecoration: 'underline' }}>{renderChildren}</u>
    );
  }

  if (leaf.sub) {
    renderChildren = (
      <sub style={{ verticalAlign: 'sub' }}>{renderChildren}</sub>
    );
  }

  if (leaf.sup) {
    renderChildren = (
      <sup style={{ verticalAlign: 'sup' }}>{renderChildren}</sup>
    );
  }

  if (leaf.fontSize) {
    renderChildren = (
      <span style={{ fontSize: leaf.fontSize as number }}>
        {renderChildren}
      </span>
    );
  }

  if (leaf.del) {
    renderChildren = (
      <del style={{ textDecoration: 'line-through' }}>{renderChildren}</del>
    );
  }
  return <span {...attributes}>{renderChildren}</span>;
};

export default Leaf;

import React, { FC } from 'react';
import classNames from 'classnames';
import { useSlate } from 'slate-react';
import { TBooleanFormat } from '../types';
import helpers from '../helpers';
import Button from '../../Button';
import styles from './styles.less';

const MarkButton: FC<{ format: TBooleanFormat }> = ({ format, children }) => {
  const editor = useSlate();

  return (
    <Button
      className={classNames({
        [styles.active]: helpers.isMarkActive(editor, format),
      })}
      onMouseDown={event => {
        event.preventDefault();
        helpers.toggleMark(editor, format);
      }}
    >
      {children}
    </Button>
  );
};

export default MarkButton;

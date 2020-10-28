import React, { FC } from 'react';
import {
  ImParagraphLeft,
  ImParagraphCenter,
  ImParagraphRight,
} from 'react-icons/im';
import classNames from 'classnames';
import { useSlate } from 'slate-react';
import helpers from '../helpers';
import SetBlockButton from './SetBlockButton';
import Button from '../../Button';
import styles from './styles.less';

const ToolBar: FC = () => {
  const editor = useSlate();

  return (
    <div className={styles.toolBarWrapper}>
      <SetBlockButton />
      <Button
        className={classNames({
          [styles.active]: helpers.isTextAlignActive(editor, 'left'),
        })}
        onMouseDown={e => {
          e.stopPropagation();
          e.preventDefault();
          helpers.setTextAlign(editor, 'left');
        }}
      >
        <ImParagraphLeft />
      </Button>
      <Button
        className={classNames({
          [styles.active]: helpers.isTextAlignActive(editor, 'center'),
        })}
        onMouseDown={e => {
          e.stopPropagation();
          e.preventDefault();
          helpers.setTextAlign(editor, 'center');
        }}
      >
        <ImParagraphCenter />
      </Button>
      <Button
        onMouseDown={e => {
          e.stopPropagation();
          e.preventDefault();
          helpers.setTextAlign(editor, 'right');
        }}
        className={classNames({
          [styles.active]: helpers.isTextAlignActive(editor, 'right'),
        })}
      >
        <ImParagraphRight />
      </Button>
    </div>
  );
};

export default ToolBar;

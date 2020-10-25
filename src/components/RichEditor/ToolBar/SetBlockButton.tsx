import React, { FC, useState } from 'react';
import { useSlate, ReactEditor } from 'slate-react';
import classNames from 'classnames';
import { ImCheckmark } from 'react-icons/im';
import { TTextType } from '../types';
import helpers from '../helpers';
import Button from '../../Button';
import styles from './styles.less';
// import { Editor } from 'slate';

// const formatName: { [p in TTextType]: string } = {
//   'heading-1': '标题一',
//   'heading-2': '标题二',
//   'heading-3': '标题三',
//   'heading-4': '标题四',
//   paragraph: '正文',
// };

const SetBlockButton: FC = () => {
  const editor = useSlate();
  const [visible, setVisible] = useState<boolean>(false);

  const visibleHandle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (ReactEditor.isFocused(editor) && !visible) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const text = classNames({
    标题一: helpers.isBlockActive(editor, 'heading-1'),
    标题二: helpers.isBlockActive(editor, 'heading-2'),
    标题三: helpers.isBlockActive(editor, 'heading-3'),
    标题四: helpers.isBlockActive(editor, 'heading-4'),
    正文: helpers.isBlockActive(editor, 'paragraph'),
  });

  const toggleBlock = (format: TTextType) => {
    helpers.toggleBlock(editor, format);
    setVisible(false);
  };

  return (
    <Button className={styles.button} onMouseDown={visibleHandle}>
      {text.length > 0 ? text : '正文'}

      {visible && (
        <div
          className={styles.dropList}
          onMouseDown={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <div
            className={styles.dropItem}
            onMouseDown={() => toggleBlock('paragraph')}
          >
            {helpers.isBlockActive(editor, 'paragraph') && (
              <ImCheckmark className={styles.checkItem} />
            )}
            正文
          </div>
          <h1
            className={styles.dropItem}
            onMouseDown={() => toggleBlock('heading-1')}
          >
            {helpers.isBlockActive(editor, 'heading-1') && (
              <ImCheckmark className={styles.checkItem} />
            )}
            标题一
          </h1>
          <h2
            className={styles.dropItem}
            onMouseDown={() => toggleBlock('heading-2')}
          >
            {helpers.isBlockActive(editor, 'heading-2') && (
              <ImCheckmark className={styles.checkItem} />
            )}
            标题二
          </h2>
          <h3
            className={styles.dropItem}
            onMouseDown={() => toggleBlock('heading-3')}
          >
            {helpers.isBlockActive(editor, 'heading-3') && (
              <ImCheckmark className={styles.checkItem} />
            )}
            标题三
          </h3>
          <h4
            className={styles.dropItem}
            onMouseDown={() => toggleBlock('heading-4')}
          >
            {helpers.isBlockActive(editor, 'heading-4') && (
              <ImCheckmark className={styles.checkItem} />
            )}
            标题四
          </h4>
        </div>
      )}
    </Button>
  );
};

export default SetBlockButton;

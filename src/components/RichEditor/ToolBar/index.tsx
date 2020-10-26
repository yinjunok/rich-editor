import React, { FC } from 'react';
import {
  ImParagraphLeft,
  ImParagraphCenter,
  ImParagraphRight,
} from 'react-icons/im';
import SetBlockButton from './SetBlockButton';
import Button from '../../Button';
import styles from './styles.less';

const ToolBar: FC = () => {
  return (
    <div className={styles.toolBarWrapper}>
      <SetBlockButton />
      <Button>
        <ImParagraphLeft />
      </Button>
      <Button>
        <ImParagraphCenter />
      </Button>
      <Button>
        <ImParagraphRight />
      </Button>
    </div>
  );
};

export default ToolBar;

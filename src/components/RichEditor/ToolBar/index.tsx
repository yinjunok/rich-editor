import React, { FC } from 'react';
import SetBlockButton from './SetBlockButton';
import styles from './styles.less';

const ToolBar: FC = () => {
  return (
    <div className={styles.toolBarWrapper}>
      <SetBlockButton />
    </div>
  );
};

export default ToolBar;

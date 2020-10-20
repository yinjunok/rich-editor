import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './styles.less';

export interface ISwitchProps {
  checked: boolean;
  onChange: (checked: boolean, event: React.MouseEvent) => void;
}

const Switch: FC<ISwitchProps> = ({ checked = false, onChange = () => {} }) => {
  return (
    <button
      className={classNames(styles.switch, { [styles.checked]: checked })}
      onClick={e => {
        onChange!(!checked, e);
      }}
    >
      <span className={styles.handle} />
    </button>
  );
};

export default Switch;

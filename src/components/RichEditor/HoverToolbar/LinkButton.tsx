import React, { FC, useContext } from 'react';
import { ImLink } from 'react-icons/im';
import classNames from 'classnames';
import { Context } from '../Elements/Link/context';
import Button from './Button';
import styles from './styles.less';

const LinkButton: FC = () => {
  const { state, updater } = useContext(Context);

  return (
    <>
      <Button
        className={classNames({ [styles.hover]: state.visible })}
        onMouseDown={event => {
          event.preventDefault();
          event.stopPropagation();
          updater({ visible: true });
        }}
      >
        <ImLink />
      </Button>
    </>
  );
};

export default LinkButton;

import React, { FC, useContext } from 'react';
import { useSlate } from 'slate-react';
import { ImLink } from 'react-icons/im';
import classNames from 'classnames';
import { Context } from '../context/linkEdit';
import Button from './Button';
import styles from './styles.less';

const LinkButton: FC = () => {
  const editor = useSlate();
  const { visible, setVisible } = useContext(Context);

  return (
    <>
      <Button
        className={classNames({ [styles.hover]: visible })}
        onMouseDown={event => {
          event.preventDefault();
          event.stopPropagation();
          setVisible(true);
        }}
      >
        <ImLink />
      </Button>
    </>
  );
};

export default LinkButton;

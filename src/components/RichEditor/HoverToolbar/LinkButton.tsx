import React, { FC, useContext } from 'react';
import { ImLink } from 'react-icons/im';
import classNames from 'classnames';
import { Context } from '../Elements/Link/context';
import Button from './Button';
import styles from './styles.less';
import { getSelectionRect } from '../utils';

const LinkButton: FC = () => {
  const { state, updater } = useContext(Context);

  return (
    <>
      <Button
        className={classNames({ [styles.hover]: state.visible })}
        onMouseDown={event => {
          event.preventDefault();
          event.stopPropagation();
          const rect = getSelectionRect();
          if (rect) {
            updater({
              visible: true,
              arrow: 'bottom',
              position: {
                top: rect.top,
                left: rect.width / 2 + rect.left,
              },
            });
          } else {
            updater({ visible: true });
          }
        }}
      >
        <ImLink />
      </Button>
    </>
  );
};

export default LinkButton;

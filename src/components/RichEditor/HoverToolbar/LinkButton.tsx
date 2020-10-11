import React, { FC, useState, useEffect } from 'react';
import { useSlate } from 'slate-react';
import { ImLink } from 'react-icons/im';
import classNames from 'classnames';
import Button from './Button';
// import LinkEditor from '../Elements/Link/LinkEditor'
import styles from './styles.less';

const LinkButton: FC<{ toolbarVisible: boolean }> = ({ toolbarVisible }) => {
  const editor = useSlate();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!toolbarVisible) {
      setVisible(false);
    }
  }, [toolbarVisible]);

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
      {/* <div className={styles.linkDrop}>
      <LinkEditor url='' text='' />
    </div> */}
    </>
  );
};

export default LinkButton;

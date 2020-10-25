import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './styles.less';

const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button className={classNames(styles.button, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;

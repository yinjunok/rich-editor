import React, { createContext, FC, useState } from 'react';

interface ILinkEditState {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const Context = createContext<ILinkEditState>({
  visible: false,
  setVisible: () => {},
});

const Container: FC = ({ children }) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <Context.Provider value={{ visible, setVisible }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Container };

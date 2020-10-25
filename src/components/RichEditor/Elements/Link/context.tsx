import React, { useState, createContext, FC } from 'react';

interface ILinkEditorState {
  position:
    | {
        left: number;
        top: number;
      }
    | undefined;
  arrow: 'top' | 'bottom' | undefined;
  visible: boolean;
}

const initLinkState: ILinkEditorState = {
  position: undefined,
  arrow: undefined,
  visible: false,
};

type TUpdater = (p: Partial<ILinkEditorState>) => void;

const Context = createContext<{ state: ILinkEditorState; updater: TUpdater }>({
  state: {
    ...initLinkState,
  },
  updater: () => {},
});

const Container: FC = ({ children }) => {
  const [linkEditorState, updateLinkEditorState] = useState<ILinkEditorState>({
    position: undefined,
    arrow: undefined,
    visible: false,
  });

  const updater: TUpdater = params => {
    updateLinkEditorState(() => {
      return { ...initLinkState, ...params };
    });
  };

  return (
    <Context.Provider value={{ state: linkEditorState, updater }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Container };

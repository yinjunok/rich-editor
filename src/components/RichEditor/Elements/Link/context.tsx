import React, { createContext, FC } from 'react';
import { useImmer } from 'use-immer';

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

type TUpdater = (p: Partial<ILinkEditorState>) => void;

const Context = createContext<{ state: ILinkEditorState; updater: TUpdater }>({
  state: {
    position: undefined,
    arrow: undefined,
    visible: false,
  },
  updater: () => {},
});

const Container: FC = ({ children }) => {
  const [linkEditorState, updateLinkEditorState] = useImmer<ILinkEditorState>({
    position: undefined,
    arrow: undefined,
    visible: false,
  });

  const updater: TUpdater = params => {
    updateLinkEditorState(draft => {
      return { ...draft, ...params };
    });
  };

  return (
    <Context.Provider value={{ state: linkEditorState, updater }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Container };

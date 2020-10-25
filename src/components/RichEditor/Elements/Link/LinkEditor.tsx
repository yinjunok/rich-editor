import React, {
  FC,
  useState,
  useEffect,
  useContext,
  useRef,
  CSSProperties,
} from 'react';
import { Range } from 'slate';
import { useSlate } from 'slate-react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import helpers from '../../helpers';
import styles from './styles.less';
import { Context } from './context';
import Switch from '../../../Switch';

export interface ILink {
  url: string;
  target: '_self' | '_blank';
}

const initLink: ILink = {
  url: '',
  target: '_blank',
};

const centerSty: CSSProperties = {
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

const LinkEditor: FC = () => {
  const linkEditorDom = useRef<HTMLDivElement>(null);
  const { state, updater } = useContext(Context);
  const editor = useSlate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectionTemp = useRef<Range | null>(editor.selection);
  const [link, setLink] = useState<ILink>({ ...initLink });

  useEffect(() => {
    if (editor.selection === null) {
      // selectionTemp.current = Editor.end(editor, [])
    } else {
      selectionTemp.current = editor.selection;
    }
  }, [editor.selection]);

  useEffect(() => {
    const closeHandler = () => {
      updater({ visible: false });
    };

    window.addEventListener('mousedown', closeHandler);
    return () => window.removeEventListener('mousedown', closeHandler);
  }, []);

  useEffect(() => {
    if (inputRef.current && state.visible) {
      inputRef.current.focus();
    }
  }, [state.visible]);

  useEffect(() => {
    if (!state.visible) {
      setLink({ ...initLink });
    }
  }, [state.visible]);

  if (!state.visible) {
    return null;
  }

  return createPortal(
    <div
      ref={linkEditorDom}
      className={classNames(styles.linkEditor, {
        [styles.top]: state.arrow === 'top',
        [styles.bottom]: state.arrow === 'bottom',
      })}
      style={
        state.position
          ? {
              left:
                state.position.left -
                (linkEditorDom.current?.offsetWidth ?? 0) / 2,
              top:
                state.position.top -
                (linkEditorDom.current?.offsetHeight ?? 0) -
                8,
            }
          : centerSty
      }
      onMouseDown={e => {
        e.nativeEvent.stopPropagation();
      }}
    >
      <div>
        <input
          ref={inputRef}
          className={styles.input}
          placeholder="URL"
          value={link.url}
          onKeyDown={e => {
            if (e.key === 'Enter' && link.url) {
              e.stopPropagation();
              helpers.wrapLink(editor, selectionTemp.current, link);
              updater({ visible: false });
            }
          }}
          onChange={e => {
            const value = e.target.value;
            setLink(state => ({ ...state, url: value }));
          }}
        />
      </div>
      <div className={styles.action}>
        <div className={styles.openTarget}>
          <Switch
            checked={link.target === '_blank'}
            onChange={checked => {
              if (checked) {
                setLink(state => ({ ...state, target: '_blank' }));
              } else {
                setLink(state => ({ ...state, target: '_self' }));
              }
            }}
          />
          <span className={styles.tip}>新窗口打开</span>
        </div>
        <button
          className={styles.button}
          onClick={e => {
            if (link.url) {
              e.stopPropagation();
              helpers.wrapLink(editor, selectionTemp.current, link);
              updater({ visible: false });
            }
          }}
        >
          插入
        </button>
      </div>
      <a></a>
    </div>,
    document.body,
  );
};

export default LinkEditor;

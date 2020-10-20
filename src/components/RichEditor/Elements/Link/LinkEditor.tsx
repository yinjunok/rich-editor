import React, { FC, useState, useEffect, useContext, useRef } from 'react';
import { Range, Editor } from 'slate';
import { useSlate, ReactEditor } from 'slate-react';
import {} from '@/components/RichEditor';
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

const LinkEditor: FC = () => {
  const linkEditorDom = useRef<HTMLDivElement>(null);
  const { visible, setVisible } = useContext(Context);
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
      setVisible(false);
    };

    window.addEventListener('mousedown', closeHandler);
    return () => window.removeEventListener('mousedown', closeHandler);
  }, []);

  useEffect(() => {
    if (inputRef.current && visible) {
      inputRef.current.focus();
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) {
      setLink({ ...initLink });
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      const el = linkEditorDom.current;
      const { selection } = editor;
      if (!el) {
        return;
      }
      if (
        !selection ||
        !ReactEditor.isFocused(editor) ||
        Range.isCollapsed(selection) ||
        Editor.string(editor, selection) === ''
      ) {
        el.removeAttribute('style');
        return;
      }
      const domSelection = window.getSelection();
      if (domSelection) {
        const domRange = domSelection.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();
        el.style.opacity = '1';
        el.style.top = `${rect.top - el.offsetHeight - 8}px`;
        el.style.left = `${rect.left +
          window.pageXOffset -
          el.offsetWidth / 2 +
          rect.width / 2}px`;
      }
    }
  }, [visible]);

  if (!visible) {
    return null;
  }
  console.log(link.target === '_self');
  return (
    <div
      ref={linkEditorDom}
      className={styles.linkEditor}
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
              setVisible(false);
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
              setVisible(false);
            }
          }}
        >
          插入
        </button>
      </div>
      <a></a>
    </div>
  );
};

export default LinkEditor;

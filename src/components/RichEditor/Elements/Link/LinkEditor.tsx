import React, { FC, useState, useEffect, useContext, useRef } from 'react';
import { Range, Editor } from 'slate';
import { useSlate, ReactEditor } from 'slate-react';
import helpers from '../../helpers';
import styles from './styles.less';
import { Context } from './context';

const LinkEditor: FC = () => {
  const linkEditorDom = useRef<HTMLDivElement>(null);
  const { visible, setVisible } = useContext(Context);
  const editor = useSlate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectionTemp = useRef<Range | null>(editor.selection);
  const [url, setUrl] = useState<string>('');

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
      setUrl('');
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
          value={url}
          onKeyDown={e => {
            if (e.key === 'Enter' && url) {
              e.stopPropagation();
              helpers.wrapLink(editor, selectionTemp.current, url);
              setVisible(false);
            }
          }}
          onChange={e => {
            setUrl(e.target.value);
          }}
        />
      </div>
      <div style={{ textAlign: 'right', marginTop: 8 }}>
        <button
          className={styles.button}
          onClick={e => {
            if (url) {
              e.stopPropagation();
              helpers.wrapLink(editor, selectionTemp.current, url);
              setVisible(false);
            }
          }}
        >
          插入
        </button>
      </div>
    </div>
  );
};

export default LinkEditor;

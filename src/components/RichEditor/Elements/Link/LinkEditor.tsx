import React, { FC, useState, useEffect, useContext, useRef } from 'react';
import { Range, Editor } from 'slate';
import { useSlate, ReactEditor } from 'slate-react';
import helpers from '../../helpers';
import styles from './styles.less';
import { Context } from '../../context/linkEdit';

interface IEditLink {
  url: string | undefined;
  text: string | undefined;
}

const LinkEditor: FC<IEditLink> = ({ url, text }) => {
  const linkEditorDom = useRef<HTMLDivElement>(null);
  const { visible, setVisible } = useContext(Context);
  const editor = useSlate();
  const [link, setLink] = useState<IEditLink>({
    url: '',
    text: '',
  });

  useEffect(() => {
    setLink({ url, text });
  }, [url, text]);

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
    <div ref={linkEditorDom} className={styles.linkEditor}>
      <input
        placeholder="URL"
        value={link.url}
        onChange={e => {
          const value = e.target.value;
          setLink(state => ({ ...state, url: value }));
        }}
      />
      <input
        placeholder="Text"
        value={link.text}
        onChange={e => {
          const value = e.target.value;
          setLink(state => ({ ...state, text: value }));
        }}
      />
      <button
        onClick={() => {
          if (link.url && link.text) {
            helpers.wrapLink(editor, link.url, link.text);
          }
        }}
      >
        插入
      </button>
    </div>
  );
};

export default LinkEditor;

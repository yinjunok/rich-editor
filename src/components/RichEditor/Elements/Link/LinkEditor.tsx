import React, { FC, useState, useEffect } from 'react';
import { useSlate } from 'slate-react';
import helpers from '../../helpers';
import styles from './styles.less';

interface IEditLink {
  url: string | undefined;
  text: string | undefined;
}

const LinkEditor: FC<IEditLink> = ({ url, text }) => {
  const editor = useSlate();
  const [link, setLink] = useState<IEditLink>({
    url: '',
    text: '',
  });

  useEffect(() => {
    setLink({ url, text });
  }, [url, text]);

  return (
    <div className={styles.linkEditor}>
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

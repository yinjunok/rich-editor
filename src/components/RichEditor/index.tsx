import React, { FC, useMemo, useState } from 'react';
import { createEditor, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import renderElement from './renderElement';
import LinkEditor from './Elements/Link/LinkEditor';
import renderLeaf from './renderLeaf';
import HoverToolbar from './HoverToolbar';
import ToolBar from './ToolBar';
import withLinks from './plugins/withLinks';
import { Container as LinkEditorContainer } from './Elements/Link/context';

const RichEditor: FC = () => {
  const editor = useMemo(
    () => withLinks(withHistory(withReact(createEditor()))),
    [],
  );
  const [value, setValue] = useState<Node[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  return (
    <LinkEditorContainer>
      <Slate
        value={value}
        editor={editor}
        onChange={newValue => {
          setValue(newValue);
        }}
      >
        <ToolBar />
        <HoverToolbar />
        <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
        <LinkEditor />
      </Slate>
    </LinkEditorContainer>
  );
};

export default RichEditor;

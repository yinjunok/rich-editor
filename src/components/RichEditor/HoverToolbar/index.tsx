import React, { FC, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Editor, Range } from 'slate'
import { useSlate, ReactEditor } from 'slate-react';
import { IconContext } from 'react-icons';
import {
  ImBold,
  ImItalic,
  ImUnderline,
  ImStrikethrough,
  ImSubscript,
  ImSuperscript,
  // ImLink,
} from 'react-icons/im';
import FontSizeSelect from './FontSizeButton'
// import Button from './Button';
import Divider from '../Divider'
import MarkButton from './MarkButton'
import LinkButton from './LinkButton'
import styles from './styles.less';

const HoverToolbar: FC = () => {
  const editor = useSlate();
  const [visible, setVisible] = useState<boolean>(false)
  const toolbarDomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = toolbarDomRef.current
    const { selection } = editor
    
    if (!el) {
      return
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style')
      setVisible(false)
      return
    }

    const domSelection = window.getSelection()
    if (domSelection) {
      const domRange = domSelection.getRangeAt(0)
      const rect = domRange.getBoundingClientRect()
      el.style.opacity = '1'
      el.style.top = `${rect.top - el.offsetHeight - 8}px`
      el.style.left = `${
        rect.left +
        window.pageXOffset -
        el.offsetWidth / 2 +
        rect.width / 2
      }px`
      setVisible(true)
    }
  })

  return createPortal(
    <IconContext.Provider value={{ className: styles.icon }}>
      <div ref={toolbarDomRef} className={styles.hoverToolbar}>
        <MarkButton format='bold'>
          <ImBold />
        </MarkButton>
        <MarkButton format='italic'>
          <ImItalic />
        </MarkButton>
        <MarkButton format='underline'>
          <ImUnderline />
        </MarkButton>
        <MarkButton format='del'>
          <ImStrikethrough />
        </MarkButton>
        <MarkButton format='sub'>
          <ImSubscript />
        </MarkButton>
        <MarkButton format='sup'>
          <ImSuperscript />
        </MarkButton>
        <Divider />

        <FontSizeSelect toolbarVisible={visible} />
        <LinkButton toolbarVisible={visible} />
        {/* <Button
          onMouseDown={event => {
            event.preventDefault();
          }}
        >
          <ImLink />
        </Button> */}
      </div>
    </IconContext.Provider>,
    document.body,
  );
};

export default HoverToolbar;

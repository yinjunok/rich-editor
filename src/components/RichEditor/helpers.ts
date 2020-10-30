import { Property } from 'csstype';
import { Editor, Transforms, Range, Node } from 'slate';
import { TBooleanFormat, IValueFormat, TTextType } from './types';
import { ILink } from './Elements/Link/LinkEditor';

const helpers = {
  // isTextIndentActive(editor: Editor) {

  // },
  setTextIndent(editor: Editor, type: 'increase' | 'decrease') {
    const selection = editor.selection;
    if (selection !== null) {
      // console.log(selection)
      const node = Editor.nodes(editor, {
        at: selection,
        match: n => Editor.isBlock(editor, n),
      });
      console.log(node.next());
    }
    // Transforms.setNodes(editor, { textIndent })
  },
  isTextAlignActive(editor: Editor, align: Property.TextAlign) {
    const [match] = Editor.nodes(editor, {
      match: n => {
        return n.align === align;
      },
    });

    return !!match;
  },
  setTextAlign(editor: Editor, align: Property.TextAlign) {
    Transforms.setNodes(editor, { align });
  },
  toggleBlock(editor: Editor, format: TTextType) {
    Transforms.setNodes(editor, { type: format });
  },
  isBlockActive(editor: Editor, format: TTextType) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === format,
    });

    return !!match;
  },
  getMarkValue(editor: Editor, format: TBooleanFormat | keyof IValueFormat) {
    const marks = Editor.marks(editor);
    if (marks) {
      return marks[format] || null;
    }

    return null;
  },
  setMarkValue<T extends keyof IValueFormat>(
    editor: Editor,
    format: T,
    value: IValueFormat[T],
  ) {
    editor.addMark(format, value);
  },
  isMarkActive(editor: Editor, format: TBooleanFormat) {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  },
  toggleMark(editor: Editor, format: TBooleanFormat) {
    const isActive = helpers.isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },
  isLinkActive(editor: Editor) {
    const [link] = Editor.nodes(editor, { match: n => n.type === 'link' });
    return !!link;
  },
  unwrapLink(editor: Editor) {
    Transforms.unwrapNodes(editor, { match: n => n.type === 'link' });
  },
  wrapLink(editor: Editor, selection: Range | null, link: ILink) {
    if (selection === null) {
      return;
    }

    if (helpers.isLinkActive(editor)) {
      helpers.unwrapLink(editor);
    }

    const isCollapsed = selection && Range.isCollapsed(selection);
    const linkNode: Node = {
      type: 'link',
      ...link,
      children: [],
    };

    Transforms.select(editor, selection);
    if (isCollapsed) {
      Transforms.insertNodes(editor, linkNode);
    } else {
      Transforms.wrapNodes(editor, linkNode, { split: true });
      Transforms.collapse(editor, { edge: 'end' });
    }
  },
};

export default helpers;


'use client';

import type { FC } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState, type LexicalEditor } from 'lexical';
import { editorTheme } from '@/lib/lexical-theme';
import { cn } from '@/lib/utils';
import { $generateHtmlFromNodes } from '@lexical/html';

const ToolbarPlugin = () => null; // Placeholder for now

interface RichTextEditorProps {
  id?: string;
  onChange: (value: string) => void;
  value: string; // Should be HTML string
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const editorConfig = {
  namespace: 'PortfolioEditor',
  theme: editorTheme,
  onError(error: Error) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

const RichTextEditor: FC<RichTextEditorProps> = ({
  id,
  onChange,
  value,
  placeholder,
  className,
  disabled,
}) => {

  const handleOnChange = (editorState: EditorState, editor: LexicalEditor) => {
    editorState.read(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);
      onChange(htmlString);
    });
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div
        className={cn(
          'relative rounded-md border border-input bg-background',
          className
        )}
      >
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="min-h-64 resize-y p-4 focus:outline-none"
              aria-placeholder={placeholder}
              id={id}
              readOnly={disabled}
            />
          }
          placeholder={
            <div className="pointer-events-none absolute left-4 top-4 text-muted-foreground">
              {placeholder}
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={handleOnChange} />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <LinkPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </div>
    </LexicalComposer>
  );
};

export default RichTextEditor;

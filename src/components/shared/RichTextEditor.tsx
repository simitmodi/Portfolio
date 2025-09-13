
'use client';

import type { FC } from 'react';
import { useEffect } from 'react';
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
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { EditorState, type LexicalEditor } from 'lexical';
import { editorTheme } from '@/lib/lexical-theme';
import { cn } from '@/lib/utils';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import ToolbarPlugin from './ToolbarPlugin';

interface RichTextEditorProps {
  id?: string;
  onChange: (value: string) => void;
  value: string; // Should be HTML string
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

// Plugin to load initial HTML content
const InitialValuePlugin = ({ initialHtml }: { initialHtml: string }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!initialHtml) return;

    editor.update(() => {
      // In the browser, we can use the native DOMParser API to generate a DOM from a HTML string.
      const parser = new DOMParser();
      const dom = parser.parseFromString(initialHtml, "text/html");

      // Once you have the DOM instance it's easy to generate LexicalNodes.
      const nodes = $generateNodesFromDOM(editor, dom);

      // Select the root
      editor.getRoot().select();
      
      // Insert them at a selection.
      editor.getRoot().clear();
      editor.getRoot().append(...nodes);
    });
  // The an ESLint warning is disabled here because we only want this to run on initial mount.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};


const editorConfig = {
  namespace: 'PortfolioEditor',
  theme: editorTheme,
  onError(error: Error) {
    throw error;
  },
  // The editor will be empty on initial render, then populated by the InitialValuePlugin
  editorState: null,
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
        <ToolbarPlugin />
        <div className="relative">
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
        </div>
        <InitialValuePlugin initialHtml={value} />
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

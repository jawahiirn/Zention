'use client';

import {
  BlockNoteEditor,
  filterSuggestionItems,
  PartialBlock,
} from '@blocknote/core';
import {
  useCreateBlockNote,
  FormattingToolbar,
  FormattingToolbarController,
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  getFormattingToolbarItems,
} from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import { useTheme } from 'next-themes';
import { useEdgeStore } from '@/lib/edgestore';
import { createOpenAI } from '@ai-sdk/openai';
import {
  createAIExtension,
  AIMenuController,
  getAISlashMenuItems,
  AIToolbarButton,
} from '@blocknote/xl-ai';
import { en } from '@blocknote/core/locales';
import { en as aiEn } from '@blocknote/xl-ai/locales';
import '@blocknote/core/style.css';
import '@blocknote/mantine/style.css';
import '@blocknote/xl-ai/style.css';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const openai = createOpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  });

  const onUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({ file });
    return res.url;
  };
  const editor: BlockNoteEditor = useCreateBlockNote({
    dictionary: {
      ...en,
      ai: aiEn,
    },
    extensions: [
      createAIExtension({
        model: openai.chat('gpt-4o-mini'),
      } as any),
    ],
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: onUpload,
  });

  return (
    <BlockNoteView
      editable={editable}
      editor={editor}
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      onChange={() => onChange(JSON.stringify(editor.document, null, 2))}
      formattingToolbar={false}
      slashMenu={false}
    >
      <AIMenuController />
      <FormattingToolbarWithAI />
      <SuggestionMenuWithAI editor={editor} />
    </BlockNoteView>
  );
};

function FormattingToolbarWithAI() {
  return (
    <FormattingToolbarController
      formattingToolbar={() => (
        <FormattingToolbar>
          {...getFormattingToolbarItems()}
          {/* Add the AI button */}
          <AIToolbarButton />
        </FormattingToolbar>
      )}
    />
  );
}

function SuggestionMenuWithAI(props: {
  editor: BlockNoteEditor<any, any, any>;
}) {
  return (
    <SuggestionMenuController
      triggerCharacter="/"
      getItems={async (query) =>
        filterSuggestionItems(
          [
            ...getDefaultReactSlashMenuItems(props.editor),
            // add the default AI slash menu items, or define your own
            ...getAISlashMenuItems(props.editor),
          ],
          query
        )
      }
    />
  );
}

export default Editor;

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import EditorToolbar from './EditorToolbar';

interface TiptapEditorProps {
  documentId: string;
}

export default function TiptapEditor({ documentId }: TiptapEditorProps) {
  const { currentUser } = useUser();
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  
  useEffect(() => {
    // Initialize YJS and WebSocket connection
    // In a real app, this would connect to your backend
    const ydoc = new Y.Doc();
    
    // For demo purposes, we're using a public demo server
    // In production, you should use your own WebSocket server
    const wsProvider = new WebsocketProvider(
      'wss://demos.yjs.dev', 
      `doccollab-${documentId}`, 
      ydoc
    );
    
    if (currentUser) {
      wsProvider.awareness.setLocalStateField('user', {
        name: currentUser.name,
        color: currentUser.color,
        id: currentUser.id,
      });
    }
    
    setProvider(wsProvider);
    
    return () => {
      wsProvider.disconnect();
      ydoc.destroy();
    };
  }, [documentId, currentUser]);
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false, // Disable history as it's handled by Yjs
      }),
      Placeholder.configure({
        placeholder: 'Start typing or use "/" for commands...',
      }),
      // Only initialize Collaboration extensions when the provider is ready
      ...(provider ? [
        Collaboration.configure({
          document: provider.doc,
        }),
        CollaborationCursor.configure({
          provider: provider,
        }),
      ] : []),
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg mx-auto focus:outline-none min-h-[300px] p-4',
      },
    },
  }, [provider]);
  
  return (
    <div className="border rounded-lg bg-white shadow-sm">
      <div className="border-b p-2">
        <EditorToolbar editor={editor} />
      </div>
      <EditorContent editor={editor} className="min-h-[50vh]" />
    </div>
  );
}
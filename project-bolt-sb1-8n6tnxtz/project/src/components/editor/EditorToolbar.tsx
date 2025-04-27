import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Code,
  Link,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';

interface EditorToolbarProps {
  editor: any;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) {
    return null;
  }
  
  return (
    <div className="border border-gray-200 rounded-md bg-white shadow-sm p-1 flex flex-wrap gap-1">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded-md ${
          editor.isActive('bold') ? 'bg-gray-200 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
        }`}
        title="Bold"
      >
        <Bold size={18} />
      </button>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded-md ${
          editor.isActive('italic') ? 'bg-gray-200 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
        }`}
        title="Italic"
      >
        <Italic size={18} />
      </button>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded-md ${
          editor.isActive('underline') ? 'bg-gray-200 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
        }`}
        title="Underline"
      >
        <Underline size={18} />
      </button>
      
      <div className="w-px h-6 my-auto bg-gray-300 mx-1"></div>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-md ${
          editor.isActive('bulletList') ? 'bg-gray-200 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
        }`}
        title="Bullet List"
      >
        <List size={18} />
      </button>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded-md ${
          editor.isActive('orderedList') ? 'bg-gray-200 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
        }`}
        title="Numbered List"
      >
        <ListOrdered size={18} />
      </button>
      
      <div className="w-px h-6 my-auto bg-gray-300 mx-1"></div>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded-md ${
          editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
        }`}
        title="Align Left"
      >
        <AlignLeft size={18} />
      </button>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded-md ${
          editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
        }`}
        title="Align Center"
      >
        <AlignCenter size={18} />
      </button>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded-md ${
          editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
        }`}
        title="Align Right"
      >
        <AlignRight size={18} />
      </button>
      
      <div className="w-px h-6 my-auto bg-gray-300 mx-1"></div>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded-md ${
          editor.isActive('codeBlock') ? 'bg-gray-200 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
        }`}
        title="Code Block"
      >
        <Code size={18} />
      </button>
      
      <button
        type="button"
        onClick={() => {
          const url = window.prompt('Enter the URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={`p-2 rounded-md ${
          editor.isActive('link') ? 'bg-gray-200 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
        }`}
        title="Insert Link"
      >
        <Link size={18} />
      </button>
      
      <button
        type="button"
        onClick={() => {
          const url = window.prompt('Enter the image URL');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
        title="Insert Image"
      >
        <Image size={18} />
      </button>
    </div>
  );
}
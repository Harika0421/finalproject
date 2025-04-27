import { useState, useEffect, useRef } from 'react';

interface DocumentTitleProps {
  initialTitle: string;
  onTitleChange: (newTitle: string) => void;
}

export default function DocumentTitle({ initialTitle, onTitleChange }: DocumentTitleProps) {
  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);
  
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);
  
  const handleBlur = () => {
    setIsEditing(false);
    if (title.trim() === '') {
      setTitle('Untitled Document');
      onTitleChange('Untitled Document');
    } else if (title !== initialTitle) {
      onTitleChange(title);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };
  
  return (
    <div className="mb-4">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="text-xl font-bold w-full bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none py-1"
          autoFocus
        />
      ) : (
        <h1 
          className="text-xl font-bold cursor-text py-1 hover:bg-gray-100 px-2 rounded transition-colors"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h1>
      )}
    </div>
  );
}
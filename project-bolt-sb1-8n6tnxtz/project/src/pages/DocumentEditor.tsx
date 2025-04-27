import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDocuments } from '../context/DocumentContext';
import { useUser } from '../context/UserContext';
import TiptapEditor from '../components/editor/TiptapEditor';
import DocumentTitle from '../components/editor/DocumentTitle';
import CollaboratorAvatars from '../components/editor/CollaboratorAvatars';
import { Users, Save, Share, History, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { User } from '../types';

export default function DocumentEditor() {
  const { id } = useParams<{ id: string }>();
  const { getDocument, updateDocument } = useDocuments();
  const { currentUser } = useUser();
  const [document, setDocument] = useState(getDocument(id || ''));
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [collaborators, setCollaborators] = useState<User[]>([]);
  
  // Mock collaborators for demo purposes
  useEffect(() => {
    if (currentUser) {
      // Create mock collaborators including the current user
      const mockCollaborators: User[] = [
        {
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          color: currentUser.color,
        },
        {
          id: '2',
          name: 'Alex Johnson',
          email: 'alex@example.com',
          color: '#10B981',
        },
        {
          id: '3',
          name: 'Maya Rodriguez',
          email: 'maya@example.com',
          color: '#8B5CF6',
        }
      ];
      
      setCollaborators(mockCollaborators);
    }
  }, [currentUser]);
  
  useEffect(() => {
    if (id) {
      const doc = getDocument(id);
      if (doc) {
        setDocument(doc);
      }
    }
  }, [id, getDocument]);
  
  const handleTitleChange = async (newTitle: string) => {
    if (document && id) {
      setIsSaving(true);
      try {
        const updatedDoc = await updateDocument(id, { title: newTitle });
        setDocument(updatedDoc);
        setLastSaved(new Date());
      } finally {
        setIsSaving(false);
      }
    }
  };
  
  const handleSave = async () => {
    if (document && id) {
      setIsSaving(true);
      try {
        // In a real app, this would save the document content as well
        await updateDocument(id, { });
        setLastSaved(new Date());
      } finally {
        setIsSaving(false);
      }
    }
  };
  
  if (!document) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-bold text-gray-700">Document not found</h2>
        <p className="text-gray-500 mt-2">The document you're looking for doesn't exist</p>
        <Link to="/" className="mt-4 text-blue-600 hover:underline flex items-center">
          <ArrowLeft size={16} className="mr-1" />
          Back to documents
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Link to="/" className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <DocumentTitle initialTitle={document.title} onTitleChange={handleTitleChange} />
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <Users size={16} className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">
                {collaborators.length} {collaborators.length === 1 ? 'collaborator' : 'collaborators'}
              </span>
            </div>
            {lastSaved && (
              <div className="text-xs text-gray-500">
                Last saved {lastSaved.toLocaleTimeString()}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                // Show version history in a real app
                alert('Version history would be shown here');
              }}
            >
              <History size={16} className="mr-1" />
              History
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                // Show sharing options in a real app
                alert('Sharing options would be shown here');
              }}
            >
              <Share size={16} className="mr-1" />
              Share
            </Button>
            <Button 
              size="sm"
              onClick={handleSave}
              isLoading={isSaving}
            >
              <Save size={16} className="mr-1" />
              Save
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-700 mr-3">Currently editing:</h3>
          <CollaboratorAvatars users={collaborators} />
        </div>
      </div>
      
      <TiptapEditor documentId={id || ''} />
      
      <div className="mt-6 text-sm text-gray-500 flex items-center justify-between">
        <div>
          Press <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 mx-1">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 mx-1">S</kbd> to save
        </div>
        <div>
          {document.updatedAt && `Last edited: ${new Date(document.updatedAt).toLocaleString()}`}
        </div>
      </div>
    </div>
  );
}
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Document } from '../types';

interface DocumentContextType {
  documents: Document[];
  getDocument: (id: string) => Document | undefined;
  createDocument: (title: string) => Promise<Document>;
  updateDocument: (id: string, data: Partial<Document>) => Promise<Document>;
  deleteDocument: (id: string) => Promise<void>;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

// Mock data
const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Getting Started Guide',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ownerId: '1',
    collaborators: [],
  },
  {
    id: '2',
    title: 'Project Proposal',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 43200000).toISOString(),
    ownerId: '1',
    collaborators: [],
  },
];

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>([]);

  // Simulate fetching documents on mount
  useEffect(() => {
    setDocuments(mockDocuments);
  }, []);

  const getDocument = (id: string) => {
    return documents.find(doc => doc.id === id);
  };

  const createDocument = async (title: string): Promise<Document> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newDocument: Document = {
      id: String(Date.now()),
      title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ownerId: '1', // In a real app, this would be the current user's ID
      collaborators: [],
    };
    
    setDocuments([...documents, newDocument]);
    return newDocument;
  };

  const updateDocument = async (id: string, data: Partial<Document>): Promise<Document> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const updatedDocuments = documents.map(doc => 
      doc.id === id ? { ...doc, ...data, updatedAt: new Date().toISOString() } : doc
    );
    
    setDocuments(updatedDocuments);
    return updatedDocuments.find(doc => doc.id === id) as Document;
  };

  const deleteDocument = async (id: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <DocumentContext.Provider value={{ documents, getDocument, createDocument, updateDocument, deleteDocument }}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
}
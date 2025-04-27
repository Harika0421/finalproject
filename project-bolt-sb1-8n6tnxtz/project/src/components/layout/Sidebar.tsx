import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Plus, 
  Users, 
  Clock, 
  Star, 
  Trash2, 
  ChevronRight, 
  ChevronDown 
} from 'lucide-react';
import { useDocuments } from '../../context/DocumentContext';
import { cn } from '../../lib/utils';

export default function Sidebar() {
  const location = useLocation();
  const { documents, createDocument } = useDocuments();
  const [isRecentOpen, setIsRecentOpen] = useState(true);
  
  const handleCreateDocument = async () => {
    const newDoc = await createDocument('Untitled Document');
    // In a real app, you would navigate to the new document
  };
  
  return (
    <aside className="w-64 border-r border-gray-200 bg-white h-full flex-shrink-0 hidden md:block">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="ml-2 font-semibold text-lg">DocCollab</span>
          </Link>
        </div>
        
        <div className="p-4">
          <button
            onClick={handleCreateDocument}
            className="flex items-center justify-center w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} className="mr-1" />
            <span>New Document</span>
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 px-2">
            <li>
              <Link
                to="/"
                className={cn(
                  "flex items-center py-2 px-3 rounded-md text-sm font-medium",
                  location.pathname === "/" 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <FileText size={18} className="mr-2" />
                <span>All Documents</span>
              </Link>
            </li>
            <li>
              <Link
                to="/shared"
                className="flex items-center py-2 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <Users size={18} className="mr-2" />
                <span>Shared with me</span>
              </Link>
            </li>
            <li>
              <Link
                to="/starred"
                className="flex items-center py-2 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <Star size={18} className="mr-2" />
                <span>Starred</span>
              </Link>
            </li>
            <li>
              <Link
                to="/trash"
                className="flex items-center py-2 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <Trash2 size={18} className="mr-2" />
                <span>Trash</span>
              </Link>
            </li>
          </ul>
          
          <div className="mt-6">
            <button
              onClick={() => setIsRecentOpen(!isRecentOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-600"
            >
              <div className="flex items-center">
                <Clock size={18} className="mr-2" />
                <span>Recent documents</span>
              </div>
              {isRecentOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            
            {isRecentOpen && (
              <ul className="mt-1 space-y-1 px-2">
                {documents.map((doc) => (
                  <li key={doc.id}>
                    <Link
                      to={`/documents/${doc.id}`}
                      className="flex items-center py-2 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileText size={16} className="mr-2 text-gray-500" />
                      <span className="truncate">{doc.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
}
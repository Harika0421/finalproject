import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { DocumentProvider } from '../../context/DocumentContext';
import { useUser } from '../../context/UserContext';
import { Navigate } from 'react-router-dom';

export default function Layout() {
  const { isAuthenticated } = useUser();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <DocumentProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </DocumentProvider>
  );
}
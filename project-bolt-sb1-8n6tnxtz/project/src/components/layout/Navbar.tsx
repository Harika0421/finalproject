import { useState } from 'react';
import { Bell, HelpCircle, Settings, LogOut, User } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { currentUser, logout } = useUser();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex justify-between items-center h-16 px-4 md:px-6">
        <div>
          {/* Page-specific content could go here */}
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
            <HelpCircle size={20} />
          </button>
          <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
            <Settings size={20} />
          </button>
          
          <div className="relative">
            <button 
              className="flex items-center space-x-2"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div 
                className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: currentUser?.color }}
              >
                {currentUser?.name.charAt(0).toUpperCase()}
              </div>
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium">{currentUser?.name}</p>
                  <p className="text-xs text-gray-500">{currentUser?.email}</p>
                </div>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <User size={16} className="mr-2" />
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <Settings size={16} className="mr-2" />
                  Settings
                </a>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import DocumentEditor from './pages/DocumentEditor';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="documents/:id" element={<DocumentEditor />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
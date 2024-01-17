import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginScreen from './components/Login';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AdminPage from './views/AdminPage';
import { useEffect } from 'react';

interface Admin {
  role: 'admin';
}

interface Manager {
  role: 'manager';
  managerId: number;
}

interface Employee {
  role: 'employee';
  employeeId: number;
}

type User = Admin | Manager | Employee;

function App() {

  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    try {
      if (username === 'admin' && password === 'admin') {
        const adminUser: Admin = { role: 'admin' };
        setUser(adminUser);
        navigate('/admin');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login');
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
  <div className="App">
    <Routes>
        <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
        <Route
          path="/admin"
          element={user ? <AdminPage /> : <Navigate to="/login" />}
        />
      </Routes>
  </div>
  );
}

export default App;

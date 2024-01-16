import './App.css';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import ResponsiveAppBar from './components/Menu';
import LoginScreen from './components/Login';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Admin from './views/Admin';

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

  return (
    <div className="App">
      
      <Routes>
        <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
        
        {user ? (
          <Route path="/admin" element={<Admin />} />
        ) : (
          (() => {
            navigate('/login');
            return null;
          })()
        )}

        {routes.map((r, index) => (
          <Route key={index} path={r.path} element={<r.component />} />
        ))}
      </Routes>
    </div>
  );
}

export default App;

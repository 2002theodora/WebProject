import './App.css';
import { Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LoginScreen from './components/Login';
import AdminPage from './views/AdminPage';
import TodoList from './components/TodoList';

//Define types for roles
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
//Union type
type User = Admin | Manager | Employee;

function App() {

  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  //Funtion for user login
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
//Navigate to login page
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div>
  <div className="App">
    {/* Routes */}
    <Routes>
        <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
        <Route
          path="/admin"
          element={user ? <AdminPage /> : <Navigate to="/login" />}
        />
      </Routes>
  </div>
{/* TodoList component */}
  <div className="Todolist">
      <TodoList />
  </div>
  </div>
  );
}

export default App;

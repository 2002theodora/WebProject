import './App.css';
import { Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LoginScreen from './components/Login';
import AdminPage from './views/AdminPage';
import ManagerList from './views/Manager';
import EmployeeList from './views/Employee';
import TodoList from './components/TodoList';

interface Admin {
  role: 'admin';
}

interface Manager {
  role: 'manager';
}

interface Employee {
  role: 'employee';
}

type User = Admin | Manager | Employee;

function App() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleLogin = (username: string, password: string) => {
  
        if (username === 'admin' && password === 'admin') {
          const adminUser: Admin = { role: 'admin' };
          setUser(adminUser);
          navigate('/admin');
        } else if(username === 'manager' && password === 'manager') {
            const managerUser: Manager = { role: 'manager' };
            setUser(managerUser);
            navigate('/manager');
          } 
         else {
          if (username === 'employee' && password === 'employee') {
            const employeeUser: Employee = { role: 'employee' };
            setUser(employeeUser);
            navigate('/employee');
          } 
        }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div>
  <div className="App">
    
    <Routes>
          <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
          <Route path="/admin" element={user ? <AdminPage /> : <Navigate to="/login" />} />
          <Route path="/manager" element={user ? <ManagerList /> : <Navigate to="/login" />} />
          <Route path="/employee" element={user ? <EmployeeList /> : <Navigate to="/login" />} />
        </Routes>
  </div>
  <div className="Todolist">
      <TodoList />
  </div>
  </div>
  );
}

export default App;

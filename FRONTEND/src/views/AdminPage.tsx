import { useEffect, useState } from "react";
import { get, post, remove } from "../api/Calls";
import { Employee } from "../models/Employee";
import { Manager } from "../models/Manager";
import { Box, Button, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import _ from "lodash";
import { Task } from "../models/Task";

export default function AdminPage() {

  const [managerData, setManagerData] = useState({
    ManagerId : 0,
    ManagerName: '',
    ManagerSurName: '',
    ManagerAge: 0,
    ManagerDepartment: '',
    ManagerPhone: '',
    ManagerEmail: '',
    Employees: [] as Employee[],
    username: '',
    password: ''
  });

  const [employeeData, setEmployeeData] = useState({
    EmployeeId : 0,
    EmployeeName: '',
    EmployeeSurName: '',
    EmployeeAge: 0,
    EmployeeOccupation: '',
    EmployeePhone: '',
    EmployeeEmail: '',
    Tasks: [] as Task[],
    ManagerId: 0,
    username: '',
    password: ''  
  });

  const createManager = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const createdManager = await post('/manager', managerData);

      console.log('Manager created successfully:', createdManager);

    } catch (error) {
      console.error('Error creating manager:', error);
    }
  };

  const createEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const createdEmployee = await post('/employee', employeeData);
  
        console.log('Employee created successfully:', createdEmployee);
  
    } catch (error) {
        console.error('Error creating employee:', error);
    }
  };

  return (
        
    <div>
      <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '20px' }}>
        <h2>Manager Information</h2>
          <TextField
            label="Manager Id"
            value={managerData.ManagerId.toString()}
            onChange={(e) => setManagerData({ ...managerData, ManagerId: parseInt(e.target.value, 10) || 0 })}
          />
          <TextField
            label="Manager Name"
            value={managerData.ManagerName}
            onChange={(e) => setManagerData({ ...managerData, ManagerName: e.target.value })}
          />
          <TextField
            label="Manager Surname"
            value={managerData.ManagerSurName}
            onChange={(e) => setManagerData({ ...managerData, ManagerSurName: e.target.value })}
          />
          <TextField
            label="Manager Age"
            value={managerData.ManagerAge.toString()}
            onChange={(e) => setManagerData({ ...managerData, ManagerAge: parseInt(e.target.value, 10) || 0 })}
          />
          <TextField
            label="Manager Department"
            value={managerData.ManagerDepartment}
            onChange={(e) => setManagerData({ ...managerData, ManagerDepartment: e.target.value })}
          />
          <TextField
            label="Manager Phone"
            value={managerData.ManagerPhone}
            onChange={(e) => setManagerData({ ...managerData, ManagerPhone: e.target.value })}
          />
          <TextField
            label="Manager Email"
            value={managerData.ManagerEmail}
            onChange={(e) => setManagerData({ ...managerData, ManagerEmail: e.target.value })}
          />
          <TextField
            label="Manager username"
            value={managerData.username}
            onChange={(e) => setManagerData({ ...managerData, username: e.target.value })}
          />
          <TextField
            label="Manager password"
            value={managerData.password}
            onChange={(e) => setManagerData({ ...managerData, password: e.target.value })}
          />
          <Button style={{ marginBottom: '20px' }} startIcon={<AddCircleIcon />} variant="contained" onClick={createManager}>
            Create Manager
          </Button>
          
      </div>
    

    <div>
      <div style={{ border: '1px solid #ddd', padding: '10px' }}>
        <h2>Employee Information</h2>
    
        <TextField
          label="Employee Id"
          value={employeeData.EmployeeId.toString()}
          onChange={(e) => setEmployeeData({ ...employeeData, EmployeeId: parseInt(e.target.value, 10) || 0 })}
        />
        <TextField
          label="Employee Name"
          value={employeeData.EmployeeName}
          onChange={(e) => setEmployeeData({ ...employeeData, EmployeeName: e.target.value })}
        />
        <TextField
          label="Employee Surname"
          value={employeeData.EmployeeSurName}
          onChange={(e) => setEmployeeData({ ...employeeData, EmployeeSurName: e.target.value })}
        />
        <TextField
          label="Employee Age"
          value={employeeData.EmployeeAge.toString()}
          onChange={(e) => setEmployeeData({ ...employeeData, EmployeeAge: parseInt(e.target.value, 10) || 0 })}
        />
        <TextField
          label="Employee Occupation"
          value={employeeData.EmployeeOccupation}
          onChange={(e) => setEmployeeData({ ...employeeData, EmployeeOccupation: e.target.value })}
        />
        <TextField
          label="Employee Phone"
          value={employeeData.EmployeePhone}
          onChange={(e) => setEmployeeData({ ...employeeData, EmployeePhone: e.target.value })}
        />
        <TextField
          label="Employee Email"
          value={employeeData.EmployeeEmail}
          onChange={(e) => setEmployeeData({ ...employeeData, EmployeeEmail: e.target.value })}
        />
        <TextField
          label="Manager Id"
          value={employeeData.ManagerId.toString()}
          onChange={(e) => setEmployeeData({ ...employeeData, ManagerId: parseInt(e.target.value, 10) || 0 })}
        />
        <TextField
          label="Employee username"
          value={employeeData.username}
          onChange={(e) => setEmployeeData({ ...employeeData, username: e.target.value })}
        />
        <TextField
          label="Employee password"
          value={employeeData.password}
          onChange={(e) => setEmployeeData({ ...employeeData, password: e.target.value })}
        />
        <Button style={{ marginBottom: '20px' }} startIcon={<AddCircleIcon />} variant="contained" onClick={createEmployee}>
          Create Employee
        </Button>
        
      </div>
    </div>
  </div>
);
}
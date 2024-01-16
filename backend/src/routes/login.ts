import express from 'express';
import { Model } from 'sequelize';
import Manager, { ManagerAttributes } from '../entities/Manager';
import Employee, { EmployeeAttributes } from '../entities/Employee';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      let userManager: Model<ManagerAttributes> | null = await Manager.findOne({ where: { username, password } });
  
      if (!userManager) {
        let userEmployee: Model<EmployeeAttributes> | null = await Employee.findOne({ where: { username, password } });
        if (userEmployee) {
          res.status(200).json({ role: 'employee' });
          return;
        }
      } else {
        res.status(200).json({ role: 'manager' });
        return;
      }
  
      res.status(401).json({ error: 'Invalid credentials' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  export default router;
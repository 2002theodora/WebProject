import express from 'express';
import {createEmployee, getEmployeeById, getEmployees, deleteEmployee, updateEmployee} from "../dataAccess/employeeDA"
import employeeFilterDto from '../dataAccess/models/employeeFilterDto';

let employeeRouter = express.Router();
  
employeeRouter.route('/employee').post( async (req, res) => {
  return res.json(await createEmployee(req.body));
})

employeeRouter.route('/employee').get( async (req, res) => {  
  var queryParams = new employeeFilterDto(req.query) 
  return res.json(await getEmployees(queryParams));
})


export default employeeRouter;
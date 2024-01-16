import db from '../dbConfig';
import Sequelize from 'sequelize';
import { ModelDefined } from 'sequelize';
import { TaskAttributes } from './Task.ts';
import { CommonAttributes } from './CommonAttributes';

export interface EmployeeAttributes extends CommonAttributes{
    EmployeeId : number,
    EmployeeName: string,
    EmployeeSurName: string,
    EmployeeAge: number,
    EmployeeOccupation: string,
    EmployeePhone: string | null,
    EmployeeEmail: string | null,
    ManagerId: number,
    Tasks: TaskAttributes[]
}

export interface EmployeeCreationAttributes extends EmployeeAttributes {}

const Employee : ModelDefined<EmployeeAttributes, EmployeeCreationAttributes> = db.define("Employee", 
{
    EmployeeId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    EmployeeName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    EmployeeSurName:
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    EmployeeAge: 
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    EmployeeOccupation:
    {
        type: Sequelize.STRING,
        allowNull: false 
    },  
    
    EmployeePhone:
    {
        type: Sequelize.STRING,
        allowNull: true 
    },

    EmployeeEmail:
    {
        type: Sequelize.STRING,
        allowNull: true 
    },

    ManagerId:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
});

export default Employee;
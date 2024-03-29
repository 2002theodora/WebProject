import db from '../dbConfig';
import Sequelize from 'sequelize';
import { ModelDefined } from 'sequelize';
import { EmployeeAttributes } from './Employee.ts';

export interface ManagerAttributes{
    ManagerId : number,
    ManagerName: string,
    ManagerSurName: string,
    ManagerAge: number,
    ManagerDepartment: string,
    ManagerPhone: string | null,
    ManagerEmail: string | null,
    Employees: EmployeeAttributes[],
    username: string;
    password: string;
}

export interface ManagerCreationAttributes extends ManagerAttributes {}

const Manager : ModelDefined<ManagerAttributes, ManagerCreationAttributes> = db.define("Manager", 
{
    ManagerId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ManagerName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    ManagerSurName:
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    ManagerAge: 
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    ManagerDepartment:
    {
        type: Sequelize.STRING,
        allowNull: false 
    },  
    
    ManagerPhone:
    {
        type: Sequelize.STRING,
        allowNull: true 
    },

    ManagerEmail:
    {
        type: Sequelize.STRING,
        allowNull: true 
    },

    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

export default Manager;
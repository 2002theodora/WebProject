import db from '../dbConfig';
import Sequelize, { ModelDefined } from 'sequelize';

export interface TaskAttributes{
    TaskId: number,
    TaskDetail: string,
    TaskAssignmentDate: string,
    TaskDeadline: string
    EmployeeId: number
}

export interface TaskCreationAttributes extends TaskAttributes {}

const Task : ModelDefined<TaskAttributes, TaskCreationAttributes> = db.define("Task", 
{
    TaskId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    TaskDetail: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    TaskAssignmentDate:
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    TaskDeadline:
    {
        type: Sequelize.STRING,
        allowNull:false
    },

    EmployeeId: 
    {
        type: Sequelize.INTEGER,
        allowNull: false
    }   
});

export default Task;
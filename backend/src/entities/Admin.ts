import db from '../dbConfig';
import Sequelize from 'sequelize';
import { ModelDefined } from 'sequelize';

export interface AdminAttributes{
    AdminId : number,
    AdminName: string,
    AdminSurName: string,
    AdminPhone: string | null,
    AdminEmail: string | null
}

export interface AdminCreationAttributes extends AdminAttributes {}

const Manager : ModelDefined<AdminAttributes, AdminCreationAttributes> = db.define("Admin", 
{
    AdminId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    AdminName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    AdminSurName:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    AdminPhone:
    {
        type: Sequelize.STRING,
        allowNull: true 
    },

    AdminEmail:
    {
        type: Sequelize.STRING,
        allowNull: true 
    }
});

export default Manager;
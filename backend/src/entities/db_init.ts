import mysql from 'mysql2/promise';
import env from 'dotenv';
import Employee from './Employee';
import Manager from './Manager';
import Task from './Task';
import { Tasks } from './dbConst';

env.config();

async function createDatabase() {
  try {
    const connection = await mysql.createConnection({
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`);
    await connection.end();
  } catch (err: any) {
    console.warn((err as Error).stack);
  }
}

function fkConfig() {
  Employee.hasMany(Task, { as: Tasks, foreignKey: 'EmployeeId' });
  Task.belongsTo(Employee, { foreignKey: 'EmployeeId' });

  Manager.hasMany(Employee, { as: Tasks, foreignKey: 'ManagerId' });
  Employee.belongsTo(Manager, { foreignKey: 'ManagerId' });
}

async function db_init() {
  await createDatabase();
  fkConfig();
}

export default db_init;

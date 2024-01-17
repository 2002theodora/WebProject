import { Employee } from "./Employee"

export interface Manager{
    ManagerId : number,
    ManagerName: string,
    ManagerSurName: string,
    ManagerAge: number,
    ManagerDepartment: string,
    ManagerPhone: string | null,
    ManagerEmail: string | null,
    Employees: Employee[],
    username: string,
    password: string
}
import Manager, { ManagerCreationAttributes } from "../entities/Manager";
import { Tasks } from "../entities/dbConst";
import { Like } from "./operators";
import db from "../dbConfig";
import managerFilterDto from "./models/managerFilterDto";
import Employee from "../entities/Employee";

async function getManagerById(id: number) {
  return await Manager.findByPk(id, { include: [Employee] });
}

async function createManager(manager: ManagerCreationAttributes) {
  return await Manager.create(manager, { include: [{ model: Employee}] });
}

async function getManager(managerFilter: managerFilterDto) {

  if (!managerFilter.take)
    managerFilter.take = 10;

  if (!managerFilter.skip)
    managerFilter.skip = 0;

  let whereClause: any = {};
  if (managerFilter.managerName)
    whereClause.ManagerName = { [Like]: `%${managerFilter.managerName}%` };

  if (managerFilter.managerSurName)
    whereClause.managerSurName = { [Like]: `%${managerFilter.managerSurName}%` };

  return await Manager.findAndCountAll(
    {
      distinct: true,
      where: whereClause,
      limit: managerFilter.take,
      offset: managerFilter.skip * managerFilter.take,
    });

}

async function deleteManager(id: number) {
  let deleteElem = await Manager.findByPk(id);

  if (!deleteElem) {
    console.log("This element does not exist, so it cannot be deleted");
    return;
  }
  return await deleteElem.destroy();
}

async function updateManager(manager: ManagerCreationAttributes, id: number) {
  const findManager = await getManagerById(manager.ManagerId);

  if (!findManager) {
    console.log("This manager does not exist");
    return;
  }

  const t = await db.transaction()
  try {
    await findManager.update(manager);

    // deleted
    const existEmployees = await Employee.findAll({
      where: {
        EmployeeId: manager.Employees.map(employee => employee.EmployeeId),
      },
    });
    
    if (existEmployees.length > 0) {
      let employeeIds = existEmployees.map(employee => employee.dataValues.EmployeeId);
      let employeeIdsDeleted = employeeIds.filter(id => !manager.Employees.find(employee => employee.EmployeeId === id)?.EmployeeId);
    
      if (employeeIdsDeleted.length > 0) {
        await Employee.destroy({
          where: {
            EmployeeId: employeeIdsDeleted,
          },
        });
      }
    }
    
    // Inserted
    const insertedEmployees = manager.Employees.filter(employee => employee.EmployeeId === 0);
    if (insertedEmployees.length > 0) {
      await Employee.bulkCreate(insertedEmployees);
    }
    
    // Updated
    const updatedEmployees = manager.Employees.filter(employee => employee.EmployeeId !== 0);
    if (updatedEmployees.length > 0) {
      for (let employee of updatedEmployees) {
        const foundEmployee = await Employee.findByPk(employee.EmployeeId);
        if (foundEmployee) {
          await foundEmployee.update(employee);
        }
      }
    }

    await t.commit();

  } catch (e) {
    await t.rollback();
    throw e;
  }
}

export {
  createManager,
  getManagerById,
  getManager,
  deleteManager,
  updateManager
}
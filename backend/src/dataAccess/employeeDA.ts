import Employee, { EmployeeCreationAttributes } from "../entities/Employee";
import Address from "../entities/Task";
import { Tasks } from "../entities/dbConst";
import { Like } from "./operators";
import employeeFilterDto from "./models/employeeFilterDto";
import db from "../dbConfig";
import Task from "../entities/Task";

async function createEmployee(employee: EmployeeCreationAttributes) {
  return await Employee.create(employee, { include: [{ model: Task, as: Tasks }] });
}

async function getEmployees(employeeFilter: employeeFilterDto) {

  if (!employeeFilter.take)
    employeeFilter.take = 10;

  if (!employeeFilter.skip)
    employeeFilter.skip = 0;

  let whereClause: any = {};
  if (employeeFilter.employeeName)
    whereClause.EmployeeName = { [Like]: `%${employeeFilter.employeeName}%` };

  if (employeeFilter.employeeSurName)
    whereClause.EmployeeSurName = { [Like]: `%${employeeFilter.employeeSurName}%` };

  return await Employee.findAndCountAll(
    {
      distinct: true,
      where: whereClause,
      limit: employeeFilter.take,
      offset: employeeFilter.skip * employeeFilter.take,
    });

}

async function getEmployeeById(id: number) {
  return await Employee.findByPk(id, { include: [Tasks] });
}

async function deleteEmployee(id: number) {
  let deleteElem = await Employee.findByPk(id);

  if (!deleteElem) {
    console.log("This element does not exist, so it cannot be deleted");
    return;
  }
  return await deleteElem.destroy();
}

async function updateEmployee(employee: EmployeeCreationAttributes, id: number) {
  const findEmployee = await getEmployeeById(employee.EmployeeId);

  if (!findEmployee) {
    console.log("This employee does not exist");
    return;
  }

  const t = await db.transaction()
  try {
    await findEmployee.update(employee);

    // deleted
    const existTask = await Task.findAll({
      where: {
        EmployeeId: employee.EmployeeId,
      },
    });

    if (existTask.length > 0) {
      let TaskIds = existTask.map(a => a.dataValues.TaskId);
      let TaskIdsDeleted = TaskIds.filter(id => !employee.Tasks.find(add => add.TaskId === id)?.TaskId)
      if (TaskIdsDeleted.length > 0)
        await Task.destroy({
          where: {
            TaskId: TaskIdsDeleted,
          },
        })
    }

    // inserted 
    const insertedA = employee.Tasks.filter(a => a.TaskId === 0)
    if (insertedA.length > 0)
      await Task.bulkCreate(insertedA)

    // updated
    const updatedA = employee.Tasks.filter(a => a.TaskId !== 0);
    if (updatedA.length > 0) {
      for (let item of updatedA) {
        const findA = await Task.findByPk(item.TaskId);
        await findA?.update(item);
      }
    }

    await t.commit();

  } catch (e) {
    await t.rollback();
    throw e;
  }
}

export {
  createEmployee,
  getEmployeeById,
  getEmployees,
  deleteEmployee,
  updateEmployee
}
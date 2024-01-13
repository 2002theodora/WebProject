import Manager, { ManagerCreationAttributes } from "../entities/Manager";
import { Tasks } from "../entities/dbConst";
import { Like } from "./operators";
import db from "../dbConfig";
import Task from "../entities/Task";
import managerFilterDto from "./models/managerFilterDto";

async function createManager(manager: ManagerCreationAttributes) {
  return await Manager.create(manager, { include: [{ model: Task, as: Tasks }] });
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

async function getManagerById(id: number) {
  return await Manager.findByPk(id, { include: [Tasks] });
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
    console.log("This employee does not exist");
    return;
  }

  const t = await db.transaction()
  try {
    await findManager.update(manager);

    // deleted
    const existTask = await Task.findAll({
      where: {
        EmployeeId: manager.ManagerId,
      },
    });

    if (existTask.length > 0) {
      let TaskIds = existTask.map(a => a.dataValues.TaskId);
      let TaskIdsDeleted = TaskIds.filter(id => !manager.Tasks.find(add => add.TaskId === id)?.TaskId)
      if (TaskIdsDeleted.length > 0)
        await Task.destroy({
          where: {
            TaskId: TaskIdsDeleted,
          },
        })
    }

    // inserted 
    const insertedA = manager.Tasks.filter(a => a.TaskId === 0)
    if (insertedA.length > 0)
      await Task.bulkCreate(insertedA)

    // updated
    const updatedA = manager.Tasks.filter(a => a.TaskId !== 0);
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
  createManager,
  getManagerById,
  getManager,
  deleteManager,
  updateManager
}
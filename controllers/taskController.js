import { prisma } from "../lib/prisma.js";

const getAllTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: Number(req.body.userId)
      },
      orderBy: {
        id: "asc"
      }
    })
    
    res.json({ message: "All tasks gotten!", tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

const createTask = async (req, res) => {
  try {
    const createdTask = await prisma.task.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        completed: false,
        userId: Number(req.body.userId),
      }
    })

    res.json({ message: "Task created!", task: createdTask });
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

const updateTask = async (req, res) => {
  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed
      }
    })

    res.json({ message: "Task updated!", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

const deleteTask = async (req, res) => {
  try {
    await prisma.task.delete({
      where: {
        id: Number(req.params.id)
      }
    })

    res.json({ message: "Task deleted!" });
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

export { 
    getAllTasks, 
    createTask, 
    updateTask, 
    deleteTask 
};
import { prisma } from "../lib/prisma.js";

const getHabit = (req, res) => {
  res.json({ message: "Single habit gotten!" });
};

const getAllHabits = async (req, res) => {
  try {
    const { userId } = req.body;

    const habits = await prisma.habit.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        id: "asc",
      }
    });

    res.json({ message: "All habits gotten!", habits });
  } catch (error) {
    console.error("Error fetching habits:", error);
  }
};

const createHabit = async (req, res) => {
  try { 
    const { name, description, userId } = req.body;

    const createdHabit = await prisma.habit.create({
      data: {
        // id auto-generated I think
        // createdAt auto-generated I think
        name: name,
        description: description,
        userId: userId,
      }
    });

    res.json({ message: "Habit created!", habit: createdHabit });
  } catch (error) {
    console.error("Error creating habit:", error);
  }
};

const updateHabit = async (req, res) => {
  try {

    const { id } = req.params;
    const { name, description } = req.body;

    const updatedHabit = await prisma.habit.update({
      where: {
        id: Number(id)
      },
      data: {
        name: name,
        description: description,
      }
    });

    res.json({ message: "Put request received! Habit updated!" })
  } catch (error) {
    console.error("Error updating habit:", error);
  }
  
};

const deleteHabit = async (req, res) => {
  try {
    const habitId = req.params.id;

    await prisma.habit.delete({
      where: {
        id: Number(habitId)
      }
    });

    res.json({ message: "Habit deleted!", });
  } catch (error) {
    console.error("Error deleting habit:", error);
  }
};

export { getAllHabits, getHabit, createHabit, updateHabit, deleteHabit };
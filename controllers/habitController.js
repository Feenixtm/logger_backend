import { prisma } from "../lib/prisma.js";

const getHabit = (req, res) => {
  res.json({ message: "Single habit gotten!" });
};

const getAllHabits = async (req, res) => {
  try {
    // const { userId } = req.body;
    const userId = Number(req.user.id);

    const habits = await prisma.habit.findMany({
      where: {
        userId: userId
      },
      include: {
        habitDatesCompleted: true
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
    const userId = Number(req.user.id);
    const { name, description } = req.body;

    const createdHabit = await prisma.habit.create({
      data: {
        name: name,
        description: description,
        userId: userId,
      },
    });

    res.json({ message: "Habit created!", createdHabit });
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
      },
      include: {
        habitDatesCompleted: true
      }
    });

    res.json({ message: "Put request received! Habit updated!", updatedHabit })
  } catch (error) {
    console.error("Error updating habit:", error);
  }
  
};

const deleteHabit = async (req, res) => {
  try {
    const habitId = Number(req.params.id);
    // console.log(habitId);

    await prisma.$transaction([
      prisma.habitDateCompleted.deleteMany({
        where: {
          habitId: habitId
        }
      }),
      prisma.habit.delete({
        where: {
          id: habitId
        }
      })
    ]);

    res.json({ message: "Habit deleted!", });
  } catch (error) {
    console.error("Error deleting habit:", error);
  }
};

const markHabitAsComplete = async (req, res) => {
  try {
    const habitId = req.body.habitId;
    const date = req.body.date;

    const createdHabitDateCompleted = await prisma.habitDateCompleted.create({
      data: {
        date,
        habitId: Number(habitId)
      }
    })

    res.json({ message: `Habit marked as complete on ${ date }`, createdHabitDateCompleted })
  } catch (error) {
    console.error("Error marking habit as complete:", error);
  }
}

const markHabitAsIncomplete = async (req, res) => {
  try {
    await prisma.habitDateCompleted.delete({
      where: {
        id: Number(req.params.id)
      }
    })

    res.json({ message: "Habit marked as incomplete" })
  } catch (error) {
    console.error("Error marking habit as incomplete:", error);
  }
}

export { 
  getAllHabits, 
  getHabit, 
  createHabit, 
  updateHabit, 
  deleteHabit,
  markHabitAsComplete,
  markHabitAsIncomplete
};
const getHabit = (req, res) => {
  res.json({ message: "Single habit gotten!" });
};

const getAllHabits = (req, res) => {
  res.json({ message: "All habits gotten!" });
};

const createHabit = (req, res) => {
  res.json({ message: "Habit created!" });
};

const updateHabit = (req, res) => {
  res.json({ message: "Habit updated!" });
};

const deleteHabit = (req, res) => {
  res.json({ message: "Habit deleted!" });
};

export { getAllHabits, getHabit, createHabit, updateHabit, deleteHabit };
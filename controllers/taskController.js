const getAllTasks = (req, res) => {
  res.json({ message: "All tasks gotten!" });
};

const getTask = (req, res) => {
  res.json({ message: "Single task gotten!" });
};

const createTask = (req, res) => {
  res.json({ message: "Task created!" });
};

const updateTask = (req, res) => {
  res.json({ message: "Task updated!" });
};

const deleteTask = (req, res) => {
  res.json({ message: "Task deleted!" });
};

export { 
    getAllTasks, 
    getTask, 
    createTask, 
    updateTask, 
    deleteTask 
};
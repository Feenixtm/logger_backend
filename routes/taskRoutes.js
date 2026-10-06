import express from "express";
const taskRouter = express.Router();

import { 
    getAllTasks, 
    createTask, 
    updateTask, 
    deleteTask 
} from "../controllers/taskController.js";

taskRouter.get("/", getAllTasks);
taskRouter.post("/", createTask);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

export default taskRouter;
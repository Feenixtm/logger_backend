import express from "express";
const taskRouter = express.Router();

import { 
    getAllTasks, 
    getTask, 
    createTask, 
    updateTask, 
    deleteTask 
} from "../controllers/taskController.js";

taskRouter.get("/", getAllTasks);
taskRouter.get("/:id", getTask);
taskRouter.post("/", createTask);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

export default taskRouter;
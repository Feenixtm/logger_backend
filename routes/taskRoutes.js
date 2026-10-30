import express from "express";
const taskRouter = express.Router();

import { 
    getAllTasks, 
    createTask, 
    updateTask, 
    deleteTask 
} from "../controllers/taskController.js";

import { authenticateToken } from "../middleware/auth.js"

taskRouter.get("/", authenticateToken, getAllTasks);
taskRouter.post("/", authenticateToken, createTask);
taskRouter.put("/:id", authenticateToken, updateTask);
taskRouter.delete("/:id", authenticateToken, deleteTask);

export default taskRouter;
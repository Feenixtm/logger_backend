import express from "express";
const habitRouter = express.Router();

import { 
    getAllHabits, 
    getHabit, 
    createHabit, 
    updateHabit, 
    deleteHabit,
    markHabitAsComplete,
    markHabitAsIncomplete
} from "../controllers/habitController.js";

import { authenticateToken } from "../middleware/auth.js"

habitRouter.get("/", authenticateToken, getAllHabits);
habitRouter.get("/:id", authenticateToken, getHabit);
habitRouter.post("/", authenticateToken, createHabit);
habitRouter.put("/:id", authenticateToken, updateHabit);
habitRouter.delete("/:id", authenticateToken, deleteHabit);

habitRouter.post("/datesCompleted/", authenticateToken, markHabitAsComplete);
habitRouter.delete("/datesCompleted/:id", authenticateToken, markHabitAsIncomplete);

export default habitRouter;
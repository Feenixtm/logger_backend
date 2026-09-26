import express from "express";
const habitRouter = express.Router();

import { 
    getAllHabits, 
    getHabit, 
    createHabit, 
    updateHabit, 
    deleteHabit 
} from "../controllers/habitController.js";

habitRouter.get("/", getAllHabits);
habitRouter.get("/:id", getHabit);
habitRouter.post("/", createHabit);
habitRouter.put("/:id", updateHabit);
habitRouter.delete("/:id", deleteHabit);

export default habitRouter;
import express from "express";
const journalRouter = express.Router();

import { 
    getAllJournals, 
    getJournal, 
    createJournal, 
    updateJournal, 
    deleteJournal 
} from "../controllers/journalController.js";

journalRouter.get("/", getAllJournals);
journalRouter.get("/:id", getJournal);
journalRouter.post("/", createJournal);
journalRouter.put("/:id", updateJournal);
journalRouter.delete("/:id", deleteJournal);

export default journalRouter;
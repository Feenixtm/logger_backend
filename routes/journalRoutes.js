import express from "express";
const journalRouter = express.Router();

import { 
    getAllJournals, 
    createJournalEntry, 
    updateJournal, 
    deleteJournal 
} from "../controllers/journalController.js";

journalRouter.get("/", getAllJournals);
journalRouter.post("/", createJournalEntry);
journalRouter.put("/:id", updateJournal);
journalRouter.delete("/:id", deleteJournal);

export default journalRouter;
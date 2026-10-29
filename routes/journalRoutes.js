import express from "express";
const journalRouter = express.Router();

import { 
    getAllJournals, 
    createJournalEntry, 
    updateJournal, 
    deleteJournal 
} from "../controllers/journalController.js";

import { authenticateToken } from "../middleware/auth.js"

journalRouter.get("/", authenticateToken, getAllJournals);
journalRouter.post("/", authenticateToken, createJournalEntry);
journalRouter.put("/:id", authenticateToken, updateJournal);
journalRouter.delete("/:id", authenticateToken, deleteJournal);

export default journalRouter;
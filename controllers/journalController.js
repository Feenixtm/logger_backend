import { prisma } from "../lib/prisma.js";

const getAllJournals = async (req, res) => {
  const allEntries = await prisma.journalEntry.findMany({
    where: {
      userId: Number(req.body.userId)
    }
  });

  res.json({ message: "All journals gotten!", allEntries });
};

const createJournalEntry = async (req, res) => {
  try {

    const { userId } = req.body;
    const { date } = req.body;
    const { morningContent, afternoonContent, eveningContent } = req.body;

    if (morningContent.trim() === "" && afternoonContent.trim() === "" && eveningContent.trim() === "") {
      return res.json({ message: "All entries are empty! Saving abandoned." });
    }

    const newJournalEntry = await prisma.journalEntry.create({
      data: {
        date: date,
        morningContent: morningContent,
        afternoonContent: afternoonContent,
        eveningContent: eveningContent,
        userId: Number(userId)
      },
    });

    res.json({ message: "Journal entry created!", newJournalEntry });
  } catch (error) {
    res.json({ message: "Error creating journal entry!", error });
  }
};

const updateJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const { morningContent, afternoonContent, eveningContent } = req.body;

    if (morningContent.trim() === "" && afternoonContent.trim() === "" && eveningContent.trim() === "") {
      return res.json({ message: "All entries are empty!" });
    }

    const updatedEntry = await prisma.journalEntry.update({
      where: { 
        id: Number(id)
      },
      data: {
        morningContent,
        afternoonContent,
        eveningContent,
      },
    });

    res.json({ message: "Journal updated!", updatedEntry });
  } catch (error) {
    res.json({ message: "Error updating journal entry!", error });
  }  
};

const deleteJournal = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.journalEntry.delete({
      where: { 
        id: Number(id)
      },
    });

    res.json({ message: "Journal entry deleted!" });
  } catch (error) {
    res.json({ message: "Error deleting journal entry!", error });
  }
};

export { 
    getAllJournals, 
    createJournalEntry, 
    updateJournal, 
    deleteJournal 
};
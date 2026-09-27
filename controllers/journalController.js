import { prisma } from "../lib/prisma.js";

const getJournal = (req, res) => {
  res.json({ message: "Single journal gotten!" });
};

const getAllJournals = async (req, res) => {
  const allEntries = await prisma.journalEntry.findMany();

  res.json({ message: "All journals gotten!", allEntries });
};

const createJournal = async (req, res) => {
  try {
    const { date, morningEntry, afternoonEntry, eveningEntry } = req.body;

    if (morningEntry.trim() === "" && afternoonEntry.trim() === "" && eveningEntry.trim() === "") {
      return res.json({ message: "All entries are empty! Saving abandoned." });
    }

    const newEntry = await prisma.journal.create({
      data: {
        date,
        morningEntry,
        afternoonEntry,
        eveningEntry,
      },
    });

    res.json({ message: `Entry created for ${ date }!`, newEntry });
  } catch (error) {
    res.json({ message: "Error creating journal entry!", error });
  }
};

const updateJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, morningEntry, afternoonEntry, eveningEntry } = req.body;

    if (morningEntry.trim() === "" && afternoonEntry.trim() === "" && eveningEntry.trim() === "") {
      return res.json({ message: "All entries are empty!" });
    }

    const updatedEntry = await prisma.journal.update({
      where: { id },
      data: {
        date,
        morningEntry,
        afternoonEntry,
        eveningEntry,
      },
    });

    res.json({ message: "Journal updated!", updatedEntry });
  } catch (error) {
    res.json({ message: "Error updating journal entry!", error });
  }  
};

const deleteJournal = (req, res) => {
  res.json({ message: "Journal deleted!" });
};

export { 
    getAllJournals, 
    getJournal, 
    createJournal, 
    updateJournal, 
    deleteJournal 
};
import { prisma } from "../prisma/client.js";

const getJournal = (req, res) => {
  res.json({ message: "Single journal gotten!" });
};

const getAllJournals = (req, res) => {
  res.json({ message: "All journals gotten!" });
};

const createJournal = async (req, res) => {
  try {
    const { date, morningEntry, afternoonEntry, eveningEntry } = req.body;

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

const updateJournal = (req, res) => {
  res.json({ message: "Journal updated!" });
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
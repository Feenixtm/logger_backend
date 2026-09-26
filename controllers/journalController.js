const getJournal = (req, res) => {
  res.json({ message: "Single journal gotten!" });
};

const getAllJournals = (req, res) => {
  res.json({ message: "All journals gotten!" });
};

const createJournal = (req, res) => {
  res.json({ message: "Journal created!" });
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
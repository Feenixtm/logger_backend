import express from "express";
const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.send("Index Route");
});

export default indexRouter;
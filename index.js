import express from "express";
import "dotenv/config";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import indexRouter from "./routes/indexRoutes.js";
import habitRouter from "./routes/habitRoutes.js";
import journalRouter from "./routes/journalRoutes.js";
import taskRouter from "./routes/taskRoutes.js";    

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));   

const PORT = process.env.APP_PORT || 5051;

app.use("/auth", authRouter);
app.use("/", indexRouter);
app.use("/habits", habitRouter);
app.use("/journal", journalRouter);
app.use("/tasks", taskRouter);

app.listen(PORT, (error) => {
    if (error) {
        console.error(`Error starting server: ${error}`);
    }

    console.log(`Server is running on port ${PORT}`);
});
import express from "express";
const authRouter= express.Router();
import { 
  getLogin, 
  postLogin, 
  getSignUp,
  postSignUp 
} from "../controllers/authControllers.js";

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);

authRouter.get("/signup", getSignUp);
authRouter.post("/signup", postSignUp);

export default authRouter;
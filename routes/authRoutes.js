import express from "express";
const authRouter= express.Router();
import { 
  postLogin, 
  postSignUp 
} from "../controllers/authControllers.js";

authRouter.post("/login", postLogin);
authRouter.post("/sign-up", postSignUp);

export default authRouter;
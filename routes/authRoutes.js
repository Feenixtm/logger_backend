import express from "express";
const authRouter= express.Router();
import { 
  postLogin, 
  postSignUp,
  postRefreshToken
} from "../controllers/authControllers.js";

authRouter.post("/login", postLogin);
authRouter.post("/sign-up", postSignUp);

authRouter.post("/refresh-token", postRefreshToken);

export default authRouter;
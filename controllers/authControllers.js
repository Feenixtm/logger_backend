import { prisma } from "../lib/prisma.js";
import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        username: username
      }
    });

    // Check if the user exists
    if (!existingUser) {
      res.status(401).json({ message: "No user found with this username." });
      return;
    }
    
    // Check if the password is valid
    const isPassswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPassswordValid) {
      res.status(401).json({ message: "Invalid password." });
      return;
    }

    const payload = {
      id: existingUser.id
    }

    // Generate a JWT token for the authenticated user
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "1d" });

    res.status(200).json({ username, password, accessToken, refreshToken });
  } catch (error) {
    res.status(400).json({ message: "Error logging in!", error });
  }
};

// ----------------------------------------

const postSignUp = async (req, res) => {
  try {
    const { username, displayName, password } = req.body;
    res.json({ username, displayName, password });

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({ 
      where: {
        username: username
      }
    });

    if (existingUser) {
      res.json({ message: "User already exists! Please choose a different username." }); 
      return;
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        displayName,
        password: hashedPassword
      }
    });

    res.json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    res.json({ message: "Error signing up!", error });
  }
};

// ----------------------------------------

export { postLogin, postSignUp };
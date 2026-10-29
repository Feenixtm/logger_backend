import { prisma } from "../lib/prisma.js";
import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const refreshTokens = [];

const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUserData = await prisma.user.findUnique({
      where: {
        username: username
      },
      include: {
        habits: {
          include: {
            habitDatesCompleted: true
          }
        },
        journalEntries: true,
        tasks: true,
        customTextAreas: true,
      }
    });

    // Check if the user exists
    if (!existingUserData) {
      res.status(401).json({ message: "No user found with this username." });
      return;
    }
    
    // Check if the password is valid
    const isPassswordValid = await bcrypt.compare(password, existingUserData.password);

    if (!isPassswordValid) {
      res.status(401).json({ message: "Invalid password." });
      return;
    }

    const payload = {
      id: existingUserData.id
    }

    // Generate a JWT token for the authenticated user
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "1d" });

    refreshTokens.push(refreshToken);

    res.cookie("refreshToken", refreshToken, { 
      httpOnly: true,
      secure: false,
      // Set secure: true ONLY if using https
      // sameSite: "strict",
      // sameSite: "lax" for differnt port on Frontend
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    return res.status(200).json({ existingUserData, accessToken });
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

// --------------------------------------------------------
// -------------------- Refresh Tokens --------------------
// --------------------------------------------------------

const postRefreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log(req.cookies);
  console.log(refreshToken);

  if (refreshToken === null) {
    return res.status(401).json({ message: "No refresh token provided." });
  }

  // if (!refreshTokens.includes(refreshToken)) {
  //   return res.status(403).json({ message: "Invalid refresh token." });
  // }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Invalid refresh token." });
    }

    const payload = {
      id: decoded.id
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "15m" });
    res.json({ accessToken });
  });
};

// ----------------------------------------

export { postLogin, postSignUp, postRefreshToken };
import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);
    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token: token,
      message: "Login successful",
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// me
router.get("/me", protect, async (req, res) => {
    res.status(200).json(req.user);
});


// generate a jwt
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}



export default router;
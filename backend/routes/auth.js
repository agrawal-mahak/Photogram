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

router.put("/me", protect, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username && username.trim() !== user.username) {
      const existingUsername = await User.findOne({ username: username.trim(), _id: { $ne: user._id } });
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }
      user.username = username.trim();
    }

    if (email && email.trim() !== user.email) {
      const existingEmail = await User.findOne({ email: email.trim(), _id: { $ne: user._id } });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }
      user.email = email.trim().toLowerCase();
    }

    if (password && password.trim()) {
      user.password = password;
    }

    const updatedUser = await user.save();
    const sanitizedUser = {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: sanitizedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// generate a jwt
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}



export default router;
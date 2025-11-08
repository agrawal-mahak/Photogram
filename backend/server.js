import "./config/loadEnv.js";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();

// Configure CORS
const allowedOrigins = [
  FRONTEND_URL?.replace(/\/$/, ""),
  "http://localhost:5173",
  "https://photogram-7svm.vercel.app",
].filter(Boolean);

app.use((req, res, next) => {
  const requestOrigin = req.headers.origin?.replace(/\/$/, "");

  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }

  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
    message: "Server is running",
  });
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { errorHandler } from "./middleware/error.js";
import authRoutes from "./routes/authRoutes.js";
//const authRoutes = require("./routes/authRoutes");

import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/rbacs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));


const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// Error handler
app.use(errorHandler);

export default app;

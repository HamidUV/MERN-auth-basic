import express from "express";
import mongoose from "mongoose";
import { UserRouter } from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Apply CORS middleware before defining routes
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};
app.use(cors(corsOptions));
app.use(cookieParser())
// Parse JSON requests
app.use(express.json());


// Mount user routes
app.use('/auth', UserRouter);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/authentication');

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

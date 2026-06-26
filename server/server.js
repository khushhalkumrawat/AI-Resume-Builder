import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./configs/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
await connectDB()

app.use(express.json())
app.use(cors())

app.get('/' , (req,res) => res.send("Server is Live..."))

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});
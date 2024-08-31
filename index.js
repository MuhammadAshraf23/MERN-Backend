import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/db.js';
import { DefaultData } from './default.js';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB().then(() => {
    // Call DefaultData after successful connection
    DefaultData();
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("Serer is running on port -->", PORT);
});


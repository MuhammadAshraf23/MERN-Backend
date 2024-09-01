import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import { connectDB } from './database/db.js';
import { DefaultData } from './default.js';
import router from './routes/route.js';
dotenv.config();

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());
app.use("/",router);

// Connect to MongoDB
connectDB().then(() => {
    // Call DefaultData after successful connection
    DefaultData();
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("Server is running on port -->", PORT);
});

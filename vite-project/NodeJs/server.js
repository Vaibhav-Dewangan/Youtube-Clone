import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from './Routes/UserRoutes.js';
import channelRoutes from './Routes/ChannelRoutes.js';
import videosRoutes from './Routes/VideosRoutes.js';
import shortRoutes from './Routes/ShortRoutes.js';
import verifyJWT from "./Middleware/VerifyJWT.js";

mongoose.connect("mongodb://localhost:27017/Youtube");
const db = mongoose.connection;

db.on("open", () => {
    console.log("Connection succesfull");
});

db.on("error", (error) => {
    console.log("MongoDB connection error :", error);
});

const app = express();
const PORT = 5200;

// Middleware to parse JSON
app.use(express.json());

//Enable CORS
app.use(cors());

// Logging Middleware
app.use((req, res, next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});

// Use Routes
app.use('/api/user',userRoutes);
app.use('/api/channel', channelRoutes);
app.use('/api/videos', videosRoutes);
app.use('/api/shorts', shortRoutes );



// Error Handeling middleware for catching unknown routes
app.use((req, res)=>{
    res.status(404).json({message:"Route not found"});
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



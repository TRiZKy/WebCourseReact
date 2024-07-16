import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import sensorRoutes from '../routes/sensorRoutes.js';
import cropRoutes from '../routes/cropRoutes.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Manually set CORS headers for all requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Routes
app.use('/api/sensors', sensorRoutes);
app.use('/api/crops', cropRoutes);

const PORT = process.env.PORT || 7458;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

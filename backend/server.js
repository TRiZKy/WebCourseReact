import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import sensorRoutes from './routes/sensorRoutes.js';
import cropRoutes from './routes/cropRoutes.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sensors', sensorRoutes);
app.use('/api/crops', cropRoutes);

const PORT = process.env.PORT || 7458;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

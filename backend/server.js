import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sensorRoutes from './routes/api.js'; // Adjust the path as necessary

dotenv.config();

const app = express();

// Use CORS middleware
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Other middleware
app.use(express.json());

// Routes
app.use('/api/sensors', sensorRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

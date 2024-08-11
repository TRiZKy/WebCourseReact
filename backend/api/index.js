import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import sensorRoutes from '../routes/sensorRoutes.js';
import cropRoutes from '../routes/cropRoutes.js';

dotenv.config();

/**
 * Connect to the MongoDB database using the connection string provided in the environment variables.
 */
connectDB();

const app = express();

/**
 * CORS configuration.
 * Defines the allowed origins for cross-origin requests.
 *
 * @constant {Array<string>} allowedOrigins - The list of allowed origins for CORS.
 * @constant {Object} corsOptions - The CORS options object.
 */
const allowedOrigins = [process.env.FRONTEND_URL, process.env.LOCAL_URL];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

/**
 * Middleware to manually set CORS headers for all requests.
 */
app.use((req, res, next) => {
    const origin = req.get('origin');
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Routes
/**
 * Route for sensor-related API endpoints.
 * @route /api/sensors
 */
app.use('/api/sensors', sensorRoutes);

/**
 * Route for crop-related API endpoints.
 * @route /api/crops
 */
app.use('/api/crops', cropRoutes);

const PORT = process.env.PORT || 7458;

/**
 * Start the Express server on the specified port.
 *
 * @function
 * @param {number} PORT - The port on which the server will listen.
 */
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/**
 * Function to gracefully shut down the server.
 */
const shutdown = () => {
    console.log('Shutting down server...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });

    // Forcefully shut down server if it doesn't close within 10 seconds
    setTimeout(() => {
        console.error('Forcing server shutdown');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

/**
 * Handle uncaught exceptions.
 *
 * @event process#uncaughtException
 * @param {Error} err - The error object.
 */
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
    shutdown();
});

/**
 * Handle unhandled promise rejections.
 *
 * @event process#unhandledRejection
 * @param {Error} err - The error object.
 */
process.on('unhandledRejection', (err) => {
    console.error('Unhandled promise rejection:', err);
    shutdown();
});

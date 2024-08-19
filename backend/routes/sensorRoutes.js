import express from 'express';
import { getSensors, getUserPreferences, saveUserPreferences, getSensorData } from '../controllers/sensorController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

/**
 * Express router for managing sensor-related operations.
 *
 * @module routes/sensors
 */

/**
 * GET /api/sensors
 *
 * Retrieves a list of available sensors.
 *
 * @name GetSensors
 * @route {GET} /
 * @controller {Function} getSensors - Controller function to handle retrieving the list of sensors.
 */
router.get('/', getSensors);

/**
 * GET /api/sensors/user/preferences
 *
 * Retrieves the current user's sensor preferences.
 *
 * @name GetUserPreferences
 * @route {GET} /user/preferences
 * @middleware {Function} auth - Middleware to authenticate the request.
 * @controller {Function} getUserPreferences - Controller function to handle retrieving the user's sensor preferences.
 */
router.get('/user/preferences', auth, getUserPreferences);

/**
 * POST /api/sensors/user/preferences
 *
 * Saves the current user's sensor preferences.
 *
 * @name SaveUserPreferences
 * @route {POST} /user/preferences
 * @middleware {Function} auth - Middleware to authenticate the request.
 * @controller {Function} saveUserPreferences - Controller function to handle saving the user's sensor preferences.
 */
router.post('/user/preferences', auth, saveUserPreferences);

/**
 * POST /api/sensors/data
 *
 * Retrieves sensor data based on the user's preferences or sensor IDs.
 *
 * @name GetSensorData
 * @route {POST} /data
 * @middleware {Function} auth - Middleware to authenticate the request.
 * @controller {Function} getSensorData - Controller function to handle retrieving sensor data.
 */
router.post('/data', auth, getSensorData);

export default router;

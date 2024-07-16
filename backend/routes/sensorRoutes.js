import express from 'express';
import { getSensors, getUserPreferences, saveUserPreferences, getSensorData } from '../controllers/sensorController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSensors);
router.get('/user/preferences', auth, getUserPreferences);
router.post('/user/preferences', auth, saveUserPreferences);
router.post('/data', auth, getSensorData);

export default router;

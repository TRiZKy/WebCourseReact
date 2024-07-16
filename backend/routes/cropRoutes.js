import express from 'express';
import { getCrops, addCrop, addNote } from '../controllers/cropController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getCrops);
router.post('/', auth, addCrop);
router.post('/:id/notes', auth, addNote);

export default router;

import express from 'express';
import { getCrops, addCrop, addNote, deleteCrop } from '../controllers/cropController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

/**
 * @route GET /api/crops
 * @desc Get all crops for the authenticated user
 * @access Private
 * @middleware auth
 */
router.get('/', auth, getCrops);

/**
 * @route POST /api/crops
 * @desc Add a new crop for the authenticated user
 * @access Private
 * @middleware auth
 */
router.post('/', auth, addCrop);

/**
 * @route POST /api/crops/:id/notes
 * @desc Add a note to an existing crop for the authenticated user
 * @access Private
 * @middleware auth
 */
router.post('/:id/notes', auth, addNote);

/**
 * @route DELETE /api/crops/:id
 * @desc Delete a crop by its ID for the authenticated user
 * @access Private
 * @middleware auth
 */
router.delete('/:id', auth, deleteCrop);

export default router;

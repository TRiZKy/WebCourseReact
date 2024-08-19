import express from 'express';
import { getCrops, addCrop, addNote, deleteCrop, getCropImage } from '../controllers/cropController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multerConfig.js';

const router = express.Router();

/**
 * Express router for managing crop-related operations.
 *
 * @module routes/crops
 */

/**
 * GET /api/crops
 *
 * Retrieves a list of crops.
 *
 * @name GetCrops
 * @route {GET} /
 * @middleware {Function} auth - Middleware to authenticate the request.
 * @controller {Function} getCrops - Controller function to handle retrieving crops.
 */
router.get('/', auth, getCrops);

/**
 * POST /api/crops
 *
 * Adds a new crop to the database.
 *
 * @name AddCrop
 * @route {POST} /
 * @middleware {Function} auth - Middleware to authenticate the request.
 * @middleware {Function} upload.single('image') - Middleware to handle single file upload for the 'image' field.
 * @controller {Function} addCrop - Controller function to handle adding a new crop.
 */
router.post('/', auth, upload.single('image'), addCrop);

/**
 * POST /api/crops/:id/notes
 *
 * Adds a note to an existing crop.
 *
 * @name AddNote
 * @route {POST} /:id/notes
 * @middleware {Function} auth - Middleware to authenticate the request.
 * @controller {Function} addNote - Controller function to handle adding a note to a crop.
 * @param {string} id - The ID of the crop to which the note is being added.
 */
router.post('/:id/notes', auth, addNote);

/**
 * DELETE /api/crops/:id
 *
 * Deletes a crop from the database.
 *
 * @name DeleteCrop
 * @route {DELETE} /:id
 * @middleware {Function} auth - Middleware to authenticate the request.
 * @controller {Function} deleteCrop - Controller function to handle deleting a crop.
 * @param {string} id - The ID of the crop to delete.
 */
router.delete('/:id', auth, deleteCrop);

/**
 * GET /api/crops/:id/image
 *
 * Retrieves the image associated with a specific crop.
 *
 * @name GetCropImage
 * @route {GET} /:id/image
 * @middleware {Function} auth - Middleware to authenticate the request.
 * @controller {Function} getCropImage - Controller function to handle retrieving a crop's image.
 * @param {string} id - The ID of the crop whose image is being retrieved.
 */
router.get('/:id/image', auth, getCropImage);

export default router;


import express from 'express';
import {getCrops, addCrop, addNote, deleteCrop, getCropImage} from '../controllers/cropController.js';
import  auth  from '../middleware/auth.js';
import upload from '../middleware/multerConfig.js';

const router = express.Router();

router.get('/', auth, getCrops);
router.post('/', auth, upload.single('image'), addCrop);
router.post('/:id/notes', auth, addNote);
router.delete('/:id', auth, deleteCrop);
router.get('/:id/image', auth, getCropImage);

export default router;

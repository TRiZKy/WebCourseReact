import Crop from '../models/cropModel.js';
import mongoose from 'mongoose';
/**
 * Retrieves all crops associated with the authenticated user.
 *
 * @async
 * @function getCrops
 * @param {Object} req - The request object, containing the authenticated user in `req.user`.
 * @param {Object} res - The response object used to send back the list of crops.
 * @returns {Promise<void>} A promise that resolves when the crops have been successfully retrieved and sent in the response.
 */
export const getCrops = async (req, res) => {
    try {
        const crops = await Crop.find({ userId: req.user.uid });
        res.json(crops);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Adds a new crop to the database associated with the authenticated user.
 *
 * @async
 * @function addCrop
 * @param {Object} req - The request object, containing crop data in `req.body` and the authenticated user in `req.user`.
 * @param {Object} res - The response object used to send back the created crop.
 * @returns {Promise<void>} A promise that resolves when the crop has been successfully created and saved to the database.
 */
export const addCrop = async (req, res) => {
    const userId = req.user._id || req.user.uid;

    const crop = new Crop({
        name: req.body.name,
        plantingDate: req.body.plantingDate,
        growthStage: req.body.growthStage,
        expectedHarvestDate: req.body.expectedHarvestDate,
        image: req.file ? req.file.buffer : null,  // Save the image as a Buffer
        notes: req.body.notes.map(note => ({
            text: note.text,
            date: note.date || Date.now(),
        })),
        userId: userId
    });

    try {
        const newCrop = await crop.save();
        res.status(201).json(newCrop);
    } catch (err) {
        console.error('Error saving crop:', err.message);
        res.status(400).json({ message: err.message });
    }
};

/**
 * Adds a new note to an existing crop associated with the authenticated user.
 *
 * @async
 * @function addNote
 * @param {Object} req - The request object, containing the crop ID in `req.params.id`, note data in `req.body`, and the authenticated user in `req.user`.
 * @param {Object} res - The response object used to send back the updated crop.
 * @returns {Promise<void>} A promise that resolves when the note has been successfully added to the crop.
 */
export const addNote = async (req, res) => {
    try {
        console.log('Adding note to crop:', req.params.id);
        console.log('Note text:', req.body.text);

        // Convert the id from string to ObjectId
        const cropId = mongoose.Types.ObjectId(req.params.id);

        // Find the crop by ObjectId and userId
        const crop = await Crop.findOne({ _id: cropId, userId: req.user.uid });
        if (!crop) {
            return res.status(404).json({ message: 'Crop not found' });
        }

        crop.notes.push({ text: req.body.text });
        await crop.save();

        console.log('Updated crop:', crop);
        res.status(201).json(crop);
    } catch (err) {
        console.error('Error adding note:', err.message);
        res.status(400).json({ message: err.message });
    }
};
/**
 * Deletes a crop by its ID.
 *
 * @async
 * @function deleteCrop
 * @param {Object} req - The request object containing the crop ID in `req.params.id`.
 * @param {Object} res - The response object used to send back the result of the deletion.
 * @returns {Promise<void>} A promise that resolves when the crop has been successfully deleted or an error has been handled.
 */
export const deleteCrop = async (req, res) => {
    try {
        const crop = await Crop.findOneAndDelete({ _id: req.params.id, userId: req.user.uid });
        if (!crop) {
            return res.status(404).json({ message: 'Crop not found' });
        }
        res.status(200).json({ message: 'Crop deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getCropImage = async (req, res) => {
    try {
        const crop = await Crop.findById(req.params.id);
        if (!crop || !crop.image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.set('Content-Type', 'image/png');  // or image/jpeg based on your images
        res.send(crop.image);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


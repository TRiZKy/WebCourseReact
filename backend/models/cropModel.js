import mongoose from 'mongoose';

/**
 * Schema representing a note associated with a crop.
 *
 * @typedef {Object} Note
 * @property {Date} date - The date the note was created. Defaults to the current date.
 * @property {String} text - The text content of the note.
 */
const NoteSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    text: String
});

/**
 * Schema representing a crop.
 *
 * @typedef {Object} Crop
 * @property {String} name - The name of the crop.
 * @property {Date} plantingDate - The date when the crop was planted.
 * @property {String} growthStage - The current growth stage of the crop.
 * @property {Date} expectedHarvestDate - The expected date for harvesting the crop.
 * @property {Note[]} notes - An array of notes associated with the crop.
 * @property {String} userId - The ID of the user who owns this crop. References the User model.
 */
const CropSchema = new mongoose.Schema({
    name: String,
    plantingDate: Date,
    growthStage: String,
    expectedHarvestDate: Date,
    notes: [NoteSchema],
    userId: { type: String, required: true }  // Change ObjectId to String
});

/**
 * Mongoose model representing a crop.
 *
 * @typedef {mongoose.Model} CropModel
 */
const Crop = mongoose.model('Crop', CropSchema);

export default Crop;

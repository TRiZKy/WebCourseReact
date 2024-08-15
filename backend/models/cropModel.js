// /models/cropModel.js
import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    text: String
});

const CropSchema = new mongoose.Schema({
    name: String,
    plantingDate: Date,
    growthStage: String,
    expectedHarvestDate: Date,
    image: Buffer,  // Store image as binary data
    notes: [NoteSchema],
    userId: { type: String, required: true }
});

const Crop = mongoose.model('Crop', CropSchema);

export default Crop;

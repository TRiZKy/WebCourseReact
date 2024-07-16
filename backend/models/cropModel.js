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
    notes: [NoteSchema],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Crop = mongoose.model('Crop', CropSchema);

export default Crop;

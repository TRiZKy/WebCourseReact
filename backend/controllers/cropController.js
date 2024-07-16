import Crop from '../models/cropModel.js';

export const getCrops = async (req, res) => {
    try {
        const crops = await Crop.find({ userId: req.user._id });
        res.json(crops);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addCrop = async (req, res) => {
    const crop = new Crop({
        name: req.body.name,
        plantingDate: req.body.plantingDate,
        growthStage: req.body.growthStage,
        expectedHarvestDate: req.body.expectedHarvestDate,
        notes: req.body.notes,
        userId: req.user._id
    });

    try {
        const newCrop = await crop.save();
        res.status(201).json(newCrop);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const addNote = async (req, res) => {
    try {
        const crop = await Crop.findOne({ _id: req.params.id, userId: req.user._id });
        if (!crop) {
            return res.status(404).json({ message: 'Crop not found' });
        }
        crop.notes.push(req.body);
        await crop.save();
        res.status(201).json(crop);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

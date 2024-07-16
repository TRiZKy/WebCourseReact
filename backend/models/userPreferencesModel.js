import mongoose from 'mongoose';

const UserPreferencesSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Change from ObjectId to String
    selectedSensors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sensor' }]
});

const UserPreferences = mongoose.model('UserPreferences', UserPreferencesSchema);

export default UserPreferences;

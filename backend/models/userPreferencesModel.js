import mongoose from 'mongoose';

const userPreferencesSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    selectedSensors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sensor'
    }]
});

const UserPreferences = mongoose.model('UserPreferences', userPreferencesSchema);

export default UserPreferences;

import mongoose from 'mongoose';

/**
 * Schema representing a user's preferences for selected sensors.
 *
 * @typedef {Object} UserPreferences
 * @property {String} userId - The ID of the user to whom these preferences belong. This field is required.
 * @property {mongoose.Schema.Types.ObjectId[]} selectedSensors - An array of references to the sensors selected by the user.
 */
const UserPreferencesSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    selectedSensors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sensor' }]
});

/**
 * Mongoose model representing user preferences for sensors.
 *
 * @typedef {mongoose.Model} UserPreferencesModel
 */
const UserPreferences = mongoose.model('UserPreferences', UserPreferencesSchema);

export default UserPreferences;

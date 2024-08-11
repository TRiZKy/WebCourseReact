import Sensor from '../models/sensorModel.js';
import UserPreferences from '../models/userPreferencesModel.js';

/**
 * Generates a random value based on the sensor type.
 *
 * @param {string} type - The type of sensor (e.g., 'temperature', 'humidity').
 * @returns {number} A random value appropriate for the given sensor type.
 */
const generateRandomValue = (type) => {
    switch (type) {
        case 'temperature':
            return Math.random() * (35 - 15) + 15; // Random temperature between 15 and 35 degrees Celsius
        case 'humidity':
            return Math.random() * (100 - 30) + 30; // Random humidity between 30% and 100%
        case 'soilMoisture':
            return Math.random() * (100 - 10) + 10; // Random soil moisture between 10% and 100%
        case 'light':
            return Math.random() * (1000 - 100) + 100; // Random light level between 100 and 1000 lux
        default:
            return 0;
    }
};

/**
 * Generates missing data for a sensor by creating hourly data points from the last known reading to the current time,
 * or up to one month ago.
 *
 * @async
 * @function generateMissingData
 * @param {Object} sensor - The sensor document from the database.
 * @param {Date} lastTime - The time of the last recorded reading.
 * @returns {Promise<void>} A promise that resolves when the missing data has been generated and saved.
 */
const generateMissingData = async (sensor, lastTime) => {
    const now = Date.now();
    let currentTime = new Date(lastTime).getTime();
    currentTime = Math.floor(currentTime / (1000 * 60 * 60)) * (1000 * 60 * 60); // Align to the start of the hour

    // Calculate the date one month ago
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    let oneMonthAgoEpoch = oneMonthAgo.getTime();
    oneMonthAgoEpoch= Math.floor(oneMonthAgoEpoch / (1000 * 60 * 60)) * (1000 * 60 * 60); // Align to the start of the hour

    const readings = [];

    // Generate data for every hour until now or up to one month ago
    while (currentTime < now && currentTime >= oneMonthAgoEpoch) {
        currentTime += 1000 * 60 * 60;
        if (currentTime <= now) {
            readings.push({ time: new Date(currentTime), value: generateRandomValue(sensor.type) });
        }
    }

    if (readings.length > 0) {
        await Sensor.updateOne(
            { _id: sensor._id },
            { $push: { readings: { $each: readings } } }
        );
    }
};

/**
 * Retrieves all sensors from the database.
 *
 * @async
 * @function getSensors
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send back the list of sensors.
 * @returns {Promise<void>} A promise that resolves when the sensors have been successfully retrieved and sent in the response.
 */
export const getSensors = async (req, res) => {
    try {
        const sensors = await Sensor.find();
        res.json(sensors);
    } catch (err) {
        console.error('Error fetching sensors:', err);
        res.status(500).json({ message: err.message });
    }
};

/**
 * Retrieves the user's sensor preferences or all sensors if no preferences are set.
 *
 * @async
 * @function getUserPreferences
 * @param {Object} req - The request object, containing the authenticated user's ID in `req.user.uid`.
 * @param {Object} res - The response object used to send back the user's preferred sensors or all sensors.
 * @returns {Promise<void>} A promise that resolves when the preferences have been successfully retrieved and sent in the response.
 */
export const getUserPreferences = async (req, res) => {
    try {
        const preferences = await UserPreferences.findOne({ userId: req.user.uid }).populate('selectedSensors');

        if (preferences ) {
            res.json(preferences.selectedSensors);
        } else {
            const allSensors = await Sensor.find();
            res.json(allSensors);
        }
    } catch (err) {
        console.error('Error fetching user preferences:', err);
        res.status(500).json({ message: err.message });
    }
};

/**
 * Saves the user's sensor preferences.
 *
 * @async
 * @function saveUserPreferences
 * @param {Object} req - The request object, containing the selected sensors in `req.body` and the authenticated user's ID in `req.user.uid`.
 * @param {Object} res - The response object used to confirm that the preferences were saved.
 * @returns {Promise<void>} A promise that resolves when the preferences have been successfully saved.
 */
export const saveUserPreferences = async (req, res) => {
    try {
        const { selectedSensors } = req.body;
        const userId = req.user.uid;

        // Delete existing preferences
        await UserPreferences.findOneAndDelete({ userId });

        // Create new preferences document
        const newPreferences = new UserPreferences({ userId, selectedSensors });

        // Save the new preferences
        await newPreferences.save();

        res.status(200).json({ message: 'Preferences saved' });
    } catch (err) {
        console.error('Error saving user preferences:', err);
        res.status(500).json({ message: err.message });
    }
};

/**
 * Retrieves sensor data, generates missing data if needed, and sends back the updated sensor data.
 *
 * @async
 * @function getSensorData
 * @param {Object} req - The request object, containing the sensor IDs in `req.body`.
 * @param {Object} res - The response object used to send back the updated sensor data.
 * @returns {Promise<void>} A promise that resolves when the sensor data has been successfully retrieved and sent in the response.
 */
export const getSensorData = async (req, res) => {
    try {
        const { sensorIds } = req.body;
        const sensorData = await Sensor.find({ _id: { $in: sensorIds } });

        // Check and generate missing data
        for (const sensor of sensorData) {
            const lastReading = sensor.readings[sensor.readings.length - 1];
            if (lastReading) {
                await generateMissingData(sensor, lastReading.time);
            } else {
                // If no readings exist, generate data from a month ago
                const oneMonthAgo = new Date();
                oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                await generateMissingData(sensor, oneMonthAgo);
            }
        }

        // Fetch updated sensor data
        const updatedSensorData = await Sensor.find({ _id: { $in: sensorIds } });

        res.json(updatedSensorData);
    } catch (err) {
        console.error('Error fetching sensor data:', err);
        res.status(500).json({ message: err.message });
    }
};

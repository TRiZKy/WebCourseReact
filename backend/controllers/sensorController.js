import Sensor from '../models/sensorModel.js';
import UserPreferences from '../models/userPreferencesModel.js';

// Helper function to generate random value based on sensor type
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

// Function to generate data for missing hours using epoch time
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

    console.log(`Now: ${new Date(now).toISOString()}`);
    console.log(`One month ago: ${new Date(oneMonthAgoEpoch).toISOString()}`);
    console.log(`Generating data from ${new Date(currentTime).toISOString()} to ${new Date(now).toISOString()} for sensor ${sensor.name}`);

    // Generate data for every hour until now or up to one month ago
    while (currentTime < now && currentTime >= oneMonthAgoEpoch) {
        currentTime += 1000 * 60 * 60; // Increment by one hour
        console.log(`Generating data for time: ${new Date(currentTime).toISOString()}`);
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

    console.log(`Generated ${readings.length} readings for sensor ${sensor.name}`);
};

export const getSensors = async (req, res) => {
    try {
        const sensors = await Sensor.find();
        res.json(sensors);
    } catch (err) {
        console.error('Error fetching sensors:', err);
        res.status(500).json({ message: err.message });
    }
};

export const getUserPreferences = async (req, res) => {
    try {
        const preferences = await UserPreferences.findOne({ userId: req.user.uid }).populate('selectedSensors');
        res.json(preferences ? preferences.selectedSensors : []); // Return the actual selected sensors
    } catch (err) {
        console.error('Error fetching user preferences:', err);
        res.status(500).json({ message: err.message });
    }
};

// Save user preferences
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

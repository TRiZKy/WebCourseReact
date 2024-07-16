import mongoose from 'mongoose';
import dotenv from 'dotenv';
import sensors from './data/sensors.json' assert { type: 'json' };
import Sensor from './models/sensorModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Sensor.deleteMany(); // Clear existing data
        await Sensor.insertMany(sensors);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Sensor.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}

import mongoose from 'mongoose';

/**
 * Schema representing a sensor reading.
 *
 * @typedef {Object} Reading
 * @property {Date} time - The timestamp of the reading. This field is required.
 * @property {Number} value - The value of the reading. This field is required.
 */
const ReadingSchema = new mongoose.Schema({
    time: { type: Date, required: true },
    value: { type: Number, required: true },
});

/**
 * Schema representing a sensor.
 *
 * @typedef {Object} Sensor
 * @property {String} name - The name of the sensor. This field is required.
 * @property {String} type - The type of the sensor (e.g., 'temperature', 'humidity'). This field is required.
 * @property {String} location - The location where the sensor is placed. This field is required.
 * @property {String} xLabel - The label for the x-axis (e.g., 'Time'). This field is required.
 * @property {String} yLabel - The label for the y-axis (e.g., 'Temperature'). This field is required.
 * @property {Reading[]} readings - An array of readings associated with the sensor.
 */
const SensorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    xLabel: { type: String, required: true },
    yLabel: { type: String, required: true },
    readings: [ReadingSchema],
});

/**
 * Mongoose model representing a sensor.
 *
 * @typedef {mongoose.Model} SensorModel
 */
const Sensor = mongoose.model('Sensor', SensorSchema);

export default Sensor;

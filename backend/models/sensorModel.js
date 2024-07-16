import mongoose from 'mongoose';

const ReadingSchema = new mongoose.Schema({
    time: { type: Date, required: true },
    value: { type: Number, required: true },
});

const SensorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    readings: [ReadingSchema],
});

const Sensor = mongoose.model('Sensor', SensorSchema);

export default Sensor;

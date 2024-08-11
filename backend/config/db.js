import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database using the connection string provided in the environment variable `MONGO_URI`.
 *
 * This function attempts to establish a connection to the MongoDB instance with the provided options for using the new URL parser
 * and unified topology. If the connection is successful, a message is logged to the console. If the connection fails, an error is logged,
 * and the process exits with a status code of 1.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the connection is successfully established.
 * @throws {Error} Throws an error if the connection fails.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

export default connectDB;

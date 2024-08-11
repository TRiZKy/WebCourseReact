import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Parses the Firebase service account credentials from the environment variable.
 * The service account JSON string is expected to be stored in `process.env.FIREBASE_SERVICE_ACCOUNT`.
 *
 * @type {Object}
 */
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

/**
 * Fixes potential issues with the private key format by replacing escaped newline characters
 * with actual newline characters.
 */
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

/**
 * Initializes the Firebase Admin SDK with the service account credentials.
 * This setup allows the application to interact with Firebase services securely using the Admin SDK.
 *
 * @type {admin.app.App}
 */
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;

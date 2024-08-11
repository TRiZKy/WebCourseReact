import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

/**
 * Firebase configuration object containing the API keys and identifiers.
 * These values are loaded from environment variables for security.
 *
 * @type {Object}
 * @property {string} apiKey - The API key for Firebase.
 * @property {string} authDomain - The authentication domain for Firebase.
 * @property {string} projectId - The Firebase project ID.
 * @property {string} storageBucket - The Firebase storage bucket.
 * @property {string} messagingSenderId - The messaging sender ID for Firebase.
 * @property {string} appId - The Firebase app ID.
 * @property {string} measurementId - The Firebase measurement ID.
 */
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

/**
 * Initializes the Firebase application with the provided configuration.
 *
 * @type {firebase.app.App}
 */
const app = initializeApp(firebaseConfig);

/**
 * Initializes and configures the Firebase authentication service.
 * Sets the authentication persistence to `browserLocalPersistence`, which allows the user to stay logged in across sessions.
 *
 * @type {firebase.auth.Auth}
 */
const auth = getAuth(app);

/**
 * Sets the authentication state persistence to local, so that the user's authentication state persists across browser sessions.
 * Logs any errors that occur during this process.
 *
 * @param {firebase.auth.Auth} auth - The Firebase Auth instance.
 * @param {firebase.auth.AuthPersistence} persistence - The persistence type for authentication state.
 */
setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
        console.error('Error setting persistence:', error);
    });

export { auth };

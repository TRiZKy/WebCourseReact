import admin from '../config/firebase.js';

/**
 * Middleware that authenticates Firebase ID tokens.
 *
 * This middleware extracts the token from the `Authorization` header, verifies it using Firebase Admin SDK,
 * and attaches the decoded token (user information) to the `req` object.
 * If the token is missing or invalid, it returns a 401 Unauthorized response.
 *
 * @async
 * @function auth
 * @param {Object} req - The request object, containing the authorization header.
 * @param {Object} res - The response object used to send back the status and error messages.
 * @param {function} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves when the token has been successfully verified or an error has been handled.
 */
const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error); // Log the error
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default auth;

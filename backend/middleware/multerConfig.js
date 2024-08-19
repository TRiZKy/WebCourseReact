import multer from 'multer';

/**
 * Sets up multer to use memory storage for uploaded files.
 * Files are stored in memory as `Buffer` objects rather than being saved to disk.
 *
 * @constant {Object} storage - The storage configuration for multer using memory storage.
 */
const storage = multer.memoryStorage();

/**
 * Configures multer with the specified storage engine.
 * In this case, files are stored in memory.
 *
 * @constant {Object} upload - The multer instance configured to use memory storage.
 */
const upload = multer({ storage: storage });

export default upload;

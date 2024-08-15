// /middleware/multerConfig.js
import multer from 'multer';

// Set up multer for in-memory storage
const storage = multer.memoryStorage(); // Store files in memory as a buffer

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

export default upload;

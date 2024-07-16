import admin from 'firebase-admin';
import { createRequire } from 'module';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const require = createRequire(import.meta.url);
const serviceAccountPath = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export default admin;

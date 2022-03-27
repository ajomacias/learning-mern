import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 4444;
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/test";
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
export const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
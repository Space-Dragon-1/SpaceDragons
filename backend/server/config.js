import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://jdavidhg95:ZmUkI3hGP6c0qw40@cluster0.o2tlg98.mongodb.net/spaceshop';
export const PORT = process.env.PORT || 5000;

export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

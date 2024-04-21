import dotenv from 'dotenv';
dotenv.config({ path: '.env.development.local' });

export const config = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT
};
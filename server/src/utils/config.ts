import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ?? 3000;
const DATABASE_URL = process.env.DATABASE_URL ?? '';

if (!DATABASE_URL) {
  throw 'Ayyyy, looks like you dropped this (DATABASE_URL)';
}

export default {
  PORT,
  DATABASE_URL
};

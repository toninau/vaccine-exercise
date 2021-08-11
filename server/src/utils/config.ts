import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ?? 3001;
const DATABASE_URL = process.env.DATABASE_URL ?? '';

if (!DATABASE_URL) {
  throw 'DATABASE_URL is not defined in the .ENV';
}

export default {
  PORT,
  DATABASE_URL
};

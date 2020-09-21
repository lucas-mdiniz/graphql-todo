import dotenvSafe from 'dotenv-safe';

dotenvSafe.config();

const ENV = process.env;

export const config = {
  MONGO_URI: ENV.MONGO_URI,
  JWT_SECRET: ENV.JWT_SECRET,
};

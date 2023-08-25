export const config = {
  API_PATH: process.env.API_PATH || 'api',
  PORT: +process.env.PORT,
  SECRET: process.env.SECRET || 'kkfjfskfsks',
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: +process.env.REDIS_PORT || 6379,
  REDIS_URL: process.env.REDIS_URL,
  NODE_ENV: process.env.NODE_ENV || 'development',
};

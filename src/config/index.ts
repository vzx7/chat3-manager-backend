import { config } from 'dotenv';

const path = require('path');

config({ path: `${path.dirname(require.main.filename)}/../.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY, REFRESH_TOKEN_COOKIES_EXPIRES, REFRESH_TOKEN_TIME, TOKEN_TIME, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB } = process.env;
export const { EXTERNAL_API_URL, EXTERNAL_API_PORT, EXTERNAL_API_KEY } = process.env;
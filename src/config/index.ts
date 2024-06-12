import { config } from 'dotenv';

const path = require('path');
const dir = process.env.NODE_ENV === 'production' ? `${path.dirname(require.main.filename)}/` : '';

config({ path: `${dir}.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY, REFRESH_TOKEN_COOKIES_EXPIRES, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB } = process.env;
export const { EXTERNAL_API_URL, EXTERNAL_API_PORT, EXTERNAL_API_KEY } = process.env;
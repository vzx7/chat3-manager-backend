import { Client } from 'pg';
import { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB } from '@config';

const hasDbConfig = POSTGRES_USER && POSTGRES_PASSWORD && POSTGRES_HOST && POSTGRES_DB;

const connectionString = hasDbConfig
  ? `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`
  : 'postgresql://postgres:postgres@localhost:5432/postgres';

export const client = new Client({
  connectionString,
});

client.connect().catch(() => {});

export default client;

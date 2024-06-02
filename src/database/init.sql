-- If Exists Tables Drop
DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS services cascade;
DROP TABLE IF EXISTS tokens cascade;
-- ================
--   TABLE [users]
-- ================
-- create users table
CREATE TABLE users(
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(32) UNIQUE NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "fio" VARCHAR(100) NOT NULL,
    "phone" BIGINT NOT NULL,
    "bio" TEXT,
    "role" SMALLINT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc'),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE services(
    "id" SERIAL PRIMARY KEY,
    "domain" VARCHAR(32) UNIQUE NOT NULL,
    "active" BOOLEAN,
    "isiInitialization": BOOLEAN,
    "isConfigured" BOOLEAN,
    "isSSL" BOOLEAN,
    "userId" INTEGER NOT NULL REFERENCES users (id),
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc'),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE tokens(
    "id" SERIAL PRIMARY KEY,
    "token" VARCHAR(300) UNIQUE NOT NULL,
    "userId" INTEGER NOT NULL REFERENCES users (id),
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc'),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE
);
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
-- ================
--   TABLE [services]
-- ================
-- create users services
CREATE TABLE services(
    "id" SERIAL PRIMARY KEY,
    "subdomain" VARCHAR(32) UNIQUE NOT NULL,
    "domain" VARCHAR(32) NOT NULL,
    "active" BOOLEAN,
    "isConfigured" BOOLEAN,
    "isInitialization" BOOLEAN,
    "userId" INTEGER NOT NULL,
    "appConfigurationId" INTEGER,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc'),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE
);
-- ================
--   TABLE [tokens]
-- ================
-- create users tokens
CREATE TABLE tokens(
    "id" SERIAL PRIMARY KEY,
    "token" VARCHAR(300) UNIQUE NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc'),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE
);
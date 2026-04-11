# AGENTS.md - Developer Guide

## Project Overview

This is a TypeScript + PostgreSQL + Express API Server using TypeDI for dependency injection. The project uses SWC for building, Jest for testing, and ESLint/Prettier for code quality.

## Commands

### Development, Build & Testing

```bash
npm run dev          # Start development server with nodemon
npm run build       # Build with SWC to dist/ (faster)
npm run build:tsc   # Build with tsc + tsc-alias
npm start           # Build + run production server
npm run test        # Run all tests with Jest
npm run test -- --testPathPattern="users.test"    # Run single test file
npm run test -- --testNamePattern="Users"          # Run single test suite
npm run lint        # Run ESLint on src/
npm run lint:fix    # Run ESLint with auto-fix
```

## Code Style Guidelines

### Architecture Pattern

- **Controllers**: Handle HTTP requests/responses, call services
- **Services**: Business logic, interact with database
- **Routes**: Define API endpoints, connect controllers
- **DTOs**: Data transfer objects with class-validator for validation
- **Interfaces**: TypeScript interfaces for data structures
- **Middlewares**: Express middleware (auth, validation, error handling)

### Naming Conventions

- Classes: PascalCase (e.g., `UserController`, `UserService`)
- Files: camelCase (e.g., `users.controller.ts`, `auth.service.ts`)
- Interfaces: PascalCase (e.g., `User`, `UserInterface`)
- Variables/functions: camelCase

### Path Aliases

Use path aliases for imports:

```typescript
import { UserController } from '@controllers/users.controller';
import { UserService } from '@services/users.service';
import { User } from '@interfaces/users.interface';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/httpException';
import { logger } from '@utils/logger';
import pg from '@database';
```

Available aliases: `@/*`, `@config`, `@controllers/*`, `@database`, `@dtos/*`, `@exceptions/*`, `@interfaces/*`, `@middlewares/*`, `@routes/*`, `@services/*`, `@utils/*`

### Error Handling

- Use custom `HttpException` class: `throw new HttpException(statusCode, message);`
- Global error middleware in `src/middlewares/error.middleware.ts`
- Always pass errors to `next(error)` in controllers

### API Response Format

Use `ResponseData` type:

```typescript
const response: ResponseData = { is: true, data: someData };
res.status(200).json(response);
// Error:
const response: ResponseData = { is: false, error: errorMessage };
res.status(status).json(response);
```

### TypeScript & Decorators

- `experimentalDecorators` and `emitDecoratorMetadata` enabled
- Use `class-transformer` and `class-validator` for DTOs:

```typescript
import { IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail() email: string;
  @IsString() password: string;
  @IsString() fio: string;
  @IsNumber() phone: number;
  @IsString() bio: string;
}
```

### Dependency Injection

Use TypeDI for services:

```typescript
import { Service } from 'typedi';
import { Container } from 'typedi';

@Service()
export class UserService { }

public user = Container.get(UserService);
```

### Database

- Use `pg` (node-postgres) directly with parameterized queries
- Always use parameterized queries to prevent SQL injection
- Use double quotes for column names: `"email"`, `"id"`

### Logging

- Use Winston logger from `@utils/logger`
- Logs are rotated daily

### ESLint Configuration

- Extends: prettier, @typescript-eslint/recommended, prettier/recommended
- Rules disabled: explicit-member-accessibility, explicit-function-return-type, etc.
- `any` type allowed (`typescript-eslint/no-explicit-any: off`)

## Project Structure

```
src/
├── app.ts                 # Express app setup
├── server.ts              # Entry point
├── config/               # Configuration
├── controllers/         # HTTP controllers
├── database/             # Database connection
├── dtos/                 # Data transfer objects
├── exceptions/           # Custom exceptions
├── interfaces/           # TypeScript interfaces
├── middlewares/         # Express middlewares
├── routes/               # Route definitions
├── services/             # Business logic
├── test/                 # Jest tests
├── types/                # Type definitions
└── utils/                # Utilities (logger, env validation)
```

## Important Notes

- API endpoints use numeric ID patterns: `:id(\\d+)`
- Routes implement the `Routes` interface
- Auth middleware uses JWT tokens
- All environment variables validated via `src/utils/validateEnv.ts`

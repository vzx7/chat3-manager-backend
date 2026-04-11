const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src' }),
    '^jsonwebtoken$': '<rootDir>/__mocks__/jsonwebtoken.js',
    '^jwa$': '<rootDir>/__mocks__/jwa.js',
    '^buffer-equal-constant-time$': '<rootDir>/__mocks__/buffer-equal-constant-time.js',
  },
};

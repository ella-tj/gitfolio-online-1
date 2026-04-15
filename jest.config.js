module.exports = {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!(jsdom)/)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
}

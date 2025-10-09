module.exports = {
  rootDir: '.',
  testEnvironment: 'node',
  testMatch: ['**/server/tests/**/*.test.js'],
  setupFiles: ['<rootDir>/server/jest.setup.js'],
  verbose: true,
};

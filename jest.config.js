module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/*.js'],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupFiles: ['./jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: ['**/*.test.js?(x)'],
  verbose: false,
};

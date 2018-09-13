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
  moduleNameMapper: {
    '^jest-auto-snapshots$': '<rootDir>/src/index.js',
  },
  testMatch: ['**/*.test.js?(x)'],
  verbose: true,
};

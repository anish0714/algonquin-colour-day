/** @type {import('jest').Config} */
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
  testMatch: ['<rootDir>/src/**/*.test.{js,jsx}'],
  moduleNameMapper: {
    // Stylesheets don't matter to the tests.
    '\\.css$': '<rootDir>/src/test/styleStub.js',
  },
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/main.jsx', '!src/test/**', '!src/**/*.test.{js,jsx}'],
  coverageReporters: ['text', 'text-summary', 'html', 'json-summary'],
  // Floors, not targets: CI fails if coverage drops below these.
  coverageThreshold: { global: { lines: 80, functions: 80, branches: 70, statements: 80 } },
}

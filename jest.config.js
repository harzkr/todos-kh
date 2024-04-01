const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  roots: [`<rootDir>/app/__tests__`],
  setupFiles: ["./jest.polyfills.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  testMatch: ["**/__tests__/**/*.test.+(ts|tsx|js|jsx)"],
};

module.exports = createJestConfig(customJestConfig);

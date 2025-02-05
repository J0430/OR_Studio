const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/contexts/(.*)$": "<rootDir>/contexts/$1",
    "^@/hooks/(.*)$": "<rootDir>/hooks/$1",
    "^@/styles/(.*)$": "<rootDir>/styles/$1",
    "\\.(css|scss)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "components/**/*.{js,jsx,ts,tsx}",
    "hooks/**/*.{js,ts}",
  ],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)", // ✅ Detects tests inside __tests__ folder
    "**/?(*.)+(spec|test).[jt]s?(x)", // ✅ Detects *.test.js or *.spec.js
  ],
};

module.exports = createJestConfig(customJestConfig);

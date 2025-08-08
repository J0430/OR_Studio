const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./", // Path to your Next.js project
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@hooks/(.*)$": "<rootDir>/hooks/$1",
    "^@utils/(.*)$": "<rootDir>/utils/$1",
    "^@api/(.*)$": "<rootDir>/public/api/$1",
    "^@styles/(.*)$": "<rootDir>/styles/$1",
    "^@contexts/(.*)$": "<rootDir>/contexts/$1",
    "^@public/(.*)$": "<rootDir>/public/$1",
    "^@data/(.*)$": "<rootDir>/public/data/$1",
    "^@pages/(.*)$": "<rootDir>/pages/$1",
  },
};

module.exports = createJestConfig(customJestConfig);

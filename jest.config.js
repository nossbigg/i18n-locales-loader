const config = {
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/sandbox"],
  collectCoverageFrom: ["<rootDir>/src/**/*.js", "!**/node_modules/**"],
  coverageReporters: ["text"],
};

module.exports = config;

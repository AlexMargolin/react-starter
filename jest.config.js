module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    "\\.(scss|svg)$": "identity-obj-proxy",
    "^@/(.*)": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
}

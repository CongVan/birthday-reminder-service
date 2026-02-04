/** @type {import('ts-jest').JestConfigWithTsJest} */
const baseConfig = {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["<rootDir>/src/**/*.test.ts"],
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	collectCoverageFrom: [
		"src/**/*.ts",
		"!src/**/*.d.ts",
		"!src/**/*.test.ts",
		"!src/index.ts",
	],
};

module.exports = baseConfig;

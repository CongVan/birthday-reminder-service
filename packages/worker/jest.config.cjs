const baseConfig = require("@birthday-reminder-service/shared/jest-base.config.cjs");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	...baseConfig,
	displayName: "worker",
	rootDir: ".",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

const baseConfig = require("./jest-base.config.cjs");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	...baseConfig,
	displayName: "shared",
	rootDir: ".",
};

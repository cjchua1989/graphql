const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: './src',
    testRegex: ['_test.ts$', 'Test.ts$'],
    testTimeout: 30000,
};

// jest.config.js
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the above list
  preset: 'ts-jest',
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/$1"
  },
  moduleFileExtensions: [
    "js",
    "ts",
    "json",
    "vue"
  ],
  transform: {
    '.*\\.(vue)$': "vue-jest",
    "^.+\\.jsx?$": "babel-jest",
    '^.+\\.tsx?$': "ts-jest"
  },
  testURL: "http://localhost:30080"
};
import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/app'],
  moduleFileExtensions: ['android.js', 'ios.js', 'js', 'json', 'vue', 'ts', 'tsx', 'jsx'],
  moduleDirectories: ['node_modules', 'app'],
  modulePaths: ['<rootDir>/app', '<rootDir>/node_modules'],
  moduleNameMapper: {
    // Default NativeScript webpack aliases
    '~/(.*)$': '<rootDir>/app/$1',
    '@/(.*)$': '<rootDir>/app/$1',
    '^projectRoot/(.*)$': '<rootDir>/$1',
  },
  transform: {
    // '^.+\\.js$': 'babel-jest',
    '^.+\\.(jsx?|tsx?)$': 'ts-jest',
    '.*\\.(vue)$': 'nativescript-vue-jest',
  },
  setupFiles: [
    '<rootDir>/jest/nativescript-helpers.js',
    '<rootDir>/jest/nativescript-vue-stubs.js',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/App_Resources/',
    '<rootDir>/hooks/',
    '<rootDir>/jest/',
    '<rootDir>/layout/',
    '<rootDir>/node_modules/',
    '<rootDir>/platforms/',
    '<rootDir>/types/',
  ],
  transformIgnorePatterns: [],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['app/**/*.{ts,js,vue}'],
  coverageReporters: ['text-summary', 'html'],
  // testMatch: ['**/__tests__/**/*.+(ts|tsx|ja|jsx)'],

  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  // globals: {
  //   'ts-jest': {
  //     tsConfig: './src/app/tsconfig.json',
  //   },
  //   NODE_ENV: 'test',
  // },
}

export default config

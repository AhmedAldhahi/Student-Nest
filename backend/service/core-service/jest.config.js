module.exports = {
  preset: 'ts-jest/presets/default-esm',  // Using ESM preset
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',  // Transform .ts files using ts-jest
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transformIgnorePatterns: [
    '/node_modules/(?!your-package-to-transform).+\\.js$',  // If needed, ensure that ESM is handled in node_modules
  ],
  globals: {
    'ts-jest': {
      useBabelrc: true,  // Optional: If you want to use Babel with TypeScript
    }
  }, 

    reporters: [
    "default",
    [ "jest-html-reporter", {
      "pageTitle": "Unit Test Report",
      "outputPath": "test-report.html"
    }]
  ]
};

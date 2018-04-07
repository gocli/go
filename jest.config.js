module.exports = {
  verbose: true,
  testRegex: '(/__tests__/.*(\\.|/)(test|spec))\\.js$',
  collectCoverageFrom: ['index.js', 'go.js'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 0
    }
  }
}

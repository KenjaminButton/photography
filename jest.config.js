module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-typescript'] }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFiles: ['<rootDir>/__tests__/setup.js']
};

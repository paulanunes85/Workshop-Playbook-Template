module.exports = {
  // Ambiente de teste
  testEnvironment: 'node',
  
  // Diretórios de teste
  testMatch: [
    '**/tests/**/*.test.js',
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  
  // Arquivos de setup
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  
  // Cobertura de código
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/index.js',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  
  // Diretório de cobertura
  coverageDirectory: 'coverage',
  
  // Formatos de relatório
  coverageReporters: [
    'text',
    'lcov',
    'html',
    'json'
  ],
  
  // Limites de cobertura
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Mocks
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  
  // Timeout dos testes
  testTimeout: 10000,
  
  // Ignorar arquivos
  testPathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/docs/',
    '/examples/'
  ],
  
  // Transform files
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  
  // Module paths
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  
  // Verbose output
  verbose: true,
  
  // Detectar arquivos abertos
  detectOpenHandles: true,
  
  // Forçar saída
  forceExit: false,
  
  // Reporters customizados
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'coverage',
      outputName: 'junit.xml'
    }]
  ],
  
  // Global setup/teardown
  // globalSetup: '<rootDir>/tests/globalSetup.js',
  // globalTeardown: '<rootDir>/tests/globalTeardown.js',
  
  // Mock de módulos
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};

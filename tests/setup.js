// Setup global para testes
const { logger } = require('../src/utils/logger');

// Configurar ambiente de teste
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'error'; // Reduzir logs durante testes
process.env.PORT = '0'; // Usar porta aleatória para testes

// Mock do logger para testes
jest.mock('../src/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    logRequest: jest.fn(),
    logPerformance: jest.fn(),
    logSystem: jest.fn()
  },
  errorHandler: jest.fn((error, req, res, next) => {
    res.status(error.status || 500).json({
      error: error.message,
      requestId: req.id
    });
  }),
  morganStream: {
    write: jest.fn()
  }
}));

// Configurar timeouts para testes
jest.setTimeout(10000);

// Limpar mocks após cada teste
afterEach(() => {
  jest.clearAllMocks();
});

// Setup e teardown globais
beforeAll(async () => {
  console.log('🧪 Iniciando testes...');
});

afterAll(async () => {
  console.log('✅ Testes concluídos!');
});

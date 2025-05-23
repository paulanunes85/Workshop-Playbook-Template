const winston = require('winston');
const path = require('path');

// Configuração do logger
const logLevel = process.env.LOG_LEVEL || 'info';
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Formato para console (desenvolvimento)
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    
    // Adicionar metadata se existir
    if (Object.keys(meta).length > 0) {
      msg += ` ${JSON.stringify(meta, null, 2)}`;
    }
    
    return msg;
  })
);

// Criar diretório de logs se não existir
const logsDir = path.join(process.cwd(), 'logs');
const fs = require('fs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Configurar transports
const transports = [
  // Console para desenvolvimento
  new winston.transports.Console({
    level: logLevel,
    format: process.env.NODE_ENV === 'production' ? logFormat : consoleFormat
  }),
  
  // Arquivo para todos os logs
  new winston.transports.File({
    filename: path.join(logsDir, 'combined.log'),
    level: 'info',
    format: logFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5
  }),
  
  // Arquivo apenas para erros
  new winston.transports.File({
    filename: path.join(logsDir, 'error.log'),
    level: 'error',
    format: logFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5
  })
];

// Criar logger
const logger = winston.createLogger({
  level: logLevel,
  format: logFormat,
  defaultMeta: {
    service: 'workshop-template',
    environment: process.env.NODE_ENV || 'development'
  },
  transports,
  // Não sair do processo em caso de erro no logger
  exitOnError: false
});

// Adicionar método para log estruturado
logger.logRequest = (req, res, responseTime) => {
  const logData = {
    method: req.method,
    url: req.url,
    statusCode: res.statusCode,
    responseTime: `${responseTime}ms`,
    requestId: req.id,
    userAgent: req.get('User-Agent'),
    ip: req.ip || req.connection.remoteAddress,
    timestamp: new Date().toISOString()
  };
  
  if (res.statusCode >= 400) {
    logger.error('HTTP Request Error', logData);
  } else {
    logger.info('HTTP Request', logData);
  }
};

// Método para log de performance
logger.logPerformance = (operation, duration, metadata = {}) => {
  logger.info('Performance Metric', {
    operation,
    duration: `${duration}ms`,
    ...metadata,
    timestamp: new Date().toISOString()
  });
};

// Método para log de sistema
logger.logSystem = (event, data = {}) => {
  logger.info('System Event', {
    event,
    ...data,
    timestamp: new Date().toISOString(),
    pid: process.pid,
    memory: process.memoryUsage(),
    uptime: process.uptime()
  });
};

// Middleware de erro para Express
const errorHandler = (error, req, res, next) => {
  const errorData = {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    requestId: req.id,
    userAgent: req.get('User-Agent'),
    ip: req.ip || req.connection.remoteAddress,
    timestamp: new Date().toISOString()
  };
  
  logger.error('Express Error', errorData);
  
  // Não enviar stack trace em produção
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(error.status || 500).json({
    error: isDevelopment ? error.message : 'Internal Server Error',
    requestId: req.id,
    timestamp: new Date().toISOString(),
    ...(isDevelopment && { stack: error.stack })
  });
};

// Stream para integração com Morgan
const morganStream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

module.exports = {
  logger,
  errorHandler,
  morganStream
};

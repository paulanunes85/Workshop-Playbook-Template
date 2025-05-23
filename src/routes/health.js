const express = require('express');
const { logger } = require('../utils/logger');
const router = express.Router();

// Health check básico
router.get('/', (req, res) => {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  };
  
  res.json(healthData);
});

// Health check detalhado
router.get('/detailed', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const checks = await runHealthChecks();
    const responseTime = Date.now() - startTime;
    
    const overallStatus = checks.every(check => check.status === 'healthy') ? 'healthy' : 'unhealthy';
    
    const healthData = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      system: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
        platform: process.platform,
        nodeVersion: process.version,
        pid: process.pid
      },
      checks
    };
    
    const statusCode = overallStatus === 'healthy' ? 200 : 503;
    res.status(statusCode).json(healthData);
    
  } catch (error) {
    logger.error('Health check failed:', error);
    
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// Health check para liveness probe (Kubernetes)
router.get('/live', (req, res) => {
  res.status(200).json({
    status: 'alive',
    timestamp: new Date().toISOString()
  });
});

// Health check para readiness probe (Kubernetes)
router.get('/ready', async (req, res) => {
  try {
    // Verificar se a aplicação está pronta para receber tráfego
    const isReady = await checkReadiness();
    
    if (isReady) {
      res.status(200).json({
        status: 'ready',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(503).json({
        status: 'not ready',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    logger.error('Readiness check failed:', error);
    res.status(503).json({
      status: 'not ready',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Função para executar verificações de saúde
async function runHealthChecks() {
  const checks = [];
  
  // Check 1: Memória
  const memoryUsage = process.memoryUsage();
  const memoryUsagePercent = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;
  
  checks.push({
    name: 'memory',
    status: memoryUsagePercent < 90 ? 'healthy' : 'unhealthy',
    details: {
      usagePercent: Math.round(memoryUsagePercent * 100) / 100,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`
    }
  });
  
  // Check 2: Uptime
  const uptime = process.uptime();
  checks.push({
    name: 'uptime',
    status: 'healthy',
    details: {
      seconds: Math.round(uptime),
      human: formatUptime(uptime)
    }
  });
  
  // Check 3: Environment Variables
  const requiredEnvVars = ['NODE_ENV', 'PORT'];
  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  checks.push({
    name: 'environment',
    status: missingEnvVars.length === 0 ? 'healthy' : 'unhealthy',
    details: {
      required: requiredEnvVars,
      missing: missingEnvVars
    }
  });
  
  // Check 4: Disk Space (básico)
  try {
    const fs = require('fs');
    const stats = fs.statSync('.');
    
    checks.push({
      name: 'filesystem',
      status: 'healthy',
      details: {
        accessible: true,
        timestamp: stats.mtime
      }
    });
  } catch (error) {
    checks.push({
      name: 'filesystem',
      status: 'unhealthy',
      details: {
        accessible: false,
        error: error.message
      }
    });
  }
  
  // Adicionar checks customizados aqui
  // Por exemplo: banco de dados, APIs externas, etc.
  
  return checks;
}

// Função para verificar se a aplicação está pronta
async function checkReadiness() {
  // Implementar verificações específicas de prontidão
  // Por exemplo: conexão com banco de dados, serviços externos, etc.
  
  // Por enquanto, sempre retorna true
  return true;
}

// Função auxiliar para formatar uptime
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

module.exports = router;

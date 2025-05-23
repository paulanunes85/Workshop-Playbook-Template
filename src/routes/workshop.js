const express = require('express');
const { logger } = require('../utils/logger');
const router = express.Router();

// Dados de exemplo para o workshop
const workshopData = {
  title: 'Workshop Playbook Template',
  description: 'Template reutilizável para criação de workshops técnicos',
  version: '1.0.0',
  modules: [
    {
      id: 1,
      title: 'Introdução aos Conceitos',
      description: 'Conceitos fundamentais e overview',
      duration: '30 min',
      difficulty: 'Básico'
    },
    {
      id: 2,
      title: 'Configuração do Ambiente',
      description: 'Setup inicial e configuração',
      duration: '45 min',
      difficulty: 'Básico'
    },
    {
      id: 3,
      title: 'Implementação Intermediária',
      description: 'Conceitos intermediários e práticas',
      duration: '2 horas',
      difficulty: 'Intermediário'
    },
    {
      id: 4,
      title: 'Implementação Avançada',
      description: 'Arquiteturas complexas e padrões avançados',
      duration: '4 horas',
      difficulty: 'Avançado'
    }
  ]
};

// GET /api/workshop - Informações gerais do workshop
router.get('/', (req, res) => {
  logger.info('Workshop info requested', { requestId: req.id });
  
  res.json({
    success: true,
    data: workshopData,
    timestamp: new Date().toISOString()
  });
});

// GET /api/workshop/modules - Lista todos os módulos
router.get('/modules', (req, res) => {
  logger.info('Workshop modules requested', { requestId: req.id });
  
  res.json({
    success: true,
    data: workshopData.modules,
    count: workshopData.modules.length,
    timestamp: new Date().toISOString()
  });
});

// GET /api/workshop/modules/:id - Detalhes de um módulo específico
router.get('/modules/:id', (req, res) => {
  const moduleId = parseInt(req.params.id);
  
  logger.info('Workshop module requested', { 
    moduleId, 
    requestId: req.id 
  });
  
  const module = workshopData.modules.find(m => m.id === moduleId);
  
  if (!module) {
    return res.status(404).json({
      success: false,
      error: 'Módulo não encontrado',
      requestId: req.id,
      timestamp: new Date().toISOString()
    });
  }
  
  res.json({
    success: true,
    data: module,
    timestamp: new Date().toISOString()
  });
});

// POST /api/workshop/progress - Registrar progresso do usuário
router.post('/progress', (req, res) => {
  const { userId, moduleId, status, timeSpent } = req.body;
  
  // Validação básica
  if (!userId || !moduleId || !status) {
    return res.status(400).json({
      success: false,
      error: 'Dados obrigatórios: userId, moduleId, status',
      requestId: req.id,
      timestamp: new Date().toISOString()
    });
  }
  
  // Verificar se o módulo existe
  const module = workshopData.modules.find(m => m.id === parseInt(moduleId));
  if (!module) {
    return res.status(404).json({
      success: false,
      error: 'Módulo não encontrado',
      requestId: req.id,
      timestamp: new Date().toISOString()
    });
  }
  
  // Simular salvamento do progresso
  const progressData = {
    userId,
    moduleId: parseInt(moduleId),
    moduleName: module.title,
    status,
    timeSpent: timeSpent || 0,
    timestamp: new Date().toISOString()
  };
  
  logger.info('Workshop progress recorded', {
    progressData,
    requestId: req.id
  });
  
  res.status(201).json({
    success: true,
    message: 'Progresso registrado com sucesso',
    data: progressData,
    timestamp: new Date().toISOString()
  });
});

// GET /api/workshop/progress/:userId - Obter progresso do usuário
router.get('/progress/:userId', (req, res) => {
  const { userId } = req.params;
  
  logger.info('Workshop progress requested', {
    userId,
    requestId: req.id
  });
  
  // Simular dados de progresso
  const mockProgress = workshopData.modules.map(module => ({
    moduleId: module.id,
    moduleName: module.title,
    status: Math.random() > 0.5 ? 'completed' : 'in-progress',
    timeSpent: Math.floor(Math.random() * 120), // minutos
    lastAccessed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
  }));
  
  res.json({
    success: true,
    userId,
    data: mockProgress,
    summary: {
      totalModules: workshopData.modules.length,
      completedModules: mockProgress.filter(p => p.status === 'completed').length,
      totalTimeSpent: mockProgress.reduce((sum, p) => sum + p.timeSpent, 0)
    },
    timestamp: new Date().toISOString()
  });
});

// POST /api/workshop/feedback - Registrar feedback
router.post('/feedback', (req, res) => {
  const { userId, moduleId, rating, comment } = req.body;
  
  // Validação básica
  if (!userId || !rating) {
    return res.status(400).json({
      success: false,
      error: 'Dados obrigatórios: userId, rating',
      requestId: req.id,
      timestamp: new Date().toISOString()
    });
  }
  
  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      error: 'Rating deve ser entre 1 e 5',
      requestId: req.id,
      timestamp: new Date().toISOString()
    });
  }
  
  const feedbackData = {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    moduleId: moduleId || null,
    rating,
    comment: comment || '',
    timestamp: new Date().toISOString()
  };
  
  logger.info('Workshop feedback received', {
    feedbackData,
    requestId: req.id
  });
  
  res.status(201).json({
    success: true,
    message: 'Feedback registrado com sucesso',
    data: feedbackData,
    timestamp: new Date().toISOString()
  });
});

// GET /api/workshop/stats - Estatísticas do workshop
router.get('/stats', (req, res) => {
  logger.info('Workshop stats requested', { requestId: req.id });
  
  // Simular estatísticas
  const stats = {
    totalUsers: Math.floor(Math.random() * 1000) + 100,
    activeUsers: Math.floor(Math.random() * 100) + 20,
    completionRate: Math.round((Math.random() * 30 + 70) * 100) / 100, // 70-100%
    averageRating: Math.round((Math.random() * 1 + 4) * 100) / 100, // 4-5
    moduleStats: workshopData.modules.map(module => ({
      moduleId: module.id,
      moduleName: module.title,
      completions: Math.floor(Math.random() * 500) + 50,
      averageTime: Math.floor(Math.random() * 120) + 30, // minutos
      difficulty: module.difficulty
    }))
  };
  
  res.json({
    success: true,
    data: stats,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;

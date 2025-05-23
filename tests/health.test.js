const request = require('supertest');
const { app } = require('../src/index');

describe('Health Endpoints', () => {
  describe('GET /health', () => {
    test('should return basic health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('memory');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('environment');
    });
  });
  
  describe('GET /health/detailed', () => {
    test('should return detailed health status', async () => {
      const response = await request(app)
        .get('/health/detailed')
        .expect(200);
      
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('responseTime');
      expect(response.body).toHaveProperty('system');
      expect(response.body).toHaveProperty('checks');
      expect(Array.isArray(response.body.checks)).toBe(true);
    });
    
    test('should include system information', async () => {
      const response = await request(app)
        .get('/health/detailed')
        .expect(200);
      
      const { system } = response.body;
      expect(system).toHaveProperty('uptime');
      expect(system).toHaveProperty('memory');
      expect(system).toHaveProperty('cpu');
      expect(system).toHaveProperty('platform');
      expect(system).toHaveProperty('nodeVersion');
      expect(system).toHaveProperty('pid');
    });
    
    test('should include health checks', async () => {
      const response = await request(app)
        .get('/health/detailed')
        .expect(200);
      
      const { checks } = response.body;
      const checkNames = checks.map(check => check.name);
      
      expect(checkNames).toContain('memory');
      expect(checkNames).toContain('uptime');
      expect(checkNames).toContain('environment');
      expect(checkNames).toContain('filesystem');
    });
  });
  
  describe('GET /health/live', () => {
    test('should return liveness status', async () => {
      const response = await request(app)
        .get('/health/live')
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'alive');
      expect(response.body).toHaveProperty('timestamp');
    });
  });
  
  describe('GET /health/ready', () => {
    test('should return readiness status', async () => {
      const response = await request(app)
        .get('/health/ready')
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'ready');
      expect(response.body).toHaveProperty('timestamp');
    });
  });
});

const request = require('supertest');
const { app } = require('../src/index');

describe('Workshop API Endpoints', () => {
  describe('GET /api/workshop', () => {
    test('should return workshop information', async () => {
      const response = await request(app)
        .get('/api/workshop')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('title');
      expect(response.body.data).toHaveProperty('description');
      expect(response.body.data).toHaveProperty('modules');
      expect(Array.isArray(response.body.data.modules)).toBe(true);
    });
  });
  
  describe('GET /api/workshop/modules', () => {
    test('should return list of modules', async () => {
      const response = await request(app)
        .get('/api/workshop/modules')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('count');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
    
    test('should return modules with required properties', async () => {
      const response = await request(app)
        .get('/api/workshop/modules')
        .expect(200);
      
      const modules = response.body.data;
      modules.forEach(module => {
        expect(module).toHaveProperty('id');
        expect(module).toHaveProperty('title');
        expect(module).toHaveProperty('description');
        expect(module).toHaveProperty('duration');
        expect(module).toHaveProperty('difficulty');
      });
    });
  });
  
  describe('GET /api/workshop/modules/:id', () => {
    test('should return specific module', async () => {
      const response = await request(app)
        .get('/api/workshop/modules/1')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id', 1);
      expect(response.body.data).toHaveProperty('title');
    });
    
    test('should return 404 for non-existent module', async () => {
      const response = await request(app)
        .get('/api/workshop/modules/999')
        .expect(404);
      
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
    });
  });
  
  describe('POST /api/workshop/progress', () => {
    test('should record user progress successfully', async () => {
      const progressData = {
        userId: 'test-user-123',
        moduleId: 1,
        status: 'completed',
        timeSpent: 45
      };
      
      const response = await request(app)
        .post('/api/workshop/progress')
        .send(progressData)
        .expect(201);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('userId', progressData.userId);
      expect(response.body.data).toHaveProperty('moduleId', progressData.moduleId);
    });
    
    test('should validate required fields', async () => {
      const invalidData = {
        userId: 'test-user-123'
        // missing moduleId and status
      };
      
      const response = await request(app)
        .post('/api/workshop/progress')
        .send(invalidData)
        .expect(400);
      
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
    });
    
    test('should validate module exists', async () => {
      const progressData = {
        userId: 'test-user-123',
        moduleId: 999, // non-existent module
        status: 'completed'
      };
      
      const response = await request(app)
        .post('/api/workshop/progress')
        .send(progressData)
        .expect(404);
      
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
    });
  });
  
  describe('GET /api/workshop/progress/:userId', () => {
    test('should return user progress', async () => {
      const userId = 'test-user-123';
      
      const response = await request(app)
        .get(`/api/workshop/progress/${userId}`)
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('userId', userId);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('summary');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
    
    test('should include progress summary', async () => {
      const userId = 'test-user-123';
      
      const response = await request(app)
        .get(`/api/workshop/progress/${userId}`)
        .expect(200);
      
      const { summary } = response.body;
      expect(summary).toHaveProperty('totalModules');
      expect(summary).toHaveProperty('completedModules');
      expect(summary).toHaveProperty('totalTimeSpent');
    });
  });
  
  describe('POST /api/workshop/feedback', () => {
    test('should record feedback successfully', async () => {
      const feedbackData = {
        userId: 'test-user-123',
        moduleId: 1,
        rating: 5,
        comment: 'Excelente módulo!'
      };
      
      const response = await request(app)
        .post('/api/workshop/feedback')
        .send(feedbackData)
        .expect(201);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('userId', feedbackData.userId);
      expect(response.body.data).toHaveProperty('rating', feedbackData.rating);
    });
    
    test('should validate required fields', async () => {
      const invalidData = {
        userId: 'test-user-123'
        // missing rating
      };
      
      const response = await request(app)
        .post('/api/workshop/feedback')
        .send(invalidData)
        .expect(400);
      
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
    });
    
    test('should validate rating range', async () => {
      const invalidData = {
        userId: 'test-user-123',
        rating: 6 // invalid rating
      };
      
      const response = await request(app)
        .post('/api/workshop/feedback')
        .send(invalidData)
        .expect(400);
      
      expect(response.body).toHaveProperty('success', false);
      expect(response.body.error).toContain('Rating deve ser entre 1 e 5');
    });
  });
  
  describe('GET /api/workshop/stats', () => {
    test('should return workshop statistics', async () => {
      const response = await request(app)
        .get('/api/workshop/stats')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      
      const { data } = response.body;
      expect(data).toHaveProperty('totalUsers');
      expect(data).toHaveProperty('activeUsers');
      expect(data).toHaveProperty('completionRate');
      expect(data).toHaveProperty('averageRating');
      expect(data).toHaveProperty('moduleStats');
      expect(Array.isArray(data.moduleStats)).toBe(true);
    });
    
    test('should include module statistics', async () => {
      const response = await request(app)
        .get('/api/workshop/stats')
        .expect(200);
      
      const { moduleStats } = response.body.data;
      moduleStats.forEach(stat => {
        expect(stat).toHaveProperty('moduleId');
        expect(stat).toHaveProperty('moduleName');
        expect(stat).toHaveProperty('completions');
        expect(stat).toHaveProperty('averageTime');
        expect(stat).toHaveProperty('difficulty');
      });
    });
  });
});

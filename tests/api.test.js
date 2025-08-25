const request = require('supertest');
const app = require('../src/app');
const { initDatabase } = require('../src/config/database');
  
beforeAll(async () => {
  await initDatabase();
});

describe('User API', () => {
  let userId;

  test('GET /api/v1/hello', async () => {
    const res = await request(app).get('/api/v1/hello');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello from API v1!');
  });

  test('POST /api/v1/users', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ name: 'Test', email: 'test@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test');
    userId = res.body.id;
  });

  test('GET /api/v1/users', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/v1/users/:id', async () => {
    const res = await request(app).get(`/api/v1/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(userId);
  });
});

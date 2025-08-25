const request = require('supertest');
const app = require('../src/app');
const { initDatabase, getDynamoDB } = require('../src/config/database');

beforeAll(async () => {
  await initDatabase();
});

afterAll(async () => {
  const dynamoDB = getDynamoDB();
  try {
    await dynamoDB.deleteTable({ TableName: 'Users' }).promise();
  } catch (error) {
    console.error('Error cleaning up table:', error);
  }
});

describe('API Endpoints', () => {
  test('GET /api/v1/hello should return hello message', async () => {
    const response = await request(app).get('/api/v1/hello');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello from API v1!' });
  });

  test('POST /api/v1/users should create a user', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    const response = await request(app)
      .post('/api/v1/users')
      .send(userData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(userData.name);
    expect(response.body.email).toBe(userData.email);
  });

  test('GET /api/v1/users should return list of users', async () => {
    const response = await request(app).get('/api/v1/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/v1/users should fail without name or email', async () => {
    const response = await request(app).post('/api/v1/users').send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Name and email are required');
  });


  test('GET /api/v1/users/:id should return a user by ID', async () => {
  // First, create a user
  const userData = { name: 'Alice', email: 'alice@example.com' };
  const createRes = await request(app).post('/api/v1/users').send(userData);
  const userId = createRes.body.id;

  // Fetch the user by ID
  const response = await request(app).get(`/api/v1/users/${userId}`);
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('id', userId);
  expect(response.body.name).toBe(userData.name);
  expect(response.body.email).toBe(userData.email);
});

test('GET /api/v1/users/:id should return 404 if user not found', async () => {
  const response = await request(app).get('/api/v1/users/nonexistent-id');
  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty('error', 'User not found');
});

});



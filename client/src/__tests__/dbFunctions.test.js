const request = require('supertest');
const server = 'http://localhost:3001';

describe('GET /sightings', () => {
  it('should return 200', async () => {
    const response = await request(server).get('/sightings');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(null);
  });
});

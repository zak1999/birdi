const request = require('supertest');
const app = require('../index.js');


describe('GET /sightings', () => {
  it('should return 200', async () => {
    const response = await request(app).get('/sightings');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(null);
  });
  it('should return sightings', async ()=> {
    const response = await request(app).get('/sightings');
    if (response.body.data.length > 0) {
      expect(response.body.data[0]).toHaveProperty('comName');
      expect(response.body.data[0]).toHaveProperty('sciName');
      expect(response.body.data[0]).toHaveProperty('userID');
      expect(response.body.data[0]).toHaveProperty('userEmail');
      expect(response.body.data[0]).toHaveProperty('obsDt');
      expect(response.body.data[0]).toHaveProperty('url');
      expect(response.body.data[0]).toHaveProperty('lat');
      expect(response.body.data[0]).toHaveProperty('lng');
    } else {
      expect(response.body.data).toEqual([]);
    }

  })
})
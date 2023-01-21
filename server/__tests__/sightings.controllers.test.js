const request = require('supertest');
const app = require('../server.js');
const Sightings = require('../models/sightings.models');

const mockBird = {
  comName: 'Ted',
  sciName: 'Bundy',
  obsDt: '2023-01-03 17:23',
  lat: 41.384234735143906,
  lng: 2.1785407287763974,
  userID: '63c94903b2c707c9d317dee4',
  userEmail: 'alexryanjones@gmx.com',
  file: 'undefined',
  url: 'https://storage.googleapis.com/birdi-legacy/birdi.jpg',
};

let server;

beforeAll(() => {
  server = app.listen(3001)
})

afterAll(() => {
  server.close()
})

describe('GET /sightings', () => {
  it('should return status 200', async () => {
    const response = await request(app).get('/sightings');
    if (response.body.data.length > 0) {
      expect(response.statusCode).toBe(200);
      expect(response.body.error).toBe(null);
    } else {
      expect(response.statusCode).toBe(500);
      expect(response.body.data).toBe(null);
    }
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

describe('POST /sightings', () => {
  let id;
  afterEach(async () => {
      const result = await Sightings.deleteOne({_id: id});
  });

  it('should return status 201', async () => {
    const response = await request(app).post('/sightings').send(mockBird);
    id = response.body.data._id
    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBe(null);
  });
  it('should return the added bird', async () => {
    const response = await request(app).post('/sightings').send(mockBird);
    id = response.body.data._id;
    expect(response._body.data.comName).toEqual(mockBird.comName);
    expect(response._body.data.sciName).toEqual(mockBird.sciName);
    expect(response._body.data.userID).toEqual(mockBird.userID);
    expect(response._body.data.userEmail).toEqual(mockBird.userEmail);
    expect(response._body.data.obsDt).toEqual(mockBird.obsDt);
    expect(response._body.data.url).toEqual(mockBird.url);
    expect(response._body.data.lat).toEqual(mockBird.lat);
    expect(response._body.data.lng).toEqual(mockBird.lng);
  })
});

describe('GET & POST /sightings integration test', () => {

  let id;
  afterAll(async () => {
    const result = await Sightings.deleteOne({ _id: id });
  });

  it('should return sightings not including mockBird', async () => {
    const response = await request(app).get('/sightings');
    const seenBirdsArray = response.body.data.map((bird) => bird.comName);
    expect(seenBirdsArray).not.toContain(mockBird.comName)
  })

  it('should add mockBird to sightings', async () => {
    const response = await request(app).post('/sightings').send(mockBird);
    id = response.body.data._id;
    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBe(null);
  })

  it('should return sightings including mockBird', async () => {
    const response = await request(app).get('/sightings');
    const seenBirdsArray = response.body.data.map((bird) => bird.comName);
    expect(seenBirdsArray).toContain(mockBird.comName);
  })
})
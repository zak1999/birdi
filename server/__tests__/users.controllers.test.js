const request = require('supertest');
const app = require('../server.js');
const Users = require('../models/users.models.js');

const mockUser = {
  _id: '63c94903b2c707c9d317dee4',
  email: 'alexryanjones@gmx.com',
  birdSightingsIds: [
    '63c96112c4558e4e3d53afa4',
  ],
  __v: 0,
};

const mockUserError = {
  email: undefined,
}

let server;

beforeAll(() => {
  server = app.listen(3001);
});

afterAll(() => {
  server.close();
});

describe ('POST /users', () => {
  let id;
  afterEach(async () => {
    const response = await Users.deleteOne({ _id: id });
  });

  it('Should return status 200', async () => {
    const response = await request(app).post('/users').send(mockUser);
    id = response._body.data._id;
    expect(response.statusCode).toBe(200);
    expect(response._body.error).toBe(null);
  })

  it('Should return the user with bird sightings array', async () => {
    if (await Users.findOne({email: mockUser.email})) {
    const response = await request(app).post('/users').send(mockUser);
    id = response._body.data._id;
    expect(response._body.data.email).toEqual(mockUser.email);
    expect(response._body.data.birdSightingsIds.length).toEqual(mockUser.birdSightingsIds.length)
    } else {
      const response = await request(app).post('/users').send(mockUser);
    id = response._body.data._id;
    expect(response._body.data.email).toEqual(mockUser.email);
    expect(response._body.data.birdSightingsIds.length).toEqual(0)
    }
  })

  it('Should return an error when given incorrect data', async () => {
    const response = await request(app).post('/users').send();
    expect(response.statusCode).toBe(500);
    expect(response._body.data).toBe(null);
    expect(response._body.error).toBe('No email supplied.');
  });
})
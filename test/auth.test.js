require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');
const agent = require('superagent');

describe('test for auth routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let user = null;
  beforeEach(async() => {
    user = JSON.parse(JSON.stringify(await User.create({
      username: 'Garfield',
      email: 'gar@lasagna.com',
      password: 'IHateMondays'
    })));
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'Garfield',
        email: 'garfield@lasagna.com',
        password: 'IHateMondays'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'Garfield',
          email: 'garfield@lasagna.com',
          __v: 0
        });
      });
  });

  it('sign in a user', () => {
    return request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: user.email,
        password: 'IHateMondays'
      })
      .then(res => {
        console.log(res.body, 'SIGN IN');
        expect(res.body).toEqual({
          username: user.username,
          email: user.email,
          _id: user._id,
          __v: 0
        });
      });
  });
    
  it('verifies user', async() => {
    const jon = request.agent(app);
    return jon
      .post('/api/v1/auth/signin')
      .send({
        email: user.email,
        password: 'IHateMondays'
      })
      .then(() => {
        return jon
          .get('/api/v1/auth/verify');
      })
      .then(res => {
        expect(res.body).toEqual({
          username: user.username,
          _id: user._id,
          email: user.email,
          __v: 0
        });
      });
  });
});
  
require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const app = require('../lib/app');
const seedData = require('./seed-data');

const prepare = arr => JSON.parse(JSON.stringify(arr));

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

let agent = request.agent(app);
let seededUsers = null;
let seededPosts = null;
beforeEach(async() => {
  const { users, posts } = await seedData();
  seededUsers = prepare(users);
  seededPosts = prepare(posts);

  return await agent
    .post('/api/v1/auth/signin')
    .send({ username: users[0].username, email: users[0].email, password: 'password' });
});
 
afterAll(() => {
  return mongoose.connection.close();
});

module.exports = {
  getAgent: () => agent,
  getUsers: () => seededUsers,
  getPosts: () => seededPosts
};



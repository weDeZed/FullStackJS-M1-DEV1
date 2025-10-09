const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { buildMongoUrl } = require('./utils/mongoUrl');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const authRoute = require('../routes/authRoute');
const User = require('../model/user');

const app = express();
app.use(express.json());
app.use('/auth', authRoute);

beforeAll(async () => {
  const mongoUrl = buildMongoUrl(process.env.ATLAS_URI, 'test_auth');
  await mongoose.connect(mongoUrl);
  await User.deleteMany({});
}, 30000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe('🧪 Tests Authentification', () => {
  it('Inscription d’un nouvel utilisateur', async () => {
    const res = await request(app).post('/auth/register').send({
      email: 'testauth@example.com',
      password: '123456',
      name: 'User Test',
      phone: '0600000000',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe('testauth@example.com');
  });

  it('Échec si email déjà utilisé', async () => {
    const res = await request(app).post('/auth/register').send({
      email: 'testauth@example.com',
      password: 'abcdef',
    });
    expect(res.statusCode).toBe(400);
  });

  it('Connexion réussie', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'testauth@example.com',
      password: '123456',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET);
    expect(decoded).toHaveProperty('userId');
  });

  it('Connexion échoue avec mauvais mot de passe', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'testauth@example.com',
      password: 'wrongpass',
    });
    expect(res.statusCode).toBe(401);
  });
});

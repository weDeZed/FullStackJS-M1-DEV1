const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { buildMongoUrl } = require('./utils/mongoUrl');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const contactRoute = require('../routes/contactRoute');
const User = require('../model/user');
const Contact = require('../model/contact');

const app = express();
app.use(express.json());
app.use('/contacts', contactRoute);

let token;
let userId;

beforeAll(async () => {
  const mongoUrl = buildMongoUrl(process.env.ATLAS_URI, 'test_contacts');
  await mongoose.connect(mongoUrl);

  await User.deleteMany({});
  await Contact.deleteMany({});

  const user = await User.create({
    email: 'contactuser@example.com',
    password: 'hashedpassword123', 
    name: 'Contact User',
  });

  userId = user._id.toString();
  token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}, 30000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe('🧪 Tests des routes de contacts', () => {
  it('Crée un contact', async () => {
    const res = await request(app)
      .post('/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({ firstName: 'John', lastName: 'Doe', phone: '0102030405' });

    expect(res.statusCode).toBe(201);
    expect(res.body.firstName).toBe('John');
  });

  it('Empêche la création d’un doublon', async () => {
    const res = await request(app)
      .post('/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({ firstName: 'John', lastName: 'Doe', phone: '0102030405' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('le contact existe déja');
  });

  it('Récupère tous les contacts', async () => {
    const res = await request(app)
      .get('/contacts')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it('Met à jour un contact', async () => {
    const contact = await Contact.findOne({ user: userId });
    const res = await request(app)
      .patch(`/contacts/${contact._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ phone: '0999999999' });

    expect(res.statusCode).toBe(200);
    expect(res.body.phone).toBe('0999999999');
  });

  it('Supprime un contact', async () => {
    const contact = await Contact.findOne({ user: userId });
    const res = await request(app)
      .delete(`/contacts/${contact._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('contact supprimé');
  });
});

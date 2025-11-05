const request = require('supertest');
const { faker } = require('@faker-js/faker');
const postUser = require('../fixtures/postUser.json');

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

const criarUsuario = async (role = 'normal') => {
  const bodyUser = {
    ...postUser,
    username: faker.internet.username().toLowerCase(),
    password: faker.internet.password(),
    role
  };

  const resposta = await request(BASE_URL)
    .post('/users/register')
    .set('Content-Type', 'application/json')
    .send(bodyUser);

  return {
    username: bodyUser.username,
    password: bodyUser.password,
    role,
    resposta
  };
};

module.exports = { criarUsuario };

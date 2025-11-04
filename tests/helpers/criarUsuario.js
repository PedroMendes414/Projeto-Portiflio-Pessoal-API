require('dotenv').config(); // Carrega as variáveis de ambiente do .env
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

  return { bodyUser, resposta };
};

module.exports = {
  criarUsuario
};

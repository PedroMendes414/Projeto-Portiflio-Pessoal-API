const request = require('supertest');
const { faker } = require('@faker-js/faker');
const postUser = require('../fixtures/postUser.json');

const criarUsuario = async (role = 'normal') => {
  const bodyUser = {
    ...postUser,
    username: faker.internet.username().toLowerCase(),
    password: faker.internet.password(),
    role
  };

  const resposta = await request('http://localhost:3000')
    .post('/users/register')
    .set('Content-Type', 'application/json')
    .send(bodyUser);

  return { bodyUser, resposta };
};

module.exports = {
  criarUsuario
};

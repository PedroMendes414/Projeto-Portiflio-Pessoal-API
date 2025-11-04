require('dotenv').config()
const request = require('supertest');
const { expect } = require('chai');
const { criarUsuario } = require('../helpers/criarUsuario');

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

describe('Login', () => {
  let usuario;

  before(async () => {
    usuario = await criarUsuario('admin'); // cria usuário aleatório antes dos testes
  });

  it('Deve retornar 200 com token quando usar credenciais válidas', async () => {
    const resposta = await request(BASE_URL)
      .post('/users/login')
      .set('Content-Type', 'application/json')
      .send({
        username: usuario.username,
        password: usuario.password
      });

    expect(resposta.status).to.equal(200);
    expect(resposta.body).to.have.property('token');
  });
});

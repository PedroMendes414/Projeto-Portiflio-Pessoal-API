const request = require('supertest');
const { expect } = require('chai');
const { criarUsuario } = require('../helpers/criarUsuario');

describe('Login', () => {
  let usuario;

  before(async () => {
    usuario = await criarUsuario('admin'); // cria usuário aleatório antes dos testes
  });

  it('Deve retornar 200 com token quando usar credenciais válidas', async () => {
    const resposta = await request('http://localhost:3000')
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

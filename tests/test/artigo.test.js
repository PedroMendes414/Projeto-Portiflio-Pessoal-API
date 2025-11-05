require('dotenv').config();
const request = require('supertest');
const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const artigoPost = require('../fixtures/artigoPost.json');

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

describe('Artigos', () => {
  let token;

  before(async () => {
    const novoUsuario = {
      username: faker.internet.username().toLowerCase(),
      password: faker.internet.password(),
      role: 'admin'
    };

    await request(BASE_URL)
      .post('/users/register')
      .set('Content-Type', 'application/json')
      .send(novoUsuario);


    const respostaLogin = await request(BASE_URL)
      .post('/users/login')
      .set('Content-Type', 'application/json')
      .send({
        username: novoUsuario.username,
        password: novoUsuario.password
      });

    token = respostaLogin.body.token;
    expect(token).to.exist; 
  });

  describe('POST /articles', () => {
    it('Deve cadastrar um artigo e retornar 201', async () => {
      const resposta = await request(BASE_URL)
        .post('/articles')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(artigoPost);

      expect(resposta.status).to.equal(201);
    });
  });

  describe('DELETE /articles', () => {
    it('Deve remover artigo corretamente e retornar status 204', async () => {
      const criarResposta = await request(BASE_URL)
        .post('/articles')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(artigoPost);

      expect(criarResposta.status).to.equal(201);
      const artigoId = criarResposta.body.id;

      const deletarResposta = await request(BASE_URL)
        .delete(`/articles/${artigoId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(deletarResposta.status).to.equal(204);
    });
  });

  describe('GET /articles', () => {
    it('Deve retornar status 200 com dados dos artigos', async () => {
      const resposta = await request(BASE_URL)
        .get('/articles/search?q=teste')
        .set('Authorization', `Bearer ${token}`);

      expect(resposta.status).to.equal(200);
    });
  });
});

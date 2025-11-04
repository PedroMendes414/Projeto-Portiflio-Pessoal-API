require('dotenv').config();
const request = require('supertest');
const { expect } = require('chai');

const artigoPost = require('../fixtures/artigoPost.json');
const { obterToken } = require('../helpers/autenticacao');
const { criarUsuario } = require('../helpers/criarUsuario'); 

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

describe('Artigos', () => {
  let token;

  before(async () => {
    const { bodyUser } = await criarUsuario('admin');

    token = await obterToken(bodyUser.username, bodyUser.password);
  });

  describe('POST /articles', () => {
    it('Deve cadastrar um artigo e retornar 201', async () => {
      const bodyArtigo = { ...artigoPost };

      const resposta = await request(BASE_URL)
        .post('/articles')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyArtigo);

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
      expect(artigoId).to.exist;

      const deletarResposta = await request(BASE_URL)
        .delete(`/articles/${artigoId}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(deletarResposta.status).to.equal(204);
    });
  });

  describe('GET /articles', () => {
    it('Deve retornar status 200 com dados dos artigos', async () => {
      const resposta = await request(BASE_URL)
        .get('/articles/search?q=teste')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(resposta.status).to.equal(200);
    });
  });
});

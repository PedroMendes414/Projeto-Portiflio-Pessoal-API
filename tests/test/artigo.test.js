const request = require('supertest');
const { expect } = require('chai');

const artigoPost = require('../fixtures/artigoPost.json');
const { obterToken } = require('../helpers/autenticacao');

describe('Artigos', () => {
    let token;

    before(async () => {
        token = await obterToken('pedro.oliveiroo', '123456');
    });

    describe('POST /articles', () => {
        it('Deve cadastrar um artigo e retornar 201', async () => {
            const bodyArtigo = { ...artigoPost };

            const resposta = await request('http://localhost:3000')
                .post('/articles')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyArtigo);

            expect(resposta.status).to.equal(201);
        });
    });

    describe('DELETE /articles', () => {
        it('Deve remover artigo corretamente e retornar status 201', async () => {
            const criarResposta = await request('http://localhost:3000')
                .post('/articles')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(artigoPost);

            expect(criarResposta.status).to.equal(201);

            artigoId = criarResposta.body.id;
            expect(artigoId).to.exist;

            const deletarResposta = await request('http://localhost:3000')
                .delete(`/articles/${artigoId}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);

            expect(deletarResposta.status).to.equal(204);
        });
    });
    describe('GET /articles', () => {
        it('Receber Status 200 com dados dos artigos', async ()=> {
            const resposta = await request('http://localhost:3000')
                .get('/articles/search?q=teste')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            
            expect(resposta.status).to.equal(200)
        })
    })
});

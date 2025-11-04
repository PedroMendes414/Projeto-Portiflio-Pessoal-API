const request = require('supertest');
const { expect } = require('chai');

const postLogin = require('../fixtures/postLogin.json')

describe('Login', ()=> {
    describe('POST /login', ()=> {
        it('Deve retornar 200 com token quando usar credenciais válidas', async() => {
            const bodyLogin = { ...postLogin}

            const resposta = await request('http://localhost:3000')
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
            
            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');

        }) 

        it('Deve retornar 401 quando usar credenciais inválidas', async() => {
            const bodyLogin = { ...postLogin}
            bodyLogin.password = 123

            const resposta = await request('http://localhost:3000')
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
            
            expect(resposta.status).to.equal(401);
            expect(resposta.body.error).to.include("Credenciais inválidas");

        })
    } )
})
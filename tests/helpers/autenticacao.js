require('dotenv').config()
const request = require('supertest')
const postLogin = require ('../fixtures/postLogin.json')

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

const obterToken = async (usuario, senha) => {
    const bodyLogin = { ...postLogin}
    // Capturar o token
    const respostaLogin = await request(BASE_URL)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin)

    return respostaLogin.body.token
}

module.exports = {
    obterToken
}
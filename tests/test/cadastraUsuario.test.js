const { expect } = require('chai');
const { criarUsuario } = require('../helpers/criarUsuario');

describe('POST /register', () => {
  it('Deve cadastrar usuário do tipo admin', async () => {
    const { resposta } = await criarUsuario('admin');
    expect(resposta.status).to.equal(201);
  });

  it('Deve cadastrar usuário do tipo normal', async () => {
    const { resposta } = await criarUsuario('normal');
    expect(resposta.status).to.equal(201);
  });
});

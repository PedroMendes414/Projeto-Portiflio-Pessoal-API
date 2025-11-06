import faker from 'https://cdn.jsdelivr.net/npm/faker@5.5.3/dist/faker.min.js';

export function gerarUsuario() {
  return {
    username: faker.internet.userName() + Date.now() + Math.floor(Math.random() * 1000),
    password: faker.internet.password(10),
    role: 'admin',
  };
}

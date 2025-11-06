import faker from 'https://cdn.jsdelivr.net/npm/faker@5.5.3/dist/faker.min.js';
import { pegarBaseURL } from '../utils/variaveis.js';
import http from 'k6/http';
import { gerarUsuario } from '../helpers/registrarUsuario.js';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '20s', target: 10 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(90)<3000', 'max<5000'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const usuario = gerarUsuario();
  const url = `${pegarBaseURL()}/users/register`;
  const payload = JSON.stringify(usuario);

  const headers = { 'Content-Type': 'application/json' };

  const res = http.post(url, payload, { headers });

  check(res, {
    'Status é 201': (r) => r.status === 201,
    'Resposta contém ID': (r) => r.json('id') !== undefined,
    'Resposta contém username': (r) => typeof r.json('username') === 'string',
  });

  sleep(1);
}

import http from 'k6/http';
import { check, sleep } from 'k6';
import { pegarBaseURL } from '../utils/variaveis.js';
import { gerarUsuario } from '../helpers/registrarUsuario.js';

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '20s', target: 10 },
    { duration: '20s', target: 30 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(90)<3000', 'max<5000'],
    http_req_failed: ['rate<0.01'],
  },
};

export function setup() {
  const usuario = gerarUsuario();

  http.post(`${pegarBaseURL()}/users/register`, JSON.stringify(usuario), {
    headers: { 'Content-Type': 'application/json' },
  });

  return usuario;
}

export default function (usuario) {
  const url = `${pegarBaseURL()}/users/login`;
  const payload = JSON.stringify({
    username: usuario.username,
    password: usuario.password,
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'Status é 200': (r) => r.status === 200,
    'Token é string': (r) => typeof r.json('token') === 'string',
  });

  sleep(1);
}

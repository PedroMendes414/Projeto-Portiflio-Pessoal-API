import http from 'k6/http';
import { check, sleep } from 'k6';
import { pegarBaseURL } from '../utils/variaveis.js';
import { obterToken } from '../helpers/autenticacao.js';
const postArticles = JSON.parse(open('../fixtures/postArticles.json')) 

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '20s', target: 30 },
    { duration: '20s', target: 0 }
  
  ],
  thresholds: {
    http_req_duration: ['p(90)<3000', 'max<5000'],
    http_req_failed: ['rate<0.01'],
  },
};

export function setup() {
    const token = obterToken();
    return { token };
}

export default function(data) {
    const url = `${pegarBaseURL()}/articles`;
    const payload = JSON.stringify(postArticles);
    const params = {
    headers: { 
        'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + data.token
    },
  };

    const res = http.post(url, payload, params);

    check(res, {
    'Validar que o status é 201': (r) => r.status === 201
  });

    sleep(1);
}
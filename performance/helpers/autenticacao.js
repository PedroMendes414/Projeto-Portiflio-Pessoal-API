import http from 'k6/http';
import { pegarBaseURL } from '../utils/variaveis.js';
import { gerarUsuario } from './registrarUsuario.js';

function registrarUsuario() {
    const usuario = gerarUsuario();

    const res = http.post(
        `${pegarBaseURL()}/users/register`,
        JSON.stringify(usuario),
        { headers: { 'Content-Type': 'application/json' } }
    );

    return { usuario, res };
}

export function obterToken() {
    const { usuario } = registrarUsuario();

    const payloadLogin = JSON.stringify({
        username: usuario.username,
        password: usuario.password,
    });

    const resLogin = http.post(
        `${pegarBaseURL()}/users/login`,
        payloadLogin,
        { headers: { 'Content-Type': 'application/json' } }
    );

    return resLogin.json('token');
}

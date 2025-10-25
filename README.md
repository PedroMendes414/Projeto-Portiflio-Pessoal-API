# API de Cadastro de Artigos QA

Esta API permite o cadastro, busca, listagem e remoção de artigos na área de QA, com autenticação JWT. Usuários podem registrar-se como normal ou admin, fazer login, cadastrar artigos, buscar e listar artigos, e remover artigos conforme regras de permissão.

## Funcionalidades
- Registro de usuário (normal/admin)
- Login de usuário
- Registro de artigo
- Busca de artigo
- Listagem de artigos
- Remoção de artigo (próprio ou qualquer, se admin)
- Documentação Swagger disponível em `/api-docs`

## Estrutura do Projeto
- `routes/` - Rotas da API
- `controllers/` - Lógica dos endpoints
- `service/` - Regras de negócio e autenticação
- `model/` - Modelos e armazenamento em memória
- `resources/` - Documentação Swagger

## Autenticação
- JWT obrigatório para todas operações de artigo
- Usuário normal pode remover apenas seus próprios artigos
- Admin pode remover qualquer artigo

## Como executar
1. Instale as dependências:
   ```bash
   npm install express body-parser swagger-ui-express jsonwebtoken
   ```
2. Inicie o servidor:
   ```bash
   node app.js
   ```
3. Acesse a documentação Swagger em [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Exemplos de uso
- Registro de usuário:
  ```json
  POST /users/register
  {
    "username": "usuario",
    "password": "senha",
    "role": "normal"
  }
  ```
- Login:
  ```json
  POST /users/login
  {
    "username": "usuario",
    "password": "senha"
  }
  ```
- Cadastro de artigo:
  ```json
  POST /articles
  Authorization: Bearer <token>
  {
    "title": "Título",
    "content": "Conteúdo do artigo"
  }
  ```

Consulte o Swagger para detalhes dos endpoints e modelos de resposta.

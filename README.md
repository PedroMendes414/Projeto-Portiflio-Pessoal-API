# API de Cadastro de Artigos QA

Esta API permite o cadastro, busca, listagem e remoção de artigos na área de QA, com autenticação JWT. Usuários podem registrar-se como normal ou admin, fazer login, cadastrar artigos, buscar e listar artigos, e remover artigos conforme regras de permissão.

Esse projeto foi desenvolvido na mentoria 2.0 em testes de software do julio de lima

# ✅ Objetivo do Projeto

Objetivo do projeto é colocar em prática todos os conhecimentos aprendidos na mentoria 2.0 em testes do software do julio de lima: dentro da aba wiki possui todos os artefatos de testes e dentro de 'issues' possui todos os bugs encontrados no decorrer dos testes

O objetivo desta API é fornecer uma estrutura simples para:
- ✅ Cadastro de usuários  
- ✅ Login / autenticação  
- ✅ Criação, listagem e deleção de artigos  
- ✅ Gerar um portfólio pessoal baseado em artigos  

E também:

- ✅ Criar testes automatizados completos  
- ✅ Garantir estabilidade e regressão da API  
- ✅ Gerar relatórios HTML com Mochawesome  


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
- `test/` - Todos os testes da aplicação, incluindo fixtures e helpers
- `perfomance` - Testes de perfomance, incluindo config,fixtures,helpers,tests e utils
- `.github` - Inclui arquivo YML CI para rodar os testes automaticamente após cada PR e subida de código para main

## Autenticação
- JWT obrigatório para todas operações de artigo
- Usuário normal pode remover apenas seus próprios artigos
- Admin pode remover qualquer artigo

## Como executar
1. Instale as dependências:
   ```bash
   npm install 
   ```
2. Inicie o servidor:
   ```bash
   npm start
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
4. Para rodar os testes + gerar relatório HTML automaticamente:
   ```bash
   npm test
   ```
5. O relatório será gerado em:
```bash
   mochawesome-report/mochawesome.html
 ```
Consulte o Swagger para detalhes dos endpoints e modelos de resposta.

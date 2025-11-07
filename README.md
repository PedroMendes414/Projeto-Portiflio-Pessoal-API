# API de Cadastro de Artigos QA

Esta API permite o cadastro, busca, listagem e remoção de artigos na área de QA, com autenticação JWT. Usuários podem registrar-se como normal ou admin, fazer login, cadastrar artigos, buscar e listar artigos, e remover artigos conforme regras de permissão.

Esse projeto foi desenvolvido na mentoria 2.0 em testes de software do julio de lima

# ✅ Objetivo do Projeto

Objetivo do projeto é colocar em prática todos os conhecimentos aprendidos na mentoria 2.0 em testes do software do julio de lima: dentro da aba wiki possui todos os artefatos de testes e dentro de 'issues' possui todos os bugs encontrados no decorrer dos testes, o projeto possui pipeline configurada para rodar os testes, testes automatizados de api e perfomance

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
# ✅ Testes de perfomance:
Verifique se o **k6** está instalado:  
   ```bash
   k6 version
   ```
   Caso não tenha, siga a [documentação oficial](https://k6.io/docs/getting-started/installation/).  

---
## ▶️ Execução dos testes  

### 1. Definir a `BASE_URL`  
A URL base da API deve ser informada como variável de ambiente no momento da execução.  
O valor padrão usado no projeto está em `config/config.local.json`:  

```json
{
  "BASE_URL": "http://localhost:3000"
}
```

Linux / Mac:  
```bash
BASE_URL=http://localhost:3000 k6 run tests/login.test.js
```

Windows (PowerShell):  
```powershell
$env:BASE_URL="http://localhost:3000"; k6 run tests/login.test.js
```
### 2. Executar os testes diretamente  
Login(assim será para todos os testes, basta trocar o nome do teste ao executar):  
```bash
 k6 run tests/login.test.js -e BASE_URL=http://localhost:3000
```
O arquivo `html-report.html` será gerado na raiz do projeto e pode ser aberto em qualquer navegador.  

---

📊 Com isso, é possível acompanhar a performance da **Banco API** tanto em tempo real quanto por relatórios exportados. 

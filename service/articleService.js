const { createArticle, getArticleById, getArticles, searchArticles, removeArticle } = require('../model/articleModel');
const { findUserById } = require('../model/userModel');

function registerArticle({ title, content, authorId }) {
  if (!title || !content) {
    throw { status: 400, message: 'Título e conteúdo são obrigatórios' };
  }
  return createArticle({ title, content, authorId });
}

function listArticles() {
  return getArticles();
}

function searchArticle(query) {
  return searchArticles(query);
}

function deleteArticle(id, user) {
  const article = getArticleById(id);
  if (!article) throw { status: 404, message: 'Artigo não encontrado' };
  if (user.role === 'admin' || article.authorId === user.id) {
    removeArticle(id);
    return true;
  }
  throw { status: 403, message: 'Sem permissão para remover este artigo' };
}

module.exports = { registerArticle, listArticles, searchArticle, deleteArticle };

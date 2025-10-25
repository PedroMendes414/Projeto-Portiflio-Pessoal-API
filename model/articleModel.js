let articles = [];
let articleIdCounter = 1;

function createArticle({ title, content, authorId }) {
  const article = { id: articleIdCounter++, title, content, authorId };
  articles.push(article);
  return article;
}

function getArticleById(id) {
  return articles.find(a => a.id === id);
}

function getArticles() {
  return articles;
}

function searchArticles(query) {
  return articles.filter(a => a.title.includes(query) || a.content.includes(query));
}

function removeArticle(id) {
  const idx = articles.findIndex(a => a.id === id);
  if (idx !== -1) {
    articles.splice(idx, 1);
    return true;
  }
  return false;
}

module.exports = {
  createArticle,
  getArticleById,
  getArticles,
  searchArticles,
  removeArticle,
  articles
};

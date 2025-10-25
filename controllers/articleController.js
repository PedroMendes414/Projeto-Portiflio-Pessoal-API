const { registerArticle, listArticles, searchArticle, deleteArticle } = require('../service/articleService');

exports.create = (req, res, next) => {
  try {
    const article = registerArticle({ ...req.body, authorId: req.user.id });
    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
};

exports.list = (req, res, next) => {
  try {
    const articles = listArticles();
    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};

exports.search = (req, res, next) => {
  try {
    const articles = searchArticle(req.query.q || '');
    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};

exports.remove = (req, res, next) => {
  try {
    deleteArticle(parseInt(req.params.id), req.user);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

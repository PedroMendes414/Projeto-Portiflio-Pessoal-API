const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { authenticateToken } = require('../service/authService');

router.post('/', authenticateToken, articleController.create);
router.get('/', authenticateToken, articleController.list);
router.get('/search', authenticateToken, articleController.search);
router.get('/:id', articleController.getById);
router.delete('/:id', authenticateToken, articleController.remove);

module.exports = router;

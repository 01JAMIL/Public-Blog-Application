const express = require('express')
const router = express.Router()
const { getArticles, createArticle, updateArticle, deleteArticle } = require('../controllers/article.controller')

router.get('/articles', getArticles)
router.post('/create', createArticle)
router.put('/update', updateArticle)
router.delete('/delete', deleteArticle)

module.exports = router
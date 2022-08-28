const express = require('express')
const router = express.Router()
const { getArticles, createArticle, updateArticle, deleteArticle, commentArticle, likeArticle, unlikeArticle, numberOfLikes } = require('../controllers/article.controller')

router.get('/articles', getArticles)
router.get('/count/:id', numberOfLikes)
router.post('/create', createArticle)
router.put('/update', updateArticle)
router.delete('/delete', deleteArticle)
router.put('/comment', commentArticle)
router.put('/like', likeArticle)
router.put('/unlike', unlikeArticle)

module.exports = router
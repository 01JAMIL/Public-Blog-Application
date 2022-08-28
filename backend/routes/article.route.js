const express = require('express')
const router = express.Router()
const { getArticles, createArticle, updateArticle, deleteArticle, listComments, tagList , likeArticle, unlikeArticle, numberOfLikes } = require('../controllers/article.controller')

router.get('/articles', getArticles)
router.get('/count/:id', numberOfLikes)
router.get('/comments/:id', listComments)
router.get('/tags/:id', tagList)
router.post('/create', createArticle)
router.put('/update', updateArticle)
router.delete('/delete', deleteArticle)
router.put('/like', likeArticle)
router.put('/unlike', unlikeArticle)

module.exports = router
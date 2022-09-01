const express = require('express')
const router = express.Router()
const { getArticles, createArticle, updateArticle, deleteArticle, listComments, tagList , likeArticle, unlikeArticle, numberOfLikes } = require('../controllers/article.controller')

router.get('/articles', getArticles)
router.get('/count/:id', numberOfLikes)
router.get('/comments/:id', listComments)
router.get('/tags/:id', tagList)
router.post('/create', createArticle)
router.put('/update/:id', updateArticle)
router.delete('/delete/:id', deleteArticle)
router.put('/like/:id', likeArticle)
router.put('/unlike/:id', unlikeArticle)

module.exports = router
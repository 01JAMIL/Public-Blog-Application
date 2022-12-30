const express = require('express')
const router = express.Router()
const { getArticles, createArticle, updateArticle, deleteArticle, listComments, tagList, likeArticle, unlikeArticle, numberOfLikes } = require('../controllers/article.controller')
const { protectUserRoute } = require('../middlewares/user.middleware')
router.get('/articles', protectUserRoute, getArticles)
router.get('/count/:id', protectUserRoute, numberOfLikes)
router.get('/comments/:id', protectUserRoute, listComments)
router.get('/tags/:id', protectUserRoute, tagList)
router.post('/create', protectUserRoute, createArticle)
router.delete('/delete/:id', protectUserRoute, deleteArticle)
router.put('/like/:id', protectUserRoute, likeArticle)
router.put('/unlike/:id', protectUserRoute, unlikeArticle)

module.exports = router
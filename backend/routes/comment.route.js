const express = require('express')
const { getCommentById, saveComment, updateComment, deleteComment, likeComment, unlikeComment, comment } = require('../controllers/comment.controller')
const router = express.Router()
const { protectUserRoute } = require('../middlewares/user.middleware')

router.get('/:id',protectUserRoute, getCommentById)
router.post('/',protectUserRoute, saveComment)
router.put('/:id',protectUserRoute, updateComment)
router.put('/delete/:id',protectUserRoute, deleteComment)
router.put('/like/:id',protectUserRoute, likeComment)
router.put('/unlike/:id',protectUserRoute, unlikeComment)
router.put('/comment/:id',protectUserRoute, comment)

module.exports = router
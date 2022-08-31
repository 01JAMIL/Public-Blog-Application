const express = require('express')
const { getCommentById, saveComment, updateComment, deleteComment, likeComment, unlikeComment, comment } = require('../controllers/comment.controller')
const router = express.Router()

router.get('/:id', getCommentById)
router.post('/', saveComment)
router.put('/:id', updateComment)
router.delete('/:id', deleteComment)
router.put('/like/:id', likeComment)
router.put('/unlike/:id', unlikeComment)
router.put('/comment/:id', comment)

module.exports = router
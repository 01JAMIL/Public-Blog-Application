const asyncHandler = require('express-async-handler')
const Comment = require('../models/comment.model')
const Article = require('../models/article.model')
const saveComment = asyncHandler(async (req, res) => {
    try {

        const newComment = {
            content: req.body.content,
            likes: req.body.likes,
            date: req.body.date,
            userId: req.body.userId
        }

        await Comment.create(newComment).then(async (comment) => {
            await Article.findOneAndUpdate({ _id: req.body.articleId }).then((article) => {
                res.status(200).json({ 'result': 'You commented this post' })
            })

        })

    } catch (error) {
        res.status(400).json(error)
    }
})

const updateComment = asyncHandler(async (req, res) => {
    try {

        await Comment.findOneAndUpdate({ _id: req.params.id }).then((comment) => {
            res.status(200).json(comment)
        }).catch((error) => {
            res.status(400).json(error)
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

const deleteComment = asyncHandler(async (req, res) => {
    try {

        await Comment.findOneAndDelete({ _id: req.params.id }).then((
            res.status(200).json('Comment deleted')
        )).catch((error) => {
            res.status(400).json(error)
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = {
    saveComment,
    updateComment,
    deleteComment
}
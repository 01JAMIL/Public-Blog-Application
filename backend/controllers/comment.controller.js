const asyncHandler = require('express-async-handler')
const Comment = require('../models/comment.model')
const Article = require('../models/article.model')

const getCommentById = asyncHandler(async (req, res) => {
    try {
        await Comment.findOne({ _id: req.params.id }).then(comment => {
            res.status(200).json(comment)
        })
    } catch (error) {
        res.status(400).json(error)
    }
})

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

const likeComment = asyncHandler(async (req, res) => {
    try {
        await Comment.findOne({ _id: req.params.id }).then(async (comment) => {
            let listLikes = comment.likes
            listLikes.push(req.body.userId)

            await Comment.findOneAndUpdate(
                { _id: req.params.id },
                {
                    likes: listLikes
                },
                { new: true }
            ).then((comment) => {
                res.status(200).send('You liked this comment')
            })
        })
    } catch (error) {
        res.status(400).json(error)
    }
})

const unlikeComment = asyncHandler(async (req, res) => {
    try {
        await Comment.findOne({ _id: req.params.id }).then(async (comment) => {
            const listLikes = comment.likes

            const newList = listLikes.filter(like => like === req.body.userId)

            await Comment.findOneAndUpdate(
                { _id: req.params.id },
                {
                    likes: newList
                },
                { new: true }
            ).then((comment) => {
                res.status(200).send('You unliked this comment')
            })
        })
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = {
    getCommentById,
    saveComment,
    updateComment,
    deleteComment,
    likeComment,
    unlikeComment
}
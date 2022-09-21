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
            likes: [],
            date: Date.now(),
            userId: req.body.userId,
            comments: []
        }

        await Comment.create(newComment).then(async (comment) => {
            await Article.findOne({ _id: req.body.articleId }).then(async (article) => {

                const listComments = article.comments
                listComments.push(comment)

                await Article.findOneAndUpdate(
                    { _id: req.body.articleId },
                    {
                        comments: listComments
                    },
                    { new: true }
                ).then((article) => {
                    res.status(200).json(listComments);
                })
            })
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

const updateComment = asyncHandler(async (req, res) => {
    try {

        await Comment.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        ).then((comment) => {
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

        await Comment.findOneAndDelete({ _id: req.params.id }).then(async () => {
            await Article.findOne({ _id: req.body.articleId }).then(async (article) => {
                const listComments = article.comments.filter(comment => comment === req.params.id)
                await Article.findOneAndUpdate(
                    { _id: req.body.articleId },
                    {
                        comments: listComments
                    },
                    { new: true }
                ).then(article => {
                    res.status(200).json('Comment deleted')
                })
            })
        }
        ).catch((error) => {
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

const comment = asyncHandler(async (req, res) => {
    try {
        const newComment = new Comment(req.body)

        await Comment.create(newComment).then(async (com) => {
            await Comment.findOne({ _id: req.params.id }).then(async (comment) => {
                const listComments = comment.comments
                listComments.push(com._id)

                await Comment.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        comments: listComments
                    },
                    { new: true }
                ).then((comment) => {
                    res.status(200).send('You commented this comment')
                }).catch((error) => {
                    res.status(400).json(error)
                })
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
    unlikeComment,
    comment
}
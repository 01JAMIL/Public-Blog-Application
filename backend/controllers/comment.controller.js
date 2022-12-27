const asyncHandler = require('express-async-handler')
const Comment = require('../models/comment.model')
const Article = require('../models/article.model')

const getCommentById = asyncHandler(async (req, res) => {
    await Comment.findOne({ _id: req.params.id }).then(comment => {
        res.status(200).json(comment)
    })
})

const saveComment = asyncHandler(async (req, res) => {
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
            ).then(a => {
                res.status(200).json(a);
            })
        })
    })

})

const updateComment = asyncHandler(async (req, res) => {
    await Comment.findOneAndUpdate(
        { _id: req.params.id },
        { content: req.body.content },
        { new: true }
    ).then((comment) => {
        res.status(200).json(comment)
    }).catch((error) => {
        res.status(400).json(error)
    })
})

const deleteComment = asyncHandler(async (req, res) => {

    await Comment.findOneAndDelete({ _id: req.params.id }).then(async () => {
        console.log(req.body.articleId)
        await Article.findOne({ _id: req.body.articleId }).then(async (article) => {

            const index = article.comments.indexOf(req.params.id)
            article.comments.splice(index, 1)

            await Article.findOneAndUpdate(
                { _id: req.body.articleId },
                {
                    comments: article.comments
                },
                { new: true }
            ).then(a => {
                res.status(200).json(a)
            })
        })
    }
    ).catch((error) => {
        res.status(400).json(error)
    })

})

const likeComment = asyncHandler(async (req, res) => {

    await Comment.findOne({ _id: req.params.id }).then(async (comment) => {
        let listLikes = comment.likes
        listLikes.push(req.body.userId)

        await Comment.findOneAndUpdate(
            { _id: req.params.id },
            {
                likes: listLikes
            },
            { new: true }
        ).then((c) => {
            res.status(200).send(c.likes)
        })
    })

})

const unlikeComment = asyncHandler(async (req, res) => {

    await Comment.findOne({ _id: req.params.id }).then(async (comment) => {

        const index = comment.likes.indexOf(req.body.userId)
        comment.likes.splice(index, 1)

        await Comment.findOneAndUpdate(
            { _id: req.params.id },
            {
                likes: comment.likes
            },
            { new: true }
        ).then((c) => {
            res.status(200).send(c.likes)
        })
    })

})

const comment = asyncHandler(async (req, res) => {

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
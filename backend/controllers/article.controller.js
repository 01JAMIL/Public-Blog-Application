const asyncHandler = require('express-async-handler')
const fs = require('fs')
const Article = require('../models/article.model')
const { validateArticleData } = require('../validation/article.validation')


const getArticles = asyncHandler(async (req, res) => {
    try {
        await Article.find().then(articles => {
            res.status(200).json(articles)
        }).catch(err => {
            res.status(400).json(err)
        })
    } catch (error) {
        res.status(400).json(error)
    }
})

const createArticle = asyncHandler = (async (req, res) => {
    const { errors, valid } = validateArticleData(req.body)
    try {

        if (!valid) {
            return res.status(400).json(errors)
        }

        const newArticle = new Article(req.body)

        if (req.files.image) {
            const image = Date.now() + '-' + req.files.image.name
            req.files.image.mv('./uploads/' + image)
            newArticle.image = image
        }


        await Article.create(newArticle).then(article => {
            res.status(200).json(article)
        }).catch(err => {
            res.status(400).json(err)
        })

    } catch (error) {
        res.status(400).json(error)
    }
})


const updateArticle = asyncHandler = (async (req, res) => {
    const { errors, valid } = validateArticleData(req.body)
    try {

        if (!valid) {
            return res.status(400).json(errors)
        }

        const currentArticle = await Article.findOne({ _id: req.params.id })

        if (req.files.image !== currentArticle.image) {
            const image = Date.now() + '-' + req.files.image.name
            req.files.image.mv('./uploads/' + image)
            req.body.image = image
            fs.unlinkSync('./uploads/' + currentArticle.image)
        }

        await Article.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        ).then(article => {
            res.status(200).json({
                result: 'Success',
                article
            })
        }).catch(err => {
            res.status(400).json(err
            )
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

const deleteArticle = asyncHandler = (async (req, res) => {
    try {

        await Article.findOneAndDelete({ _id: req.params.id }).then(() => {
            res.status(200).json('This article has been deleted')
        }).catch(err => {
            res.status(400).json(err)
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

const likeArticle = asyncHandler(async (req, res) => {
    try {

        await Article.findOne({ _id: req.body.articleId }).then(async (article) => {
            let listLikes = article.likes
            listLikes.push(req.body.userId)

            await Article.findOneAndUpdate(
                { _id: req.body.articleId },
                {
                    likes: listLikes
                },
                { new: true }
            ).then(() => {
                res.status(200).json('You liked this article')
            })
        }).catch(err => {
            res.status(400).json(err)
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

const unlikeArticle = asyncHandler(async (req, res) => {
    try {

        await Article.findOne({ _id: req.body.articleId }).then(async (article) => {
            let listLikes = article.likes
            listLikes = listLikes.filter(id => id !== req.body.userId)

            await Article.findOneAndUpdate(
                { _id: req.body.articleId },
                {
                    likes: listLikes
                },
                { new: true }
            ).then(() => {
                res.status(200).json('You unliked this article')
            })
        }).catch(err => {
            res.status(400).json(err)
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

const commentArticle = asyncHandler(async (req, res) => {
    try {

        await Article.findOne({ _id: req.body.articleId }).then(article => {
            let commentsList = article.comments

            commentsList.push(req.body.userId)
            await Article.findOneAndUpdate(
                { _id: req.body.articleId },
                {
                    comments: commentsList
                },
                { new: true }
            ).then(() => {
                res.status(200).json('Commented')
            })
        }).catch(err => {
            res.status(400).json(err)
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

const numberOfLikes = asyncHandler(async (req, res) => {
    try {

        await Article.findOne({ _id: req.params.id }).then(article => {
            const count = article.likes.length
            res.status(200).json({ 'count': count })
        }).catch(err => {
            res.status(400).json(err)
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = {
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    likeArticle,
    unlikeArticle,
    commentArticle,
    numberOfLikes
}
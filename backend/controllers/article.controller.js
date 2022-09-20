const asyncHandler = require('express-async-handler')
const fs = require('fs')
const Article = require('../models/article.model')
const Comment = require('../models/comment.model')
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

const createArticle = asyncHandler(async (req, res) => {
    const { errors, valid } = validateArticleData(req.body)
    try {

        if (!valid) {
            return res.status(400).json(errors)
        }

        const newArticle = new Article(req.body)

        if (req.files && req.files.image) {
            const imageName = Date.now() + '-' + req.files.image.name
            req.files.image.mv('./uploads/' + imageName)
            newArticle.image = imageName
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


const updateArticle = asyncHandler(async (req, res) => {
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

const deleteArticle = asyncHandler(async (req, res) => {
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

        await Article.findOne({ _id: req.params.id }).then(async (article) => {
            let listLikes = article.likes
            listLikes.push(req.body.userId)

            await Article.findOneAndUpdate(
                { _id: req.params.id },
                {
                    likes: listLikes
                },
                { new: true }
            ).then((a) => {
                res.status(200).json(a)
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

        await Article.findOne({ _id: req.params.id }).then(async (article) => {

            const index = article.likes.indexOf(req.body.userId)
            article.likes.splice(index, 1)
            await Article.findOneAndUpdate(
                { _id: req.params.id },
                {
                    likes: article.likes
                },
                { new: true }
            ).then((a) => {
                res.status(200).json(a)
            })
        }).catch(err => {
            res.status(400).json(err)
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

const listComments = asyncHandler(async (req, res) => {
    try {

        await Article.findOne({ _id: req.params.id }).then(async (article) => {
            let commentsList = article.comments

            res.status(200).json(commentsList)

        }).catch(err => {
            res.status(400).json(err)
        })

    } catch (error) {
        res.status(400).json(error)
    }
})


const tagList = asyncHandler(async (req, res) => {
    try {

        await Article.findOne({ _id: req.body.articleId }).then(async (article) => {
            let tags = article.tags

            res.status(200).json(tags)

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
    listComments,
    tagList,
    numberOfLikes
}
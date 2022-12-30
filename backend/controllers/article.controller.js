const asyncHandler = require('express-async-handler')
const fs = require('fs')
const Article = require('../models/article.model')
const Comment = require('../models/comment.model')
const { validateArticleData } = require('../validation/article.validation')


const getArticles = asyncHandler(async (req, res) => {

    await Article.find().then(articles => {
        res.status(200).json(articles.reverse())
    }).catch(err => {
        res.status(400).json(err)
    })

})

const createArticle = asyncHandler(async (req, res) => {
    const { errors, valid } = validateArticleData(req.body)


    if (!valid) {
        return res.status(400).json(errors)
    }

    console.log(req.body)
    console.log(req.files)


    const newArticle = new Article(req.body)

    if (req.files && req.files.image) {
        newArticle.image = base64EncodeImage(req.files.image.data)
    }

    await Article.create(newArticle).then(article => {
        res.status(200).json(article)
    }).catch(err => {
        res.status(400).json(err)
    })


})


const deleteArticle = asyncHandler(async (req, res) => {

    await Article.findOneAndDelete({ _id: req.params.id }).then(() => {
        res.status(200).json({ id: req.params.id })
    }).catch(err => {
        res.status(400).json(err)
    })

})

const likeArticle = asyncHandler(async (req, res) => {

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
})

const unlikeArticle = asyncHandler(async (req, res) => {

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
})

const listComments = asyncHandler(async (req, res) => {


    await Article.findOne({ _id: req.params.id }).then(async (article) => {
        let commentsList = article.comments

        res.status(200).json(commentsList)

    }).catch(err => {
        res.status(400).json(err)
    })
})


const tagList = asyncHandler(async (req, res) => {

    await Article.findOne({ _id: req.body.articleId }).then(async (article) => {
        let tags = article.tags

        res.status(200).json(tags)

    }).catch(err => {
        res.status(400).json(err)
    })
})

const numberOfLikes = asyncHandler(async (req, res) => {

    await Article.findOne({ _id: req.params.id }).then(article => {
        const count = article.likes.length
        res.status(200).json({ 'count': count })
    }).catch(err => {
        res.status(400).json(err)
    })
})

const base64EncodeImage = (data) => {
    // URI prefix -- data:image/png;base64,
    //const image = fs.readFileSync(data)
    return new Buffer.from(data).toString('base64')
}

module.exports = {
    getArticles,
    createArticle,
    deleteArticle,
    likeArticle,
    unlikeArticle,
    listComments,
    tagList,
    numberOfLikes
}
const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },

    image: {
        type: String
    },

    likes: {
        type: Number,
        default: 0
    },

    time: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('article', ArticleSchema)
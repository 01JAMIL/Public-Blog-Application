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
        type: String,
        default: null
    },


    time: {
        type: Date,
        default: Date.now()
    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },

    typeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'type',
        required: true
    },

    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tag'
        }
    ],

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],


}, { timestamps: true })

module.exports = mongoose.model('article', ArticleSchema)
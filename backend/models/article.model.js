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

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('article', ArticleSchema)
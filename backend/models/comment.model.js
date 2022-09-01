const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    content: {
        type: String
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],

    date: {
        type: Date,
        default: Date.now()
    },


    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]

}, { timestamps: true })

module.exports = mongoose.model('comment', CommentSchema)
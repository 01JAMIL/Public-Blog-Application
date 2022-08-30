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
        default: time.now()
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

module.exports = mongoose.model('comment', CommentSchema)
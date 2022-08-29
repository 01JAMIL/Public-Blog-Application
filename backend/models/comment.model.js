const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    content: {
        type: String
    },

    likes: {
        type: Number,
        default: 0
    },

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
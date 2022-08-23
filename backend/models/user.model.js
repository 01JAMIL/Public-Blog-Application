const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    dateOfBirth: {
        type: String,
        required: true
    },

    profilePic: {
        type: String
    },

    bio: {
        type: String
    },

    articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'article'
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model('user', UserSchema)
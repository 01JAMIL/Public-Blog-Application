const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({
    name: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('tag', TagSchema)
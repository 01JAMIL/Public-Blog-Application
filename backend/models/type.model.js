const mongoose = require('mongoose')

const TypeSchema = new mongoose.Schema({
    text: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('type', TypeSchema)